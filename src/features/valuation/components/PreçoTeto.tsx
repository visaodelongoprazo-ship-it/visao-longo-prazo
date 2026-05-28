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
  const projectedYield = (projectedDividendPerShare / currentPrice) * 100
  const marginSafety = ((fairValue - currentPrice) / currentPrice) * 100

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr]">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Preço Teto
          </h3>

          
            

        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="rounded-2xl bg-slate-50 px-5 py-3 text-sm font-medium">
              6%
            </span>
            <span className="text-sm font-semibold text-slate-700">
              Dividend Yield desejado
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="rounded-2xl bg-slate-50 px-5 py-3 text-sm font-medium">
              97,26%
            </span>
            <span className="text-sm font-semibold text-slate-700">
              Payout da empresa
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="rounded-2xl bg-slate-50 px-5 py-3 text-sm font-medium">
              R$ 9.192.497.000
            </span>
            <span className="text-sm font-semibold text-slate-700">
              Lucro Projetivo
            </span>
          </div>

          <div className="flex gap-3 pt-1">
            <button className="flex-1 rounded-xl bg-sky-500 py-2 text-sm font-semibold text-white">
              Salvar
            </button>

            <button className="flex-1 rounded-xl bg-slate-50 py-2 text-sm font-semibold text-slate-600">
              Reiniciar filtros
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoBox title="COTAÇÃO ATUAL" value={`R$ ${currentPrice.toFixed(2)}`} />
        <InfoBox title="NÚMERO DE PAPÉIS" value="1.941.400.000" />
        <InfoBox title="PREÇO TETO" value={`R$ ${fairValue.toFixed(2)}`} />
        <InfoBox
          title="DPA (PROJETIVO)"
          value={`R$ ${projectedDividendPerShare.toFixed(2)}`}
        />
        <InfoBox
          title="YIELD (PROJETIVO)"
          value={`${projectedYield.toFixed(2)}%`}
        />
        <InfoBox
          title="MARGEM SEGURANÇA"
          value={`${marginSafety.toFixed(2)}%`}
        />
      </div>
    </div>
  )
}

function InfoBox({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-bold uppercase text-sky-500">
        {title}
      </div>

      <div className="mt-3 text-xl font-bold text-slate-900">
        {value}
      </div>
    </div>
  )
}