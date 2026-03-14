import { useState, useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X, Heart, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isLoggedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/vendors', label: 'Find Vendors' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/95 bg-blur shadow-sm py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C16 4 6 10 6 18C6 23.5228 10.4772 28 16 28C21.5228 28 26 23.5228 26 18C26 10 16 4 16 4Z" fill="#D4AF37" fillOpacity="0.3" stroke="#D4AF37" strokeWidth="1.5"/>
                <path d="M16 10L14 16H10L13.5 19L12 25L16 21.5L20 25L18.5 19L22 16H18L16 10Z" fill="#D4AF37"/>
              </svg>
            </div>
            <div>
              <span className={`font-display text-xl font-bold tracking-wide transition-colors duration-300 ${
                scrolled ? 'text-charcoal' : 'text-white'
              }`}>Eternal Vows</span>
              <div className="w-full h-px bg-gold-500 mt-0.5"></div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`font-sans font-medium text-sm tracking-wide transition-colors duration-200 hover:text-gold-500 ${
                  scrolled ? 'text-charcoal' : 'text-white/90'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard" className="flex items-center gap-2 font-sans text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors">
                  <User size={16} />
                  {user?.name?.split(' ')[0]}
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 btn-ghost text-red-400 hover:text-red-500 text-sm px-3 py-1"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className={`font-sans font-medium text-sm transition-colors hover:text-gold-500 ${scrolled ? 'text-charcoal' : 'text-white'}`}>
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm py-2 px-5">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden transition-colors ${scrolled ? 'text-charcoal' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block font-sans text-charcoal hover:text-gold-500 py-2 border-b border-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            {isLoggedIn ? (
              <div className="pt-2 space-y-2">
                <Link to="/dashboard" className="block text-gold-600 font-medium py-2" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="text-red-400 font-medium py-2">
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-2 flex gap-3">
                <Link to="/login" className="btn-secondary text-sm flex-1 text-center" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm flex-1 text-center" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}