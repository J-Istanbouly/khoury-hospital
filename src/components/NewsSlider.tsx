'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function NewsSlider({ news }: { news: any[] }) {
  const [current, setCurrent] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [perView, setPerView] = useState(2)

  useEffect(() => {
    setMounted(true)
    const fn = () => setPerView(window.innerWidth < 640 ? 1 : 2)
    fn()
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  if (!mounted || news.length === 0) return null

  const maxIndex = Math.max(0, news.length - perView)
  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1))
  const visible = news.slice(current, current + perView)

  return (
    <section style={{ padding: '80px 48px', background: 'white' }}>
      <style>{`
        .news-slider-pad { padding: 80px 48px; }
        @media (max-width: 640px) { .news-slider-pad { padding: 56px 20px !important; } }
      `}</style>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="news-slider-pad">

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px' }}>
          <div>
            <div style={{ width: '40px', height: '3px', background: 'var(--blue-600)', borderRadius: '2px', marginBottom: '14px' }} />
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: '700', color: 'var(--blue-900)', margin: 0, letterSpacing: '-0.5px' }}>NEWS</h2>
          </div>
          <Link href="/news" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--blue-600)', textDecoration: 'none', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            All news <span style={{ fontSize: '18px' }}>»</span>
          </Link>
        </div>

        {/* SLIDER */}
        <div style={{ position: 'relative' }}>
          {current > 0 && (
            <button onClick={prev} style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', background: 'white', border: '1.5px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--blue-600)', boxShadow: 'var(--shadow-sm)' }}>‹</button>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: perView === 2 ? 'repeat(2,1fr)' : '1fr', gap: '20px' }}>
            {visible.map((item: any) => (
              <Link key={item.id} href={`/news/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden', height: perView === 2 ? '360px' : '300px', cursor: 'pointer' }}>
                  {item.image_url
                    ? <img src={item.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.title_en} />
                    : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--blue-800), var(--blue-600))' }} />
                  }
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,91,153,0.2) 0%, rgba(0,40,80,0.88) 100%)' }} />
                  <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: 'white', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                    {item.category || 'News'}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }}>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', marginBottom: '8px', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
                      {new Date(item.published_at).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(15px,2vw,18px)', fontWeight: '700', color: 'white', lineHeight: '1.35', marginBottom: '10px' }}>
                      {item.title_en}
                    </h3>
                    {item.content_en && (
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.65', marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
                        {item.content_en}
                      </p>
                    )}
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', fontWeight: '700', fontFamily: 'Inter, sans-serif' }}>Read More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {current < maxIndex && (
            <button onClick={next} style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', background: 'white', border: '1.5px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--blue-600)', boxShadow: 'var(--shadow-sm)' }}>›</button>
          )}
        </div>

        {/* DOTS */}
        {news.length > perView && (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === current ? 'var(--blue-600)' : 'var(--gray-200)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}