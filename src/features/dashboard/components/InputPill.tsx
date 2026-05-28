export default function InputPill({
  value,
  onChange,
  className = '',
}: {
  value: string
  onChange: (v: string) => void
  className?: string
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`rounded-full border border-slate-300 bg-slate-50 px-4 py-2 font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
    />
  )
}