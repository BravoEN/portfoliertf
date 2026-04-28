import { create } from 'zustand'
import * as THREE from 'three'
import type { SectionId } from '../types/world.ts'

type WorldState = {
  playerPosition: THREE.Vector3
  targetPosition: THREE.Vector3 | null
  playerSpeed: number
  activeSection: SectionId
  lastTriggerAt: number
  setTarget: (point: THREE.Vector3) => void
  setPlayerPosition: (point: THREE.Vector3) => void
  clearTarget: () => void
  openSection: (section: SectionId) => void
  canTrigger: () => boolean
  markTriggered: () => void
}

export const useWorldStore = create<WorldState>((set, get) => ({
  playerPosition: new THREE.Vector3(0, 0, 0),
  targetPosition: null,
  playerSpeed: 2.5,
  activeSection: 'none',
  lastTriggerAt: 0,

  setTarget: (point) => set({ targetPosition: point.clone() }),
  setPlayerPosition: (point) => set({ playerPosition: point.clone() }),
  clearTarget: () => set({ targetPosition: null }),
  openSection: (section) => {
    // Cooldown so it doesn't open immediately
    if (section === 'none') {
      set({ activeSection: section, lastTriggerAt: Date.now() })
    } else {
      set({ activeSection: section })
    }
  },
  canTrigger: () => Date.now() - get().lastTriggerAt > 3000, // 3 second cooldown
  markTriggered: () => set({ lastTriggerAt: Date.now() }),
}))