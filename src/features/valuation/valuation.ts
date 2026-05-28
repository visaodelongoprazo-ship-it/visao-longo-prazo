export function calculateBazin(
  dpa: number,
  desiredYield: number,
  currentPrice: number
) {
  const priceTarget =
    desiredYield > 0 ? dpa / (desiredYield / 100) : 0

  const safetyMargin =
    currentPrice > 0
      ? (priceTarget / currentPrice - 1) * 100
      : 0

  return { priceTarget, safetyMargin }
}