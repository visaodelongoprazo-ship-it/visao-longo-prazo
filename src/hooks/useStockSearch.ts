import { useState } from "react"

import {
  B3_MOCK_DATABASE,
  CHART_SERIES,
} from "../data/mockStocks"

import {
  getStockQuote,
  type StockInterval,
  type StockRange,
} from "../services/api/stocks"

function getAsset(ticker: string) {
  const normalized = ticker.trim().toUpperCase()

  return {
    ticker: normalized,
    ...(B3_MOCK_DATABASE[
      normalized as keyof typeof B3_MOCK_DATABASE
    ] ?? B3_MOCK_DATABASE.BBSE3),
  }
}

export function useStockSearch() {
  const [tickerInput, setTickerInput] = useState("BBSE3")
  const [asset, setAsset] = useState(getAsset("BBSE3"))
  const [loading, setLoading] = useState(false)
  const [period, setPeriod] = useState<"1D" | "1M" | "6M" | "1A">("1A")

  const [chartData, setChartData] = useState(
    CHART_SERIES["1A"].map((price, index) => ({
      name: `${index + 1}`,
      price,
    }))
  )
function getPeriodConfig(period: "1D" | "1M" | "6M" | "1A"): {
  range: StockRange
  interval: StockInterval
} {
  const configs = {
    "1D": { range: "1d", interval: "15m" },
    "1M": { range: "1mo", interval: "1d" },
    "6M": { range: "6mo", interval: "1d" },
    "1A": { range: "1y", interval: "1mo" },
  } as const

  return configs[period]
}
  async function searchTicker() {
    try {
      setLoading(true)

      const normalized = tickerInput.trim().toUpperCase()
      const config = getPeriodConfig(period)

const stock = await getStockQuote(
  normalized,
  config.range,
  config.interval
)
      const fallback = getAsset(normalized)

      setAsset({
        ticker: stock.symbol,
        company: stock.longName,
        lastUpdate: "Dados reais via BRAPI",
        fundamentals: [
          ["Cotação", `R$ ${stock.regularMarketPrice ?? fallback.fundamentals[0][1]}`],
          ["P/L", stock.priceEarningsRatio ? stock.priceEarningsRatio.toFixed(2).replace(".", ",") : fallback.fundamentals[1][1]],
          ["P/VP", stock.priceToBookRatio ? stock.priceToBookRatio.toFixed(2).replace(".", ",") : fallback.fundamentals[2][1]],
          ["Dividend Yield", stock.dividendYield ? `${stock.dividendYield.toFixed(2).replace(".", ",")}%` : fallback.fundamentals[3][1]],
          ["VPA", stock.bookValuePerShare?.toString() || fallback.fundamentals[4][1]],
          ["LPA", stock.earningsPerShare?.toString() || fallback.fundamentals[5][1]],
          ["DPA médio", fallback.fundamentals[6][1]],
          ["ROE", fallback.fundamentals[7][1]],
        ],
      })

      if (stock.historicalDataPrice) {
        setChartData(
          stock.historicalDataPrice.map((item: any) => ({
            name: new Date(item.date * 1000).toLocaleDateString("pt-BR", {
              month: "2-digit",
              year: "2-digit",
            }),
            price: item.close,
          }))
        )
      }
    } catch {
      setAsset(getAsset(tickerInput))
    } finally {
      setLoading(false)
    }
  }

  return {
  tickerInput,
  setTickerInput,
  asset,
  chartData,
  searchTicker,
  loading,
  period,
  setPeriod: async (nextPeriod: "1D" | "1M" | "6M" | "1A") => {
    setPeriod(nextPeriod)

    const normalized = tickerInput.trim().toUpperCase()
    const config = getPeriodConfig(nextPeriod)
    const stock = await getStockQuote(normalized, config.range, config.interval)

    if (stock.historicalDataPrice) {
      setChartData(
        stock.historicalDataPrice.map((item: any) => ({
          name:
  period === "1D"
    ? new Date(item.date * 1000).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date(item.date * 1000).toLocaleDateString("pt-BR", {
        month: "2-digit",
        year: "2-digit",
      }),
          price: item.close,
        }))
      )
    }
  },
}}