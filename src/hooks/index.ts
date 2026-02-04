/**
 * Rastasafari Experience - Custom React Hooks
 *
 * Collection de hooks personnalisés pour l'application de réservation
 * de tours Rastasafari en Jamaïque.
 */

// Booking Management
export {
  useBooking,
  type BookingState,
  type BookingSession,
  type Participant,
  type PickupLocation,
  type BookingValidation,
  type UseBookingReturn,
} from './useBooking';

// Availability Checking
export {
  useAvailability,
  type DayAvailability,
  type TimeSlot,
  type AvailabilityState,
  type UseAvailabilityReturn,
} from './useAvailability';

// Payment Processing
export {
  usePayment,
  type PaymentStatus,
  type PaymentState,
  type UsePaymentReturn,
  type CustomerData,
  type PaymentIntentData,
  type BookingConfirmation,
} from './usePayment';

// Calendar Navigation
export {
  useCalendar,
  type CalendarDay,
  type CalendarState,
  type DisabledDates,
  type UseCalendarReturn,
} from './useCalendar';

// Mobile Menu
export {
  useMobileMenu,
  type MobileMenuState,
  type UseMobileMenuOptions,
  type UseMobileMenuReturn,
} from './useMobileMenu';

// Toast Notifications
export {
  useToast,
  type Toast,
  type ToastType,
  type ToastOptions,
  type UseToastOptions,
  type UseToastReturn,
} from './useToast';

// Local Storage
export {
  useLocalStorage,
  useBookingStorage,
  useCartStorage,
  type UseLocalStorageOptions,
  type StoredBooking,
  type StoredCart,
  type CartItem,
  type UseLocalStorageReturn,
} from './useLocalStorage';
