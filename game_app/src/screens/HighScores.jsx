export default function HighScores({ scores = [], onBack }) {
  const items = [...scores]
    .sort((a, b) => b.score - a.score || (b.when || 0) - (a.when || 0))
    .slice(0, 10)
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">High Scores</h2>
      {items.length === 0 ? (
        <div className="text-slate-600">No scores yet. Play a run to add one!</div>
      ) : (
        <ol className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          {items.map((s, idx) => (
            <li key={`${s.when}-${idx}`} className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-3">
                <span className="w-6 text-right tabular-nums text-slate-500">{idx + 1}.</span>
                <span className="font-semibold tabular-nums">{s.score}</span>
              </div>
              <div className="text-sm text-slate-500">Day {s.day} · {new Date(s.when).toLocaleString()}</div>
            </li>
          ))}
        </ol>
      )}
      <div className="mt-3 flex justify-center">
        <button className="px-4 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50" onClick={onBack}>← Back</button>
      </div>
    </div>
  )
}

