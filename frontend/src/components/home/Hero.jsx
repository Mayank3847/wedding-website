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
  const [fading, setFading]   = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setFading(false) }, 400)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      className="hero-grid"
      style={{ background: '#1a2e20', position: 'relative', overflow: 'hidden' }}
    >
      {/* ── LEFT: Content ── */}
      <div
        className="hero-content"
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(90px,12vw,140px) clamp(20px,5vw,64px) clamp(48px,8vw,80px)',
          position: 'relative', zIndex: 2,
        }}
      >
        {/* Eyebrow */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:'clamp(20px,4vw,36px)' }}>
          <div style={{ width:'clamp(20px,3vw,28px)', height:1, background:'#9abf9a' }} />
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:'clamp(9px,1vw,11px)', letterSpacing:'0.22em', color:'#9abf9a', textTransform:'uppercase' }}>
            India's Curated Wedding Platform
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily:"'DM Serif Display',serif", fontWeight:400, lineHeight:1.05, margin:'0 0 clamp(4px,1vw,8px)' }}>
          <span style={{ display:'block', fontSize:'clamp(1.6rem,4.5vw,4rem)', color:'rgba(255,255,255,0.7)', fontStyle:'italic' }}>Crafting</span>
          <span style={{ display:'block', fontSize:'clamp(2rem,5.5vw,5rem)', color:'#c8dbc8', transition:'opacity 0.4s ease', opacity: fading ? 0 : 1 }}>
            {words[wordIdx]}
          </span>
          <span style={{ display:'block', fontSize:'clamp(1.6rem,4.5vw,4rem)', color:'rgba(255,255,255,0.7)', fontStyle:'italic' }}>That Last Forever</span>
        </h1>

        {/* Divider */}
        <div style={{ width:'clamp(32px,4vw,48px)', height:1, background:'linear-gradient(90deg,#9abf9a,transparent)', margin:'clamp(16px,3vw,28px) 0' }} />

        {/* Description */}
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:'rgba(200,219,200,0.7)', fontSize:'clamp(13px,1.4vw,15px)', lineHeight:1.8, maxWidth:'clamp(280px,40vw,420px)', margin:'0 0 clamp(24px,4vw,40px)' }}>
          Discover verified photographers, venues, caterers and every wedding service you need — beautifully curated.
        </p>

        {/* CTAs */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'clamp(8px,1.5vw,12px)' }}>
          <Link to="/vendors" style={{
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600,
            fontSize:'clamp(12px,1.3vw,14px)',
            background:'#9abf9a', color:'#1a2e20',
            padding:'clamp(11px,1.5vw,14px) clamp(22px,3vw,36px)',
            borderRadius:999, textDecoration:'none',
            letterSpacing:'0.03em', display:'inline-flex', alignItems:'center', gap:7,
            transition:'all 0.3s ease', whiteSpace:'nowrap',
          }}>
            Browse Vendors
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#1a2e20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <Link to="/services" style={{
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500,
            fontSize:'clamp(12px,1.3vw,14px)',
            color:'rgba(200,219,200,0.8)',
            padding:'clamp(11px,1.5vw,14px) clamp(18px,2.5vw,32px)',
            borderRadius:999, textDecoration:'none',
            border:'1px solid rgba(154,191,154,0.3)',
            transition:'all 0.3s ease', whiteSpace:'nowrap',
          }}>
            Our Services
          </Link>
        </div>

        {/* Stats */}
        <div
          className="hero-stats"
          style={{ display:'flex', gap:'clamp(16px,3vw,32px)', marginTop:'clamp(32px,5vw,56px)', paddingTop:'clamp(20px,3vw,32px)', borderTop:'1px solid rgba(154,191,154,0.15)' }}
        >
          {[['500+','Weddings'],['8+','Years'],['200+','Vendors'],['98%','Satisfaction']].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(1.2rem,2.5vw,1.8rem)', color:'#c8dbc8' }}>{n}</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(9px,1vw,11px)', color:'rgba(200,219,200,0.5)', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Image mosaic ── */}
      <div
        className="hero-mosaic"
        style={{ position:'relative', overflow:'hidden' }}
      >
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#1a2e20 0%,transparent 40%)', zIndex:2, pointerEvents:'none' }} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr', height:'100%', gap:3 }}>
          {mosaicImages.map((src, i) => (
            <div key={i} style={{ overflow:'hidden' }}>
              <img src={src} alt="" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'saturate(0.7) brightness(0.75)', animation:`zoomSlow ${8+i*2}s ease-in-out infinite alternate` }} onError={e=>{e.target.style.background='#243d2c'}} />
            </div>
          ))}
        </div>

        {/* Floating badge — hidden on mobile via CSS */}
        <div className="hero-badge" style={{ position:'absolute', bottom:'clamp(24px,4vw,40px)', left:'clamp(16px,3vw,40px)', zIndex:3, background:'rgba(254,253,251,0.96)', borderRadius:16, padding:'clamp(12px,2vw,16px) clamp(14px,2vw,20px)', backdropFilter:'blur(12px)', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:10, color:'#78716c', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:3 }}>Next Available</div>
          <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(14px,2vw,18px)', color:'#292524' }}>Book Your Date</div>
          <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:4, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:12, color:'#4a7c59', textDecoration:'none', marginTop:6 }}>
            Enquire Now →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes zoomSlow { from{transform:scale(1)} to{transform:scale(1.08)} }
      `}</style>
    </section>
  )
}
