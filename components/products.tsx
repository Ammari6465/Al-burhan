'use client'

import Image from 'next/image'
import { MessageCircle, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import ProductModal, { type CatalogProduct } from '@/components/product-modal'

const imageFiles = [
  'Aluminium Coupling.jpg',
  'Aluminium Handle.jpg',
  'Aluminium Step Pulley.jpg',
  'Anti Vibration Mounting.jpg',
  'avm.png',
  'Bevel Gear.jpg',
  'C.I. Break Drum Coupling.jpg',
  'C.I. Flat Pulley.jpg',
  'C.I. Handle.jpg',
  'C.I. Step Pulley.jpg',
  'C.I. V-Belt Pulley - Arms.jpg',
  'C.I. V-Belt Pulley - Semi Solid.jpg',
  'C.I. V-Belt Pulley- Solid.jpg',
  'Chain Coupling.jpg',
  'CI Spur Gear.jpg',
  'CI Worm Gear.jpg',
  'Duplex Sprocket.jpg',
  'Encoder Coupling.jpg',
  'Flexible Coupling.jpg',
  'Full Lock - Diamond.jpg',
  'Gear Coupling.jpg',
  'GR Coupling(1).jpg',
  'GR Coupling.jpg',
  'GR Spider.jpg',
  'Half Lock.jpg',
  'HRC Coupling(1).jpg',
  'HRC Coupling.jpg',
  'HRC Rubber.jpg',
  'M.S. Breakdrum Coupling.jpeg',
  'Nylon Sleeve Coupling.jpg',
  'Nylon Sleeve.jpg',
  'Rack and Pinion.jpg',
  'Roller Chain.jpg',
  'rope pulley.png',
  'rrl coupling.png',
  'Rubber Spider.jpg',
  'Rubber Tyre.jpg',
  'rubber.png',
  'Simplex Sprocket.jpg',
  'spur gear.png',
  'Star Coupling.jpg',
  'TaperLock Pulley.jpeg',
  'Timing Belt Pulley.jpg',
  'Triplex Sprocket.jpg',
  'Variable Speed Pulley.jpeg',
  'worm gear.jpg',
] as const

const categoryDetails: Record<Exclude<CatalogProduct['category'], never>, {
  spec: string
  description: string
  features: string[]
  specs: { label: string; value: string }[]
}> = {
  Pulleys: {
    spec: 'Precision pulley solution for dependable belt transfer',
    description: 'Pulley products for stable fitment, clean belt tracking, and repeatable industrial use.',
    features: ['Stable groove profile', 'Reliable belt transfer', 'Easy replacement planning'],
    specs: [
      { label: 'Material', value: 'CI / Steel / Alloy' },
      { label: 'Use', value: 'Power transmission' },
      { label: 'Fit', value: 'Industrial pulley' },
      { label: 'Supply', value: 'Made to order' },
    ],
  },
  Couplings: {
    spec: 'Industrial coupling for torque transfer and alignment support',
    description: 'Coupling products for shaft connection, shock control, and low-maintenance field use.',
    features: ['Shock absorption', 'Torque transfer', 'Service-friendly design'],
    specs: [
      { label: 'Material', value: 'CI / Steel / Rubber' },
      { label: 'Use', value: 'Shaft connection' },
      { label: 'Type', value: 'Coupling part' },
      { label: 'Supply', value: 'Custom order' },
    ],
  },
  Gears: {
    spec: 'Precision gear component for stable motion transfer',
    description: 'Gear products for dependable engagement, controlled movement, and industrial durability.',
    features: ['Controlled motion', 'Durable tooth form', 'Industrial-ready profile'],
    specs: [
      { label: 'Material', value: 'CI / Steel / Bronze' },
      { label: 'Use', value: 'Gear drive' },
      { label: 'Profile', value: 'Precision gear' },
      { label: 'Supply', value: 'Made to order' },
    ],
  },
  Sprockets: {
    spec: 'Chain-ready sprocket for dependable engagement',
    description: 'Sprocket products for industrial chain systems that need clean engagement and long service life.',
    features: ['Chain engagement', 'Durable profile', 'Industrial fit'],
    specs: [
      { label: 'Material', value: 'CI / Steel' },
      { label: 'Use', value: 'Chain drive' },
      { label: 'Type', value: 'Sprocket' },
      { label: 'Supply', value: 'Custom tooth count' },
    ],
  },
  Chains: {
    spec: 'Industrial chain solution for drive applications',
    description: 'Chain products for motion transfer, load handling, and industrial replacement planning.',
    features: ['Load handling', 'Repeatable drive transfer', 'Industrial replacement ready'],
    specs: [
      { label: 'Material', value: 'Alloy steel' },
      { label: 'Use', value: 'Chain drive' },
      { label: 'Type', value: 'Roller chain' },
      { label: 'Supply', value: 'By length / custom' },
    ],
  },
  Accessories: {
    spec: 'Industrial accessory for support and fitment use',
    description: 'Accessory products used for mounting, protection, or application-specific fitment.',
    features: ['Support component', 'Fitment aid', 'Industrial use ready'],
    specs: [
      { label: 'Material', value: 'Varies' },
      { label: 'Use', value: 'Accessory' },
      { label: 'Type', value: 'Support part' },
      { label: 'Supply', value: 'Custom order' },
    ],
  },
}

const inferCategory = (fileName: string): CatalogProduct['category'] => {
  const name = fileName.toLowerCase()

  if (name.includes('pulley')) return 'Pulleys'
  if (name.includes('coupling') || name.includes('spider') || name.includes('lock') || name.includes('sleeve') || name.includes('diamond')) return 'Couplings'
  if (name.includes('gear') || name.includes('pinion')) return 'Gears'
  if (name.includes('sprocket')) return 'Sprockets'
  if (name.includes('chain')) return 'Chains'

  return 'Accessories'
}

const toTitleFromFileName = (fileName: string) =>
  fileName
    .replace(/\.[^.]+$/, '')
    .replace(/\s+/g, ' ')
    .trim()

const toProductId = (fileName: string) =>
  fileName
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const createCatalogProduct = (fileName: string): CatalogProduct => {
  const category = inferCategory(fileName)
  const details = categoryDetails[category]

  return {
    id: toProductId(fileName),
    name: toTitleFromFileName(fileName),
    category,
    image: `/Images/${encodeURI(fileName)}`,
    spec: details.spec,
    description: details.description,
    features: details.features,
    specs: details.specs,
  }
}

const catalogItems: CatalogProduct[] = imageFiles.map(createCatalogProduct)

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null)
  const sectionRef = useScrollReveal<HTMLElement>()

  const filteredProducts = useMemo<CatalogProduct[]>(() => {
    const query = searchQuery.trim().toLowerCase()
    const scopedItems = catalogItems
    if (!query) return scopedItems

    return scopedItems.filter((product) => {
      const haystack = `${product.name} ${product.category} ${product.spec} ${product.description}`.toLowerCase()
      return haystack.includes(query)
    })
  }, [searchQuery])

  return (
    <section ref={sectionRef} id="products" className="section-shell bg-[var(--color-offwhite)] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="section-kicker mx-auto">PRODUCT CATALOGUE</p>
          <h2 data-reveal className="section-title mt-4">Products Build for the Industry</h2>
          <p data-reveal className="section-copy mx-auto mt-4 max-w-2xl">
            Browse our full range of industrial and power transmission products.
          </p>
        </div>

        <div data-reveal className="mx-auto mt-8 w-full max-w-2xl sm:mt-10">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <div className="product-search-wrap">
            <Search size={18} className="product-search-wrap__icon" aria-hidden />
            <input
              id="product-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products..."
              className="product-search-wrap__field"
            />
          </div>
        </div>

        {/* category filters removed — search box is the single filter */}

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <article key={product.id} data-reveal className="product-card group flex h-full flex-col" style={{ animationDelay: `${index * 80}ms` }} onClick={() => setSelectedProduct(product)}>
              <div className="product-card__media relative shrink-0 overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-6 transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="product-card__body flex flex-1 flex-col px-5 pt-4 pb-5">
                {/* badges removed: category and "Fast quote" */}

                <h3 className="product-card__title mt-4 text-[18px] font-bold text-[#0A3D62]">{product.name}</h3>
                <p className="product-card__spec mt-1 text-[14px] leading-6 text-[#4A5568]">{product.spec}</p>

                <div className="product-card__action mt-auto pt-5">
                  <a
                    href={`https://wa.me/919819036787?text=${encodeURIComponent(`Hello AL-BURHAN, I am interested in ${product.name}. Please share details and pricing.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-[13px] font-bold text-white transition hover:bg-[#1EBE57]"
                  >
                    <MessageCircle size={16} />
                    Quote
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-[rgba(0,51,102,0.14)] bg-white p-8 text-center text-[#425062] sm:p-10">
            {searchQuery.trim()
              ? `No products found for "${searchQuery.trim()}". Try another search term.`
              : 'No products available.'}
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
