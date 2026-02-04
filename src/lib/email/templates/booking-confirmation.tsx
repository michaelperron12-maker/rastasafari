import * as React from 'react';

interface BookingConfirmationProps {
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  session: string;
  participants: number;
  pickupPoint: string;
  pickupAddress: string;
  pricePerPerson: number;
  totalPaid: number;
}

export const BookingConfirmationEmail: React.FC<BookingConfirmationProps> = ({
  bookingNumber,
  customerName,
  customerEmail,
  date,
  session,
  participants,
  pickupPoint,
  pickupAddress,
  pricePerPerson = 165,
  totalPaid,
}) => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Booking Confirmation - Rastasafari Experience</title>
      </head>
      <body style={styles.body}>
        <table style={styles.container}>
          {/* Header with Rasta colors */}
          <tr>
            <td style={styles.rastaStripeGreen}></td>
          </tr>
          <tr>
            <td style={styles.rastaStripeYellow}></td>
          </tr>
          <tr>
            <td style={styles.rastaStripeRed}></td>
          </tr>

          {/* Logo Section */}
          <tr>
            <td style={styles.logoSection}>
              <img
                src="https://rastasafari.com/logo.png"
                alt="Rastasafari Experience"
                style={styles.logo}
              />
              <h1 style={styles.brandName}>RASTASAFARI EXPERIENCE</h1>
              <p style={styles.tagline}>Jamaica's Authentic Adventure</p>
            </td>
          </tr>

          {/* Confirmation Header */}
          <tr>
            <td style={styles.confirmationHeader}>
              <div style={styles.checkIcon}>&#10003;</div>
              <h2 style={styles.confirmationTitle}>Booking Confirmed!</h2>
              <p style={styles.confirmationSubtitle}>
                Thank you for choosing Rastasafari Experience, {customerName}!
              </p>
            </td>
          </tr>

          {/* Booking Number */}
          <tr>
            <td style={styles.bookingNumberSection}>
              <p style={styles.bookingNumberLabel}>BOOKING NUMBER</p>
              <p style={styles.bookingNumber}>{bookingNumber}</p>
            </td>
          </tr>

          {/* Booking Details */}
          <tr>
            <td style={styles.detailsSection}>
              <h3 style={styles.sectionTitle}>Booking Details</h3>

              <table style={styles.detailsTable}>
                <tr>
                  <td style={styles.detailLabel}>Date:</td>
                  <td style={styles.detailValue}>{date}</td>
                </tr>
                <tr>
                  <td style={styles.detailLabel}>Session:</td>
                  <td style={styles.detailValue}>{session}</td>
                </tr>
                <tr>
                  <td style={styles.detailLabel}>Participants:</td>
                  <td style={styles.detailValue}>{participants} {participants === 1 ? 'person' : 'people'}</td>
                </tr>
              </table>
            </td>
          </tr>

          {/* Pickup Information */}
          <tr>
            <td style={styles.pickupSection}>
              <h3 style={styles.sectionTitle}>Pickup Information</h3>
              <div style={styles.pickupCard}>
                <p style={styles.pickupIcon}>&#128205;</p>
                <p style={styles.pickupPointName}>{pickupPoint}</p>
                <p style={styles.pickupAddress}>{pickupAddress}</p>
              </div>
            </td>
          </tr>

          {/* Payment Summary */}
          <tr>
            <td style={styles.paymentSection}>
              <h3 style={styles.sectionTitle}>Payment Summary</h3>
              <table style={styles.paymentTable}>
                <tr>
                  <td style={styles.paymentLabel}>
                    ${pricePerPerson} x {participants} {participants === 1 ? 'participant' : 'participants'}
                  </td>
                  <td style={styles.paymentValue}>${pricePerPerson * participants}</td>
                </tr>
                <tr>
                  <td colSpan={2} style={styles.paymentDivider}></td>
                </tr>
                <tr>
                  <td style={styles.totalLabel}>Total Paid</td>
                  <td style={styles.totalValue}>${totalPaid}</td>
                </tr>
              </table>
            </td>
          </tr>

          {/* What to Bring */}
          <tr>
            <td style={styles.bringSection}>
              <h3 style={styles.sectionTitle}>What to Bring</h3>
              <ul style={styles.bringList}>
                <li style={styles.bringItem}>&#128085; Comfortable clothes & swimwear</li>
                <li style={styles.bringItem}>&#129406; Water shoes or sandals with straps</li>
                <li style={styles.bringItem}>&#127774; Sunscreen (reef-safe preferred)</li>
                <li style={styles.bringItem}>&#128247; Waterproof camera or phone case</li>
                <li style={styles.bringItem}>&#128166; Towel</li>
                <li style={styles.bringItem}>&#128176; Extra cash for tips & souvenirs</li>
                <li style={styles.bringItem}>&#127807; Sense of adventure!</li>
              </ul>
            </td>
          </tr>

          {/* Contact Section */}
          <tr>
            <td style={styles.contactSection}>
              <h3 style={styles.sectionTitle}>Questions?</h3>
              <p style={styles.contactText}>
                We're here to help! Contact us anytime:
              </p>
              <p style={styles.phoneNumber}>
                <span style={styles.phoneIcon}>&#128222;</span>
                <a href="tel:+18764457203" style={styles.phoneLink}>876-445-7203</a>
              </p>
              <p style={styles.contactEmail}>
                <a href="mailto:info@rastasafari.com" style={styles.emailLink}>info@rastasafari.com</a>
              </p>
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td style={styles.footer}>
              <p style={styles.footerText}>
                One Love, One Heart - See you in Jamaica!
              </p>
              <div style={styles.socialLinks}>
                <a href="https://facebook.com/rastasafari" style={styles.socialLink}>Facebook</a>
                <span style={styles.socialDivider}>|</span>
                <a href="https://instagram.com/rastasafari" style={styles.socialLink}>Instagram</a>
                <span style={styles.socialDivider}>|</span>
                <a href="https://rastasafari.com" style={styles.socialLink}>Website</a>
              </div>
              <p style={styles.copyright}>
                &copy; {new Date().getFullYear()} Rastasafari Experience. All rights reserved.
              </p>
            </td>
          </tr>

          {/* Bottom Rasta colors */}
          <tr>
            <td style={styles.rastaStripeRed}></td>
          </tr>
          <tr>
            <td style={styles.rastaStripeYellow}></td>
          </tr>
          <tr>
            <td style={styles.rastaStripeGreen}></td>
          </tr>
        </table>
      </body>
    </html>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '#f4f4f4',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderCollapse: 'collapse',
    width: '100%',
  },
  rastaStripeGreen: {
    backgroundColor: '#009B3A',
    height: '8px',
  },
  rastaStripeYellow: {
    backgroundColor: '#FFD700',
    height: '8px',
  },
  rastaStripeRed: {
    backgroundColor: '#CE1126',
    height: '8px',
  },
  logoSection: {
    textAlign: 'center',
    padding: '30px 20px 20px',
    backgroundColor: '#1a1a1a',
  },
  logo: {
    width: '120px',
    height: 'auto',
    marginBottom: '15px',
  },
  brandName: {
    color: '#FFD700',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    letterSpacing: '2px',
  },
  tagline: {
    color: '#ffffff',
    fontSize: '14px',
    margin: 0,
    fontStyle: 'italic',
  },
  confirmationHeader: {
    textAlign: 'center',
    padding: '30px 20px',
    backgroundColor: '#009B3A',
  },
  checkIcon: {
    width: '60px',
    height: '60px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    display: 'inline-block',
    lineHeight: '60px',
    fontSize: '30px',
    color: '#009B3A',
    marginBottom: '15px',
  },
  confirmationTitle: {
    color: '#ffffff',
    fontSize: '28px',
    margin: '10px 0',
    fontWeight: 'bold',
  },
  confirmationSubtitle: {
    color: '#ffffff',
    fontSize: '16px',
    margin: 0,
  },
  bookingNumberSection: {
    textAlign: 'center',
    padding: '25px 20px',
    backgroundColor: '#f8f8f8',
    borderBottom: '1px solid #e0e0e0',
  },
  bookingNumberLabel: {
    color: '#666666',
    fontSize: '12px',
    letterSpacing: '1px',
    margin: '0 0 5px 0',
  },
  bookingNumber: {
    color: '#1a1a1a',
    fontSize: '28px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    margin: 0,
    letterSpacing: '2px',
  },
  detailsSection: {
    padding: '25px 30px',
  },
  sectionTitle: {
    color: '#009B3A',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    borderBottom: '2px solid #FFD700',
    paddingBottom: '10px',
  },
  detailsTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  detailLabel: {
    color: '#666666',
    fontSize: '14px',
    padding: '8px 0',
    width: '40%',
    verticalAlign: 'top',
  },
  detailValue: {
    color: '#1a1a1a',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '8px 0',
    verticalAlign: 'top',
  },
  pickupSection: {
    padding: '25px 30px',
    backgroundColor: '#f8f8f8',
  },
  pickupCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    border: '2px solid #FFD700',
  },
  pickupIcon: {
    fontSize: '30px',
    margin: '0 0 10px 0',
  },
  pickupPointName: {
    color: '#1a1a1a',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
  },
  pickupAddress: {
    color: '#666666',
    fontSize: '14px',
    margin: 0,
    lineHeight: '1.5',
  },
  paymentSection: {
    padding: '25px 30px',
  },
  paymentTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  paymentLabel: {
    color: '#666666',
    fontSize: '14px',
    padding: '10px 0',
  },
  paymentValue: {
    color: '#1a1a1a',
    fontSize: '14px',
    textAlign: 'right',
    padding: '10px 0',
  },
  paymentDivider: {
    borderTop: '1px solid #e0e0e0',
    padding: '0',
  },
  totalLabel: {
    color: '#1a1a1a',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '15px 0 10px',
  },
  totalValue: {
    color: '#009B3A',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'right',
    padding: '15px 0 10px',
  },
  bringSection: {
    padding: '25px 30px',
    backgroundColor: '#f8f8f8',
  },
  bringList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  bringItem: {
    color: '#1a1a1a',
    fontSize: '14px',
    padding: '8px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  contactSection: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#1a1a1a',
  },
  contactText: {
    color: '#ffffff',
    fontSize: '14px',
    margin: '0 0 15px 0',
  },
  phoneNumber: {
    margin: '0 0 10px 0',
  },
  phoneIcon: {
    marginRight: '8px',
  },
  phoneLink: {
    color: '#FFD700',
    fontSize: '20px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  contactEmail: {
    margin: 0,
  },
  emailLink: {
    color: '#ffffff',
    fontSize: '14px',
    textDecoration: 'underline',
  },
  footer: {
    textAlign: 'center',
    padding: '25px 30px',
    backgroundColor: '#2a2a2a',
  },
  footerText: {
    color: '#FFD700',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    fontStyle: 'italic',
  },
  socialLinks: {
    marginBottom: '15px',
  },
  socialLink: {
    color: '#ffffff',
    fontSize: '12px',
    textDecoration: 'none',
    padding: '0 10px',
  },
  socialDivider: {
    color: '#666666',
  },
  copyright: {
    color: '#666666',
    fontSize: '11px',
    margin: 0,
  },
};

// HTML string generator for non-React email sending
export function generateBookingConfirmationHTML(props: BookingConfirmationProps): string {
  const {
    bookingNumber,
    customerName,
    date,
    session,
    participants,
    pickupPoint,
    pickupAddress,
    pricePerPerson = 165,
    totalPaid,
  } = props;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation - Rastasafari Experience</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 15px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table class="container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse; width: 100%;">
    <!-- Rasta Colors Top -->
    <tr><td style="background-color: #009B3A; height: 8px;"></td></tr>
    <tr><td style="background-color: #FFD700; height: 8px;"></td></tr>
    <tr><td style="background-color: #CE1126; height: 8px;"></td></tr>

    <!-- Logo Section -->
    <tr>
      <td style="text-align: center; padding: 30px 20px 20px; background-color: #1a1a1a;">
        <img src="https://rastasafari.com/logo.png" alt="Rastasafari Experience" style="width: 120px; height: auto; margin-bottom: 15px;">
        <h1 style="color: #FFD700; font-size: 24px; font-weight: bold; margin: 0 0 5px 0; letter-spacing: 2px;">RASTASAFARI EXPERIENCE</h1>
        <p style="color: #ffffff; font-size: 14px; margin: 0; font-style: italic;">Jamaica's Authentic Adventure</p>
      </td>
    </tr>

    <!-- Confirmation Header -->
    <tr>
      <td style="text-align: center; padding: 30px 20px; background-color: #009B3A;">
        <div style="width: 60px; height: 60px; background-color: #ffffff; border-radius: 50%; display: inline-block; line-height: 60px; font-size: 30px; color: #009B3A; margin-bottom: 15px;">&#10003;</div>
        <h2 style="color: #ffffff; font-size: 28px; margin: 10px 0; font-weight: bold;">Booking Confirmed!</h2>
        <p style="color: #ffffff; font-size: 16px; margin: 0;">Thank you for choosing Rastasafari Experience, ${customerName}!</p>
      </td>
    </tr>

    <!-- Booking Number -->
    <tr>
      <td style="text-align: center; padding: 25px 20px; background-color: #f8f8f8; border-bottom: 1px solid #e0e0e0;">
        <p style="color: #666666; font-size: 12px; letter-spacing: 1px; margin: 0 0 5px 0;">BOOKING NUMBER</p>
        <p style="color: #1a1a1a; font-size: 28px; font-weight: bold; font-family: monospace; margin: 0; letter-spacing: 2px;">${bookingNumber}</p>
      </td>
    </tr>

    <!-- Booking Details -->
    <tr>
      <td class="content" style="padding: 25px 30px;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">Booking Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #666666; font-size: 14px; padding: 8px 0; width: 40%;">Date:</td>
            <td style="color: #1a1a1a; font-size: 14px; font-weight: bold; padding: 8px 0;">${date}</td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 14px; padding: 8px 0;">Session:</td>
            <td style="color: #1a1a1a; font-size: 14px; font-weight: bold; padding: 8px 0;">${session}</td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 14px; padding: 8px 0;">Participants:</td>
            <td style="color: #1a1a1a; font-size: 14px; font-weight: bold; padding: 8px 0;">${participants} ${participants === 1 ? 'person' : 'people'}</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Pickup Information -->
    <tr>
      <td class="content" style="padding: 25px 30px; background-color: #f8f8f8;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">Pickup Information</h3>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; text-align: center; border: 2px solid #FFD700;">
          <p style="font-size: 30px; margin: 0 0 10px 0;">&#128205;</p>
          <p style="color: #1a1a1a; font-size: 18px; font-weight: bold; margin: 0 0 5px 0;">${pickupPoint}</p>
          <p style="color: #666666; font-size: 14px; margin: 0; line-height: 1.5;">${pickupAddress}</p>
        </div>
      </td>
    </tr>

    <!-- Payment Summary -->
    <tr>
      <td class="content" style="padding: 25px 30px;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">Payment Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #666666; font-size: 14px; padding: 10px 0;">$${pricePerPerson} x ${participants} ${participants === 1 ? 'participant' : 'participants'}</td>
            <td style="color: #1a1a1a; font-size: 14px; text-align: right; padding: 10px 0;">$${pricePerPerson * participants}</td>
          </tr>
          <tr>
            <td colspan="2" style="border-top: 1px solid #e0e0e0; padding: 0;"></td>
          </tr>
          <tr>
            <td style="color: #1a1a1a; font-size: 16px; font-weight: bold; padding: 15px 0 10px;">Total Paid</td>
            <td style="color: #009B3A; font-size: 24px; font-weight: bold; text-align: right; padding: 15px 0 10px;">$${totalPaid}</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- What to Bring -->
    <tr>
      <td class="content" style="padding: 25px 30px; background-color: #f8f8f8;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">What to Bring</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="color: #1a1a1a; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">&#128085; Comfortable clothes & swimwear</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">&#129406; Water shoes or sandals with straps</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">&#127774; Sunscreen (reef-safe preferred)</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">&#128247; Waterproof camera or phone case</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">&#128166; Towel</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">&#128176; Extra cash for tips & souvenirs</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 8px 0;">&#127807; Sense of adventure!</li>
        </ul>
      </td>
    </tr>

    <!-- Contact Section -->
    <tr>
      <td style="text-align: center; padding: 30px; background-color: #1a1a1a;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px; display: inline-block;">Questions?</h3>
        <p style="color: #ffffff; font-size: 14px; margin: 0 0 15px 0;">We're here to help! Contact us anytime:</p>
        <p style="margin: 0 0 10px 0;">
          <span style="margin-right: 8px;">&#128222;</span>
          <a href="tel:+18764457203" style="color: #FFD700; font-size: 20px; font-weight: bold; text-decoration: none;">876-445-7203</a>
        </p>
        <p style="margin: 0;">
          <a href="mailto:info@rastasafari.com" style="color: #ffffff; font-size: 14px; text-decoration: underline;">info@rastasafari.com</a>
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="text-align: center; padding: 25px 30px; background-color: #2a2a2a;">
        <p style="color: #FFD700; font-size: 16px; font-weight: bold; margin: 0 0 15px 0; font-style: italic;">One Love, One Heart - See you in Jamaica!</p>
        <div style="margin-bottom: 15px;">
          <a href="https://facebook.com/rastasafari" style="color: #ffffff; font-size: 12px; text-decoration: none; padding: 0 10px;">Facebook</a>
          <span style="color: #666666;">|</span>
          <a href="https://instagram.com/rastasafari" style="color: #ffffff; font-size: 12px; text-decoration: none; padding: 0 10px;">Instagram</a>
          <span style="color: #666666;">|</span>
          <a href="https://rastasafari.com" style="color: #ffffff; font-size: 12px; text-decoration: none; padding: 0 10px;">Website</a>
        </div>
        <p style="color: #666666; font-size: 11px; margin: 0;">&copy; ${new Date().getFullYear()} Rastasafari Experience. All rights reserved.</p>
      </td>
    </tr>

    <!-- Rasta Colors Bottom -->
    <tr><td style="background-color: #CE1126; height: 8px;"></td></tr>
    <tr><td style="background-color: #FFD700; height: 8px;"></td></tr>
    <tr><td style="background-color: #009B3A; height: 8px;"></td></tr>
  </table>
</body>
</html>
  `;
}

export default BookingConfirmationEmail;
