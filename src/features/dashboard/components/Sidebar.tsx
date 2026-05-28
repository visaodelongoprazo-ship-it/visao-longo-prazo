type SidebarProps = {
  active: string
  setActive: (v: string) => void
  watchlist?: string[]
}

export default function Sidebar({
  active,
  setActive,
  watchlist = [],
}: SidebarProps) {
  return (
    <aside className="sticky top-4 flex h-[95vh] flex-col rounded-[28px] border border-slate-800 bg-gradient-to-b from-slate-950 to-[#07162d] p-5 text-white">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold leading-tight">
          Visão de Longo Prazo
        </h1>
        <p className="mt-2 text-sm text-slate-400">Invista melhor.</p>
      </div>

      <div className="space-y-2">
        {["Análise", "Valuation", "Indicadores"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setActive(item)}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
              active === item
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Watchlist
        </div>

        <div className="space-y-2">
          {watchlist.length > 0 ? (
            watchlist.map((ticker) => (
              <div
                key={ticker}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm font-semibold text-slate-200"
              >
                {ticker}
              </div>
            ))
          ) : (
            <p className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-xs text-slate-500">
              Nenhum ativo favoritado ainda.
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
        <div className="text-xs text-slate-400">Plano Atual</div>
        <div className="mt-2 text-xl font-semibold text-yellow-300">
          Premium
        </div>
      </div>
    </aside>
  )
}