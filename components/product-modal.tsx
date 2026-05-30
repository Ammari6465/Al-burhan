'use client'

import { MessageCircle, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export type CatalogProduct = {
  id: string
  name: string
  category: 'Pulleys' | 'Couplings' | 'Gears' | 'Sprockets' | 'Chains' | 'Accessories'
  image: string
  spec: string
  description: string
  features: string[]
  specs: { label: string; value: string }[]
}

interface ProductModalProps {
  product: CatalogProduct | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [inquiry, setInquiry] = useState({
    name: '',
    quantity: '',
    location: '',
    note: '',
  })

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  useEffect(() => {
    setInquiry({
      name: '',
      quantity: '',
      location: '',
      note: '',
    })
  }, [product])

  if (!product) {
    return null
  }

  const whatsappMessage = encodeURIComponent(
    [
      `Hi AL-BURHAN, I am interested in ${product.name}.`,
      inquiry.name ? `Name: ${inquiry.name}` : null,
      inquiry.quantity ? `Quantity: ${inquiry.quantity}` : null,
      inquiry.location ? `Location: ${inquiry.location}` : null,
      inquiry.note ? `Requirement: ${inquiry.note}` : null,
    ]
      .filter(Boolean)
      .join(' '),
  )

  const whatsappLink = `https://wa.me/919819036787?text=${whatsappMessage}`

  return (
    <div className="modal-backdrop fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="modal-panel max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[1.5rem] overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[rgba(0,51,102,0.08)] bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[#d62828]">Quick View</p>
            <h2 className="mt-1 text-[1.4rem] font-black text-[#0f1720] normal-case tracking-normal">{product.name}</h2>
          </div>
          <button type="button" onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,51,102,0.1)] bg-[var(--color-offwhite)] transition hover:bg-white" aria-label="Close quick view">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[1.25rem] bg-[var(--color-offwhite)]" style={{ minHeight: '320px' }}>
              <Image src={product.image} alt={product.name} fill className="object-contain p-6" priority />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {product.specs.map((spec) => (
                <div key={spec.label} className="rounded-2xl border border-[rgba(0,51,102,0.08)] bg-[var(--color-offwhite)] p-3">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#425062]">{spec.label}</p>
                  <p className="mt-1 text-[0.95rem] font-bold text-[#0f1720] normal-case tracking-normal">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="section-kicker">{product.category}</p>
              <p className="mt-3 text-[1.05rem] leading-8 text-[#425062] normal-case tracking-normal">{product.description}</p>
            </div>

            <div>
              <h3 className="text-[1rem] font-bold text-[#0f1720] normal-case tracking-normal">Key Features</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li key={feature} className="rounded-2xl border border-[rgba(0,51,102,0.08)] bg-[var(--color-offwhite)] px-4 py-3 text-[14px] text-[#425062]">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <form className="rounded-[1.25rem] border border-[rgba(0,51,102,0.08)] bg-white p-5 shadow-[0_12px_34px_rgba(9,25,41,0.08)]">
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={inquiry.name} onChange={(event) => setInquiry((current) => ({ ...current, name: event.target.value }))} className="contact-field" placeholder="Your name" />
                <input value={inquiry.quantity} onChange={(event) => setInquiry((current) => ({ ...current, quantity: event.target.value }))} className="contact-field" placeholder="Quantity" />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input value={inquiry.location} onChange={(event) => setInquiry((current) => ({ ...current, location: event.target.value }))} className="contact-field" placeholder="Location" />
                <input value={inquiry.note} onChange={(event) => setInquiry((current) => ({ ...current, note: event.target.value }))} className="contact-field" placeholder="Inquiry note" />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <a href={whatsappLink} target="_blank" rel="noreferrer" onClick={onClose} className="product-cta inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-bold">
                  <MessageCircle size={16} />
                  WhatsApp Inquiry
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
