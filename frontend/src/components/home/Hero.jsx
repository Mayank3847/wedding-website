import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - using gradient since we don't have real images */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
        {/* Golden ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500 rounded-full filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-blush rounded-full filter blur-3xl opacity-8"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="w-12 h-px bg-gold-500"></div>
          <Sparkles size={16} className="text-gold-400" />
          <span className="font-serif text-gold-400 text-sm italic tracking-widest">Your Dream Wedding Awaits</span>
          <Sparkles size={16} className="text-gold-400" />
          <div className="w-12 h-px bg-gold-500"></div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-6"
        >
          Where Love
          <br />
          <span className="text-gradient">Begins Forever</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-serif text-gray-300 text-lg md:text-xl italic mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Discover India's finest wedding vendors — from master photographers to 
          breathtaking venues. Create memories that last a lifetime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/vendors" className="btn-primary text-base px-10 py-4 font-sans">
            Find Your Vendors
          </Link>
          <Link to="/contact" className="btn-secondary text-base px-10 py-4 font-sans border-white text-white hover:bg-white hover:text-charcoal">
            Plan My Wedding
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { num: '500+', label: 'Happy Couples' },
            { num: '200+', label: 'Verified Vendors' },
            { num: '50+', label: 'Cities Covered' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-2xl md:text-3xl text-gold-400 font-bold">{num}</div>
              <div className="font-sans text-xs text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="font-sans text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}