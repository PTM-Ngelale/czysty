'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/lib/booking-store';
import { useFooter } from '@/lib/footer-context';
import { EXTRA_TASKS, STANDALONE_ADDONS, FREQUENCIES, formatNaira } from '@/lib/booking-catalog';
import { StepHeader } from '@/components/BookingStepHeader';

type LocalSelection = {
  taskId: string;
  checked: boolean;
  quantity: number;
  frequency: string;
};

function buildInitialSelections(
  savedTasks: { taskId: string; quantity: number; frequency: string }[],
  standaloneAddonIds: string[],
): LocalSelection[] {
  const preCheckedIds = new Set(
    standaloneAddonIds.map(addonId => {
      const addon = STANDALONE_ADDONS.find(a => a.id === addonId);
      return addon?.extraTaskId ?? null;
    }).filter(Boolean) as string[],
  );

  return EXTRA_TASKS.map(t => {
    const saved = savedTasks.find(s => s.taskId === t.id);
    return {
      taskId: t.id,
      checked: !!saved || preCheckedIds.has(t.id),
      quantity: saved?.quantity ?? 1,
      frequency: saved?.frequency ?? 'once_off',
    };
  });
}

const TASK_ICONS: Record<string, string> = {
  'ironing':         '👔',
  'stain-treatment': '🧴',
  'express':         '⚡',
  'fold-pack':       '📦',
  'starch':          '✨',
  'softener':        '🌸',
};

export default function ExtraTasksPage() {
  const router = useRouter();
  const { booking, dispatch } = useBooking();
  const { setOverride } = useFooter();

  const [subStep, setSubStep] = useState<1 | 2>(1);
  const [selections, setSelections] = useState<LocalSelection[]>(() =>
    buildInitialSelections(booking.extraTasks, booking.service.additionalServices),
  );

  const checkedTasks = selections.filter(s => s.checked);
  const selectedTaskDefs = EXTRA_TASKS.filter(t => checkedTasks.some(c => c.taskId === t.id));

  function toggle(taskId: string) {
    setSelections(prev => prev.map(s => s.taskId === taskId ? { ...s, checked: !s.checked } : s));
  }

  function setQty(taskId: string, qty: number) {
    setSelections(prev => prev.map(s => s.taskId === taskId ? { ...s, quantity: Math.max(1, qty) } : s));
  }

  function setFreq(taskId: string, freq: string) {
    setSelections(prev => prev.map(s => s.taskId === taskId ? { ...s, frequency: freq } : s));
  }

  function saveAndAdvance() {
    dispatch({
      type: 'SET_EXTRA_TASKS',
      extraTasks: checkedTasks.map(s => ({ taskId: s.taskId, quantity: s.quantity, frequency: s.frequency })),
    });
    router.push('/booking/fullpicture');
  }

  useEffect(() => {
    if (!booking.schedule) { router.replace('/booking/schedule'); return; }

    if (subStep === 1) {
      setOverride({
        nextDisabled: false,
        nextLabel: checkedTasks.length > 0 ? 'Customise →' : 'Skip',
        onBack: () => router.push('/booking/schedule'),
        onNext: () => {
          if (checkedTasks.length === 0) {
            dispatch({ type: 'SET_EXTRA_TASKS', extraTasks: [] });
            router.push('/booking/fullpicture');
          } else {
            setSubStep(2);
          }
        },
      });
    } else {
      setOverride({
        nextDisabled: false,
        nextLabel: 'Next →',
        onBack: () => setSubStep(1),
        onNext: saveAndAdvance,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subStep, checkedTasks.length, booking.schedule]);

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      {/* Header with sub-step counter */}
      <div className="flex items-start justify-between mb-4">
        <span className="inline-flex items-center bg-czysty-green/10 text-czysty-green text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
          Step 5 / 9
        </span>
        <span className="inline-flex items-center gap-1 bg-gray-100 text-czysty-muted text-[11px] font-body px-2.5 py-1 rounded-full">
          <span className="font-semibold text-czysty-black">{subStep}</span>
          <span>/</span>
          <span>2</span>
        </span>
      </div>

      {subStep === 1 ? (
        <>
          <h2 className="step-heading mb-2">Extra tasks</h2>
          <p className="font-body text-czysty-muted text-sm mb-7 leading-relaxed">
            Optional add-ons to your main service. Select any that apply — you can skip this entirely.
          </p>

          <div className="flex flex-col gap-2.5">
            {EXTRA_TASKS.map(task => {
              const sel = selections.find(s => s.taskId === task.id)!;
              const icon = TASK_ICONS[task.id] ?? '🔧';
              return (
                <button
                  key={task.id}
                  onClick={() => toggle(task.id)}
                  className="w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.99]"
                  style={{
                    borderColor: sel.checked ? '#1a5c28' : '#e9ecef',
                    background:  sel.checked ? '#1a5c28' : 'white',
                    boxShadow: sel.checked ? '0 2px 12px rgba(26,92,40,0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <span className="text-xl shrink-0 leading-none">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm uppercase tracking-wide leading-tight"
                      style={{ color: sel.checked ? '#f2ede4' : '#09100a' }}>
                      {task.name}
                    </p>
                    <p className="font-body text-[12px] mt-0.5"
                      style={{ color: sel.checked ? '#c8e6ce' : '#6b7b6b' }}>
                      {task.unitDescription}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="font-display font-bold text-sm"
                      style={{ color: sel.checked ? '#f2ede4' : '#1a5c28' }}>
                      {formatNaira(task.unitPrice)}
                    </span>
                    <span className="font-body text-[10px]"
                      style={{ color: sel.checked ? '#c8e6ce' : '#6b7b6b' }}>
                      per {task.unitLabel}
                    </span>
                    {/* Square checkbox */}
                    <div
                      className="w-5 h-5 rounded border-2 flex items-center justify-center"
                      style={{
                        borderColor: sel.checked ? '#f2ede4' : '#d1d5db',
                        background:  sel.checked ? '#f2ede4' : 'transparent',
                      }}
                    >
                      {sel.checked && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#1a5c28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {checkedTasks.length > 0 && (
            <p className="font-body text-czysty-green text-[12px] text-center mt-5">
              {checkedTasks.length} task{checkedTasks.length > 1 ? 's' : ''} selected — tap "Customise" to set quantities
            </p>
          )}
        </>
      ) : (
        <>
          <h2 className="step-heading mb-2">Customise your tasks</h2>
          <p className="font-body text-czysty-muted text-sm mb-7 leading-relaxed">
            Set the quantity and frequency for each selected task.
          </p>

          <div className="flex flex-col gap-4">
            {selectedTaskDefs.map(task => {
              const sel = selections.find(s => s.taskId === task.id)!;
              const icon = TASK_ICONS[task.id] ?? '🔧';
              const lineTotal = task.unitPrice * sel.quantity;

              return (
                <div key={task.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Card header */}
                  <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3">
                    <span className="text-xl leading-none">{icon}</span>
                    <div className="flex-1">
                      <p className="font-display font-bold text-czysty-black text-sm uppercase tracking-wide">
                        {task.name}
                      </p>
                      <p className="font-body text-czysty-muted text-[12px]">{task.unitDescription}</p>
                    </div>
                    <p className="font-display font-extrabold text-czysty-green text-base shrink-0">
                      {formatNaira(lineTotal)}
                    </p>
                  </div>

                  <div className="px-5 py-4">
                    {/* Quantity */}
                    <p className="section-label mb-3">Quantity ({task.unitLabel}s)</p>
                    <div className="flex items-center gap-4 mb-2">
                      <button
                        onClick={() => setQty(task.id, sel.quantity - 1)}
                        disabled={sel.quantity <= 1}
                        className="w-10 h-10 rounded-full border-2 font-display font-bold text-xl flex items-center justify-center transition-all disabled:opacity-30"
                        style={{ borderColor: '#e9ecef', color: '#09100a' }}
                      >
                        −
                      </button>
                      <span className="font-display font-extrabold text-czysty-black text-2xl w-10 text-center leading-none">
                        {sel.quantity}
                      </span>
                      <button
                        onClick={() => setQty(task.id, sel.quantity + 1)}
                        className="w-10 h-10 rounded-full border-2 border-czysty-green font-display font-bold text-xl flex items-center justify-center hover:bg-czysty-green hover:text-czysty-cream transition-all"
                        style={{ color: '#1a5c28' }}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-body text-czysty-muted text-[12px] mb-5">
                      {sel.quantity} × {formatNaira(task.unitPrice)} = {formatNaira(task.unitPrice * sel.quantity)}
                    </p>

                    {/* Frequency */}
                    {task.allowsFrequency && (
                      <>
                        <p className="section-label mb-3">Frequency</p>
                        <div className="flex flex-col gap-2">
                          {FREQUENCIES.slice(0, 2).map(f => {
                            const active = sel.frequency === f.id;
                            return (
                              <button
                                key={f.id}
                                onClick={() => setFreq(task.id, f.id)}
                                className="w-full text-left rounded-xl border-2 px-4 py-3 flex items-center justify-between transition-all duration-200"
                                style={{
                                  borderColor: active ? '#1a5c28' : '#e9ecef',
                                  background:  active ? '#1a5c28' : 'white',
                                }}
                              >
                                <span className="font-body text-sm" style={{ color: active ? '#f2ede4' : '#09100a' }}>
                                  {f.label}
                                </span>
                                <div
                                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                                  style={{
                                    borderColor: active ? '#f2ede4' : '#d1d5db',
                                    background:  active ? '#f2ede4' : 'transparent',
                                  }}
                                >
                                  {active && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-czysty-green" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
