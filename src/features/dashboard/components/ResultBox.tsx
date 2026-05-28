type Variant = 'neutral' | 'success' | 'danger'

export default function ResultBox(
  {
    value,
    label,
    variant = 'neutral',
  }: {
    value: string
    label: string
    variant?: Variant
  }
) {
  const style = {
    neutral: 'bg-white border-slate-300 text-slate-950',
    success: 'bg-emerald-50 border-emerald-500 text-emerald-600',
    danger: 'bg-red-50 border-red-400 text-red-500',
  }[variant]

  return (
    <div className={`flex min-h-[120px] flex-col justify-center rounded-2xl border p-5 text-center ${style}`}>
      <div className="break-words text-2xl font-bold leading-tight">{value}</div>
      <div className="mt-3 text-sm text-slate-500">{label}</div>
    </div>
  )
}