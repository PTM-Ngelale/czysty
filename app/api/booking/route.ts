import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BOOKING_ADMIN_EMAILS } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, email, message } = body;

  if (!name || !phone || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  try {
    // Notify admin
    await resend.emails.send({
      from: "Czysty Cleaners <bookings@czystycleaners.com>",
      to: BOOKING_ADMIN_EMAILS,
      subject: `New Contact Message — ${name}`,
      html: `
        <h2 style="color:#1A5C28">New Contact Form Message</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${email || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${message}</td></tr>
        </table>
      `,
    });

    // Send confirmation to user (only if they provided an email)
    if (email) {
      await resend.emails.send({
        from: "Czysty Cleaners <bookings@czystycleaners.com>",
        to: email,
        subject: "✅ Message Received — Czysty Cleaners",
        html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#09100A">
            <h2 style="color:#1A5C28;margin-bottom:8px">We've got your message, ${name}!</h2>
            <p style="color:#6B7B6B;font-size:14px;line-height:1.6;margin-bottom:16px">
              Thank you for reaching out to <strong>Czysty Cleaners</strong>. Here's what we received:
            </p>
            <p style="color:#09100A;font-size:14px;line-height:1.6;margin-bottom:24px;padding:12px;background:#f7f7f5;border-radius:4px">${message}</p>
            <p style="color:#6B7B6B;font-size:14px;line-height:1.6;margin-bottom:24px">
              Our team will get back to you within the hour during business hours (Mon – Sat, 8am – 6pm).
            </p>
            <hr style="border:none;border-top:1px solid #eee;margin-bottom:24px" />
            <p style="font-size:12px;color:#aaa">
              Czysty Cleaners Int'l Ltd · Lagos<br/>
              📞 +234 807 213 3343 · 📧 info@czystycleaners.com
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send booking email." },
      { status: 500 },
    );
  }
}
