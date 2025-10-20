export const BIN_TYPES = [
  { id: 'recycle', label: 'Recycle' },
  { id: 'compost', label: 'Compost' },
  { id: 'landfill', label: 'Landfill' },
  { id: 'ewaste', label: 'E-waste' },
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
export function applyUpgradesToConfig(upgrades) {
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
