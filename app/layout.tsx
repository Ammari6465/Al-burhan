import type { Metadata } from 'next'
import { Inter, Montserrat, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import GearLoader from '@/components/gear-loader'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['600','700','800'], variable: '--font-mont', display: 'swap' })
const poppins = Poppins({ subsets: ['latin'], weight: ['500','600'], variable: '--font-poppins', display: 'swap' })

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
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} ${poppins.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <GearLoader />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
