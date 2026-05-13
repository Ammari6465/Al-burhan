import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import GearLoader from '@/components/gear-loader'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const barlow = Barlow({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-barlow', display: 'swap' })
const barlowCondensed = Barlow_Condensed({ subsets: ['latin'], weight: ['700', '900'], variable: '--font-barlow-condensed', display: 'swap' })

export const metadata: Metadata = {
  title: 'AL-BURHAN Industrial Drives',
  description: 'Corporate website for AL-BURHAN Industrial Drives, a trusted supplier of pulleys, couplings, gears, sprockets, and power transmission products in India.',
  icons: {
    icon: '/icon',
    apple: '/icon',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#081C2E]" suppressHydrationWarning>
      <body className={`${barlow.variable} ${barlowCondensed.variable} bg-[#081C2E] font-sans antialiased overflow-x-hidden`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <GearLoader />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
