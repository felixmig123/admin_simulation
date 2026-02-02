import React, { useState, useEffect } from 'react';
import type { User, Role } from '../../types/models';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { localStorageService, STORAGE_KEYS } from '../../services/localStorageService';

interface UserFormProps {
  initialData?: User | null;
  onSubmit: (data: Partial<User>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const UserForm = ({ initialData, onSubmit, onCancel, isLoading }: UserFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('');
  const [status, setStatus] = useState<User['status']>('active');
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    // Load roles for dropdown
    const loadedRoles = localStorageService.getAll<Role>(STORAGE_KEYS.ROLES);
    setRoles(loadedRoles);

    if (initialData) {
      setUsername(initialData.username);
      setEmail(initialData.email);
      setRoleId(initialData.roleId);
      setStatus(initialData.status);
    } else if (loadedRoles.length > 0) {
       // Default to first role
       setRoleId(loadedRoles[0].id);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      username,
      email,
      roleId,
      status
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
         {/* Avatar Preview (Mock) */}
         <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#1c2725] rounded-lg border border-gray-100 dark:border-[#283936]">
            <div className="size-16 rounded-full bg-gray-200 dark:bg-[#283936] overflow-hidden flex items-center justify-center text-2xl font-bold text-gray-400">
                {username ? username[0].toUpperCase() : '?'}
            </div>
            <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Profile Photo</h4>
                <p className="text-xs text-gray-500">Auto-generated based on username</p>
            </div>
         </div>

        <Input
          label="Username"
          placeholder="e.g. jdoe"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          leftIcon={<span className="material-symbols-outlined text-[20px]">person</span>}
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          leftIcon={<span className="material-symbols-outlined text-[20px]">mail</span>}
        />

        <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">Role</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#9db9b4] material-symbols-outlined pointer-events-none">shield_person</span>
                <select
                    value={roleId}
                    onChange={e => setRoleId(e.target.value)}
                    className="flex w-full min-w-0 flex-1 rounded-lg border border-slate-200 dark:border-[#3b544f] bg-white dark:bg-[#1c2725] h-12 pl-11 pr-4 text-slate-900 dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none"
                    required
                >
                    <option value="" disabled>Select a role</option>
                    {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none material-symbols-outlined">expand_more</span>
            </div>
        </div>

        <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">Status</label>
            <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="radio" 
                        name="status" 
                        value="active" 
                        checked={status === 'active'} 
                        onChange={() => setStatus('active')}
                        className="text-primary focus:ring-primary bg-white dark:bg-[#1c2725] border-gray-300 dark:border-[#3b544f]" 
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="radio" 
                        name="status" 
                        value="offline" 
                        checked={status === 'offline'} 
                        onChange={() => setStatus('offline')}
                        className="text-gray-500 focus:ring-gray-500 bg-white dark:bg-[#1c2725] border-gray-300 dark:border-[#3b544f]" 
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Offline</span>
                </label>
            </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-[#3b544f]">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
};
