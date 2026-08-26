import { NextRequest, NextResponse } from 'next/server'

// Default passcode if not set in environment
const DEFAULT_PASSCODE = process.env.ADMIN_PASSCODE || 'alburhan2026'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { passcode } = body

    if (!passcode) {
      return NextResponse.json(
        { error: 'Passcode is required' },
        { status: 400 },
      )
    }

    if (passcode.trim() === DEFAULT_PASSCODE.trim()) {
      return NextResponse.json({
        success: true,
        authenticated: true,
        message: 'Access granted to Private Product Module',
        token: `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      })
    }

    return NextResponse.json(
      { success: false, authenticated: false, error: 'Invalid passcode. Please try again.' },
      { status: 401 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication request failed' },
      { status: 500 },
    )
  }
}
