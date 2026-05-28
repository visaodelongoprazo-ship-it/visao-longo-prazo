import { useMemo } from "react"

import { calculateProjectedPriceTarget } from "../utils/dcf"

type Props = {
  projectedProfit: number
  payout: number
  desiredYield: number
  projection: number
  totalShares: number
}

export function useDCF({
  projectedProfit,
  payout,
  desiredYield,
  projection,
  totalShares,
}: Props) {
  return useMemo(
    () =>
      calculateProjectedPriceTarget(
        projectedProfit,
        payout,
        desiredYield,
        projection,
        totalShares
      ),
    [
      projectedProfit,
      payout,
      desiredYield,
      projection,
      totalShares,
    ]
  )
}