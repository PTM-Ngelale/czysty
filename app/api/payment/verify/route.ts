import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { pickBookingMetaFields, renderBookingDetailsHtml } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const { transactionId, txRef, expectedAmount, contact, bookingDetails } = body

  if (!transactionId || !txRef || !expectedAmount || !contact?.email) {
    return NextResponse.json({ success: false, error: 'Missing verification fields.' }, { status: 400 })
  }

  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY
  if (!secretKey) {
    console.error('FLUTTERWAVE_SECRET_KEY is not configured.')
    return NextResponse.json({ success: false, error: 'Payment verification is not configured.' }, { status: 500 })
  }

  try {
    const verifyRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      { headers: { Authorization: `Bearer ${secretKey}` } },
    )
    const verifyData = await verifyRes.json()
    const tx = verifyData?.data

    const isValid =
      verifyRes.ok &&
      verifyData?.status === 'success' &&
      tx?.status === 'successful' &&
      tx?.tx_ref === txRef &&
      tx?.currency === 'NGN' &&
      Number(tx?.amount) >= Number(expectedAmount)

    if (!isValid) {
      console.error('Flutterwave verification failed:', verifyData)
      return NextResponse.json({ success: false, error: 'Payment could not be verified.' }, { status: 400 })
    }

    const name = `${contact.firstName ?? ''} ${contact.lastName ?? ''}`.trim()
    const bookingMeta = pickBookingMetaFields(bookingDetails ?? {})
    const bookingHtml = renderBookingDetailsHtml(bookingMeta)

    await resend.emails.send({
      from: 'Czysty Cleaners <bookings@gritquad.com>',
      to: [process.env.NOTIFICATION_EMAIL ?? 'info.czysty@gmail.com'],
      subject: `Payment received — ${name}`,
      html: `
        <h2 style="color:#1A5C28">Booking Paid</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${contact.phone ?? ''}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${contact.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Amount</strong></td><td style="padding:8px;border:1px solid #ddd">₦${Number(tx.amount).toLocaleString('en-NG')}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Tx ref</strong></td><td style="padding:8px;border:1px solid #ddd">${txRef}</td></tr>
        </table>
        ${bookingHtml}
      `,
    }, { idempotencyKey: `${txRef}-admin` })

    await resend.emails.send({
      from: 'Czysty Cleaners <bookings@gritquad.com>',
      to: contact.email,
      subject: '✅ Payment received — Czysty Cleaners',
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#09100A">
          <h2 style="color:#1A5C28;margin-bottom:8px">Thanks, ${contact.firstName ?? ''}!</h2>
          <p style="color:#6B7B6B;font-size:14px;line-height:1.6;margin-bottom:16px">
            We've received your payment of <strong>₦${Number(tx.amount).toLocaleString('en-NG')}</strong> and your booking is confirmed.
          </p>
          <p style="color:#6B7B6B;font-size:14px;line-height:1.6;margin-bottom:24px">
            Our team will be in touch to confirm pickup/arrival details.
          </p>
          ${bookingHtml}
          <hr style="border:none;border-top:1px solid #eee;margin-top:24px;margin-bottom:24px" />
          <p style="font-size:12px;color:#aaa">
            Czysty Cleaners Int'l Ltd · Lagos<br/>
            📞 +234 807 213 3343 · 📧 info.czysty@gmail.com
          </p>
        </div>
      `,
    }, { idempotencyKey: `${txRef}-customer` })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Flutterwave verify error:', err)
    return NextResponse.json({ success: false, error: 'Failed to verify payment.' }, { status: 500 })
  }
}
