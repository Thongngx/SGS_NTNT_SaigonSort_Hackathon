import { useEffect, useMemo, useRef, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import TrashItem from '../components/TrashItem.jsx'
import Bin from '../components/Bin.jsx'
import Overlay from '../components/Overlay.jsx'
import { BIN_TYPES, applyUpgradesToConfig } from '../state/gameConfig.js'
import { makeItem } from '../data/items.js'

export default function Game({ day, rng, upgrades, onEndOfDay }) {
  const cfg = useMemo(() => applyUpgradesToConfig(upgrades), [upgrades])
  const [timeLeft, setTimeLeft] = useState(cfg.dayDurationSec)
  const [score, setScore] = useState(0)
  const [trust, setTrust] = useState(0)
  const [pollution, setPollution] = useState(0)
  const [items, setItems] = useState([])
  const [drainShown, setDrainShown] = useState(false)
  const [overlay, setOverlay] = useState(null)

  const idRef = useRef(1)
  const timers = useRef({})
  const endedRef = useRef(false)

  // Countdown timer
  useEffect(() => {
    const start = Date.now()
    const endAt = start + cfg.dayDurationSec * 1000
    const iv = setInterval(() => {
      const now = Date.now()
      const left = Math.max(0, Math.ceil((endAt - now) / 1000))
      setTimeLeft(left)
      if (now >= endAt) {
        clearInterval(iv)
        endDay(false)
      }
    }, 250)
    return () => clearInterval(iv)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day])

  // Spawn loop using recursive timeouts for variability
  useEffect(() => {
    let cancelled = false
    function scheduleNext() {
      const delay = rng.range(cfg.spawnIntervalMinSec * 1000, cfg.spawnIntervalMaxSec * 1000)
      timers.current.spawn = setTimeout(() => {
        if (cancelled || endedRef.current) return
        spawnItem()
        scheduleNext()
      }, delay)
    }
    scheduleNext()
    return () => {
      cancelled = true
      clearTimeout(timers.current.spawn)
    }
  }, [cfg.spawnIntervalMinSec, cfg.spawnIntervalMaxSec, rng])

  function spawnItem() {
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
          setOverlay({ title: 'Drain Clogged!', subtitle: 'Pollution is rising.' })
        }
        if (np >= cfg.pollutionGameOverAt) {
          endDay(true)
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

  function endDay(gameOver) {
    if (endedRef.current) return
    endedRef.current = true
    // clear timers
    Object.values(timers.current).forEach((to) => clearTimeout(to))
    timers.current = {}
    // compute deltas
    const summary = {
      scoreDelta: score,
      trustDelta: trust,
      pollution,
      gameOver: !!gameOver,
    }
    onEndOfDay(summary)
  }

  return (
    <div className="game">
      <TopBar day={day} score={score} trust={trust} pollution={pollution} drainAt={cfg.pollutionDrainEventAt} timeLeft={timeLeft} />

      <div className="playfield">
        <div className="spawn-area">
          {items.map(({ item, expiresAt }) => (
            <TrashItem key={item.id} item={item} expiresAt={expiresAt} />
          ))}
        </div>
        <div className="bins">
          {BIN_TYPES.map((b) => (
            <Bin key={b.id} type={b.id} label={b.label} onDrop={handleDrop} />
          ))}
        </div>
      </div>

      <Overlay
        visible={!!overlay}
        title={overlay?.title}
        subtitle={overlay?.subtitle}
        onClose={() => setOverlay(null)}
      />
    </div>
  )
}

