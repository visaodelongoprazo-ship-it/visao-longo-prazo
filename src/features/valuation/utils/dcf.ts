export function calculateProjectedPriceTarget(
  projectedProfit: number,
  payout: number,
  desiredYield: number,
  projection: number,
  totalShares: number
) {
  const adjustedProfit = projectedProfit * (1 + projection / 100)
  const projectedDividendTotal = adjustedProfit * (payout / 100)
  const projectedDividendPerShare = projectedDividendTotal / totalShares

  const fairValue =
    desiredYield > 0
      ? projectedDividendPerShare / (desiredYield / 100)
      : 0

  return {
    projectedDividendPerShare,
    fairValue,
  }
}