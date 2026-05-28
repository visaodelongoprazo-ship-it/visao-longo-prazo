import {
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

type QuoteChartProps = {
  period: "1D" | "1M" | "6M" | "1A"
  setPeriod: (v: "1D" | "1M" | "6M" | "1A") => void
  currentPrice: string
  chartData: { name: string; price: number }[]
}

const CHART_SERIES = {
  "1D": [],
  "1M": [],
  "6M": [],
  "1A": [],
}

export default function QuoteChart({
  period,
  setPeriod,
  currentPrice,
  chartData,
}: QuoteChartProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Cotação</h2>

          <p className="mt-1 text-sm text-slate-500">
            Cotação atual: <strong>{currentPrice}</strong>
          </p>
        </div>

        <div className="flex gap-2">
          {Object.keys(CHART_SERIES).map((item) => (
            <button
              key={item}
              onClick={() =>
                setPeriod(item as "1D" | "1M" | "6M" | "1A")
              }
              className={`rounded-xl px-3 py-1.5 text-sm ${
                period === item
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[320px] rounded-2xl border border-slate-200 bg-white p-5">
        <ResponsiveContainer width="99%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis domain={["auto", "auto"]} />

            <Tooltip
  formatter={(value) => [
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value)),
    "Preço",
  ]}
  labelFormatter={(label) => `Período: ${label}`}
/>

            <defs>
  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.4} />
    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
  </linearGradient>
</defs>

<Area
  type="monotone"
  dataKey="price"
  stroke="none"
  fill="url(#colorPrice)"
/>

<Line
  type="monotone"
  dataKey="price"
  stroke="#2563eb"
  strokeWidth={3}
  dot={false}
  activeDot={{
    r: 6,
    fill: "#2563eb",
  }}
/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}