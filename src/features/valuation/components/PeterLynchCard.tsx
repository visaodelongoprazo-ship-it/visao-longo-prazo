type Props = {
  dividendYield: number
  growth: number
}

export default function PeterLynchCard({
  dividendYield,
  growth,
}: Props) {
  const safeGrowth = Math.min(Math.max(growth, 0), 30)
  const score = (dividendYield + safeGrowth) / 6

  const label =
    score >= 2
      ? "Muito barata!"
      : score >= 1
        ? "Preço justo"
        : "Cara"

  return (
    <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">
      <div className="px-4 py-4">
        <h3 className="text-base font-semibold text-slate-900">
          Valuation Peter Lynch
        </h3>
      </div>

      <div className="border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="min-w-[90px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-center text-sm font-medium text-slate-900">
            {dividendYield.toFixed(2).replace(".", ",")}%
          </div>

          <p className="text-xs text-slate-700">
            Dividend Yield dos últimos 12 meses
          </p>
        </div>
      </div>

      <div className="border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="min-w-[90px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-center text-sm font-medium text-slate-900">
            {safeGrowth.toFixed(2).replace(".", ",")}%
          </div>

          <p className="text-xs text-slate-700">
            Crescimento projetivo do lucro anual
          </p>
        </div>
      </div>

      <div className="px-4 py-5">
        <div
          className={`rounded-2xl border py-3 text-center ${
            score >= 1
              ? "border-green-500 bg-green-50"
              : "border-red-400 bg-red-50"
          }`}
        >
          <div
            className={`text-2xl font-bold ${
              score >= 1 ? "text-green-600" : "text-red-600"
            }`}
          >
            {score.toFixed(2).replace(".", ",")}
          </div>
        </div>

        <p className="mt-3 text-center text-xs font-medium text-slate-700">
          {label}
        </p>
      </div>
    </div>
  )
}