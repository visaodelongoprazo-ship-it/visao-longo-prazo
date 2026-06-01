type Props = {
  currentPrice: number
  freeCashflow: number
  sharesOutstanding: number
  growth: number
}

export default function RealDcfCard({
  currentPrice,
  freeCashflow,
  sharesOutstanding,
  growth,
}: Props) {
  const years = 5
  const discountRate = 0.12
  const perpetualGrowth = 0.03

  const safeGrowthRate = Math.min(Math.max(growth / 100, 0.01), 0.12)

  const safeFreeCashflow =
    freeCashflow > 0 ? freeCashflow : 0

  const safeShares =
    sharesOutstanding > 0 ? sharesOutstanding : 1

  const projectedCashFlows = Array.from({ length: years }).map((_, index) => {
    const year = index + 1
    const cashFlow = safeFreeCashflow * Math.pow(1 + safeGrowthRate, year)
    const presentValue = cashFlow / Math.pow(1 + discountRate, year)

    return {
      year,
      cashFlow,
      presentValue,
    }
  })

  const lastCashFlow =
    projectedCashFlows[projectedCashFlows.length - 1]?.cashFlow ?? 0

  const terminalValue =
    (lastCashFlow * (1 + perpetualGrowth)) /
    (discountRate - perpetualGrowth)

  const terminalPresentValue =
    terminalValue / Math.pow(1 + discountRate, years)

  const companyValue =
    projectedCashFlows.reduce((sum, item) => sum + item.presentValue, 0) +
    terminalPresentValue

  const fairValuePerShare = companyValue / safeShares

  const marginSafety =
    currentPrice > 0
      ? ((fairValuePerShare - currentPrice) / currentPrice) * 100
      : 0

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        DCF Real
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Fluxo de caixa descontado com dados reais da BRAPI, projeção de 5 anos
        e valor terminal.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Box
          title="Valor justo por ação"
          value={`R$ ${fairValuePerShare.toFixed(2)}`}
        />

        <Box
          title="Margem de segurança"
          value={`${marginSafety.toFixed(2)}%`}
          variant={marginSafety >= 0 ? "positive" : "negative"}
        />

        <Box
          title="Valor da empresa"
          value={`R$ ${(companyValue / 1_000_000_000).toFixed(2)} bi`}
        />

        <Box
          title="Fluxo de caixa livre"
          value={`R$ ${(safeFreeCashflow / 1_000_000_000).toFixed(2)} bi`}
        />

        <Box
          title="Crescimento usado"
          value={`${(safeGrowthRate * 100).toFixed(2)}%`}
        />

        <Box
          title="Taxa de desconto"
          value={`${(discountRate * 100).toFixed(2)}%`}
        />
      </div>
    </div>
  )
}

function Box({
  title,
  value,
  variant = "neutral",
}: {
  title: string
  value: string
  variant?: "neutral" | "positive" | "negative"
}) {
  const styles = {
    neutral: "border-slate-200 bg-slate-50 text-slate-900",
    positive: "border-green-400 bg-green-50 text-green-600",
    negative: "border-red-400 bg-red-50 text-red-600",
  }[variant]

  return (
    <div className={`rounded-2xl border p-4 ${styles}`}>
      <div className="text-xs font-semibold uppercase text-slate-500">
        {title}
      </div>

      <div className="mt-2 text-xl font-bold">
        {value}
      </div>
    </div>
  )
}