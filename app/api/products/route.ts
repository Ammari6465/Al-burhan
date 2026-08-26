import { NextRequest, NextResponse } from 'next/server'
import {
  getFullCatalog,
  saveProduct,
  deleteProductById,
  resetToDefaultCatalog,
  bulkImportProducts,
} from '@/lib/product-store'
import type { CatalogProduct } from '@/lib/product-catalog'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET: Fetch all products (Catalog defaults + user added products)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const query = searchParams.get('q')

    let products = getFullCatalog()

    if (category && category !== 'All') {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      )
    }

    if (query) {
      const q = query.toLowerCase().trim()
      products = products.filter((p) => {
        const text = `${p.name} ${p.category} ${p.spec} ${p.description} ${p.features.join(' ')}`.toLowerCase()
        return text.includes(q)
      })
    }

    return NextResponse.json(
      {
        products,
        total: products.length,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      },
    )
  } catch (error) {
    console.error('Failed to get products:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve products' },
      { status: 500 },
    )
  }
}

// POST: Add a new product or perform bulk operations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Handle bulk reset or import actions
    if (body.action === 'reset_defaults') {
      const result = resetToDefaultCatalog()
      return NextResponse.json({
        success: true,
        message: 'Product catalog reset to default factory items',
        count: result.count,
        products: getFullCatalog(),
      })
    }

    if (body.action === 'bulk_import' && Array.isArray(body.products)) {
      const result = bulkImportProducts(body.products)
      return NextResponse.json({
        success: true,
        message: `Successfully imported ${result.count} products`,
        count: result.count,
        products: getFullCatalog(),
      })
    }

    // Standard single product creation
    const {
      name,
      category,
      image,
      images,
      spec,
      description,
      features,
      specs,
    } = body

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 },
      )
    }

    const defaultImage = image?.trim() || '/public/Images/Aluminium%20Coupling.jpg'
    const imageList = Array.isArray(images) && images.length > 0
      ? images.filter(Boolean)
      : [defaultImage]

    // Generate unique slug id
    const cleanSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    const id = body.id || `${(category || 'product').toLowerCase()}-${cleanSlug}-${Date.now().toString(36)}`

    const newProduct: CatalogProduct = {
      id,
      name: name.trim(),
      category: category || 'Accessories',
      image: imageList[0] || defaultImage,
      images: imageList,
      spec: spec?.trim() || 'Precision industrial component',
      description: description?.trim() || `${name} engineered for high reliability and heavy-duty industrial power transmission.`,
      features: Array.isArray(features) && features.length > 0
        ? features.filter((f: string) => Boolean(f?.trim()))
        : ['High durability construction', 'Industrial grade performance', 'Precision manufactured'],
      specs: Array.isArray(specs) && specs.length > 0
        ? specs.filter((s: any) => Boolean(s?.label?.trim() && s?.value?.trim()))
        : [
            { label: 'Material', value: 'Industrial Grade' },
            { label: 'Application', value: 'Power Transmission' },
            { label: 'Availability', value: 'In Stock / Made to Order' },
          ],
    }

    const result = saveProduct(newProduct)

    return NextResponse.json(
      {
        success: true,
        message: result.isNew ? 'Product added successfully' : 'Product updated successfully',
        product: result.product,
        products: getFullCatalog(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Failed to create/update product:', error)
    return NextResponse.json(
      { error: 'Failed to process product creation request' },
      { status: 500 },
    )
  }
}

// PUT: Update an existing product
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.id || !body.name) {
      return NextResponse.json(
        { error: 'Product ID and Name are required for update' },
        { status: 400 },
      )
    }

    const result = saveProduct(body as CatalogProduct)

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: result.product,
      products: getFullCatalog(),
    })
  } catch (error) {
    console.error('Failed to update product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 },
    )
  }
}

// DELETE: Delete a product by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID parameter is required' },
        { status: 400 },
      )
    }

    const result = deleteProductById(id)

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
      deleted: result.deleted,
      products: getFullCatalog(),
    })
  } catch (error) {
    console.error('Failed to delete product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 },
    )
  }
}
