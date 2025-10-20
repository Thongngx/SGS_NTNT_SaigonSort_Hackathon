export default function Overlay({ visible, title, subtitle, onClose }) {
  if (!visible) return null
  return (
    <div className="overlay">
      <div className="overlay-card">
        <div className="overlay-title">{title}</div>
        {subtitle && <div className="overlay-sub">{subtitle}</div>}
        {onClose && (
          <button className="btn" onClick={onClose}>
            Continue
          </button>
        )}
      </div>
    </div>
  )
}

