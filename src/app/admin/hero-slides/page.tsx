'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Cropper from 'react-easy-crop'

const PAGES = [
  { label: 'Home', value: '/' },
  { label: 'About', value: '/about' },
  { label: 'Departments', value: '/departments' },
  { label: 'Find a Doctor', value: '/doctors' },
  { label: 'Book Appointment', value: '/appointments' },
  { label: 'Patients & Visitors', value: '/patients' },
  { label: 'News & Events', value: '/news' },
  { label: 'Careers', value: '/jobs' },
  { label: 'Contact Us', value: '/contact' },
]

export default function AdminHeroSlides() {
  const router = useRouter()
  const [slides, setSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [mediaPreview, setMediaPreview] = useState('')
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image')
  const [cropSrc, setCropSrc] = useState('')
  const [showCrop, setShowCrop] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState<any>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const empty = { title: '', subtitle: '', button_text: '', button_link: '/', media_url: '', media_type: 'image', is_active: true }
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) { router.push('/admin/login'); return }
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    const data = await fetch((process.env.NEXT_PUBLIC_BASE_URL||'http://localhost:3000')+'/api/hero-slides').then(r => r.json())
    setSlides(Array.isArray(data) ? data.sort((a: any, b: any) => (a.order_num || 0) - (b.order_num || 0)) : [])
    setLoading(false)
  }

  const openAdd = () => { setEditing(null); setForm(empty); setMediaPreview(''); setMediaFile(null); setMediaType('image'); setShowModal(true) }
  const openEdit = (item: any) => {
    setEditing(item)
    setForm({ ...empty, ...item })
    setMediaPreview(item.media_url || '')
    setMediaType(item.media_type === 'video' ? 'video' : 'image')
    setMediaFile(null)
    setShowModal(true)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.type.startsWith('video/')) {
      setMediaType('video')
      setMediaFile(f)
      setMediaPreview(URL.createObjectURL(f))
    } else {
      setMediaType('image')
      setCropSrc(URL.createObjectURL(f))
      setShowCrop(true)
    }
  }

  const getCroppedImg = async () => {
    const image = new Image()
    image.src = cropSrc
    await new Promise(r => { image.onload = r })
    const canvas = document.createElement('canvas')
    canvas.width = 1920; canvas.height = 1080
    const ctx = canvas.getContext('2d')!
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    ctx.drawImage(image, croppedArea.x * scaleX, croppedArea.y * scaleY, croppedArea.width * scaleX, croppedArea.height * scaleY, 0, 0, 1920, 1080)
    return new Promise<File>(resolve => canvas.toBlob(blob => resolve(new File([blob!], 'slide.jpg', { type: 'image/jpeg' })), 'image/jpeg', 0.92))
  }

  const confirmCrop = async () => {
    const file = await getCroppedImg()
    setMediaFile(file)
    setMediaPreview(URL.createObjectURL(file))
    setShowCrop(false)
  }

  const uploadMedia = async () => {
    if (!mediaFile) return form.media_url || ''
    const fd = new FormData(); fd.append('file', mediaFile)
    const res = await fetch((process.env.NEXT_PUBLIC_BASE_URL||'http://localhost:3000')+'/api/upload', { method: 'POST', body: fd })
    if (!res.ok) return form.media_url || ''
    const data = await res.json(); return data.url || ''
  }

  const handleSave = async () => {
    setSaving(true)
    const media_url = await uploadMedia()
    const payload = { ...form, media_url, media_type: mediaType }
    if (editing) {
      await fetch(`/api/hero-slides/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    } else {
      await fetch((process.env.NEXT_PUBLIC_BASE_URL||'http://localhost:3000')+'/api/hero-slides', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    }
    setSaving(false); setShowModal(false); fetchAll()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this slide?')) return
    await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' }); fetchAll()
  }

  const toggleActive = async (id: string, val: boolean) => {
    await fetch(`/api/hero-slides/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_active: val }) }); fetchAll()
  }

  const inp: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .hs-wrap { padding: 32px 40px; }
        .hs-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .hs-form-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .adm-modal { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; }
        .adm-modal-box { background:white; border-radius:16px; width:100%; max-width:600px; max-height:90vh; overflow-y:auto; }
        @media (max-width:1024px) { .hs-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width:768px) {
          .hs-wrap { padding:16px !important; }
          .hs-grid { grid-template-columns:1fr !important; }
          .hs-form-2 { grid-template-columns:1fr !important; }
        }
      `}</style>

      <div className="hs-wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <button onClick={() => router.push('/admin/dashboard')} style={{ background: 'none', border: 'none', color: '#005B99', cursor: 'pointer', fontSize: '14px', fontWeight: '600', padding: 0, marginBottom: '6px', display: 'block' }}>← Dashboard</button>
            <h1 style={{ color: '#004070', fontSize: 'clamp(18px,3vw,24px)', margin: 0, fontFamily: 'Playfair Display, serif' }}>Hero Slides</h1>
          </div>
          <button onClick={openAdd} style={{ padding: '10px 20px', background: '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>+ Add Slide</button>
        </div>

        {loading ? <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>Loading...</div>
          : slides.length === 0 ? <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', color: '#999' }}>No slides yet</div>
          : (
            <div className="hs-grid">
              {slides.map((slide: any) => (
                <div key={slide.id} style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                  {/* PREVIEW */}
                  <div style={{ height: '140px', background: '#0A2540', position: 'relative', overflow: 'hidden' }}>
                    {slide.media_url && slide.media_type === 'video'
                      ? <video src={slide.media_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                      : slide.media_url
                        ? <img src={slide.media_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                        : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0A2540, #1F6AA5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>🖼️</div>
                    }
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '14px' }}>
                      <h3 style={{ color: 'white', fontFamily: 'Playfair Display, serif', fontSize: '14px', fontWeight: '700', margin: '0 0 4px', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{slide.title || 'No Title'}</h3>
                      {slide.subtitle && <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', margin: 0, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{slide.subtitle}</p>}
                    </div>
                    {slide.media_type === 'video' && (
                      <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px' }}>VIDEO</div>
                    )}
                    {!slide.is_active && (
                      <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#dc2626', color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px' }}>INACTIVE</div>
                    )}
                  </div>

                  <div style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      {slide.button_text && <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px' }}>🔗 {slide.button_text}</span>}
                      {slide.button_link && <span style={{ background: '#f1f5f9', color: '#64748b', fontSize: '11px', padding: '2px 8px', borderRadius: '20px' }}>{slide.button_link}</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openEdit(slide)} style={{ flex: 1, padding: '8px', background: '#eff6ff', color: '#005B99', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => toggleActive(slide.id, !slide.is_active)} style={{ flex: 1, padding: '8px', background: slide.is_active ? '#fef9c3' : '#dcfce7', color: slide.is_active ? '#ca8a04' : '#15803d', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                        {slide.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={() => handleDelete(slide.id)} style={{ padding: '8px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>🗑</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>

      {/* CROP MODAL */}
      {showCrop && (
        <div className="adm-modal">
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '500px' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '16px', color: '#004070' }}>Crop Slide (16:9)</h3>
            <div style={{ position: 'relative', height: '240px', background: '#000', borderRadius: '12px', overflow: 'hidden', marginBottom: '14px' }}>
              <Cropper image={cropSrc} crop={crop} zoom={zoom} aspect={16 / 9} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={(_, area) => setCroppedArea(area)} />
            </div>
            <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={e => setZoom(Number(e.target.value))} style={{ width: '100%', marginBottom: '14px' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowCrop(false)} style={{ flex: 1, padding: '10px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={confirmCrop} style={{ flex: 1, padding: '10px', background: '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="adm-modal">
          <div className="adm-modal-box">
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#004070', margin: 0 }}>{editing ? 'Edit Slide' : 'Add Slide'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>
            <div style={{ padding: '20px 22px' }}>
              {/* MEDIA UPLOAD */}
              <div style={{ marginBottom: '18px' }}>
                <label style={lbl}>Media (Image or Video)</label>
                <div style={{ height: '140px', background: '#0A2540', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px', position: 'relative', cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
                  {mediaPreview
                    ? mediaType === 'video'
                      ? <video src={mediaPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                      : <img src={mediaPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', gap: '8px' }}>
                        <span style={{ fontSize: '32px' }}>🖼️</span>
                        <span style={{ fontSize: '13px' }}>Click to upload image or video</span>
                      </div>
                  }
                </div>
                <input type="file" ref={fileRef} accept="image/*,video/*" onChange={handleFile} style={{ display: 'none' }} />
                <button onClick={() => fileRef.current?.click()} style={{ width: '100%', padding: '9px', background: '#f1f5f9', border: '1.5px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: '#64748b' }}>
                  {mediaPreview ? 'Change Media' : '+ Upload Image / Video'}
                </button>
              </div>

              <div className="hs-form-2" style={{ marginBottom: '14px' }}>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={lbl}>Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Welcome to Khoury General Hospital" style={inp} />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={lbl}>Subtitle</label>
                  <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="Excellence in Healthcare Since 1993" style={inp} />
                </div>
                <div>
                  <label style={lbl}>Button Text</label>
                  <input value={form.button_text} onChange={e => setForm({ ...form, button_text: e.target.value })} placeholder="Book Appointment" style={inp} />
                </div>
                <div>
                  <label style={lbl}>Button Link</label>
                  <select value={form.button_link} onChange={e => setForm({ ...form, button_link: e.target.value })} style={inp}>
                    {PAGES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#334155' }}>
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} /> Active (visible on homepage)
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '11px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '11px', background: saving ? '#94a3b8' : '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '14px' }}>
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Slide'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
