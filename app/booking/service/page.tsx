"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/lib/booking-store";
import { useFooter } from "@/lib/footer-context";
import { StepHeader } from "@/components/BookingStepHeader";
import { Bed, Bath, ChefHat, Sofa } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type RoomSection = {
  Icon: LucideIcon;
  title: string;
  items: string[];
  note?: string;
};

const ROOMS: RoomSection[] = [
  {
    Icon: Bed,
    title: "Bedrooms",
    items: [
      "Dusting of furniture and surfaces",
      "Making bed",
      "Sweeping and/or mopping floors",
      "Dusting and wiping of skirtings",
      "Folding or hanging of up to 10 clothes on the bed or around the bedroom",
      "Cleaning mirrors",
      "Cleaning out cobwebs",
    ],
    note: "Folding more than 10 items of clothing will attract additional charges communicated by our Booking Support Team.",
  },
  {
    Icon: Bath,
    title: "Bathrooms",
    items: [
      "Cleaning of shower, bath, and sinks",
      "Wiping of counters and taps",
      "Wiping of walls and mirrors",
      "Mopping floors",
      "Wiping outside of cupboards and cabinets",
      "Toilet clean",
      "Folding or hanging of clean towels",
      "Emptying bins and cleaning bin area",
      "Cleaning out cobwebs",
    ],
  },
  {
    Icon: ChefHat,
    title: "Kitchens",
    items: [
      "Wiping of surfaces, sinks, and appliances",
      "Washing of dishes",
      "Wiping outside of cupboards and fridge",
      "Cleaning the stove top and the walls behind the stove",
      "Cleaning inside and outside of the microwave",
      "Wiping of walls",
      "Emptying bins and cleaning bin area",
      "Mopping floors",
      "Cleaning out cobwebs",
    ],
  },
  {
    Icon: Sofa,
    title: "Living Areas",
    items: [
      "The dusting of furniture and surfaces",
      "Mopping and sweeping of floors",
      "Dusting and wiping of skirtings",
      "Dusting and wiping electronics, picture frames etc.",
      "Dusting and wiping of light switches and other fixtures",
      "Cleaning mirrors",
      "Cleaning out cobwebs",
    ],
  },
];

export default function CleaningDetailsPage() {
  const router = useRouter();
  const { booking } = useBooking();
  const { setOverride } = useFooter();

  useEffect(() => {
    if (!booking.space) {
      router.replace("/booking/space");
      return;
    }
    setOverride({
      nextDisabled: false,
      nextLabel: "Accept & Continue →",
      onNext: () => router.push("/booking/supplies"),
      onBack: () => router.push("/booking/space"),
    });
  }, [booking.space, router, setOverride]);

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <StepHeader
        step={2}
        total={9}
        title="Standard Cleaning"
        subtitle="Here's what's included in your booking."
      />

      <div className="rounded-2xl bg-czysty-cream/70 border border-czysty-cream px-5 py-4 mb-6">
        <p className="font-body text-czysty-black text-[12px] font-semibold mb-1.5">
          Before you continue
        </p>
        <p className="font-body text-czysty-muted text-[12px] leading-relaxed">
          This booking typically takes up to <strong>3–6 hours</strong> of work
          done by <strong>1–3 Handlers</strong>. Please note that your Handlers
          will <strong>not</strong> be coming with cleaning products — they will
          use the cleaning products you provide. Homes significantly larger than
          other homes of the same size, and bookings that run longer than the
          estimated time, may attract additional charges communicated by our
          Booking Support Team.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {ROOMS.map((room) => {
          const Icon = room.Icon;
          return (
            <div
              key={room.title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3">
                <Icon size={18} className="text-czysty-green shrink-0" />
                <p className="font-display font-bold text-czysty-black text-sm uppercase tracking-wide">
                  {room.title}
                </p>
              </div>
              <ul className="px-5 py-4 space-y-2">
                {room.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 font-body text-czysty-muted text-[12px] leading-relaxed"
                  >
                    <span className="text-czysty-green mt-0.5 shrink-0">•</span>
                    {item}
                  </li>
                ))}
                {room.note && (
                  <li className="font-body text-czysty-muted/60 text-[11px] leading-relaxed italic mt-2 pt-2 border-t border-gray-50">
                    {room.note}
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="font-body text-czysty-muted/60 text-[12px] text-center mt-6 leading-relaxed">
        By tapping &ldquo;Accept &amp; Continue&rdquo; you confirm you have read
        and understood what is included in this booking.
      </p>
    </div>
  );
}
