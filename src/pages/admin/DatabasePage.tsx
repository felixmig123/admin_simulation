import React, { useState, useEffect } from 'react';
import { localStorageService, STORAGE_KEYS } from '../../services/localStorageService';
import { Button } from '../../components/common/Button';
import { TableComponent } from '../../components/common/TableComponent';
import type { User, Role, Category, Product } from '../../types/models';

type Tab = 'users' | 'roles' | 'categories' | 'products';

export const DatabasePage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [viewMode, setViewMode] = useState<'table' | 'json'>('table');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize DB on first load (if empty)
  useEffect(() => {
    localStorageService.initialize();
    fetchData();
  }, [activeTab]);

  const fetchData = () => {
    setIsLoading(true);
    setData([]); // Clear data to prevent type mismatches during transition
    // Add small delay to verify loading states
    setTimeout(() => {
        let result: any[] = [];
        switch (activeTab) {
        case 'users': result = localStorageService.getAll<User>(STORAGE_KEYS.USERS); break;
        case 'roles': result = localStorageService.getAll<Role>(STORAGE_KEYS.ROLES); break;
        case 'categories': result = localStorageService.getAll<Category>(STORAGE_KEYS.CATEGORIES); break;
        case 'products': result = localStorageService.getAll<Product>(STORAGE_KEYS.PRODUCTS); break;
        }
        setData(result);
        setIsLoading(false);
    }, 400); 
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the database? All changes will be lost.')) {
      localStorageService.resetDatabase();
      fetchData();
    }
  };

  // --- Table Columns Definition ---
  const userColumns = [
    { header: 'ID', accessorKey: 'id' as const },
    { header: 'Username', accessorKey: 'username' as const },
    { header: 'Email', accessorKey: 'email' as const },
    { header: 'Role', accessorKey: 'roleId' as const },
    { 
        header: 'Status', 
        render: (u: User) => (
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                u.status === 'active' ? 'bg-green-100 text-green-700' :
                u.status === 'offline' ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'
            }`}>
                {(u.status || 'unknown').toUpperCase()}
            </span>
        ) 
    }
  ];

  const roleColumns = [
    { header: 'ID', accessorKey: 'id', className: 'w-32' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Users Count', accessorKey: 'userCount', className: 'text-center' },
    { 
        header: 'Permissions', 
        render: (r: Role) => <span className="text-xs text-gray-500">{r.permissions?.length ?? 0} permissions</span> 
    }
  ];

  const categoryColumns = [
      { header: 'ID', accessorKey: 'id', className: 'w-24 font-mono text-xs' },
      { header: 'Name', accessorKey: 'name' },
      { header: 'Products', accessorKey: 'productCount' }
  ];

  const productColumns = [
      { header: 'ID', accessorKey: 'id', className: 'w-24 font-mono text-xs' },
      { header: 'Name', accessorKey: 'name' },
      { header: 'Price', render: (p: Product) => `$${(p.price || 0).toFixed(2)}` },
      { header: 'Stock', accessorKey: 'stock' },
      { header: 'Status', accessorKey: 'status' }
  ];

  const renderTable = () => {
      // Dynamic casting based on active tab would be complex, so we manually map
      switch(activeTab) {
          case 'users': return <TableComponent<User> data={data} columns={userColumns} keyExtractor={i => i.id} isLoading={isLoading} />;
          case 'roles': return <TableComponent<Role> data={data} columns={roleColumns as any} keyExtractor={i => i.id} isLoading={isLoading} />;
          case 'categories': return <TableComponent<Category> data={data} columns={categoryColumns as any} keyExtractor={i => i.id} isLoading={isLoading} />;
          case 'products': return <TableComponent<Product> data={data} columns={productColumns as any} keyExtractor={i => i.id} isLoading={isLoading} />;
          default: return null;
      }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Database Viewer</h1>
           <p className="text-gray-500 dark:text-[#9db9b4]">Inspect and manage abstract data entities</p>
        </div>
        <div className="flex gap-3">
             <Button variant="outline" onClick={fetchData} isLoading={isLoading} leftIcon={<span className="material-symbols-outlined">refresh</span>}>
                 Refresh
             </Button>
             <Button variant="danger" onClick={handleReset} leftIcon={<span className="material-symbols-outlined">restart_alt</span>}>
                 Reset DB
             </Button>
        </div>
      </div>

      {/* Stats Cards Row (Mocked Stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-[#111817] rounded-xl border border-gray-200 dark:border-[#283936] shadow-sm">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Storage Used</span>
              <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {((JSON.stringify(data).length / 1024)).toFixed(2)} KB
              </div>
          </div>
          {/* Add more stats if needed */}
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-[#111817] rounded-xl border border-gray-200 dark:border-[#283936] shadow-sm overflow-hidden flex flex-col min-h-[500px]">
         
         {/* Toolbar */}
         <div className="px-6 py-4 border-b border-gray-200 dark:border-[#283936] flex flex-wrap items-center justify-between gap-4">
            
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-[#182d29] rounded-lg">
                {(['users', 'roles', 'categories', 'products'] as Tab[]).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-md text-sm font-bold capitalize transition-all ${
                            activeTab === tab 
                            ? 'bg-white dark:bg-[#283936] text-primary shadow-sm' 
                            : 'text-gray-500 dark:text-[#9db9b4] hover:text-gray-700'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* View Toggles */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                    title="Table View"
                >
                     <span className="material-symbols-outlined">table_chart</span>
                </button>
                <button
                    onClick={() => setViewMode('json')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'json' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                    title="JSON View"
                >
                     <span className="material-symbols-outlined">data_object</span>
                </button>
            </div>
         </div>

         {/* View Content */}
         <div className="p-6 flex-1 bg-gray-50/50 dark:bg-[#111817]">
             {viewMode === 'table' ? (
                 renderTable()
             ) : (
                 <div className="relative">
                    <pre className="p-4 rounded-lg bg-gray-900 text-green-400 font-mono text-xs overflow-auto max-h-[600px] border border-gray-700 shadow-inner">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                 </div>
             )}
         </div>

      </div>
    </div>
  );
};
