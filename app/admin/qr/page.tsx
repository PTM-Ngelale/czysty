import Image from 'next/image'
import QRDisplay from './QRDisplay'

export const metadata = {
  title: 'QR Code — Czysty Cleaners Admin',
  robots: 'noindex, nofollow',
}

export default function AdminQRPage() {
  const secret = process.env.QR_SECRET ?? ''
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://czysty.vercel.app').replace(/\/$/, '')
  const joinUrl = `${baseUrl}/join?ref=${encodeURIComponent(secret)}`
  const notConfigured = !secret

  return (
    <main className="min-h-screen bg-[#F7F4EF] flex flex-col items-center justify-center px-6 py-16">
      <a href="/" className="mb-10 bg-white px-4 py-2 shadow-sm inline-block">
        <Image src="/images/logo.png" alt="Czysty Cleaners" width={130} height={44} className="object-contain h-10 w-auto" />
      </a>

      <h1
        className="font-display font-extrabold text-czysty-black uppercase text-center mb-2"
        style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}
      >
        Customer Registration QR
      </h1>
      <p className="font-body text-czysty-muted text-[13px] mb-10 text-center max-w-sm">
        Print or display this QR code. Customers scan it, register, and land on your services page.
      </p>

      {notConfigured ? (
        <div className="bg-white border border-czysty-red/30 p-8 max-w-sm text-center">
          <p className="font-display font-bold text-czysty-red uppercase text-sm mb-2">QR_SECRET not set</p>
          <p className="font-body text-czysty-muted text-[13px] leading-relaxed">
            Add <code className="bg-czysty-cream px-1 py-0.5 text-czysty-black text-[12px]">QR_SECRET=your_secret_here</code> to your{' '}
            <code className="bg-czysty-cream px-1 py-0.5 text-czysty-black text-[12px]">.env.local</code> file and restart the server.
          </p>
        </div>
      ) : (
        <>
          <QRDisplay url={joinUrl} />

          {/* How it works */}
          <div className="mt-12 max-w-sm w-full border-t border-czysty-green/10 pt-8 space-y-3">
            <p className="font-display font-bold text-czysty-black uppercase text-[11px] tracking-widest mb-4">How it works</p>
            {[
              'Customer scans the QR code with their phone',
              'They enter their name, phone, and email',
              'You receive an email notification with their details',
              'They are redirected to the Czysty Cleaners landing page',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-display font-extrabold text-czysty-green text-[11px] w-4 flex-shrink-0 mt-0.5">0{i + 1}</span>
                <p className="font-body text-czysty-muted text-[13px] leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}
