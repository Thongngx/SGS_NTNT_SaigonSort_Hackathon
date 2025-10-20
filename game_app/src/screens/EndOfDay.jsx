import { useMemo } from 'react'
import { ALL_UPGRADES } from '../state/gameConfig.js'
import { TIPS } from '../data/tips.js'

export default function EndOfDay({ day, summary, totals, upgrades, rng, onMenu, onRetry, onNextDay }) {
  const choices = useMemo(() => {
    // pick 3 upgrade choices, weighted toward those not yet chosen
    const pool = ALL_UPGRADES.flatMap((u) => {
      const level = upgrades[u.id] || 0
      const weight = level === 0 ? 3 : 1
      return Array.from({ length: weight }, () => u)
    })
    const pickOne = () => pool.splice(Math.floor(rng.random() * pool.length), 1)[0]
    const a = pickOne()
    const b = pickOne()
    const c = pickOne()
    return [a, b, c]
  }, [rng, upgrades])

  const tip = useMemo(() => TIPS[Math.floor(rng.random() * TIPS.length)], [rng])

  return (
    <div className="content">
      <h2>{summary?.gameOver ? 'Street Flooded!' : `End of Day ${day}`}</h2>
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-title">This Day</div>
          <div>Score: <strong>+{summary?.scoreDelta || 0}</strong></div>
          <div>Trust: <strong>+{summary?.trustDelta || 0}</strong></div>
          <div>Pollution: <strong>{summary?.pollution || 0}%</strong></div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Totals</div>
          <div>Score: <strong>{totals?.score || 0}</strong></div>
          <div>Trust: <strong>{totals?.trust || 0}</strong></div>
          <div>Day: <strong>{day}</strong></div>
        </div>
      </div>

      <div className="tip">💡 {tip}</div>

      {summary?.gameOver ? (
        <div className="actions">
          <button className="btn" onClick={onMenu}>Menu</button>
          <button className="btn primary" onClick={onRetry}>Retry</button>
        </div>
      ) : (
        <>
          <h3>Choose an upgrade</h3>
          <div className="upgrade-row">
            {choices.map((u) => (
              <button key={u.id} className="btn upgrade" onClick={() => onNextDay(u.id)}>
                <div className="upgrade-name">{u.name}</div>
                <div className="upgrade-desc">{u.desc}</div>
                <div className="upgrade-level">Lv. {(upgrades[u.id] || 0) + 1}</div>
              </button>
            ))}
          </div>
          <div className="actions">
            <button className="btn" onClick={() => onNextDay(null)}>Skip Upgrade</button>
          </div>
        </>
      )}
    </div>
  )
}

