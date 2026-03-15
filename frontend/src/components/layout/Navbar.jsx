import { useState, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useAuth } from '../../context/AuthContext'

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
    <rect width="32" height="32" rx="10" fill="#4a7c59"/>
    <path d="M16 7C16 7 9 12 9 18.5C9 22.1 12.1 25 16 25C19.9 25 23 22.1 23 18.5C23 12 16 7 16 7Z" fill="white" fillOpacity="0.3"/>
    <path d="M16 10L14.5 15H10L13.5 17.5L12 22L16 19.5L20 22L18.5 17.5L22 15H17.5L16 10Z" fill="white"/>
  </svg>
)

const links = [
  { to: '/',         label: 'Home'       },
  { to: '/services', label: 'Services'   },
  { to: '/vendors',  label: 'Vendors'    },
  { to: '/contact',  label: 'Contact'    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout, isLoggedIn } = useAuth()
  const router   = useRouterState()
  const pathname = router.location.pathname
  const onHome   = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const floating = onHome && !scrolled

  const S = {
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
      background: floating ? 'transparent' : 'rgba(254,253,251,0.96)',
      backdropFilter: floating ? 'none' : 'blur(16px)',
      WebkitBackdropFilter: floating ? 'none' : 'blur(16px)',
      boxShadow: floating ? 'none' : '0 1px 20px rgba(0,0,0,0.07)',
      borderBottom: floating ? 'none' : '1px solid rgba(0,0,0,0.05)',
      transition: 'all 0.4s ease',
    },
    inner: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: floating ? '18px var(--pad-x)' : '12px var(--pad-x)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      transition: 'padding 0.3s ease',
    },
    logoText: {
      fontFamily: "'DM Serif Display',serif",
      fontSize: 'clamp(15px,2vw,19px)',
      color: floating ? 'white' : '#1a2e20',
      letterSpacing: '0.01em',
      lineHeight: 1.1,
      transition: 'color 0.3s',
      whiteSpace: 'nowrap',
    },
    logoSub: {
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      fontSize: 'clamp(9px,1vw,10px)',
      color: floating ? 'rgba(200,219,200,0.8)' : '#9abf9a',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      transition: 'color 0.3s',
    },
    pillNav: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      background: floating ? 'rgba(255,255,255,0.12)' : 'rgba(74,124,89,0.07)',
      borderRadius: 999,
      padding: '4px',
      border: floating ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(74,124,89,0.12)',
    },
    textColor: floating ? 'rgba(255,255,255,0.85)' : '#44403c',
  }

  return (
    <>
      <header style={S.nav}>
        <div style={S.inner}>

          {/* Brand */}
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flexShrink:0 }}>
            <Logo />
            <div style={{ display:'flex', flexDirection:'column', lineHeight:1.1 }}>
              <span style={S.logoText}>Vivah Studio</span>
              <span style={S.logoSub}>Wedding Services</span>
            </div>
          </Link>

          {/* Desktop pill nav */}
          <nav style={S.pillNav} className="nav-desktop">
            {links.map(({ to, label }) => {
              const active = pathname === to
              return (
                <Link key={to} to={to} style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: active ? 600 : 400,
                  fontSize: 'clamp(12px,1.2vw,13px)',
                  padding: 'clamp(6px,1vw,8px) clamp(12px,1.5vw,18px)',
                  borderRadius: 999,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  background: active ? (floating ? 'white' : '#4a7c59') : 'transparent',
                  color: active ? (floating ? '#2e4d38' : 'white') : S.textColor,
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}>
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }} className="nav-desktop">
            <Link to="/contact" style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(11px,1.1vw,13px)',
              color: floating ? 'rgba(255,255,255,0.85)' : '#4a7c59',
              padding: 'clamp(6px,1vw,8px) clamp(12px,1.5vw,16px)',
              borderRadius: 999,
              textDecoration: 'none',
              border: `1px solid ${floating ? 'rgba(255,255,255,0.3)' : 'rgba(74,124,89,0.4)'}`,
              display: 'inline-flex', alignItems: 'center', gap: 5,
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A2 2 0 012.03 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Enquire
            </Link>

            {isLoggedIn ? (
              <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                <Link to="/dashboard" style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500,
                  fontSize:'clamp(11px,1.1vw,13px)',
                  color: floating ? 'white' : '#292524',
                  textDecoration:'none', padding:'6px 12px', borderRadius:999,
                }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#6a9e6a,#3a6147)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:11, color:'white', flexShrink:0 }}>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span style={{ display:'none' }} className="show-xl">{user?.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={logout} style={{ background:'none', border:'none', cursor:'pointer', color:'#c94f62', padding:8, borderRadius:999, display:'flex', alignItems:'center' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                  </svg>
                </button>
              </div>
            ) : (
              <Link to="/login" style={{
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600,
                fontSize:'clamp(11px,1.1vw,13px)',
                background: floating ? 'white' : '#4a7c59',
                color: floating ? '#2e4d38' : 'white',
                padding:'clamp(7px,1vw,9px) clamp(16px,2vw,22px)',
                borderRadius:999, textDecoration:'none',
                letterSpacing:'0.02em', transition:'all 0.25s ease',
                boxShadow: floating ? 'none' : '0 4px 12px rgba(74,124,89,0.3)',
                whiteSpace:'nowrap',
              }}>
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile"
            style={{ background:'none', border:'none', cursor:'pointer', color: floating ? 'white' : '#1a2e20', padding:8, borderRadius:8, minWidth:44, minHeight:44, display:'flex', alignItems:'center', justifyContent:'center' }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div style={{
          display: menuOpen ? 'block' : 'none',
          background: 'white',
          borderTop: '1px solid #f0ede8',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}>
          <div style={{ padding:'8px 0' }}>
            {links.map(({ to, label }) => (
              <Link key={to} to={to} style={{
                display: 'flex', alignItems: 'center',
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: pathname === to ? 600 : 400,
                fontSize: 15,
                color: pathname === to ? '#4a7c59' : '#44403c',
                padding: '14px var(--pad-x)',
                borderBottom: '1px solid #f9f6f2',
                textDecoration: 'none',
                background: pathname === to ? '#f4f7f4' : 'transparent',
              }}>
                {label}
              </Link>
            ))}
            <div style={{ padding:'12px var(--pad-x)' }}>
              <Link to="/contact" style={{ display:'block', textAlign:'center', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:14, color:'#4a7c59', padding:'12px', borderRadius:12, border:'1.5px solid #9abf9a', marginBottom:10, textDecoration:'none' }}>
                📞 Enquire Now
              </Link>
              {isLoggedIn ? (
                <div style={{ display:'flex', gap:10 }}>
                  <Link to="/dashboard" style={{ flex:1, textAlign:'center', padding:'12px', borderRadius:12, background:'#f4f7f4', color:'#1a2e20', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:500, textDecoration:'none' }}>
                    Dashboard
                  </Link>
                  <button onClick={logout} style={{ flex:1, padding:'12px', borderRadius:12, border:'1.5px solid #fca5a5', color:'#ef4444', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:500, background:'none', cursor:'pointer' }}>
                    Logout
                  </button>
                </div>
              ) : (
                <div style={{ display:'flex', gap:10 }}>
                  <Link to="/login"  style={{ flex:1, textAlign:'center', padding:'12px', borderRadius:12, border:'1.5px solid #9abf9a', color:'#4a7c59', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:500, textDecoration:'none' }}>Login</Link>
                  <Link to="/signup" style={{ flex:1, textAlign:'center', padding:'12px', borderRadius:12, background:'#4a7c59', color:'white', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:600, textDecoration:'none' }}>Get Started</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
