# Saigon Sort - Vibe Coding: Play to Impact (Challenge 3)
Saigon Sort is a 2D browser game about plastic waste and urban flooding in Ho Chi Minh City. Sort items into the correct bins to earn points and community trust, keep pollution down, and survive as many days as you can. The game emphasizes simple, replayable mechanics that connect directly to a real social issue.

### Features
- Drag-and-drop sorting with four bins: Recycle, Compost, Landfill, E‑waste
- Live pollution meter with events: Drain Clogged at 50%, Street Flooded at 100%
- Day progression with upgrade choices after each day
- Seeded RNG (Daily/Random/Custom) for replayable runs
- Pause/resume and exit to menu mid-run
- High scores saved in localStorage (top 5 table in-app)
- Guide with How to Play, stats explanations, and item dictionary
- Light theme UI with Tailwind and responsive layout

### Screens
- Menu: Main menu as the player enters the game
- Guide: How to play, stats, item dictionary by bin
- Why Sort: Brief educational context on waste sorting and flooding
- Game: Top bar with stats, pollution, timer; playfield with items and bins
- End of Day: Summary + upgrade selection, or Game Over
- High Scores: Persistent top 5 table (N/A rows if empty)

### Gameplay
- Drag each item to its correct bin before it expires.
- Correct: +points and +community trust
- Wrong/expired: −points and +pollution
- At 50% pollution: Drain Clogged banner appears
- At 100% pollution: Street Flooded → Game Over
- After each day: choose one upgrade; the next day gets a little faster

Stats
- Score: total points from correct sorting minus penalties
- Community Trust: increases with correct sorting
- Pollution: increases with mistakes; events at 50% and 100%
- Timer: day countdown; items also have individual expiry timers
- Day: progression with scaling difficulty

Bins with examples
- Recycle: Bottles, cans, paper, cardboard
- Compost: Food scraps, peels, coffee grounds
- Landfill: Dirty tissue, chip packets, styrofoam
- E‑waste: Batteries, chargers, small electronics

### Run Locally
Prerequisites
- [npm](https://www.npmjs.com/)

Install and start
- `cd ./game_submission/game_app`
- npm install
- npm run dev
- Open the printed local URL in your browser

Build and preview
- npm run build
- npm run preview

Notes
- Background image: place your background at `game_app/public/sg-background.jpeg` (already referenced by CSS).
- High scores and best score are stored in localStorage under keys `saigonsort_highscores` and `saigonsort_best`.

### Tech Stack
- React 19 + Vite 7
- Tailwind CSS (`@tailwindcss/vite` plugin)
- LocalStorage for persistence

### Project Structure

- `prompts/`: ideation and concept prompts
- `game_app/`: Vite React project
  - public/sg-background.jpeg: game background image
  - src/screens/: Menu, Guide, WhySort, Game, EndOfDay, HighScores
  - src/components/: TopBar, PollutionBar, Bin, TrashItem, Overlay (unused)
  - src/state/: rng, gameConfig (tuning + upgrades), useLocalStorage
  - src/data/: items (catalog), tips (educational snippets)

Key files
- game_app/src/state/gameConfig.js: tuning, bin labels, upgrade effects, day scaling
- game_app/src/state/rng.js: daily/custom seeds and deterministic RNG
- game_app/src/screens/Game.jsx: main loop, timers, banner events, pause/resume

### Replayability & Tuning
- Seeds: choose Daily, Random, or Custom on the Menu
- Day scaling: each day spawns faster and items expire a bit sooner (applied after upgrades)
- Item cap: max 5 simultaneous items on screen for clarity

Adjust values in `game_app/src/state/gameConfig.js`:
- `spawnIntervalMinSec`, `spawnIntervalMaxSec`
- `itemLifetimeSec`, points and pollution values
- Upgrade multipliers and day-based scaling

### Acknowledgements
- Built for RMIT GenAI & Cybersecurity Hackathon 2025 — Challenge 3: Vibe Coding
- Social issue focus: Urban waste sorting and flood prevention in Ho Chi Minh City
