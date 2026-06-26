'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { EXTRA_TASKS, HOME_OPTIONS, formatNaira, calcExtraTaskPrice } from '@/lib/booking-catalog';
import { StepHeader } from '@/components/BookingStepHeader';

export default function SummaryPage() {
  const router = useRouter();
  const { booking, totals } = useBooking();
  const { setOverride } = useFooter();

  useEffect(() => {
    if (!booking.contact) { router.replace('/booking/contact'); return; }
    setOverride({
      nextDisabled: false,
      nextLabel: 'Proceed to Checkout →',
      onNext:  () => router.push('/booking/checkout'),
      onBack:  () => router.push('/booking/contact'),
    });
  }, [booking.contact, router, setOverride]);

  if (!booking.contact) return null;

  const isLaundryFlow = booking.bookingType === 'gift' && !booking.space;
  const spaceOption = HOME_OPTIONS.find(s => s.value === booking.space?.description);

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <StepHeader step={8} total={9} title="Booking Summary" subtitle="Review your booking before payment." />

      {/* Fulfilment callout */}
      <div className="rounded-2xl bg-czysty-cream/80 border border-czysty-cream px-5 py-4 mb-6">
        <p className="font-body font-semibold text-czysty-black text-[13px] mb-2">Before we arrive</p>
        <ul className="space-y-1">
          {(isLaundryFlow
            ? [
                'Ensure all items are packed and ready for pickup.',
                'Our team will wash, dry, and neatly pack your items within 48 hours.',
                'You will be contacted to confirm pickup and delivery times.',
              ]
            : [
                'Ensure adequate running water or stored water at the location.',
                booking.space?.bringSupplies
                  ? 'Our team will bring all cleaning supplies.'
                  : 'Please have your cleaning supplies ready for our team.',
                'Point out any special areas of concern at the time of arrival.',
              ]
          ).map(item => (
            <li key={item} className="font-body text-czysty-muted text-[12px] flex items-start gap-2">
              <span className="text-czysty-green mt-0.5 shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        {/* Personal info */}
        <SummaryCard title="Personal information" editPath="/booking/contact">
          <p className="font-body text-czysty-black text-sm font-medium">
            {booking.contact.firstName} {booking.contact.lastName}
          </p>
          <p className="font-body text-czysty-muted text-sm">{booking.contact.phone}</p>
          <p className="font-body text-czysty-muted text-sm">{booking.contact.email}</p>
          {booking.contact.bookingForSomeoneElse && (
            <span className="inline-block mt-1 bg-czysty-green/10 text-czysty-green text-[10px] font-body font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full">
              Booked for someone else
            </span>
          )}
        </SummaryCard>

        {/* Address */}
        {booking.address && (
          <SummaryCard title="Address" editPath="/booking/address">
            <p className="font-body text-czysty-black text-sm">{booking.address.full}</p>
            {booking.address.landmark && (
              <p className="font-body text-czysty-muted text-sm">{booking.address.landmark}</p>
            )}
          </SummaryCard>
        )}

        {/* Task */}
        <SummaryCard title="Task" editPath={isLaundryFlow ? '/booking/laundry' : '/booking/space'}>
          {isLaundryFlow && <p className="font-body text-czysty-black text-sm font-medium">Monthly Laundry Package</p>}
          {spaceOption && <p className="font-body text-czysty-black text-sm font-medium">{spaceOption.label}</p>}
          {booking.schedule && (
            <>
              <p className="font-body text-czysty-muted text-sm">{booking.schedule.frequencyLabel}</p>
              <p className="font-body text-czysty-muted text-sm">
                {new Date(booking.schedule.date + 'T00:00:00').toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="font-body text-czysty-muted text-sm">{booking.schedule.arrivalWindow} (attendant arrival time)</p>
            </>
          )}
        </SummaryCard>

        {/* Extra tasks */}
        {booking.extraTasks.length > 0 && (
          <SummaryCard title="Extra tasks" editPath="/booking/extratasks">
            {booking.extraTasks.map(t => {
              const def = EXTRA_TASKS.find(d => d.id === t.taskId);
              if (!def) return null;
              return (
                <div key={t.taskId} className="flex items-center justify-between">
                  <p className="font-body text-czysty-muted text-sm">
                    {t.quantity}× {def.name}: {t.frequency === 'once_off' ? 'Once off' : t.frequency}
                  </p>
                  <p className="font-body text-czysty-black text-sm font-medium">
                    {formatNaira(calcExtraTaskPrice(t.taskId, t.quantity))}
                  </p>
                </div>
              );
            })}
          </SummaryCard>
        )}

        {/* Notes */}
        {booking.fullPicture.notes && (
          <SummaryCard title="Additional details" editPath="/booking/fullpicture">
            <p className="font-body text-czysty-muted text-sm whitespace-pre-wrap">
              {booking.fullPicture.notes}
            </p>
          </SummaryCard>
        )}

        {/* Add extra task CTA */}
        <button
          onClick={() => router.push('/booking/extratasks')}
          className="flex items-center gap-2 font-body text-czysty-green text-sm hover:underline self-start py-1"
        >
          <span className="w-5 h-5 rounded-full border-2 border-czysty-green flex items-center justify-center text-xs font-bold">+</span>
          Add extra task
        </button>

        {/* Price breakdown */}
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="bg-czysty-black px-5 py-4">
            <p className="font-body text-czysty-cream/40 text-[10px] uppercase tracking-widest">Price breakdown</p>
          </div>
          <div className="bg-white px-5 py-4 flex flex-col gap-2.5">
            <PriceRow label="Base price" value={formatNaira(totals.basePrice)} />
            {totals.transportFee > 0 && (
              <PriceRow label="Delivery fee" value={formatNaira(totals.transportFee)} />
            )}
            {booking.extraTasks.map(t => {
              const def = EXTRA_TASKS.find(d => d.id === t.taskId);
              if (!def) return null;
              return <PriceRow key={t.taskId} label={def.name} value={formatNaira(calcExtraTaskPrice(t.taskId, t.quantity))} />;
            })}
            <div className="border-t border-gray-100 pt-2.5 mt-0.5 flex items-center justify-between">
              <p className="font-display font-bold text-czysty-black text-sm uppercase tracking-wide">Grand total</p>
              <p className="font-display font-extrabold text-czysty-black text-xl">{formatNaira(totals.totalPayable)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, editPath, children }: { title: string; editPath: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="section-label">{title}</p>
        <button onClick={() => router.push(editPath)} className="font-body text-czysty-green text-[12px] hover:underline">
          Edit
        </button>
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-body text-czysty-muted text-sm">{label}</p>
      <p className="font-body text-czysty-black text-sm font-medium">{value}</p>
    </div>
  );
}
