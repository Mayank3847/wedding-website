import { useState, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useAuth } from '../../context/AuthContext'

// SVG icons
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="10" fill="#4a7c59"/>
    <path d="M16 7C16 7 9 12 9 18.5C9 22.1 12.1 25 16 25C19.9 25 23 22.1 23 18.5C23 12 16 7 16 7Z" fill="white" fillOpacity="0.3"/>
    <path d="M16 10L14.5 15H10L13.5 17.5L12 22L16 19.5L20 22L18.5 17.5L22 15H17.5L16 10Z" fill="white"/>
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { user, logout, isLoggedIn } = useAuth()
  const router   = useRouterState()
  const pathname = router.location.pathname
  const onHome   = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { to: '/',         label: 'Home'        },
    { to: '/services', label: 'Services'    },
    { to: '/vendors',  label: 'Vendors'     },
    { to: '/contact',  label: 'Contact'     },
  ]

  const floating = onHome && !scrolled
  const navBg    = floating
    ? 'transparent'
    : 'rgba(254,253,251,0.95)'
  const textBase = floating ? '#fff' : '#292524'
  const subText  = floating ? 'rgba(255,255,255,0.7)' : '#78716c'

  return (
    <>
      <header style={{
        position:'fixed', top:0, left:0, right:0, zIndex:60,
        background: navBg,
        backdropFilter: floating ? 'none' : 'blur(16px)',
        borderBottom: floating ? 'none' : '1px solid rgba(0,0,0,0.06)',
        boxShadow: floating ? 'none' : '0 2px 20px rgba(0,0,0,0.05)',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding: floating ? '18px 32px' : '12px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', transition:'padding 0.3s ease' }}>

          {/* ── Brand ── */}
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
            <Logo />
            <div>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color: textBase, letterSpacing:'0.01em', lineHeight:1.1, transition:'color 0.3s' }}>
                Vivah Studio
              </div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color: subText, letterSpacing:'0.12em', textTransform:'uppercase', transition:'color 0.3s' }}>
                Wedding Services
              </div>
            </div>
          </Link>

          {/* ── Center pill nav (desktop) ── */}
          <nav style={{ display:'flex', alignItems:'center', gap:2, background: floating ? 'rgba(255,255,255,0.12)' : 'rgba(74,124,89,0.07)', borderRadius:50, padding:'4px', backdropFilter: floating ? 'blur(8px)' : 'none', border: floating ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(74,124,89,0.12)' }} className="nav-desktop">
            {links.map(({ to, label }) => {
              const active = pathname === to
              return (
                <Link key={to} to={to} style={{
                  fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight: active ? 600 : 400,
                  fontSize:13, padding:'8px 18px', borderRadius:50,
                  textDecoration:'none', letterSpacing:'0.02em',
                  background: active ? (floating ? 'white' : '#4a7c59') : 'transparent',
                  color: active ? (floating ? '#2e4d38' : 'white') : (floating ? 'rgba(255,255,255,0.85)' : '#44403c'),
                  transition:'all 0.25s ease',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = floating ? 'rgba(255,255,255,0.15)' : 'rgba(74,124,89,0.12)'; e.currentTarget.style.color = floating ? 'white' : '#2e4d38' }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = floating ? 'rgba(255,255,255,0.85)' : '#44403c' }}}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* ── Right actions ── */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }} className="nav-desktop">
            <Link to="/contact" style={{
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:13,
              color: floating ? 'rgba(255,255,255,0.85)' : '#4a7c59',
              padding:'8px 16px', borderRadius:50, textDecoration:'none',
              border: `1px solid ${floating ? 'rgba(255,255,255,0.3)' : 'rgba(74,124,89,0.4)'}`,
              display:'inline-flex', alignItems:'center', gap:6,
              transition:'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = floating ? 'rgba(255,255,255,0.1)' : 'rgba(74,124,89,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 01.06 2.86 2 2 0 012.03 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Enquire
            </Link>

            {isLoggedIn ? (
              <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                <Link to="/dashboard" style={{
                  fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:13,
                  color: floating ? 'white' : '#292524', textDecoration:'none',
                  padding:'8px 14px', borderRadius:50,
                  display:'inline-flex', alignItems:'center', gap:6,
                }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#6a9e6a,#3a6147)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:11, color:'white' }}>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  {user?.name?.split(' ')[0]}
                </Link>
                <button onClick={logout} style={{ background:'none', border:'none', cursor:'pointer', color:'#c94f62', padding:'8px', borderRadius:50, display:'flex', alignItems:'center' }} title="Logout">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                </button>
              </div>
            ) : (
              <Link to="/login" style={{
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:13,
                background: floating ? 'white' : '#4a7c59',
                color: floating ? '#2e4d38' : 'white',
                padding:'9px 22px', borderRadius:50, textDecoration:'none',
                letterSpacing:'0.02em', transition:'all 0.25s ease',
                boxShadow: floating ? 'none' : '0 4px 12px rgba(74,124,89,0.3)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = floating ? '0 4px 12px rgba(255,255,255,0.2)' : '0 8px 18px rgba(74,124,89,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = floating ? 'none' : '0 4px 12px rgba(74,124,89,0.3)' }}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display:'none', background:'none', border:'none', cursor:'pointer', color: floating ? 'white' : '#292524', padding:8 }} className="nav-mobile" aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div style={{ display: menuOpen ? 'block' : 'none', background:'#fefdfb', borderTop:'1px solid #f0ede8', padding:'16px 24px 24px' }}>
          {links.map(({ to, label }) => (
            <Link key={to} to={to} style={{ display:'block', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:14, color: pathname===to ? '#4a7c59' : '#44403c', padding:'12px 0', borderBottom:'1px solid #f5f5f4', textDecoration:'none' }} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link to="/contact" style={{ display:'block', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:14, color:'#4a7c59', padding:'12px 0', textDecoration:'none' }} onClick={() => setMenuOpen(false)}>
            Enquire Now
          </Link>
          {!isLoggedIn && (
            <div style={{ display:'flex', gap:10, marginTop:16 }}>
              <Link to="/login" style={{ flex:1, textAlign:'center', padding:'11px', borderRadius:12, border:'1.5px solid #9abf9a', color:'#4a7c59', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:500, textDecoration:'none' }} onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" style={{ flex:1, textAlign:'center', padding:'11px', borderRadius:12, background:'#4a7c59', color:'white', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:600, textDecoration:'none' }} onClick={() => setMenuOpen(false)}>Get Started</Link>
            </div>
          )}
        </div>
      </header>

      <style>{`
        @media (max-width:768px) {
          .nav-desktop { display:none !important; }
          .nav-mobile  { display:flex !important; }
        }
      `}</style>
    </>
  )
}
