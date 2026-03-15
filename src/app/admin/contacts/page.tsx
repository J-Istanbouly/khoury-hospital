'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminContacts() {
  const router = useRouter()
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) { router.push('/admin/login'); return }
    fetch((process.env.NEXT_PUBLIC_BASE_URL||'http://localhost:3000')+'/api/contact').then(r => r.json()).then(data => {
      setContacts(Array.isArray(data) ? data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) : [])
      setLoading(false)
    })
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .ct-wrap { padding: 32px 40px; }
        .ct-list { display:flex; flex-direction:column; gap:14px; }
        .ct-item { background:white; border-radius:14px; padding:20px; border:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
        .ct-actions { display:flex; flex-direction:column; gap:8px; flex-shrink:0; }
        @media (max-width:768px) {
          .ct-wrap { padding:16px !important; }
          .ct-item { flex-direction:column !important; }
          .ct-actions { flex-direction:row !important; width:100%; }
          .ct-actions a { flex:1; text-align:center; }
        }
      `}</style>

      <div className="ct-wrap">
        <div style={{ marginBottom: '24px' }}>
          <button onClick={() => router.push('/admin/dashboard')} style={{ background: 'none', border: 'none', color: '#005B99', cursor: 'pointer', fontSize: '14px', fontWeight: '600', padding: 0, marginBottom: '6px', display: 'block' }}>← Dashboard</button>
          <h1 style={{ color: '#004070', fontSize: 'clamp(18px,3vw,24px)', margin: 0, fontFamily: 'Playfair Display, serif' }}>Contact Messages</h1>
        </div>

        {loading ? <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>Loading...</div>
          : contacts.length === 0 ? <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', color: '#999' }}>No messages yet</div>
          : (
            <div className="ct-list">
              {contacts.map((c: any) => (
                <div key={c.id} className="ct-item">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '700', color: '#004070', margin: 0 }}>{c.name}</h3>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '14px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      {c.email && <span style={{ fontSize: '13px', color: '#005B99' }}>✉️ {c.email}</span>}
                      {c.phone && <span style={{ fontSize: '13px', color: '#64748b' }}>📞 {c.phone}</span>}
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7', margin: 0, background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>{c.message}</p>
                  </div>
                  <div className="ct-actions">
                    {c.email && (
                      <a href={`mailto:${c.email}?subject=Re: Your inquiry`} style={{ display: 'block', padding: '8px 14px', background: '#eff6ff', color: '#005B99', borderRadius: '8px', fontWeight: '600', fontSize: '13px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        ✉️ Reply
                      </a>
                    )}
                    {c.phone && (
                      <a href={`tel:${c.phone}`} style={{ display: 'block', padding: '8px 14px', background: '#f0fdf4', color: '#15803d', borderRadius: '8px', fontWeight: '600', fontSize: '13px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        📞 Call
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}
