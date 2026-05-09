'use client'

import { useState } from 'react'
import { MapPin, Mail, Phone, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to submit the form.')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to submit the form.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20 bg-gradient-to-br from-muted/50 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-3">Get in Touch</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
            <span className="text-red-700">Contact</span> <span className="text-blue-700">Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Contact Information</h3>
            </div>

            {/* Address */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-700">
                  <MapPin size={20 } className="text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Our Address</h4>
                <p className="text-foreground/70">
                  109/111 Nagdevi Street<br />
                  Mumbai 400003<br />
                  Maharashtra, India
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-700">
                  <Mail size={20} className="text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                <a
                  href="mailto:alburhanind.drives@gmail.com"
                  className="text-red-700 hover:underline break-all"
                >
                  alburhanind.drives@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-600">
                  <Phone size={20} className="text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Call Us</h4>
                <div className="space-y-1">
                  <p className="text-foreground/70">Mr. Zohair</p>
                  <a
                    href="tel:+919819036787"
                    className="text-red-700 hover:underline font-semibold block"
                  >
                    +91 98190 36787
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="border-t border-border pt-4 sm:pt-6 mt-4 sm:mt-6">
              <h4 className="font-semibold text-foreground mb-3">Business Hours</h4>
              <div className="space-y-2 text-sm text-foreground/70">
                <p>Monday - Saturday: 10:00 AM - 1:00 PM and 2:00 PM - 7:00 PM</p>
                <p>Sunday: <span className="text-red-700 font-semibold"> Closed</span></p>
              </div>
            </div>
          </div>

          {/* Map (replaces contact form) */}
          <div className="mt-2 sm:mt-0">
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15094.19073479426!2d72.81480185687545!3d18.951404827656734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce2540b220cd%3A0xcb8075dba5dd428!2sAL-BURHAN%20INDUSTRIAL%20DRIVES!5e0!3m2!1sen!2sin!4v1778271312424!5m2!1sen!2sin"
                width="100%"
                height="520"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[520px] md:h-[620px] lg:h-[550px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
