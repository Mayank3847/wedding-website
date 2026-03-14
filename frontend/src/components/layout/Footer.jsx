import { Link } from '@tanstack/react-router';
import { Heart, Instagram, Youtube, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl text-white mb-2">Eternal Vows</h3>
            <div className="w-10 h-0.5 bg-gold-500 mb-4"></div>
            <p className="font-serif text-gray-400 text-sm italic leading-relaxed">
              India's most trusted wedding services marketplace. Connect with the finest vendors for your perfect day.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-semibold text-sm tracking-widest text-gold-400 uppercase mb-4">Quick Links</h4>
            {['Home', 'Find Vendors', 'Contact Us', 'Login', 'Sign Up'].map((link) => (
              <div key={link} className="mb-2">
                <a href="#" className="font-sans text-gray-400 text-sm hover:text-gold-400 transition-colors">{link}</a>
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans font-semibold text-sm tracking-widest text-gold-400 uppercase mb-4">Services</h4>
            {['Photography', 'Venues', 'Catering', 'Decoration', 'Music & DJ', 'Bridal Makeup'].map((s) => (
              <div key={s} className="mb-2">
                <a href="#" className="font-sans text-gray-400 text-sm hover:text-gold-400 transition-colors">{s}</a>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-sm tracking-widest text-gold-400 uppercase mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={14} className="text-gold-400 mt-1 flex-shrink-0" />
                <span className="font-sans text-gray-400 text-sm">hello@eternalvows.in</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-gold-400 mt-1 flex-shrink-0" />
                <span className="font-sans text-gray-400 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-gold-400 mt-1 flex-shrink-0" />
                <span className="font-sans text-gray-400 text-sm">New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-gray-500 text-sm">
            © 2025 Eternal Vows. All rights reserved.
          </p>
          <p className="font-sans text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart size={12} className="text-red-400 fill-red-400" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}