import { useState, useEffect } from 'react';
import { localStorageService, STORAGE_KEYS } from '../../services/localStorageService';
import { TableComponent } from '../../components/common/TableComponent';
import { Button } from '../../components/common/Button';
import { ModalComponent } from '../../components/common/ModalComponent';
import { Input } from '../../components/common/Input';
import { UserForm } from '../../components/admin/UserForm';
import type{ User, Role } from '../../types/models';

export const UsersPage = () => {
  const [data, setData] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
        const users = localStorageService.getAll<User>(STORAGE_KEYS.USERS);
        const loadedRoles = localStorageService.getAll<Role>(STORAGE_KEYS.ROLES);
        setData(users);
        setRoles(loadedRoles);
        setIsLoading(false);
    }, 400);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      localStorageService.delete<User>(STORAGE_KEYS.USERS, id);
      fetchData();
    }
  };

  const handleSave = (userData: Partial<User>) => {
    setIsLoading(true);
    setTimeout(() => {
       try {
           if (editingUser) {
             localStorageService.update<User>(STORAGE_KEYS.USERS, editingUser.id, userData);
           } else {
             const newUser: User = {
               id: `user-${Date.now()}`,
               username: userData.username!,
               email: userData.email!,
               roleId: userData.roleId!,
               status: userData.status || 'active',
               avatarUrl: `https://ui-avatars.com/api/?name=${userData.username}&background=random`,
               createdAt: new Date().toISOString().split('T')[0]
             };
             localStorageService.add<User>(STORAGE_KEYS.USERS, newUser);
           }
           setIsModalOpen(false);
           fetchData();
       } catch (error) {
           console.error("Failed to save user", error);
       } finally {
           setIsLoading(false);
       }
    }, 500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const getRoleName = (roleId: string) => {
      const role = roles.find(r => r.id === roleId);
      return role ? role.name : 'Unknown';
  };

  const filteredData = data.filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { 
        header: 'User', 
        accessorKey: 'username' as const,
        render: (u: User) => (
            <div className="flex items-center gap-3">
                <div 
                    className="size-10 rounded-full bg-cover bg-center border border-gray-200 dark:border-[#3b544f]"
                    style={{ backgroundImage: `url(${u.avatarUrl})` }}
                ></div>
                <div>
                    <div className="font-bold text-gray-900 dark:text-white">{u.username}</div>
                    <div className="text-xs text-gray-500">{u.email}</div>
                </div>
            </div>
        )
    },
    { 
        header: 'Role', 
        accessorKey: 'roleId' as const,
        render: (u: User) => (
            <span className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                <span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
                {getRoleName(u.roleId)}
            </span>
        )
    },
    { 
        header: 'Status', 
        accessorKey: 'status' as const,
        render: (u: User) => (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                u.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                u.status === 'offline' ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' : 
                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
                <span className={`size-1.5 rounded-full ${
                    u.status === 'active' ? 'bg-emerald-500' :
                    u.status === 'offline' ? 'bg-slate-500' : 'bg-red-500'
                }`}></span>
                {u.status}
            </span>
        )
    },
    { header: 'Created', accessorKey: 'createdAt' as const },
    {
      header: 'Actions',
      className: 'text-right',
      render: (u: User) => (
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => handleEdit(u)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-[#283936] rounded text-gray-500 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button 
            onClick={() => handleDelete(u.id)}
            className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-gray-500 hover:text-red-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-sm text-gray-500 dark:text-[#9db9b4]">Manage system access and profiles</p>
        </div>
        <Button onClick={() => { setEditingUser(null); setIsModalOpen(true); }} leftIcon={<span className="material-symbols-outlined">person_add</span>}>
          Add User
        </Button>
      </div>

      <div className="w-full max-w-md">
          <Input 
             placeholder="Search users..." 
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
             leftIcon={<span className="material-symbols-outlined">search</span>}
          />
      </div>

      <TableComponent<User>
        data={filteredData}
        columns={columns}
        keyExtractor={(u) => u.id}
        isLoading={isLoading}
        emptyMessage="No users found matching your search."
      />

      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingUser ? 'Edit User' : 'Create New User'}
        size="md"
      >
        <UserForm
          initialData={editingUser}
          onSubmit={handleSave}
          onCancel={closeModal}
          isLoading={isLoading}
        />
      </ModalComponent>
    </div>
  );
};
