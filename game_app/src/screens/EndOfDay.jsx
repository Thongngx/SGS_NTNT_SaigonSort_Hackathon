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

  const btn = 'inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-300 bg-white text-slate-900 shadow-sm hover:bg-slate-50'
  const btnPrimary = 'inline-flex items-center justify-center px-4 py-2 rounded-md border border-blue-600 bg-blue-600 text-white shadow-sm hover:bg-blue-700'
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">{summary?.gameOver ? 'Street Flooded!' : `End of Day ${day}`}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
        <div className="border border-slate-200 rounded-xl p-3 bg-white shadow-sm">
          <div className="font-semibold mb-2">This Day</div>
          <div>Score: <strong>+{summary?.scoreDelta || 0}</strong></div>
          <div>Trust: <strong>+{summary?.trustDelta || 0}</strong></div>
          <div>Pollution: <strong>{summary?.pollution || 0}%</strong></div>
        </div>
        <div className="border border-slate-200 rounded-xl p-3 bg-white shadow-sm">
          <div className="font-semibold mb-2">Totals</div>
          <div>Score: <strong>{totals?.score || 0}</strong></div>
          <div>Trust: <strong>{totals?.trust || 0}</strong></div>
          <div>Day: <strong>{day}</strong></div>
        </div>
      </div>

      <div className="text-sky-700 mb-3">💡 {tip}</div>

      {summary?.gameOver ? (
        <div className="flex gap-2 justify-center">
          <button className={btn} onClick={onMenu}>Menu</button>
          <button className={btnPrimary} onClick={onRetry}>Retry</button>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">Choose an upgrade</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {choices.map((u) => (
              <button key={u.id} className="text-left border border-slate-200 rounded-xl p-3 bg-white shadow-sm hover:bg-slate-50" onClick={() => onNextDay(u.id)}>
                <div className="font-semibold">{u.name}</div>
                <div className="text-slate-600 text-sm">{u.desc}</div>
                <div className="text-emerald-700 text-sm">Lv. {(upgrades[u.id] || 0) + 1}</div>
              </button>
            ))}
          </div>
          <div className="flex justify-center mt-3">
            <button className={btn} onClick={() => onNextDay(null)}>Skip Upgrade</button>
          </div>
        </>
      )}
    </div>
  )
}
