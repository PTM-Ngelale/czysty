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
    // Notify admin
    await resend.emails.send({
      from: 'bookings@czystycleaners.com',
      to: [process.env.NOTIFICATION_EMAIL ?? 'info.czysty@gmail.com'],
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

    // Send confirmation to user (only if they provided an email)
    if (email) {
      await resend.emails.send({
        from: 'bookings@czystycleaners.com',
        to: email,
        subject: '✅ Booking Received — Czysty Cleaners',
        html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#09100A">
            <h2 style="color:#1A5C28;margin-bottom:8px">We've got your request, ${name}!</h2>
            <p style="color:#6B7B6B;font-size:14px;line-height:1.6;margin-bottom:16px">
              Thank you for booking with <strong>Czysty Cleaners</strong>. Here's a summary of what we received:
            </p>
            <table style="border-collapse:collapse;width:100%;margin-bottom:24px">
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6B7B6B;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Service</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">${service}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6B7B6B;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Address</td><td style="padding:8px 0;border-bottom:1px solid #eee">${address}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7B6B;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Preferred Date</td><td style="padding:8px 0">${date || 'Flexible'}</td></tr>
            </table>
            <p style="color:#6B7B6B;font-size:14px;line-height:1.6;margin-bottom:24px">
              Our team will confirm your pickup within the hour during business hours (Mon – Sat, 8am – 6pm).
            </p>
            <hr style="border:none;border-top:1px solid #eee;margin-bottom:24px" />
            <p style="font-size:12px;color:#aaa">
              Czysty Cleaners Int'l Ltd · Lagos<br/>
              📞 +234 807 213 3343 · 📧 info.czysty@gmail.com
            </p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send booking email.' }, { status: 500 })
  }
}
