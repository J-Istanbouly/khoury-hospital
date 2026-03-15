'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    const fn = () => {
      const current = window.scrollY
      setScrolled(current > 10)
      if (current > lastScroll.current && current > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScroll.current = current
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Departments', href: '/departments' },
    { label: 'Find a Doctor', href: '/doctors' },
    { label: 'Patients', href: '/patients' },
    { label: 'News', href: '/news' },
    { label: 'Careers', href: '/jobs' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <style>{`
        .nav-links { display: flex; gap: 2px; align-items: center; }
        .nav-cta { display: inline-flex; }
        .hamburger { display: none; }
        .hide-sm { display: flex; }
        .top-bar { padding: 7px 48px; }
        .main-nav { padding: 0 48px; height: 74px; top: 34px; }
        .logo-img { height: 52px; }
        .logo-name { font-size: 17px; }
        .logo-sub { font-size: 10px; }
        .logo-divider { display: block; }
        .mobile-menu { top: 108px; }

        @media (max-width: 1024px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .hamburger { display: flex !important; }
        }

        @media (max-width: 768px) {
          .top-bar { padding: 6px 16px !important; }
          .main-nav { padding: 0 16px !important; height: 58px !important; top: 30px !important; }
          .logo-img { height: 36px !important; }
          .logo-name { font-size: 13px !important; }
          .logo-sub { display: none !important; }
          .logo-divider { display: none !important; }
          .mobile-menu { top: 88px !important; }
        }

        @media (max-width: 480px) {
          .top-bar { padding: 5px 12px !important; }
          .logo-img { height: 32px !important; }
          .logo-name { font-size: 12px !important; }
        }

        @media (max-width: 640px) {
          .hide-sm { display: none !important; }
        }
      `}</style>

      {/* TOP BAR */}
      <div className="top-bar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
        background: '#0A2540',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        transform: hidden ? 'translateY(-200%)' : 'translateY(0)',
        transition: 'transform 0.3s ease',
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="tel:+96188807000" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', gap: '5px' }}>
            📞 +961 8 807 000
          </a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <a href="tel:+96188811181" className="hide-sm" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontFamily: 'Inter,sans-serif' }}>
            +961 8 811 181
          </a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }} className="hide-sm">|</span>
          <a href="mailto:info@khouryhospital.com" className="hide-sm" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontFamily: 'Inter,sans-serif' }}>
            ✉ info@khouryhospital.com
          </a>
        </div>
        <span className="hide-sm" style={{ background: 'rgba(46,134,193,0.3)', color: 'rgba(255,255,255,0.9)', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', fontFamily: 'Inter,sans-serif' }}>
          🏆 Category A
        </span>
      </div>

      {/* MAIN NAV */}
      <nav className="main-nav" style={{
        position: 'fixed', left: 0, right: 0, zIndex: 399,
        background: scrolled ? 'rgba(255,255,255,0.98)' : 'white',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: scrolled ? '0 4px 20px rgba(10,37,64,0.1)' : 'none',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        transform: hidden ? 'translateY(-200%)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}>

        {/* LOGO */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, textDecoration: 'none' }}>
          <img src="/logo.jpg" alt="Khoury General Hospital" className="logo-img" style={{ width: 'auto', objectFit: 'contain' }} />
          <div className="logo-divider" style={{ borderLeft: '1px solid #E2E8F0', paddingLeft: '10px' }}>
            <div className="logo-name" style={{ fontFamily: 'Playfair Display, serif', fontWeight: '700', color: '#103A5E', lineHeight: '1.2' }}>
              Khoury General Hospital
            </div>
            <div className="logo-sub" style={{ fontFamily: 'Inter, sans-serif', color: '#94A3B8', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '2px' }}>
              Zahle · Bekaa · Lebanon
            </div>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="nav-links">
          {links.map(item => (
            <Link key={item.href} href={item.href} style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13.5px', fontWeight: '500',
              color: '#334155', padding: '8px 13px', borderRadius: '7px',
              transition: 'all 0.18s', whiteSpace: 'nowrap', textDecoration: 'none',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1F6AA5'; (e.currentTarget as HTMLElement).style.background = '#EBF5FB' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#334155'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link href="/appointments" className="nav-cta" style={{
            alignItems: 'center', gap: '8px',
            padding: '10px 20px', background: '#1F6AA5', color: 'white',
            fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: '600',
            borderRadius: '8px', boxShadow: '0 4px 14px rgba(31,106,165,0.35)',
            transition: 'all 0.22s', textDecoration: 'none',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#103A5E' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1F6AA5' }}
          >
            Book Appointment
          </Link>
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '7px 10px', cursor: 'pointer', fontSize: '16px', color: '#1F6AA5' }}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mobile-menu" style={{
          position: 'fixed', left: 0, right: 0, zIndex: 398,
          background: 'white', borderBottom: '1px solid #E2E8F0',
          boxShadow: '0 8px 32px rgba(10,37,64,0.12)', padding: '12px 16px',
          transform: hidden ? 'translateY(-400%)' : 'translateY(0)',
          transition: 'transform 0.3s ease',
        }}>
          {links.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{
              display: 'block', padding: '11px 14px', fontFamily: 'Inter, sans-serif',
              fontSize: '14px', fontWeight: '500', color: '#334155',
              borderRadius: '8px', marginBottom: '2px', textDecoration: 'none',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#EBF5FB'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/appointments" onClick={() => setMobileOpen(false)} style={{
            display: 'block', textAlign: 'center', padding: '11px',
            background: '#1F6AA5', color: 'white', borderRadius: '8px',
            fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '700',
            marginTop: '8px', textDecoration: 'none',
          }}>
            Book Appointment
          </Link>
        </div>
      )}
    </>
  )
}