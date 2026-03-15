import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { userAPI } from '../../api/auth'
import toast from 'react-hot-toast'

const CATEGORY_IMAGES = {
  Photography:    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=75',
  Catering:       'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=75',
  Decoration:     'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=75',
  Venue:          'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=75',
  'Music & DJ':   'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=75',
  'Bridal Wear':  'https://images.unsplash.com/photo-1596451190630-186aff535bf2?w=600&q=75',
  'Makeup Artist':'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=75',
  Videography:    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=75',
}

const CATEGORY_COLORS = {
  Photography: '#D97706', Venue: '#2563EB', Catering: '#059669',
  Decoration: '#DB2777', 'Music & DJ': '#7C3AED',
  'Bridal Wear': '#9333EA', 'Makeup Artist': '#E11D48', Videography: '#0891B2',
}

export default function VendorCard({ vendor }) {
  const { isLoggedIn }            = useAuth()
  const [bookmarked, setBookmarked] = useState(false)
  const [imgErr, setImgErr]        = useState(false)

  const handleBookmark = async (e) => {
    e.preventDefault(); e.stopPropagation()
    if (!isLoggedIn) { toast.error('Please login to save vendors'); return }
    try {
      const res = await userAPI.toggleBookmark(vendor.id)
      setBookmarked(res.data.bookmarked)
      toast.success(res.data.message)
    } catch { toast.error('Error saving vendor') }
  }

  const imgSrc   = (!imgErr && (vendor.image_url || CATEGORY_IMAGES[vendor.category_name])) || null
  const dotColor = CATEGORY_COLORS[vendor.category_name] || '#4a7c59'

  return (
    <Link
      to={`/vendors/${vendor.id}`}
      className="card"
      style={{ textDecoration:'none', display:'flex', flexDirection:'column' }}
    >
      {/* Image */}
      <div style={{ position:'relative', height:'clamp(160px,20vw,210px)', overflow:'hidden', flexShrink:0 }}>
        {imgSrc ? (
          <img src={imgSrc} alt={vendor.name} loading="lazy"
            style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s ease' }}
            onError={() => setImgErr(true)}
            onMouseEnter={e => e.target.style.transform='scale(1.05)'}
            onMouseLeave={e => e.target.style.transform='scale(1)'}
          />
        ) : (
          <div style={{ width:'100%', height:'100%', background:`linear-gradient(135deg,${dotColor}22,${dotColor}44)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(3rem,8vw,5rem)', color:`${dotColor}33` }}>
              {vendor.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%)' }} />

        {/* Badges */}
        <div style={{ position:'absolute', top:'clamp(8px,1.5vw,12px)', left:'clamp(8px,1.5vw,12px)', display:'flex', gap:6, flexWrap:'wrap' }}>
          {vendor.is_featured && (
            <span style={{ background:'#4a7c59', color:'white', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:'clamp(9px,1vw,11px)', padding:'3px 10px', borderRadius:999 }}>
              ✦ Featured
            </span>
          )}
          {vendor.category_name && (
            <span style={{ background:'rgba(255,255,255,0.92)', color:'#292524', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:'clamp(9px,1vw,11px)', padding:'3px 10px', borderRadius:999 }}>
              {vendor.category_name}
            </span>
          )}
        </div>

        {/* Bookmark */}
        <button
          onClick={handleBookmark}
          aria-label={bookmarked ? 'Remove bookmark' : 'Save vendor'}
          style={{ position:'absolute', top:'clamp(8px,1.5vw,12px)', right:'clamp(8px,1.5vw,12px)', width:'clamp(32px,4vw,36px)', height:'clamp(32px,4vw,36px)', borderRadius:'50%', background:'rgba(255,255,255,0.92)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s ease', minWidth:32, minHeight:32 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={bookmarked ? '#ef4444' : 'none'} stroke={bookmarked ? '#ef4444' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{ padding:'clamp(14px,2vw,20px)', display:'flex', flexDirection:'column', gap:'clamp(6px,1vw,10px)', flex:1 }}>
        <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(15px,1.8vw,18px)', color:'#1a2e20', fontWeight:400, lineHeight:1.2, margin:0 }}>
          {vendor.name}
        </h3>

        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9abf9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(11px,1.1vw,12px)', color:'#9abf9a' }}>
            {vendor.location}
          </span>
        </div>

        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(12px,1.2vw,13px)', color:'#78716c', lineHeight:1.6, margin:0, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
          {vendor.description}
        </p>

        {/* Rating + Price */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:4, marginTop:'auto', paddingTop:'clamp(8px,1vw,12px)', borderTop:'1px solid #f4f7f4' }}>
          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="#f59e0b">
              <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.1 3.3 12.3l.7-4.1-3-2.9 4.2-.7L7 1z"/>
            </svg>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:'clamp(12px,1.2vw,13px)', color:'#292524' }}>{vendor.rating}</span>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(10px,1vw,11px)', color:'#a8a29e' }}>({vendor.reviews_count})</span>
          </div>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:'clamp(11px,1.1vw,12px)', color:dotColor }}>
            {vendor.price_range}
          </span>
        </div>

        {/* Enquire button */}
        <div style={{ width:'100%', textAlign:'center', padding:'clamp(8px,1.2vw,10px)', borderRadius:'var(--radius-md)', border:`1.5px solid ${dotColor}44`, color:dotColor, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:'clamp(11px,1.2vw,13px)', letterSpacing:'0.03em', transition:'all 0.3s ease', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}
          onMouseEnter={e=>{e.currentTarget.style.background=dotColor;e.currentTarget.style.color='white';e.currentTarget.style.borderColor=dotColor}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=dotColor;e.currentTarget.style.borderColor=`${dotColor}44`}}
        >
          Enquire Now →
        </div>
      </div>
    </Link>
  )
}
