import { NextResponse } from 'next/server'
import { getFirestoreInstance } from '@/lib/firebase-admin'

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

const contactCollection = 'contact_submissions'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload
    const name = body.name?.trim()
    const email = body.email?.trim()
    const phone = body.phone?.trim()
    const subject = body.subject?.trim()
    const message = body.message?.trim()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Please complete all required fields.' },
        { status: 400 },
      )
    }

    const payload = {
      name,
      email,
      phone: phone || '',
      subject,
      message,
      source: 'website-contact-form',
      createdAt: new Date().toISOString(),
    }

    // Try to save to Firebase if credentials are configured
    try {
      const firestore = getFirestoreInstance()
      await firestore.collection(contactCollection).add(payload)
    } catch (firebaseError) {
      console.warn('Firebase not configured, skipping Firestore save:', firebaseError)
    }

    // Try to forward to Google Sheets if webhook is configured
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (sheetsWebhookUrl) {
      try {
        const sheetResponse = await fetch(sheetsWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!sheetResponse.ok) {
          console.warn('Failed to forward submission to Google Sheets.')
        }
      } catch (sheetsError) {
        console.warn('Error forwarding to Google Sheets:', sheetsError)
      }
    }

    return NextResponse.json(
      { message: 'Contact submission received. We\'ll get back to you soon.' },
      { status: 201 },
    )
  } catch (error) {
    console.error('Contact submission error:', error)

    return NextResponse.json(
      { message: 'Unable to submit the form right now.' },
      { status: 500 },
    )
  }
}
