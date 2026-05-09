'use client';

import { X, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

interface ProductModalProps {
  product: {
    id: string;
    name: string;
    image: string;
    shortDescription: string;
    description: string;
    features: string[];
    specs: { label: string; value: string }[];
    price?: string;
  } | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!product) return null;

  const whatsappMessage = `Hi, I'm interested in ${product.name}. Can you provide more details and pricing?`;
  const whatsappLink = `https://wa.me/919819036787?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Description */}
          <div>
            <p className="text-foreground/70 leading-relaxed">{product.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Key Features</h3>
            <ul className="grid md:grid-cols-2 gap-3">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-blue-700 font-bold mt-1">✓</span>
                  <span className="text-foreground/70">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Specifications</h3>
            <div className="space-y-2">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                  <span className="text-foreground/70 font-medium">{spec.label}</span>
                  <span className="text-foreground font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing and CTA */}
          <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-xl p-6 space-y-4">
            {product.price && (
              <div className="text-center">
                <p className="text-sm text-foreground/60 mb-1">Starting Price</p>
                <p className="text-3xl font-bold text-red-700">{product.price}</p>
                <p className="text-xs text-foreground/50 mt-1">*Contact for bulk pricing</p>
              </div>
            )}

            {/* WhatsApp Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              <MessageCircle size={20} />
              Book via WhatsApp
            </a>

            <p className="text-xs text-foreground/60 text-center">
              Click to chat with our sales team on WhatsApp for availability and pricing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
