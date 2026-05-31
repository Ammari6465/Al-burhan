'use client'

import { MessageCircle } from 'lucide-react'

const whatsappHref = `https://wa.me/919819036787?text=${encodeURIComponent(`Hello Al-Burhan,

I would like to request a quotation for your products. Kindly share your pricing details at your earliest convenience.

Thank you.`)}`

export default function FloatingWhatsAppButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp us"
      className="fixed bottom-6 right-6 z-[110] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[14px] font-bold text-white shadow-[0_14px_30px_rgba(37,211,102,0.28)] transition hover:-translate-y-0.5 hover:bg-[#1EBE57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:px-6 sm:py-3.5"
    >
      <MessageCircle size={18} />
      <span>WhatsApp Us</span>
    </a>
  )
}