'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFooter } from '@/lib/footer-context';
import { WashingMachine, ArrowRight, Check } from 'lucide-react';
import { LAUNDRY_PACKAGE_PRICE, formatNaira } from '@/lib/booking-catalog';

const ITEM_COUNTS = [
  { label: 'Regular clothes', count: '1 item each' },
  { label: 'Bedsheets',       count: '2 items each' },
  { label: 'Duvets',          count: '5 items each' },
];

export default function LaundryPage() {
  const router = useRouter();
  const { setOverride } = useFooter();
  const [selected, setSelected] = useState(true);

  useEffect(() => {
    setOverride({ hideButtons: true, onBack: () => router.push('/booking') });
  }, [router, setOverride]);

  function agree() {
    router.push('/booking/laundry/type');
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">

      {/* Package selection */}
      <div className="mb-8">
        <h2 className="step-heading mb-1">Select your package</h2>
        <p className="font-body text-czysty-muted text-sm leading-relaxed mb-5">
          Choose a laundry package to get started.
        </p>

        <button
          onClick={() => setSelected(true)}
          className="w-full text-left rounded-2xl border-2 px-5 py-5 flex items-center gap-4 transition-all duration-200 active:scale-[0.99]"
          style={{
            borderColor: selected ? '#1a5c28' : '#e9ecef',
            background:  selected ? '#1a5c28' : 'white',
            boxShadow:   selected ? '0 2px 12px rgba(26,92,40,0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <WashingMachine
            size={22}
            style={{ color: selected ? '#f2ede4' : '#1a5c28' }}
            className="shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p
              className="font-display font-bold text-sm uppercase tracking-wide leading-tight"
              style={{ color: selected ? '#f2ede4' : '#09100a' }}
            >
              Monthly Laundry Package
            </p>
            <p
              className="font-body text-[12px] mt-0.5 leading-relaxed"
              style={{ color: selected ? '#f2ede4b3' : '#6b7280' }}
            >
              Up to 50 items washed &amp; packed per month · 1 free pickup
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span
              className="font-display font-bold text-lg"
              style={{ color: selected ? '#f2ede4' : '#1a5c28' }}
            >
              {formatNaira(LAUNDRY_PACKAGE_PRICE)}
            </span>
            <div
              className="w-5 h-5 rounded border-2 flex items-center justify-center"
              style={{
                borderColor: selected ? '#f2ede4' : '#d1d5db',
                background:  selected ? '#f2ede4' : 'transparent',
              }}
            >
              {selected && <Check size={10} stroke="#1a5c28" strokeWidth={2.5} />}
            </div>
          </div>
        </button>
      </div>

      {/* Terms — only shown after package is selected */}
      {selected && (
        <>
          <div className="mb-5">
            <h2 className="step-heading mb-1">Before you continue</h2>
            <p className="font-body text-czysty-muted text-sm leading-relaxed">
              Please read and agree to the following service terms to proceed.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
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
        </>
      )}
    </div>
  );
}
