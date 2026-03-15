import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from '@tanstack/react-router'

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: 'Smart Discovery',
    desc: 'Filter vendors by category, city, budget and rating — find exactly who you need in seconds.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    ),
    title: 'Verified Only',
    desc: 'Every vendor undergoes manual verification before listing. No fake profiles, ever.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    title: 'Direct Inquiries',
    desc: 'Send inquiries directly from vendor pages. No middlemen. No extra charges.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: 'Your Dashboard',
    desc: 'Track all your vendor conversations, saved vendors and responses in one clean place.',
  },
]

export default function WhyUs() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <section ref={ref} style={{ padding: isMobile ? '56px 0' : '96px 0', background: '#f4f7f4' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>

        {/* ── Section header — always centered ── */}
        <div style={{ textAlign:'center', marginBottom: isMobile ? 32 : 52 }}>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize: isMobile ? 10 : 11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#4a7c59', display:'block', marginBottom:10 }}>
            Why Vivah Studio
          </span>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize: isMobile ? '1.7rem' : '2.8rem', color:'#1a2e20', fontWeight:400, lineHeight:1.15, margin:'0 0 12px' }}>
            Built for couples,
            <em style={{ color:'#9abf9a', display:'block' }}>not just vendors</em>
          </h2>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:'#78716c', fontSize: isMobile ? 13 : 15, lineHeight:1.75, maxWidth:480, margin:'0 auto 24px' }}>
            We designed every feature from a couple's perspective — making it easy to discover, compare and connect with the right people for your wedding.
          </p>
          <Link to="/vendors" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600,
            fontSize: isMobile ? 13 : 14,
            background:'#4a7c59', color:'white',
            padding: isMobile ? '12px 28px' : '13px 32px',
            borderRadius:999, textDecoration:'none',
            letterSpacing:'0.03em', transition:'all 0.3s ease',
          }}>
            Start Exploring
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* ── Feature cards — 1 col mobile, 2 col tablet, 4 col desktop ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? 12 : 20,
        }}>
          {features.map(({ icon, title, desc }, i) => (
            <div key={title} style={{
              background: 'white',
              borderRadius: isMobile ? 16 : 20,
              padding: isMobile ? '18px 14px' : '28px 24px',
              border: '1px solid #e8f0e8',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease ${i * 0.1}s`,
            }}>
              <div style={{ width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, borderRadius: 12, background: '#f4f7f4', display:'flex', alignItems:'center', justifyContent:'center', marginBottom: isMobile ? 12 : 16 }}>
                {icon}
              </div>
              <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize: isMobile ? 15 : 18, color:'#1a2e20', fontWeight:400, margin:`0 0 ${isMobile ? 8 : 10}px`, lineHeight:1.2 }}>
                {title}
              </h3>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: isMobile ? 12 : 14, color:'#78716c', lineHeight:1.65, margin:0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
