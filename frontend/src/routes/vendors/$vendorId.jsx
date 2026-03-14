import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { vendorAPI } from '../../api/auth';
import { Star, MapPin, Phone, Mail, Globe, ArrowLeft, Heart } from 'lucide-react';
import { useState } from 'react';
import InquiryForm from '../../components/InquiryForm';

export const Route = createFileRoute('/vendors/$vendorId')({
  component: VendorDetailPage,
});

function VendorDetailPage() {
  const { vendorId } = Route.useParams();
  const [showInquiry, setShowInquiry] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['vendor', vendorId],
    queryFn: () => vendorAPI.getById(vendorId),
  });

  const vendor = data?.data?.vendor;

  const gradients = {
    'Photography': 'from-amber-400 to-orange-500',
    'Catering': 'from-emerald-400 to-teal-500',
    'Decoration': 'from-purple-400 to-pink-500',
    'Venue': 'from-blue-400 to-indigo-500',
    'Music & DJ': 'from-rose-400 to-pink-500',
    'Bridal Wear': 'from-fuchsia-400 to-purple-500',
    'Makeup Artist': 'from-pink-400 to-rose-500',
    'Videography': 'from-cyan-400 to-blue-500',
  };

  if (isLoading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-sans text-gray-500">Loading vendor...</p>
      </div>
    </div>
  );

  if (isError || !vendor) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-2xl text-charcoal">Vendor not found</p>
        <Link to="/vendors" className="btn-primary mt-4 inline-block text-sm">Back to Vendors</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Back */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link to="/vendors" className="inline-flex items-center gap-2 font-sans text-sm text-gray-500 hover:text-gold-500 transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Vendors
        </Link>
      </div>

      {/* Hero Banner */}
      <div className={`h-64 md:h-80 bg-gradient-to-br ${gradients[vendor.category_name] || 'from-gold-400 to-gold-600'} relative`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-white/20 text-[150px] font-bold">{vendor.name.charAt(0)}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="max-w-6xl mx-auto">
            <span className="bg-gold-500 text-white font-sans text-xs px-3 py-1 rounded-full mb-2 inline-block">
              {vendor.category_name}
            </span>
            <h1 className="font-display text-3xl md:text-4xl text-white">{vendor.name}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-2xl p-6">
              <h2 className="font-display text-2xl text-charcoal mb-4">About {vendor.name}</h2>
              <p className="font-sans text-gray-600 text-sm leading-relaxed">{vendor.description}</p>
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl p-6">
              <h2 className="font-display text-xl text-charcoal mb-4">Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-sans text-xs text-gray-400 mb-1">LOCATION</p>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gold-500" />
                    <p className="font-sans text-sm text-charcoal">{vendor.location}</p>
                  </div>
                </div>
                <div>
                  <p className="font-sans text-xs text-gray-400 mb-1">PRICE RANGE</p>
                  <p className="font-sans text-sm font-medium text-gold-600">{vendor.price_range}</p>
                </div>
                <div>
                  <p className="font-sans text-xs text-gray-400 mb-1">RATING</p>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-gold-400 fill-gold-400" />
                    <span className="font-sans font-medium text-sm">{vendor.rating}</span>
                    <span className="font-sans text-xs text-gray-400">({vendor.reviews_count} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact & CTA */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h3 className="font-display text-xl text-charcoal mb-4">Get in Touch</h3>
              <div className="space-y-3 mb-6">
                {vendor.contact_phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold-50 rounded-full flex items-center justify-center">
                      <Phone size={14} className="text-gold-500" />
                    </div>
                    <span className="font-sans text-sm text-charcoal">{vendor.contact_phone}</span>
                  </div>
                )}
                {vendor.contact_email && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold-50 rounded-full flex items-center justify-center">
                      <Mail size={14} className="text-gold-500" />
                    </div>
                    <span className="font-sans text-sm text-charcoal">{vendor.contact_email}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowInquiry(!showInquiry)}
                className="btn-primary w-full text-center text-sm py-3"
              >
                Send Inquiry
              </button>
            </div>

            {showInquiry && <InquiryForm vendorId={vendor.id} vendorName={vendor.name} />}
          </div>
        </div>
      </div>
    </div>
  );
}