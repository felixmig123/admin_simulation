import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-gray-900 dark:text-white font-display overflow-hidden">
        {/* Simple Header */}
        <header className="w-full border-b border-gray-200 dark:border-[#283936] bg-white dark:bg-[#10221f]">
            <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
                    <h2 className="text-lg font-bold">Admin Panel</h2>
                </div>
            </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
             <div className="flex flex-col items-center gap-8 text-center max-w-lg">
                <div className="relative flex items-center justify-center">
                    <h1 className="text-[120px] md:text-[180px] font-extrabold leading-none text-primary/10 select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       {/* Illustration placeholder or icon */}
                       <span className="material-symbols-outlined text-[80px] text-primary/50">search_off</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 animate-fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">Page not found</h2>
                    <p className="text-gray-500 dark:text-[#9db9b4] text-lg">
                        Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or possibly never existed.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
                    <Link to="/admin">
                        <Button variant="primary" size="lg" leftIcon={<span className="material-symbols-outlined">dashboard</span>}>
                            Go to Dashboard
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="outline" size="lg" leftIcon={<span className="material-symbols-outlined">login</span>}>
                            Back to Login
                        </Button>
                    </Link>
                </div>
             </div>
        </main>
    </div>
  );
};
