"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useBooking, type Booking, type BookingCheckout } from "@/lib/booking-store";
import { useFooter } from "@/lib/footer-context";
import { formatNaira, HOME_OPTIONS, LAUNDRY_OPTIONS, CLEANING_EXTRAS } from "@/lib/booking-catalog";
import { StepHeader } from "@/components/BookingStepHeader";
import { CircleCheckBig } from "lucide-react";
import type { BookingMetaFields } from "@/lib/email-templates";

function buildBookingMeta(booking: Booking): BookingMetaFields {
  const isLaundry = booking.bookingType === 'gift';
  const spaceLabel = HOME_OPTIONS.find(o => o.value === booking.space?.description)?.label;
  const laundryLabel = LAUNDRY_OPTIONS.find(o => o.id === booking.laundryType)?.name;

  const meta: BookingMetaFields = {
    bookingType: isLaundry ? 'Laundry' : 'Cleaning',
    service: isLaundry ? (laundryLabel ?? 'Monthly Laundry Package') : (spaceLabel ?? 'Home Cleaning'),
  };

  if (booking.address?.full) meta.address = booking.address.full;
  if (booking.address?.landmark) meta.landmark = booking.address.landmark;

  if (booking.schedule?.date) {
    meta.date = new Date(booking.schedule.date + 'T00:00:00').toLocaleDateString('en-NG', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    });
  }
  if (booking.schedule?.arrivalWindow) meta.arrivalWindow = booking.schedule.arrivalWindow;
  if (booking.schedule?.frequencyLabel) meta.frequency = booking.schedule.frequencyLabel;

  if (booking.extraTasks.length) {
    meta.extraTasks = booking.extraTasks
      .map(t => {
        const extra = CLEANING_EXTRAS.find(e => e.id === t.taskId);
        return extra ? `${extra.name} × ${t.quantity}` : null;
      })
      .filter(Boolean)
      .join(', ');
  }

  if (booking.fullPicture?.notes) meta.notes = booking.fullPicture.notes;
  if (booking.fullPicture?.additionalStaff) meta.additionalStaff = String(booking.fullPicture.additionalStaff);

  return meta;
}

function buildWhatsAppHref(booking: Booking, totalPayable: number): string {
  const isLaundry = booking.bookingType === 'gift';
  const contact = booking.contact!;
  const spaceLabel = HOME_OPTIONS.find(o => o.value === booking.space?.description)?.label
    ?? booking.space?.description ?? '—';

  const lines = [
    `Hi Czysty! I just booked online.`,
    ``,
    `Name: ${contact.firstName} ${contact.lastName}`,
    `Phone: ${contact.phone}`,
    `Address: ${booking.address?.full ?? '—'}`,
    `Service: ${isLaundry ? (LAUNDRY_OPTIONS.find(o => o.id === booking.laundryType)?.name ?? 'Monthly Laundry Package') : spaceLabel}`,
  ];

  if (!isLaundry && booking.schedule) {
    const date = new Date(booking.schedule.date + 'T00:00:00').toLocaleDateString('en-NG', {
      weekday: 'short', day: 'numeric', month: 'short',
    });
    lines.push(`Date: ${date} · ${booking.schedule.arrivalWindow}`);
  }

  lines.push(`Total: ${formatNaira(totalPayable)}`);
  lines.push(`Please confirm. Thank you!`);

  return `https://wa.me/2348072133343?text=${encodeURIComponent(lines.join('\n'))}`;
}

const PREPAY_OPTIONS = [
  {
    months: 0 as const,
    label: "Just this booking",
    sub: "Pay for a single pickup",
    multiplier: "1×",
  },
  {
    months: 2 as const,
    label: "2 months",
    sub: "Same service, two more times",
    multiplier: "2×",
  },
  {
    months: 3 as const,
    label: "3 months",
    sub: "Best value — three months prep",
    multiplier: "3×",
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { booking, totals, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const saved = booking.checkout;
  const [prepayMonths, setPrepayMonths] = useState<0 | 2 | 3>(
    saved.prepayMonths,
  );
  const [status, setStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");

  useEffect(() => {
    dispatch({
      type: "SET_CHECKOUT",
      checkout: { prepayMonths, insurance: false } as BookingCheckout,
    });
  }, [prepayMonths, dispatch]);

  useEffect(() => {
    if (!booking.contact) {
      router.replace("/booking/contact");
      return;
    }
    setOverride({ hideButtons: true });
  }, [booking.contact, router, setOverride]);

  const noOfBookings = prepayMonths > 0 ? prepayMonths : 1;
  const discount = 0;
  const baseSingle = totals.basePrice;
  const totalPayable =
    baseSingle * noOfBookings - discount + totals.transportFee;

  function handlePay() {
    if (!booking.contact) return;
    if (typeof window === "undefined" || !window.FlutterwaveCheckout) {
      setStatus("error");
      return;
    }

    setStatus("processing");
    const txRef = `czysty-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const contact = booking.contact;
    const bookingMeta = buildBookingMeta(booking);

    window.FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ?? "",
      tx_ref: txRef,
      amount: totalPayable,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: contact.email,
        phone_number: contact.phone,
        name: `${contact.firstName} ${contact.lastName}`,
      },
      customizations: {
        title: "Czysty Cleaners",
        description: "Booking payment",
        logo: `${window.location.origin}/images/logo.png`,
      },
      meta: bookingMeta,
      callback: async (response) => {
        if (response.status !== "successful") {
          setStatus("error");
          return;
        }
        try {
          const res = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transactionId: response.transaction_id,
              txRef,
              expectedAmount: totalPayable,
              contact,
              bookingDetails: bookingMeta,
            }),
          });
          const data = await res.json();
          setStatus(data.success ? "success" : "error");
        } catch {
          setStatus("error");
        }
      },
      onclose: () => {
        setStatus((s) => (s === "success" ? s : "idle"));
      },
    });
  }

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto px-5 py-12 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-czysty-green/10">
          <CircleCheckBig size={36} stroke="#1a5c28" strokeWidth={2} />
        </div>
        <h2 className="step-heading mb-3">Booking confirmed!</h2>
        <p className="font-body text-czysty-muted text-sm mb-2 max-w-xs">
          {booking.schedule
            ? <>
                Your booking is set for{" "}
                {new Date(booking.schedule.date + "T00:00:00").toLocaleDateString("en-NG", {
                  weekday: "short", day: "numeric", month: "short",
                })}{" "}
                during the {booking.schedule.arrivalWindow} window.
              </>
            : "Our team will be in touch to confirm your pickup time."}
        </p>
        <p className="font-body text-czysty-muted text-sm mb-8">
          A confirmation has been sent to{" "}
          <strong>{booking.contact?.email}</strong>.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <a
            href={buildWhatsAppHref(booking, totalPayable)}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 rounded-full font-display font-bold text-xs uppercase tracking-widest text-czysty-cream flex items-center justify-center bg-czysty-green"
          >
            Message us on WhatsApp
          </a>
          <button
            // onClick={() => { dispatch({ type: 'RESET' }); router.push('/'); }}
            onClick={() => router.push("/")}
            className="h-12 rounded-full font-display font-bold text-xs uppercase tracking-widest border-2 border-czysty-black/20 text-czysty-black"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <Script src="https://checkout.flutterwave.com/v3.js" strategy="afterInteractive" />
      <StepHeader step={9} total={9} title="Review and checkout" />

      {/* Prepay section */}
      <div className="mb-5">
        <p className="font-body font-semibold text-czysty-black text-sm mb-1">
          How many months would you like to pay for?
        </p>
        <p className="font-body text-czysty-muted text-[12px] mb-4 leading-relaxed">
          Pay upfront for repeat bookings and lock in this month&apos;s rate.
        </p>

        <div className="flex flex-col gap-2">
          {PREPAY_OPTIONS.map((opt) => {
            const active = prepayMonths === opt.months;
            return (
              <button
                key={opt.months}
                onClick={() => setPrepayMonths(opt.months)}
                className="w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.99]"
                style={{
                  borderColor: active ? "#1a5c28" : "#e9ecef",
                  background: active ? "#1a5c28" : "white",
                  boxShadow: active
                    ? "0 2px 12px rgba(26,92,40,0.15)"
                    : "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="font-display font-bold text-sm uppercase tracking-wide leading-tight"
                    style={{ color: active ? "#f2ede4" : "#09100a" }}
                  >
                    {opt.label}
                  </p>
                  <p
                    className="font-body text-[12px] mt-0.5"
                    style={{ color: active ? "#c8e6ce" : "#6b7b6b" }}
                  >
                    {opt.sub}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    className="font-display font-bold text-lg"
                    style={{ color: active ? "#f2ede4" : "#1a5c28" }}
                  >
                    {opt.multiplier}
                  </span>
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: active ? "#f2ede4" : "#d1d5db",
                      background: active ? "#f2ede4" : "transparent",
                    }}
                  >
                    {active && (
                      <div className="w-2 h-2 rounded-full bg-czysty-green" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price breakdown */}
      <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-5">
        <div className="bg-czysty-black px-5 py-4">
          <p className="font-body text-czysty-cream/40 text-[10px] uppercase tracking-widest">
            Price breakdown
          </p>
        </div>
        <div className="bg-white px-5 py-4">
          <div className="flex flex-col gap-2.5">
            <BRow
              label="Base price (per booking)"
              value={formatNaira(baseSingle)}
            />
            <BRow label="No. of bookings" value={`× ${noOfBookings}`} />
            {totals.transportFee > 0 && (
              <BRow
                label="Delivery fee"
                value={formatNaira(totals.transportFee)}
              />
            )}
            {discount > 0 && (
              <BRow label="Discount" value={`− ${formatNaira(discount)}`} />
            )}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between">
            <p className="font-display font-bold text-czysty-black text-sm uppercase tracking-wide">
              Total payable
            </p>
            <p className="font-display font-extrabold text-czysty-black text-2xl">
              {formatNaira(totalPayable)}
            </p>
          </div>
        </div>
      </div>

      {/* Pay methods note */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-5">
        {["Card", "Bank transfer", "USSD", "Visa QR"].map((m, i) => (
          <span
            key={m}
            className="font-body text-czysty-muted text-[11px] flex items-center gap-3"
          >
            {m}
            {i < 3 && <span className="text-czysty-muted/30">·</span>}
          </span>
        ))}
      </div>

      {/* Pay CTA */}
      <button
        onClick={handlePay}
        disabled={status === "processing"}
        className="w-full h-14 rounded-full font-display font-bold text-sm uppercase tracking-widest text-czysty-cream transition-all disabled:opacity-70 bg-czysty-green"
      >
        {status === "processing" ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-czysty-cream/40 border-t-czysty-cream animate-spin" />
            Processing…
          </span>
        ) : (
          `Pay ${formatNaira(totalPayable)} securely`
        )}
      </button>

      {status === "error" && (
        <p className="font-body text-czysty-red text-sm text-center mt-4">
          Payment failed. Please try again or contact us on WhatsApp.
        </p>
      )}

      <p className="font-body text-czysty-muted/50 text-[11px] text-center mt-4">
        Secured by Flutterwave · 256-bit encryption
      </p>
    </div>
  );
}

function BRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-body text-czysty-muted text-sm">{label}</p>
      <p className="font-body text-czysty-black text-sm font-medium">{value}</p>
    </div>
  );
}
