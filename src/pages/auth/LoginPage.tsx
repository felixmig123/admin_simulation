import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const LoginPage = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login({ username, password });
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials. Try "admin"');
    }
  };

  return (
    <div className="bg-white dark:bg-[#111817] rounded-xl shadow-xl border border-[#e5e7eb] dark:border-[#283936] overflow-hidden w-full">
      <div className="px-8 pt-10 pb-6 flex flex-col items-center text-center">
        <div className="size-12 mb-4 text-primary bg-primary/10 rounded-full flex items-center justify-center">
             <span className="material-symbols-outlined text-[28px] text-primary">admin_panel_settings</span>
        </div>
        <h2 className="text-[#111817] dark:text-white text-[28px] font-bold leading-tight tracking-tight">Welcome Back</h2>
        <p className="text-[#637588] dark:text-[#9db9b4] text-base font-normal leading-normal mt-2">Sign in to access your admin dashboard</p>
      </div>
      
      <div className="px-8 pb-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <Input
            label="Username or Email"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            leftIcon={<span className="material-symbols-outlined text-[20px]">person</span>}
          />
          
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<span className="material-symbols-outlined text-[20px]">lock</span>}
            rightIcon={
              <span 
                className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary transition-colors select-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            }
          />

          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="rounded border-gray-300 dark:border-[#3b544f] text-primary focus:ring-primary bg-white dark:bg-[#1c2725] w-4 h-4 cursor-pointer"/>
              <span className="text-sm font-medium text-[#4b5563] dark:text-[#9db9b4] group-hover:text-primary transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-sm font-bold text-primary hover:text-[#0eb094] transition-colors">Forgot password?</a>
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign In
          </Button>

          <div className="text-center mt-2">
            <span className="text-sm text-[#4b5563] dark:text-[#9db9b4]">New user? </span>
            <Link to="/register" className="text-sm font-bold text-primary hover:text-[#0eb094] transition-colors">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
