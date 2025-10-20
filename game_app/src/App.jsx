import { useEffect, useMemo, useState } from 'react'
// Tailwind styles are provided via index.css

import Menu from './screens/Menu.jsx'
import HowTo from './screens/HowTo.jsx'
import WhySort from './screens/WhySort.jsx'
import Guide from './screens/Guide.jsx'
import Game from './screens/Game.jsx'
import EndOfDay from './screens/EndOfDay.jsx'
import HighScores from './screens/HighScores.jsx'
import { createRNG, dailySeed } from './state/rng.js'
import useLocalStorage from './state/useLocalStorage.js'

function App() {
  const [screen, setScreen] = useState('menu') // menu | how | guide | why | scores | game | end
  const [seedMode, setSeedMode] = useState('daily') // daily | random | custom
  const [customSeed, setCustomSeed] = useState('')
  const resolvedSeed = useMemo(() => {
    if (seedMode === 'daily') return dailySeed()
    if (seedMode === 'random') return Math.random().toString(36).slice(2)
    return customSeed || dailySeed()
  }, [seedMode, customSeed])

  const rng = useMemo(() => createRNG(resolvedSeed), [resolvedSeed])

  const [day, setDay] = useState(1)
  const [upgrades, setUpgrades] = useState({})
  const [totals, setTotals] = useState({ score: 0, trust: 0 })
  const [bestScore, setBestScore] = useLocalStorage('saigonsort_best', 0)
  const [highscores, setHighscores] = useLocalStorage('saigonsort_highscores', [])
  const [lastSummary, setLastSummary] = useState(null)

  const startGame = () => {
    setDay(1)
    setUpgrades({})
    setTotals({ score: 0, trust: 0 })
    setScreen('game')
  }

  // Optional: support external event to open scores (backward-compatible)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handler = () => setScreen('scores')
    window.addEventListener('open-scores', handler)
    return () => window.removeEventListener('open-scores', handler)
  }, [])

  const handleEndOfDay = (summary) => {
    // summary: { scoreDelta, trustDelta, pollution, gameOver }
    const nextTotals = {
      score: totals.score + (summary?.scoreDelta || 0),
      trust: totals.trust + (summary?.trustDelta || 0),
    }
    setTotals(nextTotals)
    if (nextTotals.score > bestScore) setBestScore(nextTotals.score)
    setLastSummary({ ...summary, totals: nextTotals, day })
    if (summary?.gameOver) {
      const entry = { score: nextTotals.score, trust: nextTotals.trust, day, when: Date.now() }
      setHighscores((arr) => {
        const next = [...(arr || []), entry]
        next.sort((a, b) => b.score - a.score || (b.when || 0) - (a.when || 0))
        return next.slice(0, 20)
      })
    }
    setScreen('end')
  }

  const proceedNextDay = (chosenUpgrade = null) => {
    if (chosenUpgrade) {
      setUpgrades((u) => ({ ...u, [chosenUpgrade]: (u[chosenUpgrade] || 0) + 1 }))
    }
    setDay((d) => d + 1)
    setScreen('game')
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen p-4 md:p-6">
      {screen === 'menu' && (
        <div className="grid min-h-[calc(100vh-4rem)] place-items-center">
          <Menu
            seedMode={seedMode}
            setSeedMode={setSeedMode}
            customSeed={customSeed}
            setCustomSeed={setCustomSeed}
            seedPreview={resolvedSeed}
            bestScore={bestScore}
            onPlay={startGame}
            onHow={() => setScreen('how')}
            onGuide={() => setScreen('guide')}
            onScores={() => setScreen('scores')}
            onWhy={() => setScreen('why')}
          />
        </div>
      )}

      {screen === 'how' && <HowTo onBack={() => setScreen('menu')} />}

      {screen === 'guide' && <Guide onBack={() => setScreen('menu')} />}

      {screen === 'why' && <WhySort onBack={() => setScreen('menu')} />}

      {screen === 'game' && (
        <div className="grid min-h-[calc(100vh-4rem)] place-items-center">
          <Game
            day={day}
            rng={rng}
            upgrades={upgrades}
            onEndOfDay={handleEndOfDay}
            onExitToMenu={() => setScreen('menu')}
          />
        </div>
      )}

      {screen === 'end' && (
        <EndOfDay
          day={day}
          summary={lastSummary}
          totals={totals}
          upgrades={upgrades}
          rng={rng}
          onMenu={() => setScreen('menu')}
          onRetry={startGame}
          onNextDay={proceedNextDay}
        />
      )}

      {screen === 'scores' && (
        <div className="grid min-h-[calc(100vh-4rem)] place-items-center">
          <HighScores scores={highscores} onBack={() => setScreen('menu')} />
        </div>
      )}
    </div>
  )
}

export default App
