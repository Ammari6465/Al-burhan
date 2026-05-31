'use client'

import Image from 'next/image'
import { CircleX, MessageCircle, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import ProductModal from '@/components/product-modal'
import { catalogItems, normalizeSearchText, type CatalogProduct } from '@/lib/product-catalog'

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null)
  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const productsTopRef = useRef<HTMLDivElement>(null)
  const hasMountedRef = useRef(false)
  const sectionRef = useScrollReveal<HTMLElement>()

  useEffect(() => {
    // Local-only mode: use bundled catalog immediately (no network)
    setProducts(catalogItems)
    setIsLoading(false)
  }, [])

  const filteredProducts = useMemo<CatalogProduct[]>(() => {
    const query = normalizeSearchText(searchQuery)
    const scopedItems = products.length ? products : catalogItems
    if (!query) return scopedItems

    return scopedItems.filter((product) => {
      const haystack = normalizeSearchText([
        product.name,
        product.category,
        product.spec,
        product.description,
        product.features.join(' '),
        product.id,
      ].join(' '))

      return haystack.includes(query)
    })
  }, [products, searchQuery])

  const handleSearchValue = (value: string) => {
    setSearchQuery(value)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    searchInputRef.current?.focus()
  }

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }

    if (searchQuery.trim()) return

    productsTopRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [searchQuery])

  return (
    <section ref={sectionRef} id="products" className="section-shell bg-[var(--color-offwhite)] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="section-kicker mx-auto">PRODUCT CATALOGUE</p>
          <h2 data-reveal className="section-title mt-4">Products Build for the Industry</h2>
          <p data-reveal className="section-copy mx-auto mt-4 max-w-2xl">
            Browse our full range of Industrial and Power Transmission Products.
          </p>
        </div>

        <div data-reveal className="mx-auto mt-8 w-full max-w-2xl sm:mt-10">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <div className="product-search-wrap">
            <Search size={18} className="product-search-wrap__icon" aria-hidden />
            <input
              ref={searchInputRef}
              id="product-search"
              type="text"
              inputMode="search"
              value={searchQuery}
              onChange={(event) => handleSearchValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') handleClearSearch()
              }}
              placeholder="Search products..."
              className="product-search-wrap__field pr-11"
            />
            {searchQuery.trim() ? (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#0A3D62] transition hover:bg-[#E6F1FB]"
                aria-label="Clear search"
              >
                <CircleX size={18} aria-hidden />
              </button>
            ) : null}
          </div>
        </div>

        {/* category filters removed — search box is the single filter */}

        <div ref={productsTopRef} className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading && !products.length ? (
            <div className="col-span-full rounded-2xl border border-dashed border-[rgba(0,51,102,0.14)] bg-white p-8 text-center text-[#425062] sm:p-10">
              Loading products from the database...
            </div>
          ) : null}
          {!isLoading && filteredProducts.map((product, index) => (
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
                    href={`https://wa.me/919819036787?text=${encodeURIComponent(`Hello Al-Burhan,

I am interested in your product, ${product.name}. Kindly share the product details and pricing at your earliest convenience.

Thank you.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
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

        {!isLoading && filteredProducts.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-[rgba(0,51,102,0.14)] bg-white p-8 text-center text-[#425062] sm:p-10">
            {normalizeSearchText(searchQuery)
              ? `No products found for "${searchQuery.trim()}". Try another search term.`
              : 'No products available.'}
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
