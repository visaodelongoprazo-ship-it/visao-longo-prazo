export function calculatePeterLynch(
  dividendYield: number,
  growth: number
) {
  const score = (dividendYield + growth) / 7.32

  if (score >= 2) {
    return {
      score,
      label: "Muito barata!",
    }
  }

  if (score >= 1.5) {
    return {
      score,
      label: "Atrativa",
    }
  }

  if (score >= 1) {
    return {
      score,
      label: "Justa",
    }
  }

  return {
    score,
    label: "Cara",
  }
}