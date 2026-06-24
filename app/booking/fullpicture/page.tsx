'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { StepHeader, FieldLabel } from '@/components/BookingStepHeader';

const MAX_NOTES = 500;

export default function FullPicturePage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const [pets,           setPets]       = useState(booking.fullPicture.pets);
  const [notes,          setNotes]      = useState(booking.fullPicture.notes);
  const [additionalStaff, setAddl]      = useState(booking.fullPicture.additionalStaff);

  useEffect(() => {
    if (!booking.schedule) { router.replace('/booking/schedule'); return; }
    setOverride({
      nextDisabled: false,
      onNext: () => {
        dispatch({ type: 'SET_FULL_PICTURE', fullPicture: { pets, notes: notes.slice(0, MAX_NOTES), additionalStaff } });
        router.push('/booking/contact');
      },
      onBack: () => router.push('/booking/extratasks'),
    });
  }, [pets, notes, additionalStaff, booking.schedule, dispatch, router, setOverride]);

  const petsOptions = [
    { value: false, label: 'No pets' },
    { value: true,  label: 'Yes, I have pets' },
  ];

  const staffOptions = [
    { value: 0, label: 'One attendant is fine' },
    { value: 1, label: "I'd like 2 attendants" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <StepHeader
        step={6} total={9}
        title="Help us get the full picture"
        subtitle="Everything here is optional — but the more you tell us, the better we can prepare."
      />

      {/* Pets */}
      <div className="mb-6">
        <FieldLabel>Do you have pets?</FieldLabel>
        <div className="grid grid-cols-2 gap-2 mt-1.5">
          {petsOptions.map(opt => {
            const active = pets === opt.value;
            return (
              <button
                key={String(opt.value)}
                onClick={() => setPets(opt.value)}
                className="rounded-xl border-2 px-4 py-3 font-body text-sm transition-all duration-200"
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

      {/* Notes */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-1.5">
          <FieldLabel>Any special instructions?</FieldLabel>
          <span className="font-body text-[11px] text-czysty-muted/50">{notes.length}/{MAX_NOTES}</span>
        </div>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value.slice(0, MAX_NOTES))}
          placeholder="e.g. Please use unscented detergent. The blue shirt has an oil stain on the left sleeve. Handle the silk blouse with extra care."
          rows={5}
          className="w-full rounded-xl border-2 border-[#e9ecef] focus:border-czysty-green outline-none px-4 py-3 font-body text-sm text-czysty-black placeholder:text-czysty-muted/40 resize-none transition-colors bg-white"
        />
        <p className="font-body text-czysty-muted/60 text-[12px] mt-1.5">
          Heads up: only supplies paid for at the point of booking will be brought to your appointment.
        </p>
      </div>

      {/* Prompt chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['No fabric softener', 'Unscented detergent', 'Cold wash only', 'Air dry preferred', 'Delicate items inside'].map(chip => (
          <button
            key={chip}
            onClick={() => setNotes(prev => prev ? `${prev}\n${chip}` : chip)}
            className="px-3 py-1.5 rounded-full border border-gray-200 font-body text-[12px] text-czysty-muted hover:border-czysty-green hover:text-czysty-green transition-colors"
          >
            + {chip}
          </button>
        ))}
      </div>

      {/* Additional staff */}
      <div>
        <FieldLabel>Do you need an additional attendant?</FieldLabel>
        <div className="grid grid-cols-2 gap-2 mt-1.5">
          {staffOptions.map(opt => {
            const active = additionalStaff === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setAddl(opt.value)}
                className="rounded-xl border-2 px-4 py-3 font-body text-sm transition-all duration-200"
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
  );
}
