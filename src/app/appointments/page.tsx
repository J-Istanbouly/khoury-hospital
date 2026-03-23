import Link from 'next/link'
import AppointmentForm from '@/components/AppointmentForm'
import PageHero from '@/components/PageHero'

async function getData() {
  const [doctorsRes, deptsRes] = await Promise.all([
    fetch((process.env.NEXT_PUBLIC_BASE_URL||'http://localhost:3000')+'/api/doctors', { cache: 'no-store' }),
    fetch((process.env.NEXT_PUBLIC_BASE_URL||'http://localhost:3000')+'/api/departments', { cache: 'no-store' }),
  ])
  const doctors = await doctorsRes.json()
  const departments = await deptsRes.json()
  return {
    doctors: Array.isArray(doctors) ? doctors : [],
    departments: Array.isArray(departments) ? departments : [],
  }
}

export default async function AppointmentsPage() {
  const { doctors, departments } = await getData()

  return (
    <main style={{ fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .appt-layout { display:grid; grid-template-columns:1fr 340px; gap:32px; align-items:start; }
        @media (max-width: 1024px) {
          .appt-layout { grid-template-columns:1fr !important; }
          .appt-sidebar { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        }
        @media (max-width: 768px) {
          .appt-pad { padding:48px 20px !important; }
        }
        @media (max-width: 580px) {
          .appt-sidebar { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <PageHero
  title="Book an Appointment"
  subtitle="Schedule your visit with one of our specialists. We'll confirm within 24 hours."
  breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Book Appointment' }]}
  badge="Online Booking"
/>

      {/* FORM + SIDEBAR */}
      <section style={{ padding: '60px 48px', background: 'var(--gray-50)' }} className="appt-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div className="appt-layout">

            <AppointmentForm doctors={doctors} departments={departments} />

            {/* SIDEBAR */}
            <div className="appt-sidebar">

              {/* CALL */}
              <div style={{ background: 'var(--blue-900)', borderRadius: 'var(--r-lg)', padding: '24px', color: 'white' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Prefer to Call?</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>Our team is ready to help you book by phone.</p>
                <a href="tel:+96188807000" style={{ display: 'block', background: 'white', color: 'var(--blue-900)', padding: '11px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textAlign: 'center', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>📞 08 807 000</a>
                <a href="tel:+96188811181" style={{ display: 'block', background: 'rgba(255,255,255,0.1)', color: 'white', padding: '11px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>📞 08 811 181</a>
              </div>

              {/* WHATSAPP */}
              <div style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '22px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '6px' }}>Insurance Pre-Approval</h3>
                <p style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.7', marginBottom: '14px', fontFamily: 'Inter, sans-serif' }}>Send your ID, insurance card, and prescription 24-48 hours before your visit.</p>
                <a href="https://wa.me/96188807000" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', background: '#25D366', color: 'white', padding: '11px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                  📱 WhatsApp Us
                </a>
              </div>

              {/* HOURS */}
              <div style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '22px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '14px' }}>Working Hours</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { day: 'Mon – Fri', hours: '8:00 AM – 8:00 PM' },
                    { day: 'Saturday', hours: '8:00 AM – 4:00 PM' },
                    { day: 'Sunday', hours: 'Emergency Only' },
                    { day: 'Emergency', hours: '24/7 Always Open' },
                  ].map(item => (
                    <div key={item.day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', paddingBottom: '8px', borderBottom: '1px solid var(--gray-100)', fontFamily: 'Inter, sans-serif' }}>
                      <span style={{ color: 'var(--gray-700)', fontWeight: '500' }}>{item.day}</span>
                      <span style={{ color: 'var(--blue-600)', fontWeight: '700' }}>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LOCATION */}
              <div style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '22px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '14px' }}>Location</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--gray-500)', fontFamily: 'Inter, sans-serif' }}>
                    <span>📍</span> Brazil Street, Zahle, Bekaa — Lebanon
                  </div>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--gray-500)', fontFamily: 'Inter, sans-serif' }}>
                    <span>✉️</span> info@khouryhospital.com
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
