import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const { name, phone, email, address, service, date, notes } = body

  if (!name || !phone || !address || !service) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'bookings@czystycleaners.com',
      to: ['hello@czystycleaners.com'],
      subject: `New Pickup Request — ${name}`,
      html: `
        <h2 style="color:#1A5C28">New Booking Request</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${email || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Address</strong></td><td style="padding:8px;border:1px solid #ddd">${address}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Service</strong></td><td style="padding:8px;border:1px solid #ddd">${service}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Preferred Date</strong></td><td style="padding:8px;border:1px solid #ddd">${date || 'Not specified'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Notes</strong></td><td style="padding:8px;border:1px solid #ddd">${notes || 'None'}</td></tr>
        </table>
      `,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send booking email.' }, { status: 500 })
  }
}
