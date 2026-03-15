import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

function CountUp({ to, suffix = '', duration = 2000 }) {
  const [val, setVal] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })
  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const e = 1 - Math.pow(2, -10 * p)
      setVal(Math.floor(e * to))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVal(to)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])
  return <span ref={ref}>{val}{suffix}</span>
}

const stats = [
  { to: 500, suffix: '+', label: 'Weddings',        sub: 'Successfully planned' },
  { to: 200, suffix: '+', label: 'Verified Vendors', sub: 'Across 50+ cities'   },
  { to: 8,   suffix: '+', label: 'Years Active',     sub: 'Trusted since 2016'  },
  { to: 98,  suffix: '%', label: 'Happy Clients',    sub: 'Based on reviews'    },
]

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      ref={ref}
      style={{
        background: '#f4f7f4',
        borderTop: '1px solid #e8f0e8',
        borderBottom: '1px solid #e8f0e8',
      }}
    >
      {/* Responsive grid: 4-col on desktop, 2-col on mobile */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
        }}
      >
        {stats.map(({ to, suffix, label, sub }, i) => (
          <div
            key={label}
            style={{
              padding: 'clamp(28px,4vw,44px) clamp(16px,3vw,36px)',
              borderRight: '1px solid #e8f0e8',
              borderBottom: '1px solid #e8f0e8',
              position: 'relative',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transition: `all 0.5s ease ${i * 0.1}s`,
            }}
          >
            {/* Green top accent */}
            <div style={{ position:'absolute', top:0, left:'clamp(16px,3vw,36px)', width:32, height:3, background:'linear-gradient(90deg,#4a7c59,#9abf9a)', borderRadius:'0 0 3px 3px' }} />

            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'#2e4d38', lineHeight:1, marginBottom:6 }}>
              {inView ? <CountUp to={to} suffix={suffix} /> : `0${suffix}`}
            </div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:'clamp(12px,1.4vw,14px)', color:'#292524', marginBottom:4 }}>
              {label}
            </div>
            <div style={{ fontFamily:"'Libre Baskerville',serif", fontStyle:'italic', fontSize:'clamp(11px,1.2vw,13px)', color:'#9abf9a' }}>
              {sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
