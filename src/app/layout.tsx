import ConditionalLayout from '@/components/ConditionalLayout'
import './global.css'

export const metadata = {
  title: 'Khoury General Hospital — Zahle, Lebanon',
  description: 'Providing exceptional healthcare to the Bekaa region since 1993.',
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}