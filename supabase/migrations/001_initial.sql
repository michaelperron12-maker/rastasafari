-- =============================================================================
-- Rastasafari Database Schema
-- Migration: 001_initial
-- Description: Initial database schema for the Rastasafari tour booking system
-- =============================================================================

-- =============================================================================
-- Extensions
-- =============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- Custom Types (Enums)
-- =============================================================================

-- Session time options
CREATE TYPE session_time AS ENUM ('9h', '12h', '14h30');

-- Booking status
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');

-- Payment status
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded');

-- Contact message status
CREATE TYPE message_status AS ENUM ('new', 'read', 'replied');

-- Review source platforms
CREATE TYPE review_source AS ENUM ('tripadvisor', 'viator', 'google', 'facebook', 'direct');

-- Pickup location options
CREATE TYPE pickup_location AS ENUM (
  'montego_bay',
  'negril',
  'ocho_rios',
  'falmouth',
  'runaway_bay',
  'other'
);

-- =============================================================================
-- Tables
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Customers Table
-- -----------------------------------------------------------------------------
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT customers_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Indexes for customers
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_created_at ON customers(created_at);

-- Comments
COMMENT ON TABLE customers IS 'Customer information for tour bookings';
COMMENT ON COLUMN customers.full_name IS 'Full name of the customer';
COMMENT ON COLUMN customers.email IS 'Email address for communication';
COMMENT ON COLUMN customers.phone IS 'Phone number with country code';

-- -----------------------------------------------------------------------------
-- Bookings Table
-- -----------------------------------------------------------------------------
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number VARCHAR(20) UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  session session_time NOT NULL,
  adults INTEGER NOT NULL DEFAULT 1,
  children INTEGER NOT NULL DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  pickup_location pickup_location NOT NULL,
  hotel_address TEXT NOT NULL,
  special_requests TEXT,
  status booking_status NOT NULL DEFAULT 'pending',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  stripe_payment_id VARCHAR(255),
  stripe_session_id VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT bookings_adults_positive CHECK (adults > 0),
  CONSTRAINT bookings_children_non_negative CHECK (children >= 0),
  CONSTRAINT bookings_total_amount_positive CHECK (total_amount > 0),
  CONSTRAINT bookings_date_future CHECK (date >= CURRENT_DATE)
);

-- Indexes for bookings
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_date_session ON bookings(date, session);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_bookings_booking_number ON bookings(booking_number);

-- Comments
COMMENT ON TABLE bookings IS 'Tour bookings with customer and payment information';
COMMENT ON COLUMN bookings.booking_number IS 'Unique booking reference (format: RASTA-YYYY-NNN)';
COMMENT ON COLUMN bookings.session IS 'Tour session time (9h, 12h, or 14h30)';
COMMENT ON COLUMN bookings.total_amount IS 'Total amount in USD ($165 per person)';
COMMENT ON COLUMN bookings.pickup_location IS 'General pickup area';
COMMENT ON COLUMN bookings.hotel_address IS 'Specific hotel name and address for pickup';

-- -----------------------------------------------------------------------------
-- Contact Messages Table
-- -----------------------------------------------------------------------------
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status message_status NOT NULL DEFAULT 'new',
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT contact_messages_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Indexes for contact_messages
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);

-- Comments
COMMENT ON TABLE contact_messages IS 'Messages submitted through the contact form';
COMMENT ON COLUMN contact_messages.status IS 'Message handling status (new, read, replied)';

-- -----------------------------------------------------------------------------
-- Reviews Table
-- -----------------------------------------------------------------------------
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author VARCHAR(255) NOT NULL,
  rating SMALLINT NOT NULL,
  comment TEXT NOT NULL,
  review_date DATE NOT NULL,
  source review_source NOT NULL,
  source_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT reviews_rating_range CHECK (rating >= 1 AND rating <= 5)
);

-- Indexes for reviews
CREATE INDEX idx_reviews_source ON reviews(source);
CREATE INDEX idx_reviews_is_featured ON reviews(is_featured);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_review_date ON reviews(review_date);

-- Comments
COMMENT ON TABLE reviews IS 'Customer reviews from various platforms';
COMMENT ON COLUMN reviews.rating IS 'Rating from 1 to 5 stars';
COMMENT ON COLUMN reviews.source IS 'Platform where the review was originally posted';
COMMENT ON COLUMN reviews.is_featured IS 'Whether to display prominently on the website';

-- =============================================================================
-- Functions
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Generate Booking Number
-- -----------------------------------------------------------------------------
-- Format: RASTA-YYYY-NNN (e.g., RASTA-2024-001)
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TEXT AS $$
DECLARE
  current_year TEXT;
  next_number INTEGER;
  booking_num TEXT;
BEGIN
  current_year := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;

  -- Get the next sequence number for this year
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(booking_number FROM 'RASTA-' || current_year || '-(\d+)') AS INTEGER)
  ), 0) + 1
  INTO next_number
  FROM bookings
  WHERE booking_number LIKE 'RASTA-' || current_year || '-%';

  -- Format with leading zeros (3 digits)
  booking_num := 'RASTA-' || current_year || '-' || LPAD(next_number::TEXT, 3, '0');

  RETURN booking_num;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION generate_booking_number() IS 'Generates a unique booking number in format RASTA-YYYY-NNN';

-- -----------------------------------------------------------------------------
-- Auto-generate booking number trigger
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_booking_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_number IS NULL OR NEW.booking_number = '' THEN
    NEW.booking_number := generate_booking_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_booking_number
  BEFORE INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION set_booking_number();

-- -----------------------------------------------------------------------------
-- Auto-calculate total amount trigger
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION calculate_total_amount()
RETURNS TRIGGER AS $$
DECLARE
  price_per_person DECIMAL(10, 2) := 165.00;
BEGIN
  -- Calculate total based on adults + children
  NEW.total_amount := (NEW.adults + NEW.children) * price_per_person;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_calculate_total_amount
  BEFORE INSERT OR UPDATE OF adults, children ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION calculate_total_amount();

-- -----------------------------------------------------------------------------
-- Auto-update updated_at timestamp
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- Row Level Security (RLS)
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- Reviews: Public read access for featured reviews
-- -----------------------------------------------------------------------------
CREATE POLICY "Public can view featured reviews"
  ON reviews
  FOR SELECT
  USING (is_featured = TRUE);

-- -----------------------------------------------------------------------------
-- Reviews: Admin full access (via service role)
-- -----------------------------------------------------------------------------
CREATE POLICY "Service role has full access to reviews"
  ON reviews
  FOR ALL
  USING (auth.role() = 'service_role');

-- -----------------------------------------------------------------------------
-- Customers: Service role access only
-- -----------------------------------------------------------------------------
CREATE POLICY "Service role has full access to customers"
  ON customers
  FOR ALL
  USING (auth.role() = 'service_role');

-- -----------------------------------------------------------------------------
-- Bookings: Service role access only
-- -----------------------------------------------------------------------------
CREATE POLICY "Service role has full access to bookings"
  ON bookings
  FOR ALL
  USING (auth.role() = 'service_role');

-- -----------------------------------------------------------------------------
-- Contact Messages: Anyone can insert, service role can manage
-- -----------------------------------------------------------------------------
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Service role has full access to contact messages"
  ON contact_messages
  FOR ALL
  USING (auth.role() = 'service_role');

-- =============================================================================
-- Sample Data (Optional - for development)
-- =============================================================================

-- Insert sample reviews
INSERT INTO reviews (author, rating, comment, review_date, source, is_featured) VALUES
(
  'Sarah M.',
  5,
  'Absolutely incredible experience! The guides were knowledgeable and passionate about sharing Jamaican culture. The river rafting was magical and the food was amazing. Highly recommend!',
  '2024-01-15',
  'tripadvisor',
  TRUE
),
(
  'Michael T.',
  5,
  'One of the best tours I''ve ever been on. The authentic Jamaican breakfast, the beautiful scenery, and the friendly staff made this unforgettable. A must-do when visiting Jamaica!',
  '2024-01-10',
  'viator',
  TRUE
),
(
  'Jennifer L.',
  5,
  'From pickup to drop-off, everything was perfect. The Martha Brae river experience was serene and beautiful. The jerk chicken lunch was the best I''ve had. Thank you Rastasafari team!',
  '2024-01-05',
  'google',
  TRUE
),
(
  'David K.',
  4,
  'Great tour overall! The cultural experience was authentic and the guides were wonderful. Only giving 4 stars because we wished it was longer - we didn''t want it to end!',
  '2024-01-02',
  'tripadvisor',
  TRUE
),
(
  'Emma R.',
  5,
  'The perfect blend of adventure, culture, and relaxation. The Rastafarian village visit was eye-opening and the staff treated us like family. Already planning our return trip!',
  '2023-12-28',
  'facebook',
  TRUE
);

-- =============================================================================
-- Grants (for Supabase anon and authenticated roles)
-- =============================================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant select on reviews to public (for featured reviews)
GRANT SELECT ON reviews TO anon, authenticated;

-- Grant insert on contact_messages to public (for contact form)
GRANT INSERT ON contact_messages TO anon, authenticated;

-- Grant execute on functions
GRANT EXECUTE ON FUNCTION generate_booking_number() TO authenticated;
