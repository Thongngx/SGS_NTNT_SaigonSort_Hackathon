export default function Menu({ seedMode, setSeedMode, customSeed, setCustomSeed, seedPreview, bestScore, onPlay, onHow, onWhy }) {
  return (
    <div className="menu">
      <h1>Saigon Sort</h1>
      <p className="subtitle">Sort smart. Keep the streets flowing.</p>

      <div className="card settings">
        <div className="settings-row">
          <label>Seed:</label>
          <div className="seg">
            <button className={`seg-btn ${seedMode === 'daily' ? 'active' : ''}`} onClick={() => setSeedMode('daily')}>Daily</button>
            <button className={`seg-btn ${seedMode === 'random' ? 'active' : ''}`} onClick={() => setSeedMode('random')}>Random</button>
            <button className={`seg-btn ${seedMode === 'custom' ? 'active' : ''}`} onClick={() => setSeedMode('custom')}>Custom</button>
          </div>
        </div>
        {seedMode === 'custom' && (
          <div className="settings-row">
            <input
              className="input"
              placeholder="Enter a seed string"
              value={customSeed}
              onChange={(e) => setCustomSeed(e.target.value)}
            />
          </div>
        )}
        <div className="settings-row"><small>Seed preview: <code>{seedPreview}</code></small></div>
      </div>

      <div className="menu-actions">
        <button className="btn primary" onClick={onPlay}>▶ Play</button>
        <button className="btn" onClick={onHow}>ℹ How to Play</button>
        <button className="btn" onClick={onWhy}>💧 Why Sort?</button>
      </div>

      <div className="footer">
        <div>Best Score: <strong>{bestScore}</strong></div>
      </div>
    </div>
  )
}

