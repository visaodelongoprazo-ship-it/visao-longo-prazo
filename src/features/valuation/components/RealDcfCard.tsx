type Props = {
  currentPrice: number
}

export default function RealDcfCard({ currentPrice }: Props) {
  const freeCashFlow = 8000000000
  const growthRate = 0.04
  const discountRate = 0.12
  const perpetualGrowth = 0.03
  const shares = 1941400000

  const years = 5

  const projectedCashFlows = Array.from({ length: years }).map((_, index) => {
    const year = index + 1
    const cashFlow = freeCashFlow * Math.pow(1 + growthRate, year)
    const presentValue = cashFlow / Math.pow(1 + discountRate, year)

    return {
      year,
      cashFlow,
      presentValue,
    }
  })

  const lastCashFlow = projectedCashFlows[projectedCashFlows.length - 1].cashFlow

  const terminalValue =
    (lastCashFlow * (1 + perpetualGrowth)) /
    (discountRate - perpetualGrowth)

  const terminalPresentValue =
    terminalValue / Math.pow(1 + discountRate, years)

  const companyValue =
    projectedCashFlows.reduce((sum, item) => sum + item.presentValue, 0) +
    terminalPresentValue

  const fairValuePerShare = companyValue / shares

  const marginSafety =
    ((fairValuePerShare - currentPrice) / currentPrice) * 100

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        DCF Real
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Fluxo de caixa descontado com projeção de 5 anos e valor terminal.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Box title="Valor justo por ação" value={`R$ ${fairValuePerShare.toFixed(2)}`} />
        <Box title="Margem de segurança" value={`${marginSafety.toFixed(2)}%`} />
        <Box title="Valor da empresa" value={`R$ ${(companyValue / 1_000_000_000).toFixed(2)} bi`} />
      </div>
    </div>
  )
}

function Box({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-xs font-semibold uppercase text-slate-500">
        {title}
      </div>
      <div className="mt-2 text-xl font-bold text-slate-900">
        {value}
      </div>
    </div>
  )
}