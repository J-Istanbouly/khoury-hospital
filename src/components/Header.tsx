'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useLang, Language } from '@/lib/lang/LanguageContext'

const LANGS = [
  { code: 'en' as Language, label: 'EN', full: 'English', flag: '🇬🇧' },
  { code: 'ar' as Language, label: 'ع', full: 'العربية', flag: '🇱🇧' },
  { code: 'fr' as Language, label: 'FR', full: 'Français', flag: '🇫🇷' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const lastScroll = useRef(0)
  const { lang, setLang, t } = useLang()
  const currentLang = LANGS.find(l => l.code === lang)!

  useEffect(() => {
    const fn = () => {
      const current = window.scrollY
      setScrolled(current > 10)
      if (current > lastScroll.current && current > 100) {
        setHidden(true)
        setMobileOpen(false)
        setLangOpen(false)
      } else {
        setHidden(false)
      }
      lastScroll.current = current
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.departments, href: '/departments' },
    { label: t.nav.doctors, href: '/doctors' },
    { label: t.nav.patients, href: '/patients' },
    { label: t.nav.news, href: '/news' },
    { label: t.nav.jobs, href: '/jobs' },
    { label: t.nav.contact, href: '/contact' },
  ]

  const TOP_BAR_H = 36
  const NAV_H_DESKTOP = 72
  const NAV_H_MOBILE = 60

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .kh-topbar { position: fixed; top: 0; left: 0; right: 0; z-index: 500; background: #0A2540; height: ${TOP_BAR_H}px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; transition: transform 0.3s ease; }
        .kh-topbar.hidden { transform: translateY(-100%); }
        .kh-topbar-left { display: flex; align-items: center; gap: 0; }
        .kh-topbar-item { display: flex; align-items: center; gap: 5px; color: rgba(255,255,255,0.75); font-size: 12px; font-family: 'Inter', sans-serif; text-decoration: none; padding: 0 12px; transition: color 0.2s; white-space: nowrap; }
        .kh-topbar-item:first-child { padding-left: 0; }
        .kh-topbar-item:hover { color: white; }
        .kh-topbar-sep { width: 1px; height: 14px; background: rgba(255,255,255,0.18); flex-shrink: 0; }
        .kh-topbar-badge { background: rgba(31,106,165,0.4); color: rgba(255,255,255,0.9); font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; font-family: 'Inter', sans-serif; white-space: nowrap; }
        .kh-nav { position: fixed; top: ${TOP_BAR_H}px; left: 0; right: 0; z-index: 499; background: white; border-bottom: 1px solid #E2E8F0; height: ${NAV_H_DESKTOP}px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .kh-nav.scrolled { box-shadow: 0 4px 24px rgba(10,37,64,0.10); }
        .kh-nav.hidden { transform: translateY(calc(-100% - ${TOP_BAR_H}px)); }
        .kh-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0; }
        .kh-logo img { height: 48px; width: auto; object-fit: contain; display: block; }
        .kh-logo-divider { width: 1px; height: 36px; background: #E2E8F0; flex-shrink: 0; }
        .kh-logo-text {}
        .kh-logo-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 16px; color: #0A2540; line-height: 1.2; white-space: nowrap; }
        .kh-logo-sub { font-family: 'Inter', sans-serif; font-size: 9.5px; font-weight: 500; color: #94A3B8; letter-spacing: 1.8px; text-transform: uppercase; margin-top: 2px; white-space: nowrap; }
        .kh-links { display: flex; align-items: center; gap: 0; }
        .kh-link { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #475569; padding: 8px 12px; border-radius: 7px; text-decoration: none; white-space: nowrap; transition: color 0.18s, background 0.18s; }
        .kh-link:hover { color: #1F6AA5; background: #EBF5FB; }
        .kh-cta { display: inline-flex; align-items: center; padding: 9px 18px; background: #1F6AA5; color: white; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; border-radius: 8px; text-decoration: none; white-space: nowrap; box-shadow: 0 4px 14px rgba(31,106,165,0.30); transition: background 0.2s, box-shadow 0.2s; flex-shrink: 0; }
        .kh-cta:hover { background: #0A2540; box-shadow: 0 6px 20px rgba(10,37,64,0.25); }
        .kh-lang-btn { display: flex; align-items: center; gap: 5px; padding: 6px 10px; background: transparent; border: 1.5px solid #E2E8F0; border-radius: 8px; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; color: #334155; transition: all 0.18s; white-space: nowrap; flex-shrink: 0; }
        .kh-lang-btn:hover { border-color: #1F6AA5; color: #1F6AA5; }
        .kh-lang-arrow { font-size: 9px; opacity: 0.6; display: inline-block; transition: transform 0.2s; }
        .kh-lang-arrow.open { transform: rotate(180deg); }
        .kh-lang-dropdown { position: absolute; top: calc(100% + 8px); right: 0; z-index: 999; background: white; border: 1px solid #E2E8F0; border-radius: 10px; box-shadow: 0 8px 24px rgba(10,37,64,0.12); min-width: 140px; overflow: hidden; }
        .kh-lang-opt { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 16px; background: transparent; border: none; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 13px; color: #334155; text-align: left; transition: background 0.15s; }
        .kh-lang-opt:hover { background: #F8FAFC; }
        .kh-lang-opt.active { background: #EBF5FB; color: #1F6AA5; font-weight: 700; }
        .kh-hamburger { display: none; align-items: center; justify-content: center; width: 40px; height: 40px; background: none; border: 1.5px solid #E2E8F0; border-radius: 8px; cursor: pointer; color: #1F6AA5; font-size: 18px; flex-shrink: 0; transition: background 0.18s, border-color 0.18s; }
        .kh-hamburger:hover { background: #EBF5FB; border-color: #1F6AA5; }
        .kh-mobile-menu { position: fixed; top: ${TOP_BAR_H + NAV_H_MOBILE}px; left: 0; right: 0; z-index: 498; background: white; border-bottom: 1px solid #E2E8F0; box-shadow: 0 12px 40px rgba(10,37,64,0.12); padding: 8px 16px 16px; max-height: calc(100vh - ${TOP_BAR_H + NAV_H_MOBILE}px); overflow-y: auto; }
        .kh-mobile-link { display: flex; align-items: center; padding: 11px 14px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: #334155; border-radius: 8px; text-decoration: none; transition: background 0.15s, color 0.15s; }
        .kh-mobile-link:hover { background: #EBF5FB; color: #1F6AA5; }
        .kh-mobile-cta { display: block; text-align: center; padding: 13px; background: #1F6AA5; color: white; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; margin-top: 10px; text-decoration: none; box-shadow: 0 4px 14px rgba(31,106,165,0.30); }
        .kh-mobile-lang { display: flex; gap: 8px; padding: 12px 14px; border-top: 1px solid #E2E8F0; margin-top: 8px; }
        .kh-mobile-lang-btn { flex: 1; padding: 8px; border-radius: 8px; border: 1.5px solid #E2E8F0; background: transparent; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; color: #334155; text-align: center; transition: all 0.18s; }
        .kh-mobile-lang-btn.active { background: #EBF5FB; border-color: #1F6AA5; color: #1F6AA5; }
        @media (max-width: 1024px) { .kh-links { display: none !important; } .kh-cta { display: none !important; } .kh-lang-desktop { display: none !important; } .kh-hamburger { display: flex !important; } }
        @media (max-width: 768px) { .kh-topbar { padding: 0 16px; } .kh-topbar-item.hide-mobile { display: none !important; } .kh-topbar-sep.hide-mobile { display: none !important; } .kh-topbar-badge { display: none !important; } .kh-nav { height: ${NAV_H_MOBILE}px !important; padding: 0 16px !important; } .kh-logo img { height: 38px !important; } .kh-logo-divider { height: 28px !important; } .kh-logo-name { font-size: 13.5px !important; } .kh-logo-sub { display: none !important; } }
        @media (max-width: 380px) { .kh-logo img { height: 32px !important; } .kh-logo-name { font-size: 12px !important; } .kh-logo-divider { display: none !important; } }
      `}</style>

      <div className={`kh-topbar${hidden ? ' hidden' : ''}`}>
        <div className="kh-topbar-left">
          <a href="tel:+96188807000" className="kh-topbar-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 5.91 5.91l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +961 8 807 000
          </a>
          <div className="kh-topbar-sep hide-mobile" />
          <a href="tel:+96188811181" className="kh-topbar-item hide-mobile">+961 8 811 181</a>
          <div className="kh-topbar-sep hide-mobile" />
          <a href="mailto:info@khouryhospital.com" className="kh-topbar-item hide-mobile">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            info@khouryhospital.com
          </a>
        </div>
        <span className="kh-topbar-badge">🏆 Category A</span>
      </div>

      <nav className={`kh-nav${scrolled ? ' scrolled' : ''}${hidden ? ' hidden' : ''}`}>
        <Link href="/" className="kh-logo">
          <img src="/logo.jpg" alt="Khoury General Hospital" />
          <div className="kh-logo-divider" />
          <div className="kh-logo-text">
            <div className="kh-logo-name">Khoury General Hospital</div>
            <div className="kh-logo-sub">Zahle · Bekaa · Lebanon</div>
          </div>
        </Link>

        <div className="kh-links">
          {links.map(item => (
            <Link key={item.href} href={item.href} className="kh-link">{item.label}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div className="kh-lang-desktop" style={{ position: 'relative' }}>
            <button className="kh-lang-btn" onClick={() => setLangOpen(!langOpen)}>
              <span>{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <span className={`kh-lang-arrow${langOpen ? ' open' : ''}`}>▼</span>
            </button>
            {langOpen && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 998 }} onClick={() => setLangOpen(false)} />
                <div className="kh-lang-dropdown">
                  {LANGS.map(l => (
                    <button key={l.code} className={`kh-lang-opt${lang === l.code ? ' active' : ''}`} onClick={() => { setLang(l.code); setLangOpen(false) }}>
                      <span style={{ fontSize: '16px' }}>{l.flag}</span>
                      <span>{l.full}</span>
                      {lang === l.code && <span style={{ marginLeft: 'auto', fontSize: '11px' }}>✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <Link href="/appointments" className="kh-cta">{t.nav.book}</Link>
          <button className="kh-hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className={`kh-mobile-menu${hidden ? ' hidden' : ''}`}>
          {links.map(item => (
            <Link key={item.href} href={item.href} className="kh-mobile-link" onClick={() => setMobileOpen(false)}>{item.label}</Link>
          ))}
          <Link href="/appointments" className="kh-mobile-cta" onClick={() => setMobileOpen(false)}>{t.nav.book}</Link>
          <div className="kh-mobile-lang">
            {LANGS.map(l => (
              <button key={l.code} className={`kh-mobile-lang-btn${lang === l.code ? ' active' : ''}`} onClick={() => { setLang(l.code); setMobileOpen(false) }}>
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}