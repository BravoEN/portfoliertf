import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Ground from './Ground.tsx'
import Player from './Player.tsx'
import Triggers from './Triggers.tsx'

export default function WorldCanvas() {
  return (
    <Canvas shadows camera={{ position: [0, 8, 8], fov: 55 }} dpr={[1, 1.8]}>
      <color attach="background" args={['#eef5fa']} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[8, 12, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <Ground />
      <Triggers />
      <Player />
      <Environment preset="city" />
    </Canvas>
  )
}