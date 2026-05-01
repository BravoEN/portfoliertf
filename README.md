# Portfolio (Three.js + React Three Fiber)

This project is a small 3D engine built with React Three Fiber: a click-to-move player on a flat plane, in-scene trigger zones, and a minimal global store (Zustand) that records section activation.


## Tech Stack

- Vite + React + TypeScript
- three
- @react-three/fiber
- @react-three/drei
- zustand

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## Project Structure


```
├─ index.html                    # Vite HTML entry
├─ package.json                  # scripts and dependencies
├─ vite.config.ts                # Vite configuration (React plugin)
├─ eslint.config.js              # ESLint config
├─ tsconfig.app.json             # TypeScript app config
├─ tsconfig.node.json            # TypeScript node config
├─ public/                       # Static files copied to build output
└─ src/
  ├─ main.tsx                   # app bootstrap, mounts `App`
  ├─ App.tsx                    # top-level component composing the game
  ├─ styles.css                 # global styles (game-shell)
  ├─ scene/                     # 3D scene components
  │  ├─ WorldCanvas.tsx         # creates Canvas, lights, env, children
  │  ├─ Ground.tsx              # visual ground + invisible click plane
  │  ├─ Player.tsx              # player mesh, movement & facing logic
  │  └─ Triggers.tsx            # trigger definitions and in-scene markers
  ├─ store/
  │  └─ worldStore.ts           # Zustand store: player, target, activeSection
  ├─ types/
     └─ world.ts                # SectionId and TriggerDef types
``` 
