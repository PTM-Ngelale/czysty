'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { CLEANING_EXTRAS, formatNaira } from '@/lib/booking-catalog';
import { StepHeader } from '@/components/BookingStepHeader';
import { Check } from 'lucide-react';

export default function ExtraTasksPage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const [selected, setSelected] = useState<string[]>(
    booking.extraTasks.map(t => t.taskId),
  );

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  useEffect(() => {
    if (!booking.schedule) { router.replace('/booking/schedule'); return; }
    setOverride({
      nextDisabled: false,
      onNext: () => {
        dispatch({
          type: 'SET_EXTRA_TASKS',
          extraTasks: selected.map(id => ({ taskId: id, quantity: 1, frequency: 'once_off' })),
        });
        router.push('/booking/contact');
      },
      onBack: () => router.push('/booking/schedule'),
    });
  }, [selected, booking.schedule, dispatch, router, setOverride]);

  const extrasTotal = selected.reduce((sum, id) => {
    const extra = CLEANING_EXTRAS.find(e => e.id === id);
    return sum + (extra?.unitPrice ?? 0);
  }, 0);

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <StepHeader
        step={6} total={9}
        title="Any extras?"
        subtitle="Optional add-ons to your booking — skip if not needed."
      />

      <div className="flex flex-col gap-3">
        {CLEANING_EXTRAS.map(extra => {
          const checked = selected.includes(extra.id);
          return (
            <button
              key={extra.id}
              onClick={() => toggle(extra.id)}
              className="w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.99]"
              style={{
                borderColor: checked ? '#1a5c28' : '#e9ecef',
                background:  checked ? '#1a5c28' : 'white',
                boxShadow:   checked ? '0 2px 12px rgba(26,92,40,0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm uppercase tracking-wide leading-tight"
                  style={{ color: checked ? '#f2ede4' : '#09100a' }}>
                  {extra.name}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-display font-bold text-sm"
                  style={{ color: checked ? '#f2ede4' : '#1a5c28' }}>
                  +{formatNaira(extra.unitPrice)}
                </span>
                <div
                  className="w-5 h-5 rounded border-2 flex items-center justify-center"
                  style={{ borderColor: checked ? '#f2ede4' : '#d1d5db', background: checked ? '#f2ede4' : 'transparent' }}
                >
                  {checked && <Check size={10} stroke="#1a5c28" strokeWidth={2.5} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {extrasTotal > 0 && (
        <div className="mt-5 rounded-2xl border border-czysty-green/20 bg-czysty-green/5 px-5 py-4 flex items-center justify-between">
          <p className="font-body text-czysty-muted text-sm">Extras total</p>
          <p className="font-display font-extrabold text-czysty-green text-xl">
            +{formatNaira(extrasTotal)}
          </p>
        </div>
      )}
    </div>
  );
}
