const STORAGE_KEY = "visao-watchlist"

export function getWatchlist(): string[] {
  const data = localStorage.getItem(STORAGE_KEY)

  if (!data) return []

  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function toggleWatchlist(ticker: string) {
  const current = getWatchlist()

  const exists = current.includes(ticker)

  const updated = exists
    ? current.filter((item) => item !== ticker)
    : [...current, ticker]

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )

  return updated
}