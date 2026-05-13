'use client'

import Image from 'next/image'
import { ChevronDown, Filter, MessageCircle, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const whatsappNumber = '919819036787'

const products = [
  { name: 'Aluminium Coupling', image: 'Aluminium Coupling.jpg' },
  { name: 'Aluminium Handle', image: 'Aluminium Handle.jpg' },
  { name: 'Aluminium Step Pulley', image: 'Aluminium Step Pulley.jpg' },
  { name: 'Round Mounting', image: 'Anti Vibration Mounting.jpg' },
  { name: 'Cushy Foot Mounting', image: 'avm.png' },
  { name: 'Bevel Gear', image: 'Bevel Gear.jpg' },
  { name: 'C.I. Break Drum Coupling', image: 'C.I. Break Drum Coupling.jpg' },
  { name: 'C.I. Flat Pulley', image: 'C.I. Flat Pulley.jpg' },
  { name: 'C.I. Handle', image: 'C.I. Handle.jpg' },
  { name: 'C.I. Step Pulley', image: 'C.I. Step Pulley.jpg' },
  { name: 'C.I. V-Belt Pulley Arms', image: 'C.I. V-Belt Pulley - Arms.jpg' },
  { name: 'C.I. V-Belt Pulley Semi Solid', image: 'C.I. V-Belt Pulley - Semi Solid.jpg' },
  { name: 'C.I. V-Belt Pulley Solid', image: 'C.I. V-Belt Pulley- Solid.jpg' },
  { name: 'Chain Coupling', image: 'Chain Coupling.jpg' },
  { name: 'CI Spur Gear', image: 'CI Spur Gear.jpg' },
  { name: 'CI Worm Gear', image: 'CI Worm Gear.jpg' },
  { name: 'Duplex Sprocket', image: 'Duplex Sprocket.jpg' },
  { name: 'Encoder Coupling', image: 'Encoder Coupling.jpg' },
  { name: 'Flexible Coupling', image: 'Flexible Coupling.jpg' },
  { name: 'Full Lock - Diamond', image: 'Full Lock - Diamond.jpg' },
  { name: 'Gear Coupling', image: 'Gear Coupling.jpg' },
  { name: 'GR Coupling', image: 'GR Coupling.jpg' },
  { name: 'GR Coupling 1', image: 'GR Coupling(1).jpg' },
  { name: 'GR Spider', image: 'GR Spider.jpg' },
  { name: 'Half Lock', image: 'Half Lock.jpg' },
  { name: 'HRC Coupling', image: 'HRC Coupling.jpg' },
  { name: 'HRC Coupling 1', image: 'HRC Coupling(1).jpg' },
  { name: 'HRC Rubber', image: 'HRC Rubber.jpg' },
  { name: 'M.S. Breakdrum Coupling', image: 'M.S. Breakdrum Coupling.jpeg' },
  { name: 'Nylon Sleeve', image: 'Nylon Sleeve.jpg' },
  { name: 'Nylon Sleeve Coupling', image: 'Nylon Sleeve Coupling.jpg' },
  { name: 'Rack and Pinion', image: 'Rack and Pinion.jpg' },
  { name: 'Roller Chain', image: 'Roller Chain.jpg' },
  { name: 'RRL Coupling', image: 'rrl coupling.png' },
  { name: 'Rope Pulley', image: 'rope pulley.png' },
  { name: 'Rubber', image: 'rubber.png' },
  { name: 'Rubber Spider', image: 'Rubber Spider.jpg' },
  { name: 'Rubber Tyre', image: 'Rubber Tyre.jpg' },
  { name: 'Simplex Sprocket', image: 'Simplex Sprocket.jpg' },
  { name: 'Spur Gear', image: 'spur gear.png' },
  { name: 'Star Coupling', image: 'Star Coupling.jpg' },
  { name: 'TaperLock Pulley', image: 'TaperLock Pulley.jpeg' },
  { name: 'Timing Belt Pulley', image: 'Timing Belt Pulley.jpg' },
  { name: 'Triplex Sprocket', image: 'Triplex Sprocket.jpg' },
  { name: 'Variable Speed Pulley', image: 'Variable Speed Pulley.jpeg' },
  { name: 'Worm Gear', image: 'worm gear.jpg' },
]

const categoryOrder = ['All', 'Pulleys', 'Couplings', 'Gears', 'Sprockets', 'Others'] as const
const materialOrder = ['All', 'Aluminium', 'CI', 'Nylon', 'Rubber', 'Metal'] as const

type Category = (typeof categoryOrder)[number]
type Material = (typeof materialOrder)[number]

type ProductItem = {
  name: string
  image: string
  category: Exclude<Category, 'All'>
  material: Exclude<Material, 'All'>
}

const getImagePath = (fileName: string) => `/Images/${encodeURIComponent(fileName)}`

const getWhatsappLink = (productName: string) => {
  const message = `Hello, I am interested in the product: ${productName}. Please share more details.`
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

const getCategory = (name: string): ProductItem['category'] => {
  if (/pulley/i.test(name)) return 'Pulleys'
  if (/coupling|spider|mounting|lock|handle|sleeve|gr/i.test(name)) return 'Couplings'
  if (/gear|pinion/i.test(name)) return 'Gears'
  if (/sprocket|chain/i.test(name)) return 'Sprockets'
  return 'Others'
}

const getMaterial = (name: string): ProductItem['material'] => {
  if (/aluminium/i.test(name)) return 'Aluminium'
  if (/\bci\b|\bc\.i\./i.test(name)) return 'CI'
  if (/nylon/i.test(name)) return 'Nylon'
  if (/rubber/i.test(name)) return 'Rubber'
  return 'Metal'
}

const getShortDescription = (product: ProductItem) => {
  const lead = {
    Pulleys: 'Reliable pulley solution',
    Couplings: 'Precision coupling for drive alignment',
    Gears: 'Durable gear component',
    Sprockets: 'Chain-ready transmission part',
    Others: 'Industrial transmission accessory',
  }[product.category]

  return `${lead} in ${product.material.toLowerCase()} build for industrial use.`
}

const materialChips: Material[] = ['All', 'Aluminium', 'CI', 'Nylon', 'Rubber', 'Metal']

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [materialFilter, setMaterialFilter] = useState<Material>('All')
  const [categoryFilter, setCategoryFilter] = useState<Category>('All')
  const [visibleCount, setVisibleCount] = useState(12)

  const catalog = useMemo<ProductItem[]>(
    () =>
      products.map((product) => ({
        ...product,
        category: getCategory(product.name),
        material: getMaterial(product.name),
      })),
    [],
  )

  const filteredProducts = useMemo(
    () =>
      catalog.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesMaterial = materialFilter === 'All' || product.material === materialFilter
        const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter

        return matchesSearch && matchesMaterial && matchesCategory
      }),
    [catalog, categoryFilter, materialFilter, searchQuery],
  )

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  useEffect(() => {
    setVisibleCount(12)
  }, [searchQuery, materialFilter, categoryFilter])

  return (
    <section id="products" className="section-shell bg-[rgba(255,255,255,0.015)] py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="section-kicker mb-4 text-[11px] font-semibold text-[#C0392B]">Our Catalogue</p>
          <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl text-balance">
            Explore our power transmission catalog.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
            Filter by material or product family, then send a WhatsApp inquiry directly from the card you need.
          </p>
        </div>

        <div className="industrial-card mb-8 rounded-[1.75rem] p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
              <input
                type="text"
                placeholder="Search products by name"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-2xl border border-white/8 bg-white/6 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[rgba(192,57,43,0.5)]"
              />
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-white/55">
              <Filter size={16} className="text-[#C0392B]" />
              Material and family filters
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {materialChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setMaterialFilter(chip)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${materialFilter === chip ? 'bg-[#C0392B] text-white' : 'border border-white/8 bg-white/4 text-white/65 hover:bg-white/8'}`}
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-white/6 pt-5">
            {categoryOrder.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setCategoryFilter(chip)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${categoryFilter === chip ? 'bg-[#C0392B] text-white' : 'border border-white/8 bg-white/4 text-white/65 hover:bg-white/8'}`}
              >
                {chip}
                <ChevronDown size={14} className="opacity-70" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div id="products-pulleys" className="scroll-mt-32">
            <h3 className="mb-4 text-lg font-bold text-white">Pulleys</h3>
          </div>
          <div id="products-couplings" className="scroll-mt-32">
            <h3 className="mb-4 text-lg font-bold text-white">Couplings</h3>
          </div>
          <div id="products-gears" className="scroll-mt-32">
            <h3 className="mb-4 text-lg font-bold text-white">Gears</h3>
          </div>
          <div id="products-sprockets" className="scroll-mt-32">
            <h3 className="mb-4 text-lg font-bold text-white">Sprockets</h3>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <article
              key={product.name}
              className="group overflow-hidden rounded-[14px] border border-white/8 bg-white/3 transition duration-300 hover:-translate-y-1 hover:border-white/15"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-[14px] bg-[#0D1F2F]">
                <Image
                  src={getImagePath(product.image)}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>

              <div className="space-y-4 p-4 transition-all duration-300">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[rgba(192,57,43,0.15)] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#C0392B]">
                    {product.category}
                  </span>
                  <span className="text-xs font-medium text-white/40">{product.material}</span>
                </div>

                <div>
                  <h4 className="text-[18px] font-bold text-white">{product.name}</h4>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/55">{getShortDescription(product)}</p>
                </div>

                <a
                  href={getWhatsappLink(product.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#C0392B] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#a53127] active:scale-95"
                >
                  <MessageCircle size={16} />
                  WhatsApp Inquiry
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length > visibleCount && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((current) => current + 12)}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/8 bg-white/4 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
            >
              Load more products
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="mt-10 rounded-[1.75rem] border border-dashed border-white/10 bg-white/4 p-10 text-center text-white/55">
            No products match the current filters.
          </div>
        )}
      </div>
    </section>
  )
}