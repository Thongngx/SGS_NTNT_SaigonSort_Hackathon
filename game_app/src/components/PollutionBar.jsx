export default function PollutionBar({ value = 0, drainAt = 50, max = 100 }) {
  const pct = Math.max(0, Math.min(100, value))
  const danger = pct >= 80
  const warn = pct >= drainAt && pct < 80
  return (
    <div className="pollution">
      <div className="pollution-label">Pollution</div>
      <div className={`pollution-bar ${danger ? 'danger' : warn ? 'warn' : ''}`}>
        <div className="pollution-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="pollution-marks">
        <span style={{ left: `${drainAt}%` }}>| {drainAt}%</span>
        <span style={{ left: `100%` }}>| 100%</span>
      </div>
    </div>
  )
}

