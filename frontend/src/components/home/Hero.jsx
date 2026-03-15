import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'

const mosaicImages = [
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&q=75',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=75',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=75',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&q=75',
]

const words = ['Moments', 'Stories', 'Memories', 'Beginnings']

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [fading,  setFading]  = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setFading(false) }, 400)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <style>{`
        /* ── HERO WRAPPER ── */
        #hero-wrap {
          background: #1a2e20;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;    /* DEFAULT = column (mobile first) */
          overflow: hidden;
        }

        /* ── LEFT PANEL ── */
        #hero-left {
          width: 100%;               /* FULL width on mobile */
          padding: 96px 20px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }

        /* ── RIGHT PANEL ── */
        #hero-right {
          width: 100%;               /* FULL width on mobile */
          height: 60vw;              /* proportional height on mobile */
          min-height: 220px;
          max-height: 360px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        /* ── MOSAIC GRID ── */
        #hero-mosaic {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          width: 100%;
          height: 100%;
          gap: 3px;
        }
        #hero-mosaic div { overflow: hidden; }
        #hero-mosaic img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.7) brightness(0.75);
          display: block;
        }

        /* ── OVERLAY ── */
        #hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, #1a2e20 0%, transparent 35%);
          z-index: 2;
          pointer-events: none;
        }

        /* ── DESKTOP: switch to row at 768px+ ── */
        @media (min-width: 768px) {
          #hero-wrap {
            flex-direction: row;
            min-height: 100vh;
          }
          #hero-left {
            width: 50%;
            padding: 120px 56px 72px;
            flex-shrink: 0;
          }
          #hero-right {
            width: 50%;
            height: auto;
            max-height: none;
            min-height: 100vh;
            flex-shrink: 0;
          }
          #hero-overlay {
            background: linear-gradient(to right, #1a2e20 0%, transparent 40%);
          }
          #hero-badge { display: block; }
        }

        /* ── LARGE DESKTOP ── */
        @media (min-width: 1280px) {
          #hero-left { padding: 130px 72px 80px; }
        }

        /* ── BADGE (hidden on mobile) ── */
        #hero-badge {
          display: none;
          position: absolute;
          bottom: 40px;
          left: 40px;
          z-index: 3;
          background: rgba(254,253,251,0.97);
          border-radius: 16px;
          padding: 16px 20px;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }

        @keyframes zoomSlow {
          from { transform: scale(1);    }
          to   { transform: scale(1.08); }
        }
        #hero-mosaic img:nth-child(1) { animation: zoomSlow 10s ease-in-out infinite alternate; }
        #hero-mosaic img:nth-child(2) { animation: zoomSlow 12s ease-in-out infinite alternate;  animation-delay: 1s; }
        #hero-mosaic img:nth-child(3) { animation: zoomSlow 14s ease-in-out infinite alternate;  animation-delay: 2s; }
        #hero-mosaic img:nth-child(4) { animation: zoomSlow 11s ease-in-out infinite alternate;  animation-delay: 3s; }
      `}</style>

      <section id="hero-wrap">

        {/* ══ LEFT / TOP: Text content ══ */}
        <div id="hero-left">

          {/* Eyebrow */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24 }}>
            <div style={{ width:22, height:1, background:'#9abf9a', flexShrink:0 }} />
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:10, letterSpacing:'0.24em', color:'#9abf9a', textTransform:'uppercase' }}>
              India's Curated Wedding Platform
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily:"'DM Serif Display',serif", fontWeight:400, lineHeight:1.05, margin:'0 0 6px', padding:0 }}>
            <span style={{ display:'block', fontSize:'clamp(1.7rem,5vw,3.8rem)', color:'rgba(255,255,255,0.70)', fontStyle:'italic' }}>
              Crafting
            </span>
            <span style={{ display:'block', fontSize:'clamp(2rem,6vw,4.8rem)', color:'#c8dbc8', opacity: fading ? 0 : 1, transition:'opacity 0.4s ease' }}>
              {words[wordIdx]}
            </span>
            <span style={{ display:'block', fontSize:'clamp(1.7rem,5vw,3.8rem)', color:'rgba(255,255,255,0.70)', fontStyle:'italic' }}>
              That Last Forever
            </span>
          </h1>

          {/* Divider */}
          <div style={{ width:36, height:1, background:'linear-gradient(90deg,#9abf9a,transparent)', margin:'18px 0' }} />

          {/* Description */}
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:'rgba(200,219,200,0.70)', fontSize:'clamp(13px,1.6vw,15px)', lineHeight:1.8, maxWidth:400, margin:'0 0 24px' }}>
            Discover verified photographers, venues, caterers and every wedding service you need — beautifully curated.
          </p>

          {/* CTA buttons */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, alignItems:'center' }}>
            <Link to="/vendors" style={{
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600,
              fontSize:'clamp(12px,1.4vw,14px)',
              background:'#9abf9a', color:'#1a2e20',
              padding:'clamp(11px,1.5vw,14px) clamp(20px,3vw,34px)',
              borderRadius:999, textDecoration:'none',
              display:'inline-flex', alignItems:'center', gap:7,
              border:'none', whiteSpace:'nowrap',
              transition:'background 0.3s ease',
            }}>
              Browse Vendors
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="#1a2e20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <Link to="/services" style={{
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500,
              fontSize:'clamp(12px,1.4vw,14px)',
              color:'rgba(200,219,200,0.85)',
              padding:'clamp(11px,1.5vw,14px) clamp(16px,2.5vw,26px)',
              borderRadius:999, textDecoration:'none',
              border:'1px solid rgba(154,191,154,0.35)',
              whiteSpace:'nowrap', display:'inline-flex', alignItems:'center',
            }}>
              Our Services
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'8px 24px', marginTop:36, paddingTop:24, borderTop:'1px solid rgba(154,191,154,0.15)' }}>
            {[['500+','Weddings'],['8+','Years'],['200+','Vendors'],['98%','Satisfaction']].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(1.1rem,2.5vw,1.7rem)', color:'#c8dbc8' }}>{n}</div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, color:'rgba(200,219,200,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ RIGHT / BOTTOM: Image mosaic ══ */}
        <div id="hero-right">
          <div id="hero-overlay" />
          <div id="hero-mosaic">
            {mosaicImages.map((src, i) => (
              <div key={i}>
                <img
                  src={src}
                  alt=""
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onError={e => { e.target.style.background='#243d2c'; e.target.src='' }}
                />
              </div>
            ))}
          </div>

          {/* Floating badge — CSS controls visibility */}
          <div id="hero-badge">
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:10, color:'#78716c', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:3 }}>
              Next Available
            </div>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:17, color:'#292524' }}>
              Book Your Date
            </div>
            <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:4, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:12, color:'#4a7c59', textDecoration:'none', marginTop:6 }}>
              Enquire Now →
            </Link>
          </div>
        </div>

      </section>
    </>
  )
}
