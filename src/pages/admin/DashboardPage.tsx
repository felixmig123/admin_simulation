import React, { useEffect, useState } from 'react';
import { localStorageService, STORAGE_KEYS } from '../../services/localStorageService';
import { RecentActivity } from '../../components/admin/RecentActivity';
import type { User, Product, Role } from '../../types/models';

export const DashboardPage = () => {
  const [stats, setStats] = useState({
      users: 0,
      roles: 0,
      products: 0,
      lowStock: 0,
      revenue: 12450.00 // Mock revenue
  });
  
  useEffect(() => {
     // Calculate real stats from local data
     const users = localStorageService.getAll<User>(STORAGE_KEYS.USERS);
     const roles = localStorageService.getAll<Role>(STORAGE_KEYS.ROLES);
     const products = localStorageService.getAll<Product>(STORAGE_KEYS.PRODUCTS);
     
     const lowStockCount = products.filter(p => p.stock < 10).length;

     setStats({
         users: users.length,
         roles: roles.length,
         products: products.length,
         lowStock: lowStockCount,
         revenue: 12450 + (products.length * 100) // Dynamic-ish number
     });
  }, []);

  const StatCard = ({ title, value, icon, color, subtext }: any) => (
      <div className="bg-white dark:bg-[#1c2725] rounded-xl border border-gray-200 dark:border-[#283936] p-6 flex items-start justify-between">
          <div>
              <p className="text-sm font-medium text-gray-500 dark:text-[#9db9b4]">{title}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
              {subtext && <p className="text-xs text-green-600 mt-2 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  {subtext}
              </p>}
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
              <span className="material-symbols-outlined text-white">{icon}</span>
          </div>
      </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-[#9db9b4]">Overview of system metrics and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
             title="Total Users" 
             value={stats.users} 
             icon="group" 
             color="bg-blue-500" 
             subtext="+2 this week"
          />
          <StatCard 
             title="Total Revenue" 
             value={`$${stats.revenue.toLocaleString()}`} 
             icon="payments" 
             color="bg-emerald-500" 
             subtext="+15% vs last month"
          />
          <StatCard 
             title="Products" 
             value={stats.products} 
             icon="inventory_2" 
             color="bg-purple-500" 
             subtext={`${stats.lowStock} low stock`}
          />
          <StatCard 
             title="System Roles" 
             value={stats.roles} 
             icon="shield" 
             color="bg-orange-500" 
          />
      </div>

      {/* Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Area (Simulated) */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1c2725] rounded-xl border border-gray-200 dark:border-[#283936] p-6">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Overview</h3>
                  <select className="bg-gray-50 dark:bg-[#111817] border border-gray-200 dark:border-[#3b544f] rounded-lg text-sm px-2 py-1">
                      <option>Last 7 Days</option>
                      <option>Last Month</option>
                      <option>Last Year</option>
                  </select>
              </div>
              
              {/* CSS-Only Bar Chart Simulation */}
              <div className="h-[300px] flex items-end justify-between gap-2 pt-6">
                  {[45, 60, 35, 70, 50, 40, 65, 80, 55, 45, 75, 90].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                          <div 
                             className="w-full bg-primary/20 group-hover:bg-primary transition-all rounded-t-sm relative"
                             style={{ height: `${h}%` }}
                          >
                             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                 ${h * 150}
                             </div>
                          </div>
                      </div>
                  ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-400 font-bold uppercase">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
              <RecentActivity />
          </div>
      </div>
    </div>
  );
};
