export const BIN_TYPES = [
  { id: 'recycle', label: 'Recycle', examples: 'Bottles, cans, paper, cardboard' },
  { id: 'compost', label: 'Compost', examples: 'Food scraps, peels, coffee grounds' },
  { id: 'landfill', label: 'Landfill', examples: 'Dirty tissue, chip packets, styrofoam' },
  { id: 'ewaste', label: 'E-waste', examples: 'Batteries, chargers, small electronics' },
]

export const BASE_CONFIG = {
  dayDurationSec: 60,
  itemLifetimeSec: 12,
  spawnIntervalMinSec: 1.2,
  spawnIntervalMaxSec: 2.6,
  pointsCorrect: 10,
  pointsWrong: -5,
  trustPerCorrect: 1,
  pollutionPerWrong: 5,
  pollutionDrainEventAt: 50,
  pollutionGameOverAt: 100,
}

// upgrades is a map { upgradeId: level }
export function applyUpgradesToConfig(upgrades, day = 1) {
  const u = upgrades || {}
  const cfg = { ...BASE_CONFIG }

  if (u.betterBins) {
    cfg.pointsCorrect += 3 * u.betterBins
  }
  if (u.clearerSigns) {
    cfg.itemLifetimeSec += 3 * u.clearerSigns
  }
  if (u.communityHelp) {
    cfg.pollutionPerWrong = Math.max(2, cfg.pollutionPerWrong - 1 * u.communityHelp)
  }
  if (u.slowerFlow) {
    cfg.spawnIntervalMinSec += 0.2 * u.slowerFlow
    cfg.spawnIntervalMaxSec += 0.3 * u.slowerFlow
  }
  if (u.neighborhoodPride) {
    cfg.trustPerCorrect += 1 * u.neighborhoodPride
  }
  // Day-based difficulty scaling applied AFTER upgrades so it always speeds up
  const d = Math.max(1, day)
  const speedFactor = Math.max(0.6, 1 - 0.08 * (d - 1)) // up to 40% faster
  const lifetimeFactor = Math.max(0.75, 1 - 0.05 * (d - 1)) // up to 25% shorter lifetime
  cfg.spawnIntervalMinSec *= speedFactor
  cfg.spawnIntervalMaxSec *= speedFactor
  cfg.itemLifetimeSec *= lifetimeFactor
  return cfg
}

export const ALL_UPGRADES = [
  {
    id: 'betterBins',
    name: 'Better Bins',
    desc: '+3 points per correct sort.',
  },
  {
    id: 'clearerSigns',
    name: 'Clearer Signs',
    desc: '+3s before trash expires.',
  },
  {
    id: 'communityHelp',
    name: 'Community Help',
    desc: '-1 pollution on mistakes.',
  },
  {
    id: 'slowerFlow',
    name: 'Slower Trash Flow',
    desc: 'Trash spawns a bit slower.',
  },
  {
    id: 'neighborhoodPride',
    name: 'Neighborhood Pride',
    desc: '+1 trust per correct.',
  },
]
