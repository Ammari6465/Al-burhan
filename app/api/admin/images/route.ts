import { NextResponse } from 'next/server'
import { imageFilesList } from '@/lib/product-catalog'

export async function GET() {
  const images = imageFilesList.map((fileName) => {
    return {
      fileName,
      displayName: fileName.replace(/\.[^.]+$/, '').replace(/\s*\(\d+\)$/, ''),
      url: `/Images/${encodeURI(fileName)}`,
    }
  })

  return NextResponse.json({
    images,
    total: images.length,
  })
}
