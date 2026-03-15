import Link from 'next/link'

export default function PatientsPage() {
  return (
    <main style={{ fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .pt-qa-item { display:flex; align-items:center; gap:12px; padding:20px 24px; border-left:1px solid var(--border); transition:background 0.2s; }
        .pt-qa-item:hover { background: var(--blue-50); }
        @media (max-width: 768px) {
          .pt-pad { padding: 48px 20px !important; }
          .pt-2 { grid-template-columns: 1fr !important; gap: 32px !important; }
          .pt-3 { grid-template-columns: 1fr !important; }
          .pt-4 { grid-template-columns: repeat(2,1fr) !important; }
          .pt-qa { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .pt-4 { grid-template-columns: 1fr !important; }
          .pt-qa { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ background: 'var(--blue-900)', padding: '80px 48px', position: 'relative', overflow: 'hidden' }} className="pt-pad">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(45,125,210,0.2) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1160px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link> {' → '} Patients & Visitors
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', color: 'white', marginBottom: '16px' }}>Patients & Visitors</h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', lineHeight: '1.8' }}>
            Everything you need to know before, during, and after your visit to Khoury General Hospital
          </p>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="pt-qa">
          {[
            { icon: '📋', title: 'Patient Rights', href: '#rights' },
            { icon: '🏨', title: 'Visitor Info', href: '#visitor' },
            { icon: '🛡️', title: 'Insurance', href: '#insurance' },
            { icon: '❓', title: 'FAQ', href: '#faq' },
          ].map(item => (
            <a key={item.href} href={item.href} className="pt-qa-item">
              <span style={{ fontSize: '22px' }}>{item.icon}</span>
              <span style={{ fontWeight: '700', color: 'var(--blue-800)', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>{item.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* PATIENT RIGHTS */}
      <section id="rights" style={{ padding: '80px 48px', background: 'var(--gray-50)' }} className="pt-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }} className="pt-2">
          <div>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase' }}>Your Rights</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '20px' }}>Patient Rights & Responsibilities</h2>
            <p style={{ fontSize: '14px', color: 'var(--gray-500)', lineHeight: '1.85', marginBottom: '20px' }}>At Khoury General Hospital, we are committed to respecting the dignity, privacy, and rights of every patient.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { title: 'Right to Respectful Care', desc: 'Receive considerate and respectful care regardless of your background, beliefs, or condition.' },
                { title: 'Right to Information', desc: 'Be fully informed about your diagnosis, treatment options, and any risks involved in your care.' },
                { title: 'Right to Privacy', desc: 'Your medical records and personal information are kept confidential and protected.' },
                { title: 'Right to Consent', desc: 'Give or withhold informed consent before any medical procedure is performed.' },
                { title: 'Right to Complaints', desc: 'Voice any concerns or complaints without fear of affecting the quality of your care.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue-500)', flexShrink: 0, marginTop: '6px' }} />
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--blue-900)', fontSize: '14px', marginBottom: '3px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.65' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase' }}>Your Responsibilities</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '20px' }}>Patient Responsibilities</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { title: 'Provide Accurate Information', desc: 'Share complete and accurate medical history, symptoms, and current medications with your care team.' },
                { title: 'Follow Treatment Plans', desc: 'Follow the treatment plan prescribed by your physician and ask questions if anything is unclear.' },
                { title: 'Respect Hospital Policies', desc: 'Adhere to hospital rules, visiting hours, and policies to ensure a safe environment for all.' },
                { title: 'Financial Obligations', desc: 'Fulfill your financial responsibilities promptly, including insurance documentation and payments.' },
                { title: 'Respectful Behavior', desc: 'Treat hospital staff, other patients, and visitors with courtesy and respect at all times.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#15803d', flexShrink: 0, marginTop: '6px' }} />
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--blue-900)', fontSize: '14px', marginBottom: '3px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.65' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISITOR INFO */}
      <section id="visitor" style={{ padding: '80px 48px', background: 'white' }} className="pt-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase' }}>Visiting Hours</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: '700', color: 'var(--blue-900)' }}>Visitor Information</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="pt-3">
            {[
              { icon: '🕐', title: 'Visiting Hours', items: ['General Wards: 10:00 AM – 12:00 PM', 'General Wards: 4:00 PM – 8:00 PM', 'ICU: 11:00 AM – 1:00 PM only', 'Maternity: 10:00 AM – 8:00 PM', 'Emergency: 24/7 (immediate family only)'] },
              { icon: '📋', title: 'What to Bring', items: ['Valid ID / Passport', 'Insurance card & policy number', 'List of current medications', 'Previous medical records', 'Emergency contact information'] },
              { icon: '🏥', title: 'Hospital Facilities', items: ['Cafeteria: Ground Floor (7AM–9PM)', 'Pharmacy: Open 24/7', 'ATM: Main Entrance Lobby', 'Parking: Available on site', 'Wheelchair: Available at entrance'] },
            ].map(section => (
              <div key={section.title} style={{ background: 'var(--gray-50)', borderRadius: 'var(--r-lg)', padding: '24px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{section.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '14px' }}>{section.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {section.items.map(item => (
                    <li key={item} style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.6', display: 'flex', gap: '8px' }}>
                      <span style={{ color: 'var(--blue-500)', fontWeight: '700', flexShrink: 0 }}>→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSURANCE */}
      <section id="insurance" style={{ padding: '80px 48px', background: 'var(--gray-50)' }} className="pt-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="pt-2">
          <div>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase' }}>Insurance</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '16px' }}>Insurance Pre-Approval</h2>
            <p style={{ fontSize: '14px', color: 'var(--gray-500)', lineHeight: '1.85', marginBottom: '20px' }}>Send the required documents 24-48 hours before your visit via WhatsApp.</p>
            <div style={{ background: 'var(--blue-50)', borderRadius: 'var(--r-md)', padding: '18px', marginBottom: '20px' }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '10px' }}>Required Documents:</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {['Copy of valid ID / Passport', 'Insurance card (front & back)', 'Doctor prescription or referral', 'Previous test results (if any)'].map(doc => (
                  <li key={doc} style={{ fontSize: '13px', color: 'var(--gray-700)', display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--blue-500)' }}>✓</span> {doc}
                  </li>
                ))}
              </ul>
            </div>
            <a href="https://wa.me/96188807000" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#25D366', color: 'white', padding: '12px 24px', borderRadius: 'var(--r-sm)', fontWeight: '700', fontSize: '14px' }}>
              📱 Send via WhatsApp
            </a>
          </div>
          <div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '16px' }}>Accepted Insurance Companies</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="pt-4">
              {['CNSS', 'Allianz SNA', 'AXA Middle East', 'Bancassurance', 'AIG', 'Medgulf', 'LIA Insurance', 'Solidarity'].map(ins => (
                <div key={ins} style={{ background: 'white', padding: '12px 16px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', fontSize: '13px', fontWeight: '600', color: 'var(--gray-700)', textAlign: 'center' }}>
                  {ins}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '80px 48px', background: 'white' }} className="pt-pad">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase' }}>FAQ</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: '700', color: 'var(--blue-900)' }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { q: 'How do I book an appointment?', a: 'You can book online through our website, call us at +961 8 807 000, or visit the hospital reception. Online booking is available 24/7.' },
              { q: 'What are the hospital visiting hours?', a: 'General wards: 10AM–12PM and 4PM–8PM. ICU: 11AM–1PM only. Maternity ward: 10AM–8PM. Emergency department is accessible 24/7 for immediate family.' },
              { q: 'Does the hospital accept insurance?', a: 'Yes, we accept all major Lebanese insurance companies including CNSS, Allianz SNA, AXA, and many more.' },
              { q: 'Where is the hospital located?', a: 'Khoury General Hospital is located on Brazil Street, Zahle, Bekaa – Lebanon. Parking is available on site.' },
              { q: 'Is the emergency department open 24/7?', a: 'Yes, our emergency department operates 24 hours a day, 7 days a week, including weekends and public holidays.' },
              { q: 'Can I get my medical records?', a: 'Yes, patients can request copies from the Medical Records department. Please bring a valid ID and allow 3-5 business days.' },
              { q: 'Does the hospital have a pharmacy?', a: 'Yes, our in-house pharmacy is open 24/7 on the ground floor near the main entrance.' },
            ].map((faq, i) => (
              <div key={i} style={{ background: 'var(--gray-50)', borderRadius: 'var(--r-md)', padding: '22px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '10px' }}>{faq.q}</h3>
                <p style={{ fontSize: '14px', color: 'var(--gray-500)', lineHeight: '1.75', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--blue-900)', padding: '64px 48px', textAlign: 'center' }} className="pt-pad">
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '700', color: 'white', marginBottom: '12px' }}>Ready to Visit Us?</h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', marginBottom: '28px' }}>Brazil Street, Zahle, Bekaa — Lebanon · +961 8 807 000</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/appointments" className="btn-white" style={{ fontSize: '14px' }}>Book Appointment</Link>
          <a href="tel:+96188807000" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'transparent', color: 'white', borderRadius: 'var(--r-sm)', fontSize: '14px', fontWeight: '600', border: '1.5px solid rgba(255,255,255,0.35)' }}>📞 Call Us</a>
        </div>
      </section>
    </main>
  )
}
