import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, phone } = await req.json()

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
  }

  try {
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'noreply@czystycleaners.com',
        to: process.env.NOTIFICATION_EMAIL ?? 'hello@czystycleaners.com',
        subject: '🧺 New QR Registration — Czysty Cleaners',
        html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto">
            <h2 style="color:#1A5C28;margin-bottom:24px">New Customer Registration</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#6B7B6B;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Name</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#6B7B6B;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Phone</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600">${phone}</td></tr>
              <tr><td style="padding:10px 0;color:#6B7B6B;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Email</td><td style="padding:10px 0">${email || '—'}</td></tr>
            </table>
            <p style="margin-top:24px;font-size:12px;color:#aaa">Registered via QR code scan · ${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' })} (Lagos time)</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
