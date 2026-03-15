import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}
    >
      <Navbar />
      <main style={{ flex: 1, width: '100%', maxWidth: '100%' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
