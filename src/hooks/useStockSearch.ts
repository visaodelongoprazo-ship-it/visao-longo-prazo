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

type Period = "1D" | "1M" | "6M" | "1A"

function getAsset(ticker: string) {
  const normalized = ticker.trim().toUpperCase()

  const mockAsset =
    B3_MOCK_DATABASE[
      normalized as keyof typeof B3_MOCK_DATABASE
    ]

  if (mockAsset) {
    return {
      ticker: normalized,
      ...mockAsset,
    }
  }

  return {
    ticker: normalized,
    company: `${normalized} - dados indisponíveis`,
    lastUpdate: "Ticker não encontrado na base local",
    fundamentals: [
      ["Cotação", "-"],
      ["P/L", "-"],
      ["P/VP", "-"],
      ["Dividend Yield", "-"],
      ["VPA", "-"],
      ["LPA", "-"],
      ["DPA médio", "-"],
      ["ROE", "-"],
    ],
  }
}

function getPeriodConfig(period: Period): {
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

function formatChartData(stock: any, period: Period) {
  if (!stock?.historicalDataPrice) return []

  return stock.historicalDataPrice.map((item: any) => ({
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
}

function getMockChartData() {
  return CHART_SERIES["1A"].map((price, index) => ({
    name: `${index + 1}`,
    price,
  }))
}

export function useStockSearch() {
  const [tickerInput, setTickerInput] = useState("BBSE3")
  const [asset, setAsset] = useState(getAsset("BBSE3"))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [period, setPeriodState] = useState<Period>("1A")
  const [chartData, setChartData] = useState(getMockChartData())

  async function searchTicker() {
    try {
      setLoading(true)
      setError("")

      const normalized = tickerInput.trim().toUpperCase()
      const config = getPeriodConfig(period)

      const stock = await getStockQuote(
        normalized,
        config.range,
        config.interval
      )

      const fallback = getAsset(normalized)

      setAsset({
        ticker: stock?.symbol ?? fallback.ticker,
        company: stock?.longName ?? fallback.company,
        lastUpdate: stock
          ? "Dados reais via BRAPI"
          : fallback.lastUpdate,
        fundamentals: [
          ["Cotação", stock?.regularMarketPrice ? `R$ ${stock.regularMarketPrice}` : fallback.fundamentals[0][1]],
          ["P/L", stock?.priceEarningsRatio ? stock.priceEarningsRatio.toFixed(2).replace(".", ",") : fallback.fundamentals[1][1]],
          ["P/VP", stock?.priceToBookRatio ? stock.priceToBookRatio.toFixed(2).replace(".", ",") : fallback.fundamentals[2][1]],
          ["Dividend Yield", stock?.dividendYield ? `${stock.dividendYield.toFixed(2).replace(".", ",")}%` : fallback.fundamentals[3][1]],
          ["VPA", stock?.bookValuePerShare?.toString() || fallback.fundamentals[4][1]],
          ["LPA", stock?.earningsPerShare?.toString() || fallback.fundamentals[5][1]],
          ["DPA médio", fallback.fundamentals[6][1]],
          ["ROE", fallback.fundamentals[7][1]],
        ],
      })

      const nextChartData = formatChartData(stock, period)

      setChartData(
        nextChartData.length > 0 ? nextChartData : getMockChartData()
      )
    } catch {
      setError("Ticker não encontrado ou indisponível.")

      setAsset(getAsset(tickerInput))
      setChartData(getMockChartData())
    } finally {
      setLoading(false)
    }
  }

  async function changePeriod(nextPeriod: Period) {
    try {
      setLoading(true)
      setPeriodState(nextPeriod)

      const normalized = tickerInput.trim().toUpperCase()
      const config = getPeriodConfig(nextPeriod)

      const stock = await getStockQuote(
        normalized,
        config.range,
        config.interval
      )

      const nextChartData = formatChartData(stock, nextPeriod)

      setChartData(
        nextChartData.length > 0 ? nextChartData : getMockChartData()
      )
    } catch {
      console.warn("Não foi possível carregar o histórico desse período.")
      setChartData(getMockChartData())
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
    error,
    period,
    setPeriod: changePeriod,
  }
}