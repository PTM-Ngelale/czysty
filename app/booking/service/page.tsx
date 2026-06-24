'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PRIMARY_SERVICES, STANDALONE_ADDONS, formatNaira } from '@/lib/booking-catalog';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { StepBadge } from '@/components/BookingStepHeader';

const SERVICE_META: Record<string, { icon: string; from: string; desc: string }> = {
  'wash-fold':  { icon: '🧺', from: '₦2,500', desc: 'Washed, dried & folded for you' },
  'wash-iron':  { icon: '👔', from: '₦3,500', desc: 'Washed, dried & professionally pressed' },
  'dry-clean':  { icon: '✨', from: '₦5,000', desc: 'Solvent cleaning for delicate garments' },
  'bulky':      { icon: '🛏',  from: '₦4,000', desc: 'Duvets, curtains & oversized items' },
};

export default function ServicePage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const [cleaningType, setCleaningType]             = useState<string | null>(booking.service.cleaningType);
  const [additionalServices, setAdditionalServices] = useState<string[]>(booking.service.additionalServices);

  const isValid = cleaningType !== null || additionalServices.length > 0;

  useEffect(() => {
    setOverride({
      nextDisabled: !isValid,
      onNext: () => {
        dispatch({ type: 'SET_SERVICE', service: { cleaningType, additionalServices } });
        router.push('/booking/space');
      },
      onBack: () => router.push('/booking'),
    });
  }, [isValid, cleaningType, additionalServices, dispatch, router, setOverride]);

  function toggleAddon(id: string) {
    setAdditionalServices(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <StepBadge step={1} total={9} />
      <h2 className="step-heading mb-1">What service would you like?</h2>
      <p className="font-body text-czysty-muted text-sm mb-7 leading-relaxed">
        Select a service type. You can add extras on later.
      </p>

      {/* Primary — single select */}
      <p className="section-label mb-2.5">Choose one service type</p>
      <div className="flex flex-col gap-2 mb-8">
        {PRIMARY_SERVICES.map(svc => {
          const meta   = SERVICE_META[svc.id];
          const active = cleaningType === svc.id;
          return (
            <button
              key={svc.id}
              onClick={() => setCleaningType(active ? null : svc.id)}
              className="w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.99]"
              style={{
                borderColor: active ? '#1a5c28' : '#e9ecef',
                background:  active ? '#1a5c28' : 'white',
                boxShadow: active ? '0 2px 12px rgba(26,92,40,0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <span className="text-2xl shrink-0 leading-none">{meta.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm uppercase tracking-wide leading-tight"
                  style={{ color: active ? '#f2ede4' : '#09100a' }}>
                  {svc.name}
                </p>
                <p className="font-body text-[12px] mt-0.5 leading-relaxed"
                  style={{ color: active ? '#c8e6ce' : '#6b7b6b' }}>
                  {meta.desc}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="font-body text-[11px]" style={{ color: active ? '#c8e6ce' : '#6b7b6b' }}>
                  from
                </span>
                <span className="font-display font-bold text-sm" style={{ color: active ? '#f2ede4' : '#1a5c28' }}>
                  {meta.from}
                </span>
                {/* Circle radio */}
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: active ? '#f2ede4' : '#d1d5db',
                    background:  active ? '#f2ede4' : 'transparent',
                  }}
                >
                  {active && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#1a5c28" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Standalone add-ons — multi select */}
      <div className="border-t border-gray-100 pt-6">
        <p className="section-label mb-2.5">Or book a standalone add-on</p>
        <div className="flex flex-col gap-2">
          {STANDALONE_ADDONS.map(addon => {
            const checked = additionalServices.includes(addon.id);
            return (
              <button
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className="w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center justify-between gap-3 transition-all duration-200"
                style={{
                  borderColor: checked ? '#1a5c28' : '#e9ecef',
                  background:  checked ? '#f0faf3' : 'white',
                }}
              >
                <div>
                  <p className="font-body font-semibold text-czysty-black text-sm">{addon.name}</p>
                  <p className="font-body text-czysty-muted text-[12px] mt-0.5">{addon.description}</p>
                </div>
                {/* Square checkbox */}
                <div
                  className="w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-colors"
                  style={{
                    borderColor: checked ? '#1a5c28' : '#d1d5db',
                    background:  checked ? '#1a5c28' : 'transparent',
                  }}
                >
                  {checked && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#f2ede4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
