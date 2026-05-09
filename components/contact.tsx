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
                  <MapPin size={20} className="text-white" />
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
                <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: By Appointment</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border p-5 sm:p-8 shadow-sm">
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">Thank you! We&apos;ll be in touch soon.</p>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">{errorMessage}</p>
                </div>
              )}

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700/50 bg-background"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700/50 bg-background"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXXXXXXX"
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700/50 bg-background"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry about products"
                    required
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700/50 bg-background"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-700 text-white px-6 py-3.5 rounded-lg font-medium hover:bg-red-800 transition-all flex items-center justify-center gap-2 mt-6 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Send size={18} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
