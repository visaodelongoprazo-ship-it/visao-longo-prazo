type Props = {
  title: string
  value: string
  description?: string
  children?: React.ReactNode
}

export default function ValuationCard({
  title,
  value,
  description,
  children,
}: Props) {
  return (
    <div className="rounded-[28px] border border-slate-300 bg-[#f3f4f6] p-5">
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>

      {children && (
        <div className="mb-4 rounded-2xl border border-slate-300 bg-white p-5">
          {children}
        </div>
      )}

      <div className="rounded-2xl border border-slate-300 bg-white p-5">
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <div className="mt-2 text-sm text-slate-500">
            {description}
          </div>
        )}
      </div>
    </div>
  )
}