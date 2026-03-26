'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import en from './en'
import ar from './ar'
import fr from './fr'
import type { Translations } from './en'

export type Language = 'en' | 'ar' | 'fr'

const translations: Record<Language, Translations> = { en, ar, fr }

interface LanguageContextType {
  lang: Language
  t: Translations
  setLang: (lang: Language) => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  t: en,
  setLang: () => {},
  isRTL: false,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('kh-lang') as Language
    if (saved && ['en', 'ar', 'fr'].includes(saved)) {
      setLangState(saved)
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = saved
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('kh-lang', newLang)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}