import fs from 'node:fs'
import path from 'node:path'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

let firestoreInstance: ReturnType<typeof getFirestore> | null = null

const fallbackServiceAccountPath = path.join(process.cwd(), 'public', 'alburhan-f9cb7-firebase-adminsdk-fbsvc-45186921b4.json')

function loadServiceAccountFromFallbackFile() {
  if (!fs.existsSync(fallbackServiceAccountPath)) {
    return null
  }

  try {
    return JSON.parse(fs.readFileSync(fallbackServiceAccountPath, 'utf8')) as {
      project_id: string
      client_email: string
      private_key: string
    }
  } catch (error) {
    console.warn('Unable to read fallback Firebase service account file:', error)
    return null
  }
}

export function getFirestoreInstance() {
  if (firestoreInstance) {
    return firestoreInstance
  }

  const fallbackServiceAccount = loadServiceAccountFromFallbackFile()
  const projectId = process.env.FIREBASE_PROJECT_ID ?? fallbackServiceAccount?.project_id
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL ?? fallbackServiceAccount?.client_email
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, '\n') ?? fallbackServiceAccount?.private_key?.replace(/\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin credentials.')
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    })
  }

  firestoreInstance = getFirestore()
  return firestoreInstance
}
