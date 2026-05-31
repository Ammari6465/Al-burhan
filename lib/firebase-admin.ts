import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

let firestoreInstance: ReturnType<typeof getFirestore> | null = null

type ServiceAccount = {
  project_id: string
  client_email: string
  private_key: string
}

export function getFirestoreInstance() {
  if (firestoreInstance) {
    return firestoreInstance
  }

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

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
