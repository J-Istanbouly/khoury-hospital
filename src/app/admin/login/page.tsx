'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 600))
    if (email === 'admin@khouryhospital.com' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        .login-wrap { display:grid; grid-template-columns:1fr 1fr; min-height:100vh; font-family:Inter,sans-serif; }
        .login-left { background:linear-gradient(145deg,#0A2540,#1A5276); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:48px; position:relative; overflow:hidden; }
        .login-right { display:flex; align-items:center; justify-content:center; padding:48px 40px; background:#F8FAFC; overflow-y:auto; }
        .login-inner { width:100%; max-width:400px; }
        .mobile-logo { display:none; text-align:center; margin-bottom:24px; }
        @media (max-width: 768px) {
          .login-wrap { grid-template-columns:1fr !important; }
          .login-left { display:none !important; }
          .login-right { padding:40px 24px !important; align-items:flex-start !important; min-height:100vh; }
          .mobile-logo { display:block !important; }
        }
      `}</style>

      <div className="login-wrap">

        {/* LEFT */}
        <div className="login-left">
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(46,134,193,0.15)' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <img src="/logo.jpg" alt="Khoury General Hospital" style={{ height: '90px', width: 'auto', objectFit: 'contain', marginBottom: '28px' }} />
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: '700', color: 'white', marginBottom: '10px', lineHeight: '1.2' }}>
              Khoury General Hospital
            </h1>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '44px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Zahle · Bekaa · Lebanon
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '300px', margin: '0 auto' }}>
              {[
                { num: '1993', label: 'Est.' },
                { num: 'Cat. A', label: 'MOH Certified' },
                { num: '15+', label: 'Departments' },
                { num: '24/7', label: 'Emergency' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>{s.num}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <div className="login-inner">

            {/* MOBILE LOGO */}
            <div className="mobile-logo">
              <img src="/logo.jpg" alt="Khoury General Hospital" style={{ height: '56px', width: 'auto', objectFit: 'contain', marginBottom: '10px' }} />
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', color: '#0A2540', margin: 0 }}>Khoury General Hospital</h2>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: '700', color: '#0A2540', marginBottom: '6px' }}>
                Admin Portal
              </h2>
              <p style={{ fontSize: '14px', color: '#94A3B8', fontFamily: 'Inter, sans-serif', margin: 0 }}>
                Sign in to manage the hospital website
              </p>
            </div>

            {error && (
              <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif' }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', outline: 'none', background: 'white', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                  onFocus={e => (e.target as HTMLElement).style.borderColor = '#1F6AA5'}
                  onBlur={e => (e.target as HTMLElement).style.borderColor = '#E2E8F0'}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', outline: 'none', background: 'white', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                  onFocus={e => (e.target as HTMLElement).style.borderColor = '#1F6AA5'}
                  onBlur={e => (e.target as HTMLElement).style.borderColor = '#E2E8F0'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '13px', background: loading ? '#94A3B8' : '#1F6AA5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
                onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#0A2540' }}
                onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#1F6AA5' }}
              >
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>

            <p style={{ marginTop: '24px', fontSize: '12px', color: '#CBD5E1', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
              Khoury General Hospital © {new Date().getFullYear()} — Admin Access Only
            </p>
          </div>
        </div>

      </div>
    </>
  )
}