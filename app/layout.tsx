import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: '--font-geist'
});

export const metadata: Metadata = {
  title: 'Jigyasa Capital - Empowering Financial Success',
  description: 'NEPSE & FX training, capital investment and advisory services to help you grow your wealth and achieve financial freedom.',
  icons: {
    icon: '/images/logo-transparent.png',
    shortcut: '/images/logo-transparent.png',
    apple: '/images/logo-transparent.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geist.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}