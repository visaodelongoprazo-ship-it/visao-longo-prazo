import { useMemo } from "react"

import { calculateBazin } from "../utils/bazin"

type Props = {
  dpa: number
  desiredYield: number
  currentPrice: number
}

export function useBazin({
  dpa,
  desiredYield,
  currentPrice,
}: Props) {
  return useMemo(
    () =>
      calculateBazin(
        dpa,
        desiredYield,
        currentPrice
      ),
    [dpa, desiredYield, currentPrice]
  )
}