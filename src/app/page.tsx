import Link from 'next/link'
import HeroSlider from '@/components/HeroSlider'
import DoctorSearch from '@/components/DoctorSearch'
import NewsSlider from '@/components/NewsSlider'
import { QuickAccess, WhyChooseUs, DepartmentsGrid, FeaturedDoctors, Testimonials } from '@/components/HomeClient'

async function getData() {
  const base = ''
  const [deptRes, newsRes, testiRes, heroRes, docRes] = await Promise.all([
    fetch(`${base}/api/departments`, { cache: 'no-store' }),
    fetch(`${base}/api/news`, { cache: 'no-store' }),
    fetch(`${base}/api/testimonials`, { cache: 'no-store' }),
    fetch(`${base}/api/hero-slides`, { cache: 'no-store' }),
    fetch(`${base}/api/doctors`, { cache: 'no-store' }),
  ])
  return {
    departments: await deptRes.json().then((d: any) => Array.isArray(d) ? d : []),
    news: await newsRes.json().then((d: any) => Array.isArray(d) ? d : []),
    testimonials: await testiRes.json().then((d: any) => Array.isArray(d) ? d : []),
    heroSlides: await heroRes.json().then((d: any) => Array.isArray(d) ? d : []),
    doctors: await docRes.json().then((d: any) => Array.isArray(d) ? d : []),
  }
}

export default async function Home() {
  const { departments, news, testimonials, heroSlides, doctors } = await getData()

  return (
    <main>
      <style>{`
        @media (max-width: 768px) {
          .home-pad { padding: 40px 20px !important; }
          .home-2 { grid-template-columns: 1fr !important; gap: 24px !important; }
          .home-4-stats { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* HERO */}
      <HeroSlider slides={heroSlides} />

      {/* QUICK ACCESS */}
      <QuickAccess />

      {/* ABOUT */}
      <section style={{ padding: '80px 48px', background: 'var(--white)' }} className="home-pad">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="home-2">
          <div>
            <div className="label">Our Story · Est. 1993</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', color: 'var(--blue-900)', lineHeight: '1.15', marginBottom: '20px' }}>
              Three Decades of<br />
              <span style={{ color: 'var(--blue-500)', fontStyle: 'italic' }}>Healthcare Excellence</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--gray-500)', lineHeight: '1.9', marginBottom: '16px' }}>
              Founded in 1993 by H.E. Nicolas Khoury alongside dedicated physicians, Khoury General Hospital has been the cornerstone of medical excellence in Zahle and the Bekaa region.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--gray-500)', lineHeight: '1.9', marginBottom: '36px' }}>
              Proud holders of a <strong style={{ color: 'var(--blue-800)', fontWeight: '700' }}>Category A classification</strong> from the Lebanese Ministry of Health — the highest standard of clinical excellence.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/about" className="btn-primary">Our Story</Link>
              <Link href="/departments" className="btn-secondary">Our Departments</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="home-4-stats">
            {[
              { num: '1993', label: 'Year Founded', bg: 'var(--blue-900)', color: 'white', sub: 'rgba(255,255,255,0.6)' },
              { num: '19K+', label: 'Patients / Year', bg: 'var(--blue-50)', color: 'var(--blue-900)', sub: 'var(--gray-500)' },
              { num: '230+', label: 'Medical Staff', bg: 'var(--blue-50)', color: 'var(--blue-900)', sub: 'var(--gray-500)' },
              { num: 'Cat. A', label: 'MOH Certified', bg: 'var(--blue-600)', color: 'white', sub: 'rgba(255,255,255,0.7)' },
            ].map((s, i) => (
              <div key={i} style={{ background: s.bg, borderRadius: 'var(--r-xl)', padding: '28px', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: '700', color: s.color, marginBottom: '6px', lineHeight: '1' }}>{s.num}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: s.sub, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: 'var(--blue-800)', padding: '40px 48px' }} className="home-pad">
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="home-4-stats">
          {[
            { num: '113+', label: 'Hospital Beds' },
            { num: '15+', label: 'Departments' },
            { num: '24/7', label: 'Emergency Care' },
            { num: '100s', label: 'Surgeries / Month' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '16px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,4vw,42px)', fontWeight: '700', color: 'white', marginBottom: '6px' }}>{s.num}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <WhyChooseUs />

      {/* DEPARTMENTS */}
      <DepartmentsGrid departments={departments} />

      {/* FEATURED DOCTORS */}
      <FeaturedDoctors doctors={doctors} />

      {/* FIND A DOCTOR */}
      <section style={{ padding: '80px 48px', background: 'var(--blue-700)', position: 'relative', overflow: 'hidden' }} className="home-pad">
        <div style={{ position: 'absolute', top: 0, right: 0, width: '480px', height: '480px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', transform: 'translate(30%,-30%)' }} />
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center', position: 'relative', zIndex: 2 }} className="home-2">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '16px', height: '2px', background: 'var(--blue-400)', borderRadius: '2px' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-400)', textTransform: 'uppercase' }}>Search Doctors</span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,4vw,44px)', fontWeight: '700', color: 'white', lineHeight: '1.15', marginBottom: '16px' }}>
              Find the Right<br />
              <em style={{ color: 'var(--blue-400)', fontStyle: 'italic' }}>Doctor for You</em>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', marginBottom: '32px' }}>
              Browse {doctors.length}+ specialized physicians by department or specialty and book online.
            </p>
            <Link href="/doctors" className="btn-white" style={{ fontSize: '14px' }}>Browse All Doctors →</Link>
          </div>
          <div>
            <DoctorSearch departments={departments} />
          </div>
        </div>
      </section>

      {/* NEWS */}
      <NewsSlider news={news.filter((n: any) => n.is_published !== false)} />

      {/* TESTIMONIALS */}
      <Testimonials testimonials={testimonials} />

      {/* CONTACT + BOOK CTA */}
      <section style={{ padding: '80px 48px', background: 'var(--white)' }} className="home-pad">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="home-2">

          {/* CONTACT */}
          <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--r-xl)', padding: '44px', border: '1px solid var(--border)' }}>
            <div className="label">Get In Touch</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '14px', lineHeight: '1.2' }}>
              We're Here to Help
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--gray-500)', lineHeight: '1.8', marginBottom: '24px' }}>
              Have a question or need guidance? Our team is ready to help you find the right care.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                { icon: '📍', text: 'Brazil Street, Zahle, Bekaa — Lebanon' },
                { icon: '📞', text: '+961 8 807 000', href: 'tel:+96188807000' },
                { icon: '✉️', text: 'info@khouryhospital.com', href: 'mailto:info@khouryhospital.com' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'var(--blue-50)', border: '1px solid var(--blue-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>{c.icon}</div>
                  {(c as any).href
                    ? <a href={(c as any).href} style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--blue-600)', fontWeight: '500' }}>{c.text}</a>
                    : <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--gray-700)' }}>{c.text}</span>
                  }
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">Contact Us</Link>
              <a href="https://wa.me/96188807000" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#25D366', color: 'white', borderRadius: 'var(--r-sm)', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: '600' }}>
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* BOOK CTA */}
          <div style={{ background: 'linear-gradient(145deg, var(--blue-800), var(--blue-900))', borderRadius: 'var(--r-xl)', padding: '44px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '16px', height: '2px', background: 'var(--blue-400)', borderRadius: '2px' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-400)', textTransform: 'uppercase' }}>Appointments</span>
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: '700', color: 'white', marginBottom: '14px', lineHeight: '1.2' }}>
                Book Your Visit<br />
                <em style={{ color: 'var(--blue-400)', fontStyle: 'italic' }}>Online, Anytime</em>
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '24px' }}>
                Schedule with any of our 15+ specialized departments. We confirm within 24 hours.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '24px' }}>
                {[
                  '✓  Online booking available 24/7',
                  '✓  Confirmation within 24 hours',
                  '✓  All insurance companies accepted',
                ].map((f, i) => (
                  <div key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{f}</div>
                ))}
              </div>
              <Link href="/appointments" className="btn-white" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '14px', display: 'flex' }}>
                Book Appointment Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ACCREDITATIONS */}
      <section style={{ padding: '40px 48px', background: 'var(--gray-50)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Lebanese Ministry of Health', sub: 'Category A Certified' },
            { label: 'Est. 1993', sub: '30+ Years of Excellence' },
            { label: 'Emergency Dept.', sub: 'Available 24/7' },
            { label: 'Clinical Laboratory', sub: 'International Standards' },
          ].map((a, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '14px 28px', borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: '600', color: 'var(--blue-800)', fontSize: '15px', marginBottom: '3px' }}>{a.label}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--gray-400)', fontWeight: '500' }}>{a.sub}</div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
