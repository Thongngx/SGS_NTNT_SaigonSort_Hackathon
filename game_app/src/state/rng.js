// Simple seeded RNG helpers for replayability
// String -> 32-bit seed hash
function xmur3(str) {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return h >>> 0
  }
}

// 32-bit seed -> [0,1) PRNG
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function createRNG(seedInput) {
  const seedFn = xmur3(String(seedInput))
  const rand = mulberry32(seedFn())
  const api = {
    random: () => rand(),
    int: (n) => Math.floor(rand() * n),
    range: (min, max) => min + rand() * (max - min),
    pick: (arr) => arr[Math.floor(rand() * arr.length)],
  }
  return api
}

export function dailySeed() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `daily-${y}-${m}-${day}`
}

