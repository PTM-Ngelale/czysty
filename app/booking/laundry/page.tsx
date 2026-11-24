'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFooter } from '@/lib/footer-context';
import { ArrowRight, Check } from 'lucide-react';
import { LAUNDRY_OPTIONS, LAUNDRY_TERMS, formatNaira } from '@/lib/booking-catalog';

export default function LaundryPage() {
  const router = useRouter();
  const { setOverride } = useFooter();

  useEffect(() => {
    setOverride({ hideButtons: true, onBack: () => router.push('/booking') });
  }, [router, setOverride]);

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <div className="mb-6">
        <p className="font-body text-czysty-muted text-[11px] uppercase tracking-[0.25em] mb-2">
          Convenient · Affordable · Reliable
        </p>
        <h2 className="step-heading mb-1">Laundry subscription</h2>
        <p className="font-body text-czysty-muted text-sm leading-relaxed">
          Two monthly plans. You&apos;ll pick one on the next step.
        </p>
      </div>

      {/* Plans overview */}
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {LAUNDRY_OPTIONS.map(plan => (
          <div key={plan.id} className="bg-white rounded-2xl border border-czysty-green/15 p-5 shadow-sm">
            <p className="font-display font-extrabold text-czysty-black text-base uppercase leading-tight">
              {plan.planName}
            </p>
            <p className="font-display font-bold text-czysty-green text-[12px] uppercase tracking-wide mb-3">
              {plan.tagline}
            </p>
            <div className="rounded-xl bg-czysty-green text-center py-2.5 mb-4">
              <p className="font-display font-extrabold text-czysty-cream text-2xl leading-none">
                {formatNaira(plan.price)}
              </p>
              <p className="font-body text-czysty-light text-[10px] uppercase tracking-[0.25em] mt-1">
                per month
              </p>
            </div>
            <ul className="space-y-2">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 font-body text-czysty-black/80 text-[13px]">
                  <Check size={14} className="text-czysty-green mt-0.5 shrink-0" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Terms */}
      <div className="mb-5">
        <h2 className="step-heading mb-1">Terms &amp; conditions</h2>
        <p className="font-body text-czysty-muted text-sm leading-relaxed">
          Please read and agree to the following to proceed.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5 mb-5">
        <ul className="space-y-3">
          {LAUNDRY_TERMS.map(term => (
            <li key={term} className="flex items-start gap-2.5 font-body text-czysty-muted text-[13px] leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-czysty-green mt-[7px] shrink-0" />
              {term}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => router.push('/booking/laundry/type')}
        className="w-full h-14 rounded-full font-display font-bold text-sm uppercase tracking-widest text-czysty-cream flex items-center justify-center gap-2 bg-czysty-green active:scale-[0.98] transition-all"
      >
        I Agree — Continue
        <ArrowRight size={16} strokeWidth={2.5} />
      </button>

      <p className="font-body text-czysty-muted/50 text-[11px] text-center mt-4 leading-relaxed">
        By continuing you confirm you have read and understood the terms above.
      </p>
    </div>
  );
}
