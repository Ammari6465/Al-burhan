import { NextRequest, NextResponse } from 'next/server'
import { catalogItems } from '@/lib/product-catalog'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const query = searchParams.get('q')?.trim().toLowerCase()

  const products = catalogItems.filter((product) => {
    if (category && category !== 'All' && product.category.toLowerCase() !== category.toLowerCase()) {
      return false
    }
    if (!query) return true
    return [product.name, product.category, product.spec, product.description, ...product.features]
      .join(' ')
      .toLowerCase()
      .includes(query)
  })

  return NextResponse.json({ products, total: products.length })
}
