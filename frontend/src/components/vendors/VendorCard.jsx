import { Link } from '@tanstack/react-router';
import { Star, MapPin, Heart } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../api/auth';
import toast from 'react-hot-toast';

export default function VendorCard({ vendor }) {
  const { isLoggedIn } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const handleBookmark = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error('Please login to save vendors');
      return;
    }
    setBookmarkLoading(true);
    try {
      const res = await userAPI.toggleBookmark(vendor.id);
      setBookmarked(res.data.bookmarked);
      toast.success(res.data.message);
    } catch {
      toast.error('Error saving vendor');
    } finally {
      setBookmarkLoading(false);
    }
  };

  // Placeholder gradient colors based on category
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

  const gradient = gradients[vendor.category_name] || 'from-gold-400 to-gold-600';

  return (
    <Link to={`/vendors/${vendor.id}`} className="card group block">
      {/* Image / Gradient Placeholder */}
      <div className={`relative h-52 bg-gradient-to-br ${gradient} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-white/30 text-6xl font-bold">
            {vendor.name.charAt(0)}
          </span>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {vendor.is_featured && (
            <span className="bg-gold-500 text-white font-sans text-xs font-medium px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          <span className="bg-white/90 text-charcoal font-sans text-xs font-medium px-2 py-1 rounded-full">
            {vendor.category_name}
          </span>
        </div>

        {/* Bookmark */}
        <button
          onClick={handleBookmark}
          disabled={bookmarkLoading}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart
            size={14}
            className={bookmarked ? 'text-red-500 fill-red-500' : 'text-gray-500'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-charcoal mb-1 group-hover:text-gold-600 transition-colors line-clamp-1">
          {vendor.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <MapPin size={12} className="text-gray-400" />
          <span className="font-sans text-xs text-gray-400 line-clamp-1">{vendor.location}</span>
        </div>

        <p className="font-sans text-xs text-gray-500 line-clamp-2 mb-4">
          {vendor.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={13} className="text-gold-400 fill-gold-400" />
            <span className="font-sans font-medium text-sm text-charcoal">{vendor.rating}</span>
            <span className="font-sans text-xs text-gray-400">({vendor.reviews_count})</span>
          </div>
          <span className="font-sans text-xs font-medium text-gold-600">
            {vendor.price_range}
          </span>
        </div>
      </div>
    </Link>
  );
}