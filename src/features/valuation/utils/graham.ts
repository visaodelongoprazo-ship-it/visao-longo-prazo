export function calculateGraham(
  lpa: number,
  vpa: number,
  currentPrice: number
) {
  const priceTarget = Math.sqrt(Math.max(0, 22.5 * lpa * vpa))
  const safetyMargin =
    currentPrice > 0 ? (priceTarget / currentPrice - 1) * 100 : 0

  return { priceTarget, safetyMargin }
}