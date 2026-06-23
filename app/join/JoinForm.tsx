'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const inputBase =
  'w-full bg-transparent border-0 border-b border-czysty-green/20 text-czysty-black placeholder:text-czysty-muted/50 font-body text-sm px-0 py-3 focus:outline-none focus:border-czysty-green transition-colors duration-200'

export default function JoinForm() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
      setTimeout(() => router.push('/'), 2000)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="text-center py-6">
        <div
          className="w-16 h-16 rounded-full bg-czysty-green/10 border border-czysty-green/30 flex items-center justify-center mx-auto mb-5"
        >
          <svg className="w-7 h-7 text-czysty-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-display font-bold text-czysty-black uppercase text-lg mb-1">You&apos;re In!</p>
        <p className="font-body text-czysty-muted text-[13px]">Taking you to our services…</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div>
        <label className="font-body text-[10px] text-czysty-muted uppercase tracking-widest block mb-1">
          Full Name *
        </label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          placeholder="Jane Doe"
          className={inputBase}
        />
      </div>

      <div>
        <label className="font-body text-[10px] text-czysty-muted uppercase tracking-widest block mb-1">
          Phone Number *
        </label>
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          required
          type="tel"
          placeholder="+234 000 000 0000"
          className={inputBase}
        />
      </div>

      <div>
        <label className="font-body text-[10px] text-czysty-muted uppercase tracking-widest block mb-1">
          Email Address
        </label>
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          type="email"
          placeholder="you@example.com"
          className={inputBase}
        />
      </div>

      <div className="pt-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="czysty-btn czysty-btn-primary w-full py-4 text-sm disabled:opacity-50"
        >
          {status === 'sending' ? 'Registering…' : 'Continue to Our Services →'}
        </button>
      </div>

      {status === 'error' && (
        <p className="font-body text-czysty-red/80 text-[13px] text-center">
          Something went wrong. Please try again.
        </p>
      )}

      <p className="font-body text-czysty-muted/45 text-[11px] text-center leading-relaxed">
        Your details are kept private and used only for service updates and booking confirmations.
      </p>
    </form>
  )
}
