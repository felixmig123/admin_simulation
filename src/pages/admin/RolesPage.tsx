import React, { useState, useEffect } from 'react';
import { localStorageService, STORAGE_KEYS } from '../../services/localStorageService';
import { TableComponent } from '../../components/common/TableComponent';
import { Button } from '../../components/common/Button';
import { ModalComponent } from '../../components/common/ModalComponent';
import { RoleForm } from '../../components/admin/RoleForm';
import type { Role } from '../../types/models';

export const RolesPage = () => {
  const [data, setData] = useState<Role[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
        const roles = localStorageService.getAll<Role>(STORAGE_KEYS.ROLES);
        setData(roles);
        setIsLoading(false);
    }, 300);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      localStorageService.delete<Role>(STORAGE_KEYS.ROLES, id);
      fetchData();
    }
  };

  const handleSave = (roleData: Omit<Role, 'id' | 'userCount' | 'updatedAt'>) => {
    setIsLoading(true);
    setTimeout(() => {
       try {
           if (editingRole) {
             localStorageService.update<Role>(STORAGE_KEYS.ROLES, editingRole.id, {
               ...roleData,
               updatedAt: new Date().toISOString().split('T')[0]
             });
           } else {
             const newRole: Role = {
               id: `role-${Date.now()}`,
               ...roleData,
               userCount: 0,
               updatedAt: new Date().toISOString().split('T')[0]
             };
             localStorageService.add<Role>(STORAGE_KEYS.ROLES, newRole);
           }
           setIsModalOpen(false);
           fetchData();
       } catch (error) {
           console.error("Failed to save role", error);
       } finally {
           setIsLoading(false);
       }
    }, 500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRole(null);
  };

  const columns = [
    { 
        header: 'Role Name', 
        accessorKey: 'name' as const,
        render: (r: Role) => (
            <div>
                <div className="font-bold text-gray-900 dark:text-white">{r.name}</div>
                {r.description && <div className="text-xs text-gray-500">{r.description}</div>}
            </div>
        )
    },
    { 
        header: 'Permissions', 
        render: (r: Role) => (
            <span className="inline-flex items-center px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium">
                {r.permissions.length} access points
            </span>
        )
    },
    { 
        header: 'Users', 
        accessorKey: 'userCount' as const,
        render: (r: Role) => (
             <div className="flex items-center gap-1">
                 <span className="material-symbols-outlined text-[16px] text-gray-400">group</span>
                 <span>{r.userCount}</span>
             </div>
        )
    },
    { header: 'Last Updated', accessorKey: 'updatedAt' as const },
    {
      header: 'Actions',
      className: 'text-right',
      render: (r: Role) => (
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => handleEdit(r)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-[#283936] rounded text-gray-500 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button 
            onClick={() => handleDelete(r.id)}
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Role Management</h1>
          <p className="text-sm text-gray-500 dark:text-[#9db9b4]">Create and manage system roles and permissions</p>
        </div>
        <Button onClick={() => { setEditingRole(null); setIsModalOpen(true); }} leftIcon={<span className="material-symbols-outlined">add</span>}>
          Create Role
        </Button>
      </div>

      <TableComponent<Role>
        data={data}
        columns={columns}
        keyExtractor={(r) => r.id}
        isLoading={isLoading}
        emptyMessage="No roles found. Create one to get started."
      />

      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingRole ? 'Edit Role' : 'Create New Role'}
        size="lg"
      >
        <RoleForm
          initialData={editingRole}
          onSubmit={handleSave}
          onCancel={closeModal}
          isLoading={isLoading}
        />
      </ModalComponent>
    </div>
  );
};
