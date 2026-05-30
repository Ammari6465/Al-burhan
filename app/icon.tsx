import { ImageResponse } from 'next/og'
import { Cog } from 'lucide-react'

export const size = {
  width: 48,
  height: 48,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <Cog size={40} strokeWidth={2.6} color="#C0392B" fill="none" />
      </div>
    ),
    {
      ...size,
    }
  )
}