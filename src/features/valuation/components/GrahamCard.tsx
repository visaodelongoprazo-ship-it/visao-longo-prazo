type Props = {
  currentPrice: number
  lpa: number
  vpa: number
}

export default function GrahamCard({
  currentPrice,
  lpa,
  vpa,
}: Props) {
  const fairPrice = Math.sqrt(22.5 * lpa * vpa)

  const marginSafety =
    ((fairPrice - currentPrice) / currentPrice) * 100

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            Valuation Graham
          </h3>

          <button className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
            ⓘ
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-xl font-semibold">
              {lpa.toFixed(2)}
            </div>

            <p className="text-sm text-slate-600">
              Lucro por ação no ano
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-xl font-semibold">
              {vpa.toFixed(2)}
            </div>

            <p className="text-sm text-slate-600">
              Valor patrimonial por ação
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
          <div className="text-2xl font-bold text-slate-900">
            R$ {currentPrice.toFixed(2)}
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Cotação atual do ativo
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
          <div className="text-2xl font-bold text-slate-900">
            R$ {fairPrice.toFixed(2)}
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Preço teto
          </p>
        </div>

        <div
          className={`rounded-3xl border p-5 text-center ${
            marginSafety >= 0
              ? "border-green-400 bg-green-50"
              : "border-red-400 bg-red-50"
          }`}
        >
          <div
            className={`text-2xl font-bold ${
              marginSafety >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {marginSafety.toFixed(2)}%
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Margem de segurança
          </p>
        </div>
      </div>
    </div>
  )
}