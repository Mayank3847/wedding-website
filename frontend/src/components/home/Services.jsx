import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { useInView } from 'react-intersection-observer'

const services = [
  { num:'01', label:'Photography',   sub:'Candid & portrait',    color:'#4a7c59', bg:'#f4f7f4', img:'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&q=75', category:'Photography'  },
  { num:'02', label:'Videography',   sub:'Cinematic films',       color:'#c94f62', bg:'#fdf4f5', img:'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=75', category:'Videography'   },
  { num:'03', label:'Venues',        sub:'Halls & destinations',  color:'#2563eb', bg:'#eff6ff', img:'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=75', category:'Venue'         },
  { num:'04', label:'Catering',      sub:'Multi-cuisine feasts',  color:'#059669', bg:'#ecfdf5', img:'https://images.unsplash.com/photo-1555244162-803834f70033?w=500&q=75', category:'Catering'       },
  { num:'05', label:'Decoration',    sub:'Floral & theme design', color:'#db2777', bg:'#fdf2f8', img:'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=500&q=75', category:'Decoration'     },
  { num:'06', label:'Bridal Wear',   sub:'Lehengas & sherwanis',  color:'#7c3aed', bg:'#f5f3ff', img:'https://images.unsplash.com/photo-1596451190630-186aff535bf2?w=500&q=75', category:'Bridal Wear'   },
  { num:'07', label:'Makeup',        sub:'Bridal styling',        color:'#e07080', bg:'#fff1f2', img:'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=75', category:'Makeup Artist' },
  { num:'08', label:'Music & DJ',    sub:'Live & digital sets',   color:'#8b5cf6', bg:'#f5f3ff', img:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=75', category:'Music & DJ'    },
]

export default function Services() {
  const scrollRef = useRef(null)
  const { ref, inView } = useInView({ threshold:0.05, triggerOnce:true })

  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 340, behavior:'smooth' })
  }

  return (
    <section ref={ref} style={{ padding:'96px 0', background:'#fefdfb', overflow:'hidden' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>

        {/* Header row with nav arrows */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 48px', marginBottom:48 }}>
          <div>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#4a7c59', display:'block', marginBottom:10 }}>
              What We Cover
            </span>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(1.8rem,3.5vw,3rem)', color:'#1a2e20', fontWeight:400, lineHeight:1.1, margin:0 }}>
              All Wedding Services
              <br /><em style={{ color:'#9abf9a' }}>Under One Roof</em>
            </h2>
          </div>
          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            <Link to="/services" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:13, color:'#4a7c59', textDecoration:'none', marginRight:16 }}>
              View all →
            </Link>
            {[-1,1].map((dir,i) => (
              <button key={i} onClick={() => scroll(dir)} style={{ width:40, height:40, borderRadius:'50%', border:'1.5px solid #c8dbc8', background:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#4a7c59', transition:'all 0.2s ease' }}
              onMouseEnter={e=>{e.currentTarget.style.background='#4a7c59';e.currentTarget.style.color='white'}}
              onMouseLeave={e=>{e.currentTarget.style.background='white';e.currentTarget.style.color='#4a7c59'}}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d={dir<0 ? "M9 2L4 7l5 5" : "M5 2l5 5-5 5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div ref={scrollRef} style={{ display:'flex', gap:16, overflowX:'auto', paddingLeft:48, paddingRight:48, paddingBottom:16, scrollbarWidth:'none', scrollSnapType:'x mandatory' }}>
          {services.map(({ num, label, sub, color, bg, img, category }, i) => (
            <Link
              to="/vendors"
              search={{ category }}
              key={label}
              style={{
                flexShrink:0, width:280, borderRadius:24,
                background:'white', border:'1px solid #f0ede8',
                textDecoration:'none', display:'block',
                scrollSnapAlign:'start', overflow:'hidden',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.5s ease ${i*0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i*0.07}s, box-shadow 0.3s ease`,
              }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 16px 40px ${color}22`;e.currentTarget.style.transform='translateY(-4px)'}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='translateY(0)'}}
            >
              {/* Image */}
              <div style={{ height:180, overflow:'hidden', position:'relative' }}>
                <img src={img} alt={label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s ease' }}
                  onMouseEnter={e=>e.target.style.transform='scale(1.06)'}
                  onMouseLeave={e=>e.target.style.transform='scale(1)'}
                  onError={e=>{e.target.style.display='none'}}
                />
                <div style={{ position:'absolute', inset:0, background:`linear-gradient(to top, ${color}33, transparent)` }} />
                {/* Big number */}
                <div style={{ position:'absolute', top:12, right:14, fontFamily:"'DM Serif Display',serif", fontSize:48, color:'rgba(255,255,255,0.25)', fontWeight:400, lineHeight:1, userSelect:'none' }}>{num}</div>
              </div>

              {/* Content */}
              <div style={{ padding:'20px 22px' }}>
                <div style={{ display:'inline-block', padding:'3px 10px', borderRadius:20, background:bg, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, color, letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:10 }}>{sub}</div>
                <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:'#1a2e20', fontWeight:400, margin:'0 0 12px', lineHeight:1.2 }}>{label}</h3>
                <div style={{ display:'inline-flex', alignItems:'center', gap:4, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:12, color, textDecoration:'none' }}>
                  Explore vendors
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
