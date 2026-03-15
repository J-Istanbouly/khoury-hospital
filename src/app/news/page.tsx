import Link from 'next/link'

async function getNews() {
  const res = await fetch('/api/news', { cache: 'no-store' })
  const data = await res.json()
  return Array.isArray(data) ? data.filter((n: any) => n.is_published !== false) : []
}

export default async function NewsPage() {
  const news = await getNews()
  const featured = news.filter((n: any) => n.is_featured)
  const regular = news.filter((n: any) => !n.is_featured)

  const catColor = (cat: string) => {
    if (cat === 'Event') return { bg: '#e0f2fe', color: '#0369a1' }
    if (cat === 'Achievement') return { bg: '#f0fdf4', color: '#15803d' }
    if (cat === 'Blog') return { bg: '#fdf4ff', color: '#9333ea' }
    return { bg: 'var(--blue-50)', color: 'var(--blue-600)' }
  }

  return (
    <main style={{ fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .news-card { transition: all 0.25s; }
        .news-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        @media (max-width: 768px) {
          .news-hero { padding: 56px 20px !important; }
          .news-featured { grid-template-columns: 1fr !important; }
          .news-grid { grid-template-columns: 1fr !important; }
          .news-pad { padding: 48px 20px !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ background: 'var(--blue-900)', padding: '80px 48px', position: 'relative', overflow: 'hidden' }} className="news-hero">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(45,125,210,0.2) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1160px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link> {' → '} News & Events
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', color: 'white', marginBottom: '16px' }}>News & Events</h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', lineHeight: '1.8' }}>
            Stay updated with the latest news, events, and achievements from Khoury General Hospital
          </p>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section style={{ padding: '60px 48px', background: 'white' }} className="news-pad">
          <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '24px', textTransform: 'uppercase' }}>Featured</p>
            <div style={{ display: 'grid', gridTemplateColumns: featured.length > 1 ? '2fr 1fr' : '1fr', gap: '24px' }} className="news-featured">
              {featured.slice(0, 2).map((item: any, i: number) => (
                <Link key={item.id} href={`/news/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="news-card" style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', height: '100%' }}>
                    {item.image_url
                      ? <img src={item.image_url} style={{ width: '100%', height: i === 0 ? '300px' : '180px', objectFit: 'cover' }} alt={item.title_en} />
                      : <div style={{ height: i === 0 ? '300px' : '180px', background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>📰</div>
                    }
                    <div style={{ padding: '22px' }}>
                      <span style={{ ...catColor(item.category), padding: '3px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>{item.category || 'News'}</span>
                      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: i === 0 ? '20px' : '16px', fontWeight: '700', color: 'var(--blue-900)', margin: '12px 0 8px', lineHeight: '1.4' }}>{item.title_en}</h2>
                      {item.content_en && i === 0 && (
                        <p style={{ fontSize: '14px', color: 'var(--gray-500)', lineHeight: '1.7', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.content_en}</p>
                      )}
                      <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>
                        {new Date(item.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ALL NEWS */}
      <section style={{ padding: '60px 48px', background: 'var(--gray-50)' }} className="news-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          {featured.length > 0 && <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '24px', textTransform: 'uppercase' }}>Latest News</p>}
          {news.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', color: 'var(--gray-400)', background: 'white', borderRadius: 'var(--r-lg)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📰</div>
              <p>No news published yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="news-grid">
              {regular.map((item: any) => (
                <Link key={item.id} href={`/news/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="news-card" style={{ background: 'white', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', height: '100%' }}>
                    {item.image_url
                      ? <img src={item.image_url} style={{ width: '100%', height: '180px', objectFit: 'cover' }} alt={item.title_en} />
                      : <div style={{ height: '180px', background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>📰</div>
                    }
                    <div style={{ padding: '20px' }}>
                      <span style={{ ...catColor(item.category), padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>{item.category || 'News'}</span>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '700', color: 'var(--blue-900)', margin: '10px 0 8px', lineHeight: '1.4' }}>{item.title_en}</h3>
                      {item.content_en && (
                        <p style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.65', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.content_en}</p>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--gray-100)' }}>
                        <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--blue-600)' }}>Read More →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
