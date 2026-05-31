export type CatalogProduct = {
  id: string
  name: string
  category: 'Pulleys' | 'Couplings' | 'Gears' | 'Sprockets' | 'Chains' | 'Accessories'
  image: string
  images: string[]
  spec: string
  description: string
  features: string[]
  specs: { label: string; value: string }[]
}

const imageFiles = [
  'Aluminium Coupling.jpg',
  'Aluminium Handle.jpg',
  'Aluminium Step Pulley.jpg',
  'Anti Vibration Mounting.jpg',
  'avm.png',
  'Bevel Gear.jpg',
  'C.I. Break Drum Coupling.jpg',
  'C.I. Flat Pulley.jpg',
  'C.I. Handle.jpg',
  'C.I. Step Pulley.jpg',
  'C.I. V-Belt Pulley - Arms.jpg',
  'C.I. V-Belt Pulley - Semi Solid.jpg',
  'C.I. V-Belt Pulley- Solid.jpg',
  'Chain Coupling.jpg',
  'CI Spur Gear.jpg',
  'CI Worm Gear.jpg',
  'Duplex Sprocket.jpg',
  'Encoder Coupling.jpg',
  'Flexible Coupling.jpg',
  'Full Lock - Diamond.jpg',
  'Gear Coupling.jpg',
  'GR Coupling(1).jpg',
  'GR Coupling.jpg',
  'GR Spider.jpg',
  'Half Lock.jpg',
  'HRC Coupling(1).jpg',
  'HRC Coupling.jpg',
  'HRC Rubber.jpg',
  'M.S. Breakdrum Coupling.jpeg',
  'Nylon Sleeve Coupling.jpg',
  'Nylon Sleeve.jpg',
  'Rack and Pinion.jpg',
  'Roller Chain.jpg',
  'rope pulley.png',
  'rrl coupling.png',
  'Rubber Spider.jpg',
  'Rubber Tyre.jpg',
  'rubber.png',
  'Simplex Sprocket.jpg',
  'spur gear.png',
  'Star Coupling.jpg',
  'TaperLock Pulley.jpeg',
  'Timing Belt Pulley.jpg',
  'Triplex Sprocket.jpg',
  'Variable Speed Pulley.jpeg',
  'worm gear.jpg',
] as const

const categoryDetails: Record<Exclude<CatalogProduct['category'], never>, {
  spec: string
  description: string
  features: string[]
  specs: { label: string; value: string }[]
}> = {
  Pulleys: {
    spec: 'Precision pulley solution for dependable belt transfer',
    description: 'Pulley products for stable fitment, clean belt tracking, and repeatable industrial use.',
    features: ['Stable groove profile', 'Reliable belt transfer', 'Easy replacement planning'],
    specs: [
      { label: 'Material', value: 'CI / Steel / Alloy' },
      { label: 'Use', value: 'Power transmission' },
      { label: 'Fit', value: 'Industrial pulley' },
      { label: 'Supply', value: 'Made to order' },
    ],
  },
  Couplings: {
    spec: 'Industrial coupling for torque transfer and alignment support',
    description: 'Coupling products for shaft connection, shock control, and low-maintenance field use.',
    features: ['Shock absorption', 'Torque transfer', 'Service-friendly design'],
    specs: [
      { label: 'Material', value: 'CI / Steel / Rubber' },
      { label: 'Use', value: 'Shaft connection' },
      { label: 'Type', value: 'Coupling part' },
      { label: 'Supply', value: 'Custom order' },
    ],
  },
  Gears: {
    spec: 'Precision gear component for stable motion transfer',
    description: 'Gear products for dependable engagement, controlled movement, and industrial durability.',
    features: ['Controlled motion', 'Durable tooth form', 'Industrial-ready profile'],
    specs: [
      { label: 'Material', value: 'CI / Steel / Bronze' },
      { label: 'Use', value: 'Gear drive' },
      { label: 'Profile', value: 'Precision gear' },
      { label: 'Supply', value: 'Made to order' },
    ],
  },
  Sprockets: {
    spec: 'Chain-ready sprocket for dependable engagement',
    description: 'Sprocket products for industrial chain systems that need clean engagement and long service life.',
    features: ['Chain engagement', 'Durable profile', 'Industrial fit'],
    specs: [
      { label: 'Material', value: 'CI / Steel' },
      { label: 'Use', value: 'Chain drive' },
      { label: 'Type', value: 'Sprocket' },
      { label: 'Supply', value: 'Custom tooth count' },
    ],
  },
  Chains: {
    spec: 'Industrial chain solution for drive applications',
    description: 'Chain products for motion transfer, load handling, and industrial replacement planning.',
    features: ['Load handling', 'Repeatable drive transfer', 'Industrial replacement ready'],
    specs: [
      { label: 'Material', value: 'Alloy steel' },
      { label: 'Use', value: 'Chain drive' },
      { label: 'Type', value: 'Roller chain' },
      { label: 'Supply', value: 'By length / custom' },
    ],
  },
  Accessories: {
    spec: 'Industrial accessory for support and fitment use',
    description: 'Accessory products used for mounting, protection, or application-specific fitment.',
    features: ['Support component', 'Fitment aid', 'Industrial use ready'],
    specs: [
      { label: 'Material', value: 'Varies' },
      { label: 'Use', value: 'Accessory' },
      { label: 'Type', value: 'Support part' },
      { label: 'Supply', value: 'Custom order' },
    ],
  },
}

export const imageFilesList = imageFiles

export const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const normalizeProductGroupName = (fileName: string) =>
  fileName
    .replace(/\.[^.]+$/, '')
    .replace(/\s*\(\d+\)$/, '')
    .replace(/\s+/g, ' ')
    .trim()

const inferCategory = (fileName: string): CatalogProduct['category'] => {
  const name = fileName.toLowerCase()

  if (name.includes('pulley')) return 'Pulleys'
  if (name.includes('coupling') || name.includes('spider') || name.includes('lock') || name.includes('sleeve') || name.includes('diamond')) return 'Couplings'
  if (name.includes('gear') || name.includes('pinion')) return 'Gears'
  if (name.includes('sprocket')) return 'Sprockets'
  if (name.includes('chain')) return 'Chains'

  return 'Accessories'
}

const toTitleFromFileName = (fileName: string) =>
  fileName
    .replace(/\.[^.]+$/, '')
    .replace(/\s+/g, ' ')
    .trim()

const toProductId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const buildImageLink = (fileName: string) => `/Images/${encodeURI(fileName.replace(/\.[^.]+$/, '.png'))}`

const groupedSources = imageFiles.reduce<Array<{
  baseName: string
  category: CatalogProduct['category']
  imageLinks: string[]
}>>((groups, fileName) => {
  const baseName = normalizeProductGroupName(fileName)
  const category = inferCategory(fileName)
  const imageLink = buildImageLink(fileName)
  const key = `${category}::${baseName.toLowerCase()}`
  const existingGroup = groups.find((group) => `${group.category}::${group.baseName.toLowerCase()}` === key)

  if (existingGroup) {
    existingGroup.imageLinks.push(imageLink)
    return groups
  }

  groups.push({
    baseName,
    category,
    imageLinks: [imageLink],
  })

  return groups
}, [])

export const catalogItems: CatalogProduct[] = groupedSources.map((group) => {
  // Allow overriding certain base names to friendlier product titles
  const renameMap: Record<string, string> = {
    'avm': 'Cushy Foot Mounting',
    'anti vibration mounting': 'Cushy Foot Mounting',
    'rrl coupling': 'RRS Coupling',
    'rrl coupling(1)': 'RRS Coupling',
    'rrl': 'RRS Coupling',
    'rubber spider': 'Rubber Spider (PU)',
    'rubber spider(1)': 'Rubber Spider (PU)',
  }

  const details = categoryDetails[group.category]
  const displayName = renameMap[group.baseName.toLowerCase()] ?? group.baseName

  return {
    id: toProductId(`${group.category}-${group.baseName}`),
    name: displayName,
    category: group.category,
    image: group.imageLinks[0],
    images: group.imageLinks,
    spec: details.spec,
    description: details.description,
    features: details.features,
    specs: details.specs,
  }
})
