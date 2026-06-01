import { brapi } from "./brapi"

export type StockRange = "1d" | "1mo" | "6mo" | "1y"
export type StockInterval = "15m" | "1d" | "1mo"

export async function getStockQuote(
  ticker: string,
  range: StockRange = "1y",
  interval: StockInterval = "1mo"
) {
  const response = await brapi.get(`/quote/${ticker}`, {
    params: {
      token: import.meta.env.VITE_BRAPI_TOKEN,
      range,
      interval,

      fundamentals: true,
      modules:
        "summaryProfile,financialData,defaultKeyStatistics"
    },
  })

  return response.data.results?.[0]
}