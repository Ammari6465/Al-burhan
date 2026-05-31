import { NextResponse } from 'next/server'
import { getFirestoreInstance } from '@/lib/firebase-admin'
import type { CatalogProduct } from '@/lib/product-catalog'

const productsCollection = 'products'

export async function GET() {
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
        id: data.id ?? doc.id,
        name: data.name ?? doc.id,
        category: data.category ?? 'Accessories',
        image: data.image ?? images[0] ?? '',
        images,
        spec: data.spec ?? '',
        description: data.description ?? '',
        features: Array.isArray(data.features) ? data.features : [],
        specs: Array.isArray(data.specs) ? data.specs : [],
      }
    })

    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch products from Firestore:', error)

    return NextResponse.json(
      {
        message: 'Unable to fetch products from the database.',
        products: [],
      },
      { status: 500 },
    )
  }
}
