import type { Metadata } from 'next'
import GearLoader from '@/components/gear-loader'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'AL-BURHAN Industrial Drives | Precision Industrial Power Transmission',
  description: 'Modern industrial website for AL-BURHAN Industrial Drives, featuring pulleys, couplings, gears, sprockets, fast dispatch, and OEM support across India.',
  icons: {
    icon: '/icon',
    apple: '/icon',
  },
}

// Next.js requires viewport to be provided via the generateViewport export
export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-white" suppressHydrationWarning>
      <body className="overflow-x-hidden bg-[var(--color-offwhite)] font-sans antialiased text-[#0f1720]" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <GearLoader />
          <div className="page-enter">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
