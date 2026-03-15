'use client'
import { useState } from 'react'

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      <style>{`
        .wa-wrap {
          position: fixed !important;
          bottom: 24px !important;
          right: 24px !important;
          z-index: 999999 !important;
          font-family: Inter, sans-serif;
        }
        .wa-popup {
          position: absolute;
          bottom: 64px;
          right: 0;
          width: 300px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.25);
          overflow: hidden;
          border: 1px solid #E2E8F0;
        }
        .wa-btn {
          width: 56px !important;
          height: 56px !important;
          border-radius: 50%;
          background: #25D366;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.6);
          font-size: 26px;
          color: white;
          position: relative;
        }
        .wa-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid #25D366;
          animation: wapulse 2s infinite;
          pointer-events: none;
        }
        @keyframes wapulse {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @media (max-width: 768px) {
          .wa-wrap { bottom: 16px !important; right: 16px !important; }
          .wa-popup { width: calc(100vw - 44px) !important; max-width: 290px !important; }
          .wa-btn { width: 52px !important; height: 52px !important; font-size: 22px !important; }
        }
      `}</style>

      <div className="wa-wrap">
        {open && (
          <div className="wa-popup">
            <div style={{ background: '#25D366', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🏥</div>
              <div>
                <div style={{ fontWeight: '700', color: 'white', fontSize: '13px' }}>Khoury General Hospital</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white', display: 'inline-block' }} />
                  Online — Typically replies instantly
                </div>
              </div>
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ background: '#F0F4F8', borderRadius: '0 12px 12px 12px', padding: '12px 14px', marginBottom: '14px' }}>
                <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6', margin: 0 }}>
                  👋 Hello! Welcome to <strong>Khoury General Hospital</strong>.<br /><br />
                  How can we help you today?
                </p>
                <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px', marginBottom: 0 }}>🕐 {time}</p>
              </div>
              <a
                href="https://wa.me/96188807000?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', width: '100%', padding: '11px', background: '#25D366', color: 'white', borderRadius: '10px', fontWeight: '700', fontSize: '13px', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}
              >
                💬 Start Chat on WhatsApp
              </a>
              <p style={{ fontSize: '11px', color: '#CBD5E1', textAlign: 'center', marginTop: '8px', marginBottom: 0 }}>
                Or call: <a href="tel:+96188807000" style={{ color: '#1F6AA5' }}>+961 8 807 000</a>
              </p>
            </div>
          </div>
        )}
        <button className="wa-btn" onClick={() => setOpen(!open)}>
          {open ? '✕' : '💬'}
        </button>
        {!open && <div className="wa-pulse" />}
      </div>
    </>
  )
}