import type { Metadata } from 'next'
import { IBM_Plex_Mono, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import GearLoader from '@/components/gear-loader'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-ibm-plex-mono' })

export const metadata: Metadata = {
  title: 'Al-Burhan: Industrial Drive',
  description: 'Leading stockist of pulleys, couplings, sprockets, roller chains & gears in Mumbai. High-quality industrial components for your business.',
  icons: {
    icon: '/icon',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${sora.variable} ${ibmPlexMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <GearLoader />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
