import { useMemo } from "react"

import { calculatePeterLynch } from "../utils/peterLynch"

type Props = {
  dividendYield: number
  growth: number
}

export function usePeterLynch({
  dividendYield,
  growth,
}: Props) {
  return useMemo(
    () =>
      calculatePeterLynch(
        dividendYield,
        growth
      ),
    [dividendYield, growth]
  )
}