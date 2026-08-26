import fs from 'fs'
import path from 'path'
import { catalogItems, type CatalogProduct } from '@/lib/product-catalog'

const DATA_DIR = path.join(process.cwd(), 'data')
const PRODUCTS_FILE = path.join(DATA_DIR, 'custom-products.json')

// In-memory cache for fast access
let cachedProducts: CatalogProduct[] | null = null

function ensureDataDirectory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
  } catch (err) {
    console.warn('Could not create data directory, using memory cache:', err)
  }
}

function readCustomProductsFromFile(): CatalogProduct[] {
  try {
    ensureDataDirectory()
    if (fs.existsSync(PRODUCTS_FILE)) {
      const fileData = fs.readFileSync(PRODUCTS_FILE, 'utf-8')
      const parsed = JSON.parse(fileData)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (err) {
    console.warn('Error reading custom products file:', err)
  }
  return []
}

function writeCustomProductsToFile(products: CatalogProduct[]): boolean {
  try {
    ensureDataDirectory()
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.warn('Error writing custom products file:', err)
    return false
  }
}

export function getFullCatalog(): CatalogProduct[] {
  if (cachedProducts) {
    return cachedProducts
  }

  const customProducts = readCustomProductsFromFile()
  
  // Merge default catalog items with custom products
  // Custom products with same ID override default items
  const customMap = new Map(customProducts.map((p) => [p.id, p]))
  const merged: CatalogProduct[] = []

  // Add all defaults unless overridden
  for (const item of catalogItems) {
    if (customMap.has(item.id)) {
      merged.push(customMap.get(item.id)!)
      customMap.delete(item.id)
    } else {
      merged.push(item)
    }
  }

  // Add any new custom products
  for (const extra of customMap.values()) {
    merged.unshift(extra) // place new products first or at desired position
  }

  cachedProducts = merged
  return cachedProducts
}

export function saveProduct(product: CatalogProduct): { success: boolean; product: CatalogProduct; isNew: boolean } {
  const currentCustom = readCustomProductsFromFile()
  const existingIndex = currentCustom.findIndex((p) => p.id === product.id)
  const isNew = existingIndex === -1

  if (existingIndex >= 0) {
    currentCustom[existingIndex] = product
  } else {
    currentCustom.unshift(product)
  }

  writeCustomProductsToFile(currentCustom)
  
  // Invalidate in-memory cache
  cachedProducts = null
  const updatedCatalog = getFullCatalog()
  const saved = updatedCatalog.find((p) => p.id === product.id) || product

  return { success: true, product: saved, isNew }
}

export function deleteProductById(productId: string): { success: boolean; deleted: boolean } {
  const currentCustom = readCustomProductsFromFile()
  const initialLen = currentCustom.length
  const filtered = currentCustom.filter((p) => p.id !== productId)

  // Invalidate cache
  cachedProducts = null

  if (filtered.length !== initialLen) {
    writeCustomProductsToFile(filtered)
    return { success: true, deleted: true }
  }

  // If it's a default product that wasn't in custom list, we can track "hidden/deleted default products"
  return { success: true, deleted: false }
}

export function resetToDefaultCatalog(): { success: boolean; count: number } {
  try {
    ensureDataDirectory()
    if (fs.existsSync(PRODUCTS_FILE)) {
      fs.unlinkSync(PRODUCTS_FILE)
    }
  } catch (err) {
    console.warn('Error deleting custom products file:', err)
  }
  cachedProducts = null
  return { success: true, count: catalogItems.length }
}

export function bulkImportProducts(products: CatalogProduct[]): { success: boolean; count: number } {
  const currentCustom = readCustomProductsFromFile()
  const map = new Map<string, CatalogProduct>()

  for (const item of currentCustom) {
    map.set(item.id, item)
  }

  for (const p of products) {
    if (p && p.name) {
      const id = p.id || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      map.set(id, { ...p, id })
    }
  }

  const updatedList = Array.from(map.values())
  writeCustomProductsToFile(updatedList)
  cachedProducts = null

  return { success: true, count: updatedList.length }
}
