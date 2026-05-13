import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import GearLoader from '@/components/gear-loader'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'AL-BURHAN Industrial Drives | Industrial Power Transmission',
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
    <html lang="en" className="bg-white" suppressHydrationWarning>
      <body className="overflow-x-hidden bg-white font-sans antialiased text-[#1A2332]" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <GearLoader />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
