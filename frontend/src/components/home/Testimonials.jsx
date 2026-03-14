import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const reviews = [
  { name:'Priya & Arjun', city:'Mumbai', date:'Dec 2024', rating:5, short:'Finding our photographer here was the best decision of our wedding planning journey.', full:'Vivah Studio made the whole process so smooth. We found three shortlisted photographers within a day, compared their portfolios, and booked our favourite — all through the platform. The inquiry form was instant and the vendor responded within an hour.', category:'Photography', avatar:'PA' },
  { name:'Simran & Rahul', city:'Bangalore', date:'Feb 2025', rating:5, short:'From the venue to the caterer — every vendor we found here was exceptional.', full:'We used the platform for four different vendors and every single one was top-tier. The filtering by city and budget was incredibly helpful. I especially loved being able to send one inquiry form to multiple vendors at once.', category:'Venue & Catering', avatar:'SR' },
  { name:'Deepika & Karan', city:'Jaipur', date:'Jan 2025', rating:5, short:'The dashboard made tracking all my vendor conversations so easy!', full:'I had inquiries open with 8 different vendors simultaneously and the dashboard kept everything organised. No more lost WhatsApp threads. This is genuinely the smartest wedding platform I\'ve used.', category:'Multiple Services', avatar:'DK' },
  { name:'Asha & Vikram', city:'Hyderabad', date:'Nov 2024', rating:5, short:'Our decorator from here transformed the venue into something magical.', full:'The decoration vendor we found through the platform went above and beyond. The detailed vendor profile with photos of past work meant we knew exactly what we were getting. Zero surprises on the day — except how beautiful everything looked.', category:'Decoration', avatar:'AV' },
]

const colors = ['#4a7c59','#c94f62','#2563eb','#7c3aed']

export default function Testimonials() {
  const [expanded, setExpanded] = useState(null)
  const { ref, inView } = useInView({ threshold:0.1, triggerOnce:true })

  return (
    <section ref={ref} style={{ padding:'100px 0', background:'#fefdfb' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>

        {/* Two column header */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, marginBottom:64, alignItems:'end' }}>
          <div>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#4a7c59', display:'block', marginBottom:14 }}>Real Stories</span>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(1.8rem,3.5vw,3rem)', color:'#1a2e20', fontWeight:400, lineHeight:1.1, margin:0 }}>
              Couples Who Found
              <br /><em style={{ color:'#9abf9a' }}>Their Perfect Match</em>
            </h2>
          </div>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:'#78716c', fontSize:15, lineHeight:1.8, margin:0, alignSelf:'end' }}>
            Over 500 couples have planned their weddings using our platform. Here's what a few of them had to say about the experience.
          </p>
        </div>

        {/* Masonry-like 2-col grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          {reviews.map(({ name, city, date, rating, short, full, category, avatar }, i) => {
            const color = colors[i % colors.length]
            const open = expanded === i
            return (
              <div key={name} style={{
                background: i % 2 === 0 ? 'white' : '#f4f7f4',
                borderRadius:24, padding:'32px 28px',
                border:'1px solid', borderColor: i % 2 === 0 ? '#f0ede8' : '#e8f0e8',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.12}s`,
                cursor:'pointer',
              }}
              onClick={() => setExpanded(open ? null : i)}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 12px 36px ${color}18`}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow='none'}}
              >
                {/* Category pill */}
                <div style={{ display:'inline-block', padding:'4px 12px', borderRadius:20, background:color+'18', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, color, letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:20 }}>
                  {category}
                </div>

                {/* Stars */}
                <div style={{ display:'flex', gap:3, marginBottom:16 }}>
                  {[...Array(rating)].map((_,s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 14 14">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.1 3.3 12.3l.7-4.1-3-2.9 4.2-.7L7 1z" fill={color}/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p style={{ fontFamily:"'Libre Baskerville',serif", fontStyle:'italic', fontSize:16, color:'#292524', lineHeight:1.75, margin:'0 0 12px' }}>
                  "{open ? full : short}"
                </p>

                {/* Read more toggle */}
                <button style={{ background:'none', border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:12, color, display:'flex', alignItems:'center', gap:4, padding:'4px 0', marginBottom:20 }}>
                  {open ? 'Read less ↑' : 'Read more ↓'}
                </button>

                {/* Author */}
                <div style={{ display:'flex', alignItems:'center', gap:12, paddingTop:20, borderTop:`1px solid ${color}22` }}>
                  <div style={{ width:42, height:42, borderRadius:'50%', background:`linear-gradient(135deg,${color},${color}99)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:13, color:'white' }}>{avatar}</div>
                  <div>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:14, color:'#1a2e20' }}>{name}</div>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:'#9abf9a' }}>{city} · {date}</div>
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
