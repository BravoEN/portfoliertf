import * as THREE from 'three'
import { useMemo } from 'react'
import { Html } from '@react-three/drei'
import { useWorldStore } from '../store/worldStore.ts'
import type { TriggerDef } from '../types/world.ts'

export const useTriggerDefs = (): TriggerDef[] =>
  useMemo(
    () => [
      { id: 'projects', center: new THREE.Vector3(6, 0, 2), radius: 1.4, label: 'Projects' },
      { id: 'about', center: new THREE.Vector3(-4, 0, -2), radius: 1.3, label: 'About' },
      { id: 'contact', center: new THREE.Vector3(2, 0, -6), radius: 1.3, label: 'Contact' },
    ],
    [],
  )

export default function Triggers() {
  const activeSection = useWorldStore((state) => state.activeSection)
  const triggers = useTriggerDefs()

  return (
    <group>
      {triggers.map((trigger) => (
        <group key={trigger.id} position={trigger.center.toArray()}>
          <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.7, 24]} />
            <meshStandardMaterial color={activeSection === trigger.id ? '#ff8f3f' : '#3f7fff'} />
          </mesh>
          <Html distanceFactor={10} position={[0, 1.1, 0]} center>
            <div className="trigger-label">{trigger.label}</div>
          </Html>
        </group>
      ))}
    </group>
  )
}