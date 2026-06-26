'use client';

import { useRouter } from 'next/navigation';
import { useBooking, type BookingType } from '@/lib/booking-store';
import { Sparkles, WashingMachine, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const CARDS: { type: BookingType; Icon: LucideIcon; title: string; sub: string; route: string }[] = [
  {
    type:  'self',
    Icon:  Sparkles,
    title: 'Book for Cleaning',
    sub:   'Standard and deep cleaning for your home.',
    route: '/booking/space',
  },
  {
    type:  'gift',
    Icon:  WashingMachine,
    title: 'Do your Laundry',
    sub:   'Up to 50 items washed and packed monthly.',
    route: '/booking/laundry',
  },
];

export default function BookingIntroPage() {
  const router = useRouter();
  const { dispatch } = useBooking();

  function select(card: typeof CARDS[number]) {
    dispatch({ type: 'SET_BOOKING_TYPE', bookingType: card.type });
    router.push(card.route);
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-lg">
        <p className="font-body text-czysty-muted text-[11px] uppercase tracking-[0.3em] mb-3 text-center">
          Get started
        </p>
        <h1
          className="font-display font-extrabold text-czysty-black uppercase leading-[0.95] mb-10 text-center"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 3.5rem)' }}
        >
          HOW CAN
          <br />
          WE <span className="text-czysty-green">HELP?</span>
        </h1>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {CARDS.map(card => (
            <button
              key={card.type}
              onClick={() => select(card)}
              className="group relative text-left bg-white rounded-2xl border-2 border-transparent hover:border-czysty-green p-5 transition-all duration-200 hover:shadow-md active:scale-[0.98]"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}
            >
              <card.Icon size={30} className="mb-3 text-czysty-green" />
              <p className="font-display font-extrabold text-czysty-black text-base uppercase leading-tight mb-1.5">
                {card.title}
              </p>
              <p className="font-body text-czysty-muted text-[12px] leading-relaxed mb-4">
                {card.sub}
              </p>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-czysty-green transition-colors duration-200"
                style={{ background: '#09100a' }}
              >
                <ArrowRight size={14} stroke="#f2ede4" strokeWidth={2.5} />
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <p className="font-body text-czysty-muted/70 text-sm">Returning user?</p>
          <button className="h-10 px-6 rounded-full border-2 border-gray-200 font-body text-sm text-czysty-muted hover:border-czysty-green hover:text-czysty-green transition-colors">
            Login to your account
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {['Free pickup & delivery', 'Secure payment', 'Confirmed by email'].map(t => (
            <span key={t} className="flex items-center gap-1.5 font-body text-czysty-muted/60 text-[11px]">
              <span className="w-1 h-1 rounded-full bg-czysty-green/60" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
