import { Link } from '@tanstack/react-router'
import { Star, MapPin, Heart, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { userAPI } from '../../api/auth'
import toast from 'react-hot-toast'

// Unsplash photo IDs — real wedding/vendor photos (freely usable)
const CATEGORY_IMAGES = {
  Photography:    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
  Catering:       'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80',
  Decoration:     'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
  Venue:          'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
  'Music & DJ':   'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
  'Bridal Wear':  'https://images.unsplash.com/photo-1596451190630-186aff535bf2?w=600&q=80',
  'Makeup Artist':'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
  Videography:    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80',
}

const FALLBACK_GRADIENTS = {
  Photography:    'from-amber-400 to-orange-500',
  Catering:       'from-emerald-400 to-teal-500',
  Decoration:     'from-purple-400 to-pink-500',
  Venue:          'from-blue-400 to-indigo-500',
  'Music & DJ':   'from-rose-400 to-pink-500',
  'Bridal Wear':  'from-fuchsia-400 to-purple-500',
  'Makeup Artist':'from-pink-400 to-rose-500',
  Videography:    'from-cyan-400 to-blue-500',
}

export default function VendorCard({ vendor }) {
  const { isLoggedIn } = useAuth()
  const [bookmarked, setBookmarked] = useState(false)
  const [bookmarkLoading, setBookmarkLoading] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleBookmark = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isLoggedIn) {
      toast.error('Please login to save vendors')
      return
    }
    setBookmarkLoading(true)
    try {
      const res = await userAPI.toggleBookmark(vendor.id)
      setBookmarked(res.data.bookmarked)
      toast.success(res.data.message)
    } catch {
      toast.error('Error saving vendor')
    } finally {
      setBookmarkLoading(false)
    }
  }

  const imageUrl = vendor.image_url || CATEGORY_IMAGES[vendor.category_name]
  const gradient = FALLBACK_GRADIENTS[vendor.category_name] || 'from-gold-400 to-gold-600'

  return (
    <Link to={`/vendors/${vendor.id}`} className="card group block">

      {/* ── Image / Banner ── */}
      <div className="relative h-52 overflow-hidden">
        {imageUrl && !imgError ? (
          <>
            <img
              src={imageUrl}
              alt={vendor.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={() => setImgError(true)}
            />
            {/* Dark gradient overlay so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </>
        ) : (
          /* Fallback gradient with initial letter */
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="font-display text-white/25 text-8xl font-bold select-none">
              {vendor.name.charAt(0)}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        {/* ── Badges ── */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {vendor.is_featured && (
            <span
              className="text-white font-sans text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #B8960C)' }}
            >
              ✦ Featured
            </span>
          )}
          {vendor.category_name && (
            <span className="bg-white/90 text-charcoal font-sans text-[11px] font-medium px-2.5 py-1 rounded-full">
              {vendor.category_name}
            </span>
          )}
        </div>

        {/* ── Bookmark heart ── */}
        <button
          onClick={handleBookmark}
          disabled={bookmarkLoading}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white rounded-full
                     flex items-center justify-center shadow-sm transition-all duration-200
                     hover:scale-110 active:scale-95"
          title={bookmarked ? 'Remove from saved' : 'Save vendor'}
        >
          <Heart
            size={15}
            className={bookmarked ? 'text-red-500' : 'text-gray-500'}
            style={{ fill: bookmarked ? 'currentColor' : 'none' }}
          />
        </button>
      </div>

      {/* ── Content ── */}
      <div className="p-5">
        {/* Name */}
        <h3
          className="font-display text-[17px] font-semibold text-charcoal mb-1.5
                     group-hover:text-gold-600 transition-colors line-clamp-1"
        >
          {vendor.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={12} className="text-gold-400 flex-shrink-0" />
          <span className="font-sans text-xs text-gray-400 line-clamp-1">{vendor.location}</span>
        </div>

        {/* Description */}
        <p className="font-sans text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
          {vendor.description}
        </p>

        {/* Rating + Price row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star size={13} className="text-gold-400" style={{ fill: 'currentColor' }} />
            <span className="font-sans font-semibold text-sm text-charcoal">{vendor.rating}</span>
            <span className="font-sans text-xs text-gray-400">({vendor.reviews_count})</span>
          </div>
          <span className="font-sans text-xs font-semibold text-gold-600">
            {vendor.price_range}
          </span>
        </div>

        {/* ── Enquire Now button ── */}
        <div
          className="w-full text-center py-2.5 rounded-xl font-sans text-sm font-medium
                     border border-gold-400 text-gold-600 group-hover:bg-gold-500
                     group-hover:text-white group-hover:border-gold-500
                     transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ExternalLink size={13} />
          Enquire Now
        </div>
      </div>
    </Link>
  )
}
