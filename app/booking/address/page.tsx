'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { TRANSPORT_ZONES, formatNaira } from '@/lib/booking-catalog';
import { StepHeader, FieldLabel, RadioCard } from '@/components/BookingStepHeader';
import { ChevronDown } from 'lucide-react';

const ACCESS_OPTIONS = [
  { value: 'none' as const,        label: 'No — open access' },
  { value: 'access_code' as const, label: "Yes, I'll provide an access code" },
  { value: 'call_gate' as const,   label: "Yes, I'll need to call the gate" },
];

const ZONES = Object.entries(TRANSPORT_ZONES);

export default function AddressPage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const [full, setFull]               = useState(booking.address?.full ?? '');
  const [landmark, setLandmark]       = useState(booking.address?.landmark ?? '');
  const [access, setAccess]           = useState<'access_code' | 'call_gate' | 'none'>(
    booking.address?.accessPermission ?? 'none',
  );
  const [selectedArea, setSelectedArea] = useState(booking.address?.area ?? '');

  const transportFee = selectedArea ? (TRANSPORT_ZONES[selectedArea] ?? 0) : 0;
  const isValid = full.trim().length > 5;

  useEffect(() => {
    if (!booking.space) { router.replace('/booking/space'); return; }
    setOverride({
      nextDisabled: !isValid,
      onNext: () => {
        dispatch({
          type: 'SET_ADDRESS',
          address: {
            full: full.trim(), landmark: landmark.trim(),
            accessPermission: access, transportFee,
            area: selectedArea || 'Other (free)',
          },
        });
        router.push('/booking/schedule');
      },
      onBack: () => router.push('/booking/space'),
    });
  }, [isValid, full, landmark, access, selectedArea, transportFee, booking.space, dispatch, router, setOverride]);

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <StepHeader
        step={3} total={9}
        title="Tell us where you need us"
        subtitle="We'll pick up and deliver back to this address."
      />

      {/* Address */}
      <div className="mb-5">
        <FieldLabel required>Pickup address</FieldLabel>
        <textarea
          value={full}
          onChange={e => setFull(e.target.value)}
          placeholder="e.g. 14 Admiralty Way, Lekki Phase 1, Lagos"
          rows={3}
          className="w-full rounded-xl border-2 border-[#e9ecef] focus:border-czysty-green outline-none px-4 py-3 font-body text-sm text-czysty-black placeholder:text-czysty-muted/40 resize-none transition-colors bg-white"
        />
      </div>

      {/* Landmark */}
      <div className="mb-6">
        <FieldLabel>Nearby landmark</FieldLabel>
        <input
          type="text"
          value={landmark}
          onChange={e => setLandmark(e.target.value)}
          placeholder="e.g. Beside Mobil, opposite Shoprite"
          className="w-full rounded-xl border-2 border-[#e9ecef] focus:border-czysty-green outline-none px-4 py-3 font-body text-sm text-czysty-black placeholder:text-czysty-muted/40 transition-colors bg-white"
        />
      </div>

      {/* Access permission */}
      <div className="mb-6">
        <FieldLabel>Gate / access permission</FieldLabel>
        <div className="flex flex-col gap-2 mt-1.5">
          {ACCESS_OPTIONS.map(opt => (
            <RadioCard key={opt.value} active={access === opt.value} onClick={() => setAccess(opt.value)}>
              <span className="font-body text-sm" style={{ color: access === opt.value ? '#f2ede4' : '#09100a' }}>
                {opt.label}
              </span>
            </RadioCard>
          ))}
        </div>
      </div>

      {/* Delivery zone */}
      <div>
        <FieldLabel>Delivery zone</FieldLabel>
        <p className="font-body text-czysty-muted/70 text-[12px] mb-2">
          Most areas are free. Select your zone if listed to see the fee.
        </p>
        <div className="relative">
          <select
            value={selectedArea}
            onChange={e => setSelectedArea(e.target.value)}
            className="w-full appearance-none rounded-xl border-2 border-[#e9ecef] focus:border-czysty-green outline-none px-4 py-3 font-body text-sm text-czysty-black bg-white pr-10"
          >
            <option value="">My area — free delivery</option>
            {ZONES.map(([zone]) => (
              <option key={zone} value={zone}>
                {zone} (+{formatNaira(TRANSPORT_ZONES[zone])})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" size={15} stroke="#6b7b6b" strokeWidth={2.5} />
        </div>

        {transportFee > 0 && (
          <div className="mt-4 rounded-2xl border border-czysty-green/20 bg-czysty-green/5 px-5 py-3.5 flex items-center justify-between">
            <p className="font-body text-czysty-muted text-sm">Pickup & delivery fee</p>
            <p className="font-display font-bold text-czysty-green">{formatNaira(transportFee)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
