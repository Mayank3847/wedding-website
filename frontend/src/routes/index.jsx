import { createFileRoute } from '@tanstack/react-router';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Testimonials from '../components/home/Testimonials';
import { useQuery } from '@tanstack/react-query';
import { vendorAPI } from '../api/auth';
import VendorCard from '../components/vendors/VendorCard';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['featured-vendors'],
    queryFn: () => vendorAPI.getAll({ featured: true, limit: 4 }),
  });

  const vendors = data?.data?.vendors || [];

  return (
    <>
      <Hero />
      <Services />

      {/* Featured Vendors */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-3">Handpicked For You</p>
            <div className="gold-divider"></div>
            <h2 className="section-title mt-4">Featured Vendors</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vendors.map((v) => <VendorCard key={v.id} vendor={v} />)}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/vendors" className="btn-primary inline-flex items-center gap-2 px-10">
              View All Vendors <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Ready to Plan Your Dream Wedding?
          </h2>
          <p className="font-serif text-white/80 italic text-lg mb-8">
            Connect with our expert team and get personalized vendor recommendations.
          </p>
          <Link to="/contact" className="bg-white text-gold-600 font-sans font-medium px-10 py-4 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 inline-block">
            Start Planning Today
          </Link>
        </div>
      </section>
    </>
  );
}