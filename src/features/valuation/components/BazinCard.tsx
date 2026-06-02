import { useState } from "react"

type Props = {
  currentPrice: number
  dpa: number
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number.isFinite(value) ? value : 0)
}

export default function BazinCard({ currentPrice, dpa }: Props) {
  const [desiredYield, setDesiredYield] = useState(6)

  const desiredYieldDecimal = desiredYield / 100
  const fairPrice = dpa > 0 ? dpa / desiredYieldDecimal : 0

  const marginSafety =
    currentPrice > 0
      ? ((fairPrice - currentPrice) / currentPrice) * 100
      : 0

  function decreaseYield() {
    setDesiredYield((prev) => Math.max(1, prev - 0.5))
  }

  function increaseYield() {
    setDesiredYield((prev) => Math.min(20, prev + 0.5))
  }

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-900">
          Valuation Bazin
        </h3>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-xl font-semibold text-slate-900">
              {formatCurrency(dpa)}
            </div>

            <p className="text-sm text-slate-600">
              Dividendo por ação médio (DPA)
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <button
                type="button"
                onClick={decreaseYield}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-white"
              >
                -
              </button>

              <span className="min-w-[52px] text-center font-semibold text-slate-900">
                {desiredYield.toFixed(1)}%
              </span>

              <button
                type="button"
                onClick={increaseYield}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-white"
              >
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
          <div className="text-3xl font-bold text-slate-900">
            {formatCurrency(fairPrice)}
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
            className={`text-3xl font-bold ${
              marginSafety >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {marginSafety.toFixed(2).replace(".", ",")}%
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Margem de segurança
          </p>
        </div>
      </div>
    </div>
  )
}