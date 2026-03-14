import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'

// Unsplash wedding images for mosaic
const mosaicImages = [
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80',
]

const words = ['Moments', 'Stories', 'Memories', 'Beginnings']

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setFading(false) }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr', background:'#1a2e20', position:'relative', overflow:'hidden' }}>

      {/* ── LEFT: Text content ── */}
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'120px 48px 80px 64px', position:'relative', zIndex:2 }}>

        {/* Eyebrow */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:32, alignSelf:'flex-start' }}>
          <div style={{ width:28, height:1, background:'#9abf9a' }} />
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:'0.22em', color:'#9abf9a', textTransform:'uppercase' }}>
            India's Curated Wedding Platform
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily:"'DM Serif Display',serif", fontWeight:400, lineHeight:1.05, margin:'0 0 8px', color:'white' }}>
          <span style={{ display:'block', fontSize:'clamp(2.4rem,4.5vw,4rem)', opacity:0.7, fontStyle:'italic' }}>
            Crafting
          </span>
          <span style={{ display:'block', fontSize:'clamp(3rem,5.5vw,5rem)', color:'#c8dbc8', transition:'opacity 0.4s ease', opacity: fading ? 0 : 1 }}>
            {words[wordIdx]}
          </span>
          <span style={{ display:'block', fontSize:'clamp(2.4rem,4.5vw,4rem)', opacity:0.7, fontStyle:'italic' }}>
            That Last Forever
          </span>
        </h1>

        {/* Divider */}
        <div style={{ width:48, height:1, background:'linear-gradient(90deg,#9abf9a,transparent)', margin:'28px 0' }} />

        {/* Description */}
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:'rgba(200,219,200,0.7)', fontSize:15, lineHeight:1.8, maxWidth:420, margin:'0 0 40px' }}>
          Discover verified photographers, venues, caterers and every wedding service you need — all in one beautifully curated place.
        </p>

        {/* CTAs */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
          <Link to="/vendors" style={{
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:14,
            background:'#9abf9a', color:'#1a2e20',
            padding:'14px 36px', borderRadius:50, textDecoration:'none',
            letterSpacing:'0.03em', display:'inline-flex', alignItems:'center', gap:8,
            transition:'all 0.3s ease',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='#c8dbc8';e.currentTarget.style.transform='translateY(-2px)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='#9abf9a';e.currentTarget.style.transform='none'}}
          >
            Browse Vendors
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#1a2e20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <Link to="/services" style={{
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:14,
            color:'rgba(200,219,200,0.8)',
            padding:'14px 32px', borderRadius:50, textDecoration:'none',
            letterSpacing:'0.03em', border:'1px solid rgba(154,191,154,0.3)',
            transition:'all 0.3s ease', display:'inline-flex', alignItems:'center', gap:8,
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(154,191,154,0.7)';e.currentTarget.style.color='#c8dbc8'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(154,191,154,0.3)';e.currentTarget.style.color='rgba(200,219,200,0.8)'}}
          >
            Our Services
          </Link>
        </div>

        {/* Bottom stats strip */}
        <div style={{ display:'flex', gap:32, marginTop:56, paddingTop:32, borderTop:'1px solid rgba(154,191,154,0.15)' }}>
          {[['500+','Weddings'],['8+','Years'],['200+','Vendors'],['98%','Satisfaction']].map(([n,l])=>(
            <div key={l}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(1.3rem,2.5vw,1.8rem)', color:'#c8dbc8' }}>{n}</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:'rgba(200,219,200,0.5)', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Image mosaic ── */}
      <div style={{ position:'relative', overflow:'hidden' }}>
        {/* Green tint overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#1a2e20 0%,transparent 40%)', zIndex:2, pointerEvents:'none' }} />

        {/* Mosaic grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr', height:'100%', gap:3 }}>
          {mosaicImages.map((src, i) => (
            <div key={i} style={{ overflow:'hidden', position:'relative' }}>
              <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'saturate(0.7) brightness(0.75)', transition:'transform 8s ease', animation:`zoomSlow ${8+i*2}s ease-in-out infinite alternate` }} onError={e=>{e.target.style.background='#243d2c'}} />
            </div>
          ))}
        </div>

        {/* Floating badge */}
        <div style={{ position:'absolute', bottom:40, left:40, zIndex:3, background:'rgba(254,253,251,0.95)', borderRadius:16, padding:'16px 20px', backdropFilter:'blur(12px)', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, color:'#78716c', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4 }}>Next Available</div>
          <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:'#292524' }}>Book Your Date</div>
          <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:4, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:12, color:'#4a7c59', textDecoration:'none', marginTop:8 }}>
            Enquire Now →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes zoomSlow { from{transform:scale(1)} to{transform:scale(1.08)} }
        @media (max-width:768px) {
          section { grid-template-columns:1fr !important; }
          section > div:last-child { height:320px; }
        }
      `}</style>
    </section>
  )
}
