'use client'

type BrandLogoProps = {
  compact?: boolean
  inverse?: boolean
  className?: string
}

export default function BrandLogo({ compact = false, inverse = false, className = '' }: BrandLogoProps) {
  const gearSize = compact ? 'h-10 w-10' : 'h-16 w-16'
  const titleSize = compact ? 'text-2xl' : 'text-4xl'
  const subtitleSize = compact ? 'text-sm' : 'text-xl'
  const textColor = inverse ? 'text-white' : 'text-[#153b78]'

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 100 100" className={`${gearSize} shrink-0`} aria-hidden="true">
        <path
          fill="none"
          stroke="#d11b2b"
          strokeWidth="6"
          strokeLinejoin="round"
          d="M50 10l4.4 7.6 8.5-1.2 4.1 7.2-5.5 6.2 4.6 7.9 8.6 1.8 1 8.4-8.1 3.5v9.1l8.1 3.5-1 8.4-8.6 1.8-4.6 7.9 5.5 6.2-4.1 7.2-8.5-1.2L50 90l-4.4-7.6-8.5 1.2-4.1-7.2 5.5-6.2-4.6-7.9-8.6-1.8-1-8.4 8.1-3.5v-9.1l-8.1-3.5 1-8.4 8.6-1.8 4.6-7.9-5.5-6.2 4.1-7.2 8.5 1.2L50 10Z"
        />
        <circle cx="50" cy="50" r="17.5" fill="none" stroke="#d11b2b" strokeWidth="6" />
        <circle cx="50" cy="50" r="6" fill="#d11b2b" />
      </svg>

      <div className="leading-none">
        <p className={`${titleSize} font-semibold tracking-tight ${textColor}`}>
          AL-BURHAN
        </p>
        <p className={`${subtitleSize} font-semibold tracking-[0.18em] ${textColor}`}>
          INDUSTRIAL DRIVES
        </p>
      </div>
    </div>
  )
}