'use client'

type BrandLogoProps = {
  compact?: boolean
  inverse?: boolean
  className?: string
  useSvgFile?: boolean
}

export default function BrandLogo({ compact = false, inverse = false, className = '' }: BrandLogoProps) {
  const sizeClass = compact ? 'h-12' : 'h-16'
  const toneClass = inverse ? 'brightness-0 invert' : ''

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src="/Logo.png"
        alt="AL-BURHAN Industrial Drives"
        className={`${sizeClass} w-auto flex-none object-contain select-none ${toneClass}`}
      />
    </div>
  )
}