'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { formatNaira, SUPPLIES_FEE } from '@/lib/booking-catalog';
import { StepHeader } from '@/components/BookingStepHeader';
import { Package } from 'lucide-react';

const RECOMMENDED_PRODUCTS = [
  'Broom', 'Mop', 'Moping bucket', 'Packer', 'Dust bin',
  'Dustbin bags', 'Scrubbing brush', 'Rags', 'Buckets', 'Bowls',
  'Bleach', 'Floor cleaner and/or soap', 'Dish soap and sponges',
  'Scouring powder', 'Deep-action stain remover', 'Glass cleaner',
  'Cobweb broom', 'Duster', 'Air freshener',
];

export default function SuppliesPage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const [bringSupplies, setBringSupplies] = useState(booking.space?.bringSupplies ?? false);

  useEffect(() => {
    if (!booking.space) { router.replace('/booking/space'); return; }
    setOverride({
      nextDisabled: false,
      onNext: () => {
        dispatch({ type: 'SET_SPACE', space: { ...booking.space!, bringSupplies } });
        router.push('/booking/address');
      },
      onBack: () => router.push('/booking/service'),
    });
  }, [bringSupplies, booking.space, dispatch, router, setOverride]);

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <StepHeader
        step={3} total={9}
        title="Recommended products"
        subtitle="Here are some products we recommend you have for the best results."
      />

      <div className="rounded-2xl bg-czysty-cream/70 border border-czysty-cream px-5 py-4 mb-6">
        <p className="font-body text-czysty-black text-[12px] font-semibold mb-2">
          Please note — basic recommendations only, not hard requirements:
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {RECOMMENDED_PRODUCTS.map(product => (
            <div key={product} className="flex items-start gap-1.5">
              <span className="text-czysty-green text-[10px] mt-1.5 shrink-0">•</span>
              <span className="font-body text-czysty-muted text-[12px] leading-relaxed">{product}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="section-label mb-3">Cleaning supplies</p>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setBringSupplies(false)}
          className="w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.99]"
          style={{
            borderColor: !bringSupplies ? '#1a5c28' : '#e9ecef',
            background:  !bringSupplies ? '#1a5c28' : 'white',
            boxShadow:   !bringSupplies ? '0 2px 12px rgba(26,92,40,0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div className="flex-1">
            <p className="font-display font-bold text-sm uppercase tracking-wide"
              style={{ color: !bringSupplies ? '#f2ede4' : '#09100a' }}>
              I have cleaning supplies
            </p>
            <p className="font-body text-[12px] mt-0.5"
              style={{ color: !bringSupplies ? '#c8e6ce' : '#6b7b6b' }}>
              Our team will use the supplies you provide
            </p>
          </div>
          <div
            className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
            style={{ borderColor: !bringSupplies ? '#f2ede4' : '#d1d5db', background: !bringSupplies ? '#f2ede4' : 'transparent' }}
          >
            {!bringSupplies && <div className="w-2 h-2 rounded-full bg-czysty-green" />}
          </div>
        </button>

        <button
          onClick={() => setBringSupplies(true)}
          className="w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.99]"
          style={{
            borderColor: bringSupplies ? '#1a5c28' : '#e9ecef',
            background:  bringSupplies ? '#1a5c28' : 'white',
            boxShadow:   bringSupplies ? '0 2px 12px rgba(26,92,40,0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <Package size={20} className="shrink-0" style={{ color: bringSupplies ? '#f2ede4' : '#09100a' }} />
          <div className="flex-1">
            <p className="font-display font-bold text-sm uppercase tracking-wide"
              style={{ color: bringSupplies ? '#f2ede4' : '#09100a' }}>
              I need you to bring your own supplies
            </p>
            <p className="font-body text-[12px] mt-0.5"
              style={{ color: bringSupplies ? '#c8e6ce' : '#6b7b6b' }}>
              Our team brings all necessary cleaning products
            </p>
          </div>
          <span className="font-display font-bold text-sm shrink-0"
            style={{ color: bringSupplies ? '#f2ede4' : '#1a5c28' }}>
            +{formatNaira(SUPPLIES_FEE)}
          </span>
        </button>
      </div>
    </div>
  );
}
