import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../common/Button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: 'dashboard', end: true },
    { name: 'Roles', path: '/admin/roles', icon: 'shield_person' },
    { name: 'Users', path: '/admin/users', icon: 'group' },
    { name: 'Categories', path: '/admin/categories', icon: 'category' },
    { name: 'Products', path: '/admin/products', icon: 'inventory_2' },
    { name: 'Database', path: '/admin/database', icon: 'database' },
    { name: 'Settings', path: '/admin/settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-gray-900/50 z-20 md:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 z-30 w-72 bg-[#10221f] border-r border-[#283936] transform transition-transform duration-300 ease-in-out flex flex-col h-full",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 flex flex-col gap-8 h-full">
          {/* Brand */}
          <div className="flex gap-4 items-center">
             <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shadow-inner border border-[#283936] bg-primary/20 flex items-center justify-center text-primary">
                 <span className="material-symbols-outlined">admin_panel_settings</span>
             </div>
             <div className="flex flex-col">
               <h1 className="text-white text-lg font-bold leading-tight">Admin Panel</h1>
               <p className="text-[#9db9b4] text-xs font-medium uppercase">Management System</p>
             </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                  isActive 
                    ? "bg-[#283936] text-white" 
                    : "text-[#9db9b4] hover:bg-[#182d29] hover:text-white"
                )}
              >
                <div className={cn(
                    "text-[24px] material-symbols-outlined",
                    // Use active state for filled icon style if desired, or keep outlined
                )}>
                    {item.icon}
                </div>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-[#283936]">
            <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-[#9db9b4] hover:bg-[#182d29] hover:text-white transition-colors text-sm font-medium">
               <span className="material-symbols-outlined">logout</span>
               <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
