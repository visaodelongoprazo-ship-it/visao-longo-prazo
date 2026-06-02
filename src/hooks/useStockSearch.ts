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

function calculateLast12MonthsDpa(stock: any) {
  const dividends = stock?.dividendsData?.cashDividends ?? []

  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  return dividends
    .filter((item: any) => {
      const paymentDate = new Date(
        item.paymentDate || item.approvedOn || item.lastDatePrior
      )

      return paymentDate >= oneYearAgo
    })
    .reduce((sum: number, item: any) => {
      const value =
        Number(item.rate) ||
        Number(item.value) ||
        Number(item.amount) ||
        0

      return sum + value
    }, 0)
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
console.log("STOCK BRAPI:", stock)
console.log("DIVIDENDS DATA", stock.dividendsData)
console.log(stock)
console.log("SUMMARY PROFILE", stock.summaryProfile)
console.log("FINANCIAL DATA", stock.financialData)
console.log("KEY STATS", stock.defaultKeyStatistics)
      const fallback = getAsset(normalized)
      
      console.log(
  "DPA REAL",
  calculateLast12MonthsDpa(stock)
)

      setAsset({
        ticker: stock?.symbol ?? fallback.ticker,
        company: stock?.longName ?? fallback.company,
        lastUpdate: stock
          ? "Dados reais via BRAPI"
          : fallback.lastUpdate,
        fundamentals: [
  [
    "Cotação",
    stock?.regularMarketPrice
      ? `R$ ${stock.regularMarketPrice.toFixed(2)}`
      : fallback.fundamentals[0][1],
  ],
  [
    "P/L",
    stock?.priceEarnings
      ? stock.priceEarnings.toFixed(2).replace(".", ",")
      : fallback.fundamentals[1][1],
  ],
  [
    "P/VP",
    stock?.defaultKeyStatistics?.priceToBook
      ? stock.defaultKeyStatistics.priceToBook.toFixed(2).replace(".", ",")
      : fallback.fundamentals[2][1],
  ],
  [
    "Dividend Yield",
    stock?.defaultKeyStatistics?.dividendYield
      ? `${(stock.defaultKeyStatistics.dividendYield * 100)
          .toFixed(2)
          .replace(".", ",")}%`
      : fallback.fundamentals[3][1],
  ],
  [
    "VPA",
    stock?.defaultKeyStatistics?.bookValue
      ? stock.defaultKeyStatistics.bookValue.toFixed(2).replace(".", ",")
      : fallback.fundamentals[4][1],
  ],
  [
    "LPA",
    stock?.earningsPerShare
      ? stock.earningsPerShare.toFixed(2).replace(".", ",")
      : fallback.fundamentals[5][1],
  ],
  [
    "DPA médio",
  stock?.dividendsData?.cashDividends
    ? calculateLast12MonthsDpa(stock).toFixed(2).replace(".", ",")
    : fallback.fundamentals[6][1],
  ],

  [
    "ROE",
    stock?.financialData?.returnOnEquity
      ? `${(stock.financialData.returnOnEquity * 100)
          .toFixed(2)
          .replace(".", ",")}%`
      : fallback.fundamentals[7][1],
  ],
  [
    "Fluxo de Caixa Livre",
    stock?.financialData?.freeCashflow
      ? stock.financialData.freeCashflow.toString()
      : "0",
  ],
  [
    "Crescimento do Lucro",
    stock?.financialData?.earningsGrowth
      ? `${(stock.financialData.earningsGrowth * 100)
          .toFixed(2)
          .replace(".", ",")}%`
      : "0%",
  ],
  [
    "Ações em circulação",
    stock?.defaultKeyStatistics?.sharesOutstanding
      ? stock.defaultKeyStatistics.sharesOutstanding.toString()
      : "0",
  ],
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