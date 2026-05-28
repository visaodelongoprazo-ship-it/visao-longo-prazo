
type SidebarProps = {
  active: string
  setActive: (v: string) => void
}

export default function Sidebar({ active, setActive }: SidebarProps) {
  return (
    <aside className="sticky top-4 h-[95vh] rounded-[28px] border border-slate-800 bg-gradient-to-b from-slate-950 to-[#07162d] p-5 text-white">
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

      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
        <div className="text-xs text-slate-400">Plano Atual</div>
        <div className="mt-2 text-xl font-semibold text-yellow-300">
          Premium
        </div>
      </div>
    </aside>
  )
}