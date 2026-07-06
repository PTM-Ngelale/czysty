import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { pickBookingMetaFields, renderBookingDetailsHtml } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const signature = request.headers.get('verif-hash')
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET_HASH

  if (!secretHash || signature !== secretHash) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const body = await request.json()
  const txId = body?.data?.id

  if (body?.event !== 'charge.completed' || !txId) {
    return NextResponse.json({ ok: true })
  }

  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY
  if (!secretKey) {
    console.error('FLUTTERWAVE_SECRET_KEY is not configured.')
    return NextResponse.json({ error: 'Payment verification is not configured.' }, { status: 500 })
  }

  try {
    // Re-verify server-side rather than trusting the webhook payload alone.
    const verifyRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${txId}/verify`,
      { headers: { Authorization: `Bearer ${secretKey}` } },
    )
    const verifyData = await verifyRes.json()
    const tx = verifyData?.data

    const isValid =
      verifyRes.ok &&
      verifyData?.status === 'success' &&
      tx?.status === 'successful' &&
      tx?.currency === 'NGN' &&
      tx?.customer?.email

    if (!isValid) {
      console.error('Flutterwave webhook: re-verification failed:', verifyData)
      return NextResponse.json({ ok: true })
    }

    const txRef = tx.tx_ref
    const name = tx.customer.name ?? ''
    const bookingMeta = pickBookingMetaFields(tx.meta ?? {})
    const bookingHtml = renderBookingDetailsHtml(bookingMeta)

    await resend.emails.send({
      from: 'Czysty Cleaners <bookings@gritquad.com>',
      to: [process.env.NOTIFICATION_EMAIL ?? 'info.czysty@gmail.com'],
      subject: `Payment received — ${name}`,
      html: `
        <h2 style="color:#1A5C28">Booking Paid</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${tx.customer.phone_number ?? ''}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${tx.customer.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Amount</strong></td><td style="padding:8px;border:1px solid #ddd">₦${Number(tx.amount).toLocaleString('en-NG')}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Tx ref</strong></td><td style="padding:8px;border:1px solid #ddd">${txRef}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Payment type</strong></td><td style="padding:8px;border:1px solid #ddd">${tx.payment_type ?? ''}</td></tr>
        </table>
        ${bookingHtml}
        <p style="color:#6B7B6B;font-size:12px">Confirmed via Flutterwave webhook.</p>
      `,
    }, { idempotencyKey: `${txRef}-admin` })

    await resend.emails.send({
      from: 'Czysty Cleaners <bookings@gritquad.com>',
      to: tx.customer.email,
      subject: '✅ Payment received — Czysty Cleaners',
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#09100A">
          <h2 style="color:#1A5C28;margin-bottom:8px">Thanks, ${name}!</h2>
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

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Flutterwave webhook error:', err)
    return NextResponse.json({ error: 'Failed to process webhook.' }, { status: 500 })
  }
}
