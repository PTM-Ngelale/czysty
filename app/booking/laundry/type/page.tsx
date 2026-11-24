'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { LAUNDRY_OPTIONS, formatNaira } from '@/lib/booking-catalog';
import { Check } from 'lucide-react';

export default function LaundryTypePage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const [selected, setSelected] = useState<string | null>(booking.laundryType);

  useEffect(() => {
    if (booking.bookingType !== 'gift') {
      router.replace('/booking');
      return;
    }
    setOverride({
      nextDisabled: !selected,
      onNext: () => {
        dispatch({ type: 'SET_LAUNDRY_TYPE', laundryType: selected! });
        router.push('/booking/address');
      },
      onBack: () => router.push('/booking/laundry'),
    });
  }, [selected, booking.bookingType, dispatch, router, setOverride]);

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <div className="mb-7">
        <h2 className="step-heading mb-1">What do you need done?</h2>
        <p className="font-body text-czysty-muted text-sm leading-relaxed">
          Choose the service that fits your laundry needs.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {LAUNDRY_OPTIONS.map(opt => {
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className="w-full text-left rounded-2xl border-2 px-5 py-5 flex items-center gap-4 transition-all duration-200 active:scale-[0.99]"
              style={{
                borderColor: active ? '#085d33' : '#e9ecef',
                background:  active ? '#085d33' : 'white',
                boxShadow:   active ? '0 2px 12px rgba(8, 93, 51,0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="font-display font-bold text-sm uppercase tracking-wide leading-tight"
                  style={{ color: active ? '#f4fbf5' : '#022811' }}
                >
                  {opt.planName} — {opt.tagline}
                </p>
                <p
                  className="font-body text-[12px] mt-1 leading-relaxed"
                  style={{ color: active ? '#c9edd1' : '#4f6b58' }}
                >
                  {opt.features.join(' · ')}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className="font-display font-bold text-lg"
                  style={{ color: active ? '#f4fbf5' : '#085d33' }}
                >
                  {formatNaira(opt.price)}<span className="font-body font-normal text-[11px]">/mo</span>
                </span>
                <div
                  className="w-5 h-5 rounded border-2 flex items-center justify-center"
                  style={{
                    borderColor: active ? '#f4fbf5' : '#d1d5db',
                    background:  active ? '#f4fbf5' : 'transparent',
                  }}
                >
                  {active && <Check size={10} stroke="#085d33" strokeWidth={2.5} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
