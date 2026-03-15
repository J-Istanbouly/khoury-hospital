'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } else {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const inp = { width: '100%', padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-sm)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'Inter, sans-serif' }
  const lbl = { display: 'block', fontSize: '11px', fontWeight: '700' as const, color: 'var(--gray-500)', marginBottom: '7px', textTransform: 'uppercase' as const, letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif' }

  if (success) {
    return (
      <div style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '48px 32px', border: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '10px' }}>Message Sent!</h2>
        <p style={{ fontSize: '14px', color: 'var(--gray-500)', lineHeight: '1.8', marginBottom: '22px', fontFamily: 'Inter, sans-serif' }}>
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <button onClick={() => setSuccess(false)} className="btn-primary" style={{ fontSize: '14px' }}>
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '36px 32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}>
      <style>{`
        @media (max-width: 480px) {
          .cf-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '6px' }}>Send Us a Message</h2>
      <p style={{ fontSize: '13px', color: 'var(--gray-400)', marginBottom: '28px', fontFamily: 'Inter, sans-serif' }}>We'll respond within 24 hours</p>

      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }} className="cf-2">
          <div>
            <label style={lbl}>Full Name *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" required style={inp} />
          </div>
          <div>
            <label style={lbl}>Phone Number</label>
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+961 XX XXX XXX" style={inp} />
          </div>
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label style={lbl}>Email Address *</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@email.com" required style={inp} />
        </div>
        <div style={{ marginBottom: '22px' }}>
          <label style={lbl}>Message *</label>
          <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="How can we help you?" required style={{ ...inp, height: '130px', resize: 'vertical' }} />
        </div>
        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Sending...' : 'Send Message →'}
        </button>
      </form>
    </div>
  )
}