import type { Metadata } from 'next'
import './global.css'
import ConditionalLayout from '@/components/ConditionalLayout'
import { LanguageProvider } from '@/lib/lang/LanguageContext'

export const metadata: Metadata = {
  title: 'Khoury General Hospital',
  description: 'Excellence in Healthcare Since 1993 — Zahle, Bekaa, Lebanon',
  icons: { icon: '/logo.jpg', apple: '/logo.jpg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}