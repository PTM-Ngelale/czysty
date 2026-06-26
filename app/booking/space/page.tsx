'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { HOME_OPTIONS, formatNaira } from '@/lib/booking-catalog';
import { StepHeader } from '@/components/BookingStepHeader';
import { Home, School, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const OPTION_META: Record<string, { Icon: LucideIcon; sub?: string }> = {
  'student':        { Icon: School, sub: 'One room, shared facilities' },
  'self-contained': { Icon: Home,   sub: 'Bedsitter with private bathroom & kitchen' },
  '1-bed':          { Icon: Home,   sub: 'Bedroom, living room, kitchen & bathroom' },
};

export default function SpacePage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const [selected, setSelected] = useState(booking.space?.description ?? '');

  // Arriving at the space selector always means cleaning flow
  useEffect(() => {
    dispatch({ type: 'SET_BOOKING_TYPE', bookingType: 'self' });
  }, [dispatch]);

  const isValid = selected.length > 0;

  useEffect(() => {
    setOverride({
      nextDisabled: !isValid,
      onNext: () => {
        dispatch({
          type: 'SET_SPACE',
          space: { description: selected, bringSupplies: booking.space?.bringSupplies ?? false },
        });
        router.push('/booking/service');
      },
      onBack: () => router.push('/booking'),
    });
  }, [isValid, selected, booking.space, dispatch, router, setOverride]);

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <StepHeader
        step={1} total={9}
        title="Select your home"
        subtitle="Choose the option that best describes where you need us."
      />

      <div className="flex flex-col gap-3 mb-6">
        {HOME_OPTIONS.map(opt => {
          const active = selected === opt.value;
          const { Icon, sub } = OPTION_META[opt.value] ?? { Icon: Home };
          return (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className="w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.99]"
              style={{
                borderColor: active ? '#1a5c28' : '#e9ecef',
                background:  active ? '#1a5c28' : 'white',
                boxShadow:   active ? '0 3px 16px rgba(26,92,40,0.18)' : '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <Icon size={22} className="shrink-0" style={{ color: active ? '#f2ede4' : '#09100a' }} />
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm uppercase tracking-wide leading-tight"
                  style={{ color: active ? '#f2ede4' : '#09100a' }}>
                  {opt.label}
                </p>
                {sub && (
                  <p className="font-body text-[11px] mt-0.5"
                    style={{ color: active ? '#c8e6ce' : '#6b7b6b' }}>
                    {sub}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="font-display font-bold text-base"
                  style={{ color: active ? '#f2ede4' : '#1a5c28' }}>
                  {formatNaira(opt.basePrice)}
                </span>
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: active ? '#f2ede4' : '#d1d5db', background: active ? '#f2ede4' : 'transparent' }}
                >
                  {active && <Check size={10} stroke="#1a5c28" strokeWidth={2.2} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl bg-czysty-cream/70 border border-czysty-cream px-5 py-4">
        <p className="font-body text-czysty-black text-[12px] font-semibold mb-1">Free pickup &amp; delivery</p>
        <p className="font-body text-czysty-muted text-[12px] leading-relaxed">
          All bookings include free pickup and delivery across Port Harcourt. No hidden fees.
        </p>
      </div>
    </div>
  );
}
