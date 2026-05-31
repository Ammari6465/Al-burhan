'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { CatalogProduct } from '@/lib/product-catalog'

interface ProductModalProps {
  product: CatalogProduct | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const imageCount = product?.images.length ?? 0

      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (imageCount <= 1) {
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setSelectedImageIndex((current) => (current - 1 + imageCount) % imageCount)
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setSelectedImageIndex((current) => (current + 1) % imageCount)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, product])

  useEffect(() => {
    setSelectedImageIndex(0)
  }, [product])

  if (!product) {
    return null
  }

  if (!isMounted) {
    return null
  }

  const images = product.images.length ? product.images : [product.image]
  const currentImageIndex = Math.min(selectedImageIndex, images.length - 1)
  const currentImage = images[currentImageIndex] ?? product.image
  const hasMultipleImages = images.length > 1

  return createPortal(
    <div className="modal-backdrop fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="modal-panel relative w-full max-w-4xl overflow-hidden rounded-[1.5rem]">
        <div className="absolute right-4 top-4 z-20">
          <button type="button" onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,51,102,0.1)] bg-[var(--color-offwhite)] transition hover:bg-white" aria-label="Close quick view">
            <X size={20} />
          </button>
        </div>

        <div className="relative bg-[var(--color-offwhite)] p-4 sm:p-6">
          <div className="relative overflow-hidden rounded-[1.25rem] bg-[var(--color-offwhite)]" style={{ minHeight: 'min(72vh, 760px)' }}>
            <Image src={currentImage} alt={product.name} fill className="object-contain p-4 sm:p-8" priority />

            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => setSelectedImageIndex((current) => (current - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0F3460] shadow-[0_10px_24px_rgba(9,25,41,0.18)] transition hover:bg-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => setSelectedImageIndex((current) => (current + 1) % images.length)}
                  className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0F3460] shadow-[0_10px_24px_rgba(9,25,41,0.18)] transition hover:bg-white"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[#0F3460]/90 px-3 py-1 text-[11px] font-semibold text-white">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
