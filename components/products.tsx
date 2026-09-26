'use client'

import Image from 'next/image'
import { CircleX, MessageCircle, Search, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import ProductModal from '@/components/product-modal'
import { catalogItems, normalizeSearchText, type CatalogProduct } from '@/lib/product-catalog'

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null)
  const [products, setProducts] = useState<CatalogProduct[]>(catalogItems)
  const [isLoading, setIsLoading] = useState(true)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const productsTopRef = useRef<HTMLDivElement>(null)
  const hasMountedRef = useRef(false)
  const sectionRef = useScrollReveal<HTMLElement>()

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data.products)) {
          setProducts(data.products)
        }
      }
    } catch (err) {
      console.warn('Using local fallback catalog:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()

    window.addEventListener('focus', loadProducts)

    return () => {
      window.removeEventListener('focus', loadProducts)
    }
  }, [])

  const filteredProducts = useMemo<CatalogProduct[]>(() => {
    const query = normalizeSearchText(searchQuery)
    const scopedItems = products
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
          <h2 data-reveal className="section-title mt-4">Products Built for the Industry</h2>
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

        <div ref={productsTopRef} className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading && !products.length ? (
            <div className="col-span-full rounded-2xl border border-dashed border-[rgba(0,51,102,0.14)] bg-white p-8 text-center text-[#425062] sm:p-10">
              Loading products...
            </div>
          ) : null}
          {filteredProducts.map((product, index) => {
            const isCustom = !catalogItems.some((ci) => ci.id === product.id)

            return (
              <article
                key={product.id}
                data-reveal
                className="product-card group relative flex h-full flex-col cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedProduct(product)}
              >
                {isCustom && (
                  <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-[#003366] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                    <Sparkles size={11} className="text-[#ff9800]" />
                    New
                  </div>
                )}

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
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C0392B]">
                    {product.category}
                  </span>
                  <h3 className="product-card__title mt-1 text-[18px] font-bold text-[#0A3D62]">{product.name}</h3>
                  <p className="product-card__spec mt-1 line-clamp-2 text-[14px] leading-6 text-[#4A5568]">{product.spec}</p>

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
            )
          })}
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
