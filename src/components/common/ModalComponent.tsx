import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function ModalComponent({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) {

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/75 dark:bg-black/80 transition-opacity backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div 
        className={cn(
          "relative transform overflow-hidden rounded-xl bg-white dark:bg-[#111817] shadow-2xl transition-all w-full flex flex-col max-h-[90vh]",
          sizes[size]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#283936] px-6 py-4">
          <h3 className="text-lg font-bold leading-6 text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            className="rounded-md bg-transparent text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="bg-gray-50 dark:bg-[#1c2725] px-6 py-4 flex flex-row-reverse gap-3 border-t border-gray-200 dark:border-[#283936]">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
