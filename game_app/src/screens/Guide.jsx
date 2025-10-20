import { ITEMS } from '../data/items.js'
import { BIN_TYPES } from '../state/gameConfig.js'

export default function Guide({ onBack }) {
  const grouped = BIN_TYPES.map((bin) => ({
    bin,
    items: ITEMS.filter((it) => it.type === bin.id),
  }))
  const statRow = (name, desc) => (
    <div className="border border-slate-200 rounded-lg p-3 bg-white">
      <div className="font-semibold text-slate-900">{name}</div>
      <div className="text-slate-600 text-sm">{desc}</div>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-3">Game Guide</h2>

      <section className="mb-4">
        <h3 className="text-lg font-semibold mb-2">How to Play</h3>
        <ul className="list-disc ml-6 space-y-1 text-slate-700">
          <li>Drag items to the correct bin: Recycle, Compost, Landfill, or E-waste.</li>
          <li>Correct sorting increases your Score and Community Trust.</li>
          <li>Wrong or expired items increase Pollution. At 50% drains clog; at 100% the street floods and the run ends.</li>
          <li>Finish the day and choose an upgrade to continue.</li>
          <li>Use Daily or Custom seeds for repeatable runs.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Stats</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {statRow('Score', 'Earned for correct sorting; lose some for mistakes.')}
          {statRow('Community Trust', 'Increases with correct sorting; represents community confidence.')}
          {statRow('Pollution', 'Increases with mistakes. At 50% drains clog, at 100% the run ends.')}
          {statRow('Timer', 'Each day has a time limit; items also expire individually.')}
          {statRow('Day', 'Progress through days, taking upgrades to get stronger and cleaner.')}
        </div>
      </section>

      <section className="mb-2">
        <h3 className="text-lg font-semibold mb-2">Item Dictionary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {grouped.map(({ bin, items }) => (
            <div key={bin.id} className="border border-slate-200 rounded-xl p-3 bg-white shadow-sm">
              <div className="font-semibold mb-1">{bin.label}</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {items.map((it) => (
                  <li key={it.name} className="flex items-center gap-2 text-slate-700">
                    <span className="text-lg">{it.emoji}</span>
                    <span className="text-sm">{it.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-3 flex justify-center">
        <button
          className="inline-flex items-center px-4 py-2 rounded-md border border-slate-300 bg-white text-slate-900 shadow-sm hover:bg-slate-50"
          onClick={onBack}
        >
          ← Back
        </button>
      </div>
    </div>
  )
}

