import Link from 'next/link'

async function getNews() {
  const res = await fetch((process.env.NEXT_PUBLIC_BASE_URL||'http://localhost:3000')+'/api/news', { cache: 'no-store' })
  const data = await res.json()
  return Array.isArray(data) ? data : []
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const allNews = await getNews()
  const news = allNews.find((n: any) => n.id === id)
  const related = allNews.filter((n: any) => n.id !== id && n.is_published !== false).slice(0, 3)

  if (!news) {
    return (
      <main style={{ fontFamily: 'sans-serif', padding: '80px 48px', textAlign: 'center' }}>
        <h1 style={{ color: '#004070' }}>News not found</h1>
        <Link href="/news" style={{ color: '#005B99', textDecoration: 'none', fontWeight: '700' }}>← Back to News</Link>
      </main>
    )
  }

  const categoryColor = (cat: string) => {
    if (cat === 'Event') return { bg: '#e0f2fe', color: '#0369a1' }
    if (cat === 'Achievement') return { bg: '#f0fdf4', color: '#15803d' }
    if (cat === 'Blog') return { bg: '#fdf4ff', color: '#9333ea' }
    return { bg: '#e8f1fb', color: '#005B99' }
  }

  return (
    <main style={{ fontFamily: 'sans-serif' }}>

      {/* HERO IMAGE */}
      {news.image_url ? (
        <div style={{ height: '400px', overflow: 'hidden', position: 'relative' }}>
          <img src={news.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={news.title_en} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,40,80,0.7) 0%, transparent 60%)' }} />
        </div>
      ) : (
        <div style={{ height: '200px', background: '#004070' }} />
      )}

      {/* CONTENT */}
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px', alignItems: 'start' }}>

          {/* MAIN */}
          <div>
            {/* BREADCRUMB */}
            <p style={{ fontSize: '13px', color: '#999', margin: '32px 0 20px' }}>
              <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link>
              {' → '}
              <Link href="/news" style={{ color: '#999', textDecoration: 'none' }}>News</Link>
              {' → '} {news.title_en}
            </p>

            {/* CATEGORY + DATE */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ ...categoryColor(news.category), padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                {news.category || 'News'}
              </span>
              <span style={{ fontSize: '13px', color: '#999' }}>
                {new Date(news.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              {news.author && <span style={{ fontSize: '13px', color: '#999' }}>By <strong style={{ color: '#004070' }}>{news.author}</strong></span>}
            </div>

            {/* TITLE */}
            <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: '800', color: '#004070', marginBottom: '24px', lineHeight: '1.25' }}>
              {news.title_en}
            </h1>

            {/* CONTENT */}
            <div style={{ fontSize: '16px', color: '#444', lineHeight: '1.9', marginBottom: '48px' }}>
              {news.content_en?.split('\n').map((para: string, i: number) => (
                <p key={i} style={{ marginBottom: '16px' }}>{para}</p>
              ))}
            </div>

            {/* TAGS */}
            {news.tags && (
              <div style={{ paddingTop: '24px', borderTop: '1px solid #e0e0e0', marginBottom: '48px' }}>
                <span style={{ fontSize: '13px', color: '#999', marginRight: '12px' }}>Tags:</span>
                {news.tags.split(',').map((tag: string) => (
                  <span key={tag} style={{ background: '#f0f0f0', color: '#666', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginRight: '8px', display: 'inline-block', marginBottom: '8px' }}>
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* BACK */}
            <Link href="/news" style={{ color: '#005B99', textDecoration: 'none', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ← Back to News
            </Link>
          </div>

          {/* SIDEBAR */}
          <div style={{ paddingTop: '80px', position: 'sticky', top: '100px' }}>

            {/* BOOK CTA */}
            <div style={{ background: '#004070', borderRadius: '16px', padding: '28px', marginBottom: '24px', color: 'white' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Need Medical Advice?</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7', marginBottom: '20px' }}>
                Our specialists are available to help you.
              </p>
              <Link href="/appointments" style={{ display: 'block', background: 'white', color: '#004070', padding: '12px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', fontSize: '14px', textAlign: 'center' }}>
                Book Appointment →
              </Link>
            </div>

            {/* RELATED NEWS */}
            {related.length > 0 && (
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e0e0e0' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#004070', marginBottom: '16px' }}>Related News</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {related.map((item: any) => (
                    <Link key={item.id} href={`/news/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '12px' }}>
                      {item.image_url
                        ? <img src={item.image_url} style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                        : <div style={{ width: '64px', height: '64px', borderRadius: '8px', background: '#e8f1fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>📰</div>
                      }
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: '600', color: '#004070', lineHeight: '1.4', marginBottom: '4px' }}>{item.title_en}</p>
                        <p style={{ fontSize: '11px', color: '#999' }}>{new Date(item.published_at).toLocaleDateString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM PADDING */}
      <div style={{ height: '80px' }} />

    </main>
  )
}
