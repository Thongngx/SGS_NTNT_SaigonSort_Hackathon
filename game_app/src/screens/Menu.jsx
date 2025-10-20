export default function Menu({ seedMode, setSeedMode, customSeed, setCustomSeed, seedPreview, bestScore, onPlay, onHow, onGuide, onScores, onWhy }) {
  const segBtn = (active) => `px-3 py-1.5 rounded-md border text-sm ${active ? 'bg-slate-100 border-slate-300' : 'bg-white border-slate-300 hover:bg-slate-50'}`
  const btn = 'inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-300 bg-white text-slate-900 shadow-sm hover:bg-slate-50'
  const btnPrimary = 'inline-flex items-center justify-center px-4 py-2 rounded-md border border-blue-600 bg-blue-600 text-white shadow-sm hover:bg-blue-700'
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-1">Saigon Sort</h1>
      <p className="text-slate-600 mb-4">Sort smart. Keep the streets flowing.</p>

      <div className="inline-block text-left border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <label className="text-sm text-slate-700">Seed:</label>
          <div className="inline-flex gap-2">
            <button className={segBtn(seedMode === 'daily')} onClick={() => setSeedMode('daily')}>Daily</button>
            <button className={segBtn(seedMode === 'random')} onClick={() => setSeedMode('random')}>Random</button>
            <button className={segBtn(seedMode === 'custom')} onClick={() => setSeedMode('custom')}>Custom</button>
          </div>
        </div>
        {seedMode === 'custom' && (
          <div className="mt-2">
            <input
              className="w-64 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a seed string"
              value={customSeed}
              onChange={(e) => setCustomSeed(e.target.value)}
            />
          </div>
        )}
        <div className="text-xs text-slate-500 mt-2">Seed preview: <code>{seedPreview}</code></div>
      </div>

      <div className="mt-4 flex gap-2 justify-center flex-wrap">
        <button className={btnPrimary} onClick={onPlay}>▶ Play</button>
        <button className={btn} onClick={onGuide}>📘 Guide</button>
        <button className={btn} onClick={onHow}>ℹ How to Play</button>
        <button className={btn} onClick={onWhy}>💧 Why Sort?</button>
        <button className={btn} onClick={onScores}>🏆 High Scores</button>
      </div>

      <div className="mt-3 text-slate-600">Best Score: <strong className="text-slate-900">{bestScore}</strong></div>
    </div>
  )
}
