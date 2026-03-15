'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

export default function HeroSlider({ slides }: { slides: any[] }) {
  const [current, setCurrent] = useState(0)
  const dragStart = useRef<number | null>(null)

  if (!slides.length) {
    return (
      <section style={{ height: '500px', background: 'linear-gradient(135deg, var(--blue-900), var(--blue-700))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,5vw,48px)', fontWeight: '700', marginBottom: '16px' }}>Khoury General Hospital</h1>
          <p style={{ fontSize: '16px', opacity: 0.7, marginBottom: '32px' }}>Providing exceptional healthcare since 1993</p>
          <Link href="/appointments" className="btn-white">Book Appointment</Link>
        </div>
      </section>
    )
  }

  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent(c => (c + 1) % slides.length)

  const handleMouseDown = (e: React.MouseEvent) => { dragStart.current = e.clientX }
  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStart.current === null) return
    const diff = dragStart.current - e.clientX
    if (diff > 50) next()
    else if (diff < -50) prev()
    dragStart.current = null
  }
  const handleTouchStart = (e: React.TouchEvent) => { dragStart.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStart.current === null) return
    const diff = dragStart.current - e.changedTouches[0].clientX
    if (diff > 50) next()
    else if (diff < -50) prev()
    dragStart.current = null
  }

  const s = slides[current]

  return (
    <>
      <style>{`
        .hero-wrap { position:relative; height:600px; overflow:hidden; cursor:grab; user-select:none; }
        .hero-inner { position:relative; z-index:2; height:100%; display:flex; align-items:center; padding:0 80px; }
        .hero-label { font-family:Inter,sans-serif; font-size:12px; font-weight:600; letter-spacing:3px; color:rgba(255,255,255,0.6); text-transform:uppercase; margin-bottom:16px; }
        .hero-title { font-family:'Playfair Display',serif; font-size:clamp(32px,5vw,60px); font-weight:700; color:white; line-height:1.15; margin-bottom:20px; }
        .hero-sub { font-family:Inter,sans-serif; font-size:16px; color:rgba(255,255,255,0.75); line-height:1.75; margin-bottom:36px; max-width:480px; }
        .hero-dots { position:absolute; bottom:28px; left:80px; display:flex; gap:8px; z-index:3; }
        @media (max-width: 768px) {
          .hero-wrap { height:440px !important; }
          .hero-inner { padding:0 20px !important; align-items:flex-end !important; padding-bottom:56px !important; }
          .hero-label { font-size:10px !important; letter-spacing:1.5px !important; margin-bottom:8px !important; }
          .hero-title { font-size:22px !important; margin-bottom:10px !important; }
          .hero-sub { font-size:13px !important; margin-bottom:18px !important; max-width:100% !important; }
          .hero-dots { bottom:16px !important; left:20px !important; }
        }
      `}</style>

      <section
        className="hero-wrap"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* MEDIA */}
        <div style={{ position: 'absolute', inset: 0, background: 'var(--blue-900)' }}>
          {s.media_url && s.media_url !== '' && (
            s.media_type === 'video' ? (
              <video src={s.media_url} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
            ) : (
              <img src={s.media_url} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} alt={s.title} draggable={false} />
            )
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,37,64,0.92) 0%, rgba(10,37,64,0.55) 60%, rgba(10,37,64,0.3) 100%)' }} />
        </div>

        {/* CONTENT */}
        <div className="hero-inner">
          <div style={{ maxWidth: '560px' }}>
            <p className="hero-label">Zahle, Bekaa — Lebanon</p>
            <h1 className="hero-title">{s.title}</h1>
            {s.subtitle && <p className="hero-sub">{s.subtitle}</p>}
            {s.button_text && s.button_link && (
              <Link href={s.button_link} className="btn-white" style={{ fontSize: '13px', padding: '10px 20px' }}>
                {s.button_text}
              </Link>
            )}
          </div>
        </div>

        {/* DOTS */}
        {slides.length > 1 && (
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '28px' : '8px', height: '8px', borderRadius: '4px', background: i === current ? 'white' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}