'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const AMINO_ACIDS = [
  { code: 'ALA', color: '#ef4444' }, { code: 'GLY', color: '#22c55e' }, { code: 'VAL', color: '#eab308' },
  { code: 'LEU', color: '#3b82f6' }, { code: 'ILE', color: '#a855f7' }, { code: 'PRO', color: '#f97316' },
  { code: 'SER', color: '#06b6d4' }, { code: 'THR', color: '#ec4899' }, { code: 'CYS', color: '#14b8a6' },
  { code: 'MET', color: '#f59e0b' }, { code: 'PHE', color: '#8b5cf6' }, { code: 'TRP', color: '#ef4444' },
]

function Residue({ pos, aa, index }: { pos: THREE.Vector3; aa: typeof AMINO_ACIDS[0]; index: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y += 0.02
      ref.current.position.y += Math.sin(s.clock.getElapsedTime() * 3 + index) * 0.001
      ref.current.scale.setScalar(hovered ? 1.5 : 1)
    }
  })
  return (
    <mesh ref={ref} position={pos} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} castShadow>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color={aa.color} emissive={aa.color} emissiveIntensity={hovered ? 0.8 : 0.3} metalness={0.3} roughness={0.4} />
      <Html position={[0, 0.8, 0]} center>
        <span className="text-white text-[10px] font-bold bg-black/60 px-1 rounded">{aa.code}</span>
      </Html>
    </mesh>
  )
}

export function ProteinFoldingCanvas({ length = 40 }: { length?: number }) {
  const [folded, setFolded] = useState(false)
  const ref = useRef<THREE.Group>(null)
  useFrame((s) => { if (ref.current) ref.current.rotation.y += 0.008 })

  const residues: { pos: THREE.Vector3; aa: typeof AMINO_ACIDS[0] }[] = []
  for (let i = 0; i < length; i++) {
    const t = i / length
    const aa = AMINO_ACIDS[Math.floor(Math.random() * AMINO_ACIDS.length)]
    let x, y, z
    if (folded) {
      x = (Math.random() - 0.5) * 6
      y = (Math.random() - 0.5) * 6
      z = (Math.random() - 0.5) * 6
    } else {
      x = (i - length/2) * 0.5
      y = Math.sin(i * 0.5) * 1.5
      z = Math.cos(i * 0.5) * 1.5
    }
    residues.push({ pos: new THREE.Vector3(x, y, z), aa })
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ antialias: true }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[0, 5, 0]} color="#10b981" intensity={0.5} />
        {/* @ts-ignore */}
        <fog color="#0a0a0a" near={5} far={25} />
        <group ref={ref}>
          {residues.map((r, i) => (
            <Residue key={i} pos={r.pos} aa={r.aa} index={i} />
          ))}
        </group>
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.3} />
        <Html position={[0, 7, 0]} center>
          <div className="text-center pointer-events-none">
            <div className="text-white font-bold text-lg">Protein Folding</div>
            <div className="text-slate-300 text-xs">{length} amino acids • Click Fold/Unfold</div>
            <button onClick={() => setFolded(!folded)} className="mt-2 px-4 py-1 bg-emerald-600 text-white rounded-lg text-xs hover:bg-emerald-700 transition-colors">
              {folded ? 'Unfold' : 'Fold'}
            </button>
          </div>
        </Html>
      </Canvas>
    </div>
  )
}

export function ProteinFolding({ length, height }: { length?: number; height?: number }) {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative', overflow: 'hidden' }}>
      <ProteinFoldingCanvas length={length} />
    </div>
  )
}
