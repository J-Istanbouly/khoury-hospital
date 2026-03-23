import Link from 'next/link'
import DoctorsClient from '@/components/DoctorsClient'
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
      <PageHero
  title="Find a Doctor"
  subtitle={`Search our directory of ${doctors.length}+ specialized physicians and book online`}
  breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Find a Doctor' }]}
  badge="Our Medical Team"
/>

      <DoctorsClient doctors={doctors} departments={departments} />
    </main>
  )
}
