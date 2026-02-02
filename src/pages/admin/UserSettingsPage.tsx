import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { localStorageService, STORAGE_KEYS } from '../../services/localStorageService';
import type { User } from '../../types/models';

export const UserSettingsPage = () => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    
    try {
        // Update in DB
        const updatedUser = localStorageService.update<User>(STORAGE_KEYS.USERS, user.id, {
            username,
            email
        });

        // Update Session (re-login silently or update local state)
        // Since we don't have a 'updateSession' method, we can manually update storage 
        // and rely on a page refresh or basic state update if we had one.
        // For this demo, we'll update the session storage to match.
        localStorage.setItem('admin_sim_user', JSON.stringify(updatedUser)); // Keep session in sync
        
        // Optional: Force reload to reflect changes in Header context if not reactive
        window.location.reload(); 
        
        alert('Profile updated successfully');
    } catch (error) {
        alert('Failed to update profile');
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    // Verify current password (simple check against session or DB)
    // In a real app, backend handles this. Here we check against the user object.
    if (user.password && user.password !== currentPassword) {
        alert('Current password is incorrect');
        return;
    }

    setIsLoading(true);
    try {
        localStorageService.update<User>(STORAGE_KEYS.USERS, user.id, {
            password: newPassword
        });
        
        // Update session user object to have new password (if we store it there)
        const updatedUser = { ...user, password: newPassword };
        localStorage.setItem('admin_sim_user', JSON.stringify(updatedUser));

        setIsLoading(false);
        setNewPassword('');
        setCurrentPassword('');
        alert('Password changed successfully');
    } catch (error) {
        setIsLoading(false);
        alert('Error changing password');
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
        <p className="text-sm text-gray-500 dark:text-[#9db9b4]">Manage your profile and security preferences</p>
      </div>

      <div className="bg-white dark:bg-[#111817] rounded-xl border border-gray-200 dark:border-[#283936] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-[#283936] flex items-center gap-6">
            <div className="relative">
                <div 
                    className="size-20 rounded-full bg-cover bg-center border-2 border-white dark:border-[#10221f] shadow-lg"
                    style={{ backgroundImage: `url(${user?.avatarUrl || ''})` }}
                ></div>
                <button className="absolute bottom-0 right-0 p-1 bg-primary text-[#10221f] rounded-full shadow-sm hover:brightness-110">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                </button>
            </div>
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{user?.username}</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500 dark:text-[#9db9b4]">{user?.email}</span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-md">
                        {user?.roleId}
                    </span>
                </div>
            </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Info Form */}
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Profile Information</h3>
                
                <Input
                    label="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    leftIcon={<span className="material-symbols-outlined text-[20px]">person</span>}
                />
                
                <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    leftIcon={<span className="material-symbols-outlined text-[20px]">mail</span>}
                />

                <div className="pt-2">
                    <Button type="submit" isLoading={isLoading}>Save Changes</Button>
                </div>
            </form>

            {/* Password Change Form */}
            <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Change Password</h3>
                
                <Input
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    leftIcon={<span className="material-symbols-outlined text-[20px]">lock</span>}
                />
                
                <Input
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    leftIcon={<span className="material-symbols-outlined text-[20px]">key</span>}
                />

                <div className="pt-2">
                    <Button variant="outline" type="submit" isLoading={isLoading} disabled={!currentPassword || !newPassword}>
                        Update Password
                    </Button>
                </div>
            </form>
        </div>
      </div>

    </div>
  );
};
