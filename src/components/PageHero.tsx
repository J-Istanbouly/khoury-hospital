import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumb?: BreadcrumbItem[]
  badge?: string
  image?: string
  actions?: React.ReactNode
}

export default function PageHero({ title, subtitle, breadcrumb, badge, image, actions }: PageHeroProps) {
  return (
    <section style={{ position: 'relative', minHeight: '420px', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0A2540' }}>
      <style>{`
        .ph-wrap { padding: 100px 48px 80px; width: 100%; max-width: 1160px; margin: 0 auto; position: relative; z-index: 3; }
        @media (max-width: 768px) { .ph-wrap { padding: 72px 20px 56px; } }
      `}</style>

      {/* BG IMAGE */}
      {image && (
        <img
          src={image}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, zIndex: 0 }}
        />
      )}

      {/* OVERLAYS */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(105deg, rgba(10,37,64,0.98) 0%, rgba(10,37,64,0.85) 50%, rgba(16,58,94,0.7) 100%)' }} />
      <div style={{ position: 'absolute', top: '-150px', right: '-100px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(31,106,165,0.25) 0%, transparent 65%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      {/* CIRCLE DECORATIONS */}
      <div style={{ position: 'absolute', top: '50%', right: '-180px', transform: 'translateY(-50%)', width: '560px', height: '560px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '50%', right: '-100px', transform: 'translateY(-50%)', width: '380px', height: '380px', borderRadius: '50%', border: '1px solid rgba(46,134,193,0.12)', zIndex: 1 }} />

      {/* BOTTOM LINE */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(46,134,193,0.5), transparent)', zIndex: 2 }} />

      {/* CONTENT */}
      <div className="ph-wrap">

        {/* BREADCRUMB */}
        {breadcrumb && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '22px', flexWrap: 'wrap' }}>
            {breadcrumb.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {i > 0 && <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>▶</span>}
                {item.href
                  ? <Link href={item.href} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontFamily: 'Inter, sans-serif', letterSpacing: '0.3px' }}>{item.label}</Link>
                  : <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', fontWeight: '500', letterSpacing: '0.3px' }}>{item.label}</span>
                }
              </span>
            ))}
          </nav>
        )}

        {/* BADGE */}
        {badge && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '22px', background: 'rgba(46,134,193,0.15)', border: '1px solid rgba(46,134,193,0.3)', padding: '6px 16px', borderRadius: '30px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2E86C1' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '700', color: '#5DADE2', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              {badge}
            </span>
          </div>
        )}

        {/* TITLE */}
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(34px, 5vw, 64px)',
          fontWeight: '700',
          color: 'white',
          lineHeight: '1.1',
          marginBottom: subtitle ? '18px' : '0',
          maxWidth: '780px',
          letterSpacing: '-1px',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}>
          {title}
        </h1>

        {/* SUBTITLE */}
        {subtitle && (
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: '1.85',
            maxWidth: '600px',
            marginBottom: actions ? '36px' : '0',
            fontWeight: '400',
          }}>
            {subtitle}
          </p>
        )}

        {/* ACTIONS */}
        {actions && (
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {actions}
          </div>
        )}
      </div>
    </section>
  )
}