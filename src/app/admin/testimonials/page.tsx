'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminTestimonials() {
  const router = useRouter()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ patient_name: '', content: '', rating: 5, department: '', is_published: true })

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) { router.push('/admin/login'); return }
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    const data = await fetch('/api/testimonials').then(r => r.json())
    setItems(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false); setShowModal(false); setForm({ patient_name: '', content: '', rating: 5, department: '', is_published: true }); fetchAll()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' }); fetchAll()
  }

  const togglePublish = async (id: string, val: boolean) => {
    await fetch(`/api/testimonials/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_published: val }) }); fetchAll()
  }

  const inp: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .tst-wrap { padding: 32px 40px; }
        .tst-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .adm-modal { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; }
        .adm-modal-box { background:white; border-radius:16px; width:100%; max-width:500px; max-height:90vh; overflow-y:auto; }
        @media (max-width:1024px) { .tst-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width:768px) { .tst-wrap { padding:16px !important; } .tst-grid { grid-template-columns:1fr !important; } }
      `}</style>

      <div className="tst-wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <button onClick={() => router.push('/admin/dashboard')} style={{ background: 'none', border: 'none', color: '#005B99', cursor: 'pointer', fontSize: '14px', fontWeight: '600', padding: 0, marginBottom: '6px', display: 'block' }}>← Dashboard</button>
            <h1 style={{ color: '#004070', fontSize: 'clamp(18px,3vw,24px)', margin: 0, fontFamily: 'Playfair Display, serif' }}>Testimonials</h1>
          </div>
          <button onClick={() => setShowModal(true)} style={{ padding: '10px 20px', background: '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>+ Add</button>
        </div>

        {loading ? <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>Loading...</div>
          : items.length === 0 ? <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', color: '#999' }}>No testimonials yet</div>
          : (
            <div className="tst-grid">
              {items.map((t: any) => (
                <div key={t.id} style={{ background: 'white', borderRadius: '14px', padding: '18px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#f59e0b', fontSize: '14px', marginBottom: '10px' }}>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7', marginBottom: '14px', fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{t.content}"</p>
                  <div style={{ fontWeight: '700', color: '#004070', fontSize: '13px', marginBottom: '2px' }}>{t.patient_name}</div>
                  {t.department && <div style={{ fontSize: '12px', color: '#005B99', marginBottom: '12px' }}>{t.department}</div>}
                  {!t.is_published && <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>Hidden</span>}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => togglePublish(t.id, !t.is_published)} style={{ flex: 1, padding: '7px', background: t.is_published ? '#fef9c3' : '#dcfce7', color: t.is_published ? '#ca8a04' : '#15803d', border: 'none', borderRadius: '7px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>
                      {t.is_published ? 'Hide' : 'Show'}
                    </button>
                    <button onClick={() => handleDelete(t.id)} style={{ padding: '7px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '7px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>🗑</button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>

      {showModal && (
        <div className="adm-modal">
          <div className="adm-modal-box">
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#004070', margin: 0 }}>Add Testimonial</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>
            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div><label style={lbl}>Patient Name *</label><input value={form.patient_name} onChange={e => setForm({ ...form, patient_name: e.target.value })} style={inp} /></div>
              <div><label style={lbl}>Department</label><input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} style={inp} /></div>
              <div><label style={lbl}>Rating</label>
                <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} style={inp}>
                  {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{'★'.repeat(r)} ({r}/5)</option>)}
                </select>
              </div>
              <div><label style={lbl}>Content *</label><textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} style={{ ...inp, height: '100px', resize: 'vertical' }} /></div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#334155' }}>
                <input type="checkbox" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} /> Published
              </label>
              <div style={{ display: 'flex', gap: '10px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '11px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '11px', background: saving ? '#94a3b8' : '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer' }}>
                  {saving ? 'Saving...' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}