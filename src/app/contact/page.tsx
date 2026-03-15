import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <main style={{ fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .ct-strip { display:grid; grid-template-columns:repeat(4,1fr); }
        .ct-strip-item { padding:22px 24px; border-left:1px solid var(--border); }
        .ct-form-layout { display:grid; grid-template-columns:1fr 1fr; gap:40px; }
        @media (max-width: 1024px) {
          .ct-form-layout { grid-template-columns:1fr !important; }
        }
        @media (max-width: 768px) {
  .ct-strip { grid-template-columns: repeat(2,1fr) !important; }
  .ct-strip-item { padding: 14px 16px !important; }
}
        @media (max-width: 480px) {
          .ct-strip { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ background: 'var(--blue-900)', padding: '80px 48px', position: 'relative', overflow: 'hidden' }} className="ct-pad">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(45,125,210,0.2) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1160px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link> {' → '} Contact Us
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', color: 'white', marginBottom: '16px' }}>Contact Us</h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', lineHeight: '1.8' }}>
            We're here to help. Reach out for inquiries, appointments, or general information.
          </p>
        </div>
      </section>

      {/* INFO STRIP */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }} className="ct-strip">
          {[
            { icon: '📞', title: 'Phone', value: '+961 8 807 000', sub: '+961 8 811 181', href: 'tel:+96188807000' },
            { icon: '📠', title: 'Fax', value: '+961 8 804 960', sub: '+961 8 811 184', href: null },
            { icon: '✉️', title: 'Email', value: 'info@khouryhospital.com', sub: null, href: 'mailto:info@khouryhospital.com' },
            { icon: '📍', title: 'Address', value: 'Brazil Street, Zahle', sub: 'Bekaa — Lebanon', href: null },
          ].map(item => (
            <div key={item.title} className="ct-strip-item">
              <div style={{ fontSize: '22px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>{item.title}</div>
              {item.href
                ? <a href={item.href} style={{ fontSize: '14px', fontWeight: '700', color: 'var(--blue-800)', display: 'block', fontFamily: 'Inter, sans-serif' }}>{item.value}</a>
                : <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--blue-800)', fontFamily: 'Inter, sans-serif' }}>{item.value}</div>
              }
              {item.sub && <div style={{ fontSize: '13px', color: 'var(--gray-500)', marginTop: '2px', fontFamily: 'Inter, sans-serif' }}>{item.sub}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section style={{ padding: '80px 48px', background: 'var(--gray-50)' }} className="ct-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div className="ct-form-layout">

            <ContactForm />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* MAP */}
              <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', height: '240px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.5!2d35.8957!3d33.8530!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f353dd7df9b5b%3A0xd519c9361ac75c78!2sKhoury%20General%20Hospital!5e0!3m2!1sen!2slb!4v1234567890"
                  width="100%" height="240" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy"
                />
              </div>

              {/* EMERGENCY */}
              <div style={{ background: '#c0392b', borderRadius: 'var(--r-lg)', padding: '22px', color: 'white', textAlign: 'center' }}>
                <div style={{ fontSize: '26px', marginBottom: '8px' }}>🚨</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: '700', marginBottom: '6px' }}>Emergency?</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>
                  Our emergency department is open 24/7.
                </p>
                <a href="tel:+96188807000" style={{ display: 'block', background: 'white', color: '#c0392b', padding: '11px', borderRadius: '8px', fontWeight: '800', fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>
                  📞 08 807 000
                </a>
              </div>

              {/* EXTENSIONS */}
              <div style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '20px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '12px' }}>Department Extensions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {[
                    { dept: 'Emergency', ext: '100' },
                    { dept: 'Cardiology', ext: '201' },
                    { dept: 'Surgery', ext: '301' },
                    { dept: 'Maternity', ext: '401' },
                    { dept: 'Laboratory', ext: '501' },
                    { dept: 'Radiology', ext: '601' },
                  ].map(item => (
                    <div key={item.dept} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', paddingBottom: '7px', borderBottom: '1px solid var(--gray-100)', fontFamily: 'Inter, sans-serif' }}>
                      <span style={{ color: 'var(--gray-700)', fontWeight: '500' }}>{item.dept}</span>
                      <span style={{ color: 'var(--blue-600)', fontWeight: '700' }}>Ext: {item.ext}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHATSAPP */}
              <div style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '20px', border: '1px solid var(--border)', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '6px' }}>Chat on WhatsApp</h3>
                <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>Send us a message for quick responses</p>
                <a href="https://wa.me/96188807000" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', background: '#25D366', color: 'white', padding: '11px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                  📱 Open WhatsApp
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}