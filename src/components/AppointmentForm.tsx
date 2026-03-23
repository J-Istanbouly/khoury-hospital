'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function AppointmentForm({ doctors, departments }: { doctors: any[], departments: any[] }) {
  const searchParams = useSearchParams()
  const doctorFromUrl = searchParams.get('doctor')

  const [form, setForm] = useState({
    patient_name: '', patient_phone: '', patient_email: '',
    department_id: '', doctor_id: '', date: '',
    appointment_type: 'First Visit', time_preference: 'Morning',
    insurance: '', reason: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

useEffect(() => {
    if (doctorFromUrl && doctors.length > 0 && departments.length > 0) {
      const doc = doctors.find((d: any) => d.id === doctorFromUrl)
      if (doc) {
        const dept = departments.find((dep: any) => 
          dep.name_en?.toLowerCase().trim() === doc.department?.toLowerCase().trim()
        )
        setForm(f => ({ 
          ...f, 
          doctor_id: doctorFromUrl, 
          department_id: dept?.id || '' 
        }))
      }
    }
  }, [doctorFromUrl, doctors.length, departments.length])

  const filteredDoctors = form.department_id
    ? doctors.filter((d: any) => {
        const dept = departments.find((dep: any) => dep.id === form.department_id)
        return dept ? d.department?.toLowerCase() === dept.name_en?.toLowerCase() : true
      })
    : doctors

  const preSelectedDoctor = doctorFromUrl ? doctors.find((d: any) => d.id === doctorFromUrl) : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setSuccess(true)
        setForm({ patient_name: '', patient_phone: '', patient_email: '', department_id: '', doctor_id: '', date: '', appointment_type: 'First Visit', time_preference: 'Morning', insurance: '', reason: '' })
      } else {
        setError('Something went wrong. Please try again or call us directly.')
      }
    } catch {
      setError('Network error. Please call us at +961 8 807 000.')
    }
    setLoading(false)
  }

  const inp: React.CSSProperties = { width: '100%', padding: '11px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-sm)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', background: 'white' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--gray-500)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif' }

  if (success) {
    return (
      <div style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '56px 32px', border: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ fontSize: '56px', marginBottom: '20px' }}>✅</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '12px' }}>Request Received!</h2>
        <p style={{ fontSize: '14px', color: 'var(--gray-500)', lineHeight: '1.8', marginBottom: '28px', maxWidth: '380px', margin: '0 auto 28px', fontFamily: 'Inter, sans-serif' }}>
          Our team will contact you within 24 hours to confirm your appointment.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setSuccess(false)} className="btn-primary" style={{ fontSize: '14px' }}>Book Another</button>
          <a href="tel:+96188807000" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', background: 'var(--gray-100)', color: 'var(--blue-900)', borderRadius: 'var(--r-sm)', fontWeight: '700', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>📞 Call Us</a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}>
      <style>{`
        .af-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        @media (max-width: 580px) { .af-2 { grid-template-columns:1fr !important; } }
      `}</style>

      {/* PRE-SELECTED DOCTOR BANNER */}
      {preSelectedDoctor && (
        <div style={{ background: 'var(--blue-50)', border: '1.5px solid var(--blue-100)', borderRadius: 'var(--r-md)', padding: '14px 18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--blue-200)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {preSelectedDoctor.image_url
              ? <img src={preSelectedDoctor.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={preSelectedDoctor.name_en} />
              : <span style={{ fontSize: '20px', opacity: 0.4 }}>👨‍⚕️</span>
            }
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: '700', color: 'var(--blue-900)', fontSize: '14px' }}>{preSelectedDoctor.name_en}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--blue-600)' }}>{preSelectedDoctor.title} · {preSelectedDoctor.department}</div>
          </div>
          <div style={{ background: 'var(--blue-600)', color: 'white', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>
            ✓ Selected
          </div>
        </div>
      )}

      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '4px' }}>Book Your Appointment</h2>
      <p style={{ fontSize: '13px', color: 'var(--gray-400)', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>Fill in the form — we'll confirm within 24 hours</p>

      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px 14px', borderRadius: '8px', marginBottom: '18px', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* PERSONAL */}
        <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase', borderBottom: '1px solid var(--gray-100)', paddingBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
          Personal Information
        </p>
        <div className="af-2" style={{ marginBottom: '14px' }}>
          <div>
            <label style={lbl}>Full Name *</label>
            <input value={form.patient_name} onChange={e => setForm({ ...form, patient_name: e.target.value })} placeholder="John Doe" required style={inp} />
          </div>
          <div>
            <label style={lbl}>Phone Number *</label>
            <input value={form.patient_phone} onChange={e => setForm({ ...form, patient_phone: e.target.value })} placeholder="+961 XX XXX XXX" required style={inp} />
          </div>
          <div>
            <label style={lbl}>Email Address</label>
            <input type="email" value={form.patient_email} onChange={e => setForm({ ...form, patient_email: e.target.value })} placeholder="john@email.com" style={inp} />
          </div>
          <div>
            <label style={lbl}>Insurance Company</label>
            <input value={form.insurance} onChange={e => setForm({ ...form, insurance: e.target.value })} placeholder="CNSS, AXA, Allianz..." style={inp} />
          </div>
        </div>

        {/* APPOINTMENT */}
        <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase', borderBottom: '1px solid var(--gray-100)', paddingBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
          Appointment Details
        </p>
        <div className="af-2" style={{ marginBottom: '14px' }}>
          <div>
            <label style={lbl}>Department</label>
            <select 
  value={form.department_id} 
  onChange={e => setForm({ ...form, department_id: e.target.value, doctor_id: preSelectedDoctor ? form.doctor_id : '' })} 
  style={{ ...inp, background: preSelectedDoctor ? 'var(--blue-50)' : 'white', color: preSelectedDoctor ? 'var(--blue-800)' : 'inherit' }}
  disabled={!!preSelectedDoctor}
>
              <option value="">Select Department</option>
              {departments.map((d: any) => <option key={d.id} value={d.id}>{d.name_en}</option>)}
            </select>
          </div>

          <div>
            <label style={lbl}>Doctor</label>
            {preSelectedDoctor ? (
              <div style={{ ...inp, background: 'var(--blue-50)', borderColor: 'var(--blue-100)', color: 'var(--blue-800)', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{preSelectedDoctor.name_en}</span>
                <button type="button" onClick={() => { window.location.href = '/appointments' }} style={{ background: 'none', border: 'none', fontSize: '11px', color: 'var(--blue-500)', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  Change
                </button>
              </div>
            ) : (
              <select value={form.doctor_id} onChange={e => setForm({ ...form, doctor_id: e.target.value })} style={inp}>
                <option value="">Any Available Doctor</option>
                {filteredDoctors.map((d: any) => <option key={d.id} value={d.id}>{d.name_en}</option>)}
              </select>
            )}
          </div>

          <div>
            <label style={lbl}>Preferred Date *</label>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required min={new Date().toISOString().split('T')[0]} style={inp} />
          </div>
          <div>
            <label style={lbl}>Time Preference</label>
            <select value={form.time_preference} onChange={e => setForm({ ...form, time_preference: e.target.value })} style={inp}>
              <option value="Morning">Morning (8AM – 12PM)</option>
              <option value="Afternoon">Afternoon (12PM – 4PM)</option>
              <option value="Evening">Evening (4PM – 8PM)</option>
            </select>
          </div>
          <div>
            <label style={lbl}>Appointment Type</label>
            <select value={form.appointment_type} onChange={e => setForm({ ...form, appointment_type: e.target.value })} style={inp}>
              <option value="First Visit">First Visit</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <label style={lbl}>Reason for Visit</label>
          <textarea value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="Brief description of your symptoms or reason for visit..." style={{ ...inp, height: '88px', resize: 'vertical' }} />
        </div>

        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Submitting...' : 'Request Appointment →'}
        </button>
        <p style={{ fontSize: '12px', color: 'var(--gray-400)', textAlign: 'center', marginTop: '10px', fontFamily: 'Inter, sans-serif' }}>
          We'll contact you within 24 hours to confirm.
        </p>
      </form>
    </div>
  )
}