'use client'
import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import ScrollToTop from './ScrollToTop'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const isLogin = pathname === '/admin/login'

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Header />}
      <div style={!isAdmin ? { paddingTop: '108px' } : isLogin ? { minHeight: '100vh', overflowY: 'auto' } : {}}>
        {children}
      </div>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  )
}