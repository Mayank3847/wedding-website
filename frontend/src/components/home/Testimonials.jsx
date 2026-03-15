import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const reviews = [
  { name:'Priya & Arjun', city:'Mumbai', date:'Dec 2024', rating:5, short:'Finding our photographer here was the best decision of our wedding planning journey.', full:'Vivah Studio made the whole process so smooth. We found three shortlisted photographers within a day, compared their portfolios, and booked our favourite — all through the platform. The inquiry form was instant and the vendor responded within an hour.', category:'Photography', avatar:'PA', color:'#4a7c59' },
  { name:'Simran & Rahul', city:'Bangalore', date:'Feb 2025', rating:5, short:'From the venue to the caterer — every vendor we found here was exceptional.', full:'We used the platform for four different vendors and every single one was top-tier. The filtering by city and budget was incredibly helpful. I especially loved being able to send one inquiry form to multiple vendors at once.', category:'Venue & Catering', avatar:'SR', color:'#c94f62' },
  { name:'Deepika & Karan', city:'Jaipur', date:'Jan 2025', rating:5, short:'The dashboard made tracking all my vendor conversations so easy!', full:"I had inquiries open with 8 different vendors simultaneously and the dashboard kept everything organised. No more lost WhatsApp threads. This is genuinely the smartest wedding platform I've used.", category:'Multiple Services', avatar:'DK', color:'#2563eb' },
  { name:'Asha & Vikram', city:'Hyderabad', date:'Nov 2024', rating:5, short:'Our decorator from here transformed the venue into something magical.', full:'The decoration vendor we found through the platform went above and beyond. The detailed vendor profile with photos of past work meant we knew exactly what we were getting. Zero surprises on the day — except how beautiful everything looked.', category:'Decoration', avatar:'AV', color:'#7c3aed' },
]

export default function Testimonials() {
  const [expanded, setExpanded] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section
      ref={ref}
      style={{ padding: 'clamp(56px,8vw,100px) 0', background: '#fefdfb' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,5vw,48px)' }}>

        {/* Header — always centered on mobile */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,56px)' }}>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:'clamp(10px,1.2vw,11px)', letterSpacing:'0.2em', textTransform:'uppercase', color:'#4a7c59', display:'block', marginBottom:10 }}>
            Real Stories
          </span>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(1.6rem,4vw,3rem)', color:'#1a2e20', fontWeight:400, lineHeight:1.1, margin:'0 0 12px' }}>
            Couples Who Found
            <em style={{ color:'#9abf9a', display:'block' }}>Their Perfect Match</em>
          </h2>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:'#78716c', fontSize:'clamp(13px,1.4vw,15px)', lineHeight:1.75, maxWidth:480, margin:'0 auto' }}>
            Over 500 couples have planned their weddings using our platform.
          </p>
        </div>

        {/* Cards — auto-fit responsive grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(12px,2vw,20px)',
        }}>
          {reviews.map(({ name, city, date, rating, short, full, category, avatar, color }, i) => {
            const open = expanded === i
            return (
              <div
                key={name}
                onClick={() => setExpanded(open ? null : i)}
                style={{
                  background: i % 2 === 0 ? 'white' : '#f4f7f4',
                  borderRadius: 'clamp(14px,2vw,24px)',
                  padding: 'clamp(20px,3vw,32px)',
                  border: '1px solid',
                  borderColor: i % 2 === 0 ? '#f0ede8' : '#e8f0e8',
                  cursor: 'pointer',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(28px)',
                  transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                }}
              >
                {/* Category pill */}
                <div style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, background:`${color}18`, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:'clamp(9px,1vw,11px)', color, letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:14 }}>
                  {category}
                </div>

                {/* Stars */}
                <div style={{ display:'flex', gap:3, marginBottom:12 }}>
                  {[...Array(rating)].map((_, s) => (
                    <svg key={s} width="13" height="13" viewBox="0 0 14 14">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.1 3.3 12.3l.7-4.1-3-2.9 4.2-.7L7 1z" fill={color}/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p style={{ fontFamily:"'Libre Baskerville',serif", fontStyle:'italic', fontSize:'clamp(13px,1.4vw,15px)', color:'#292524', lineHeight:1.75, margin:'0 0 10px' }}>
                  "{open ? full : short}"
                </p>

                {/* Toggle */}
                <button style={{ background:'none', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:'clamp(11px,1.1vw,12px)', color, padding:'2px 0', marginBottom:16, display:'flex', alignItems:'center', gap:4 }}>
                  {open ? 'Read less ↑' : 'Read more ↓'}
                </button>

                {/* Author */}
                <div style={{ display:'flex', alignItems:'center', gap:10, paddingTop:16, borderTop:`1px solid ${color}22` }}>
                  <div style={{ width:'clamp(36px,5vw,42px)', height:'clamp(36px,5vw,42px)', borderRadius:'50%', background:`linear-gradient(135deg,${color},${color}88)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:'clamp(11px,1.2vw,13px)', color:'white', flexShrink:0 }}>
                    {avatar}
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:'clamp(12px,1.3vw,14px)', color:'#1a2e20' }}>{name}</div>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(10px,1.1vw,12px)', color:'#9abf9a' }}>{city} · {date}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
