// Rastasafari UI Component Library
// Couleurs Rasta: vert #009B3A, or #FED100, rouge #E31C23

// Button
export { Button, default as ButtonDefault } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

// Card
export { Card, CardHeader, CardBody, CardFooter, default as CardDefault } from './Card';
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps, CardVariant } from './Card';

// Input
export { Input, default as InputDefault } from './Input';
export type { InputProps, InputState, InputSize } from './Input';

// Select
export { Select, default as SelectDefault } from './Select';
export type { SelectProps, SelectOption, SelectState, SelectSize } from './Select';

// Badge
export { Badge, TopBadge, IncludedBadge, NewBadge, default as BadgeDefault } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './Badge';

// Rating
export { Rating, RatingWithReviews, default as RatingDefault } from './Rating';
export type { RatingProps, RatingSize, RatingScale } from './Rating';

// Modal
export { Modal, ConfirmModal, default as ModalDefault } from './Modal';
export type { ModalProps, ModalSize, ConfirmModalProps } from './Modal';

// Spinner
export { Spinner, LoadingOverlay, default as SpinnerDefault } from './Spinner';
export type { SpinnerProps, SpinnerSize, SpinnerVariant, LoadingOverlayProps } from './Spinner';

// Alert
export {
  Alert,
  SuccessAlert,
  ErrorAlert,
  WarningAlert,
  InfoAlert,
  default as AlertDefault,
} from './Alert';
export type { AlertProps, AlertVariant } from './Alert';

// Rasta Colors constant for use in other components
export const RASTA_COLORS = {
  green: '#009B3A',
  gold: '#FED100',
  red: '#E31C23',
} as const;

// Type for Rasta colors
export type RastaColor = keyof typeof RASTA_COLORS;
