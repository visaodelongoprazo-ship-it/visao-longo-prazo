import DashboardHeader from "../features/dashboard/components/DashboardHeader"
import { parseNumber, getMetric } from "../features/valuation/financial"
import { useStockSearch } from "../hooks/useStockSearch"
import Sidebar from "../features/dashboard/components/Sidebar"
import QuoteChart from "../features/dashboard/components/QuoteChart"
import InputField from "../features/dashboard/components/InputField"
import ResultCard from "../features/dashboard/components/ResultCard"
import { useState } from "react"
import ThemeToggle from "../features/dashboard/components/ThemeToggle"
import { getWatchlist, toggleWatchlist } from "../store/watchlist"
import BazinCard from "../features/valuation/components/BazinCard"
import GrahamCard from "../features/valuation/components/GrahamCard"
import PeterLynchCard from "../features/valuation/components/PeterLynchCard"
import DcfCard from "../features/valuation/components/DcfCard"
const TOTAL_SHARES = 1941400000

export default function App() {
  const [activeMenu, setActiveMenu] = useState("Análise")
  const [tab, setTab] = useState("Valuations")
  const [isDark, setIsDark] = useState(false)
  const [watchlist, setWatchlist] = useState<string[]>(getWatchlist())

  function toggleTheme() {
    setIsDark((prev) => !prev)
  }

  const {
    tickerInput,
    setTickerInput,
    asset,
    chartData,
    searchTicker,
    loading,
    error,
    period,
    setPeriod,
  } = useStockSearch()

 

  const [dcfPayout, setDcfPayout] = useState("97,26%")
  const [dcfRoe, setDcfRoe] = useState(getMetric(asset.fundamentals, "ROE"))
  const [dcfGrowth, setDcfGrowth] = useState("1,99%")
  const [dcfDiscount, setDcfDiscount] = useState("14,50%")

  const fundamentals = asset.fundamentals
  const currentPrice = getMetric(fundamentals, "Cotação")
  const current = parseNumber(currentPrice)
  const dividendYield = getMetric(fundamentals, "Dividend Yield")
  const dpa = getMetric(fundamentals, "DPA médio")
  const lpa = getMetric(fundamentals, "LPA")
  const vpa = getMetric(fundamentals, "VPA")

  const summary = [
    ["Cotação", currentPrice],
    ["Dividend Yield", dividendYield],
    ["P/L", getMetric(fundamentals, "P/L")],
    ["P/VP", getMetric(fundamentals, "P/VP")],
  ]

  const dcfRows = [
    ["2021", "R$ 3.933.217.000,00", "2,14%", "-"],
    ["2022", "R$ 6.044.571.000,00", "53,68%", "-"],
    ["2023", "R$ 7.947.203.000,00", "31,48%", "-"],
    ["2024", "R$ 8.703.353.000,00", "9,51%", "-"],
    ["2025", "R$ 9.017.329.000,00", "3,61%", "-"],
    ["2026", "R$ 9.196.773.847,10", dcfGrowth, "R$ 8.032.116.897,03"],
    ["2027", "R$ 9.379.789.646,66", dcfGrowth, "R$ 7.154.546.745,22"],
    ["2028", "R$ 9.566.447.460,63", dcfGrowth, "R$ 6.372.857.838,82"],
    ["Perpétuo", "R$ 85.682.094.647,34", "3,0%", "R$ 64.374.225.880,80"],
  ]

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="grid w-full grid-cols-[240px_1fr] gap-6">
        <Sidebar
  active={activeMenu}
  setActive={setActiveMenu}
  watchlist={watchlist}
/>

        <main className="w-full space-y-5">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-8 flex items-start justify-between gap-6">
              <div className="w-full">
                <div className="mb-4 flex justify-end">
                  <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
                </div>

                <DashboardHeader
                  tickerInput={tickerInput}
                  setTickerInput={setTickerInput}
                  searchTicker={searchTicker}
                  loading={loading}
                />

                {error && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {error}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-3">
                  <p className="text-sm text-slate-500">{asset.company}</p>

                  <button
  type="button"
  onClick={() => {
    const updated = toggleWatchlist(asset.ticker)
    setWatchlist(updated)
  }}
  className="rounded-xl border border-slate-300 bg-white px-3 py-1 text-xs font-semibold shadow-sm transition hover:bg-slate-100"
>
  ★ Favorito
</button>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  {asset.lastUpdate}
                </p>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-4 gap-4">
              {summary.map(([title, value]) => (
                <ResultCard key={title} value={value} label={title} />
              ))}
            </div>

            <QuoteChart
              period={period}
              setPeriod={setPeriod}
              currentPrice={currentPrice}
              chartData={chartData}
            />

            <div className="mt-6 flex gap-3 border-b border-slate-200 pb-4">
              {["Valuations", "Fluxo de Caixa Descontado"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
                    tab === item
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {tab === "Valuations" ? (
  <div className="mt-6 space-y-6">
    <BazinCard
      currentPrice={current}
      dpa={parseNumber(dpa)}
    />

    <GrahamCard
      currentPrice={current}
      lpa={parseNumber(lpa)}
      vpa={parseNumber(vpa)}
    />

    <PeterLynchCard
      dividendYield={parseNumber(dividendYield)}
      growth={3}
    />

    <DcfCard
      currentPrice={current}
      projectedDividendPerShare={4.61}
fairValue={76.75}
    />
  </div>
) : (
              <div className="mt-6 grid grid-cols-[360px_1fr] gap-5">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-[24px] border border-slate-300 bg-[#f3f4f6]">
                    <div className="border-b border-slate-300 bg-white px-5 py-4">
                      <h3 className="text-xl font-semibold">Premissas</h3>
                    </div>

                    {[
                      ["Payout médio", dcfPayout, setDcfPayout],
                      ["ROE", dcfRoe, setDcfRoe],
                      ["Taxa Esperada de Crescimento", dcfGrowth, setDcfGrowth],
                      ["Taxa de desconto", dcfDiscount, setDcfDiscount],
                    ].map(([label, value, setter]) => (
                      <div
                        key={label as string}
                        className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4"
                      >
                        <span className="text-sm font-medium text-slate-700">
                          {label as string}
                        </span>

                        <InputField
                          value={value as string}
                          onChange={setter as (v: string) => void}
                          className="w-[104px] bg-slate-100 text-right text-sm"
                        />
                      </div>
                    ))}

                    <div className="bg-white px-5 py-4 text-xs text-slate-500">
                      ⓘ Média histórica da Selic é 11,53%.
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[24px] border border-slate-300 bg-[#f3f4f6]">
                    <div className="border-b border-slate-300 bg-white px-5 py-4">
                      <h3 className="text-xl font-semibold">
                        Realidade Projetada
                      </h3>
                    </div>

                    {[
                      ["Market cap", "R$ 85.933.747.361,88"],
                      ["Nº total de ações", TOTAL_SHARES.toLocaleString("pt-BR")],
                      ["Preço por ação", "R$ 44,27"],
                      ["Upside / Downside", "28,35%"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between border-b border-slate-200 px-5 py-4"
                      >
                        <span className="text-sm font-semibold text-slate-700">
                          {label}
                        </span>
                        <span className="text-sm font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-slate-300 bg-[#f3f4f6]">
                  <div className="flex items-center justify-between border-b border-slate-300 bg-white px-5 py-4">
                    <h3 className="text-xl font-semibold">
                      Fluxo de Caixa Descontado
                    </h3>

                    <div className="flex gap-2">
                      <button className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold">
                        3 anos
                      </button>
                      <button className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold">
                        5 anos
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-[90px_1.2fr_1fr_1fr] border-b border-slate-300 px-5 py-4 text-xs font-bold uppercase text-slate-500">
                    <div>Ano</div>
                    <div>Lucro Líquido</div>
                    <div>Crescimento</div>
                    <div className="text-right">VPL</div>
                  </div>

                  <div className="divide-y divide-slate-200 bg-white">
                    {dcfRows.map(([ano, lucro, crescimento, vpl], index) => (
                      <div
                        key={ano}
                        className={`grid grid-cols-[90px_1.2fr_1fr_1fr] px-5 py-5 text-sm ${
                          index >= 5 ? "bg-slate-50" : ""
                        }`}
                      >
                        <div
                          className={
                            index >= 5
                              ? "font-semibold text-sky-500"
                              : "font-semibold"
                          }
                        >
                          {ano}
                        </div>
                        <div className="font-medium text-slate-700">
                          {lucro}
                        </div>
                        <div
                          className={
                            index < 5
                              ? "font-semibold text-emerald-600"
                              : "font-medium"
                          }
                        >
                          {crescimento}
                        </div>
                        <div
                          className={`text-right font-semibold ${
                            ano === "Perpétuo" ? "text-sky-500" : ""
                          }`}
                        >
                          {vpl}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="rounded-[28px] border border-slate-300 bg-[#f3f4f6] p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">
                Indicadores Fundamentalistas
              </h2>

              <span className="text-sm text-slate-500">
                Dados carregados automaticamente da B3
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {fundamentals.map(([title, value]) => (
                <div
                  key={title}
                  className="flex min-h-[120px] flex-col justify-between rounded-2xl border border-slate-300 bg-white p-4"
                >
                  <div className="text-sm text-slate-500">{title}</div>
                  <div className="text-2xl font-semibold leading-none tracking-tight">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}