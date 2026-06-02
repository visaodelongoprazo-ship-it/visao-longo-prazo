export function parseNumber(value: string | number) {
  if (typeof value === "number") return value

  if (!value) return 0

  const cleaned = value
    .replace("R$", "")
    .replace("%", "")
    .replace(/\s/g, "")

  const hasComma = cleaned.includes(",")
  const hasDot = cleaned.includes(".")

  const normalized =
    hasComma && hasDot
      ? cleaned.replace(/\./g, "").replace(",", ".")
      : hasComma
        ? cleaned.replace(",", ".")
        : cleaned

  const parsed = Number(normalized)

  return Number.isFinite(parsed) ? parsed : 0
}

export function getMetric(
  fundamentals: string[][],
  label: string
) {
  return fundamentals.find(([key]) => key === label)?.[1] ?? "0"
}