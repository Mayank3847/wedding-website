import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { useInView } from 'react-intersection-observer'

const services = [
  { num:'01', label:'Photography',   sub:'Candid & portrait',     color:'#D97706', bg:'#FFFBEB', img:'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&q=75', category:'Photography'   },
  { num:'02', label:'Videography',   sub:'Cinematic films',        color:'#0891B2', bg:'#ECFEFF', img:'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=75', category:'Videography'    },
  { num:'03', label:'Venues',        sub:'Halls & destinations',   color:'#2563EB', bg:'#EFF6FF', img:'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=75', category:'Venue'          },
  { num:'04', label:'Catering',      sub:'Multi-cuisine feasts',   color:'#059669', bg:'#ECFDF5', img:'https://images.unsplash.com/photo-1555244162-803834f70033?w=500&q=75', category:'Catering'        },
  { num:'05', label:'Decoration',    sub:'Floral & theme design',  color:'#DB2777', bg:'#FDF2F8', img:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=75', category:'Decoration'      },
  { num:'06', label:'Bridal Wear',   sub:'Lehengas & sherwanis',   color:'#7C3AED', bg:'#F5F3FF', img:'https://images.unsplash.com/photo-1596451190630-186aff535bf2?w=500&q=75', category:'Bridal Wear'    },
  { num:'07', label:'Makeup',        sub:'Bridal styling',         color:'#E11D48', bg:'#FFF1F2', img:'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=75', category:'Makeup Artist'  },
  { num:'08', label:'Music & DJ',    sub:'Live & digital sets',    color:'#8B5CF6', bg:'#F5F3FF', img:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=75', category:'Music & DJ'     },
]

export default function Services() {
  const scrollRef = useRef(null)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      style={{ padding: 'clamp(56px,8vw,96px) 0', background: '#fefdfb', overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'clamp(12px,2vw,16px)',
        padding: '0 clamp(16px,5vw,48px)',
        marginBottom: 'clamp(24px,4vw,48px)',
      }}>
        <div>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:'clamp(10px,1.2vw,11px)', letterSpacing:'0.2em', textTransform:'uppercase', color:'#4a7c59', display:'block', marginBottom:10 }}>
            What We Cover
          </span>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(1.6rem,4vw,3rem)', color:'#1a2e20', fontWeight:400, lineHeight:1.1, margin:0 }}>
            All Wedding Services
            <em style={{ color:'#9abf9a', display:'block' }}>Under One Roof</em>
          </h2>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <Link
            to="/services"
            style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:'clamp(12px,1.3vw,13px)', color:'#4a7c59', textDecoration:'none', marginRight:8, whiteSpace:'nowrap' }}
          >
            View all →
          </Link>
          {/* Scroll arrows — hidden on smallest screens */}
          {[-1, 1].map((dir, i) => (
            <button
              key={i}
              onClick={() => scroll(dir)}
              aria-label={dir < 0 ? 'Scroll left' : 'Scroll right'}
              style={{ width: 'clamp(32px,4vw,40px)', height: 'clamp(32px,4vw,40px)', borderRadius: '50%', border: '1.5px solid #c8dbc8', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a7c59', transition: 'all 0.2s ease', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.background = '#4a7c59'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#4a7c59' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d={dir < 0 ? 'M8 2L4 6l4 4' : 'M4 2l4 4-4 4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: 'clamp(10px,1.5vw,16px)',
          overflowX: 'auto',
          padding: '4px clamp(16px,5vw,48px) clamp(12px,2vw,16px)',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
        }}
      >
        {services.map(({ num, label, sub, color, bg, img, category }, i) => (
          <Link
            to="/vendors"
            search={{ category }}
            key={label}
            style={{
              flexShrink: 0,
              width: 'clamp(200px,28vw,280px)',
              borderRadius: 'clamp(14px,2vw,24px)',
              background: 'white',
              border: '1px solid #f0ede8',
              textDecoration: 'none',
              display: 'block',
              scrollSnapAlign: 'start',
              overflow: 'hidden',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s, box-shadow 0.3s ease`,
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 40px ${color}22`; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {/* Image */}
            <div style={{ height: 'clamp(140px,18vw,180px)', overflow: 'hidden', position: 'relative' }}>
              <img
                src={img}
                alt={label}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.display='none' }}
              />
              <div style={{ position:'absolute', inset:0, background:`linear-gradient(to top,${color}33,transparent)` }} />
              <div style={{ position:'absolute', top:10, right:12, fontFamily:"'DM Serif Display',serif", fontSize:'clamp(32px,5vw,48px)', color:'rgba(255,255,255,0.2)', fontWeight:400, lineHeight:1, userSelect:'none' }}>{num}</div>
            </div>

            {/* Content */}
            <div style={{ padding: 'clamp(14px,2vw,20px)' }}>
              <div style={{ display:'inline-block', padding:'2px 10px', borderRadius:999, background:bg, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:'clamp(9px,1vw,11px)', color, letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:8 }}>{sub}</div>
              <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(15px,2vw,19px)', color:'#1a2e20', fontWeight:400, margin:'0 0 10px', lineHeight:1.2 }}>{label}</h3>
              <div style={{ display:'inline-flex', alignItems:'center', gap:4, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:'clamp(11px,1.1vw,12px)', color }}>
                Explore
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5h7M6 2.5l3 3-3 3" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Hide scrollbar */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
