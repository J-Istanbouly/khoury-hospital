'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDepartments() {
  const router = useRouter()
  const [departments, setDepartments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [search, setSearch] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const empty = {
    name_en: '', name_ar: '', description_en: '', description_ar: '',
    icon: '', phone: '', extension: '', location: '', working_hours: '',
    services: '', equipment: '', patient_info: '', head_message: '', image_url: ''
  }
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) { router.push('/admin/login'); return }
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    const data = await fetch('/api/departments').then(r => r.json())
    setDepartments(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const openAdd = () => { setEditing(null); setForm(empty); setImagePreview(''); setImageFile(null); setShowModal(true) }
  const openEdit = (d: any) => { setEditing(d); setForm({ ...empty, ...d }); setImagePreview(d.image_url || ''); setImageFile(null); setShowModal(true) }

  const uploadImage = async () => {
    if (!imageFile) return form.image_url || ''
    const fd = new FormData(); fd.append('file', imageFile)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (!res.ok) return form.image_url || ''
    const data = await res.json(); return data.url || ''
  }

  const handleSave = async () => {
    setSaving(true)
    const image_url = await uploadImage()
    const payload = { ...form, image_url }
    if (editing) {
      await fetch(`/api/departments/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    } else {
      await fetch('/api/departments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    }
    setSaving(false); setShowModal(false); fetchAll()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this department?')) return
    await fetch(`/api/departments/${id}`, { method: 'DELETE' }); fetchAll()
  }

  const filtered = departments.filter(d =>
    !search || d.name_en?.toLowerCase().includes(search.toLowerCase())
  )

  const inp: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .dep-wrap { padding: 32px 40px; }
        .dep-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .dep-form-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .adm-modal { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; }
        .adm-modal-box { background:white; border-radius:16px; width:100%; max-width:680px; max-height:92vh; overflow-y:auto; }
        @media (max-width:1024px) { .dep-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width:768px) {
          .dep-wrap { padding:16px !important; }
          .dep-grid { grid-template-columns:repeat(2,1fr) !important; }
          .dep-form-2 { grid-template-columns:1fr !important; }
        }
        @media (max-width:480px) {
          .dep-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      <div className="dep-wrap">

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <button onClick={() => router.push('/admin/dashboard')} style={{ background: 'none', border: 'none', color: '#005B99', cursor: 'pointer', fontSize: '14px', fontWeight: '600', padding: 0, marginBottom: '6px', display: 'block' }}>← Dashboard</button>
            <h1 style={{ color: '#004070', fontSize: 'clamp(18px,3vw,24px)', margin: 0, fontFamily: 'Playfair Display, serif' }}>Departments</h1>
          </div>
          <button onClick={openAdd} style={{ padding: '10px 20px', background: '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            + Add Department
          </button>
        </div>

        {/* SEARCH */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search departments..." style={{ ...inp, flex: 1, minWidth: '200px' }} />
          <span style={{ fontSize: '13px', color: '#999', whiteSpace: 'nowrap' }}>{filtered.length} departments</span>
        </div>

        {/* GRID */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', color: '#999' }}>No departments found</div>
        ) : (
          <div className="dep-grid">
            {filtered.map((dept: any) => (
              <div key={dept.id} style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                {dept.image_url
                  ? <img src={dept.image_url} style={{ width: '100%', height: '120px', objectFit: 'cover' }} alt="" />
                  : <div style={{ height: '80px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>{dept.icon || '🏥'}</div>
                }
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '700', color: '#004070', marginBottom: '4px' }}>{dept.name_en}</h3>
                  {dept.location && <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>📍 {dept.location}</p>}
                  {dept.working_hours && <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>🕐 {dept.working_hours}</p>}
                  {dept.services && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                      {dept.services.split(',').slice(0, 2).map((s: string) => (
                        <span key={s} style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '10px', fontWeight: '600', padding: '2px 7px', borderRadius: '20px' }}>{s.trim()}</span>
                      ))}
                      {dept.services.split(',').length > 2 && <span style={{ background: '#f1f5f9', color: '#94a3b8', fontSize: '10px', fontWeight: '600', padding: '2px 7px', borderRadius: '20px' }}>+{dept.services.split(',').length - 2}</span>}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => openEdit(dept)} style={{ flex: 1, padding: '8px', background: '#eff6ff', color: '#005B99', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(dept.id)} style={{ flex: 1, padding: '8px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="adm-modal">
          <div className="adm-modal-box">
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'white', zIndex: 2 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#004070', margin: 0 }}>{editing ? 'Edit Department' : 'Add Department'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>
            <div style={{ padding: '20px 22px' }}>

              {/* IMAGE */}
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Cover Image</label>
                {imagePreview && <img src={imagePreview} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px', marginBottom: '8px' }} alt="" />}
                <input type="file" ref={fileRef} accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)) } }} style={{ display: 'none' }} />
                <button onClick={() => fileRef.current?.click()} style={{ width: '100%', padding: '9px', background: '#f1f5f9', border: '1.5px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: '#64748b' }}>
                  {imagePreview ? 'Change Image' : '+ Upload Image'}
                </button>
              </div>

              {/* BASIC INFO */}
              <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', color: '#005B99', marginBottom: '12px', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Basic Info</p>
              <div className="dep-form-2" style={{ marginBottom: '14px' }}>
                <div><label style={lbl}>Name (English) *</label><input value={form.name_en} onChange={e => setForm({ ...form, name_en: e.target.value })} style={inp} /></div>
                <div><label style={lbl}>Name (Arabic)</label><input value={form.name_ar} onChange={e => setForm({ ...form, name_ar: e.target.value })} style={{ ...inp, direction: 'rtl' }} /></div>
                <div><label style={lbl}>Icon (Emoji)</label><input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="❤️" style={inp} /></div>
                <div><label style={lbl}>Location</label><input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Floor 2" style={inp} /></div>
                <div><label style={lbl}>Phone</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inp} /></div>
                <div><label style={lbl}>Extension</label><input value={form.extension} onChange={e => setForm({ ...form, extension: e.target.value })} style={inp} /></div>
                <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Working Hours</label><input value={form.working_hours} onChange={e => setForm({ ...form, working_hours: e.target.value })} placeholder="Mon-Fri 8AM-8PM" style={inp} /></div>
              </div>

              {/* DESCRIPTION */}
              <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', color: '#005B99', marginBottom: '12px', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Description</p>
              <div style={{ marginBottom: '12px' }}><label style={lbl}>Description (English)</label><textarea value={form.description_en} onChange={e => setForm({ ...form, description_en: e.target.value })} style={{ ...inp, height: '80px', resize: 'vertical' }} /></div>
              <div style={{ marginBottom: '14px' }}><label style={lbl}>Description (Arabic)</label><textarea value={form.description_ar} onChange={e => setForm({ ...form, description_ar: e.target.value })} style={{ ...inp, height: '70px', resize: 'vertical', direction: 'rtl' }} /></div>

              {/* SERVICES */}
              <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', color: '#005B99', marginBottom: '12px', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Services & Info</p>
              <div style={{ marginBottom: '12px' }}><label style={lbl}>Services (comma separated)</label><textarea value={form.services} onChange={e => setForm({ ...form, services: e.target.value })} placeholder="ECG, Echo, Catheterism, Open Heart Surgery" style={{ ...inp, height: '70px', resize: 'vertical' }} /></div>
              <div style={{ marginBottom: '12px' }}><label style={lbl}>Equipment</label><textarea value={form.equipment} onChange={e => setForm({ ...form, equipment: e.target.value })} style={{ ...inp, height: '70px', resize: 'vertical' }} /></div>
              <div style={{ marginBottom: '12px' }}><label style={lbl}>Patient Info</label><textarea value={form.patient_info} onChange={e => setForm({ ...form, patient_info: e.target.value })} style={{ ...inp, height: '70px', resize: 'vertical' }} /></div>
              <div style={{ marginBottom: '20px' }}><label style={lbl}>Head Doctor Message</label><textarea value={form.head_message} onChange={e => setForm({ ...form, head_message: e.target.value })} style={{ ...inp, height: '80px', resize: 'vertical' }} /></div>

              <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', position: 'sticky', bottom: 0, background: 'white', zIndex: 2, margin: '0 -22px -20px', padding: '16px 22px' }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '11px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '11px', background: saving ? '#94a3b8' : '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '14px' }}>
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Department'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}