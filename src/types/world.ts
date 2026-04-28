import * as THREE from 'three'

export type SectionId = 'none' | 'projects' | 'about' | 'contact'

export type TriggerDef = {
  id: Exclude<SectionId, 'none'>
  center: THREE.Vector3
  radius: number
  label: string
}