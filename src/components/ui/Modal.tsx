'use client';

import React, { useEffect, useRef, HTMLAttributes, forwardRef } from 'react';

// Couleurs Rasta
const RASTA_COLORS = {
  green: '#009B3A',
  gold: '#FED100',
  red: '#E31C23',
} as const;

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
}

const sizeStyles: Record<ModalSize, { maxWidth: string; width: string }> = {
  sm: {
    maxWidth: '24rem',
    width: '90%',
  },
  md: {
    maxWidth: '32rem',
    width: '90%',
  },
  lg: {
    maxWidth: '48rem',
    width: '90%',
  },
  xl: {
    maxWidth: '64rem',
    width: '90%',
  },
  full: {
    maxWidth: '100%',
    width: '100%',
  },
};

// Close icon SVG
const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      size = 'md',
      closeOnBackdrop = true,
      closeOnEscape = true,
      showCloseButton = true,
      footer,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const sizeConfig = sizeStyles[size];

    // Handle escape key
    useEffect((): (() => void) | void => {
      if (!closeOnEscape) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, closeOnEscape]);

    // Lock body scroll when modal is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    // Focus trap
    useEffect(() => {
      if (isOpen && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        firstElement?.focus();
      }
    }, [isOpen]);

    if (!isOpen) return null;

    const backdropStyles: React.CSSProperties = {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: size === 'full' ? 0 : '1rem',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.2s ease-out',
    };

    const modalStyles: React.CSSProperties = {
      position: 'relative',
      maxWidth: sizeConfig.maxWidth,
      width: sizeConfig.width,
      maxHeight: size === 'full' ? '100%' : '90vh',
      backgroundColor: 'white',
      borderRadius: size === 'full' ? 0 : '0.75rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      animation: 'slideIn 0.3s ease-out',
      ...style,
    };

    const headerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 1.5rem',
      borderBottom: '1px solid #e5e7eb',
    };

    const titleStyles: React.CSSProperties = {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1a1a1a',
      margin: 0,
    };

    const closeButtonStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '2rem',
      height: '2rem',
      padding: 0,
      border: 'none',
      borderRadius: '0.375rem',
      backgroundColor: 'transparent',
      color: '#6b7280',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
    };

    const bodyStyles: React.CSSProperties = {
      flex: 1,
      padding: '1.5rem',
      overflowY: 'auto',
    };

    const footerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '0.75rem',
      padding: '1rem 1.5rem',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb',
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (closeOnBackdrop && e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <>
        {/* CSS Keyframes */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(-10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>

        {/* Backdrop */}
        <div
          className="rasta-modal-backdrop"
          style={backdropStyles}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          {/* Modal */}
          <div
            ref={modalRef}
            className={`rasta-modal rasta-modal--${size} ${className}`}
            style={modalStyles}
            {...props}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="rasta-modal__header" style={headerStyles}>
                {title && (
                  <h2 id="modal-title" style={titleStyles}>
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    style={closeButtonStyles}
                    aria-label="Fermer"
                    className="rasta-modal__close"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="rasta-modal__body" style={bodyStyles}>
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="rasta-modal__footer" style={footerStyles}>
                {footer}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

Modal.displayName = 'Modal';

// Convenience components
export interface ConfirmModalProps extends Omit<ModalProps, 'footer'> {
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: 'primary' | 'danger';
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  onConfirm,
  onClose,
  variant = 'primary',
  isLoading = false,
  children,
  ...props
}) => {
  const confirmButtonStyles: React.CSSProperties = {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    borderRadius: '0.375rem',
    border: 'none',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.6 : 1,
    backgroundColor: variant === 'danger' ? RASTA_COLORS.red : RASTA_COLORS.green,
    color: 'white',
  };

  const cancelButtonStyles: React.CSSProperties = {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    color: '#374151',
    cursor: 'pointer',
  };

  return (
    <Modal
      size="sm"
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            style={cancelButtonStyles}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={confirmButtonStyles}
            disabled={isLoading}
          >
            {isLoading ? 'Chargement...' : confirmText}
          </button>
        </>
      }
      {...props}
    >
      {children}
    </Modal>
  );
};

export default Modal;
