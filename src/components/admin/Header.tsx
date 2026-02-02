import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="border-b border-gray-200 dark:border-[#283936] bg-white dark:bg-[#10221f] sticky top-0 z-20">
      <div className="flex items-center justify-between gap-4 px-6 md:px-10 py-4">
        
        {/* Mobile Menu Button */}
        <button 
            onClick={onMenuClick}
            className="md:hidden p-2 text-gray-500 dark:text-[#9db9b4] hover:bg-gray-100 dark:hover:bg-[#182d29] rounded-lg"
        >
            <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-[480px]">
          <label className="flex flex-col w-full">
            <div className="relative w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#9db9b4]">
                 <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input 
                placeholder="Search anything..." 
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-gray-100 dark:bg-[#182d29] h-11 pl-11 pr-4 text-sm font-normal leading-normal placeholder:text-gray-500 dark:placeholder:text-[#9db9b4] transition-all"
              />
            </div>
          </label>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
            <button className="text-gray-500 dark:text-[#9db9b4] hover:text-primary transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#10221f]"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-gray-200 dark:bg-[#283936] hidden sm:block"></div>
            
            <div className="flex items-center gap-3 cursor-pointer">
                <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-200 dark:border-[#283936]"
                    style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/60070502-39bd-4aff-b2e5-3924df502570.png")' }}
                ></div>
                <div className="flex flex-col hidden sm:flex">
                    <span className="text-gray-900 dark:text-white text-sm font-bold leading-tight">Admin User</span>
                    <span className="text-gray-500 dark:text-[#9db9b4] text-xs font-medium">Super Admin</span>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};
