import React from 'react';
import { cn } from './Button';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#9db9b4] flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-[#3b544f] bg-white dark:bg-[#1c2725] focus:border-primary dark:focus:border-primary h-12 placeholder:text-slate-400 dark:placeholder:text-[#9db9b4] text-base font-normal leading-normal text-slate-900 dark:text-white transition-colors",
              leftIcon && "pl-[48px]",
              rightIcon && "pr-[48px]",
              error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#9db9b4] flex items-center cursor-pointer">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
