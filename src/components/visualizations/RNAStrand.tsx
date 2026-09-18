'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const BASE_COLORS: Record<string, string> = { A: '#ef4444', U: '#22c55e', G: '#eab308', C: '#3b82f6' }
const RNA_BASES = ['A', 'U', 'G', 'C']

function Base({ pos, color, index }: { pos: THREE.Vector3; color: string; index: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y += 0.02
      ref.current.position.y += Math.sin(s.clock.getElapsedTime() * 2 + index) * 0.001
      ref.current.scale.setScalar(hovered ? 1.4 : 1)
    }
  })
  return (
    <mesh ref={ref} position={pos} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} castShadow>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.8 : 0.3} metalness={0.2} roughness={0.5} />
      <Html position={[0, 0.8, 0]} center>
        <span className="text-white text-xs font-bold bg-black/60 px-1 rounded">{RNA_BASES[index % 4]}</span>
      </Html>
    </mesh>
  )
}

export function RNAStrandCanvas({ length = 30 }: { length?: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((s) => { if (ref.current) ref.current.rotation.y += 0.01 })

  const bases: THREE.Vector3[] = []
  const positions = new Float32Array(length * 3)
  const colors = new Float32Array(length * 3)
  for (let i = 0; i < length; i++) {
    const t = i / length
    const angle = Math.PI * 2 * t * 2
    const y = (t - 0.5) * 8
    const r = 1.5 + Math.sin(t * Math.PI * 4) * 0.3
    const x = r * Math.cos(angle)
    const z = r * Math.sin(angle)
    bases.push(new THREE.Vector3(x, y, z))
    positions[i*3] = x; positions[i*3+1] = y; positions[i*3+2] = z
    const c = BASE_COLORS[RNA_BASES[i % 4]]
    colors[i*3] = parseInt(c.slice(1,3), 16) / 255
    colors[i*3+1] = parseInt(c.slice(3,5), 16) / 255
    colors[i*3+2] = parseInt(c.slice(5,7), 16) / 255
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ antialias: true }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[0, 3, 0]} color="#10b981" intensity={0.5} />
        {/* @ts-ignore */}
        <fog color="#0a0a0a" near={5} far={25} />
        <group ref={ref}>
          {bases.map((pos, i) => (
            <Base key={i} pos={pos} color={BASE_COLORS[RNA_BASES[i % 4]]} index={i} />
          ))}
        </group>
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.3} />
        <Html position={[0, 5, 0]} center>
          <div className="text-center pointer-events-none">
            <div className="text-white font-bold text-lg">RNA Single Strand</div>
            <div className="text-slate-300 text-xs">{length} nucleotides</div>
          </div>
        </Html>
      </Canvas>
    </div>
  )
}

export function RNAStrand({ length, height }: { length?: number; height?: number }) {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative', overflow: 'hidden' }}>
      <RNAStrandCanvas length={length} />
    </div>
  )
}
