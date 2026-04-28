import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useWorldStore } from '../store/worldStore.ts'
import { useTriggerDefs } from './Triggers.tsx'

function lerpAngle(from: number, to: number, amount: number): number {
  let delta = (to - from + Math.PI) % (Math.PI * 2) - Math.PI
  if (delta < -Math.PI) {
    delta += Math.PI * 2
  }
  return from + delta * amount
}

export default function Player() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const triggers = useTriggerDefs()
  const arriveThreshold = 0.12
  const turnSpeed = 8

  const tempDirection = useMemo(() => new THREE.Vector3(), [])
  const tempPosition = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    const {
      playerPosition,
      targetPosition,
      playerSpeed,
      setPlayerPosition,
      clearTarget,
      openSection,
      canTrigger,
      markTriggered,
    } = useWorldStore.getState()

    tempPosition.copy(playerPosition)

    if (targetPosition) {
      tempDirection.copy(targetPosition).sub(tempPosition)
      const distance = tempDirection.length()

      if (distance > arriveThreshold) {
        tempDirection.normalize()
        tempPosition.addScaledVector(tempDirection, playerSpeed * delta)

        const nextYaw = Math.atan2(tempDirection.x, tempDirection.z)
        meshRef.current.rotation.y = lerpAngle(
          meshRef.current.rotation.y,
          nextYaw,
          Math.min(1, turnSpeed * delta),
        )

        setPlayerPosition(tempPosition)
      } else {
        clearTarget()
      }
    }

    meshRef.current.position.copy(useWorldStore.getState().playerPosition)
    meshRef.current.position.y = 0.45

    for (const trigger of triggers) {
      const distanceToTrigger = useWorldStore.getState().playerPosition.distanceTo(trigger.center)
      if (distanceToTrigger <= trigger.radius && canTrigger()) {
        openSection(trigger.id)
        markTriggered()
        break
      }
    }
  })

  return (
    <mesh ref={meshRef} castShadow position={[0, 0.45, 0]}>
      <capsuleGeometry args={[0.28, 0.5, 4, 12]} />
      <meshStandardMaterial color="#1f2a44" />
    </mesh>
  )
}