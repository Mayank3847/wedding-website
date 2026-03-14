import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { authAPI } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await authAPI.login(data);
      login(res.data.token, res.data.user);
      toast.success(`Welcome back, ${res.data.user.name.split(' ')[0]}! 👋`);
      navigate({ to: '/dashboard' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Left - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-charcoal relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-gold-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="relative z-10 text-center px-10">
          <h2 className="font-display text-5xl text-white mb-4 leading-tight">
            Welcome<br />Back
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-4"></div>
          <p className="font-serif text-gray-400 italic text-lg">
            Your dream wedding planning continues here
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link to="/" className="font-display text-2xl text-charcoal">Eternal Vows</Link>
            <h1 className="font-display text-3xl text-charcoal mt-6 mb-2">Sign In</h1>
            <p className="font-sans text-gray-400 text-sm">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                placeholder="Email Address"
                className="input-field pl-11"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register('password', { required: 'Password is required' })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="input-field pl-11 pr-11"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-sm disabled:opacity-60">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="font-sans text-sm text-gray-500 text-center mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-gold-500 font-medium hover:text-gold-600">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}