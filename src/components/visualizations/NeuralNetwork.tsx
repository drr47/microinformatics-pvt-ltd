'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const LAYERS = [
  { neurons: 6, label: 'Input', color: '#10b981' },
  { neurons: 10, label: 'Hidden 1', color: '#06b6d4' },
  { neurons: 8, label: 'Hidden 2', color: '#3b82f6' },
  { neurons: 4, label: 'Hidden 3', color: '#a855f7' },
  { neurons: 3, label: 'Output', color: '#f59e0b' },
]

function Neuron({ pos, color }: { pos: THREE.Vector3; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(s.clock.getElapsedTime() * 2) * 0.002
      ref.current.scale.setScalar(1 + Math.sin(s.clock.getElapsedTime() * 3) * 0.1)
    }
  })
  return (
    <mesh ref={ref} position={pos} castShadow>
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} metalness={0.3} roughness={0.4} />
    </mesh>
  )
}

function Connection({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const points = [from, to]
  const geom = new THREE.BufferGeometry().setFromPoints(points)
  return (
    // @ts-ignore
    <line geometry={geom}>
      <lineBasicMaterial color="#10b981" transparent opacity={0.2} />
    </line>
  )
}

function NetworkViz() {
  const ref = useRef<THREE.Group>(null)
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y += 0.005
  })

  const positions: THREE.Vector3[][] = []
  LAYERS.forEach((layer, li) => {
    const layerPos: THREE.Vector3[] = []
    const startY = -(layer.neurons - 1) * 0.8
    const x = li * 3 - (LAYERS.length - 1) * 1.5
    for (let i = 0; i < layer.neurons; i++) {
      layerPos.push(new THREE.Vector3(x, startY + i * 0.8, 0))
    }
    positions.push(layerPos)
  })

  return (
    <group ref={ref}>
      {positions.map((layerPos, li) => (
        <group key={li}>
          {layerPos.map((pos, ni) => (
            <Neuron key={`${li}-${ni}`} pos={pos} color={LAYERS[li].color} />
          ))}
        </group>
      ))}
      {positions.slice(0, -1).map((layerPos, li) => (
        <g key={`conn-${li}`}>
          {layerPos.map((pos1, ni) => (
            positions[li + 1].map((pos2, ni2) => (
              <Connection key={`${li}-${ni}-${ni2}`} from={pos1} to={pos2} />
            ))
          ))}
        </g>
      ))}
    </group>
  )
}

export function NeuralNetworkCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }} gl={{ antialias: true }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[0, 5, 0]} color="#10b981" intensity={0.5} />
        {/* @ts-ignore */}
        <fog color="#0a0a0a" near={8} far={30} />
        <NetworkViz />
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </div>
  )
}

export function NeuralNetwork() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative', overflow: 'hidden' }}>
      <NeuralNetworkCanvas />
    </div>
  )
}
