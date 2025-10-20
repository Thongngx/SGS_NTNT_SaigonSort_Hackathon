import { useEffect, useMemo, useRef, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import TrashItem from '../components/TrashItem.jsx'
import Bin from '../components/Bin.jsx'
import { BIN_TYPES, applyUpgradesToConfig } from '../state/gameConfig.js'
import { makeItem } from '../data/items.js'

export default function Game({ day, rng, upgrades, onEndOfDay, onExitToMenu }) {
  const cfg = useMemo(() => applyUpgradesToConfig(upgrades, day), [upgrades, day])
  const [timeLeft, setTimeLeft] = useState(cfg.dayDurationSec)
  const [score, setScore] = useState(0)
  const [trust, setTrust] = useState(0)
  const [pollution, setPollution] = useState(0)
  const [items, setItems] = useState([])
  const [drainShown, setDrainShown] = useState(false)
  const [banner, setBanner] = useState(null)
  const [paused, setPaused] = useState(false)

  const idRef = useRef(1)
  const timers = useRef({})
  const endedRef = useRef(false)
  const endAtRef = useRef(Date.now() + cfg.dayDurationSec * 1000)
  const itemsCountRef = useRef(0)
  const pauseStartRef = useRef(null)
  const scoreRef = useRef(0)
  const trustRef = useRef(0)
  const pollutionRef = useRef(0)

  // Countdown timer
  useEffect(() => {
    endAtRef.current = Date.now() + cfg.dayDurationSec * 1000
    const iv = setInterval(() => {
      if (paused) return
      const now = Date.now()
      const left = Math.max(0, Math.ceil((endAtRef.current - now) / 1000))
      setTimeLeft(left)
      if (now >= endAtRef.current) {
        clearInterval(iv)
        endDay(false)
      }
    }, 250)
    return () => clearInterval(iv)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, paused])

  // Spawn loop using recursive timeouts for variability
  useEffect(() => {
    let cancelled = false
    function scheduleNext() {
      if (paused) return
      const delay = rng.range(cfg.spawnIntervalMinSec * 1000, cfg.spawnIntervalMaxSec * 1000)
      timers.current.spawn = setTimeout(() => {
        if (cancelled || endedRef.current || paused) return
        spawnItem()
        scheduleNext()
      }, delay)
    }
    scheduleNext()
    return () => {
      cancelled = true
      clearTimeout(timers.current.spawn)
    }
  }, [cfg.spawnIntervalMinSec, cfg.spawnIntervalMaxSec, rng, paused])

  function spawnItem() {
    if (itemsCountRef.current >= 5) return
    const id = idRef.current++
    const item = makeItem(id, rng)
    const expiresAt = Date.now() + cfg.itemLifetimeSec * 1000
    setItems((prev) => [...prev, { item, expiresAt }])
    // expire handling
    const to = setTimeout(() => expireItem(id), cfg.itemLifetimeSec * 1000 + 50)
    timers.current[`expire-${id}`] = to
  }

  function expireItem(id) {
    setItems((prev) => prev.filter((it) => it.item.id !== id))
    adjustScore({ correct: false, expired: true })
  }

  function adjustScore({ correct, expired }) {
    if (endedRef.current) return
    if (correct) {
      setScore((s) => s + cfg.pointsCorrect)
      setTrust((t) => t + cfg.trustPerCorrect)
    } else {
      setScore((s) => s + cfg.pointsWrong)
      setPollution((p) => {
        const np = Math.min(100, p + cfg.pollutionPerWrong)
        if (!drainShown && np >= cfg.pollutionDrainEventAt && np < cfg.pollutionGameOverAt) {
          setDrainShown(true)
          setBanner('Drain Clogged! Pollution is rising.')
          setTimeout(() => setBanner(null), 3000)
        }
        if (np >= cfg.pollutionGameOverAt) {
          const nextScore = (scoreRef.current || 0) + cfg.pointsWrong
          endDay(true, np, nextScore, trustRef.current || 0)
        }
        return np
      })
    }
  }

  function handleDrop(binType, data) {
    // Remove item
    setItems((prev) => prev.filter((it) => it.item.id !== data.id))
    const key = `expire-${data.id}`
    clearTimeout(timers.current[key])
    const correct = binType === data.type
    adjustScore({ correct, expired: false })
  }

  function endDay(gameOver, overridePollution = null, overrideScore = null, overrideTrust = null) {
    if (endedRef.current) return
    endedRef.current = true
    // clear timers
    Object.values(timers.current).forEach((to) => clearTimeout(to))
    timers.current = {}
    // compute deltas
    const summary = {
      scoreDelta: overrideScore != null ? overrideScore : scoreRef.current,
      trustDelta: overrideTrust != null ? overrideTrust : trustRef.current,
      pollution: overridePollution != null ? overridePollution : pollutionRef.current,
      gameOver: !!gameOver,
    }
    onEndOfDay(summary)
  }

  // Track current item count in a ref for spawn cap
  useEffect(() => {
    itemsCountRef.current = items.length
  }, [items])

  // Keep refs in sync for end-of-day summary
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { trustRef.current = trust }, [trust])
  useEffect(() => { pollutionRef.current = pollution }, [pollution])

  // Pause / Resume
  const togglePause = () => {
    if (paused) {
      // resume
      const pausedFor = Date.now() - (pauseStartRef.current || Date.now())
      endAtRef.current += pausedFor
      setItems((prev) => {
        const updated = prev.map((it) => ({ ...it, expiresAt: it.expiresAt + pausedFor }))
        // reschedule expirations
        updated.forEach(({ item, expiresAt }) => {
          const key = `expire-${item.id}`
          clearTimeout(timers.current[key])
          const delay = Math.max(0, expiresAt - Date.now()) + 20
          timers.current[key] = setTimeout(() => expireItem(item.id), delay)
        })
        return updated
      })
      setPaused(false)
    } else {
      // pause
      pauseStartRef.current = Date.now()
      setPaused(true)
      // clear scheduled spawn/expiry timers; they will be rescheduled on resume
      Object.keys(timers.current).forEach((k) => clearTimeout(timers.current[k]))
      timers.current = {}
    }
  }

  return (
    <div className="relative">
      {banner && (
        <div className="fixed top-0 left-0 right-0 z-40 animate-slide-down">
          <div className="mx-auto max-w-5xl">
            <div className="m-2 rounded-md border border-amber-300 bg-amber-100 text-amber-900 text-sm text-center px-3 py-2 shadow pointer-events-none">
              {banner}
            </div>
          </div>
        </div>
      )}
      <TopBar
        day={day}
        score={score}
        trust={trust}
        pollution={pollution}
        drainAt={cfg.pollutionDrainEventAt}
        timeLeft={timeLeft}
        paused={paused}
        onTogglePause={togglePause}
      />

      <div className="border border-slate-300 rounded-xl p-3 bg-white w-[360px] h-[520px] sm:w-[640px] sm:h-[520px] md:w-[800px] md:h-[540px] lg:w-[900px] lg:h-[560px] shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 justify-items-center items-start p-2 overflow-hidden h-[64%]">
          {items.map(({ item, expiresAt }) => (
            <TrashItem key={item.id} item={item} expiresAt={expiresAt} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-3 h-[36%]">
          {BIN_TYPES.map((b) => (
            <Bin key={b.id} type={b.id} label={b.label} examples={b.examples} onDrop={handleDrop} />
          ))}
        </div>
      </div>

      {paused && (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
          <div className="w-[90%] max-w-md rounded-xl border border-slate-300 bg-white p-4 shadow-lg">
            <div className="text-xl font-semibold mb-2">Paused</div>
            <div className="text-slate-600 mb-4">Take a breather. Streets can wait a moment.</div>
            <div className="flex gap-2 justify-end">
              <button className="px-3 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50" onClick={togglePause}>Resume</button>
              <button className="px-3 py-2 rounded-md border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100" onClick={onExitToMenu}>Menu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
