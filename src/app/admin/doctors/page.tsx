'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Cropper from 'react-easy-crop'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export default function AdminDoctors() {
  const router = useRouter()
  const [doctors, setDoctors] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterDept, setFilterDept] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' } | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<any>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [cropSrc, setCropSrc] = useState('')
  const [showCrop, setShowCrop] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState<any>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const empty = { name_en: '', title: '', specialties: '', department: '', email: '', extension: '', phone: '', languages: '', availability: '', experience: '', image_url: '' }
  const [form, setForm] = useState(empty)

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) { router.push('/admin/login'); return }
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    const [d, dep] = await Promise.all([
      fetch(`${BASE}/api/doctors`).then(r => r.json()),
      fetch(`${BASE}/api/departments`).then(r => r.json())
    ])
    setDoctors(Array.isArray(d) ? d : [])
    setDepartments(Array.isArray(dep) ? dep : [])
    setLoading(false)
  }

  const openAdd = () => { setEditing(null); setForm(empty); setImagePreview(''); setImageFile(null); setShowModal(true) }
  const openEdit = (doc: any) => { 
  setEditing(doc)
  setForm({ 
    name_en: doc.name_en || '',
    title: doc.title || '',
    specialties: doc.specialties || '',
    department: doc.department || '',
    email: doc.email || '',
    extension: doc.extension || '',
    phone: doc.phone || '',
    languages: doc.languages || '',
    availability: doc.availability || '',
    experience: doc.experience || '',
    image_url: doc.image_url || '',
  })
  setImagePreview(doc.image_url || '')
  setImageFile(null)
  setShowModal(true) 
}

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setCropSrc(URL.createObjectURL(f))
    setShowModal(false)
    setShowCrop(true)
    e.target.value = ''
  }

  const getCroppedImg = async () => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = cropSrc
    await new Promise(r => { image.onload = r })
    const canvas = document.createElement('canvas')
    canvas.width = 400; canvas.height = 400
    const ctx = canvas.getContext('2d')!
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    ctx.drawImage(image, croppedArea.x * scaleX, croppedArea.y * scaleY, croppedArea.width * scaleX, croppedArea.height * scaleY, 0, 0, 400, 400)
    return new Promise<File>(resolve => canvas.toBlob(blob => resolve(new File([blob!], 'photo.jpg', { type: 'image/jpeg' })), 'image/jpeg', 0.9))
  }

  const confirmCrop = async () => {
    const file = await getCroppedImg()
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setShowCrop(false)
    setShowModal(true)
  }

  const uploadImage = async () => {
    if (!imageFile) return form.image_url || ''
    const fd = new FormData()
    fd.append('file', imageFile)
    try {
      const res = await fetch(`${BASE}/api/upload`, { method: 'POST', body: fd })
      if (!res.ok) return form.image_url || ''
      const data = await res.json()
      return data.url || form.image_url || ''
    } catch {
      return form.image_url || ''
    }
  }

  const handleSave = async () => {
    if (!form.name_en) { showToast('Please enter doctor name', 'error'); return }
    setSaving(true)
    try {
      const image_url = await uploadImage()
      const payload = { ...form, image_url }
      if (editing) {
        await fetch(`${BASE}/api/doctors/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      } else {
        await fetch(`${BASE}/api/doctors`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }
      setShowModal(false)
      showToast(editing ? '✅ Doctor updated successfully!' : '✅ Doctor added successfully!')
      fetchAll()
    } catch {
      showToast('Something went wrong', 'error')
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    try {
      await fetch(`${BASE}/api/doctors/${confirmDelete.id}`, { method: 'DELETE' })
      setConfirmDelete(null)
      showToast('✅ Doctor deleted successfully!')
      fetchAll()
    } catch {
      showToast('Failed to delete', 'error')
    }
  }

  const filtered = doctors.filter(d =>
    (!search || d.name_en?.toLowerCase().includes(search.toLowerCase()) || d.specialties?.toLowerCase().includes(search.toLowerCase())) &&
    (!filterDept || d.department === filterDept)
  )

  const inp: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .adm-wrap { padding: 32px 40px; }
        .adm-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .adm-form-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .adm-modal { position:fixed; inset:0; background:rgba(0,0,0,0.55); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; }
        .adm-modal-box { background:white; border-radius:16px; width:100%; max-width:600px; max-height:90vh; overflow-y:auto; }
        .adm-toast { position:fixed; top:24px; right:24px; z-index:9999; padding:14px 20px; border-radius:12px; font-size:14px; font-weight:600; box-shadow:0 8px 24px rgba(0,0,0,0.15); animation:slideIn 0.3s ease; }
        @keyframes slideIn { from { transform:translateX(100px); opacity:0; } to { transform:translateX(0); opacity:1; } }
        @media (max-width:1024px) { .adm-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width:768px) {
          .adm-wrap { padding:16px !important; }
          .adm-grid { grid-template-columns:1fr !important; }
          .adm-form-2 { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* TOAST */}
      {toast && (
        <div className="adm-toast" style={{ background: toast.type === 'success' ? '#dcfce7' : '#fee2e2', color: toast.type === 'success' ? '#15803d' : '#dc2626' }}>
          {toast.msg}
        </div>
      )}

      <div className="adm-wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <button onClick={() => router.push('/admin/dashboard')} style={{ background: 'none', border: 'none', color: '#005B99', cursor: 'pointer', fontSize: '14px', fontWeight: '600', padding: 0, marginBottom: '6px', display: 'block' }}>← Dashboard</button>
            <h1 style={{ color: '#004070', fontSize: 'clamp(18px,3vw,24px)', margin: 0, fontFamily: 'Playfair Display, serif' }}>Doctors ({doctors.length})</h1>
          </div>
          <button onClick={openAdd} style={{ padding: '10px 20px', background: '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
            + Add Doctor
          </button>
        </div>

        {/* TOOLBAR */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search doctors..." style={{ ...inp, flex: 1, minWidth: '160px' }} />
          <select value={filterDept} onChange={e => setFilterDept(e.target.value)} style={{ ...inp, width: 'auto', minWidth: '140px' }}>
            <option value="">All Departments</option>
            {departments.map((d: any) => <option key={d.id} value={d.name_en}>{d.name_en}</option>)}
          </select>
          <span style={{ fontSize: '13px', color: '#999', alignSelf: 'center' }}>{filtered.length} doctors</span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', color: '#999' }}>No doctors found</div>
        ) : (
          <div className="adm-grid">
            {filtered.map((doc: any) => (
              <div key={doc.id} style={{ background: 'white', borderRadius: '14px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #dbeafe', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {doc.image_url ? <img src={doc.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : <span style={{ fontSize: '24px', opacity: 0.3 }}>👨‍⚕️</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '700', color: '#004070', margin: '0 0 3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name_en}</h3>
                    <p style={{ fontSize: '12px', color: '#005B99', margin: '0 0 4px' }}>{doc.title}</p>
                    {doc.department && <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '20px' }}>{doc.department}</span>}
                  </div>
                </div>
                {doc.specialties && <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>{doc.specialties}</p>}
                {doc.availability && <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '14px' }}>📅 {doc.availability}</p>}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => openEdit(doc)} style={{ flex: 1, padding: '8px', background: '#eff6ff', color: '#005B99', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => setConfirmDelete(doc)} style={{ flex: 1, padding: '8px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CONFIRM DELETE MODAL */}
      {confirmDelete && (
        <div className="adm-modal">
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗑️</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#004070', marginBottom: '10px' }}>Delete Doctor?</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', lineHeight: '1.6' }}>
              Are you sure you want to delete <strong>{confirmDelete.name_en}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: '12px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
              <button onClick={handleDelete} style={{ flex: 1, padding: '12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* CROP MODAL */}
      {showCrop && (
        <div className="adm-modal">
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '500px' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '16px', color: '#004070' }}>Crop Photo</h3>
            <div style={{ position: 'relative', height: '300px', background: '#000', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
              <Cropper image={cropSrc} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={(_, area) => setCroppedArea(area)} />
            </div>
            <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={e => setZoom(Number(e.target.value))} style={{ width: '100%', marginBottom: '16px' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowCrop(false)} style={{ flex: 1, padding: '10px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={confirmCrop} style={{ flex: 1, padding: '10px', background: '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Confirm Crop</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="adm-modal">
          <div className="adm-modal-box">
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#004070', margin: 0 }}>{editing ? 'Edit Doctor' : 'Add Doctor'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              {/* PHOTO */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ width: '88px', height: '88px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #dbeafe', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', cursor: 'pointer', position: 'relative' }}
                  onClick={() => fileRef.current?.click()}>
                  {imagePreview
                    ? <img src={imagePreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    : <span style={{ fontSize: '36px', opacity: 0.3 }}>👨‍⚕️</span>
                  }
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0')}>
                    <span style={{ color: 'white', fontSize: '20px' }}>📷</span>
                  </div>
                </div>
                <input type="file" ref={fileRef} accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                <button onClick={() => fileRef.current?.click()} style={{ background: '#eff6ff', color: '#005B99', border: 'none', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                  {imagePreview ? '📷 Change Photo' : '📷 Upload Photo'}
                </button>
                {imagePreview && <div style={{ fontSize: '11px', color: '#15803d', marginTop: '6px', fontWeight: '600' }}>✓ Photo ready to save</div>}
              </div>

              <div className="adm-form-2" style={{ marginBottom: '14px' }}>
                <div><label style={lbl}>Full Name *</label><input value={form.name_en} onChange={e => setForm({ ...form, name_en: e.target.value })} style={inp} /></div>
                <div><label style={lbl}>Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Chief of Cardiology" style={inp} /></div>
                <div>
                  <label style={lbl}>Department</label>
                  <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} style={inp}>
                    <option value="">Select Department</option>
                    {departments.map((d: any) => <option key={d.id} value={d.name_en}>{d.name_en}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Specialties</label><input value={form.specialties} onChange={e => setForm({ ...form, specialties: e.target.value })} placeholder="e.g. Cardiology, ECG" style={inp} /></div>
                <div><label style={lbl}>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inp} /></div>
                <div><label style={lbl}>Phone</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inp} /></div>
                <div><label style={lbl}>Extension</label><input value={form.extension} onChange={e => setForm({ ...form, extension: e.target.value })} style={inp} /></div>
                <div><label style={lbl}>Languages</label><input value={form.languages} onChange={e => setForm({ ...form, languages: e.target.value })} placeholder="Arabic, English" style={inp} /></div>
                <div><label style={lbl}>Availability</label><input value={form.availability} onChange={e => setForm({ ...form, availability: e.target.value })} placeholder="Mon-Fri 9AM-5PM" style={inp} /></div>
                <div><label style={lbl}>Experience</label><input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="15+ years" style={inp} /></div>
              </div>

              <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '11px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '11px', background: saving ? '#94a3b8' : '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '14px' }}>
                  {saving ? '⏳ Saving...' : editing ? '✓ Save Changes' : '+ Add Doctor'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}