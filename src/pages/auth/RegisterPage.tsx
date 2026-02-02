import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    try {
      await register({ username, email, password });
      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white dark:bg-[#111817] rounded-xl shadow-xl border border-[#e5e7eb] dark:border-[#283936] overflow-hidden w-full">
      <div className="px-8 pt-10 pb-6 flex flex-col items-center text-center">
        <h2 className="text-[#111817] dark:text-white text-[28px] font-bold leading-tight tracking-tight">Create Account</h2>
        <p className="text-[#637588] dark:text-[#9db9b4] text-base font-normal leading-normal mt-2">Sign up to get started</p>
      </div>

      <div className="px-8 pb-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Username"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            leftIcon={<span className="material-symbols-outlined text-[20px]">person</span>}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<span className="material-symbols-outlined text-[20px]">mail</span>}
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<span className="material-symbols-outlined text-[20px]">lock</span>}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<span className="material-symbols-outlined text-[20px]">lock_reset</span>}
          />

          <div className="flex items-center gap-2 mt-1">
             <input type="checkbox" required className="rounded border-gray-300 dark:border-[#3b544f] text-primary focus:ring-primary bg-white dark:bg-[#1c2725] w-4 h-4 cursor-pointer"/>
             <span className="text-sm text-[#4b5563] dark:text-[#9db9b4]">I agree to the <a href="#" className="font-bold text-primary hover:underline">Terms & Conditions</a></span>
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            Create Account
          </Button>

          <div className="text-center mt-2">
            <span className="text-sm text-[#4b5563] dark:text-[#9db9b4]">Already have an account? </span>
            <Link to="/login" className="text-sm font-bold text-primary hover:text-[#0eb094] transition-colors">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
