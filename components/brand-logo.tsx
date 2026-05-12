'use client'

import Image from 'next/image'

type BrandLogoProps = {
  compact?: boolean
  inverse?: boolean
  className?: string
}

export default function BrandLogo({ compact = false, inverse = false, className = '' }: BrandLogoProps) {
  const logoWidth = compact ? 200 : 176
  const logoHeight = compact ? 64 : 56

  return (
    <div className={`inline-flex items-center ${inverse ? 'brightness-0 invert' : ''} transition-transform duration-300 hover:scale-[1.02] ${className}`}>
      <Image
        src="/Logo.png"
        alt="AL-BURHAN Industrial Drives"
        width={logoWidth}
        height={logoHeight}
        priority
        className="h-40 w-auto object-contain sm:h-44"
      />
    </div>
  )
}