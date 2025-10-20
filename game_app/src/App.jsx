import { useMemo, useState } from 'react'
// Tailwind styles are provided via index.css

import Menu from './screens/Menu.jsx'
import HowTo from './screens/HowTo.jsx'
import WhySort from './screens/WhySort.jsx'
import Guide from './screens/Guide.jsx'
import Game from './screens/Game.jsx'
import EndOfDay from './screens/EndOfDay.jsx'
import { createRNG, dailySeed } from './state/rng.js'
import useLocalStorage from './state/useLocalStorage.js'

function App() {
  const [screen, setScreen] = useState('menu') // menu | how | guide | why | game | end
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
  const [lastSummary, setLastSummary] = useState(null)

  const startGame = () => {
    setDay(1)
    setUpgrades({})
    setTotals({ score: 0, trust: 0 })
    setScreen('game')
  }

  const handleEndOfDay = (summary) => {
    // summary: { scoreDelta, trustDelta, pollution, gameOver }
    const nextTotals = {
      score: totals.score + (summary?.scoreDelta || 0),
      trust: totals.trust + (summary?.trustDelta || 0),
    }
    setTotals(nextTotals)
    if (nextTotals.score > bestScore) setBestScore(nextTotals.score)
    setLastSummary({ ...summary, totals: nextTotals, day })
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
    </div>
  )
}

export default App
