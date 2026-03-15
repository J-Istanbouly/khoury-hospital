'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminAppointments() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) { router.push('/admin/login'); return }
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    const data = await fetch('/api/appointments').then(r => r.json())
    setAppointments(Array.isArray(data) ? data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) : [])
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    setSaving(true)
    await fetch(`/api/appointments/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status, admin_notes: notes }) })
    setSaving(false); setSelectedId(null); setNotes(''); fetchAll()
  }

  const statusColor = (s: string) => {
    if (s === 'confirmed') return { bg: '#dcfce7', color: '#15803d' }
    if (s === 'rejected') return { bg: '#fee2e2', color: '#dc2626' }
    return { bg: '#fef9c3', color: '#ca8a04' }
  }

  const filtered = appointments.filter(a =>
    (!filter || a.status === filter) &&
    (!typeFilter || a.appointment_type === typeFilter)
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .apt-wrap { padding: 32px 40px; }
        .apt-toolbar { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:20px; align-items:center; }
        .apt-table { width:100%; border-collapse:collapse; background:white; border-radius:14px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.05); }
        .apt-table th { background:#f8fafc; padding:12px 14px; text-align:left; font-size:11px; font-weight:700; color:#64748b; text-transform:uppercase; border-bottom:1px solid #e2e8f0; }
        .apt-table td { padding:12px 14px; font-size:13px; color:#334155; border-bottom:1px solid #f1f5f9; vertical-align:middle; }
        .apt-table tr:last-child td { border-bottom:none; }
        .apt-scroll { overflow-x:auto; border-radius:14px; }
        @media (max-width:768px) {
          .apt-wrap { padding:16px !important; }
          .apt-toolbar { gap:8px; }
          .apt-table th, .apt-table td { padding:10px 10px !important; font-size:12px !important; }
          .apt-hide { display:none !important; }
        }
      `}</style>

      <div className="apt-wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <button onClick={() => router.push('/admin/dashboard')} style={{ background: 'none', border: 'none', color: '#005B99', cursor: 'pointer', fontSize: '14px', fontWeight: '600', padding: 0, marginBottom: '6px', display: 'block' }}>← Dashboard</button>
            <h1 style={{ color: '#004070', fontSize: 'clamp(18px,3vw,24px)', margin: 0, fontFamily: 'Playfair Display, serif' }}>Appointments</h1>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['', 'pending', 'confirmed', 'rejected'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                style={{ padding: '7px 14px', borderRadius: '20px', border: '1.5px solid', borderColor: filter === s ? '#005B99' : '#e2e8f0', background: filter === s ? '#005B99' : 'white', color: filter === s ? 'white' : '#64748b', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                {s || 'All'} {s === 'pending' && appointments.filter((a: any) => a.status === 'pending').length > 0 ? `(${appointments.filter((a: any) => a.status === 'pending').length})` : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="apt-toolbar">
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', background: 'white' }}>
            <option value="">All Types</option>
            <option value="First Visit">First Visit</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Emergency">Emergency</option>
          </select>
          <span style={{ fontSize: '13px', color: '#999' }}>{filtered.length} appointments</span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', color: '#999' }}>No appointments found</div>
        ) : (
          <div className="apt-scroll">
            <table className="apt-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th className="apt-hide">Type</th>
                  <th className="apt-hide">Doctor</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a: any) => (
                  <>
                    <tr key={a.id}>
                      <td>
                        <div style={{ fontWeight: '700', color: '#004070', marginBottom: '2px' }}>{a.patient_name}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{a.patient_phone}</div>
                      </td>
                      <td>
                        <div>{a.date}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{a.time_preference}</div>
                      </td>
                      <td className="apt-hide">{a.appointment_type}</td>
                      <td className="apt-hide" style={{ fontSize: '12px' }}>{a.doctor_id || '—'}</td>
                      <td>
                        <span style={{ ...statusColor(a.status), padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
                          {a.status}
                        </span>
                      </td>
                      <td>
                        {a.status === 'pending' ? (
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            <button onClick={() => updateStatus(a.id, 'confirmed')} style={{ padding: '5px 10px', background: '#dcfce7', color: '#15803d', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>✓</button>
                            <button onClick={() => updateStatus(a.id, 'rejected')} style={{ padding: '5px 10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>✕</button>
                            <button onClick={() => setSelectedId(selectedId === a.id ? null : a.id)} style={{ padding: '5px 10px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>📝</button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>{a.status}</span>
                        )}
                      </td>
                    </tr>
                    {selectedId === a.id && (
                      <tr key={`${a.id}-notes`}>
                        <td colSpan={6} style={{ background: '#f8fafc', padding: '12px 14px' }}>
                          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add notes..." style={{ flex: 1, minWidth: '200px', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', height: '60px', resize: 'vertical' }} />
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button onClick={() => updateStatus(a.id, 'confirmed')} disabled={saving} style={{ padding: '8px 14px', background: '#15803d', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>Confirm</button>
                              <button onClick={() => updateStatus(a.id, 'rejected')} disabled={saving} style={{ padding: '8px 14px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>Reject</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}