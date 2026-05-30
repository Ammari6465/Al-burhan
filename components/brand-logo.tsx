'use client'

type BrandLogoProps = {
  compact?: boolean
  large?: boolean
  inverse?: boolean
  className?: string
  useSvgFile?: boolean
}

export default function BrandLogo({ compact = false, large = false, inverse = false, className = '' }: BrandLogoProps) {
  const sizeClass = large ? 'h-12 w-auto sm:h-14' : compact ? 'h-11' : 'h-[52px] sm:h-14'
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
