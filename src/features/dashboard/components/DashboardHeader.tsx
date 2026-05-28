type Props = {
  tickerInput: string
  setTickerInput: (value: string) => void
  searchTicker: () => void
  loading: boolean
}

export default function DashboardHeader({
  tickerInput,
  setTickerInput,
  searchTicker,
  loading,
}: Props) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <input
        value={tickerInput}
        onChange={(e) => setTickerInput(e.target.value)}
        placeholder="Digite um ticker..."
        className="
          flex-1
          bg-white
          border
          border-slate-300
          rounded-xl
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-slate-400
          transition
        "
      />

      <button
        onClick={searchTicker}
        disabled={loading}
        className={`
          px-5
          py-3
          rounded-xl
          text-white
          font-medium
          transition
          ${
            loading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-slate-900 hover:bg-slate-800"
          }
        `}
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </div>
  )
}