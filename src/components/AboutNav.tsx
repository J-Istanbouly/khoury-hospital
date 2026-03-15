'use client'

export default function AboutNav() {
  return (
    <section style={{ background: 'white', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: '0', zIndex: 50 }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', gap: '0', overflowX: 'auto' }}>
        {[
          { label: 'Our Story', href: '#story' },
          { label: 'Mission & Vision', href: '#mission' },
          { label: 'By The Numbers', href: '#numbers' },
          { label: 'Leadership', href: '#leadership' },
          { label: 'Accreditations', href: '#accreditations' },
          { label: 'Why Choose Us', href: '#why' },
        ].map(item => (
          <a key={item.href} href={item.href} style={{
            padding: '18px 24px', fontSize: '13px', fontWeight: '600',
            color: '#666', textDecoration: 'none', whiteSpace: 'nowrap',
            borderBottom: '2px solid transparent'
          }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = '#005B99'; (e.target as HTMLElement).style.borderBottomColor = '#005B99' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = '#666'; (e.target as HTMLElement).style.borderBottomColor = 'transparent' }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </section>
  )
}