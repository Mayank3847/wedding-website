import { useInView } from 'react-intersection-observer'

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2L17.09 9.26L25 10.27L19.5 15.64L20.9 23.5L14 19.77L7.1 23.5L8.5 15.64L3 10.27L10.91 9.26L14 2Z" fill="#D4AF37"/>
      </svg>
    ),
    title: 'Verified Vendors Only',
    desc: 'Every vendor on our platform is personally vetted for quality, reliability, and professionalism before listing.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3C8 3 3 8 3 14s5 11 11 11 11-5 11-11S20 3 14 3z" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
        <path d="M14 8v6l4 2" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Fast Response Time',
    desc: 'Get replies from vendors within 2 hours. Our dedicated team ensures you\'re never left waiting for answers.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 14l6 6L23 8" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Best Price Guarantee',
    desc: 'Compare quotes from multiple vendors instantly. We ensure you always get the best value for your budget.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C9 4 5 8 5 13c0 3.9 2.4 7.3 5.9 8.7L14 24l3.1-2.3C20.6 20.3 23 16.9 23 13c0-5-4-9-9-9z" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
        <path d="M11 13l2 2 4-4" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Dedicated Support',
    desc: 'A personal wedding coordinator is assigned to guide you through every step of your planning journey.',
  },
]

export default function WhyUs() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} style={{ padding:'100px 0', background:'white', position:'relative', overflow:'hidden' }}>
      {/* Subtle background text */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:"'Playfair Display',serif", fontSize:'clamp(6rem,12vw,14rem)', color:'rgba(212,175,55,0.03)', fontWeight:700, whiteSpace:'nowrap', pointerEvents:'none', userSelect:'none', lineHeight:1 }}>
        ETERNAL VOWS
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 1.5rem', position:'relative', zIndex:1 }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:72 }}>
          <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:'italic', fontSize:18, color:'#B8960C', marginBottom:8 }}>
            The Eternal Vows Difference
          </p>
          <div style={{ width:60, height:2, background:'linear-gradient(90deg,#D4AF37,#B8960C)', borderRadius:2, margin:'0 auto 16px' }} />
          <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(1.8rem,4vw,3rem)', color:'#1C1C1C', fontWeight:400, margin:0, lineHeight:1.2 }}>
            Why Couples Choose Us
          </h2>
        </div>

        {/* 4-col grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))', gap:32 }}>
          {features.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              style={{
                textAlign:'center',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
              }}
            >
              {/* Icon ring */}
              <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,#FFFBEB,#FEF3C7)', border:'1px solid rgba(212,175,55,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                {icon}
              </div>

              <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:18, color:'#1C1C1C', fontWeight:600, margin:'0 0 12px' }}>
                {title}
              </h3>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#888', lineHeight:1.7, margin:0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
