import { useEffect, useMemo, useState } from 'react'

export default function TrashItem({ item, expiresAt }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const iv = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(iv)
  }, [])
  const timeLeft = useMemo(() => Math.max(0, Math.ceil((expiresAt - now) / 1000)), [expiresAt, now])
  const onDragStart = (e) => {
    e.dataTransfer.setData('application/x-item', JSON.stringify({ id: item.id, type: item.type }))
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      className="cursor-grab select-none rounded-xl border border-slate-200 bg-white px-4 py-3 w-40 shadow-sm hover:shadow transition transform hover:-translate-y-0.5 animate-pop"
      draggable
      onDragStart={onDragStart}
      title={`${item.name} (${timeLeft}s)`}
    >
      <div className="text-xl">{item.emoji}</div>
      <div className="text-sm text-slate-700">{item.name}</div>
      <div className="text-[10px] text-slate-500">⏱ {timeLeft}s</div>
    </div>
  )
}
