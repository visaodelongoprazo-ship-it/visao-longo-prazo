import { useMemo, useState } from "react"

type Props = {
  currentPrice: number
  lpa: number
  sharesOutstanding: number
  baseDpa: number
}

function money(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number.isFinite(value) ? value : 0)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(
    Number.isFinite(value) ? value : 0
  )
}

export default function PrecoTeto({
  currentPrice,
  lpa,
  sharesOutstanding,
  baseDpa,
}: Props) {
  const initialPayout =
    lpa > 0 ? Math.min((baseDpa / lpa) * 100, 100) : 50

  const [desiredYield, setDesiredYield] = useState(6)
  const [payout, setPayout] = useState(initialPayout)
  const [profitGrowth, setProfitGrowth] = useState(0)
  const [treasuryShares, setTreasuryShares] = useState(0)
  const [useTreasury, setUseTreasury] = useState(false)

  const result = useMemo(() => {
    const baseShares = Math.max(sharesOutstanding, 1)

    const effectiveShares = useTreasury
      ? Math.max(baseShares - treasuryShares, 1)
      : baseShares

    const currentProfit = lpa * baseShares

    const projectedProfit =
      currentProfit * (1 + profitGrowth / 100)

    const projectedDpa =
      (projectedProfit * (payout / 100)) / effectiveShares

    const fairValue =
      desiredYield > 0 ? projectedDpa / (desiredYield / 100) : 0

    const projectedYield =
      currentPrice > 0 ? (projectedDpa / currentPrice) * 100 : 0

    const marginSafety =
      currentPrice > 0
        ? ((fairValue - currentPrice) / currentPrice) * 100
        : 0

    return {
      effectiveShares,
      currentProfit,
      projectedProfit,
      projectedDpa,
      fairValue,
      projectedYield,
      marginSafety,
    }
  }, [
    currentPrice,
    desiredYield,
    payout,
    profitGrowth,
    lpa,
    sharesOutstanding,
    treasuryShares,
    useTreasury,
  ])

  function reset() {
    setDesiredYield(6)
    setPayout(initialPayout)
    setProfitGrowth(0)
    setTreasuryShares(0)
    setUseTreasury(false)
  }

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr]">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          Preço Teto Projetivo
        </h3>

        <div className="mt-5 space-y-4">
          <InputRow
            label="Dividend Yield desejado"
            value={desiredYield}
            suffix="%"
            onChange={setDesiredYield}
          />

          <InputRow
            label="Payout projetado"
            value={payout}
            suffix="%"
            onChange={setPayout}
          />

          <InputRow
            label="Projeção do lucro"
            value={profitGrowth}
            suffix="%"
            onChange={setProfitGrowth}
          />

          <div className="border-b border-slate-200 pb-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={useTreasury}
                onChange={(event) => setUseTreasury(event.target.checked)}
              />
              Descontar ações em tesouraria
            </label>

            <input
              type="number"
              value={treasuryShares}
              onChange={(event) =>
                setTreasuryShares(Number(event.target.value))
              }
              disabled={!useTreasury}
              className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-100 disabled:text-slate-400"
              placeholder="Quantidade em tesouraria"
            />
          </div>

          <button
            type="button"
            onClick={reset}
            className="w-full rounded-xl bg-slate-50 py-2 text-sm font-semibold text-slate-600"
          >
            Reiniciar filtros
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <InfoBox title="COTAÇÃO ATUAL" value={money(currentPrice)} />
        <InfoBox
          title="NÚMERO DE PAPÉIS"
          value={formatNumber(sharesOutstanding)}
        />
        <InfoBox title="LPA ATUAL" value={money(lpa)} />
        <InfoBox title="DPA ATUAL" value={money(baseDpa)} />
        <InfoBox title="PREÇO TETO" value={money(result.fairValue)} />
        <InfoBox
          title="DPA PROJETIVO"
          value={money(result.projectedDpa)}
        />
        <InfoBox
          title="YIELD PROJETIVO"
          value={`${result.projectedYield.toFixed(2)}%`}
        />
        <InfoBox
          title="MARGEM SEGURANÇA"
          value={`${result.marginSafety.toFixed(2)}%`}
        />
        <InfoBox
          title="LUCRO PROJETIVO"
          value={money(result.projectedProfit)}
        />
      </div>
    </div>
  )
}

function InputRow({
  label,
  value,
  suffix,
  onChange,
}: {
  label: string
  value: number
  suffix: string
  onChange: (value: number) => void
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-24 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium"
      />

      <span className="text-sm font-semibold text-slate-700">
        {label} {suffix}
      </span>
    </div>
  )
}

function InfoBox({ title, value }: { title: string; value: string }) {
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