export default function PollutionBar({ value = 0, drainAt = 50, max = 100 }) {
  const pct = Math.max(0, Math.min(100, value))
  const danger = pct >= 80
  const warn = pct >= drainAt && pct < 80
  return (
    <div className="relative">
      <div className="text-xs text-slate-500 mb-1">Pollution</div>
      <div className={`w-full h-4 rounded-full border ${danger ? 'border-red-300' : warn ? 'border-amber-300' : 'border-slate-200'} bg-slate-100 overflow-hidden`}> 
        <div className={`h-full transition-all duration-300 ${danger ? 'bg-gradient-to-r from-amber-400 to-rose-500' : 'bg-gradient-to-r from-emerald-400 to-amber-300'}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="relative text-[10px] text-slate-500">
        <span className="absolute -top-0.5 -translate-x-1/2" style={{ left: `${drainAt}%` }}>| {drainAt}%</span>
        <span className="absolute -top-0.5 -translate-x-1/2" style={{ left: `100%` }}>| 100%</span>
      </div>
    </div>
  )
}
