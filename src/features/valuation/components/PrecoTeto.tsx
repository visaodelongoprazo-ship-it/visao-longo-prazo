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

function compactMoney(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0)
}

function number(value: number) {
  return new Intl.NumberFormat("pt-BR").format(
    Number.isFinite(value) ? value : 0
  )
}

function percent(value: number) {
  return `${value.toFixed(2).replace(".", ",")}%`
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
    const projectedProfit = currentProfit * (1 + profitGrowth / 100)

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
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[300px_1fr]">
      <div className="rounded-[16px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">
            Preço Teto
          </h3>

          <span className="rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500">
            ⓘ Influenciadores
          </span>
        </div>

        <div className="space-y-3">
          <ControlRow
            label="Dividend Yield desejado"
            value={desiredYield}
            suffix="%"
            onChange={setDesiredYield}
          />

          <ControlRow
            label="Payout da empresa"
            value={payout}
            suffix="%"
            onChange={setPayout}
          />

          <div className="border-b border-slate-200 pb-3">
  <div className="grid grid-cols-[1fr_120px] items-center gap-3">
    <div className="text-center">
      <div className="rounded-2xl bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900">
        {compactMoney(result.projectedProfit)}
      </div>
      <div className="mt-1 text-[10px] font-semibold text-slate-700">
        Lucro Projetivo
      </div>
    </div>

    <div className="text-center">
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setProfitGrowth((v) => v - 1)}
          className="h-5 w-5 rounded-full bg-sky-500 text-xs font-bold text-white"
        >
          -
        </button>

        <input
          type="number"
          value={profitGrowth}
          onChange={(e) => setProfitGrowth(Number(e.target.value))}
          className="w-16 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1 text-center text-xs"
        />

        <button
          type="button"
          onClick={() => setProfitGrowth((v) => v + 1)}
          className="h-5 w-5 rounded-full bg-sky-500 text-xs font-bold text-white"
        >
          +
        </button>
      </div>

      <div className="mt-1 text-[10px] font-semibold text-slate-700">
        Projeção %
      </div>
    </div>
  </div>
</div>

          <div className="border-b border-slate-200 pb-3">
            <label className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-700">
              <span>Número de papéis</span>
              <input
                type="checkbox"
                checked={useTreasury}
                onChange={(e) => setUseTreasury(e.target.checked)}
              />
            </label>

            <input
              type="number"
              value={treasuryShares}
              onChange={(e) => setTreasuryShares(Number(e.target.value))}
              disabled={!useTreasury}
              placeholder="Ações em tesouraria"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs disabled:text-slate-400"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              className="flex-1 rounded-lg bg-sky-500 py-2 text-xs font-semibold text-white"
            >
              Salvar
            </button>

            <button
              type="button"
              onClick={reset}
              className="flex-1 rounded-lg bg-slate-50 py-2 text-xs font-semibold text-slate-600"
            >
              Reiniciar filtros
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoBox title="COTAÇÃO ATUAL" value={money(currentPrice)} />
        <InfoBox
          title="NÚMERO DE PAPÉIS"
          value={number(result.effectiveShares)}
          subtitle={useTreasury ? "Sem tesouraria" : "Com tesouraria"}
        />
        <InfoBox title="PREÇO TETO" value={money(result.fairValue)} />
        <InfoBox title="DPA (PROJETIVO)" value={money(result.projectedDpa)} />
        <InfoBox title="YIELD (PROJETIVO)" value={percent(result.projectedYield)} />
        <InfoBox title="MARGEM SEGURANÇA" value={percent(result.marginSafety)} />
      </div>
    </div>
  )
}

function ControlRow({
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
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-24 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-center text-xs font-medium"
      />

      <span className="text-right text-xs font-semibold text-slate-700">
        {label} {suffix}
      </span>
    </div>
  )
}

function InfoBox({
  title,
  value,
  subtitle,
}: {
  title: string
  value: string
  subtitle?: string
}) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-bold uppercase text-sky-500">
        {title}
      </div>

      <div className="mt-3 break-words text-lg font-bold leading-tight text-slate-900">
        {value}
      </div>

      {subtitle && (
        <div className="mt-2 inline-flex rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-[10px] font-medium text-sky-600">
          {subtitle}
        </div>
      )}
    </div>
  )
}