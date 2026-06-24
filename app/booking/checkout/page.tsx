"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking, type BookingCheckout } from "@/lib/booking-store";
import { useFooter } from "@/lib/footer-context";
import { formatNaira } from "@/lib/booking-catalog";
import { StepHeader } from "@/components/BookingStepHeader";

const INSURANCE_FEE = 1100;

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
  const [insurance, setInsurance] = useState(saved.insurance);
  const [status, setStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");

  useEffect(() => {
    dispatch({
      type: "SET_CHECKOUT",
      checkout: { prepayMonths, insurance } as BookingCheckout,
    });
  }, [prepayMonths, insurance, dispatch]);

  useEffect(() => {
    if (!booking.contact) {
      router.replace("/booking/contact");
      return;
    }
    setOverride({ hideButtons: true });
  }, [booking.contact, router, setOverride]);

  const noOfBookings = prepayMonths > 0 ? prepayMonths : 1;
  const insuranceFee = insurance ? INSURANCE_FEE : 0;
  const discount = 0;
  const baseSingle = totals.basePrice;
  const totalPayable =
    baseSingle * noOfBookings + insuranceFee - discount + totals.transportFee;

  async function handlePay() {
    setStatus("processing");
    // TODO: initialize Paystack — amount = totalPayable * 100 (kobo), email = booking.contact.email
    await new Promise((r) => setTimeout(r, 2500));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto px-5 py-12 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-czysty-green/10">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a5c28"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2 className="step-heading mb-3">Booking confirmed!</h2>
        <p className="font-body text-czysty-muted text-sm mb-2 max-w-xs">
          Your laundry will be picked up on{" "}
          {booking.schedule
            ? new Date(booking.schedule.date + "T00:00:00").toLocaleDateString(
                "en-NG",
                {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                },
              )
            : "your selected date"}{" "}
          during the {booking.schedule?.arrivalWindow} window.
        </p>
        <p className="font-body text-czysty-muted text-sm mb-8">
          A confirmation has been sent to{" "}
          <strong>{booking.contact?.email}</strong>.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <a
            href="https://wa.me/2348072133343"
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

      {/* Insurance */}
      <button
        onClick={() => setInsurance((v) => !v)}
        className="w-full flex items-start gap-4 rounded-2xl border-2 px-5 py-4 mb-6 text-left transition-all duration-200"
        style={{
          borderColor: insurance ? "#1a5c28" : "#e9ecef",
          background: insurance ? "#f0faf3" : "white",
        }}
      >
        <div
          className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors"
          style={{
            borderColor: insurance ? "#1a5c28" : "#d1d5db",
            background: insurance ? "#1a5c28" : "transparent",
          }}
        >
          {insurance && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l3 3 5-5"
                stroke="#f2ede4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <p className="font-display font-bold text-czysty-black text-sm uppercase tracking-wide leading-tight">
            Insure my booking
          </p>
          <p className="font-body text-czysty-muted text-[12px] mt-0.5 leading-relaxed">
            Protection against damage or missing items — up to ₦500,000 covered.
          </p>
        </div>
        <p className="font-display font-bold text-czysty-green text-sm shrink-0 mt-0.5">
          {formatNaira(INSURANCE_FEE)}
        </p>
      </button>

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
            {insurance && (
              <BRow
                label="Booking insurance"
                value={formatNaira(insuranceFee)}
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
        Secured by Paystack · 256-bit encryption
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
