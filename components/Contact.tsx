'use client'

import { useState } from 'react'

const contactDetails = [
  { icon: '📍', label: 'Address',   value: 'Your service area / business address' },
  { icon: '📞', label: 'Phone',     value: '+234 807 213 3343' },
  { icon: '📧', label: 'Email',     value: 'info.czysty@gmail.com' },
  { icon: '🕐', label: 'Hours',     value: 'Mon – Sat · 8am – 6pm' },
  { icon: '💬', label: 'WhatsApp',  value: '+234 807 213 3343' },
]

const inputBase =
  'w-full bg-transparent border-0 border-b border-czysty-green/20 text-czysty-black placeholder:text-czysty-muted/60 font-body text-sm px-0 py-3 focus:outline-none focus:border-czysty-green transition-colors duration-200'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', service: '', date: '', notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', phone: '', email: '', address: '', service: '', date: '', notes: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative bg-white overflow-hidden py-16 lg:py-36">

      {/* Ghost number */}
      <div className="absolute -bottom-4 right-0 select-none pointer-events-none overflow-hidden" aria-hidden>
        <span
          className="font-display font-extrabold text-czysty-green/[0.05] leading-none block"
          style={{ fontSize: 'clamp(100px, 22vw, 280px)' }}
        >
          07
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">

        {/* Header */}
        <div className="reveal mb-10 lg:mb-16">
          <div className="section-tag">Get in Touch</div>
          <h2 className="display-heading" style={{ fontSize: 'clamp(1.2rem, 5.5vw, 4rem)', color: '#09100A' }}>
            LET&apos;S GET YOUR
            <br />
            <span className="text-czysty-green">LAUNDRY SORTED</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-24 items-start">

          {/* Left — info */}
          <div className="reveal-left">
            <p className="font-body text-czysty-black/55 text-[15px] leading-relaxed mb-8 sm:mb-10">
              Book online, call, or WhatsApp. We&apos;ll confirm your pickup within the hour during business hours.
            </p>

            <ul className="space-y-5 sm:space-y-6 mb-8 sm:mb-10">
              {contactDetails.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <span className="text-base mt-0.5 opacity-60">{d.icon}</span>
                  <div>
                    <p className="font-body text-czysty-muted text-[10px] uppercase tracking-widest mb-0.5">{d.label}</p>
                    <p className="font-body text-czysty-black/75 text-[14px]">{d.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Coverage note */}
            <div className="border border-czysty-green/15 bg-czysty-cream/60 p-4 sm:p-5">
              <p className="font-body text-[10px] text-czysty-green/70 uppercase tracking-widest mb-2">Service Areas</p>
              <p className="font-body text-czysty-black/60 text-[13px] leading-relaxed">
                Lagos Island · Victoria Island · Lekki · Ikoyi
                <span className="block text-czysty-muted/60 text-[11px] mt-1">
                  More areas coming soon. Contact us to check your location.
                </span>
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal-right">
            <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="font-body text-[10px] text-czysty-muted uppercase tracking-widest block mb-1">Full Name *</label>
                  <input name="name" value={form.name} onChange={onChange} required placeholder="Jane Doe" className={inputBase} />
                </div>
                <div>
                  <label className="font-body text-[10px] text-czysty-muted uppercase tracking-widest block mb-1">Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={onChange} required placeholder="+234 000 000 0000" className={inputBase} />
                </div>
              </div>

              <div>
                <label className="font-body text-[10px] text-czysty-muted uppercase tracking-widest block mb-1">Email Address</label>
                <input name="email" value={form.email} onChange={onChange} type="email" placeholder="you@example.com" className={inputBase} />
              </div>

              <div>
                <label className="font-body text-[10px] text-czysty-muted uppercase tracking-widest block mb-1">Pickup Address *</label>
                <input name="address" value={form.address} onChange={onChange} required placeholder="14 Adeola Hopewell, VI" className={inputBase} />
              </div>

              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="font-body text-[10px] text-czysty-muted uppercase tracking-widest block mb-1">Service *</label>
                  <select name="service" value={form.service} onChange={onChange} required
                    className={`${inputBase} bg-white/60`}
                    style={{ backgroundImage: 'none' }}>
                    <option value="" disabled>Select a service</option>
                    <option value="wash-fold">Wash &amp; Fold</option>
                    <option value="dry-cleaning">Dry Cleaning</option>
                    <option value="ironing">Ironing</option>
                    <option value="pickup-delivery">Pickup &amp; Delivery</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-[10px] text-czysty-muted uppercase tracking-widest block mb-1">Preferred Date</label>
                  <input name="date" value={form.date} onChange={onChange} type="date" className={inputBase} />
                </div>
              </div>

              <div>
                <label className="font-body text-[10px] text-czysty-muted uppercase tracking-widest block mb-1">Notes</label>
                <textarea name="notes" value={form.notes} onChange={onChange} rows={3}
                  placeholder="Any special instructions?" className={`${inputBase} resize-none`} />
              </div>

              <div className="pt-2">
                <button type="submit" disabled={status === 'sending'}
                  className="czysty-btn czysty-btn-primary w-full py-4 text-sm disabled:opacity-50">
                  {status === 'sending' ? 'Sending…' : 'Book My Pickup →'}
                </button>
              </div>

              {status === 'sent' && (
                <p className="font-body text-czysty-green text-[13px] text-center py-1">
                  ✓ Booking received! We&apos;ll confirm within the hour.
                </p>
              )}
              {status === 'error' && (
                <p className="font-body text-czysty-red/80 text-[13px] text-center py-1">
                  Something went wrong. Please call or WhatsApp us directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
