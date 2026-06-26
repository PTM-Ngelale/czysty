'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { formatNaira, IRONING_PRICE_PER_ITEM } from '@/lib/booking-catalog';
import { Shirt } from 'lucide-react';

export default function LaundryPage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const savedIroning = booking.extraTasks.find(t => t.taskId === 'ironing');
  const [needsIroning, setNeedsIroning] = useState(!!savedIroning);
  const [itemCount, setItemCount] = useState(savedIroning?.quantity ?? 5);

  useEffect(() => {
    if (!booking.space || booking.space.description !== 'laundry') {
      router.replace('/booking/space');
      return;
    }
    setOverride({
      nextDisabled: false,
      onNext: () => {
        dispatch({
          type: 'SET_EXTRA_TASKS',
          extraTasks: needsIroning
            ? [{ taskId: 'ironing', quantity: itemCount, frequency: 'once_off' }]
            : [],
        });
        router.push('/booking/address');
      },
      onBack: () => router.push('/booking/space'),
    });
  }, [needsIroning, itemCount, booking.space, dispatch, router, setOverride]);

  const ironingTotal = needsIroning ? itemCount * IRONING_PRICE_PER_ITEM : 0;

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <div className="mb-6">
        <span className="inline-flex items-center bg-czysty-green/10 text-czysty-green text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
          Laundry Package · ₦9,999
        </span>
      </div>
      <h2 className="step-heading mb-2">Do you need ironing?</h2>
      <p className="font-body text-czysty-muted text-sm mb-7 leading-relaxed">
        Your clothes will be washed, dried, and folded. Let us know if you&apos;d like items pressed too.
      </p>

      <div className="flex flex-col gap-3 mb-7">
        <button
          onClick={() => setNeedsIroning(false)}
          className="w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.99]"
          style={{
            borderColor: !needsIroning ? '#1a5c28' : '#e9ecef',
            background:  !needsIroning ? '#1a5c28' : 'white',
            boxShadow:   !needsIroning ? '0 2px 12px rgba(26,92,40,0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div className="flex-1">
            <p className="font-display font-bold text-sm uppercase tracking-wide"
              style={{ color: !needsIroning ? '#f2ede4' : '#09100a' }}>
              No ironing needed
            </p>
            <p className="font-body text-[12px] mt-0.5"
              style={{ color: !needsIroning ? '#c8e6ce' : '#6b7b6b' }}>
              Just wash, dry, and fold
            </p>
          </div>
          <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
            style={{ borderColor: !needsIroning ? '#f2ede4' : '#d1d5db', background: !needsIroning ? '#f2ede4' : 'transparent' }}>
            {!needsIroning && <div className="w-2 h-2 rounded-full bg-czysty-green" />}
          </div>
        </button>

        <button
          onClick={() => setNeedsIroning(true)}
          className="w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.99]"
          style={{
            borderColor: needsIroning ? '#1a5c28' : '#e9ecef',
            background:  needsIroning ? '#1a5c28' : 'white',
            boxShadow:   needsIroning ? '0 2px 12px rgba(26,92,40,0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <Shirt size={20} className="shrink-0" style={{ color: needsIroning ? '#f2ede4' : '#09100a' }} />
          <div className="flex-1">
            <p className="font-display font-bold text-sm uppercase tracking-wide"
              style={{ color: needsIroning ? '#f2ede4' : '#09100a' }}>
              Yes, iron my clothes
            </p>
            <p className="font-body text-[12px] mt-0.5"
              style={{ color: needsIroning ? '#c8e6ce' : '#6b7b6b' }}>
              {formatNaira(IRONING_PRICE_PER_ITEM)} per item
            </p>
          </div>
          <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
            style={{ borderColor: needsIroning ? '#f2ede4' : '#d1d5db', background: needsIroning ? '#f2ede4' : 'transparent' }}>
            {needsIroning && <div className="w-2 h-2 rounded-full bg-czysty-green" />}
          </div>
        </button>
      </div>

      {needsIroning && (
        <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm">
          <p className="section-label mb-4">How many items should be ironed?</p>
          <div className="flex items-center gap-5 mb-3">
            <button
              onClick={() => setItemCount(c => Math.max(1, c - 1))}
              disabled={itemCount <= 1}
              className="w-12 h-12 rounded-full border-2 font-display font-bold text-xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{ borderColor: '#e9ecef', color: '#09100a' }}
            >
              −
            </button>
            <span className="font-display font-extrabold text-czysty-black text-3xl w-12 text-center leading-none">
              {itemCount}
            </span>
            <button
              onClick={() => setItemCount(c => c + 1)}
              className="w-12 h-12 rounded-full border-2 border-czysty-green font-display font-bold text-xl flex items-center justify-center hover:bg-czysty-green hover:text-czysty-cream transition-all"
              style={{ color: '#1a5c28' }}
            >
              +
            </button>
          </div>
          <p className="font-body text-czysty-muted text-[12px]">
            {itemCount} item{itemCount !== 1 ? 's' : ''} × {formatNaira(IRONING_PRICE_PER_ITEM)} ={' '}
            <strong className="text-czysty-black">{formatNaira(ironingTotal)}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
