import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body?.email === 'string' ? body.email.trim() : ''

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
    }

    console.log('[waitlist] new signup:', email)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist] error:', err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
