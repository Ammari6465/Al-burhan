import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const workspaceRoot = path.resolve(__dirname, '..')
const serviceAccountPath = process.argv[2]
  ? path.resolve(workspaceRoot, process.argv[2])
  : path.resolve(workspaceRoot, 'public/alburhan-f9cb7-firebase-adminsdk-fbsvc-45186921b4.json')
const catalogPath = path.resolve(workspaceRoot, 'lib/product-catalog.ts')

const contactCollection = 'products'

const categoryDetails = {
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

const normalizeProductGroupName = (fileName) =>
  fileName
    .replace(/\.[^.]+$/, '')
    .replace(/\s*\(\d+\)$/, '')
    .replace(/\s+/g, ' ')
    .trim()

const inferCategory = (fileName) => {
  const name = fileName.toLowerCase()

  if (name.includes('pulley')) return 'Pulleys'
  if (name.includes('coupling') || name.includes('spider') || name.includes('lock') || name.includes('sleeve') || name.includes('diamond')) return 'Couplings'
  if (name.includes('gear') || name.includes('pinion')) return 'Gears'
  if (name.includes('sprocket')) return 'Sprockets'
  if (name.includes('chain')) return 'Chains'

  return 'Accessories'
}

const toProductId = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const buildImageLink = (fileName) => `/Images/${encodeURI(fileName.replace(/\.[^.]+$/, '.png'))}`

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`Service account file not found: ${serviceAccountPath}`)
  process.exit(1)
}

if (!fs.existsSync(catalogPath)) {
  console.error(`Catalog file not found: ${catalogPath}`)
  process.exit(1)
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
const catalogSource = fs.readFileSync(catalogPath, 'utf8')
const match = catalogSource.match(/const imageFiles = \[([\s\S]*?)\] as const/)

if (!match) {
  console.error('Could not locate imageFiles array in lib/product-catalog.ts')
  process.exit(1)
}

const filenames = [...match[1].matchAll(/'([^']+)'/g)].map((entry) => entry[1])
const groups = []

for (const fileName of filenames) {
  const baseName = normalizeProductGroupName(fileName)
  const category = inferCategory(fileName)
  const imageLink = buildImageLink(fileName)
  const groupKey = `${category}::${baseName.toLowerCase()}`
  const existingGroup = groups.find((group) => group.groupKey === groupKey)

  if (existingGroup) {
    existingGroup.images.push(imageLink)
    continue
  }

  groups.push({
    groupKey,
    baseName,
    category,
    images: [imageLink],
  })
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
  })
}

const firestore = getFirestore()
const batch = firestore.batch()

for (const group of groups) {
  const details = categoryDetails[group.category]
  const docId = toProductId(`${group.category}-${group.baseName}`)
  const ref = firestore.collection(contactCollection).doc(docId)

  batch.set(
    ref,
    {
      id: docId,
      name: group.baseName,
      category: group.category,
      image: group.images[0],
      images: group.images,
      imageLink: group.images[0],
      spec: details.spec,
      description: details.description,
      features: details.features,
      specs: details.specs,
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  )
}

await batch.commit()

console.log(`Seeded ${groups.length} grouped products into Firestore collection "${contactCollection}".`)
