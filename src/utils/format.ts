export function parseNumber(value: string) {
  const cleaned = String(value)
    .replace('R$', '')
    .replace('%', '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim()

  const number = Number(cleaned)

  return Number.isFinite(number) ? number : 0
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number.isFinite(value) ? value : 0)
}

export function formatPercent(value: number) {
  return `${(Number.isFinite(value)
    ? value
    : 0
  )
    .toFixed(2)
    .replace('.', ',')}%`
}