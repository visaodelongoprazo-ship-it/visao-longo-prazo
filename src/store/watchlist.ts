export function getWatchlist(): string[] {
  const data = localStorage.getItem("watchlist")

  if (!data) return []

  return JSON.parse(data)
}

export function saveWatchlist(list: string[]) {
  localStorage.setItem("watchlist", JSON.stringify(list))
}

export function toggleWatchlist(ticker: string) {
  const current = getWatchlist()

  if (current.includes(ticker)) {
    const updated = current.filter((item) => item !== ticker)
    saveWatchlist(updated)
    return updated
  }

  const updated = [...current, ticker]
  saveWatchlist(updated)

  return updated
}