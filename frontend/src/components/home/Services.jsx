import { useInView } from 'react-intersection-observer';
import { Camera, Utensils, Flower2, Building2, Music, Sparkles } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const services = [
  { icon: Camera, label: 'Photography', desc: 'Timeless moments captured', color: 'text-amber-500', bg: 'bg-amber-50' },
  { icon: Building2, label: 'Venues', desc: 'Dream wedding spaces', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: Utensils, label: 'Catering', desc: 'Exquisite culinary art', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: Flower2, label: 'Decoration', desc: 'Enchanting floral design', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Music, label: 'Music & DJ', desc: 'Set the perfect mood', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Sparkles, label: 'Makeup', desc: 'Bridal beauty perfected', color: 'text-pink-500', bg: 'bg-pink-50' },
];

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-subtitle mb-3">Everything You Need</p>
          <div className="gold-divider"></div>
          <h2 className="section-title mt-4">Our Wedding Services</h2>
          <p className="font-sans text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            From the first dance to the last farewell, we have handpicked the finest wedding service providers across India.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map(({ icon: Icon, label, desc, color, bg }, i) => (
            <Link
              to="/vendors"
              search={{ category: label }}
              key={label}
              style={{ animationDelay: `${i * 100}ms` }}
              className={`group card p-6 text-center cursor-pointer ${inView ? 'animate-fade-up' : 'opacity-0'}`}
            >
              <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-7 h-7 ${color}`} />
              </div>
              <h3 className="font-display text-base font-semibold text-charcoal mb-1">{label}</h3>
              <p className="font-sans text-xs text-gray-400">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}