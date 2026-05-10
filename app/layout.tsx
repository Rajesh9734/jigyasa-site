import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { logo, siteConfig } from '@/config/site'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: '--font-geist'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Empowering Financial Success`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icons/icon-192.png',
    shortcut: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
  openGraph: {
    title: `${siteConfig.name} - Empowering Financial Success`,
    description: siteConfig.description,
    url: '/',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [
      {
        url: logo.default,
        width: 512,
        height: 512,
        alt: `${siteConfig.name} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: `${siteConfig.name} - Empowering Financial Success`,
    description: siteConfig.description,
    images: [logo.default],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': siteConfig.name,
    'apple-mobile-web-app-status-bar-style': 'default',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pwaScript = `
    window.__jigyasaInstallPrompt = null;
    window.__jigyasaCanInstall = false;

    window.addEventListener('beforeinstallprompt', function (event) {
      event.preventDefault();
      window.__jigyasaInstallPrompt = event;
      window.__jigyasaCanInstall = true;
      window.dispatchEvent(new Event('jigyasa-install-available'));
    });

    window.addEventListener('appinstalled', function () {
      window.__jigyasaInstallPrompt = null;
      window.__jigyasaCanInstall = false;
      window.dispatchEvent(new Event('jigyasa-install-installed'));
    });

    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function () {
          return navigator.serviceWorker.ready;
        }).catch(function () {});
      });
    }
  `

  return (
    <html lang="en" className="bg-background">
      <head>
        <script dangerouslySetInnerHTML={{ __html: pwaScript }} />
      </head>
      <body className={`${geist.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
