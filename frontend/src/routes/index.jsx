import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { vendorAPI } from '../api/auth'
import VendorCard from '../components/vendors/VendorCard'
import Hero from '../components/home/Hero'
import Stats from '../components/home/Stats'
import Services from '../components/home/Services'
import Testimonials from '../components/home/Testimonials'
import { useInView } from 'react-intersection-observer'

export const Route = createFileRoute('/')({
  component: HomePage,
})

// Why us features
const features = [
  { icon:'🔍', title:'Smart Discovery', desc:'Filter vendors by category, city, budget and rating — find exactly who you need in seconds.' },
  { icon:'✓',  title:'Verified Only',   desc:'Every vendor undergoes manual verification before listing. No fake profiles, ever.' },
  { icon:'💬', title:'Direct Inquiries', desc:'Send inquiries directly from vendor pages. No middlemen. No extra charges.' },
  { icon:'📊', title:'Your Dashboard',  desc:'Track all your vendor conversations, saved vendors and responses in one clean place.' },
]

function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['featured-vendors'],
    queryFn: () => vendorAPI.getAll({ featured:true, limit:4 }),
  })
  const { ref:fvRef, inView:fvVisible } = useInView({ threshold:0.05, triggerOnce:true })
  const { ref:wuRef, inView:wuVisible } = useInView({ threshold:0.1, triggerOnce:true })
  const vendors = data?.data?.vendors || []

  return (
    <>
      <Hero />
      <Stats />
      <Services />

      {/* ── Why Us ── */}
      <section ref={wuRef} style={{ padding:'96px 0', background:'#f4f7f4' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:80, alignItems:'start' }}>

            {/* Left sticky text */}
            <div style={{ position:'sticky', top:100 }}>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#4a7c59', display:'block', marginBottom:14 }}>Why Vivah Studio</span>
              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(1.8rem,3vw,2.6rem)', color:'#1a2e20', fontWeight:400, lineHeight:1.15, margin:'0 0 20px' }}>
                Built for couples,
                <em style={{ display:'block', color:'#9abf9a' }}> not just vendors</em>
              </h2>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:'#78716c', fontSize:14, lineHeight:1.8 }}>
                We designed every feature from a couple's perspective — making it easy to discover, compare and connect with the right people for your wedding.
              </p>
              <Link to="/vendors" style={{ display:'inline-flex', alignItems:'center', gap:8, marginTop:28, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:13, color:'white', background:'#4a7c59', padding:'12px 28px', borderRadius:50, textDecoration:'none', letterSpacing:'0.03em', transition:'all 0.3s ease' }}
              onMouseEnter={e=>{e.currentTarget.style.background='#3a6147'}}
              onMouseLeave={e=>{e.currentTarget.style.background='#4a7c59'}}
              >
                Start Exploring
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            {/* Right feature list */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              {features.map(({ icon, title, desc }, i) => (
                <div key={title} style={{
                  background:'white', borderRadius:20, padding:'28px 24px',
                  border:'1px solid #e8f0e8',
                  opacity: wuVisible ? 1 : 0,
                  transform: wuVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition:`all 0.5s ease ${i*0.1}s`,
                }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:'#f4f7f4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginBottom:16 }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:'#1a2e20', fontWeight:400, margin:'0 0 10px' }}>{title}</h3>
                  <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:'#78716c', lineHeight:1.7, margin:0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Vendors ── */}
      <section ref={fvRef} style={{ padding:'96px 0', background:'#fefdfb' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px' }}>

          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:48 }}>
            <div>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#4a7c59', display:'block', marginBottom:10 }}>Top Picks</span>
              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(1.8rem,3.5vw,2.8rem)', color:'#1a2e20', fontWeight:400, lineHeight:1.1, margin:0 }}>
                Featured Vendors
              </h2>
            </div>
            <Link to="/vendors" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:13, color:'#4a7c59', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6, border:'1px solid #c8dbc8', padding:'10px 20px', borderRadius:50, transition:'all 0.2s ease' }}
            onMouseEnter={e=>{e.currentTarget.style.background='#4a7c59';e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='#4a7c59'}}
            >
              View all vendors →
            </Link>
          </div>

          {isLoading ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:20 }}>
              {[...Array(4)].map((_,i) => <div key={i} style={{ height:340, borderRadius:20, background:'#f5f5f4' }} className="skeleton-pulse" />)}
            </div>
          ) : vendors.length === 0 ? (
            <div style={{ textAlign:'center', padding:'48px 0', color:'#a8a29e', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14 }}>
              No featured vendors yet. Add vendors through the backend to see them here.
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:20 }}>
              {vendors.map((v,i) => (
                <div key={v.id} style={{ opacity:fvVisible?1:0, transform:fvVisible?'translateY(0)':'translateY(24px)', transition:`all 0.55s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s` }}>
                  <VendorCard vendor={v} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Testimonials />

      {/* ── Final CTA ── */}
      <section style={{ padding:'96px 48px', background:'#1a2e20', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(154,191,154,0.08) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:600, margin:'0 auto' }}>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase', color:'#9abf9a', display:'block', marginBottom:20 }}>
            Ready to Begin?
          </span>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(2rem,4vw,3.2rem)', color:'white', fontWeight:400, lineHeight:1.1, margin:'0 0 20px' }}>
            Let's Plan Your
            <em style={{ color:'#c8dbc8', display:'block' }}>Perfect Wedding Together</em>
          </h2>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:'rgba(200,219,200,0.6)', fontSize:15, lineHeight:1.8, margin:'0 0 36px' }}>
            Browse 200+ verified vendors, send free inquiries, and manage everything from your personal dashboard.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
            <Link to="/signup" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:14, background:'#9abf9a', color:'#1a2e20', padding:'14px 40px', borderRadius:50, textDecoration:'none', letterSpacing:'0.03em', transition:'all 0.3s ease' }}
            onMouseEnter={e=>{e.currentTarget.style.background='#c8dbc8';e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='#9abf9a';e.currentTarget.style.transform='none'}}
            >
              Create Free Account
            </Link>
            <Link to="/vendors" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:14, color:'rgba(200,219,200,0.8)', padding:'14px 36px', borderRadius:50, textDecoration:'none', letterSpacing:'0.03em', border:'1px solid rgba(154,191,154,0.3)', transition:'all 0.3s ease' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(154,191,154,0.7)';e.currentTarget.style.color='#c8dbc8'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(154,191,154,0.3)';e.currentTarget.style.color='rgba(200,219,200,0.8)'}}
            >
              Browse Vendors
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
