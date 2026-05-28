type Variant = 'neutral' | 'success' | 'danger'

interface ResultCardProps {
  label: string
  value: string
  variant?: Variant
}

export default function ResultCard({
  label,
  value,
  variant = 'neutral',
}: ResultCardProps) {
  const style = {
    neutral:
      'bg-white border-slate-300 text-slate-950 dark:bg-[#111827] dark:border-slate-700 dark:text-white',
    success:
      'bg-emerald-50 border-emerald-500 text-emerald-600 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-400',
    danger:
      'bg-red-50 border-red-400 text-red-500 dark:bg-red-950/40 dark:border-red-700 dark:text-red-400',
  }[variant]

  return (
    <div
      className={`flex min-h-[120px] flex-col justify-between rounded-2xl border p-4 transition-colors duration-300 ${style}`}
    >
      <div className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </div>

      <div className="text-2xl font-semibold leading-none tracking-tight">
        {value}
      </div>
    </div>
  )
}