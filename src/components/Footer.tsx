'use client'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#0D1F2D', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr; gap:48px; max-width:1200px; margin:0 auto; padding:48px 48px 32px; }
        .footer-bottom { max-width:1200px; margin:0 auto; border-top:1px solid rgba(255,255,255,0.08); padding:16px 48px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; }
        .footer-cta-desktop { display:flex; }
        .footer-hours { display:block; }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns:1fr !important; gap:28px !important; padding:32px 20px 24px !important; }
          .footer-bottom { padding:14px 20px !important; }
          .footer-hours { display:none !important; }
          .footer-links-inner { display:grid !important; grid-template-columns:1fr 1fr !important; gap:8px 20px !important; }
        }
      `}</style>

      <div className="footer-grid">

        {/* BRAND */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <img src="/logo.jpg" alt="KGH" style={{ height: '48px', width: 'auto', objectFit: 'contain', opacity: 0.9 }} />
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '12px' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '600', color: 'white' }}>Khoury General Hospital</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '2px' }}>Zahle · Bekaa · Lebanon</div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', marginBottom: '20px', maxWidth: '320px' }}>
            Delivering expert, compassionate healthcare to the Bekaa region since 1993. Category A certified by the Lebanese Ministry of Health.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            <a href="tel:+96188807000" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: '8px' }}>📞 +961 8 807 000</a>
            <a href="tel:+96188811181" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: '8px' }}>📞 +961 8 811 181</a>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: '8px' }}>📠 +961 8 804 960</span>
            <a href="mailto:info@khouryhospital.com" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: '8px' }}>✉️ info@khouryhospital.com</a>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: '8px' }}>📍 Brazil Street, Zahle, Bekaa — Lebanon</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href="tel:+96188807000" style={{ flex: 1, textAlign: 'center', background: '#1F6AA5', color: 'white', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2E86C1'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1F6AA5'}
            >📞 Call Us</a>
            <a href="https://wa.me/96188807000" target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', background: '#25D366', color: 'white', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>💬 WhatsApp</a>
          </div>
        </div>

        {/* LINKS */}
        <div>
          <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>Quick Links</h4>
          <div className="footer-links-inner" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'About Us', href: '/about' },
              { label: 'Departments', href: '/departments' },
              { label: 'Find a Doctor', href: '/doctors' },
              { label: 'Book Appointment', href: '/appointments' },
              { label: 'Patients & Visitors', href: '/patients' },
              { label: 'News & Events', href: '/news' },
              { label: 'Contact Us', href: '/contact' },
              { label: 'Careers', href: '/jobs' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'white'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
              >
                <span style={{ color: '#5DADE2' }}>›</span> {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* WORKING HOURS — hidden on mobile */}
        <div className="footer-hours">
          <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>Working Hours</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {[
              { day: 'Monday – Friday', hours: '8:00 AM – 8:00 PM' },
              { day: 'Saturday', hours: '8:00 AM – 4:00 PM' },
              { day: 'Sunday', hours: 'Emergency Only' },
              { day: 'Emergency', hours: '24/7 Always Open' },
            ].map(item => (
              <div key={item.day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ color: 'rgba(255,255,255,0.65)' }}>{item.day}</span>
                <span style={{ color: 'white', fontWeight: '600' }}>{item.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
          © {year} Khoury General Hospital — All Rights Reserved
        </span>
        <Link href="/admin/login" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.2)'}
        >Admin</Link>
      </div>
    </footer>
  )
}