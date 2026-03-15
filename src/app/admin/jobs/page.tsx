'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminJobs() {
  const router = useRouter()
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [saving, setSaving] = useState(false)

  const empty = { title_en: '', department_en: '', description_en: '', requirements: '', type: 'Full-time', experience_years: '', deadline: '', apply_email: 'hr@khouryhospital.com', is_active: true }
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) { router.push('/admin/login'); return }
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    const data = await fetch('/api/jobs').then(r => r.json())
    setJobs(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const openAdd = () => { setEditing(null); setForm(empty); setShowModal(true) }
  const openEdit = (item: any) => { setEditing(item); setForm({ ...empty, ...item }); setShowModal(true) }

  const handleSave = async () => {
    setSaving(true)
    if (editing) {
      await fetch(`/api/jobs/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setSaving(false); setShowModal(false); fetchAll()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job?')) return
    await fetch(`/api/jobs/${id}`, { method: 'DELETE' }); fetchAll()
  }

  const toggleActive = async (id: string, val: boolean) => {
    await fetch(`/api/jobs/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_active: val }) }); fetchAll()
  }

  const inp: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }

  const typeColor = (t: string) => {
    if (t === 'Part-time') return { bg: '#e0f2fe', color: '#0369a1' }
    if (t === 'Contract') return { bg: '#fdf4ff', color: '#9333ea' }
    return { bg: '#dcfce7', color: '#15803d' }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .jobs-wrap { padding: 32px 40px; }
        .jobs-list { display:flex; flex-direction:column; gap:14px; }
        .jobs-item { background:white; border-radius:14px; padding:18px; border:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
        .jobs-actions { display:flex; flex-direction:column; gap:8px; min-width:120px; flex-shrink:0; }
        .adm-modal { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; }
        .adm-modal-box { background:white; border-radius:16px; width:100%; max-width:560px; max-height:90vh; overflow-y:auto; }
        .jobs-form-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        @media (max-width:768px) {
          .jobs-wrap { padding:16px !important; }
          .jobs-item { flex-direction:column !important; }
          .jobs-actions { flex-direction:row !important; min-width:unset !important; width:100%; }
          .jobs-actions button { flex:1; }
          .jobs-form-2 { grid-template-columns:1fr !important; }
        }
      `}</style>

      <div className="jobs-wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <button onClick={() => router.push('/admin/dashboard')} style={{ background: 'none', border: 'none', color: '#005B99', cursor: 'pointer', fontSize: '14px', fontWeight: '600', padding: 0, marginBottom: '6px', display: 'block' }}>← Dashboard</button>
            <h1 style={{ color: '#004070', fontSize: 'clamp(18px,3vw,24px)', margin: 0, fontFamily: 'Playfair Display, serif' }}>Jobs</h1>
          </div>
          <button onClick={openAdd} style={{ padding: '10px 20px', background: '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>+ Add Job</button>
        </div>

        {loading ? <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>Loading...</div>
          : jobs.length === 0 ? <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', color: '#999' }}>No jobs yet</div>
          : (
            <div className="jobs-list">
              {jobs.map((job: any) => (
                <div key={job.id} className="jobs-item">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: '700', color: '#004070', margin: 0 }}>{job.title_en}</h3>
                      <span style={{ ...typeColor(job.type), padding: '2px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>{job.type}</span>
                      {!job.is_active && <span style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>Inactive</span>}
                    </div>
                    {job.department_en && <p style={{ fontSize: '13px', color: '#005B99', fontWeight: '600', marginBottom: '4px' }}>🏥 {job.department_en}</p>}
                    {job.description_en && <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{job.description_en}</p>}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {job.experience_years && <span style={{ fontSize: '12px', color: '#94a3b8' }}>⭐ {job.experience_years}</span>}
                      {job.deadline && <span style={{ fontSize: '12px', color: '#94a3b8' }}>📅 {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                    </div>
                  </div>
                  <div className="jobs-actions">
                    <button onClick={() => openEdit(job)} style={{ padding: '8px', background: '#eff6ff', color: '#005B99', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => toggleActive(job.id, !job.is_active)} style={{ padding: '8px', background: job.is_active ? '#fef9c3' : '#dcfce7', color: job.is_active ? '#ca8a04' : '#15803d', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                      {job.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => handleDelete(job.id)} style={{ padding: '8px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Delete</button>
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
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#004070', margin: 0 }}>{editing ? 'Edit Job' : 'Add Job'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>
            <div style={{ padding: '20px 22px' }}>
              <div className="jobs-form-2" style={{ marginBottom: '14px' }}>
                <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Job Title *</label><input value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} style={inp} /></div>
                <div><label style={lbl}>Department</label><input value={form.department_en} onChange={e => setForm({ ...form, department_en: e.target.value })} style={inp} /></div>
                <div><label style={lbl}>Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inp}>
                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Experience</label><input value={form.experience_years} onChange={e => setForm({ ...form, experience_years: e.target.value })} placeholder="e.g. 3+ years" style={inp} /></div>
                <div><label style={lbl}>Deadline</label><input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} style={inp} /></div>
                <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Apply Email</label><input value={form.apply_email} onChange={e => setForm({ ...form, apply_email: e.target.value })} style={inp} /></div>
              </div>
              <div style={{ marginBottom: '12px' }}><label style={lbl}>Description</label><textarea value={form.description_en} onChange={e => setForm({ ...form, description_en: e.target.value })} style={{ ...inp, height: '80px', resize: 'vertical' }} /></div>
              <div style={{ marginBottom: '16px' }}><label style={lbl}>Requirements</label><textarea value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} style={{ ...inp, height: '80px', resize: 'vertical' }} /></div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#334155' }}>
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} /> Active (visible to applicants)
                </label>
              </div>
              <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '11px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '11px', background: saving ? '#94a3b8' : '#005B99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '14px' }}>
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Job'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}