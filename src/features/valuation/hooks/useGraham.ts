import { useMemo } from "react"

import { calculateGraham } from "../utils/graham"

type Props = {
  lpa: number
  vpa: number
  currentPrice: number
}

export function useGraham({
  lpa,
  vpa,
  currentPrice,
}: Props) {
  return useMemo(
    () =>
      calculateGraham(
        lpa,
        vpa,
        currentPrice
      ),
    [lpa, vpa, currentPrice]
  )
}