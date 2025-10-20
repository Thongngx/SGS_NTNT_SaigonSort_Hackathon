export default function Bin({ type, label, examples, onDrop }) {
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    try {
      const payload = e.dataTransfer.getData('application/x-item')
      if (!payload) return
      const data = JSON.parse(payload)
      onDrop?.(type, data)
    } catch {
      // ignore
    }
  }

  const color =
    type === 'recycle' ? 'border-cyan-300' :
    type === 'compost' ? 'border-emerald-300' :
    type === 'landfill' ? 'border-slate-300' :
    'border-rose-300'
  return (
    <div
      className={`rounded-xl border-2 ${color} bg-white text-center min-h-16 p-2 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-transform hover:-translate-y-0.5`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="font-semibold text-slate-800 leading-tight text-sm">{label}</div>
      {examples && <div className="text-[10px] text-slate-500 leading-snug">{examples}</div>}
    </div>
  )
}
