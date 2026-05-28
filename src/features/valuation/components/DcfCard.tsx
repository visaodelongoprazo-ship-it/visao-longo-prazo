type Props = {
  currentPrice: number
  projectedDividendPerShare: number
  fairValue: number
}

export default function DcfCard({
  currentPrice,
  projectedDividendPerShare,
  fairValue,
}: Props) {
  const marginSafety =
    ((fairValue - currentPrice) / currentPrice) * 100

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            Fluxo de Caixa Descontado
          </h3>

          <button className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
            ⓘ
          </button>
        </div>

        <p className="text-sm text-slate-600">
          Projeção baseada em lucro, payout, crescimento e dividendos
          esperados por ação.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
          <div className="text-2xl font-bold text-slate-900">
            R$ {currentPrice.toFixed(2)}
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Cotação atual
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
          <div className="text-2xl font-bold text-slate-900">
            R$ {fairValue.toFixed(2)}
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Valor justo projetado
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

        <div className="col-span-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
          <div className="text-3xl font-bold text-slate-900">
            R$ {projectedDividendPerShare.toFixed(2)}
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Dividendo projetado por ação
          </p>
        </div>
      </div>
    </div>
  )
}