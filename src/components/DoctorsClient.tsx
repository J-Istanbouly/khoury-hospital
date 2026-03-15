'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function DoctorsClient({ doctors, departments }: { doctors: any[], departments: any[] }) {
  const [search, setSearch] = useState('')
  const [filterDept, setFilterDept] = useState('')
  const [filterSpec, setFilterSpec] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const specialties = [...new Set(doctors.flatMap(d =>
    d.specialties ? d.specialties.split(',').map((s: string) => s.trim()) : []
  ))].filter(Boolean).sort()

  const filtered = doctors.filter(doc => {
    const matchSearch = !search ||
      doc.name_en?.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialties?.toLowerCase().includes(search.toLowerCase()) ||
      doc.title?.toLowerCase().includes(search.toLowerCase())
    const matchDept = !filterDept || doc.department?.toLowerCase() === filterDept.toLowerCase()
    const matchSpec = !filterSpec || doc.specialties?.toLowerCase().includes(filterSpec.toLowerCase())
    return matchSearch && matchDept && matchSpec
  })

  return (
    <section style={{ padding: '48px 48px 64px', background: 'var(--gray-50)', minHeight: '60vh' }}>
      <style>{`
        .dc-filters { display:grid; grid-template-columns:2fr 1fr 1fr; gap:14px; }
        .dc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .dc-list-item { display:grid; grid-template-columns:72px 1fr auto; gap:20px; align-items:center; }
        @media (max-width: 1024px) {
          .dc-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
          .dc-pad { padding:32px 20px 48px !important; }
          .dc-filters { grid-template-columns:1fr !important; }
          .dc-grid { grid-template-columns:repeat(2,1fr) !important; }
          .dc-list-actions { display:none !important; }
          .dc-list-item { grid-template-columns:60px 1fr !important; }
        }
        @media (max-width: 480px) {
          .dc-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1160px', margin: '0 auto' }} className="dc-pad">

        {/* FILTERS */}
        <div style={{ background: 'white', padding: '22px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', marginBottom: '28px', boxShadow: 'var(--shadow-xs)' }}>
          <div className="dc-filters" style={{ marginBottom: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--gray-500)', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif' }}>
                Search
              </label>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Name or specialty..." style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-sm)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--gray-500)', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif' }}>
                Department
              </label>
              <select value={filterDept} onChange={e => setFilterDept(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-sm)', fontSize: '14px', outline: 'none', background: 'white', fontFamily: 'Inter, sans-serif' }}>
                <option value="">All Departments</option>
                {departments.map((d: any) => <option key={d.id} value={d.name_en}>{d.name_en}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--gray-500)', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif' }}>
                Specialty
              </label>
              <select value={filterSpec} onChange={e => setFilterSpec(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-sm)', fontSize: '14px', outline: 'none', background: 'white', fontFamily: 'Inter, sans-serif' }}>
                <option value="">All Specialties</option>
                {specialties.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--gray-500)', fontFamily: 'Inter, sans-serif' }}>
                <strong style={{ color: 'var(--blue-900)' }}>{filtered.length}</strong> doctor{filtered.length !== 1 ? 's' : ''} found
              </span>
              {(search || filterDept || filterSpec) && (
                <button onClick={() => { setSearch(''); setFilterDept(''); setFilterSpec('') }}
                  style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  Clear ✕
                </button>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['grid', 'list'] as const).map(mode => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  style={{ padding: '7px 14px', borderRadius: 'var(--r-sm)', border: '1.5px solid', borderColor: viewMode === mode ? 'var(--blue-600)' : 'var(--border)', background: viewMode === mode ? 'var(--blue-50)' : 'white', color: viewMode === mode ? 'var(--blue-600)' : 'var(--gray-500)', cursor: 'pointer', fontWeight: '700', fontSize: '13px', fontFamily: 'Inter, sans-serif', textTransform: 'capitalize' }}>
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* NO RESULTS */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--gray-400)', background: 'white', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ color: 'var(--blue-900)', marginBottom: '8px', fontFamily: 'Playfair Display, serif' }}>No doctors found</h3>
            <p style={{ fontFamily: 'Inter, sans-serif' }}>Try adjusting your search or filters</p>
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && filtered.length > 0 && (
          <div className="dc-grid">
            {filtered.map((doc: any) => (
              <div key={doc.id} style={{ background: 'white', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)', transition: 'all 0.25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-xs)' }}
              >
                <div style={{ padding: '24px 20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ width: '88px', height: '88px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--blue-100)', background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', flexShrink: 0 }}>
                    {doc.image_url
                      ? <img src={doc.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={doc.name_en} />
                      : <div style={{ fontSize: '36px', opacity: 0.3 }}>👨‍⚕️</div>
                    }
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '4px', lineHeight: '1.3' }}>{doc.name_en}</h3>
                  {doc.title && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--blue-600)', fontWeight: '500', marginBottom: '8px' }}>{doc.title}</p>}
                  {doc.department && (
                    <span style={{ background: 'var(--blue-50)', color: 'var(--blue-700)', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', border: '1px solid var(--blue-100)', fontFamily: 'Inter, sans-serif' }}>
                      {doc.department}
                    </span>
                  )}
                  {doc.specialties && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', marginTop: '8px' }}>
                      {doc.specialties.split(',').slice(0, 2).map((s: string) => (
                        <span key={s} style={{ background: 'var(--gray-100)', color: 'var(--gray-500)', fontSize: '11px', padding: '2px 8px', borderRadius: '20px', fontFamily: 'Inter, sans-serif' }}>
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '10px', width: '100%' }}>
                    {doc.languages && <span style={{ fontSize: '12px', color: 'var(--gray-400)', fontFamily: 'Inter, sans-serif' }}>🌐 {doc.languages}</span>}
                    {doc.availability && <span style={{ fontSize: '12px', color: 'var(--gray-400)', fontFamily: 'Inter, sans-serif' }}>📅 {doc.availability}</span>}
                  </div>
                </div>
                <div style={{ padding: '0 16px 18px', display: 'flex', gap: '8px' }}>
                  <Link href={`/appointments?doctor=${doc.id}`} style={{ flex: 1, display: 'block', textAlign: 'center', padding: '10px', background: 'var(--blue-600)', color: 'white', borderRadius: 'var(--r-sm)', fontWeight: '600', textDecoration: 'none', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
                    Book Appointment
                  </Link>
                  {doc.email && (
                    <a href={`mailto:${doc.email}`} style={{ padding: '10px 12px', background: 'var(--blue-50)', color: 'var(--blue-600)', borderRadius: 'var(--r-sm)', textDecoration: 'none', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
                      ✉
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIST VIEW */}
        {viewMode === 'list' && filtered.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filtered.map((doc: any) => (
              <div key={doc.id} style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '20px 24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }} className="dc-list-item">
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--blue-50)', border: '2px solid var(--blue-100)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {doc.image_url
                    ? <img src={doc.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={doc.name_en} />
                    : <div style={{ fontSize: '28px', opacity: 0.3 }}>👨‍⚕️</div>
                  }
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: '700', color: 'var(--blue-900)', margin: 0 }}>{doc.name_en}</h3>
                    {doc.department && (
                      <span style={{ background: 'var(--blue-50)', color: 'var(--blue-700)', fontSize: '11px', fontWeight: '600', padding: '2px 10px', borderRadius: '20px', fontFamily: 'Inter, sans-serif' }}>
                        {doc.department}
                      </span>
                    )}
                  </div>
                  {doc.title && <p style={{ fontSize: '13px', color: 'var(--blue-600)', fontWeight: '500', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>{doc.title}</p>}
                  {doc.specialties && <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>{doc.specialties}</p>}
                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    {doc.languages && <span style={{ fontSize: '12px', color: 'var(--gray-400)', fontFamily: 'Inter, sans-serif' }}>🌐 {doc.languages}</span>}
                    {doc.availability && <span style={{ fontSize: '12px', color: 'var(--gray-400)', fontFamily: 'Inter, sans-serif' }}>📅 {doc.availability}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }} className="dc-list-actions">
                  <Link href={`/appointments?doctor=${doc.id}`} style={{ display: 'block', textAlign: 'center', padding: '10px 18px', background: 'var(--blue-600)', color: 'white', borderRadius: 'var(--r-sm)', fontWeight: '600', textDecoration: 'none', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
                    Book Appointment
                  </Link>
                  {doc.email && (
                    <a href={`mailto:${doc.email}`} style={{ display: 'block', textAlign: 'center', padding: '8px 18px', background: 'var(--blue-50)', color: 'var(--blue-600)', borderRadius: 'var(--r-sm)', fontWeight: '600', textDecoration: 'none', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
                      Send Email
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}