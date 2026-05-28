type Props = {
  dividendYield: number
  growth: number
}

export default function PeterLynchCard({
  dividendYield,
  growth,
}: Props) {
  const score = (dividendYield + growth) / 6

  const label =
    score >= 2
      ? "Muito barata!"
      : score >= 1
        ? "Preço justo"
        : "Cara"

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            Valuation Peter Lynch
          </h3>

          <button className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
            ⓘ
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-xl font-semibold">
              {dividendYield.toFixed(2)}%
            </div>

            <p className="text-sm text-slate-600">
              Dividend Yield dos últimos 12 meses
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-xl font-semibold">
              {growth.toFixed(2)}%
            </div>

            <p className="text-sm text-slate-600">
              Crescimento projetivo do lucro anual
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div
          className={`rounded-3xl border p-5 text-center ${
            score >= 1
              ? "border-green-400 bg-green-50"
              : "border-red-400 bg-red-50"
          }`}
        >
          <div
            className={`text-4xl font-bold ${
              score >= 1 ? "text-green-600" : "text-red-600"
            }`}
          >
            {score.toFixed(2)}
          </div>

          <p className="mt-3 text-sm text-slate-700">
            {label}
          </p>
        </div>
      </div>
    </div>
  )
}