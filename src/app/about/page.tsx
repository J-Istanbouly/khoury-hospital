import Link from 'next/link'
import AboutNav from '@/components/AboutNav'

async function getTestimonials() {
  const res = await fetch('/api/testimonials', { cache: 'no-store' })
  const data = await res.json()
  return Array.isArray(data) ? data : []
}

export default async function AboutPage() {
  const testimonials = await getTestimonials()

  return (
    <main style={{ fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @media (max-width: 768px) {
          .ab-2 { grid-template-columns: 1fr !important; gap: 32px !important; }
          .ab-3 { grid-template-columns: 1fr !important; }
          .ab-4 { grid-template-columns: repeat(2,1fr) !important; }
          .ab-pad { padding: 48px 20px !important; }
          .ab-title { font-size: 28px !important; }
          .ab-hide { display: none !important; }
        }
        @media (max-width: 480px) {
          .ab-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ background: 'var(--blue-900)', padding: '80px 48px', position: 'relative', overflow: 'hidden' }} className="ab-pad">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(45,125,210,0.2) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1160px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            {' → '} About Us
          </p>
          <h1 className="ab-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', color: 'white', marginBottom: '16px' }}>
            About Khoury General Hospital
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', lineHeight: '1.8', fontFamily: 'Inter, sans-serif' }}>
            A legacy of excellence, compassion, and innovation in healthcare since 1993
          </p>
        </div>
      </section>

      {/* QUICK NAV */}
      <div className="ab-hide">
        <AboutNav />
      </div>

      {/* OUR STORY */}
      <section id="story" style={{ padding: '80px 48px', background: 'white' }} className="ab-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="ab-2">
          <div>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Our Story</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '24px', lineHeight: '1.25' }}>
              Three Decades of Healthcare Excellence in the Bekaa
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--gray-500)', lineHeight: '1.85', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
              Khoury General Hospital was established in 1993 through a visionary collaboration between His Excellency Mr. Nicolas Khoury and a group of dedicated physicians from Zahle, Lebanon.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--gray-500)', lineHeight: '1.85', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
              Located on Brazil Street in the heart of Zahle, our hospital has stood as a beacon of medical excellence through decades of challenges. Today, we serve thousands of patients annually across 15+ specialized medical departments.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--gray-500)', lineHeight: '1.85', fontFamily: 'Inter, sans-serif' }}>
              We are proud to hold a <strong style={{ color: 'var(--blue-800)' }}>Category A classification</strong> from the Lebanese Ministry of Health — the highest recognition awarded for quality, safety, and excellence.
            </p>
          </div>

          {/* TIMELINE */}
          <div style={{ position: 'relative', paddingLeft: '24px' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--gray-200)' }} />
            {[
              { year: '1993', title: 'Hospital Founded', desc: 'H.E. Nicolas Khoury establishes Khoury General Hospital in Zahle, Bekaa.' },
              { year: '1995', title: 'Cardiac Center', desc: 'Opening of the Cardiac Catheterism and Open-Heart unit.' },
              { year: '2001', title: 'Ophthalmology Unit', desc: 'Introduction of the Ophthalmology Unit, broadening specialized services.' },
              { year: '2002', title: 'First Heart Surgery', desc: 'First successful open-heart surgery milestone achieved.' },
              { year: '2015', title: 'Category A', desc: 'Awarded Category A classification by the Lebanese Ministry of Health.' },
              { year: 'Today', title: '30+ Years', desc: '230+ employees, 113+ beds, 15+ departments serving 19,281+ patients yearly.' },
            ].map((item, i) => (
              <div key={item.year} style={{ display: 'flex', gap: '20px', marginBottom: '28px', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', position: 'relative' }}>
                <div style={{ maxWidth: '220px', background: i % 2 === 0 ? 'var(--blue-50)' : 'var(--gray-100)', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--blue-600)', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>{item.year}</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '4px', fontFamily: 'Playfair Display, serif' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--gray-500)', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '14px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--blue-600)', border: '2px solid white', transform: 'translateX(-50%)', boxShadow: '0 0 0 3px var(--blue-100)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION VISION VALUES */}
      <section id="mission" style={{ padding: '80px 48px', background: 'var(--gray-50)' }} className="ab-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Our Purpose</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', color: 'var(--blue-900)' }}>Mission, Vision & Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="ab-3">
            {[
              { title: 'Our Mission', icon: '🎯', color: 'var(--blue-50)', accent: 'var(--blue-600)', text: 'To provide exceptional and compassionate healthcare, delivering high-quality, cost-effective services to the communities we serve. Through modern technology, beneficial relationships, and strict professional guidelines, we are dedicated to the care and improvement of human life.' },
              { title: 'Our Vision', icon: '🔭', color: '#f0fdf4', accent: '#15803d', text: 'To be the premier healthcare provider in the Bekaa region and beyond. We strive to become a leading hospital attracting patients from Lebanon and neighboring countries, offering the highest standard of care at reasonable prices.' },
              { title: 'Our Values', icon: '💎', color: '#fdf4ff', accent: '#9333ea', text: 'Excellence in every procedure. Compassion for every patient. Integrity in all decisions. Innovation in medicine. Teamwork across departments. Commitment to our community. These values are the foundation of everything we do.' },
            ].map((item) => (
              <div key={item.title} style={{ background: 'white', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ background: item.color, padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', color: item.accent, margin: 0 }}>{item.title}</h3>
                </div>
                <div style={{ padding: '22px' }}>
                  <p style={{ fontSize: '14px', color: 'var(--gray-500)', lineHeight: '1.8', margin: 0, fontFamily: 'Inter, sans-serif' }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section id="numbers" style={{ background: 'var(--blue-800)', padding: '80px 48px' }} className="ab-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Impact</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', color: 'white' }}>Khoury By The Numbers</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="ab-4">
            {[
              { num: '30+', label: 'Years of Service', desc: 'Serving the Bekaa since 1993' },
              { num: '19,281+', label: 'Patients Yearly', desc: 'Trusted by thousands annually' },
              { num: '230+', label: 'Medical Staff', desc: 'Dedicated professionals' },
              { num: '113+', label: 'Hospital Beds', desc: 'Fully equipped patient rooms' },
              { num: '15+', label: 'Departments', desc: 'Specialized medical divisions' },
              { num: '24/7', label: 'Emergency Care', desc: 'Always available for you' },
              { num: 'A', label: 'MOH Category', desc: 'Highest classification awarded' },
              { num: '100s', label: 'Surgeries/Month', desc: 'Including open-heart surgery' },
            ].map((item) => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 'var(--r-lg)', padding: '24px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '34px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>{item.num}</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.8)', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>{item.label}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" style={{ padding: '80px 48px', background: 'white' }} className="ab-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Our Team</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', color: 'var(--blue-900)' }}>Hospital Leadership</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="ab-3">
            {[
              { name: 'H.E. Nicolas Khoury', role: 'Founder & Chairman', desc: 'The visionary founder of Khoury General Hospital. His Excellency established the hospital in 1993 with a mission to bring world-class healthcare to the Bekaa region.', initials: 'NK' },
              { name: 'Georges Khoury', role: 'General Director', desc: 'Leading the hospital\'s day-to-day operations and long-term strategic direction, committed to continuous improvement and the highest standards of patient care.', initials: 'GK' },
              { name: 'Medical Committee', role: 'Clinical Leadership', desc: 'A multidisciplinary team of senior physicians and department heads overseeing clinical protocols, patient safety, and medical quality across all 15+ departments.', initials: 'MC' },
            ].map((person) => (
              <div key={person.name} style={{ background: 'var(--gray-50)', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ background: 'var(--blue-900)', padding: '32px', textAlign: 'center' }}>
                  <div style={{ width: '72px', height: '72px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontFamily: 'Playfair Display, serif', fontWeight: '700', color: 'white', fontSize: '22px' }}>
                    {person.initials}
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>{person.name}</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, fontFamily: 'Inter, sans-serif' }}>{person.role}</p>
                </div>
                <div style={{ padding: '22px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.75', margin: 0, fontFamily: 'Inter, sans-serif' }}>{person.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCREDITATIONS */}
      <section id="accreditations" style={{ padding: '80px 48px', background: 'var(--gray-50)' }} className="ab-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Recognition</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', color: 'var(--blue-900)' }}>Awards & Accreditations</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="ab-4">
            {[
              { icon: '🏆', title: 'Category A', sub: 'Lebanese Ministry of Health', desc: 'Highest classification for quality and excellence in healthcare services' },
              { icon: '❤️', title: 'Cardiac Center', sub: 'Open Heart Surgery', desc: 'Advanced cardiac surgery center serving the entire Bekaa region since 1995' },
              { icon: '🔬', title: 'Advanced Lab', sub: 'ISO Standards', desc: 'Fully accredited laboratory and blood bank operating 24/7' },
              { icon: '🚑', title: '24/7 Emergency', sub: 'Critical Care', desc: 'Round-the-clock emergency department handling all critical cases' },
            ].map((item) => (
              <div key={item.title} style={{ background: 'white', padding: '24px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ fontSize: '36px', marginBottom: '14px' }}>{item.icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: '700', color: 'var(--blue-900)', fontSize: '15px', marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--blue-600)', fontWeight: '600', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>{item.sub}</div>
                <div style={{ fontSize: '12px', color: 'var(--gray-400)', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" style={{ padding: '80px 48px', background: 'white' }} className="ab-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Our Difference</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', color: 'var(--blue-900)' }}>Why Choose Khoury General Hospital</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="ab-3">
            {[
              { icon: '🏆', title: 'Category A Certified', desc: 'Accredited by the Lebanese Ministry of Health with the highest category rating for quality, safety, and patient care excellence.' },
              { icon: '👨‍⚕️', title: 'Expert Medical Team', desc: 'Over 230 highly qualified physicians, specialists, nurses, and support staff dedicated to delivering exceptional patient care.' },
              { icon: '🔬', title: 'Advanced Technology', desc: 'State-of-the-art equipment: MRI, CT Scan, advanced cardiac surgery facilities, and modern ICU units.' },
              { icon: '🚑', title: '24/7 Emergency Care', desc: 'Our emergency department operates around the clock, equipped to handle all critical and complex cases immediately.' },
              { icon: '💰', title: 'Affordable Excellence', desc: 'We believe quality healthcare should be accessible. We work with all major insurance providers and offer cost-effective services.' },
              { icon: '🌍', title: 'Regional Leader', desc: 'The leading hospital in the Bekaa region, attracting patients from across Lebanon and neighboring countries.' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '16px', padding: '24px', borderRadius: 'var(--r-lg)', border: '1.5px solid var(--border)', background: 'white', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ fontSize: '28px', flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.75', margin: 0, fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section style={{ padding: '80px 48px', background: 'var(--gray-50)' }} className="ab-pad">
          <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Patient Stories</p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', color: 'var(--blue-900)' }}>What Our Patients Say</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="ab-3">
              {testimonials.slice(0, 3).map((t: any) => (
                <div key={t.id} style={{ background: 'white', padding: '28px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}>
                  <div style={{ fontSize: '16px', marginBottom: '14px', color: '#F59E0B' }}>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                  <p style={{ color: 'var(--gray-700)', fontSize: '14px', lineHeight: '1.8', marginBottom: '18px', fontStyle: 'italic', fontFamily: 'Inter, sans-serif' }}>"{t.content}"</p>
                  <div style={{ fontWeight: '700', color: 'var(--blue-900)', fontSize: '14px', fontFamily: 'Playfair Display, serif' }}>{t.patient_name}</div>
                  {t.department && <div style={{ color: 'var(--blue-600)', fontSize: '12px', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>{t.department}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: 'var(--blue-900)', padding: '64px 48px', textAlign: 'center' }} className="ab-pad">
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: '700', color: 'white', marginBottom: '14px' }}>
          Experience the Khoury Difference
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', marginBottom: '28px', fontFamily: 'Inter, sans-serif' }}>
          Book an appointment with one of our specialists today
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/appointments" className="btn-white" style={{ fontSize: '14px' }}>
            Book Appointment
          </Link>
          <Link href="/doctors" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'transparent', color: 'white', borderRadius: 'var(--r-sm)', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '600', border: '1.5px solid rgba(255,255,255,0.35)' }}>
            Find a Doctor
          </Link>
        </div>
      </section>

    </main>
  )
}
