import { Link } from '@tanstack/react-router'

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="10" fill="#4a7c59"/>
    <path d="M16 7C16 7 9 12 9 18.5C9 22.1 12.1 25 16 25C19.9 25 23 22.1 23 18.5C23 12 16 7 16 7Z" fill="white" fillOpacity="0.3"/>
    <path d="M16 10L14.5 15H10L13.5 17.5L12 22L16 19.5L20 22L18.5 17.5L22 15H17.5L16 10Z" fill="white"/>
  </svg>
)

export default function Footer() {
  const year = new Date().getFullYear()

  const sections = [
    {
      title: 'Quick Links',
      links: [
        { to:'/',         label:'Home'        },
        { to:'/services', label:'Services'    },
        { to:'/vendors',  label:'Find Vendors' },
        { to:'/contact',  label:'Contact Us'  },
      ],
    },
    {
      title: 'Services',
      links: [
        { to:'/vendors?category=Photography',  label:'Photography'   },
        { to:'/vendors?category=Venue',        label:'Venues'        },
        { to:'/vendors?category=Catering',     label:'Catering'      },
        { to:'/vendors?category=Decoration',   label:'Decoration'    },
        { to:'/vendors?category=Makeup Artist',label:'Makeup Artist' },
        { to:'/vendors?category=Videography',  label:'Videography'   },
      ],
    },
    {
      title: 'Account',
      links: [
        { to:'/login',     label:'Login'     },
        { to:'/signup',    label:'Sign Up'   },
        { to:'/dashboard', label:'Dashboard' },
      ],
    },
  ]

  return (
    <footer style={{ background:'#1a2e20', color:'rgba(200,219,200,0.7)' }}>
      {/* Top border */}
      <div style={{ height:2, background:'linear-gradient(90deg,transparent,rgba(154,191,154,0.4),transparent)' }} />

      <div style={{ maxWidth:'var(--container-xl)', margin:'0 auto', padding:'clamp(48px,8vw,96px) var(--pad-x) clamp(32px,5vw,48px)' }}>

        {/* Main grid */}
        <div className="footer-grid">
          {/* Brand col */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'clamp(14px,2vw,20px)' }}>
              <Logo />
              <div>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(16px,2vw,20px)', color:'white' }}>Vivah Studio</div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:'#9abf9a', letterSpacing:'0.1em', textTransform:'uppercase' }}>Wedding Services</div>
              </div>
            </div>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(13px,1.3vw,14px)', lineHeight:1.8, maxWidth:280, marginBottom:'clamp(20px,3vw,28px)' }}>
              India's most trusted wedding services marketplace. Connecting couples with verified vendors across 50+ cities.
            </p>

            {/* Social icons */}
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {[
                { label:'Instagram', path:'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label:'Facebook',  path:'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { label:'YouTube',   path:'M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
              ].map(({ label, path }) => (
                <a key={label} href="#" aria-label={label} style={{ width:36, height:36, borderRadius:'50%', background:'rgba(154,191,154,0.1)', border:'1px solid rgba(154,191,154,0.2)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.25s ease', minWidth:36 }}
                onMouseEnter={e=>{e.currentTarget.style.background='#4a7c59';e.currentTarget.style.borderColor='#4a7c59'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(154,191,154,0.1)';e.currentTarget.style.borderColor='rgba(154,191,154,0.2)'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(200,219,200,0.8)"><path d={path}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {sections.map(({ title, links }) => (
            <div key={title}>
              <h4 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(15px,1.6vw,17px)', color:'white', marginBottom:'clamp(14px,2vw,20px)', fontWeight:400 }}>{title}</h4>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'clamp(8px,1.2vw,12px)' }}>
                {links.map(({ to, label }) => (
                  <li key={label}>
                    <Link to={to} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(12px,1.2vw,13px)', color:'rgba(200,219,200,0.6)', textDecoration:'none', transition:'color 0.2s ease' }}
                    onMouseEnter={e=>{e.currentTarget.style.color='#c8dbc8'}}
                    onMouseLeave={e=>{e.currentTarget.style.color='rgba(200,219,200,0.6)'}}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div style={{ marginTop:'clamp(32px,5vw,56px)', paddingTop:'clamp(24px,3vw,32px)', borderTop:'1px solid rgba(154,191,154,0.15)', display:'flex', flexWrap:'wrap', gap:'clamp(12px,2vw,24px)' }}>
          {[
            { icon:'📧', text:'hello@vivahstudio.in' },
            { icon:'📞', text:'+91 98765 43210'    },
            { icon:'📍', text:'New Delhi, India'   },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(12px,1.2vw,13px)', color:'rgba(200,219,200,0.6)' }}>
              <span style={{ fontSize:14 }}>{icon}</span>
              {text}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop:'clamp(20px,3vw,28px)', paddingTop:'clamp(16px,2vw,20px)', borderTop:'1px solid rgba(154,191,154,0.1)', display:'flex', flexWrap:'wrap', gap:12, justifyContent:'space-between', alignItems:'center' }}>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(11px,1.1vw,12px)', color:'rgba(200,219,200,0.4)' }}>
            © {year} Vivah Studio. All rights reserved.
          </p>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(11px,1.1vw,12px)', color:'rgba(200,219,200,0.4)' }}>
            Made with ♥ in India
          </p>
        </div>
      </div>
    </footer>
  )
}
