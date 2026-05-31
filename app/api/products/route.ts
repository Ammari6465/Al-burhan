import { NextResponse } from 'next/server'
import { catalogItems } from '@/lib/product-catalog'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  return NextResponse.json(
    { products: catalogItems },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=86400',
      },
    },
  )
}
