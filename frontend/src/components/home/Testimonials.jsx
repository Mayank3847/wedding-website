import { useInView } from 'react-intersection-observer';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya & Arjun Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Eternal Vows made our wedding planning so effortless! We found our photographer and caterer through the platform and both were absolutely phenomenal.',
    event: 'December Wedding 2024'
  },
  {
    name: 'Deepa & Rahul Mehta',
    location: 'Bangalore',
    rating: 5,
    text: 'I was overwhelmed with wedding planning until I found this platform. Every vendor we booked exceeded our expectations. Our day was truly magical!',
    event: 'February Wedding 2025'
  },
  {
    name: 'Ananya & Vikram Patel',
    location: 'Jaipur',
    rating: 5,
    text: 'The vendor profiles are so detailed and the inquiry process was seamless. We planned our entire dream wedding through Eternal Vows in just 3 months!',
    event: 'November Wedding 2024'
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="py-24 bg-charcoal relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-gold-500 rounded-full filter blur-3xl opacity-5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-serif text-gold-400 italic text-lg mb-3">Love Stories</p>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-4"></div>
          <h2 className="font-display text-4xl md:text-5xl text-white">What Couples Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(({ name, location, rating, text, event }, i) => (
            <div
              key={name}
              style={{ animationDelay: `${i * 150}ms` }}
              className={`bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 ${inView ? 'animate-fade-up' : 'opacity-0'}`}
            >
              <Quote className="text-gold-400 mb-4 w-8 h-8 opacity-60" />
              <p className="font-serif text-gray-300 text-base leading-relaxed italic mb-6">{text}</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-gold-400 fill-gold-400" />
                ))}
              </div>
              <div>
                <p className="font-sans font-medium text-white text-sm">{name}</p>
                <p className="font-sans text-gray-500 text-xs">{location} • {event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}