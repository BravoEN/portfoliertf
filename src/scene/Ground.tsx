import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { useWorldStore } from '../store/worldStore.ts'

export default function Ground() {
  const setTarget = useWorldStore((state) => state.setTarget)
  const clickPlaneRef = useRef<THREE.Mesh>(null!)
  const gridColor = useMemo(() => new THREE.Color('#6f7f8d'), [])

  const onPlaneClick = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    const point = event.point.clone()
    point.y = 0
    setTarget(point)
  }

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#d9e3ea" />
      </mesh>

      <gridHelper args={[60, 60, gridColor, gridColor]} position={[0, 0.01, 0]} />

      <mesh
        ref={clickPlaneRef}
        rotation-x={-Math.PI / 2}
        position={[0, 0.02, 0]}
        onPointerDown={onPlaneClick}
        visible={false}
      >
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  )
}