import { NextResponse } from 'next/server'
import { getFirestoreInstance } from '@/lib/firebase-admin'
import { catalogItems } from '@/lib/product-catalog'

const productsCollection = 'products'

export async function POST() {
  try {
    const firestore = getFirestoreInstance()
    const batch = firestore.batch()

    for (const product of catalogItems) {
      const ref = firestore.collection(productsCollection).doc(product.id)
      batch.set(ref, {
        ...product,
        imageLink: product.image,
        images: product.images,
        updatedAt: new Date().toISOString(),
      }, { merge: true })
    }

    await batch.commit()

    return NextResponse.json(
      {
        message: 'Products seeded successfully.',
        count: catalogItems.length,
        collection: productsCollection,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Product seed error:', error)

    return NextResponse.json(
      {
        message: 'Unable to seed products. Make sure Firebase admin credentials are configured.',
      },
      { status: 500 },
    )
  }
}
