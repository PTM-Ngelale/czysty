'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { StepHeader, FieldLabel } from '@/components/BookingStepHeader';
import { Check } from 'lucide-react';

function isValidEmail(e: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function isValidPhone(p: string) { return /^(\+?234|0)[789]\d{9}$/.test(p.replace(/\s/g, '')); }

export default function ContactPage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const saved = booking.contact;
  const [forSomeoneElse, setForSomeoneElse] = useState(saved?.bookingForSomeoneElse ?? false);
  const [firstName, setFirstName]           = useState(saved?.firstName ?? '');
  const [lastName,  setLastName]            = useState(saved?.lastName  ?? '');
  const [phone,     setPhone]               = useState(saved?.phone     ?? '');
  const [email,     setEmail]               = useState(saved?.email     ?? '');

  const [touched, setTouched] = useState({ firstName: false, lastName: false, phone: false, email: false });
  const blur = (f: keyof typeof touched) => setTouched(t => ({ ...t, [f]: true }));

  const errors = {
    firstName: touched.firstName && !firstName.trim() ? 'Required' : '',
    lastName:  touched.lastName  && !lastName.trim()  ? 'Required' : '',
    email:     touched.email     && !isValidEmail(email)  ? 'Enter a valid email address' : '',
    phone:     touched.phone     && !isValidPhone(phone)  ? 'Enter a valid Nigerian phone number (e.g. 0801 234 5678)' : '',
  };

  const isValid = firstName.trim() && lastName.trim() && isValidEmail(email) && isValidPhone(phone);

  useEffect(() => {
    setOverride({
      nextDisabled: !isValid,
      onNext: () => {
        dispatch({
          type: 'SET_CONTACT',
          contact: { bookingForSomeoneElse: forSomeoneElse, firstName: firstName.trim(), lastName: lastName.trim(), phone: phone.trim(), email: email.trim() },
        });
        router.push('/booking/summary');
      },
      onBack: () => router.push(booking.space?.description === 'laundry' ? '/booking/address' : '/booking/extratasks'),
    });
  }, [isValid, forSomeoneElse, firstName, lastName, phone, email, booking.space, dispatch, router, setOverride]);

  const lbl = forSomeoneElse ? "Recipient's" : 'Your';

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <StepHeader step={7} total={9} title="Your contact details" subtitle="Used for booking confirmation and pickup coordination." />

      {/* Booking for someone else */}
      <button
        onClick={() => setForSomeoneElse(v => !v)}
        className="flex items-center gap-3 mb-7 w-full rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200"
        style={{
          borderColor: forSomeoneElse ? '#1a5c28' : '#e9ecef',
          background:  forSomeoneElse ? '#f0faf3' : 'white',
        }}
      >
        <div
          className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors"
          style={{ borderColor: forSomeoneElse ? '#1a5c28' : '#d1d5db', background: forSomeoneElse ? '#1a5c28' : 'transparent' }}
        >
          {forSomeoneElse && <Check size={10} stroke="#f2ede4" strokeWidth={2.5} />}
        </div>
        <span className="font-body text-czysty-black text-sm">
          I&apos;m booking for someone else
        </span>
      </button>

      <div className="flex flex-col gap-4">
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <FieldLabel required>{lbl} first name</FieldLabel>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} onBlur={() => blur('firstName')}
              placeholder="First name"
              className="w-full rounded-xl border-2 outline-none px-4 py-3 font-body text-sm text-czysty-black placeholder:text-czysty-muted/40 bg-white transition-colors"
              style={{ borderColor: errors.firstName ? '#8b1a1a' : '#e9ecef' }}
            />
            {errors.firstName && <p className="text-czysty-red text-[11px] mt-1 font-body">{errors.firstName}</p>}
          </div>
          <div>
            <FieldLabel required>{lbl} last name</FieldLabel>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} onBlur={() => blur('lastName')}
              placeholder="Last name"
              className="w-full rounded-xl border-2 outline-none px-4 py-3 font-body text-sm text-czysty-black placeholder:text-czysty-muted/40 bg-white transition-colors"
              style={{ borderColor: errors.lastName ? '#8b1a1a' : '#e9ecef' }}
            />
            {errors.lastName && <p className="text-czysty-red text-[11px] mt-1 font-body">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <FieldLabel required>Phone number</FieldLabel>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} onBlur={() => blur('phone')}
            placeholder="e.g. 0812 345 6789"
            className="w-full rounded-xl border-2 outline-none px-4 py-3 font-body text-sm text-czysty-black placeholder:text-czysty-muted/40 bg-white transition-colors"
            style={{ borderColor: errors.phone ? '#8b1a1a' : '#e9ecef' }}
          />
          {errors.phone && <p className="text-czysty-red text-[11px] mt-1 font-body">{errors.phone}</p>}
        </div>

        <div>
          <FieldLabel required>Email address</FieldLabel>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => blur('email')}
            placeholder="you@example.com"
            className="w-full rounded-xl border-2 outline-none px-4 py-3 font-body text-sm text-czysty-black placeholder:text-czysty-muted/40 bg-white transition-colors"
            style={{ borderColor: errors.email ? '#8b1a1a' : '#e9ecef' }}
          />
          {errors.email && <p className="text-czysty-red text-[11px] mt-1 font-body">{errors.email}</p>}
        </div>
      </div>

      <p className="font-body text-czysty-muted/50 text-[11px] mt-7 leading-relaxed">
        Your details are used only to manage your booking and will never be shared with third parties.
      </p>
    </div>
  );
}
