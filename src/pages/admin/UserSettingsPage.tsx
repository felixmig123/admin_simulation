import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const UserSettingsPage = () => {
  const { user } = useAuth();
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

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Profile updated successfully (Mock)');
    }, 800);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setNewPassword('');
      setCurrentPassword('');
      alert('Password changed successfully (Mock)');
    }, 800);
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
                    <span className="px-2 py-0.5Rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-md">
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
                    disabled // Often username is immutable or requires special process
                    leftIcon={<span className="material-symbols-outlined text-[20px]">person</span>}
                />
                
                <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    leftIcon={<span className="material-symbols-outlined text-[20px]">mail</span>}
                />

                <div className="flex flex-col gap-2">
                    <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">Bio</label>
                    <textarea 
                        className="flex w-full min-w-0 flex-1 resize-y rounded-lg border border-slate-200 dark:border-[#3b544f] bg-white dark:bg-[#1c2725] p-3 text-slate-900 dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-slate-400 dark:placeholder:text-[#9db9b4]"
                        rows={3}
                        placeholder="Tell us a little about yourself..."
                    ></textarea>
                </div>

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

        {/* Active Sessions (Mock) */}
        <div className="p-6 border-t border-gray-200 dark:border-[#283936] bg-gray-50 dark:bg-[#182d29]">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Active Sessions</h3>
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-[#111817] rounded-lg border border-gray-200 dark:border-[#3b544f]">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                             <span className="material-symbols-outlined">desktop_windows</span>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">Windows PC - Chrome</div>
                            <div className="text-xs text-gray-500">London, UK • Active Now</div>
                        </div>
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/10 px-2 py-1 rounded">THIS DEVICE</span>
                </div>

                 <div className="flex items-center justify-between p-3 bg-white dark:bg-[#111817] rounded-lg border border-gray-200 dark:border-[#3b544f] opacity-75">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                             <span className="material-symbols-outlined">smartphone</span>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">iPhone 13 - Safari</div>
                            <div className="text-xs text-gray-500">London, UK • 2 hours ago</div>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">Revoke</Button>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};
