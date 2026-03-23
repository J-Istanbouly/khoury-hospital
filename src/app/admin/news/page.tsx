'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export default function AdminNews() {
  const router = useRouter()
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' } | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<any>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const empty = { title_en: '', title_ar: '', content_en: '', content_ar: '', category: 'News', tags: '', is_featured: false, is_published: true, author: '', published_at: new Date().toISOString().split('T')[0], image_url: '' }
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
    const data = await fetch(`${BASE}/api/news`).then(r => r.json())
    setNews(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const openAdd = () => { setEditing(null); setForm(empty); setImagePreview(''); setImageFile(null); setShowModal(true) }
  const openEdit = (item: any) => {
    setEditing(item)
    setForm({
      title_en: item.title_en || '',
      title_ar: item.title_ar || '',
      content_en: item.content_en || '',
      content_ar: item.content_ar || '',
      category: item.category || 'News',
      tags: item.tags || '',
      is_featured: item.is_featured || false,
      is_published: item.is_published !== false,
      author: item.author || '',
      published_at: item.published_at ? item.published_at.split('T')[0] : new Date().toISOString().split('T')[0],
      image_url: item.image_url || '',
    })
    setImagePreview(item.image_url || '')
    setImageFile(null)
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
    if (!form.title_en) { showToast('Please enter article title', 'error'); return }
    setSaving(true)
    try {
      const image_url = await uploadImage()
      const payload = { ...form, image_url }
      if (editing) {
        await fetch(`${BASE}/api/news/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        showToast('✅ Article updated successfully!')
      } else {
        await fetch(`${BASE}/api/news`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        showToast('✅ Article published successfully!')
      }
      setShowModal(false)
      fetchAll()
    } catch {
      showToast('Something went wrong', 'error')
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    try {
      await fetch(`${BASE}/api/news/${confirmDelete.id}`, { method: 'DELETE' })
      setConfirmDelete(null)
      showToast('✅ Article deleted successfully!')
      fetchAll()
    } catch {
      showToast('Failed to delete', 'error')
    }
  }

  const toggleField = async (id: string, field: string, val: boolean) => {
    try {
      await fetch(`${BASE}/api/news/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [field]: val }) })
      showToast(val ? '✅ Published!' : '✅ Unpublished!')
      fetchAll()
    } catch {
      showToast('Failed to update', 'error')
    }
  }

  const inp: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .news-wrap { padding: 32px 40px; }
        .news-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .news-form-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .adm-modal { position:fixed; inset:0; background:rgba(0,0,0,0.55); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; }
        .adm-modal-box { background:white; border-radius:16px; width:100%; max-width:640px; max-height:90vh; overflow-y:auto; }
        .adm-toast { position:fixed; top:24px; right:24px; z-index:9999; padding:14px 20px; border-radius:12px; font-size:14px; font-weight:600; box-shadow:0 8px 24px rgba(0,0,0,0.15); animation:slideIn 0.3s ease; }
        @keyframes slideIn { from { transform:translateX(100px); opacity:0; } to { transform:translateX(0); opacity:1; } }
        @media (max-width:1024px) { .news-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width:768px) {
          .news-wrap { padding:16px !important; }
          .news-grid { grid-template-columns:1fr !important; }
          .news-form-2 { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* TOAST */}
      {toast && (
        <div className="adm-toast" style={{ background: toast.type === 'success' ? '#dcfce7' : '#fee2e2', color: toast.type === 'success' ? '#15803d' : '#dc2626' }}>
          {toast.msg}
        </div>
      )}

      <div className="news-wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <button onClick={() => router.push('/admin/dashboard')} style={{ background: 'none', border: 'none', color: '#005B99', cursor: 'pointer', fontSize: '14px', fontWeight: '600', padding: 0, marginBottom: '6px', display: 'block' }}>← Dashboard</button>
            <h1 style={{ color: '#004070', fontSize: 'clamp(18px,3vw,24px)', margin: 0, fontFamily: 'Playfair Display, serif' }}>News & Blog ({news.length})</h1>
          </div>
          <button onClick={openAdd} style={{ padding: '10px 20px', background: '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>+ Add Article</button>
        </div>

        {loading ? <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>Loading...</div>
          : news.length === 0 ? <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', color: '#999' }}>No articles yet</div>
          : (
            <div className="news-grid">
              {news.map((item: any) => (
                <div key={item.id} style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                  {item.image_url
                    ? <img src={item.image_url} style={{ width: '100%', height: '140px', objectFit: 'cover' }} alt="" />
                    : <div style={{ height: '140px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>📰</div>
                  }
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px' }}>{item.category}</span>
                      {item.is_featured && <span style={{ background: '#fef9c3', color: '#ca8a04', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px' }}>⭐ Featured</span>}
                      {!item.is_published && <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px' }}>Draft</span>}
                    </div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '14px', fontWeight: '700', color: '#004070', marginBottom: '8px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title_en}</h3>
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                      {new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <button onClick={() => openEdit(item)} style={{ flex: 1, padding: '7px', background: '#eff6ff', color: '#005B99', border: 'none', borderRadius: '7px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>✏️ Edit</button>
                      <button onClick={() => toggleField(item.id, 'is_published', !item.is_published)}
                        style={{ flex: 1, padding: '7px', background: item.is_published ? '#fef9c3' : '#dcfce7', color: item.is_published ? '#ca8a04' : '#15803d', border: 'none', borderRadius: '7px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>
                        {item.is_published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => setConfirmDelete(item)} style={{ padding: '7px 10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '7px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>🗑</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>

      {/* CONFIRM DELETE */}
      {confirmDelete && (
        <div className="adm-modal">
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗑️</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#004070', marginBottom: '10px' }}>Delete Article?</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', lineHeight: '1.6' }}>
              Are you sure you want to delete <strong>"{confirmDelete.title_en}"</strong>? This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: '12px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
              <button onClick={handleDelete} style={{ flex: 1, padding: '12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="adm-modal">
          <div className="adm-modal-box">
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#004070', margin: 0 }}>{editing ? 'Edit Article' : 'Add Article'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>
            <div style={{ padding: '20px 22px' }}>
              {/* IMAGE */}
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Cover Image</label>
                {imagePreview && <img src={imagePreview} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', marginBottom: '8px' }} alt="" />}
                <input type="file" ref={fileRef} accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)) } }} style={{ display: 'none' }} />
                <button onClick={() => fileRef.current?.click()} style={{ width: '100%', padding: '9px', background: '#f1f5f9', border: '1.5px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: '#64748b' }}>
                  {imagePreview ? '📷 Change Image' : '+ Upload Image'}
                </button>
              </div>

              <div className="news-form-2" style={{ marginBottom: '14px' }}>
                <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Title (English) *</label><input value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} style={inp} /></div>
                <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Title (Arabic)</label><input value={form.title_ar} onChange={e => setForm({ ...form, title_ar: e.target.value })} style={{ ...inp, direction: 'rtl' }} /></div>
                <div>
                  <label style={lbl}>Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inp}>
                    {['News', 'Event', 'Achievement', 'Blog'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Author</label><input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} style={inp} /></div>
                <div><label style={lbl}>Published Date</label><input type="date" value={form.published_at} onChange={e => setForm({ ...form, published_at: e.target.value })} style={inp} /></div>
                <div><label style={lbl}>Tags</label><input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="tag1, tag2" style={inp} /></div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={lbl}>Content (English)</label>
                <textarea value={form.content_en} onChange={e => setForm({ ...form, content_en: e.target.value })} style={{ ...inp, height: '100px', resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Content (Arabic)</label>
                <textarea value={form.content_ar} onChange={e => setForm({ ...form, content_ar: e.target.value })} style={{ ...inp, height: '80px', resize: 'vertical', direction: 'rtl' }} />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#334155' }}>
                  <input type="checkbox" checked={form.is_featured} onChange={e => setForm({ ...form, is_featured: e.target.checked })} /> ⭐ Featured
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#334155' }}>
                  <input type="checkbox" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} /> Published
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '11px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '11px', background: saving ? '#94a3b8' : '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '14px' }}>
                  {saving ? '⏳ Saving...' : editing ? '✓ Save Changes' : '+ Publish'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}