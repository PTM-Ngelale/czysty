'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFooter } from '@/lib/footer-context';
import { WashingMachine, ArrowRight } from 'lucide-react';

const ITEM_COUNTS = [
  { label: 'Regular clothes',  count: '1 item each' },
  { label: 'Bedsheets',        count: '2 items each' },
  { label: 'Duvets',           count: '5 items each' },
];

export default function LaundryTermsPage() {
  const router = useRouter();
  const { setOverride } = useFooter();

  useEffect(() => {
    // No footer buttons — agree button is baked into the page
    setOverride({ hideButtons: true, onBack: () => router.push('/booking') });
  }, [router, setOverride]);

  function agree() {
    // bookingType 'gift' (set on intro page) drives the laundry flow — no extra dispatch needed
    router.push('/booking/address');
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      {/* Header */}
      <div className="mb-7">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-czysty-green/10 flex items-center justify-center shrink-0">
            <WashingMachine size={20} className="text-czysty-green" />
          </div>
          <span className="inline-flex items-center bg-czysty-green/10 text-czysty-green text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
            Monthly Laundry Package · ₦9,999
          </span>
        </div>
        <h2 className="step-heading mb-2">Before you continue</h2>
        <p className="font-body text-czysty-muted text-sm leading-relaxed">
          Please read and agree to the following service terms to proceed with your laundry booking.
        </p>
      </div>

      {/* Main terms card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
        {/* Service overview */}
        <div className="px-5 py-5 border-b border-gray-50">
          <p className="font-display font-bold text-czysty-black text-sm uppercase tracking-wide mb-3">
            What's included
          </p>
          <p className="font-body text-czysty-muted text-[13px] leading-relaxed">
            This service provides a <strong className="text-czysty-black">48-hour return service</strong> for
            washing and packaging only, covering up to <strong className="text-czysty-black">50 items per month</strong> with
            a maximum of <strong className="text-czysty-black">2 loads per month</strong>.
          </p>
        </div>

        {/* Item counts */}
        <div className="px-5 py-5 border-b border-gray-50">
          <p className="font-display font-bold text-czysty-black text-sm uppercase tracking-wide mb-4">
            How items are counted
          </p>
          <div className="flex flex-col gap-3">
            {ITEM_COUNTS.map(({ label, count }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-body text-czysty-muted text-[13px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-czysty-green shrink-0" />
                  {label}
                </span>
                <span className="font-body font-semibold text-czysty-black text-[13px]">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pickup & delivery */}
        <div className="px-5 py-5 border-b border-gray-50">
          <p className="font-display font-bold text-czysty-black text-sm uppercase tracking-wide mb-3">
            Pickup &amp; delivery
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2.5 font-body text-czysty-muted text-[13px] leading-relaxed">
              <span className="text-czysty-green mt-0.5 shrink-0">•</span>
              Your <strong className="text-czysty-black">first pickup and delivery is 100% free</strong>.
            </li>
            <li className="flex items-start gap-2.5 font-body text-czysty-muted text-[13px] leading-relaxed">
              <span className="text-czysty-green mt-0.5 shrink-0">•</span>
              Pickup and delivery costs for subsequent orders vary by distance.
            </li>
          </ul>
        </div>

        {/* Additional services */}
        <div className="px-5 py-5">
          <p className="font-display font-bold text-czysty-black text-sm uppercase tracking-wide mb-3">
            Additional services
          </p>
          <p className="font-body text-czysty-muted text-[13px] leading-relaxed">
            Services like <strong className="text-czysty-black">alterations and ironing</strong> can be added
            at an extra charge and will be communicated by our Booking Support Team.
          </p>
        </div>
      </div>

      {/* Agree CTA */}
      <button
        onClick={agree}
        className="w-full h-14 rounded-full font-display font-bold text-sm uppercase tracking-widest text-czysty-cream flex items-center justify-center gap-2 bg-czysty-green active:scale-[0.98] transition-all"
      >
        I Agree — Continue
        <ArrowRight size={16} strokeWidth={2.5} />
      </button>

      <p className="font-body text-czysty-muted/50 text-[11px] text-center mt-4 leading-relaxed">
        By continuing you confirm you have read and understood the service terms above.
      </p>
    </div>
  );
}
