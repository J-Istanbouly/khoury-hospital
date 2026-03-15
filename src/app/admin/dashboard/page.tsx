'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [stats, setStats] = useState({ doctors: 0, departments: 0, appointments: 0, news: 0, jobs: 0, pending: 0 })

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      router.push('/admin/login')
    } else {
      setChecking(false)
      fetchStats()
    }
  }, [])

  const fetchStats = async () => {
    const [doctors, departments, appointments, news, jobs] = await Promise.all([
      fetch('/api/doctors').then(r => r.json()),
      fetch('/api/departments').then(r => r.json()),
      fetch('/api/appointments').then(r => r.json()),
      fetch('/api/news').then(r => r.json()),
      fetch('/api/jobs').then(r => r.json()),
    ])
    setStats({
      doctors: Array.isArray(doctors) ? doctors.length : 0,
      departments: Array.isArray(departments) ? departments.length : 0,
      appointments: Array.isArray(appointments) ? appointments.length : 0,
      news: Array.isArray(news) ? news.length : 0,
      jobs: Array.isArray(jobs) ? jobs.length : 0,
      pending: Array.isArray(appointments) ? appointments.filter((a: any) => a.status === 'pending').length : 0,
    })
  }

  const sections = [
    { title: 'Doctors', desc: 'Medical staff', icon: '👨‍⚕️', href: '/admin/doctors', count: stats.doctors, color: '#e8f1fb', accent: '#005B99' },
    { title: 'Departments', desc: 'All departments', icon: '🏥', href: '/admin/departments', count: stats.departments, color: '#f0fdf4', accent: '#15803d' },
    { title: 'Appointments', desc: 'Bookings', icon: '📅', href: '/admin/appointments', count: stats.appointments, color: '#fef9c3', accent: '#ca8a04', badge: stats.pending > 0 ? `${stats.pending}` : null },
    { title: 'News & Blog', desc: 'News & events', icon: '📰', href: '/admin/news', count: stats.news, color: '#fdf4ff', accent: '#9333ea' },
    { title: 'Jobs', desc: 'Job listings', icon: '💼', href: '/admin/jobs', count: stats.jobs, color: '#fff7ed', accent: '#c2410c' },
    { title: 'Testimonials', desc: 'Patient reviews', icon: '💬', href: '/admin/testimonials', count: 0, color: '#f0f9ff', accent: '#0369a1' },
    { title: 'Hero Slides', desc: 'Homepage slider', icon: '🖼️', href: '/admin/hero-slides', count: 0, color: '#fff7ed', accent: '#ea580c' },
    { title: 'Messages', desc: 'Contact messages', icon: '✉️', href: '/admin/contacts', count: 0, color: '#f5f3ff', accent: '#8b5cf6' },
  ]

  if (checking) return null

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .dw { padding: 32px 40px; }
        .dh { display:flex; justify-content:space-between; align-items:center; margin-bottom:28px; }
        .ds { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-bottom:24px; }
        .dg { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        .dc { background:white; padding:16px; border-radius:14px; box-shadow:0 1px 6px rgba(0,0,0,0.06); cursor:pointer; transition:all 0.2s; border:2px solid transparent; position:relative; }
        .dc:hover { transform:translateY(-2px); box-shadow:0 4px 16px rgba(0,0,0,0.1); }
        @media (max-width:1024px) { .ds { grid-template-columns:repeat(3,1fr) !important; } .dg { grid-template-columns:repeat(3,1fr) !important; } }
        @media (max-width:768px) {
          .dw { padding:16px !important; }
          .dh { flex-direction:row; align-items:center; margin-bottom:16px; gap:8px; }
          .ds { grid-template-columns:repeat(3,1fr) !important; gap:8px !important; margin-bottom:16px !important; }
          .dg { grid-template-columns:repeat(2,1fr) !important; gap:10px !important; }
          .dc { padding:12px !important; border-radius:12px !important; }
        }
        @media (max-width:375px) {
          .ds { grid-template-columns:repeat(3,1fr) !important; }
          .dg { grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>

      <div className="dw">

        {/* HEADER */}
        <div className="dh">
          <div>
            <h1 style={{ color: '#004070', fontSize: 'clamp(16px,3vw,22px)', margin: '0 0 2px', fontFamily: 'Playfair Display, serif' }}>Admin Dashboard</h1>
            <p style={{ color: '#aaa', fontSize: '12px', margin: 0 }}>Khoury General Hospital</p>
          </div>
          <button onClick={() => { localStorage.removeItem('isAdmin'); router.push('/admin/login') }}
            style={{ padding: '8px 14px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Sign Out
          </button>
        </div>

        {/* STATS */}
        <div className="ds">
          {[
            { label: 'Doctors', value: stats.doctors, color: '#005B99' },
            { label: 'Departments', value: stats.departments, color: '#15803d' },
            { label: 'Appointments', value: stats.appointments, color: '#ca8a04' },
            { label: 'News', value: stats.news, color: '#9333ea' },
            { label: 'Jobs', value: stats.jobs, color: '#c2410c' },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', padding: '12px 10px', borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(18px,3vw,26px)', fontWeight: '800', color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: '#aaa', marginTop: '3px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* PENDING ALERT */}
        {stats.pending > 0 && (
          <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ color: '#854d0e', fontWeight: '600', fontSize: '13px' }}>
              ⚠️ {stats.pending} pending appointment{stats.pending > 1 ? 's' : ''}
            </span>
            <button onClick={() => router.push('/admin/appointments')}
              style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}>
              Review
            </button>
          </div>
        )}

        {/* SECTIONS GRID */}
        <div className="dg">
          {sections.map((s: any) => (
            <div key={s.title} className="dc" onClick={() => router.push(s.href)}
              onMouseEnter={e => (e.currentTarget.style.borderColor = s.accent)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
            >
              {s.badge && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#dc2626', color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '20px' }}>
                  {s.badge}
                </div>
              )}
              <div style={{ width: '36px', height: '36px', background: s.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', marginBottom: '10px' }}>
                {s.icon}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '3px' }}>
                <h3 style={{ color: '#004070', fontSize: 'clamp(12px,2vw,14px)', margin: 0, fontFamily: 'Playfair Display, serif', lineHeight: 1.3 }}>{s.title}</h3>
                <span style={{ color: s.accent, fontSize: '13px', fontWeight: '800' }}>{s.count}</span>
              </div>
              <p style={{ color: '#bbb', fontSize: '11px', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}