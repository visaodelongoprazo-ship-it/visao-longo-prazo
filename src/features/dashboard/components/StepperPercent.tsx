export default function StepperPercent({
  value,
  onChange,
  step = 0.5,
}: {
  value: string
  onChange: (v: string) => void
  step?: number
}) {
  function parsePercent(value: string) {
    return Number(value.replace('%', '').replace(',', '.')) || 0
  }

  function formatPercent(value: number) {
    return `${value.toFixed(2).replace('.', ',')}%`
  }

  return (
    <div className="flex items-center gap-3 rounded-full border border-slate-300 bg-slate-50 px-4 py-2 font-semibold">
      <button
        type="button"
        onClick={() => onChange(formatPercent(parsePercent(value) - step))}
        className="text-lg leading-none text-blue-600"
      >
        −
      </button>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-[72px] bg-transparent text-center outline-none"
      />

      <button
        type="button"
        onClick={() => onChange(formatPercent(parsePercent(value) + step))}
        className="text-lg leading-none text-blue-600"
      >
        +
      </button>
    </div>
  )
}