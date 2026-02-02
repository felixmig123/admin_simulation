import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center py-10 px-4 relative overflow-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-white transition-colors duration-300">
      {/* Background Decor (Optional - can add SVGs or gradients here if needed to match design) */}
      
      <div className="relative z-10 w-full max-w-[480px] flex flex-col gap-6">
        <Outlet />
      </div>
    </div>
  );
};
