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

  return (
    <div className={`bin bin-${type}`} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="bin-label">{label}</div>
    </div>
  )
}

