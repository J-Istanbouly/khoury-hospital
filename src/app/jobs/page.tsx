import Link from 'next/link'

async function getJobs() {
  try {
    const res = await fetch((process.env.NEXT_PUBLIC_BASE_URL||'http://localhost:3000')+'/api/jobs', { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data.filter((j: any) => j.is_active !== false) : []
  } catch { return [] }
}

export default async function JobsPage() {
  const jobs = await getJobs()

  const typeColor = (type: string) => {
    if (type === 'Part-time') return { bg: '#e0f2fe', color: '#0369a1' }
    if (type === 'Contract') return { bg: '#fdf4ff', color: '#9333ea' }
    if (type === 'Internship') return { bg: '#fef9c3', color: '#ca8a04' }
    return { bg: '#f0fdf4', color: '#15803d' }
  }

  return (
    <main style={{ fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @media (max-width: 768px) {
          .jobs-pad { padding: 48px 20px !important; }
          .jobs-4 { grid-template-columns: repeat(2,1fr) !important; }
          .jobs-item { flex-direction: column !important; }
          .jobs-item-actions { width: 100% !important; min-width: unset !important; }
        }
        @media (max-width: 480px) {
          .jobs-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ background: 'var(--blue-900)', padding: '80px 48px', position: 'relative', overflow: 'hidden' }} className="jobs-pad">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(45,125,210,0.2) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1160px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link> {' → '} Careers
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', color: 'white', marginBottom: '16px' }}>Join Our Team</h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', lineHeight: '1.8' }}>
            Be part of a team dedicated to excellence in healthcare. We're always looking for talented professionals.
          </p>
        </div>
      </section>

      {/* WHY JOIN */}
      <section style={{ padding: '80px 48px', background: 'white' }} className="jobs-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '12px', textTransform: 'uppercase' }}>Why Khoury</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: '700', color: 'var(--blue-900)' }}>Why Work With Us?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }} className="jobs-4">
            {[
              { icon: '🏆', title: 'Excellence', desc: 'Work in a Category A certified hospital with the highest standards in the Bekaa region.' },
              { icon: '📈', title: 'Growth', desc: 'Continuous learning, training programs, and clear career advancement paths.' },
              { icon: '🤝', title: 'Team Spirit', desc: 'Join a supportive team of 230+ dedicated healthcare professionals.' },
              { icon: '💙', title: 'Impact', desc: 'Make a real difference in the lives of thousands of patients every year.' },
            ].map(item => (
              <div key={item.title} style={{ textAlign: 'center', padding: '28px 18px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ fontSize: '36px', marginBottom: '14px' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: '700', color: 'var(--blue-900)', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.7', fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOBS LIST */}
      <section style={{ padding: '80px 48px', background: 'var(--gray-50)' }} className="jobs-pad">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--blue-500)', marginBottom: '10px', textTransform: 'uppercase' }}>Open Positions</p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: '700', color: 'var(--blue-900)', margin: 0 }}>Current Job Openings</h2>
            </div>
            <span style={{ fontSize: '14px', color: 'var(--gray-500)', fontFamily: 'Inter, sans-serif' }}>
              <strong style={{ color: 'var(--blue-900)' }}>{jobs.length}</strong> position{jobs.length !== 1 ? 's' : ''} available
            </span>
          </div>

          {jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', color: 'var(--gray-400)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💼</div>
              <h3 style={{ color: 'var(--blue-900)', marginBottom: '8px', fontFamily: 'Playfair Display, serif' }}>No Open Positions Right Now</h3>
              <p style={{ marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>We're always interested in talented people.</p>
              <a href="mailto:hr@khouryhospital.com" className="btn-primary">Send Your CV Anyway</a>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {jobs.map((job: any) => (
                <div key={job.id} style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }} className="jobs-item">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', color: 'var(--blue-900)', margin: 0 }}>{job.title_en}</h3>
                      <span style={{ ...typeColor(job.type), padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', fontFamily: 'Inter, sans-serif' }}>{job.type}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      {job.department_en && <span style={{ fontSize: '13px', color: 'var(--blue-600)', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>🏥 {job.department_en}</span>}
                      {job.experience_years && <span style={{ fontSize: '13px', color: 'var(--gray-500)', fontFamily: 'Inter, sans-serif' }}>⭐ {job.experience_years}</span>}
                      {job.deadline && <span style={{ fontSize: '13px', color: 'var(--gray-500)', fontFamily: 'Inter, sans-serif' }}>📅 Deadline: {new Date(job.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
                    </div>
                    {job.description_en && <p style={{ fontSize: '14px', color: 'var(--gray-500)', lineHeight: '1.7', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>{job.description_en}</p>}
                    {job.requirements && (
                      <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--r-sm)', padding: '12px 14px' }}>
                        <p style={{ fontSize: '11px', fontWeight: '700', color: 'var(--gray-500)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif' }}>Requirements</p>
                        <p style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.7', margin: 0, fontFamily: 'Inter, sans-serif' }}>{job.requirements}</p>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '150px' }} className="jobs-item-actions">
                    <a href={`mailto:${job.apply_email || 'hr@khouryhospital.com'}?subject=Application for ${job.title_en}`} className="btn-primary" style={{ fontSize: '13px', padding: '11px 18px', justifyContent: 'center' }}>
                      Apply Now →
                    </a>
                    <p style={{ fontSize: '11px', color: 'var(--gray-400)', textAlign: 'center', margin: 0, fontFamily: 'Inter, sans-serif' }}>{job.apply_email || 'hr@khouryhospital.com'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--blue-900)', padding: '64px 48px', textAlign: 'center' }} className="jobs-pad">
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '700', color: 'white', marginBottom: '12px' }}>Don't See the Right Position?</h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', marginBottom: '28px', maxWidth: '500px', margin: '0 auto 28px', fontFamily: 'Inter, sans-serif' }}>
          We're always interested in talented healthcare professionals. Send us your CV.
        </p>
        <a href="mailto:hr@khouryhospital.com?subject=Spontaneous Application" className="btn-white" style={{ fontSize: '14px' }}>Send Your CV →</a>
      </section>
    </main>
  )
}
