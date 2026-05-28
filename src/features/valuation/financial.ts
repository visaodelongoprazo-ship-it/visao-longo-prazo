type Fundamental = string[]

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
export function getMetric(fundamentals: Fundamental[], name: string) {
  return fundamentals.find(([metric]) => metric === name)?.[1] ?? '0'
}