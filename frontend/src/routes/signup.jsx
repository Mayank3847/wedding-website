import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { authAPI } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail, User, Phone } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/signup')({
  component: SignupPage,
});

function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await authAPI.signup(data);
      login(res.data.token, res.data.user);
      toast.success(`Welcome to Eternal Vows, ${res.data.user.name.split(' ')[0]}! 🎉`);
      navigate({ to: '/dashboard' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Left decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gold-500 to-gold-700 relative overflow-hidden items-center justify-center">
        <div className="relative z-10 text-center px-10">
          <h2 className="font-display text-5xl text-white mb-4 leading-tight">
            Start Your<br />Journey
          </h2>
          <div className="w-16 h-0.5 bg-white/50 mx-auto mb-4"></div>
          <p className="font-serif text-white/80 italic text-lg">
            Join thousands of couples planning their perfect wedding
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link to="/" className="font-display text-2xl text-charcoal">Eternal Vows</Link>
            <h1 className="font-display text-3xl text-charcoal mt-6 mb-2">Create Account</h1>
            <p className="font-sans text-gray-400 text-sm">Begin planning your dream wedding</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
                placeholder="Full Name" className="input-field pl-11" />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                type="email" placeholder="Email Address" className="input-field pl-11" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input {...register('phone')} placeholder="Phone Number (optional)" className="input-field pl-11" />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                type={showPassword ? 'text' : 'password'} placeholder="Password" className="input-field pl-11 pr-11" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-sm disabled:opacity-60">
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="font-sans text-sm text-gray-500 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-500 font-medium hover:text-gold-600">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}