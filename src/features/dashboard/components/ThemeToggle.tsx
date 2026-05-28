type Props = {
  isDark: boolean
  toggleTheme: () => void
}

export default function ThemeToggle({ isDark, toggleTheme }: Props) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
    >
      {isDark ? "Modo claro" : "Modo escuro"}
    </button>
  )
}