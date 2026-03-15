import Link from 'next/link'
import DepartmentsFilter from '@/components/DepartmentsFilter'

async function getDepartments() {
  const res = await fetch((process.env.NEXT_PUBLIC_BASE_URL||'http://localhost:3000')+'/api/departments', { cache: 'no-store' })
  const data = await res.json()
  return Array.isArray(data) ? data : []
}

export default async function DepartmentsPage() {
  const departments = await getDepartments()

  return (
    <main style={{ fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @media (max-width: 768px) {
          .dept-pad { padding: 48px 20px !important; }
          .dept-title { font-size: 28px !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ background: 'var(--blue-900)', padding: '80px 48px', position: 'relative', overflow: 'hidden' }} className="dept-pad">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(45,125,210,0.2) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1160px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            {' → '} Departments
          </p>
          <h1 className="dept-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', color: 'white', marginBottom: '16px' }}>
            Medical Departments
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', lineHeight: '1.8', fontFamily: 'Inter, sans-serif' }}>
            Khoury General Hospital offers comprehensive medical care across {departments.length}+ specialized departments
          </p>
        </div>
      </section>

      <DepartmentsFilter departments={departments} />

      {/* CTA */}
      <section style={{ background: 'var(--blue-900)', padding: '64px 48px', textAlign: 'center' }} className="dept-pad">
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '700', color: 'white', marginBottom: '12px' }}>
          Not sure which department you need?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', marginBottom: '28px', fontFamily: 'Inter, sans-serif' }}>
          Our team will help you find the right specialist for your needs
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/doctors" className="btn-white" style={{ fontSize: '14px' }}>
            Find a Doctor
          </Link>
          <Link href="/appointments" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'transparent', color: 'white', borderRadius: 'var(--r-sm)', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '600', border: '1.5px solid rgba(255,255,255,0.35)' }}>
            Book Appointment
          </Link>
        </div>
      </section>
    </main>
  )
}
