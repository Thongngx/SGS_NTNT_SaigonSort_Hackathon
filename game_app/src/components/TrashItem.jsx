import { useMemo } from 'react'

export default function TrashItem({ item, expiresAt }) {
  const timeLeft = useMemo(() => Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000)), [expiresAt])
  const onDragStart = (e) => {
    e.dataTransfer.setData('application/x-item', JSON.stringify({ id: item.id, type: item.type }))
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className={`trash`} draggable onDragStart={onDragStart} title={`${item.name} (${timeLeft}s)`}>
      <div className="trash-emoji">{item.emoji}</div>
      <div className="trash-name">{item.name}</div>
    </div>
  )
}

