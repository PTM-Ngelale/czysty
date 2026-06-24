export function StepBadge({ step, total }: { step: number; total: number }) {
  return (
    <span className="inline-flex items-center bg-czysty-green/10 text-czysty-green text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3">
      Step {step} / {total}
    </span>
  );
}

export function StepHeader({
  step,
  total,
  title,
  subtitle,
}: {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-7">
      <StepBadge step={step} total={total} />
      <h2 className="step-heading">{title}</h2>
      {subtitle && (
        <p className="font-body text-czysty-muted text-sm mt-2 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

export function RadioCard({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center justify-between gap-4 transition-all duration-200 active:scale-[0.99]"
      style={{
        borderColor: active ? '#1a5c28' : '#e9ecef',
        background:  active ? '#1a5c28' : 'white',
        boxShadow: active ? '0 2px 12px rgba(26,92,40,0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {children}
      <div
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
        style={{
          borderColor: active ? '#f2ede4' : '#d1d5db',
          background:  active ? '#f2ede4' : 'transparent',
        }}
      >
        {active && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#1a5c28" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </button>
  );
}

export function CheckCard({
  checked,
  onClick,
  children,
}: {
  checked: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl border-2 px-5 py-4 flex items-center justify-between gap-4 transition-all duration-200 active:scale-[0.99]"
      style={{
        borderColor: checked ? '#1a5c28' : '#e9ecef',
        background:  checked ? '#f0faf3' : 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {children}
      <div
        className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors"
        style={{
          borderColor: checked ? '#1a5c28' : '#d1d5db',
          background:  checked ? '#1a5c28' : 'transparent',
        }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#f2ede4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </button>
  );
}

export function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="font-body text-czysty-black text-[13px] font-medium block mb-1.5">
      {children}{required && <span className="text-czysty-red ml-0.5">*</span>}
    </label>
  );
}

export function StyledSelect({
  value,
  onChange,
  children,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border-2 outline-none px-4 py-3 font-body text-sm text-czysty-black bg-white transition-colors pr-10"
          style={{ borderColor: error ? '#8b1a1a' : '#e9ecef' }}
          onFocus={e => { e.currentTarget.style.borderColor = '#1a5c28'; }}
          onBlur={e => { e.currentTarget.style.borderColor = error ? '#8b1a1a' : '#e9ecef'; }}
        >
          {children}
        </select>
        <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7b6b" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {error && <p className="font-body text-czysty-red text-[12px] mt-1.5">{error}</p>}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full rounded-xl border-2 outline-none px-4 py-3 font-body text-sm text-czysty-black placeholder:text-czysty-muted/40 transition-colors bg-white"
        style={{ borderColor: error ? '#8b1a1a' : '#e9ecef' }}
        onFocus={e => { e.currentTarget.style.borderColor = '#1a5c28'; }}
        onBlurCapture={e => { e.currentTarget.style.borderColor = error ? '#8b1a1a' : '#e9ecef'; }}
      />
      {error && <p className="font-body text-czysty-red text-[12px] mt-1.5">{error}</p>}
    </div>
  );
}
