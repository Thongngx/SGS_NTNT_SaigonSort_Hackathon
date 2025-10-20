import PollutionBar from './PollutionBar.jsx'

export default function TopBar({ day, score, trust, pollution, drainAt, timeLeft }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="stat"><span className="stat-label">Day</span> <span className="stat-value">{day}</span></div>
        <div className="stat"><span className="stat-label">Score</span> <span className="stat-value">{score}</span></div>
        <div className="stat"><span className="stat-label">Trust</span> <span className="stat-value">{trust}</span></div>
      </div>
      <div className="topbar-center">
        <PollutionBar value={pollution} drainAt={drainAt} />
      </div>
      <div className="topbar-right">
        <div className="timer">⏱ {Math.max(0, Math.ceil(timeLeft))}s</div>
      </div>
    </div>
  )
}

