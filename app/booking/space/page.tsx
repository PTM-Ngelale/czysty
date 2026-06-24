'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { SPACE_OPTIONS, formatNaira, calcBasePrice } from '@/lib/booking-catalog';
import { StepHeader } from '@/components/BookingStepHeader';

const BAG_ICONS = ['🛍', '🛍🛍', '🛍🛍🛍', '🛍🛍🛍🛍', '🛍🛍🛍🛍🛍'];

export default function SpacePage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const [description, setDescription] = useState(booking.space?.description ?? '');
  const [stainRemoval, setStainRemoval] = useState(booking.space?.stainRemovalSupplies ?? false);

  const isValid = description.length > 0;

  useEffect(() => {
    if (!booking.service.cleaningType && !booking.service.additionalServices.length) {
      router.replace('/booking/service'); return;
    }
    setOverride({
      nextDisabled: !isValid,
      onNext: () => {
        dispatch({ type: 'SET_SPACE', space: { description, stainRemovalSupplies: stainRemoval } });
        router.push('/booking/address');
      },
      onBack: () => router.push('/booking/service'),
    });
  }, [isValid, description, stainRemoval, booking.service, dispatch, router, setOverride]);

  const previewPrice = description
    ? calcBasePrice(booking.service.cleaningType, description) + (stainRemoval ? 500 : 0)
    : null;

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <StepHeader step={2} total={9} title="How much laundry?" subtitle="Select the order size that best matches what you're sending." />

      {/* Visual card grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {SPACE_OPTIONS.map((opt, i) => {
          const active = description === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setDescription(opt.value)}
              className="rounded-2xl border-2 p-4 text-left transition-all duration-200 active:scale-[0.97]"
              style={{
                borderColor: active ? '#1a5c28' : '#e9ecef',
                background:  active ? '#1a5c28' : 'white',
                boxShadow: active ? '0 3px 16px rgba(26,92,40,0.18)' : '0 1px 3px rgba(0,0,0,0.05)',
                gridColumn: i === 4 ? 'span 2' : undefined,
              }}
            >
              <span className="block text-xl mb-2 leading-none" role="presentation">
                {BAG_ICONS[i]}
              </span>
              <p className="font-display font-bold text-xs uppercase tracking-wide leading-tight"
                style={{ color: active ? '#f2ede4' : '#09100a' }}>
                {opt.label}
              </p>
              <p className="font-body text-[11px] mt-1"
                style={{ color: active ? '#c8e6ce' : '#6b7b6b' }}>
                ~{opt.durationHrs}h turnaround
              </p>
              <p className="font-display font-bold text-sm mt-2"
                style={{ color: active ? '#c8e6ce' : '#1a5c28' }}>
                from {formatNaira(calcBasePrice(booking.service.cleaningType, opt.value))}
              </p>
            </button>
          );
        })}
      </div>

      {/* Stain pre-treatment */}
      <button
        onClick={() => setStainRemoval(v => !v)}
        className="w-full rounded-2xl border-2 px-5 py-4 flex items-start gap-4 text-left transition-all duration-200"
        style={{
          borderColor: stainRemoval ? '#1a5c28' : '#e9ecef',
          background:  stainRemoval ? '#f0faf3' : 'white',
        }}
      >
        <div
          className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors"
          style={{
            borderColor: stainRemoval ? '#1a5c28' : '#d1d5db',
            background:  stainRemoval ? '#1a5c28' : 'transparent',
          }}
        >
          {stainRemoval && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="#f2ede4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <div>
          <p className="font-body font-semibold text-czysty-black text-sm">Add stain pre-treatment</p>
          <p className="font-body text-czysty-muted text-[12px] mt-0.5">
            Professional pre-treatment for stained items · +₦500
          </p>
        </div>
      </button>

      {/* Live price preview */}
      {previewPrice !== null && previewPrice > 0 && (
        <div className="mt-5 rounded-2xl border border-czysty-green/20 bg-czysty-green/5 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="section-label">Base price</p>
            <p className="font-body text-czysty-muted text-[12px] mt-0.5">
              {booking.service.cleaningType
                ? `${booking.service.cleaningType.replace('-', ' ')} · ${description.replace('-', ' ')}`
                : description.replace('-', ' ')}
              {stainRemoval ? ' + stain treatment' : ''}
            </p>
          </div>
          <p className="font-display font-extrabold text-czysty-green text-xl">
            {formatNaira(previewPrice)}
          </p>
        </div>
      )}

      {/* Info callout */}
      <div className="mt-5 rounded-2xl bg-czysty-cream/70 border border-czysty-cream px-5 py-4">
        <p className="font-body text-czysty-black text-[12px] font-semibold mb-1">Good to know</p>
        <p className="font-body text-czysty-muted text-[12px] leading-relaxed">
          Our attendants bring professional cleaning products. Leave out any specific detergent or
          fragrance preferences at pickup — we&apos;ll use it and return it with your laundry.
        </p>
      </div>
    </div>
  );
}
