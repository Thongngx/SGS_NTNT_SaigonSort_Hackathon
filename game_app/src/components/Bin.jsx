export default function Bin({ type, label, onDrop }) {
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
      className={`rounded-xl border-2 ${color} bg-white text-center min-h-24 p-4 flex items-center justify-center shadow-sm`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="font-semibold text-slate-800">{label}</div>
    </div>
  )
}
