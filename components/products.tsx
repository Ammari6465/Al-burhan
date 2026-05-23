'use client'

import Image from 'next/image'
import { Filter, MessageCircle, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import ProductModal, { type CatalogProduct } from '@/components/product-modal'

const categories = ['All', 'Pulleys', 'Couplings', 'Gears', 'Sprockets', 'Chains', 'Accessories'] as const

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
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null)
  const sectionRef = useScrollReveal<HTMLElement>()

  const filteredProducts = useMemo<CatalogProduct[]>(() => {
    const query = searchQuery.trim().toLowerCase()

    return catalogItems.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      if (!matchesCategory) return false
      if (!query) return true

      const haystack = `${product.name} ${product.category} ${product.spec} ${product.description}`.toLowerCase()
      return haystack.includes(query)
    })
  }, [category, searchQuery])

  return (
    <section ref={sectionRef} id="products" className="section-shell bg-[var(--color-offwhite)] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="section-kicker mx-auto">PRODUCT CATALOGUE</p>
          <h2 data-reveal className="section-title mt-4">Products Built for Industry</h2>
          <p data-reveal className="section-copy mx-auto mt-4 max-w-2xl">
            A complete catalogue of the product images stored in the public Images folder.
          </p>
        </div>

        <div data-reveal className="mx-auto mt-10 w-full max-w-2xl">
          <label htmlFor="product-search" className="product-search">
            <Search size={18} className="product-search__icon shrink-0" aria-hidden />
            <input
              id="product-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products by name or category..."
              aria-label="Search products"
              className="product-search__input"
            />
          </label>
        </div>

        <div data-reveal className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,51,102,0.12)] bg-white px-4 py-2 text-[#003366] shadow-[0_10px_24px_rgba(9,25,41,0.06)]">
            <Filter size={16} />
            <span className="text-[14px] font-semibold">Filter by category</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition ${category === option ? 'border-[#0A3D62] bg-[#0A3D62] text-white' : 'border-[rgba(0,51,102,0.12)] bg-white text-[#0A3D62] hover:border-[#0A3D62] hover:bg-[#F3F8FC]'}`}
              >
                {option}
              </button>
            ))}
          </div>

          <select value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])} className="product-filter min-w-[220px]">
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <article key={product.id} data-reveal className="product-card group" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="relative h-[220px] overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-6 transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="px-5 pt-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory(product.category)}
                    className="rounded-full bg-[#FDECEA] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C0392B] transition hover:bg-[#F7D8D5]"
                  >
                    {product.category}
                  </button>
                  <span className="rounded-full bg-[#EAF6FF] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0A3D62]">
                    Fast quote
                  </span>
                </div>

                <h3 className="mt-4 text-[18px] font-bold text-[#0A3D62]">{product.name}</h3>
                <p className="mt-1 text-[14px] leading-6 text-[#4A5568]">{product.spec}</p>

                <div className="mt-5 grid grid-cols-1 gap-3 pb-5">
                  <a
                    href={`https://wa.me/919819036787?text=${encodeURIComponent(`Hello AL-BURHAN, I am interested in ${product.name}. Please share details and pricing.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-[13px] font-semibold text-white transition hover:bg-[#1EBE57]"
                  >
                    <MessageCircle size={16} />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-[rgba(0,51,102,0.14)] bg-white p-10 text-center text-[#425062]">
            {searchQuery.trim()
              ? `No products found for "${searchQuery.trim()}". Try another name or clear the search.`
              : 'No products match the current filters.'}
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}