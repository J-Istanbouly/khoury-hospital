import Link from 'next/link'
import DoctorsClient from '@/components/DoctorsClient'

async function getData() {
  const [doctorsRes, deptsRes] = await Promise.all([
    fetch('/api/doctors', { cache: 'no-store' }),
    fetch('/api/departments', { cache: 'no-store' }),
  ])
  const doctors = await doctorsRes.json()
  const departments = await deptsRes.json()
  return {
    doctors: Array.isArray(doctors) ? doctors : [],
    departments: Array.isArray(departments) ? departments : [],
  }
}

export default async function DoctorsPage() {
  const { doctors, departments } = await getData()

  return (
    <main style={{ fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @media (max-width: 768px) {
          .doc-pad { padding: 48px 20px !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ background: 'var(--blue-900)', padding: '80px 48px', position: 'relative', overflow: 'hidden' }} className="doc-pad">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(45,125,210,0.2) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1160px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            {' → '} Find a Doctor
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', color: 'white', marginBottom: '16px' }}>
            Find a Doctor
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', lineHeight: '1.8', fontFamily: 'Inter, sans-serif', marginBottom: '12px' }}>
            Search our directory of {doctors.length}+ specialized physicians and book an appointment online.
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>
            Main phone: <a href="tel:+96188807000" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontWeight: '700' }}>+961 8 807 000</a>
          </p>
        </div>
      </section>

      <DoctorsClient doctors={doctors} departments={departments} />
    </main>
  )
}
