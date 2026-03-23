'use client'
import Link from 'next/link'

export function QuickAccess() {
  const items = [
    { icon: '🔍', title: 'Find a Doctor', desc: 'Search by name or specialty', href: '/doctors', accent: 'var(--blue-50)' },
    { icon: '🏥', title: 'Departments', desc: 'Explore 15+ specialties', href: '/departments', accent: '#F0FBF5' },
    { icon: '📅', title: 'Book Appointment', desc: 'Schedule online, anytime', href: '/appointments', accent: 'var(--blue-50)' },
    { icon: '💬', title: 'WhatsApp Us', desc: 'Insurance & quick queries', href: 'https://wa.me/96188807000', accent: '#F0FBF5' },
  ]
  return (
    <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
      <style>{`
        .qa-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        .qa-item { display:flex; align-items:center; gap:14px; padding:22px 26px; border-left:1px solid var(--border); transition:background 0.18s; text-decoration:none; }
        .qa-item:hover { background: var(--blue-50); }
        @media (max-width: 768px) {
          .qa-grid { grid-template-columns: repeat(2,1fr) !important; }
          .qa-item { padding: 14px 16px; gap: 10px; }
          .qa-item-icon { width: 38px !important; height: 38px !important; font-size: 16px !important; }
          .qa-item-title { font-size: 13px !important; }
          .qa-item-desc { display: none; }
        }
      `}</style>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="qa-grid">
        {items.map((item, i) => (
          <a key={i} href={item.href} className="qa-item">
            <div className="qa-item-icon" style={{ width: '46px', height: '46px', borderRadius: '12px', background: item.accent, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
              {item.icon}
            </div>
            <div>
              <div className="qa-item-title" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '700', color: 'var(--blue-800)', fontSize: '14px', marginBottom: '2px' }}>{item.title}</div>
              <div className="qa-item-desc" style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--gray-400)' }}>{item.desc}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export function WhyChooseUs() {
  const items = [
    { icon: '🏆', title: 'Category A Certified', desc: 'Highest classification from the Lebanese Ministry of Health for quality and patient safety.', color: 'var(--blue-50)' },
    { icon: '👨‍⚕️', title: 'Expert Medical Team', desc: '230+ qualified physicians, specialists and nurses dedicated to world-class compassionate care.', color: '#F0FBF5' },
    { icon: '🔬', title: 'Advanced Technology', desc: 'MRI, CT Scan, cardiac surgery suites and modern ICU units — the best equipment for the Bekaa.', color: 'var(--blue-50)' },
    { icon: '🚑', title: '24/7 Emergency', desc: 'Round-the-clock emergency department, fully staffed for any critical situation every day.', color: '#FFF5F5' },
    { icon: '💙', title: 'Patient-First', desc: 'Every decision, every procedure — centered on your comfort, dignity, and recovery.', color: 'var(--blue-50)' },
    { icon: '🌍', title: 'Regional Leader', desc: 'The premier hospital in the Bekaa, serving patients from Lebanon and neighboring countries.', color: '#F0FBF5' },
  ]
  return (
    <section style={{ padding: '80px 48px', background: 'var(--gray-50)' }}>
      <style>{`
        .why-wrap { max-width: var(--max-w); margin: 0 auto; }
        .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        @media (max-width: 1024px) { .why-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width: 768px) {
          .why-section { padding: 40px 16px !important; }
          .why-grid { grid-template-columns:repeat(2,1fr) !important; gap: 12px !important; }
          .why-card { padding: 18px !important; }
          .why-icon { width: 42px !important; height: 42px !important; font-size: 20px !important; margin-bottom: 10px !important; }
          .why-title { font-size: 14px !important; margin-bottom: 6px !important; }
          .why-desc { font-size: 12px !important; }
        }
      `}</style>
      <div className="why-wrap why-section" style={{ padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="label" style={{ justifyContent: 'center' }}>Why Choose Us</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,4vw,42px)', fontWeight: '700', color: 'var(--blue-900)' }}>The Khoury Difference</h2>
        </div>
        <div className="why-grid">
          {items.map((item, i) => (
            <div key={i} className="why-card" style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '28px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)', transition: 'all 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-xs)' }}
            >
              <div className="why-icon" style={{ width: '52px', height: '52px', borderRadius: '13px', background: item.color, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>
                {item.icon}
              </div>
              <h3 className="why-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', color: 'var(--blue-800)', marginBottom: '8px' }}>{item.title}</h3>
              <p className="why-desc" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.75' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DepartmentsGrid({ departments }: { departments: any[] }) {
  if (!departments.length) return null
  return (
    <section style={{ padding: '80px 48px', background: 'white' }}>
      <style>{`
        .dept-wrap { max-width: var(--max-w); margin: 0 auto; }
        .dept-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        @media (max-width: 1024px) { .dept-grid { grid-template-columns:repeat(3,1fr) !important; } }
        @media (max-width: 768px) {
          .dept-section { padding: 40px 16px !important; }
          .dept-grid { grid-template-columns:repeat(2,1fr) !important; gap: 10px !important; }
          .dept-card { padding: 16px 14px !important; }
          .dept-icon { font-size: 22px !important; margin-bottom: 8px !important; }
          .dept-name { font-size: 13px !important; }
          .dept-loc { display: none !important; }
        }
      `}</style>
      <div className="dept-wrap dept-section" style={{ padding: '80px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '44px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="label">Medical Services</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,4vw,42px)', fontWeight: '700', color: 'var(--blue-900)', margin: 0 }}>Our Departments</h2>
          </div>
          <Link href="/departments" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: '13px', color: 'var(--blue-600)', borderBottom: '1.5px solid var(--blue-600)', paddingBottom: '2px' }}>View All →</Link>
        </div>
        <div className="dept-grid">
          {departments.slice(0, 8).map((dept: any) => (
            <Link key={dept.id} href={`/departments/${dept.id}`} style={{ textDecoration: 'none' }}>
              <div className="dept-card" style={{ background: 'var(--gray-50)', borderRadius: 'var(--r-lg)', padding: '22px 18px', border: '1px solid var(--border)', height: '100%', transition: 'all 0.25s', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--blue-50)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue-100)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gray-50)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
              >
                <div className="dept-icon" style={{ fontSize: '28px', marginBottom: '12px' }}>{dept.icon || '⚕️'}</div>
                <h3 className="dept-name" style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '600', color: 'var(--blue-800)', marginBottom: '6px', lineHeight: '1.3' }}>{dept.name_en}</h3>
                {dept.location && <div className="dept-loc" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--gray-400)', marginBottom: '10px' }}>📍 {dept.location}</div>}
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--blue-500)', fontWeight: '600' }}>Learn More →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturedDoctors({ doctors }: { doctors: any[] }) {
  if (!doctors.length) return null
  return (
    <section style={{ padding: '80px 48px', background: 'var(--gray-50)' }}>
      <style>{`
        .doc-wrap { max-width: var(--max-w); margin: 0 auto; }
        .feat-doc-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        @media (max-width: 1024px) { .feat-doc-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width: 768px) {
          .doc-section { padding: 40px 16px !important; }
          .feat-doc-grid { grid-template-columns:repeat(2,1fr) !important; gap: 12px !important; }
          .doc-avatar { width: 68px !important; height: 68px !important; }
          .doc-name { font-size: 13px !important; }
          .doc-title { font-size: 11px !important; }
          .doc-btn { font-size: 11px !important; padding: 8px 10px !important; }
        }
      `}</style>
      <div className="doc-wrap doc-section" style={{ padding: '80px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '44px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="label">Our Specialists</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,4vw,42px)', fontWeight: '700', color: 'var(--blue-900)', margin: 0 }}>Meet Our Doctors</h2>
          </div>
          <Link href="/doctors" className="btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>Find a Doctor →</Link>
        </div>
        <div className="feat-doc-grid">
          {doctors.slice(0, 4).map((doc: any) => (
            <div key={doc.id} style={{ background: 'white', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)', textAlign: 'center', transition: 'all 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-xs)' }}
            >
              <div style={{ padding: '24px 20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="doc-avatar" style={{ width: '88px', height: '88px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--blue-100)', background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', flexShrink: 0 }}>
                  {doc.image_url
                    ? <img src={doc.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={doc.name_en} />
                    : <div style={{ fontSize: '36px', opacity: 0.3 }}>👨‍⚕️</div>
                  }
                </div>
                <h4 className="doc-name" style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '600', color: 'var(--blue-900)', marginBottom: '4px', lineHeight: '1.3' }}>{doc.name_en}</h4>
                {doc.title && <p className="doc-title" style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--blue-500)', fontWeight: '500', marginBottom: '8px' }}>{doc.title}</p>}
                {doc.department && (
                  <span style={{ background: 'var(--blue-50)', color: 'var(--blue-700)', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', border: '1px solid var(--blue-100)', fontFamily: 'Inter, sans-serif' }}>
                    {doc.department}
                  </span>
                )}
              </div>
              <div style={{ padding: '0 16px 18px' }}>
                <Link href={`/appointments?doctor=${doc.id}`} className="btn-primary doc-btn" style={{ width: '100%', justifyContent: 'center', fontSize: '12px', padding: '9px 12px', display: 'flex' }}>
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Testimonials({ testimonials }: { testimonials: any[] }) {
  if (!testimonials.length) return null
  return (
    <section style={{ padding: '80px 48px', background: 'var(--blue-900)', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .testi-wrap { max-width: var(--max-w); margin: 0 auto; position: relative; z-index: 2; }
        .testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
        @media (max-width: 1024px) { .testi-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width: 768px) {
          .testi-section { padding: 40px 16px !important; }
          .testi-grid { grid-template-columns:1fr !important; gap: 14px !important; }
          .testi-card { padding: 20px !important; }
        }
      `}</style>
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(46,134,193,0.08)' }} />
      <div className="testi-wrap testi-section" style={{ padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div className="label" style={{ justifyContent: 'center', color: 'var(--blue-400)' }}>Patient Stories</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,4vw,42px)', fontWeight: '700', color: 'white' }}>What Our Patients Say</h2>
        </div>
        <div className="testi-grid">
          {testimonials.slice(0, 3).map((t: any) => (
            <div key={t.id} className="testi-card" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', borderRadius: 'var(--r-lg)', padding: '28px', border: '1px solid rgba(255,255,255,0.1)', transition: 'background 0.25s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.11)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'}
            >
              <div style={{ fontSize: '32px', color: 'var(--blue-400)', lineHeight: '1', marginBottom: '14px', opacity: 0.7, fontFamily: 'Georgia, serif' }}>"</div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginBottom: '22px', fontStyle: 'italic' }}>{t.content}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(46,134,193,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontWeight: '700', color: 'var(--blue-400)', fontSize: '16px', flexShrink: 0 }}>
                  {t.patient_name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: '700', color: 'white', fontSize: '13px' }}>{t.patient_name}</div>
                  {t.department && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--blue-400)' }}>{t.department}</div>}
                </div>
                <div style={{ marginLeft: 'auto', color: '#FCD34D', fontSize: '13px' }}>{'★'.repeat(t.rating)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}