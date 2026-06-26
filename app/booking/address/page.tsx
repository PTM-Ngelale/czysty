'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { PH_LOCATIONS } from '@/lib/booking-catalog';
import { StepHeader, FieldLabel, RadioCard } from '@/components/BookingStepHeader';
import { ChevronDown } from 'lucide-react';

const ACCESS_OPTIONS = [
  { value: 'none' as const,        label: 'No — open access' },
  { value: 'access_code' as const, label: "Yes, I'll provide an access code" },
  { value: 'call_gate' as const,   label: "Yes, I'll need to call the gate" },
];

export default function AddressPage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const isLaundry = booking.space?.description === 'laundry';

  const [full,          setFull]      = useState(booking.address?.full ?? '');
  const [landmark,      setLandmark]  = useState(booking.address?.landmark ?? '');
  const [access,        setAccess]    = useState<'access_code' | 'call_gate' | 'none'>(
    booking.address?.accessPermission ?? 'none',
  );
  const [area,          setArea]      = useState(booking.address?.area ?? '');

  const isValid = full.trim().length > 5;

  useEffect(() => {
    if (!booking.space) { router.replace('/booking/space'); return; }
    setOverride({
      nextDisabled: !isValid,
      onNext: () => {
        dispatch({
          type: 'SET_ADDRESS',
          address: {
            full: full.trim(),
            landmark: landmark.trim(),
            accessPermission: access,
            transportFee: 0,
            area: area || 'Port Harcourt',
          },
        });
        router.push(isLaundry ? '/booking/contact' : '/booking/schedule');
      },
      onBack: () => router.push(isLaundry ? '/booking/laundry' : '/booking/supplies'),
    });
  }, [isValid, full, landmark, access, area, isLaundry, booking.space, dispatch, router, setOverride]);

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <StepHeader
        step={isLaundry ? 3 : 4} total={9}
        title="Tell us where you need us"
        subtitle="We'll pick up and deliver back to this address."
      />

      {/* Address */}
      <div className="mb-5">
        <FieldLabel required>Pickup address</FieldLabel>
        <textarea
          value={full}
          onChange={e => setFull(e.target.value)}
          placeholder="e.g. 14 Rumuola Road, GRA Phase 2, Port Harcourt"
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
          placeholder="e.g. Beside Access Bank, opposite Shoprite"
          className="w-full rounded-xl border-2 border-[#e9ecef] focus:border-czysty-green outline-none px-4 py-3 font-body text-sm text-czysty-black placeholder:text-czysty-muted/40 transition-colors bg-white"
        />
      </div>

      {/* Area */}
      <div className="mb-6">
        <FieldLabel>Area</FieldLabel>
        <p className="font-body text-czysty-muted/70 text-[12px] mb-2">
          Pickup and delivery is free across all Port Harcourt locations.
        </p>
        <div className="relative">
          <select
            value={area}
            onChange={e => setArea(e.target.value)}
            className="w-full appearance-none rounded-xl border-2 border-[#e9ecef] focus:border-czysty-green outline-none px-4 py-3 font-body text-sm text-czysty-black bg-white pr-10"
          >
            <option value="">Select your area</option>
            {PH_LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
            <option value="Other">Other area in Port Harcourt</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" size={15} stroke="#6b7b6b" strokeWidth={2.5} />
        </div>
      </div>

      {/* Access permission */}
      <div>
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
    </div>
  );
}
