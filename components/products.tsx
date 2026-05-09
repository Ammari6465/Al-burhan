'use client'

import Image from 'next/image'
import { MessageCircle, X, Search } from 'lucide-react'
import { useState } from 'react'

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

const getImagePath = (fileName: string) => `/Images/${encodeURIComponent(fileName)}`

const getWhatsappLink = (productName: string) => {
  const message = `Hello, I am interested in the product: ${productName}. Please share more details.`
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

export default function Products() {  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <section id="products" className="py-24 bg-gradient-to-b from-blue-700/5 via-white/0 to-red-700/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-700/10 border border-red-700/20 mb-6">
            <span className="text-sm font-bold text-red-700 uppercase tracking-wider">Our Products</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-balance mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-blue-700">Product Gallery</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-8">
            Browse our product images and contact us directly on WhatsApp for the selected item.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-12 text-sm rounded-lg border border-blue-200/50 bg-white/60 backdrop-blur-sm focus:outline-none focus:border-blue-600 focus:bg-white/80 transition-all shadow-sm"
              />
              <Search size={18} className="absolute left-4 top-3.5 text-blue-600/60" />
            </div>
            {searchQuery && (
              <p className="text-sm text-slate-600 mt-2">
                Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredProducts.map((product, idx) => (
            <article
              key={product.name}
              className="group h-full animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              {/* Polaroid-style card */}
              <div className="h-full flex flex-col bg-white rounded-xl shadow-md shadow-gray-900/10 hover:shadow-xl hover:shadow-blue-600/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100/50 hover:border-blue-200/50">
                {/* Image container with clean white padding */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-blue-100/40 via-white to-red-100/40 p-6 flex items-center justify-center flex-shrink-0 cursor-pointer group/image hover:from-blue-200/50 hover:to-red-200/50 transition-all duration-300" onClick={() => setSelectedImage(getImagePath(product.image))}>
                  <Image
                    src={getImagePath(product.image)}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-115"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/5 to-transparent" />
                </div>

                {/* Card footer with enhanced styling */}
                <div className="flex-1 p-5 pb-6 flex flex-col justify-between bg-gradient-to-b from-white/50 to-white/80">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug h-full flex items-start pt-1">
                    {product.name}
                  </h3>

                  {/* WhatsApp button enhanced */}
                  <a
                    href={getWhatsappLink(product.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-md shadow-green-600/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/60 hover:scale-[1.04] flex-shrink-0 border border-green-400/30"
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full max-w-5xl max-h-5xl flex items-center justify-center p-4 animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
              aria-label="Close"
            >
              <X size={28} className="text-white" />
            </button>
            
            <Image
              src={selectedImage}
              alt="Enlarged product view"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  )
}
