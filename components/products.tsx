'use client'

import Image from 'next/image'
import { ArrowRight, Cog, Link2, RotateCw, Settings2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const categoryOrder = ['All', 'Pulleys', 'Couplings', 'Gears', 'Sprockets'] as const

type Category = (typeof categoryOrder)[number]

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

type ProductItem = {
  name: string
  image: string
  category: Exclude<Category, 'All'>
}

const getImagePath = (fileName: string) => `/Images/${encodeURIComponent(fileName)}`

const getCategory = (name: string): ProductItem['category'] => {
  if (/pulley/i.test(name)) return 'Pulleys'
  if (/coupling|spider|mounting|lock|handle|sleeve|gr/i.test(name)) return 'Couplings'
  if (/gear|pinion/i.test(name)) return 'Gears'
  if (/sprocket|chain/i.test(name)) return 'Sprockets'
  return 'Couplings'
}

const getShortDescription = (product: ProductItem) => {
  const lead = {
    Pulleys: 'Reliable pulley solution',
    Couplings: 'Precision coupling for drive alignment',
    Gears: 'Durable gear component',
    Sprockets: 'Chain-ready transmission part',
  }[product.category]

  return `${lead} built for dependable industrial use and efficient procurement.`
}

const categoryIcons: Record<Exclude<Category, 'All'>, typeof RotateCw> = {
  Pulleys: RotateCw,
  Couplings: Link2,
  Gears: Settings2,
  Sprockets: Cog,
}

const whatsappNumber = '919819036787'

const getWhatsappLink = (productName: string) => {
  const message = `Hello, I am interested in the product: ${productName}. Please share more details.`
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

export default function Products() {
  const [categoryFilter, setCategoryFilter] = useState<Category>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)
  const sectionRef = useScrollReveal<HTMLElement>()

  const catalog = useMemo<ProductItem[]>(
    () =>
      products.map((product) => ({
        ...product,
        category: getCategory(product.name),
      })),
    [],
  )

  const filteredProducts = useMemo(
    () =>
      catalog.filter((product) => {
        const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())

        return matchesCategory && matchesSearch
      }),
    [catalog, categoryFilter, searchQuery],
  )

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  useEffect(() => {
    setVisibleCount(12)
  }, [categoryFilter])

  useEffect(() => {
    setVisibleCount(12)
  }, [searchQuery])

  return (
    <section ref={sectionRef} id="products" className="section-shell bg-[#F5F7FA] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="section-kicker reveal-item mb-3 text-[12px] font-semibold text-[#C0392B]">Our Catalogue</p>
          <h2 data-reveal className="reveal-item text-[28px] font-bold text-[#0A3D62] sm:text-[40px]">
            Products Built for Industry
          </h2>
          <p data-reveal className="reveal-item mx-auto mt-4 max-w-2xl text-[17px] leading-7 text-[#4A5568]">
            A focused catalogue of industrial drives and power transmission products for manufacturers, distributors, and maintenance teams.
          </p>
          <div data-reveal className="reveal-item mx-auto mt-5 h-[3px] w-12 rounded-full bg-[#C0392B]" />
        </div>

        <div data-reveal className="reveal-item mt-10 flex justify-center">
          <div className="w-full max-w-xl">
            <label className="sr-only" htmlFor="product-search">
              Search products
            </label>
            <input
              id="product-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products by name..."
              className="min-h-12 w-full rounded-full border border-[#E8ECF0] bg-white px-5 py-3 font-ui text-[14px] text-[#0A3D62] outline-none transition placeholder:text-[#8896A8] focus:border-[#0A3D62] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(10,61,98,0.08)]"
            />
          </div>
        </div>

        <div data-reveal className="reveal-item mt-6 flex flex-wrap justify-center gap-2">
          {categoryOrder.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setCategoryFilter(chip)}
              className={`rounded-full px-5 py-2 font-ui text-[13px] font-semibold transition-all duration-200 ${categoryFilter === chip ? 'bg-[#0A3D62] text-white' : 'border border-[#E8ECF0] bg-white text-[#4A5568] hover:border-[#0A3D62] hover:text-[#0A3D62]'}`}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <article
              key={product.name}
              data-reveal
              className="group overflow-hidden rounded-2xl border border-[#E8ECF0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C0392B] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_16px_40px_rgba(0,0,0,0.10)]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EBF3FB]">
                <Image
                  src={getImagePath(product.image)}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="p-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#FDECEA] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C0392B]">
                  {(() => {
                    const Icon = categoryIcons[product.category]
                    return <Icon size={12} />
                  })()}
                  {product.category}
                </div>

                <div className="mt-4">
                  <h3 className="text-[18px] font-bold text-[#0A3D62]">{product.name}</h3>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-[#4A5568]">{getShortDescription(product)}</p>
                </div>

                <div className="mt-4 border-t border-[#F0F4F8] pt-4">
                  <a
                    href={getWhatsappLink(product.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 font-ui text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#1EBE57] hover:gap-3"
                  >
                    WhatsApp Us
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length > visibleCount && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((current) => current + 12)}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#E8ECF0] bg-white px-6 py-3 font-ui text-[14px] font-semibold text-[#0A3D62] transition hover:border-[#0A3D62] hover:bg-[#F5F7FA]"
            >
              Load more products
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-[#E8ECF0] bg-white p-10 text-center text-[#4A5568]">
            No products match the current search and filters.
          </div>
        )}
      </div>
    </section>
  )
}