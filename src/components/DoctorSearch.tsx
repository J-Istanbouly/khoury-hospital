'use client'

export default function DoctorSearch({ departments }: { departments: any[] }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '32px', border: '1px solid rgba(255,255,255,0.12)' }}>
      <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Search a Doctor</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          placeholder="Doctor name or specialty..."
          style={{ padding: '12px 16px', borderRadius: '8px', border: 'none', fontSize: '14px', outline: 'none' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const val = (e.target as HTMLInputElement).value
              window.location.href = `/doctors?search=${val}`
            }
          }}
        />
        <select
          style={{ padding: '12px 16px', borderRadius: '8px', border: 'none', fontSize: '14px', outline: 'none' }}
          onChange={(e) => { if (e.target.value) window.location.href = `/doctors?dept=${e.target.value}` }}>
          <option value="">All Departments</option>
          {departments.map((d: any) => (
            <option key={d.id} value={d.name_en}>{d.name_en}</option>
          ))}
        </select>
        <button
          style={{ padding: '13px', background: 'white', color: '#004070', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}
          onClick={() => window.location.href = '/doctors'}>
          Search →
        </button>
      </div>
    </div>
  )
}