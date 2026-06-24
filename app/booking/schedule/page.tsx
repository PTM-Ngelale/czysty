'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { FREQUENCIES, ARRIVAL_WINDOWS } from '@/lib/booking-catalog';
import { StepHeader, FieldLabel, StyledSelect } from '@/components/BookingStepHeader';

function formatDateLabel(iso: string): string {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

const GENDER_OPTIONS = [
  { value: '',       label: 'No preference' },
  { value: 'female', label: 'Female' },
  { value: 'male',   label: 'Male' },
];

export default function SchedulePage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const saved = booking.schedule;
  const [preferredStaff,   setPreferredStaff]   = useState(saved?.preferredStaff ?? null);
  const [preferredGender,  setPreferredGender]  = useState<'male' | 'female' | null>(saved?.preferredGender ?? null);
  const [date,             setDate]             = useState(saved?.date ?? '');
  const [arrivalWindow,    setArrivalWindow]    = useState(saved?.arrivalWindow ?? '');
  const [frequency,        setFrequency]        = useState(saved?.frequency ?? 'once_off');

  const isValid = date.length > 0 && arrivalWindow.length > 0;

  useEffect(() => {
    if (!booking.address) { router.replace('/booking/address'); return; }
    setOverride({
      nextDisabled: !isValid,
      onNext: () => {
        const freq = FREQUENCIES.find(f => f.id === frequency)!;
        dispatch({
          type: 'SET_SCHEDULE',
          schedule: { preferredStaff, preferredGender, date, arrivalWindow, frequency, frequencyLabel: freq.label },
        });
        router.push('/booking/extratasks');
      },
      onBack: () => router.push('/booking/address'),
    });
  }, [isValid, preferredStaff, preferredGender, date, arrivalWindow, frequency, booking.address, dispatch, router, setOverride]);

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <StepHeader step={4} total={9} title="When would you like us?" subtitle="We operate Monday – Sunday, 7 am – 4 pm." />

      {/* Date picker */}
      <div className="mb-5">
        <FieldLabel required>Pickup date</FieldLabel>
        <div className="relative">
          <select
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full appearance-none rounded-xl border-2 border-[#e9ecef] focus:border-czysty-green outline-none px-4 py-3 font-body text-sm text-czysty-black bg-white pr-10 transition-colors"
          >
            <option value="" disabled>Choose a date…</option>
            {Array.from({ length: 30 }).map((_, i) => {
              const d = new Date();
              d.setDate(d.getDate() + i + 1);
              const iso = d.toISOString().split('T')[0];
              return <option key={iso} value={iso}>{formatDateLabel(iso)}</option>;
            })}
          </select>
          <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7b6b" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </div>

      {/* Arrival window — card grid */}
      <div className="mb-5">
        <FieldLabel required>Arrival window</FieldLabel>
        <div className="grid grid-cols-2 gap-2 mt-1.5">
          {ARRIVAL_WINDOWS.map(w => {
            const active = arrivalWindow === w;
            return (
              <button
                key={w}
                onClick={() => setArrivalWindow(w)}
                className="rounded-xl border-2 px-4 py-3 font-body text-sm text-left transition-all duration-200 active:scale-[0.98]"
                style={{
                  borderColor: active ? '#1a5c28' : '#e9ecef',
                  background:  active ? '#1a5c28' : 'white',
                  color:       active ? '#f2ede4' : '#09100a',
                  boxShadow: active ? '0 2px 8px rgba(26,92,40,0.15)' : '0 1px 2px rgba(0,0,0,0.04)',
                }}
              >
                <span className="block text-xs mb-0.5" style={{ color: active ? '#c8e6ce' : '#6b7b6b' }}>
                  Pickup window
                </span>
                {w}
              </button>
            );
          })}
        </div>
      </div>

      {/* Frequency */}
      <div className="mb-5">
        <FieldLabel>How often?</FieldLabel>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {FREQUENCIES.map(f => {
            const active = frequency === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFrequency(f.id)}
                className="px-4 py-2 rounded-full border-2 font-body text-sm transition-all duration-200"
                style={{
                  borderColor: active ? '#1a5c28' : '#e9ecef',
                  background:  active ? '#1a5c28' : 'white',
                  color:       active ? '#f2ede4' : '#09100a',
                  boxShadow: active ? '0 2px 8px rgba(26,92,40,0.15)' : 'none',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preferences (collapsible feel — shown at bottom) */}
      <div className="border-t border-gray-100 pt-5 flex flex-col gap-4">
        <p className="section-label">Optional preferences</p>

        <div>
          <FieldLabel>Preferred attendant</FieldLabel>
          <StyledSelect value={preferredStaff ?? ''} onChange={v => setPreferredStaff(v || null)}>
            <option value="">No preference — match me to any available excellent attendant</option>
          </StyledSelect>
        </div>

        <div>
          <FieldLabel>Preferred gender</FieldLabel>
          <div className="flex gap-2">
            {GENDER_OPTIONS.map(opt => {
              const active = (preferredGender ?? '') === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setPreferredGender((opt.value as 'male' | 'female') || null)}
                  className="flex-1 px-3 py-2.5 rounded-xl border-2 font-body text-sm transition-all duration-200"
                  style={{
                    borderColor: active ? '#1a5c28' : '#e9ecef',
                    background:  active ? '#1a5c28' : 'white',
                    color:       active ? '#f2ede4' : '#09100a',
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
