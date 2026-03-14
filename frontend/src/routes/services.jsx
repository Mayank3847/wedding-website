import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/services')({
  component: ServicesPage,
})

const services = [
  {
    id: 'photography',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    label: 'Wedding Photography',
    tagline: 'Every moment, beautifully preserved',
    color: '#D97706',
    bg: '#FFFBEB',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=85',
    description: 'Our team of expert photographers will capture every precious moment of your special day, from the morning preparations to the last dance. We believe every love story deserves to be told beautifully.',
    features: ['Full day coverage (up to 12 hours)', 'Two professional photographers', 'High-resolution edited images', 'Online gallery access', 'Print-ready files', 'Same-day preview shots'],
  },
  {
    id: 'videography',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
      </svg>
    ),
    label: 'Wedding Films',
    tagline: 'Cinematic storytelling at its finest',
    color: '#0891B2',
    bg: '#ECFEFF',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=85',
    description: 'Cinematic wedding films that tell your unique love story beautifully. Our videographers use the latest equipment to create films that you will treasure for generations.',
    features: ['4K cinematic footage', 'Drone aerial shots', 'Highlight reel (3-5 min)', 'Full ceremony film', 'Trailer within 72 hours', 'Background music licensed'],
  },
  {
    id: 'prewedding',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    label: 'Pre-Wedding Shoots',
    tagline: 'Romantic sessions in stunning locations',
    color: '#DB2777',
    bg: '#FDF2F8',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=85',
    description: 'Romantic pre-wedding sessions in stunning locations of your choice. Whether it\'s a misty hill station or a golden desert, we capture the magic of your love story before the big day.',
    features: ['Location of your choice', '4-6 hours session', '150+ edited photographs', 'Outfit change included', 'Makeshift props provided', 'Online gallery within 7 days'],
  },
  {
    id: 'album',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
    label: 'Album Design',
    tagline: 'Beautifully crafted keepsakes',
    color: '#7C3AED',
    bg: '#F5F3FF',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=85',
    description: 'Beautifully crafted wedding albums that preserve your memories forever. Each album is a work of art — hand-designed by our creative team and printed on premium archival paper.',
    features: ['Custom designed layout', 'Premium flush mount album', 'Up to 60 spreads', 'Leather or linen cover', 'Complimentary parent albums', 'Delivered in 4-6 weeks'],
  },
  {
    id: 'decoration',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4zM12 15a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4zM1 12a4 4 0 014-4 4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4zM15 12a4 4 0 014-4 4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4z"/>
      </svg>
    ),
    label: 'Floral Decoration',
    tagline: 'Transform any space into paradise',
    color: '#DB2777',
    bg: '#FDF2F8',
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=85',
    description: 'Our award-winning floral designers transform venues into magical spaces. From intimate mandap settings to grand reception halls, every arrangement is crafted with love and artistry.',
    features: ['Custom floral design consultation', 'Mandap / arch arrangements', 'Table centrepieces', 'Bridal bouquet', 'Car decoration', 'Setup & breakdown included'],
  },
  {
    id: 'catering',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
    label: 'Catering Services',
    tagline: 'World-class culinary experiences',
    color: '#059669',
    bg: '#ECFDF5',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=85',
    description: 'Premium catering service with expertise in multi-cuisine wedding spreads. From traditional thali to continental buffets, our culinary team creates an unforgettable dining experience.',
    features: ['Multi-cuisine menu options', 'Minimum 100 guests', 'Dedicated event chef', 'Live counters available', 'Crockery & cutlery included', 'Hygiene certified kitchen'],
  },
]

export default function ServicesPage() {
  const [active, setActive] = useState(services[0].id)
  const current = services.find(s => s.id === active)

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7', paddingTop: 80 }}>

      {/* ── Hero banner ── */}
      <div style={{ background: '#1C1C1C', padding: '60px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#D4AF37,transparent)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: 'italic', fontSize: 17, color: '#D4AF37', marginBottom: 10 }}>What We Offer</p>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'white', fontWeight: 400, margin: '0 0 14px', lineHeight: 1.1 }}>
            Our Services
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(255,255,255,0.5)', fontSize: 15, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            From intimate ceremonies to grand celebrations, we offer comprehensive photography and videography services tailored to your vision.
          </p>
        </div>
      </div>

      {/* ── Service tab pills ── */}
      <div style={{ background: 'white', borderBottom: '1px solid #F0EDE8', position: 'sticky', top: 72, zIndex: 40 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', overflowX: 'auto', display: 'flex', gap: 0, scrollbarWidth: 'none' }}>
          {services.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 13,
                padding: '16px 22px', border: 'none', background: 'none',
                cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '0.02em',
                color: active === s.id ? s.color : '#6B7280',
                borderBottom: active === s.id ? `2.5px solid ${s.color}` : '2.5px solid transparent',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { if (active !== s.id) e.currentTarget.style.color = '#1C1C1C' }}
              onMouseLeave={e => { if (active !== s.id) e.currentTarget.style.color = '#6B7280' }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main detail section — Fig 3 layout ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 1.5rem' }}>
        {current && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="services-detail-grid">

            {/* Left: Image */}
            <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '4/3' }}>
              <img
                key={current.id}
                src={current.image}
                alt={current.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s ease', display: 'block' }}
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
              />
              {/* Fallback if image fails */}
              <div style={{ display: 'none', width: '100%', height: '100%', background: `linear-gradient(135deg, ${current.bg}, ${current.color}22)`, alignItems: 'center', justifyContent: 'center', position: 'absolute', inset: 0 }}>
                <div style={{ color: current.color, opacity: 0.3 }}>{current.icon}</div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              {/* Icon + label */}
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 16, background: current.bg, color: current.color, marginBottom: 20 }}>
                {current.icon}
              </div>

              <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: 'italic', fontSize: 15, color: current.color, marginBottom: 8 }}>
                {current.tagline}
              </p>

              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#1C1C1C', fontWeight: 600, margin: '0 0 16px', lineHeight: 1.15 }}>
                {current.label}
              </h2>

              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: '#6B7280', lineHeight: 1.75, margin: '0 0 28px' }}>
                {current.description}
              </p>

              {/* Feature list */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {current.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: current.bg, color: current.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke={current.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#374151' }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: current.color, color: 'white',
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                  fontSize: 14, padding: '15px 32px', borderRadius: 50,
                  textDecoration: 'none', letterSpacing: '0.03em',
                  boxShadow: `0 8px 24px ${current.color}44`,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 32px ${current.color}60` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 8px 24px ${current.color}44` }}
              >
                Enquire About {current.label}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Other services quick grid ── */}
      <div style={{ background: 'white', padding: '72px 0', borderTop: '1px solid #F0EDE8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#1C1C1C', fontWeight: 400, marginBottom: 36, textAlign: 'center' }}>
            Explore More Services
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16 }}>
            {services.filter(s => s.id !== active).map(s => (
              <button
                key={s.id}
                onClick={() => { setActive(s.id); window.scrollTo({ top: 200, behavior: 'smooth' }) }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  gap: 10, padding: '20px', borderRadius: 16,
                  border: '1px solid #F0EDE8', background: 'white',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '44'; e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}18` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#F0EDE8'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 14, fontWeight: 600, color: '#1C1C1C', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: s.color, fontWeight: 500 }}>View details →</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  )
}
