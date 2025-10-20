export default function HighScores({ scores = [], onBack }) {
  const sorted = [...(scores || [])].sort((a, b) => b.score - a.score || (b.when || 0) - (a.when || 0))
  const top5 = Array.from({ length: 5 }).map((_, i) => sorted[i] || null)
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-3">High Scores</h2>
      <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Rank</th>
              <th className="text-left px-4 py-2 font-medium">Score</th>
              <th className="text-left px-4 py-2 font-medium">Day</th>
              <th className="text-left px-4 py-2 font-medium">When</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {top5.map((s, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="px-4 py-2 tabular-nums">{idx + 1}</td>
                <td className="px-4 py-2 tabular-nums">{s ? s.score : '-'}</td>
                <td className="px-4 py-2 tabular-nums">{s ? s.day : '-'}</td>
                <td className="px-4 py-2">{s ? new Date(s.when).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex justify-center">
        <button className="px-4 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50" onClick={onBack}>← Return to Menu</button>
      </div>
    </div>
  )
}
