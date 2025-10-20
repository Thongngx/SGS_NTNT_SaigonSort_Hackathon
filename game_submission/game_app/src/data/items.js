export const ITEMS = [
  { name: 'Plastic Bottle', type: 'recycle', emoji: '🧴' },
  { name: 'Aluminum Can', type: 'recycle', emoji: '🥫' },
  { name: 'Paper Bag', type: 'recycle', emoji: '🛍️' },
  { name: 'Cardboard', type: 'recycle', emoji: '📦' },
  { name: 'Glass Bottle', type: 'recycle', emoji: '🍶' },
  { name: 'Newspaper', type: 'recycle', emoji: '📰' },
  { name: 'Tin Foil (Clean)', type: 'recycle', emoji: '🧻' },
  { name: 'Milk Carton', type: 'recycle', emoji: '🥛' },

  { name: 'Banana Peel', type: 'compost', emoji: '🍌' },
  { name: 'Tea Leaves', type: 'compost', emoji: '🫖' },
  { name: 'Food Scraps', type: 'compost', emoji: '🍲' },
  { name: 'Coffee Grounds', type: 'compost', emoji: '☕' },
  { name: 'Apple Core', type: 'compost', emoji: '🍎' },
  { name: 'Leaf Pile', type: 'compost', emoji: '🍂' },
  { name: 'Eggshells', type: 'compost', emoji: '🥚' },

  { name: 'Battery', type: 'ewaste', emoji: '🔋' },
  { name: 'Phone Charger', type: 'ewaste', emoji: '🔌' },
  { name: 'Power Bank', type: 'ewaste', emoji: '🔋' },
  { name: 'Light Bulb', type: 'ewaste', emoji: '💡' },
  { name: 'Headphones', type: 'ewaste', emoji: '🎧' },
  { name: 'Remote Control', type: 'ewaste', emoji: '📺' },

  { name: 'Styrofoam Box', type: 'landfill', emoji: '📦' },
  { name: 'Chip Packet', type: 'landfill', emoji: '🍟' },
  { name: 'Plastic Straw', type: 'landfill', emoji: '🥤' },
  { name: 'Broken Ceramic', type: 'landfill', emoji: '🍽️' },
  { name: 'Dirty Tissue', type: 'landfill', emoji: '🧻' },
  { name: 'Toothbrush', type: 'landfill', emoji: '🪥' },
  { name: 'Greasy Pizza Box', type: 'landfill', emoji: '🍕' },
  { name: 'Snack Wrapper', type: 'landfill', emoji: '🍫' },
]

export function makeItem(id, rng) {
  const base = ITEMS[Math.floor(rng.random() * ITEMS.length)]
  return {
    id,
    name: base.name,
    type: base.type,
    emoji: base.emoji,
  }
}
