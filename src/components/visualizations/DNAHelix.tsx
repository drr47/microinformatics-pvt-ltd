'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const BASE_COLORS: Record<string, string> = {
  A: '#ef4444', T: '#22c55e', G: '#eab308', C: '#3b82f6', U: '#a855f7'
}

function Atom({ pos, color, hovered }: { pos: THREE.Vector3; color: string; hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01
      ref.current.scale.setScalar(hovered ? 1.5 : 1)
    }
  })
  return (
    <mesh ref={ref} position={pos} castShadow>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.8 : 0.3} metalness={0.3} roughness={0.4} />
    </mesh>
  )
}

function Bond({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const dir = new THREE.Vector3().subVectors(to, from)
  const len = dir.length()
  const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5)
  return (
    <mesh position={mid} castShadow>
      <cylinderGeometry args={[0.06, 0.06, len, 8]} />
      <meshStandardMaterial color="#0d9488" emissive="#0d9488" emissiveIntensity={0.2} transparent opacity={0.6} />
    </mesh>
  )
}

function Helix({ basePairs = 30, radius = 1.2, height = 15, turns = 3, autoRotate = true }: { basePairs?: number; radius?: number; height?: number; turns?: number; autoRotate?: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const atoms: THREE.Vector3[] = []
  const bonds: { from: THREE.Vector3; to: THREE.Vector3 }[] = []
  const baseTypes = ['A', 'T', 'G', 'C']

  for (let i = 0; i < basePairs; i++) {
    const t = i / basePairs
    const angle = turns * Math.PI * 2 * t
    const y = (t - 0.5) * height
    const x = radius * Math.cos(angle)
    const z = radius * Math.sin(angle)
    const x2 = -radius * Math.cos(angle)
    const z2 = -radius * Math.sin(angle)
    const pos1 = new THREE.Vector3(x, y, z)
    const pos2 = new THREE.Vector3(x2, y, z2)
    atoms.push(pos1, pos2)
    bonds.push({ from: pos1, to: pos2 })
  }

  return (
    <group>
      {bonds.map((b, i) => (
        <Bond key={i} from={b.from} to={b.to} />
      ))}
      {atoms.map((pos, i) => {
        const base = baseTypes[i % 4]
        const isHovered = hovered === i
        return (
          <Atom key={i} pos={pos} color={BASE_COLORS[base]} hovered={isHovered} />
        )
      })}
      <Html position={[0, height / 2 + 1, 0]} center>
        <div className="text-center pointer-events-none">
          <div className="text-white font-bold text-lg">DNA Double Helix</div>
          <div className="text-slate-300 text-xs">{basePairs} base pairs • Interactive 3D</div>
        </div>
      </Html>
      <OrbitControls enablePan={false} enableZoom={true} maxZoom={20} minZoom={8} autoRotate={autoRotate} autoRotateSpeed={0.5} />
    </group>
  )
}

function Particles({ count = 100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  useFrame((s) => { if (ref.current) ref.current.rotation.y += 0.005 })
  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = 5 + Math.random() * 10
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    pos[i*3] = r * Math.sin(phi) * Math.cos(theta)
    pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
    pos[i*3+2] = r * Math.cos(phi)
    col[i*3] = 0.05; col[i*3+1] = 0.9; col[i*3+2] = 0.5
  }
  const geom = new THREE.BufferGeometry()
  geom.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geom.setAttribute('color', new THREE.BufferAttribute(col, 3))
  return (
    <points ref={ref}>
      <bufferGeometry attach="geometry" {...geom} />
      <pointsMaterial size={0.06} vertexColors toneMapped={false} transparent opacity={0.5} />
    </points>
  )
}

export function DNAHelixCanvas({ basePairs = 30, autoRotate = true, showLabels = true }: { basePairs?: number; autoRotate?: boolean; showLabels?: boolean }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ antialias: true }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        <pointLight position={[0, 5, 0]} color="#10b981" intensity={0.5} />
        {/* @ts-ignore */}
        <fog color="#0a0a0a" near={5} far={25} />
        <Particles count={80} />
        <Helix basePairs={basePairs} autoRotate={autoRotate} />
      </Canvas>
    </div>
  )
}

export function DNAHelix({ basePairs, autoRotate, showLabels, height = 400 }: { basePairs?: number; autoRotate?: boolean; showLabels?: boolean; height?: number }) {
  return (
    <div style={{ width: '100%', height: height, position: 'relative', overflow: 'hidden' }}>
      <DNAHelixCanvas basePairs={basePairs} autoRotate={autoRotate} showLabels={showLabels} />
    </div>
  )
}
