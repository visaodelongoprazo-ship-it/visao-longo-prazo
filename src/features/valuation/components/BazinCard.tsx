type Props = {
  currentPrice: number
  dpa: number
}

export default function BazinCard({
  currentPrice,
  dpa,
}: Props) {
  const desiredYield = 0.06

  const fairPrice = dpa / desiredYield

  const marginSafety =
    ((fairPrice - currentPrice) / currentPrice) * 100

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            Valuation Bazin
          </h3>

          <button className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
            ⓘ
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-xl font-semibold">
              R$ {dpa.toFixed(2)}
            </div>

            <p className="text-sm text-slate-600">
              Dividendo por ação médio (DPA)
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <button className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-white">
                -
              </button>

              <span className="font-semibold">
                {(desiredYield * 100).toFixed(1)}%
              </span>

              <button className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-white">
                +
              </button>
            </div>

            <p className="text-sm text-slate-600">
              Dividend Yield desejado
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 p-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
          <div className="text-4xl font-bold text-slate-900">
            R$ {fairPrice.toFixed(2)}
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Preço teto do Bazin
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
            className={`text-4xl font-bold ${
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