"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { BookingProvider, useBooking, type Booking } from "@/lib/booking-store";
import { FooterProvider, useFooter } from "@/lib/footer-context";
import {
  formatNaira,
  EXTRA_TASKS,
  HOME_OPTIONS,
} from "@/lib/booking-catalog";
import { ArrowLeft, ArrowRight } from "lucide-react";

const STEPS = [
  "/booking",
  "/booking/space",
  "/booking/service",     // cleaning details
  "/booking/supplies",    // recommended products
  "/booking/address",
  "/booking/schedule",
  "/booking/extratasks",
  "/booking/contact",
  "/booking/summary",
  "/booking/checkout",
];

const TOTAL_SEGMENTS = 9;

function stepSegment(pathname: string): number {
  const i = STEPS.indexOf(pathname);
  return i <= 0 ? 0 : i;
}

function isStepValid(pathname: string, booking: Booking): boolean {
  const { space, address, schedule, contact } = booking;
  switch (pathname) {
    case "/booking":
      return true;
    case "/booking/space":
      return space !== null && space.description.length > 0;
    case "/booking/service":   // cleaning details — always valid once space chosen
      return space !== null;
    case "/booking/supplies":  // always valid
      return space !== null;
    case "/booking/address":
      return address !== null && address.full.trim().length > 5;
    case "/booking/schedule":
      return (
        schedule !== null &&
        schedule.date.length > 0 &&
        schedule.arrivalWindow.length > 0
      );
    case "/booking/extratasks":
      return true;
    case "/booking/contact":
      return (
        contact !== null &&
        contact.firstName.trim().length > 0 &&
        contact.lastName.trim().length > 0 &&
        contact.email.trim().length > 0 &&
        contact.phone.trim().length > 0
      );
    case "/booking/summary":
      return true;
    case "/booking/checkout":
      return true;
    default:
      return true;
  }
}

// ─── Summary panel ────────────────────────────────────────────────────────────

function SummaryPanel({ isCalculating }: { isCalculating: boolean }) {
  const { booking, totals } = useBooking();
  const { bookingType, space, address, schedule, extraTasks, contact } = booking;
  const isLaundryFlow = bookingType === 'gift' && !space;
  const spaceOption = HOME_OPTIONS.find((s) => s.value === space?.description);

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <div className="bg-czysty-black px-5 py-5">
        <p className="font-body text-czysty-cream/40 text-[10px] uppercase tracking-widest mb-1">
          Order summary
        </p>
        <div className="flex items-end justify-between gap-2">
          <p
            className="font-display font-extrabold text-czysty-cream leading-none"
            style={{ fontSize: "1.75rem" }}
          >
            {isCalculating ? (
              <span className="text-czysty-cream/40 text-base font-body font-normal animate-pulse">
                Calculating…
              </span>
            ) : (
              formatNaira(totals.totalPayable)
            )}
          </p>
          {totals.staffCount > 0 && totals.durationHrs > 0 && (
            <p className="font-body text-czysty-cream/40 text-[11px] shrink-0 pb-0.5">
              {totals.staffCount} attendant · ~{totals.durationHrs}h
            </p>
          )}
        </div>
      </div>

      <div className="bg-white divide-y divide-gray-50">
        {contact && (
          <PanelSection label="Contact">
            <p className="text-czysty-black font-medium">
              {contact.firstName} {contact.lastName}
            </p>
            <p className="text-czysty-muted">{contact.phone}</p>
            <p className="text-czysty-muted">{contact.email}</p>
          </PanelSection>
        )}
        {address && (
          <PanelSection label="Address">
            <p className="text-czysty-black">{address.full}</p>
            {address.landmark && (
              <p className="text-czysty-muted">{address.landmark}</p>
            )}
            {address.transportFee > 0 && (
              <p className="text-czysty-muted text-[11px]">
                +{formatNaira(address.transportFee)} delivery fee
              </p>
            )}
          </PanelSection>
        )}
        {(spaceOption || isLaundryFlow || schedule) && (
          <PanelSection label="Task">
            {isLaundryFlow && (
              <p className="text-czysty-black font-medium">Monthly Laundry Package</p>
            )}
            {spaceOption && (
              <p className="text-czysty-black font-medium">{spaceOption.label}</p>
            )}
            {schedule && (
              <>
                <p className="text-czysty-muted">{schedule.frequencyLabel}</p>
                <p className="text-czysty-muted">
                  {new Date(schedule.date + "T00:00:00").toLocaleDateString(
                    "en-NG",
                    {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    },
                  )}
                </p>
                <p className="text-czysty-muted">{schedule.arrivalWindow}</p>
              </>
            )}
          </PanelSection>
        )}
        {extraTasks.length > 0 && (
          <PanelSection label="Add-ons">
            {extraTasks.map((t) => {
              const def = EXTRA_TASKS.find((d) => d.id === t.taskId);
              if (!def) return null;
              return (
                <p key={t.taskId} className="text-czysty-muted">
                  {t.quantity}× {def.name}
                </p>
              );
            })}
          </PanelSection>
        )}
      </div>
    </div>
  );
}

function PanelSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 py-3.5">
      <p className="font-body text-czysty-muted/50 text-[9px] uppercase tracking-widest mb-1.5">
        {label}
      </p>
      <div className="flex flex-col gap-0.5 font-body text-[13px]">
        {children}
      </div>
    </div>
  );
}

// ─── Main shell ───────────────────────────────────────────────────────────────

function BookingShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { booking, totals } = useBooking();
  const { override } = useFooter();

  const [isCalculating, setIsCalculating] = useState(false);
  const calcTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const prevTotal = useRef(totals.totalPayable);

  useEffect(() => {
    if (totals.totalPayable !== prevTotal.current) {
      setIsCalculating(true);
      clearTimeout(calcTimer.current);
      calcTimer.current = setTimeout(() => setIsCalculating(false), 500);
      prevTotal.current = totals.totalPayable;
    }
  }, [totals.totalPayable]);

  const stepIndex = STEPS.indexOf(pathname);
  const segment = stepSegment(pathname);
  const isIntro = pathname === "/booking";

  const prevPath = stepIndex > 0 ? STEPS[stepIndex - 1] : null;
  const nextPath = stepIndex < STEPS.length - 1 ? STEPS[stepIndex + 1] : null;

  const defaultNextDisabled = !isStepValid(pathname, booking);
  const nextDisabled =
    override.nextDisabled !== undefined
      ? override.nextDisabled
      : defaultNextDisabled;
  const nextLabel = override.nextLabel ?? "Next →";
  const hideButtons = override.hideButtons ?? false;

  function handleBack() {
    if (override.onBack !== undefined) {
      override.onBack?.();
      return;
    }
    if (prevPath) router.push(prevPath);
    else router.push("/");
  }
  function handleNext() {
    if (override.onNext !== undefined) {
      override.onNext?.();
      return;
    }
    if (nextPath) router.push(nextPath);
  }

  // Show footer on every step except the intro landing page
  const showCart = !isIntro && stepIndex >= 1;
  // Right panel from space step onward
  const showPanel = showCart && stepIndex >= 2;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ef]">
      {/* ── Header ── */}
      <header className="bg-white sticky top-0 z-40">
        {/* Green accent line */}
        <div className="h-[3px] bg-czysty-green" />
        <div
          className="max-w-5xl mx-auto px-4 h-13 flex items-center relative"
          style={{ height: "52px" }}
        >
          <button
            onClick={handleBack}
            className="absolute left-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-czysty-black/60 hover:text-czysty-black"
            aria-label="Go back"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>

          {/* <div className="flex-1 flex flex-col items-center gap-0.5"> */}
          <a href="/" className="block">
            <Image
              src="/images/logo.png"
              alt="Czysty Cleaners"
              width={96}
              height={32}
              priority
            />
          </a>
          {/* <a
              href="/"
              className="text-[10px] text-czysty-muted/60 hover:text-czysty-green transition-colors"
            >
              ← Back to main site
            </a> */}
          {/* </div> */}
        </div>
      </header>

      {/* ── Progress bar ── */}
      {!isIntro && (
        <div className="bg-white border-b border-gray-100 px-4 pb-3 pt-2.5">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-1.5">
              {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 rounded-full transition-all duration-500 ease-out"
                  style={{ background: i < segment ? "#1a5c28" : "#e9ecef" }}
                />
              ))}
            </div>
            <p className="text-[10px] text-czysty-muted/60 font-body mt-1.5 text-right">
              {segment > 0 ? `Step ${segment} of ${TOTAL_SEGMENTS}` : ""}
            </p>
          </div>
        </div>
      )}

      {/* ── Page content ── */}
      <div
        className={`flex-1 max-w-5xl mx-auto w-full ${showCart ? "pb-32" : ""} ${
          showPanel ? "lg:grid lg:grid-cols-[1fr_284px] lg:gap-6 lg:px-4" : ""
        }`}
      >
        <main className={showPanel ? "" : ""}>{children}</main>

        {showPanel && (
          <aside className="hidden lg:block py-6 pr-0">
            <div className="sticky top-[105px]">
              <SummaryPanel isCalculating={isCalculating} />
            </div>
          </aside>
        )}
      </div>

      {/* ── Sticky footer cart ── */}
      {showCart && (
        <footer
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100"
          style={{
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 -4px 32px rgba(0,0,0,0.08)",
          }}
        >
          <div className="max-w-5xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-body text-[10px] text-czysty-muted uppercase tracking-widest">
                  Total amount
                </p>
                <p className="font-body text-[11px] text-czysty-muted mt-0.5">
                  {totals.staffCount > 0 && totals.durationHrs > 0
                    ? `${totals.staffCount} attendant · ~${totals.durationHrs} hrs`
                    : "1 attendant · ~2–3 day turnaround"}
                </p>
              </div>
              <p className="font-display font-extrabold text-czysty-black text-xl leading-none">
                {isCalculating ? (
                  <span className="text-czysty-muted/50 text-sm font-body font-normal animate-pulse">
                    Calculating…
                  </span>
                ) : (
                  formatNaira(totals.totalPayable)
                )}
              </p>
            </div>

            {!hideButtons && (
              <div className="flex gap-2.5">
                <button
                  onClick={handleBack}
                  className="flex-[0_0_80px] h-12 rounded-full border-2 border-gray-200 text-czysty-black font-body font-medium text-sm hover:border-gray-300 active:scale-[0.98] transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={nextDisabled}
                  className="flex-1 h-12 rounded-full font-display font-bold text-[11px] uppercase tracking-widest text-czysty-cream transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "#1a5c28" }}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    {nextLabel.replace(/\s*→$/, '')}
                    {nextLabel.endsWith(' →') && <ArrowRight size={13} />}
                  </span>
                </button>
              </div>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookingProvider>
      <FooterProvider>
        <BookingShell>{children}</BookingShell>
      </FooterProvider>
    </BookingProvider>
  );
}
