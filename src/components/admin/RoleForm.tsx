import React, { useState, useEffect } from 'react';
import { Role, Permission } from '../../types/models';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface RoleFormProps {
  initialData?: Role | null;
  onSubmit: (data: Omit<Role, 'id' | 'userCount' | 'updatedAt'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ALL_PERMISSIONS: { group: string; perms: Permission[] }[] = [
  { group: 'Users', perms: ['users.view', 'users.create', 'users.edit', 'users.delete'] },
  { group: 'Roles', perms: ['roles.view', 'roles.create', 'roles.edit', 'roles.delete'] },
  { group: 'Products', perms: ['products.view', 'products.create', 'products.edit', 'products.delete'] },
  { group: 'Categories', perms: ['categories.view', 'categories.create', 'categories.edit', 'categories.delete'] },
  { group: 'Database', perms: ['database.view', 'database.manage'] },
];

export const RoleForm = ({ initialData, onSubmit, onCancel, isLoading }: RoleFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
      setSelectedPermissions(initialData.permissions);
    }
  }, [initialData]);

  const togglePermission = (perm: Permission) => {
    setSelectedPermissions(prev => 
      prev.includes(perm) 
        ? prev.filter(p => p !== perm)
        : [...prev, perm]
    );
  };

  const toggleGroup = (perms: Permission[]) => {
    const allSelected = perms.every(p => selectedPermissions.includes(p));
    if (allSelected) {
      setSelectedPermissions(prev => prev.filter(p => !perms.includes(p)));
    } else {
      setSelectedPermissions(prev => [...new Set([...prev, ...perms])]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      permissions: selectedPermissions
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Input
          label="Role Name"
          placeholder="e.g. Editor"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Input
          label="Description"
          placeholder="Role description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Permissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ALL_PERMISSIONS.map((group) => {
             const groupSelected = group.perms.every(p => selectedPermissions.includes(p));
             const groupIndeterminate = group.perms.some(p => selectedPermissions.includes(p)) && !groupSelected;

             return (
              <div key={group.group} className="bg-gray-50 dark:bg-[#1c2725] p-4 rounded-lg border border-gray-200 dark:border-[#283936]">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-[#3b544f]">
                  <input
                    type="checkbox"
                    checked={groupSelected}
                    ref={input => { if (input) input.indeterminate = groupIndeterminate; }}
                    onChange={() => toggleGroup(group.perms)}
                    className="rounded border-gray-300 dark:border-[#3b544f] text-primary focus:ring-primary bg-white dark:bg-[#111817] cursor-pointer"
                  />
                  <span className="font-bold text-sm text-gray-700 dark:text-gray-200">{group.group} Management</span>
                </div>
                
                <div className="flex flex-col gap-2 pl-6">
                  {group.perms.map(perm => (
                    <label key={perm} className="flex items-center gap-2 cursor-pointer group/item">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                        className="rounded border-gray-300 dark:border-[#3b544f] text-primary focus:ring-primary bg-white dark:bg-[#111817] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 dark:text-[#9db9b4] group-hover/item:text-primary transition-colors">
                        {perm.split('.')[1]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-[#3b544f]">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading} disabled={name.trim().length === 0}>
          {initialData ? 'Update Role' : 'Create Role'}
        </Button>
      </div>
    </form>
  );
};
