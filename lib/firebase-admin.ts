import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import fallbackServiceAccount from '../public/alburhan-f9cb7-firebase-adminsdk-fbsvc-45186921b4.json'

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

  const serviceAccount = fallbackServiceAccount as ServiceAccount
  const projectId = process.env.FIREBASE_PROJECT_ID ?? serviceAccount.project_id
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL ?? serviceAccount.client_email
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? serviceAccount.private_key?.replace(/\\n/g, '\n')

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
