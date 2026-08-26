'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Edit2,
  ExternalLink,
  Eye,
  FileCode,
  Image as ImageIcon,
  KeyRound,
  Layers,
  Lock,
  LogOut,
  MessageCircle,
  Package,
  PackagePlus,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import BrandLogo from '@/components/brand-logo'
import ProductModal from '@/components/product-modal'
import { catalogItems, type CatalogProduct } from '@/lib/product-catalog'

const CATEGORIES = [
  'Pulleys',
  'Couplings',
  'Gears',
  'Sprockets',
  'Chains',
  'Accessories',
] as const

const DEFAULT_CATEGORY_SPECS: Record<string, { spec: string; description: string; features: string[]; specs: { label: string; value: string }[] }> = {
  Pulleys: {
    spec: 'Precision pulley solution for dependable power and belt transfer',
    description: 'Engineered for smooth belt tracking, vibration reduction, and prolonged transmission life.',
    features: ['Precision dynamic balancing', 'Standard & custom taper bores', 'High fatigue resistance'],
    specs: [
      { label: 'Material', value: 'Graded Cast Iron (CI) / Steel' },
      { label: 'Groove Profile', value: 'V-Belt (A, B, C, D, SPZ, SPA, SPB, SPC)' },
      { label: 'Bore Type', value: 'Pilot Bore / Taper Lock' },
      { label: 'Application', value: 'Heavy Machinery & Conveyors' },
    ],
  },
  Couplings: {
    spec: 'Flexible & rigid industrial coupling for zero-backlash torque transmission',
    description: 'Designed to accommodate angular, parallel, and axial shaft misalignments while dampening shock loads.',
    features: ['High torsional elasticity', 'Shock and vibration absorption', 'Maintenance-free design'],
    specs: [
      { label: 'Material', value: 'Alloy Steel / Aluminium / PU Spider' },
      { label: 'Max Torque', value: 'Custom engineered per rating' },
      { label: 'Shaft Fit', value: 'Keyway / Spline / Clamp' },
      { label: 'Compliance', value: 'ISO 9001:2015 Industrial Standards' },
    ],
  },
  Gears: {
    spec: 'Precision cut gear component for smooth motion and high mechanical efficiency',
    description: 'Heat-treated and precision-ground tooth profiles for silent operation and minimal transmission wear.',
    features: ['Case hardened & tempered teeth', 'High load capacity', 'Minimal transmission backlash'],
    specs: [
      { label: 'Material', value: 'EN-8 / EN-24 / Case Carburized Steel' },
      { label: 'Module Range', value: '1.0 Module to 16.0 Module' },
      { label: 'Pressure Angle', value: '20° Standard' },
      { label: 'Tooth Finish', value: 'Ground & Precision Hobbed' },
    ],
  },
  Sprockets: {
    spec: 'Precision chain sprocket for industrial drives and conveyor systems',
    description: 'Flame/induction hardened teeth provide maximum wear life in abrasive industrial operating environments.',
    features: ['Induction hardened teeth (45-50 HRC)', 'Single / Multi-strand compatibility', 'Precision tooth spacing'],
    specs: [
      { label: 'Material', value: 'C45 Steel / Cast Iron' },
      { label: 'Strand Type', value: 'Simplex / Duplex / Triplex' },
      { label: 'Chain Pitch', value: '3/8" to 2" (06B to 32B)' },
      { label: 'Fitment', value: 'Bored to size with keyway & setscrew' },
    ],
  },
  Chains: {
    spec: 'Heavy duty transmission roller chain engineered for continuous industrial loading',
    description: 'Pre-stretched and shot-peened components designed for high tensile strength and extended service life.',
    features: ['Shot-peened plates & rollers', 'Factory pre-lubricated', 'High fatigue limit'],
    specs: [
      { label: 'Standard', value: 'BS / DIN 8187 & ANSI B29.1' },
      { label: 'Material', value: 'Alloy Steel with Nitrided Pins' },
      { label: 'Tensile Strength', value: 'Extra heavy duty series available' },
      { label: 'Supply', value: 'Standard box / Custom loop lengths' },
    ],
  },
  Accessories: {
    spec: 'Industrial support component for machine mounting, isolation, and vibration control',
    description: 'Heavy duty industrial accessories built for dependable field fitment and equipment longevity.',
    features: ['Resilient elastomeric dampening', 'Corrosion-resistant plating', 'Universal mounting slots'],
    specs: [
      { label: 'Material', value: 'Steel & High Grade Natural Rubber' },
      { label: 'Duty Rating', value: 'Continuous Industrial Duty' },
      { label: 'Mounting', value: 'M8 to M24 Studs / Flanged' },
      { label: 'Origin', value: 'AL-BURHAN Precision Manufacturing' },
    ],
  },
}

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [passcodeError, setPasscodeError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [showPasscode, setShowPasscode] = useState(false)

  // Navigation / Tabs
  const [activeTab, setActiveTab] = useState<'add' | 'inventory' | 'tools'>('add')

  // Products & Storage State
  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('All')
  const [filterOrigin, setFilterOrigin] = useState<'all' | 'custom' | 'default'>('all')

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Presets image library
  const [presetImages, setPresetImages] = useState<Array<{ fileName: string; displayName: string; url: string }>>([])
  const [showPresetPicker, setShowPresetPicker] = useState(false)
  const [pickerSearch, setPickerSearch] = useState('')

  // Form Fields for Add / Edit
  const [formName, setFormName] = useState('')
  const [formCategory, setFormCategory] = useState<CatalogProduct['category']>('Pulleys')
  const [formImage, setFormImage] = useState('/Images/Aluminium%20Coupling.jpg')
  const [formAdditionalImages, setFormAdditionalImages] = useState<string[]>([])
  const [formSpec, setFormSpec] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formFeatures, setFormFeatures] = useState<string[]>([''])
  const [formSpecs, setFormSpecs] = useState<{ label: string; value: string }[]>([
    { label: 'Material', value: 'Cast Iron / Alloy Steel' },
    { label: 'Application', value: 'Industrial Power Transmission' },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Preview Modal
  const [previewProduct, setPreviewProduct] = useState<CatalogProduct | null>(null)

  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check auth session
  useEffect(() => {
    const sessionToken = localStorage.getItem('alburhan_admin_token')
    if (sessionToken) {
      setIsAuthenticated(true)
    }
  }, [])

  // Load products & image presets
  useEffect(() => {
    if (!isAuthenticated) return

    fetchProducts()
    fetchImagePresets()
  }, [isAuthenticated])

  const fetchProducts = async () => {
    setIsLoadingProducts(true)
    try {
      const res = await fetch('/api/products', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data.products)) {
          setProducts(data.products)
        }
      }
    } catch (err) {
      console.error('Failed to fetch products:', err)
      showToast('error', 'Failed to fetch catalog from server. Using local cache.')
      setProducts(catalogItems)
    } finally {
      setIsLoadingProducts(false)
    }
  }

  const fetchImagePresets = async () => {
    try {
      const res = await fetch('/api/admin/images')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data.images)) {
          setPresetImages(data.images)
        }
      }
    } catch (err) {
      console.error('Failed to fetch image presets:', err)
    }
  }

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text })
    setTimeout(() => {
      setToastMessage(null)
    }, 4500)
  }

  // Handle Login
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!passcode.trim()) {
      setPasscodeError('Please enter the access passcode')
      return
    }

    setIsVerifying(true)
    setPasscodeError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() }),
      })

      const data = await res.json()

      if (res.ok && data.authenticated) {
        localStorage.setItem('alburhan_admin_token', data.token || 'auth_token')
        setIsAuthenticated(true)
        showToast('success', 'Welcome to AL-BURHAN Product Management Module')
      } else {
        setPasscodeError(data.error || 'Incorrect passcode. Try default: alburhan2026')
      }
    } catch (err) {
      // Fallback offline verification
      if (passcode.trim() === 'alburhan2026') {
        localStorage.setItem('alburhan_admin_token', 'local_token')
        setIsAuthenticated(true)
        showToast('success', 'Logged in (Local mode)')
      } else {
        setPasscodeError('Invalid passcode. Default passcode is: alburhan2026')
      }
    } finally {
      setIsVerifying(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('alburhan_admin_token')
    setIsAuthenticated(false)
    setPasscode('')
  }

  // Auto-fill template when category changes (if form is pristine)
  const handleCategoryChange = (newCategory: CatalogProduct['category']) => {
    setFormCategory(newCategory)
    const defaults = DEFAULT_CATEGORY_SPECS[newCategory]
    if (defaults && !formSpec) {
      setFormSpec(defaults.spec)
    }
    if (defaults && !formDescription) {
      setFormDescription(defaults.description)
    }
    if (defaults && (formFeatures.length === 0 || (formFeatures.length === 1 && !formFeatures[0]))) {
      setFormFeatures(defaults.features)
    }
    if (defaults && formSpecs.length <= 2) {
      setFormSpecs(defaults.specs)
    }
  }

  // Handle Image Upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      showToast('error', 'Image file is larger than 5MB. Please choose a smaller image.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      if (dataUrl) {
        setFormImage(dataUrl)
        showToast('success', 'Image uploaded successfully!')
      }
    }
    reader.readAsDataURL(file)
  }

  // Add Feature Field
  const handleAddFeature = () => {
    setFormFeatures([...formFeatures, ''])
  }

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...formFeatures]
    updated[index] = value
    setFormFeatures(updated)
  }

  const handleRemoveFeature = (index: number) => {
    const updated = formFeatures.filter((_, i) => i !== index)
    setFormFeatures(updated.length ? updated : [''])
  }

  // Add Specification Row
  const handleAddSpecRow = () => {
    setFormSpecs([...formSpecs, { label: '', value: '' }])
  }

  const handleSpecChange = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...formSpecs]
    updated[index] = { ...updated[index], [field]: value }
    setFormSpecs(updated)
  }

  const handleRemoveSpec = (index: number) => {
    const updated = formSpecs.filter((_, i) => i !== index)
    setFormSpecs(updated.length ? updated : [{ label: '', value: '' }])
  }

  // Reset form
  const handleResetForm = () => {
    setEditingProductId(null)
    setFormName('')
    setFormCategory('Pulleys')
    setFormImage('/Images/Aluminium%20Coupling.jpg')
    setFormAdditionalImages([])
    setFormSpec('')
    setFormDescription('')
    setFormFeatures([''])
    setFormSpecs([
      { label: 'Material', value: 'Cast Iron / Alloy Steel' },
      { label: 'Application', value: 'Industrial Power Transmission' },
    ])
  }

  // Populate form for editing
  const handleEditProduct = (product: CatalogProduct) => {
    setEditingProductId(product.id)
    setFormName(product.name)
    setFormCategory(product.category)
    setFormImage(product.image)
    setFormAdditionalImages(product.images.filter((img) => img !== product.image))
    setFormSpec(product.spec)
    setFormDescription(product.description)
    setFormFeatures(product.features.length ? product.features : [''])
    setFormSpecs(product.specs.length ? product.specs : [{ label: 'Material', value: 'CI' }])
    setActiveTab('add')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Duplicate Product
  const handleDuplicateProduct = (product: CatalogProduct) => {
    setEditingProductId(null)
    setFormName(`${product.name} (Copy)`)
    setFormCategory(product.category)
    setFormImage(product.image)
    setFormAdditionalImages([...product.images])
    setFormSpec(product.spec)
    setFormDescription(product.description)
    setFormFeatures([...product.features])
    setFormSpecs([...product.specs])
    setActiveTab('add')
    showToast('success', `Duplicating "${product.name}". Adjust the details and click Publish.`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Submit Product (Create or Update)
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formName.trim()) {
      showToast('error', 'Please enter a product title / name')
      return
    }

    if (!formImage.trim()) {
      showToast('error', 'Please select or upload an image for the product')
      return
    }

    setIsSubmitting(true)

    const allImages = [formImage, ...formAdditionalImages.filter(Boolean)]
    const cleanFeatures = formFeatures.map((f) => f.trim()).filter(Boolean)
    const cleanSpecs = formSpecs
      .map((s) => ({ label: s.label.trim(), value: s.value.trim() }))
      .filter((s) => s.label && s.value)

    const productPayload: Partial<CatalogProduct> = {
      id: editingProductId || undefined,
      name: formName.trim(),
      category: formCategory,
      image: formImage.trim(),
      images: allImages.length ? allImages : [formImage.trim()],
      spec: formSpec.trim() || 'Precision industrial power transmission product',
      description:
        formDescription.trim() ||
        `${formName.trim()} engineered for heavy-duty industrial reliability and smooth power transmission.`,
      features: cleanFeatures.length ? cleanFeatures : ['Industrial grade', 'High durability', 'Precision machined'],
      specs: cleanSpecs.length
        ? cleanSpecs
        : [
            { label: 'Material', value: 'Industrial Alloy' },
            { label: 'Supply', value: 'Ready Stock / Custom' },
          ],
    }

    try {
      const endpoint = '/api/products'
      const method = editingProductId ? 'PUT' : 'POST'

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productPayload),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        showToast('success', editingProductId ? `Product "${formName}" updated!` : `Product "${formName}" added to live catalog!`)
        fetchProducts()
        handleResetForm()
        setActiveTab('inventory')

        // Notify other windows/tabs
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('catalog-updated'))
        }
      } else {
        showToast('error', data.error || 'Failed to save product.')
      }
    } catch (err) {
      console.error('Error saving product:', err)
      showToast('error', 'Network error while saving product.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Delete Product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the catalog?`)) {
      return
    }

    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      if (res.ok && data.success) {
        showToast('success', `Product "${name}" deleted.`)
        fetchProducts()
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('catalog-updated'))
        }
      } else {
        showToast('error', data.error || 'Could not delete product.')
      }
    } catch (err) {
      showToast('error', 'Error sending delete request.')
    }
  }

  // Reset to default factory catalogue
  const handleResetCatalog = async () => {
    if (
      !confirm(
        'Are you sure you want to reset the catalog to factory default items? Any custom products added will be cleared.',
      )
    ) {
      return
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset_defaults' }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        showToast('success', 'Catalog reset to original factory items.')
        fetchProducts()
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('catalog-updated'))
        }
      }
    } catch (err) {
      showToast('error', 'Error resetting catalog.')
    }
  }

  // Export Catalog JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `alburhan-catalog-export-${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
    showToast('success', 'Catalog JSON exported successfully.')
  }

  // Filtered Products for Inventory table
  const filteredProducts = products.filter((p) => {
    const isCustom = !catalogItems.some((ci) => ci.id === p.id)
    if (filterOrigin === 'custom' && !isCustom) return false
    if (filterOrigin === 'default' && isCustom) return false

    if (filterCategory !== 'All' && p.category.toLowerCase() !== filterCategory.toLowerCase()) {
      return false
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matches = `${p.name} ${p.category} ${p.spec} ${p.description}`.toLowerCase().includes(q)
      if (!matches) return false
    }

    return true
  })

  // Filtered preset images for the image picker modal
  const filteredPresets = presetImages.filter((preset) => {
    if (!pickerSearch.trim()) return true
    return preset.displayName.toLowerCase().includes(pickerSearch.toLowerCase().trim())
  })

  // Quick stats
  const customCount = products.filter((p) => !catalogItems.some((ci) => ci.id === p.id)).length
  const totalCount = products.length

  // Render Login Gate if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[linear-gradient(135deg,#0a192f_0%,#003366_50%,#081b2f_100%)] flex items-center justify-center p-4 sm:p-6 text-slate-100">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.35)] text-slate-900 border border-slate-100">
          <div className="text-center">
            <div className="inline-flex justify-center items-center mb-5 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
              <BrandLogo large imgClassName="h-16 w-auto" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#003366]/10 text-[#003366] text-xs font-bold uppercase tracking-wider mb-2">
              <Lock size={12} />
              Private Staff Area
            </div>
            <h1 className="text-2xl font-black text-[#0A3D62] tracking-tight">Product Management Portal</h1>
            <p className="text-sm text-slate-500 mt-2">
              Enter your master administrative passcode to manage, add, or edit products in the catalog.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label htmlFor="passcode" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  id="passcode"
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent text-slate-900 pr-12 text-base font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <Eye size={18} />
                </button>
              </div>
              {passcodeError && (
                <p className="text-xs font-semibold text-[#C0392B] mt-2 flex items-center gap-1">
                  <span>⚠️</span> {passcodeError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 px-6 rounded-xl bg-[#003366] hover:bg-[#084b80] text-white font-bold text-sm shadow-lg shadow-[#003366]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <RefreshCw size={16} className="animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  <KeyRound size={16} /> Unlock Private Portal
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Passcode: <code className="bg-slate-100 px-2 py-0.5 rounded text-[#003366] font-bold">alburhan2026</code></span>
              <button
                type="button"
                onClick={() => {
                  setPasscode('alburhan2026')
                  setPasscodeError('')
                }}
                className="text-[#003366] font-bold hover:underline cursor-pointer"
              >
                Auto Fill
              </button>
            </div>
            <div className="mt-4">
              <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#003366] transition">
                <ArrowLeft size={13} /> Return to Storefront
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-[200] max-w-md px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300 ${
            toastMessage.type === 'success'
              ? 'bg-[#003366] text-white border border-[#25D366]/30'
              : 'bg-[#C0392B] text-white'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 size={20} className="text-[#25D366] shrink-0" />
          ) : (
            <X size={20} className="shrink-0" />
          )}
          <p className="text-sm font-semibold">{toastMessage.text}</p>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#003366] text-white border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center bg-white px-3 py-1.5 rounded-xl">
              <BrandLogo className="origin-left scale-100" />
            </Link>
            <div className="hidden sm:block border-l border-white/20 pl-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#ff8a2a] bg-[#ff8a2a]/20 px-2.5 py-0.5 rounded-full">
                  Admin Center
                </span>
                <span className="text-xs text-white/70">Product Catalogue Manager</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/#products"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">View Live Store</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#C0392B] text-xs font-bold text-white transition cursor-pointer"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sub Navigation Bar & Metrics */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('add')
                  if (!editingProductId) handleResetForm()
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'add'
                    ? 'bg-[#003366] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <PackagePlus size={15} />
                {editingProductId ? 'Edit Product' : 'Add New Product'}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('inventory')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'inventory'
                    ? 'bg-[#003366] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Layers size={15} />
                Inventory & Products ({totalCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tools')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'tools'
                    ? 'bg-[#003366] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <SlidersHorizontal size={15} />
                Catalog Tools
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 sm:gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#25D366]"></span>
                <span className="font-semibold">Live Catalogue:</span>
                <strong className="text-slate-900 font-bold">{totalCount} items</strong>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff8a2a]"></span>
                <span className="font-semibold">Custom Added:</span>
                <strong className="text-slate-900 font-bold">{customCount} items</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: ADD / EDIT PRODUCT */}
        {activeTab === 'add' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold text-[#0A3D62]">
                      {editingProductId ? 'Edit Product Details' : 'Add New Product to Catalog'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill in the technical specifications, image, and details. Changes update the live storefront immediately.
                    </p>
                  </div>
                  {editingProductId && (
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-xs text-[#C0392B] font-bold hover:underline"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmitProduct} className="mt-6 space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Product Name / Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. C.I. Double Groove V-Belt Pulley"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-[#003366] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Product Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => handleCategoryChange(e.target.value as CatalogProduct['category'])}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-[#003366] focus:outline-none cursor-pointer"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Quick Headline Specification
                      </label>
                      <input
                        type="text"
                        value={formSpec}
                        onChange={(e) => setFormSpec(e.target.value)}
                        placeholder="e.g. Precision dynamic balancing for motor drives"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-[#003366] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Image Manager */}
                  <div className="border-t border-slate-100 pt-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Product Image <span className="text-red-500">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Button to Open Preset Gallery */}
                      <button
                        type="button"
                        onClick={() => setShowPresetPicker(true)}
                        className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-[#003366]/30 bg-[#003366]/5 hover:bg-[#003366]/10 text-[#003366] transition cursor-pointer"
                      >
                        <ImageIcon size={22} className="mb-1.5" />
                        <span className="text-xs font-bold">Pick From Photo Library</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">40+ preloaded gear/pulley images</span>
                      </button>

                      {/* Button to Upload Computer File */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                      >
                        <Upload size={22} className="mb-1.5 text-slate-600" />
                        <span className="text-xs font-bold">Upload Custom Image</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">PNG, JPG up to 5MB</span>
                      </button>

                      {/* Direct URL Input */}
                      <div className="flex flex-col justify-center p-3 rounded-2xl border border-slate-200 bg-white">
                        <span className="text-[11px] font-bold text-slate-700 mb-1">Or Paste Image URL</span>
                        <input
                          type="text"
                          value={formImage}
                          onChange={(e) => setFormImage(e.target.value)}
                          placeholder="https://... or /Images/..."
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#003366]"
                        />
                      </div>
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    {/* Selected Image Preview */}
                    {formImage && (
                      <div className="mt-3 flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                        <div className="relative h-16 w-16 bg-white rounded-xl overflow-hidden border border-slate-200 shrink-0">
                          <Image src={formImage} alt="Selected" fill className="object-contain p-1" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate">Selected: {formImage}</p>
                          <p className="text-[11px] text-slate-500">Will be featured on the card and modal view</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormImage('')}
                          className="text-xs text-red-500 font-bold hover:underline p-2"
                        >
                          Change
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Detailed Description */}
                  <div className="border-t border-slate-100 pt-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Product Description
                    </label>
                    <textarea
                      rows={3}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Detailed overview of applications, load handling, fitment specs..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-[#003366] focus:outline-none"
                    />
                  </div>

                  {/* Features Bullet List Builder */}
                  <div className="border-t border-slate-100 pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Key Features & Highlights
                      </label>
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#003366] hover:underline cursor-pointer"
                      >
                        <Plus size={14} /> Add Feature Bullet
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formFeatures.map((feat, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 w-5">{index + 1}.</span>
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            placeholder="e.g. Precision bored & keyed to tolerances"
                            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-1 focus:ring-[#003366] focus:outline-none"
                          />
                          {formFeatures.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(index)}
                              className="text-slate-400 hover:text-red-500 p-1.5"
                              aria-label="Remove feature"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Specifications Table Builder */}
                  <div className="border-t border-slate-100 pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Technical Specifications (Key - Value)
                      </label>
                      <button
                        type="button"
                        onClick={handleAddSpecRow}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#003366] hover:underline cursor-pointer"
                      >
                        <Plus size={14} /> Add Specification Row
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formSpecs.map((specItem, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={specItem.label}
                            onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                            placeholder="Label (e.g. Material)"
                            className="w-1/3 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:ring-1 focus:ring-[#003366] focus:outline-none"
                          />
                          <input
                            type="text"
                            value={specItem.value}
                            onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                            placeholder="Value (e.g. Cast Iron / EN-8)"
                            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-1 focus:ring-[#003366] focus:outline-none"
                          />
                          {formSpecs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveSpec(index)}
                              className="text-slate-400 hover:text-red-500 p-1.5"
                              aria-label="Remove specification"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-slate-100 pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                    >
                      Clear Form
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-xl bg-[#003366] hover:bg-[#0a4b80] text-white font-bold text-sm shadow-lg shadow-[#003366]/25 transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" /> Saving to Live Catalogue...
                        </>
                      ) : (
                        <>
                          <Check size={16} /> {editingProductId ? 'Update Product' : 'Publish Product to Catalog'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Live Preview Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#ff8a2a]" />
                    Live Storefront Preview
                  </h3>
                  <span className="text-[10px] bg-[#25D366]/10 text-[#25D366] font-extrabold px-2 py-0.5 rounded-full">
                    Real-time
                  </span>
                </div>

                <div className="mt-4">
                  <div className="product-card group relative flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md">
                    <div className="relative h-48 w-full bg-slate-50 flex items-center justify-center p-4">
                      {formImage ? (
                        <Image src={formImage} alt="Preview" fill className="object-contain p-4" />
                      ) : (
                        <div className="text-xs text-slate-400 flex flex-col items-center">
                          <ImageIcon size={32} className="mb-1 text-slate-300" />
                          No image selected
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C0392B]">
                        {formCategory}
                      </span>
                      <h4 className="text-base font-bold text-[#0A3D62] mt-1 line-clamp-1">
                        {formName || 'Your Product Title'}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {formSpec || 'Product headline specification will appear here...'}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          className="w-full py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <MessageCircle size={14} />
                          Quote via WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                    <div className="font-bold text-slate-800">Card Specifications:</div>
                    <div>• Features: {formFeatures.filter(Boolean).length} points</div>
                    <div>• Tech Specs: {formSpecs.filter((s) => s.label && s.value).length} rows</div>
                    <div>• Full View: Accessible by clicking the card on the live site</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY & MANAGE PRODUCTS */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pb-6 border-b border-slate-100">
                <div className="relative w-full sm:w-80">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search inventory..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#003366]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
                  >
                    <option value="All">All Categories</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setFilterOrigin('all')}
                      className={`px-3 py-1.5 rounded-lg transition ${
                        filterOrigin === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      All ({products.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterOrigin('custom')}
                      className={`px-3 py-1.5 rounded-lg transition ${
                        filterOrigin === 'custom' ? 'bg-white text-[#003366] font-bold shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      Custom Added ({customCount})
                    </button>
                  </div>
                </div>
              </div>

              {/* Table of Products */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50/50">
                      <th className="py-3 px-4 rounded-l-xl">Product</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Origin</th>
                      <th className="py-3 px-4">Specs Count</th>
                      <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {isLoadingProducts ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-[#003366]" />
                          Loading product inventory...
                        </td>
                      </tr>
                    ) : filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          No products found matching filters.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => {
                        const isCustom = !catalogItems.some((ci) => ci.id === p.id)

                        return (
                          <tr key={p.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="relative h-12 w-12 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0">
                                  <Image src={p.image} alt={p.name} fill className="object-contain p-1" />
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1">{p.spec}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-slate-800">{p.category}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              {isCustom ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#003366]/10 text-[#003366] font-bold text-[10px]">
                                  <Sparkles size={10} className="text-[#ff8a2a]" /> Custom Added
                                </span>
                              ) : (
                                <span className="text-slate-400 text-[11px]">Factory Catalog</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-slate-600">{p.specs?.length || 0} specifications</span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setPreviewProduct(p)}
                                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition"
                                  title="Quick View Modal"
                                >
                                  <Eye size={15} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDuplicateProduct(p)}
                                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition"
                                  title="Duplicate as new product"
                                >
                                  <Copy size={15} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleEditProduct(p)}
                                  className="p-1.5 rounded-lg hover:bg-slate-200 text-[#003366] transition"
                                  title="Edit Product"
                                >
                                  <Edit2 size={15} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProduct(p.id, p.name)}
                                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition"
                                  title="Delete Product"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TOOLS & DATA MANAGEMENT */}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#003366]/10 text-[#003366] rounded-2xl">
                  <Download size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Export Product Catalog</h3>
                  <p className="text-xs text-slate-500">Download the entire database in JSON format</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Save a full backup of all {products.length} products including images, technical specs, categories, and descriptions.
              </p>
              <button
                type="button"
                onClick={handleExportJSON}
                className="w-full py-3 px-4 rounded-xl bg-[#003366] text-white font-bold text-xs hover:bg-[#0a4b80] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={14} /> Download Catalog (JSON)
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                  <RefreshCw size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Reset to Factory Catalog</h3>
                  <p className="text-xs text-slate-500">Revert custom additions to original state</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Restore the default {catalogItems.length} precision drive items from the initial installation.
              </p>
              <button
                type="button"
                onClick={handleResetCatalog}
                className="w-full py-3 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw size={14} /> Reset Catalog to Defaults
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Preset Photo Picker Modal */}
      {showPresetPicker && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-base font-bold text-[#0A3D62]">Select From Preloaded Industrial Photos</h3>
                <p className="text-xs text-slate-500">Click any photo to assign it to your product</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPresetPicker(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 border-b border-slate-100 bg-white">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={pickerSearch}
                  onChange={(e) => setPickerSearch(e.target.value)}
                  placeholder="Filter images (e.g. Pulley, Gear, Coupling, Sprocket)..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredPresets.map((preset) => {
                const isSelected = formImage === preset.url

                return (
                  <div
                    key={preset.fileName}
                    onClick={() => {
                      setFormImage(preset.url)
                      setShowPresetPicker(false)
                      showToast('success', `Selected "${preset.displayName}" image`)
                    }}
                    className={`group relative p-2 rounded-2xl border transition cursor-pointer flex flex-col items-center text-center ${
                      isSelected
                        ? 'border-[#003366] bg-[#003366]/5 ring-2 ring-[#003366]'
                        : 'border-slate-200 hover:border-[#003366] hover:bg-slate-50'
                    }`}
                  >
                    <div className="relative h-24 w-full bg-white rounded-xl overflow-hidden mb-2">
                      <Image src={preset.url} alt={preset.displayName} fill className="object-contain p-2" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-800 line-clamp-2">
                      {preset.displayName}
                    </span>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#003366] text-white rounded-full p-1">
                        <Check size={12} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPresetPicker(false)}
                className="px-5 py-2 rounded-xl bg-[#003366] text-white text-xs font-bold hover:bg-[#0a4b80]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Product Modal */}
      {previewProduct && (
        <ProductModal product={previewProduct} onClose={() => setPreviewProduct(null)} />
      )}
    </div>
  )
}
