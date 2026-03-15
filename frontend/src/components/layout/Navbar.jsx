import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useAuth } from '../../context/AuthContext'

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
    <rect width="32" height="32" rx="10" fill="#4a7c59"/>
    <path d="M16 7C16 7 9 12 9 18.5C9 22.1 12.1 25 16 25C19.9 25 23 22.1 23 18.5C23 12 16 7 16 7Z" fill="white" fillOpacity="0.3"/>
    <path d="M16 10L14.5 15H10L13.5 17.5L12 22L16 19.5L20 22L18.5 17.5L22 15H17.5L16 10Z" fill="white"/>
  </svg>
)

const navLinks = [
  { to: '/',         label: 'Home'       },
  { to: '/services', label: 'Services'   },
  { to: '/vendors',  label: 'Vendors'    },
  { to: '/contact',  label: 'Contact'    },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

  const { user, logout, isLoggedIn } = useAuth()
  const router   = useRouterState()
  const pathname = router.location.pathname
  const onHome   = pathname === '/'

  // track scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // track screen width
  useEffect(() => {
    const fn = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  // close menu on route change
  useEffect(() => setMenuOpen(false), [pathname])

  const floating     = onHome && !scrolled
  const navBg        = floating ? 'transparent' : 'rgba(254,253,251,0.96)'
  const textColor    = floating ? 'rgba(255,255,255,0.88)' : '#292524'
  const borderBottom = floating ? 'none' : '1px solid rgba(0,0,0,0.06)'
  const shadow       = floating ? 'none' : '0 1px 20px rgba(0,0,0,0.07)'
  const navPad       = scrolled ? '10px 20px' : '16px 20px'

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: navBg,
        backdropFilter: floating ? 'none' : 'blur(16px)',
        WebkitBackdropFilter: floating ? 'none' : 'blur(16px)',
        borderBottom,
        boxShadow: shadow,
        transition: 'all 0.35s ease',
      }}>
        <div style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: navPad,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          transition: 'padding 0.3s ease',
        }}>

          {/* ── Brand ── */}
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flexShrink:0 }}>
            <Logo />
            <div style={{ display:'flex', flexDirection:'column', lineHeight:1.15 }}>
              <span style={{ fontFamily:"'DM Serif Display',serif", fontSize: isDesktop ? 19 : 16, color: floating ? 'white' : '#1a2e20', letterSpacing:'0.01em', transition:'color 0.3s' }}>
                Vivah Studio
              </span>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize: isDesktop ? 10 : 9, color:'#9abf9a', letterSpacing:'0.1em', textTransform:'uppercase' }}>
                Wedding Services
              </span>
            </div>
          </Link>

          {/* ── Desktop pill navigation ── */}
          {isDesktop && (
            <nav style={{ display:'flex', alignItems:'center', gap:2, background: floating ? 'rgba(255,255,255,0.12)' : 'rgba(74,124,89,0.07)', borderRadius:999, padding:4, border: floating ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(74,124,89,0.12)' }}>
              {navLinks.map(({ to, label }) => {
                const active = pathname === to
                return (
                  <Link key={to} to={to} style={{
                    fontFamily:"'Plus Jakarta Sans',sans-serif",
                    fontWeight: active ? 600 : 400,
                    fontSize: 13,
                    padding: '8px 18px',
                    borderRadius: 999,
                    textDecoration: 'none',
                    background: active ? (floating ? 'white' : '#4a7c59') : 'transparent',
                    color: active ? (floating ? '#2e4d38' : 'white') : textColor,
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                  }}>
                    {label}
                  </Link>
                )
              })}
            </nav>
          )}

          {/* ── Desktop right actions ── */}
          {isDesktop && (
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <Link to="/contact" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:13, color: floating ? 'rgba(255,255,255,0.85)' : '#4a7c59', padding:'8px 16px', borderRadius:999, textDecoration:'none', border:`1px solid ${floating ? 'rgba(255,255,255,0.3)' : 'rgba(74,124,89,0.4)'}`, display:'inline-flex', alignItems:'center', gap:5, transition:'all 0.25s ease', whiteSpace:'nowrap' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 2 2 0 01.06-2.86l.58-.58a2 2 0 012.11-.45c.61.24 1.24.45 1.9.62a2 2 0 011.45 1.94v.72a16 16 0 006 6 2 2 0 001.94 1.45h.72c.7.15 1.37.35 2 .58a2 2 0 01-.45 2.11z"/>
                </svg>
                Enquire
              </Link>
              {isLoggedIn ? (
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                  <Link to="/dashboard" style={{ display:'inline-flex', alignItems:'center', gap:7, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:13, color: floating ? 'white' : '#292524', textDecoration:'none', padding:'6px 12px', borderRadius:999 }}>
                    <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#6a9e6a,#3a6147)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:11, color:'white' }}>
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    {user?.name?.split(' ')[0]}
                  </Link>
                  <button onClick={logout} style={{ background:'none', border:'none', cursor:'pointer', color:'#c94f62', padding:8, borderRadius:999, display:'flex', alignItems:'center', minWidth:36, minHeight:36 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <Link to="/login" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:13, background: floating ? 'white' : '#4a7c59', color: floating ? '#2e4d38' : 'white', padding:'9px 22px', borderRadius:999, textDecoration:'none', letterSpacing:'0.02em', transition:'all 0.25s ease', boxShadow: floating ? 'none' : '0 4px 12px rgba(74,124,89,0.3)', whiteSpace:'nowrap' }}>
                  Sign In
                </Link>
              )}
            </div>
          )}

          {/* ── Mobile: right side (user avatar or sign in + hamburger) ── */}
          {!isDesktop && (
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              {isLoggedIn ? (
                <Link to="/dashboard" style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#6a9e6a,#3a6147)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12, color:'white', textDecoration:'none' }}>
                  {user?.name?.charAt(0)?.toUpperCase()}
                </Link>
              ) : (
                <Link to="/login" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:12, background: floating ? 'rgba(255,255,255,0.15)' : '#4a7c59', color: floating ? 'white' : 'white', padding:'7px 14px', borderRadius:999, textDecoration:'none', border: floating ? '1px solid rgba(255,255,255,0.25)' : 'none' }}>
                  Login
                </Link>
              )}
              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                style={{ background:'none', border:'none', cursor:'pointer', color: floating ? 'white' : '#1a2e20', padding:8, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', minWidth:40, minHeight:40 }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  {menuOpen
                    ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                    : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
                  }
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* ── Mobile dropdown menu ── */}
        {!isDesktop && menuOpen && (
          <div style={{ background:'white', borderTop:'1px solid #f0ede8', boxShadow:'0 8px 32px rgba(0,0,0,0.12)' }}>
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} style={{
                display:'flex', alignItems:'center',
                fontFamily:"'Plus Jakarta Sans',sans-serif",
                fontWeight: pathname === to ? 600 : 400,
                fontSize: 15, color: pathname === to ? '#4a7c59' : '#44403c',
                padding:'15px 20px', borderBottom:'1px solid #f9f6f2',
                textDecoration:'none',
                background: pathname === to ? '#f4f7f4' : 'transparent',
                minHeight: 52,
              }}>
                {label}
              </Link>
            ))}
            <div style={{ padding:'14px 20px 20px' }}>
              <Link to="/contact" style={{ display:'flex', justifyContent:'center', alignItems:'center', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:14, color:'#4a7c59', padding:'13px', borderRadius:12, border:'1.5px solid #9abf9a', marginBottom:10, textDecoration:'none', minHeight:48 }}>
                📞 Enquire Now
              </Link>
              {isLoggedIn ? (
                <div style={{ display:'flex', gap:10 }}>
                  <Link to="/dashboard" style={{ flex:1, textAlign:'center', padding:'13px', borderRadius:12, background:'#f4f7f4', color:'#1a2e20', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:500, textDecoration:'none' }}>Dashboard</Link>
                  <button onClick={() => { logout(); setMenuOpen(false) }} style={{ flex:1, padding:'13px', borderRadius:12, border:'1.5px solid #fca5a5', color:'#ef4444', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:500, background:'none', cursor:'pointer' }}>Logout</button>
                </div>
              ) : (
                <div style={{ display:'flex', gap:10 }}>
                  <Link to="/signup" style={{ flex:1, textAlign:'center', padding:'13px', borderRadius:12, background:'#4a7c59', color:'white', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:600, textDecoration:'none' }}>Get Started</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
