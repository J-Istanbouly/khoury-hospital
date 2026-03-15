'use client'
import { useState } from 'react'

export default function DepartmentsFilter({ departments }: { departments: any[] }) {
  const [search, setSearch] = useState('')

  const filtered = departments.filter(d =>
    d.name_en?.toLowerCase().includes(search.toLowerCase()) ||
    d.description_en?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section style={{ padding: '48px 48px 64px', background: 'var(--gray-50)' }}>
      <style>{`
        @media (max-width: 768px) {
          .df-pad { padding: 32px 20px 48px !important; }
          .df-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .df-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1160px', margin: '0 auto' }} className="df-pad">

        {/* SEARCH */}
        <div style={{ marginBottom: '40px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search departments..."
            style={{ flex: 1, minWidth: '200px', padding: '13px 18px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-sm)', fontSize: '14px', outline: 'none', background: 'white', fontFamily: 'Inter, sans-serif' }}
          />
          {search && (
            <button onClick={() => setSearch('')}
              style={{ padding: '13px 18px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-sm)', background: 'white', cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
              Clear ✕
            </button>
          )}
          <span style={{ color: 'var(--gray-400)', fontSize: '14px', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>
            {filtered.length} department{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--gray-400)', background: 'white', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</p>
            <p style={{ fontFamily: 'Inter, sans-serif' }}>No departments found for "{search}"</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="df-grid">
            {filtered.map((dept: any) => (
              <div key={dept.id} style={{ background: 'white', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.25s' }}
                onClick={() => window.location.href = `/departments/${dept.id}`}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-xs)' }}
              >
                {/* IMAGE */}
                <div style={{ height: '160px', background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  {dept.image_url
                    ? <img src={dept.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={dept.name_en} />
                    : <div style={{ fontSize: '52px', opacity: 0.3 }}>{dept.icon || '🏥'}</div>
                  }
                  {dept.working_hours && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--blue-900)', color: 'white', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', fontFamily: 'Inter, sans-serif' }}>
                      {dept.working_hours}
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '8px' }}>{dept.name_en}</h3>
                  {dept.description_en && (
                    <p style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.65', marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
                      {dept.description_en}
                    </p>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '14px' }}>
                    {dept.location && (
                      <span style={{ fontSize: '12px', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}>
                        <span style={{ color: 'var(--blue-500)' }}>📍</span> {dept.location}
                      </span>
                    )}
                    {dept.extension && (
                      <span style={{ fontSize: '12px', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}>
                        <span style={{ color: 'var(--blue-500)' }}>📞</span> Ext: {dept.extension}
                      </span>
                    )}
                  </div>

                  {dept.services && (
                    <div style={{ marginBottom: '14px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {dept.services.split(',').slice(0, 3).map((s: string) => (
                        <span key={s} style={{ background: 'var(--blue-50)', color: 'var(--blue-700)', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', fontFamily: 'Inter, sans-serif' }}>
                          {s.trim()}
                        </span>
                      ))}
                      {dept.services.split(',').length > 3 && (
                        <span style={{ background: 'var(--gray-100)', color: 'var(--gray-400)', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', fontFamily: 'Inter, sans-serif' }}>
                          +{dept.services.split(',').length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div style={{ paddingTop: '14px', borderTop: '1px solid var(--gray-100)' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--blue-600)', fontFamily: 'Inter, sans-serif' }}>View Department →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}