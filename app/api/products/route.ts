import { NextResponse } from 'next/server'
import type { CatalogProduct } from '@/lib/product-catalog'
import { catalogItems } from '@/lib/product-catalog'

const productsCollection = 'products'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  // Fast local-only path: when `LOCAL_ONLY=1` use the bundled catalog
  // This avoids Firestore access and returns immediately for fast local testing.
  if (process.env.LOCAL_ONLY === '1' || process.env.USE_LOCAL_CATALOG === '1') {
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
  try {
    const firestore = getFirestoreInstance()
    const snapshot = await firestore.collection(productsCollection).orderBy('name', 'asc').get()

    const products = snapshot.docs.map((doc) => {
      const data = doc.data() as Partial<CatalogProduct> & {
        imageLink?: string
        images?: string[]
      }

      const images = Array.isArray(data.images) && data.images.length
        ? data.images
        : data.imageLink
          ? [data.imageLink]
          : data.image
            ? [data.image]
            : []

      return {
        // Local-only: always return the bundled catalog items
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
