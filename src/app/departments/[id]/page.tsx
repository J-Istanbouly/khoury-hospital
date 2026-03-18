import Link from 'next/link'

async function getDepartment(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/departments`, { cache: 'no-store' })
  const data = await res.json()
  return Array.isArray(data) ? data.find((d: any) => d.id === id) : null
}

async function getDivisions(departmentId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/divisions?department_id=${departmentId}`, { cache: 'no-store' })
  const data = await res.json()
  return Array.isArray(data) ? data : []
}

async function getDoctors(department: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/doctors`, { cache: 'no-store' })
  const data = await res.json()
  return Array.isArray(data) ? data.filter((d: any) => d.department?.toLowerCase() === department?.toLowerCase()) : []
}

export default async function DepartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const dept = await getDepartment(id)

  if (!dept) {
    return (
      <main style={{ fontFamily: 'sans-serif', padding: '80px 48px', textAlign: 'center' }}>
        <h1 style={{ color: '#004070' }}>Department not found</h1>
        <Link href="/departments" style={{ color: '#005B99', textDecoration: 'none', fontWeight: '700' }}>← Back to Departments</Link>
      </main>
    )
  }

  const [divisions, doctors] = await Promise.all([
    getDivisions(id),
    getDoctors(dept.name_en)
  ])

  return (
    <main style={{ fontFamily: 'sans-serif' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '360px', overflow: 'hidden', background: '#004070' }}>
        {dept.image_url && (
          <>
            <img src={dept.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} alt={dept.name_en} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,40,80,0.9) 0%, rgba(0,40,80,0.5) 100%)' }} />
          </>
        )}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 80px' }}>
          <div style={{ maxWidth: '700px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
              {' → '}
              <Link href="/departments" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Departments</Link>
              {' → '} {dept.name_en}
            </p>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', color: 'white', marginBottom: '12px' }}>
              {dept.name_en}
            </h1>
            {dept.description_en && (
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', maxWidth: '560px' }}>
                {dept.description_en}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* QUICK INFO BAR */}
      <section style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '0 48px' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', gap: '0', flexWrap: 'wrap' }}>
          {[
            dept.location && { icon: '📍', label: 'Location', value: dept.location },
            dept.extension && { icon: '📞', label: 'Extension', value: `Ext: ${dept.extension}` },
            dept.phone && { icon: '☎️', label: 'Phone', value: dept.phone },
            dept.working_hours && { icon: '🕐', label: 'Hours', value: dept.working_hours },
          ].filter(Boolean).map((item: any) => (
            <div key={item.label} style={{ padding: '20px 32px', borderLeft: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: '11px', color: '#999', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#004070' }}>{item.value}</div>
              </div>
            </div>
          ))}
          <div style={{ marginRight: 'auto' }} />
          <div style={{ padding: '16px 0', display: 'flex', alignItems: 'center' }}>
            <Link href="/appointments" style={{ background: '#005B99', color: 'white', padding: '10px 24px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '60px 48px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px', alignItems: 'start' }}>

        {/* MAIN CONTENT */}
        <div>

          {/* HEAD OF DEPARTMENT */}
          {dept.head_message && (
            <section style={{ marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '2px', color: '#005B99', marginBottom: '20px', textTransform: 'uppercase' }}>Message from the Chairman</p>
              <div style={{ background: '#f9f9f9', borderRadius: '16px', padding: '32px', border: '1px solid #e0e0e0', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{ width: '64px', height: '64px', background: '#004070', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', flexShrink: 0 }}>
                  👨‍⚕️
                </div>
                <div>
                  <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.85', fontStyle: 'italic', margin: '0 0 12px' }}>
                    "{dept.head_message}"
                  </p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#004070', margin: 0 }}>Head of Department</p>
                </div>
              </div>
            </section>
          )}

          {/* DIVISIONS */}
          {divisions.length > 0 && (
            <section style={{ marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '2px', color: '#005B99', marginBottom: '20px', textTransform: 'uppercase' }}>Divisions</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {divisions.map((div: any) => (
                  <div key={div.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#004070', marginBottom: '8px' }}>{div.name}</h3>
                    {div.description && <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.65', margin: 0 }}>{div.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SERVICES */}
          {dept.services && (
            <section style={{ marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '2px', color: '#005B99', marginBottom: '20px', textTransform: 'uppercase' }}>Services & Procedures</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {dept.services.split(',').map((s: string) => (
                  <div key={s} style={{ background: '#e8f1fb', color: '#004070', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>
                    {s.trim()}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EQUIPMENT */}
          {dept.equipment && (
            <section style={{ marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '2px', color: '#005B99', marginBottom: '20px', textTransform: 'uppercase' }}>Equipment & Technology</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {dept.equipment.split(',').map((e: string) => (
                  <div key={e} style={{ background: '#f0fdf4', color: '#15803d', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', border: '1px solid #bbf7d0' }}>
                    {e.trim()}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* DOCTORS */}
          {doctors.length > 0 && (
            <section style={{ marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '2px', color: '#005B99', marginBottom: '20px', textTransform: 'uppercase' }}>Our Doctors</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {doctors.map((doc: any) => (
                  <div key={doc.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                    <div style={{ height: '140px', background: 'linear-gradient(145deg, #e8f1fb, #d4eaf5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {doc.image_url
                        ? <img src={doc.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div style={{ fontSize: '48px', opacity: 0.4 }}>👨‍⚕️</div>
                      }
                    </div>
                    <div style={{ padding: '16px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#004070', marginBottom: '4px' }}>{doc.name_en}</h4>
                      <p style={{ fontSize: '12px', color: '#005B99', fontWeight: '600', marginBottom: '12px' }}>{doc.title}</p>
                      <Link href="/appointments" style={{ display: 'block', textAlign: 'center', padding: '8px', background: 'transparent', color: '#005B99', border: '1.5px solid #005B99', borderRadius: '6px', fontSize: '12px', fontWeight: '700', textDecoration: 'none' }}>
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* SIDEBAR */}
        <div style={{ position: 'sticky', top: '100px' }}>

          {/* BOOK APPOINTMENT */}
          <div style={{ background: '#004070', borderRadius: '16px', padding: '28px', marginBottom: '24px', color: 'white' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Book an Appointment</h3>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7', marginBottom: '20px' }}>
              Schedule a visit with our {dept.name_en} specialists today.
            </p>
            <Link href="/appointments" style={{ display: 'block', background: 'white', color: '#004070', padding: '13px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', fontSize: '14px', textAlign: 'center' }}>
              Book Appointment →
            </Link>
          </div>

          {/* CONTACT */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e0e0e0', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#004070', marginBottom: '16px' }}>Contact Department</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {dept.phone && (
                <a href={`tel:${dept.phone}`} style={{ display: 'flex', gap: '10px', alignItems: 'center', textDecoration: 'none', color: '#444', fontSize: '13px' }}>
                  <span style={{ fontSize: '16px' }}>📞</span> {dept.phone}
                </a>
              )}
              {dept.extension && (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#444', fontSize: '13px' }}>
                  <span style={{ fontSize: '16px' }}>🔢</span> Ext: {dept.extension}
                </div>
              )}
              {dept.location && (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#444', fontSize: '13px' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>📍</span> {dept.location}
                </div>
              )}
              {dept.working_hours && (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#444', fontSize: '13px' }}>
                  <span style={{ fontSize: '16px' }}>🕐</span> {dept.working_hours}
                </div>
              )}
            </div>
          </div>

          {/* PATIENT INFO */}
          {dept.patient_info && (
            <div style={{ background: '#fef9c3', borderRadius: '16px', padding: '24px', border: '1px solid #fde047' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#854d0e', marginBottom: '12px' }}>
                ℹ️ Before Your Visit
              </h3>
              <p style={{ fontSize: '13px', color: '#713f12', lineHeight: '1.75', margin: 0 }}>{dept.patient_info}</p>
            </div>
          )}
        </div>
      </div>

      {/* EMERGENCY CTA */}
      <section style={{ background: '#004070', padding: '48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>Need Emergency Care?</h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '24px' }}>Our emergency department is available 24/7</p>
        <a href="tel:+96188807000" style={{ background: 'white', color: '#004070', padding: '14px 32px', borderRadius: '8px', fontWeight: '800', textDecoration: 'none', fontSize: '16px' }}>
          📞 08 807 000
        </a>
      </section>

    </main>
  )
}
