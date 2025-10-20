import PollutionBar from './PollutionBar.jsx'

export default function TopBar({ day, score, trust, pollution, drainAt, timeLeft }) {
  const stat = (label, value) => (
    <div className="px-3 py-1.5 rounded-md border border-slate-200 bg-white shadow-sm text-sm">
      <span className="text-slate-500 mr-1">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  )
  return (
    <div className="grid grid-cols-3 items-center gap-3 mb-3">
      <div className="flex gap-2 items-center">{stat('Day', day)}{stat('Score', score)}{stat('Trust', trust)}</div>
      <div>
        <PollutionBar value={pollution} drainAt={drainAt} />
      </div>
      <div className="flex justify-end">
        <div className="px-3 py-1.5 rounded-md border border-slate-200 bg-white shadow-sm text-sm">⏱ {Math.max(0, Math.ceil(timeLeft))}s</div>
      </div>
    </div>
  )
}
