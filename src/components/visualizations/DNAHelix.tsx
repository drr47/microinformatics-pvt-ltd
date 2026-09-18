'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface DNAHelixProps {
  className?: string
  basePairs?: number
  autoRotate?: boolean
  showLabels?: boolean
}

const BASE_COLORS: Record<string, string> = {
  A: '#ff6b6b',
  T: '#4ecdc4',
  G: '#ffe66d',
  C: '#a8e6cf',
  U: '#d4a5e6',
}

const BASE_PAIRS = ['AT', 'TA', 'CG', 'GC', 'AU', 'UA']

function HelixStrand({ 
  radius = 1.5, 
  height = 20, 
  turns = 3, 
  basePairs = 30,
  color = '#059669',
  phase = 0,
  strandIndex = 0
}: { 
  radius?: number
  height?: number
  turns?: number
  basePairs?: number
  color?: string
  phase?: number
  strandIndex?: number
}) {
  const points = []
  const basePositions: THREE.Vector3[] = []
  const basePairData: { base: string; position: THREE.Vector3; rotation: number }[] = []
  
  for (let i = 0; i <= basePairs; i++) {
    const t = i / basePairs
    const angle = turns * Math.PI * 2 * t + phase
    const y = (t - 0.5) * height
    
    const x = radius * Math.cos(angle)
    const z = radius * Math.sin(angle)
    
    points.push(new THREE.Vector3(x, y, z))
    
    if (i < basePairs) {
      const pairIndex = Math.floor(Math.random() * BASE_PAIRS.length)
      const pair = BASE_PAIRS[pairIndex]
      const base = strandIndex === 0 ? pair[0] : pair[1]
      
      basePositions.push(new THREE.Vector3(x, y, z))
      basePairData.push({
        base,
        position: new THREE.Vector3(x, y, z),
        rotation: angle
      })
    }
  }
  
  const curve = new THREE.CatmullRomCurve3(points)
  const geometry = new THREE.TubeGeometry(curve, basePairs * 4, 0.12, 8, false)
  const material = new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.3,
    roughness: 0.4,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
    transmission: 0.1,
    thickness: 0.5,
  })
  
  return (
    <group>
      <mesh geometry={geometry} material={material} castShadow receiveShadow />
      {basePairData.map((data, i) => (
        <BasePair
          key={i}
          base={data.base}
          position={data.position}
          rotation={data.rotation}
          radius={radius}
          strandIndex={strandIndex}
        />
      ))}
    </group>
  )
}

function BasePair({ base, position, rotation, radius, strandIndex }: { 
  base: string
  position: THREE.Vector3
  rotation: number
  radius: number
  strandIndex: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const color = BASE_COLORS[base] || '#ffffff'
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 2 + position.y) * 0.1
    }
  })
  
  return (
    <mesh
      ref={ref}
      position={position}
      rotation={[0, rotation + Math.PI / 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <cylinderGeometry args={[0.35, 0.35, 0.8, 8]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.1}
        metalness={0.2}
        roughness={0.3}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.3}
        thickness={0.5}
      />
    </mesh>
  )
}

function ConnectingBonds({ basePairs = 30, radius = 1.5, height = 20, turns = 3 }: { 
  basePairs?: number
  radius?: number
  height?: number
  turns?: number
}) {
  const bondsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (bondsRef.current) {
      bondsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })
  
  const bonds = []
  for (let i = 0; i < basePairs; i++) {
    const t = (i + 0.5) / basePairs
    const angle = turns * Math.PI * 2 * t
    const y = (t - 0.5) * height
    
    const x1 = radius * Math.cos(angle)
    const z1 = radius * Math.sin(angle)
    const x2 = -radius * Math.cos(angle)
    const z2 = -radius * Math.sin(angle)
    
    bonds.push(
      <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, radius * 2, 4]} />
        <meshPhysicalMaterial
          color="#0d9488"
          transparent
          opacity={0.4}
          metalness={0.5}
          roughness={0.3}
          emissive="#0d9488"
          emissiveIntensity={0.2}
        />
      </mesh>
    )
  }
  
  return <group ref={bondsRef}>{bonds}</group>
}

function ParticleField({ count = 200, radius = 10 }: { count?: number; radius?: number }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02
      particlesRef.current.rotation.x += delta * 0.01
      
      const positions = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.getElapsedTime() + i) * 0.001
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random())
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
    
    const colorChoice = Math.random()
    if (colorChoice < 0.33) {
      colors[i * 3] = 0x10 / 255
      colors[i * 3 + 1] = 0xb9 / 255
      colors[i * 3 + 2] = 0x81 / 255
    } else if (colorChoice < 0.66) {
      colors[i * 3] = 0x14 / 255
      colors[i * 3 + 1] = 0xb8 / 255
      colors[i * 3 + 2] = 0xa6 / 255
    } else {
      colors[i * 3] = 0x06 / 255
      colors[i * 3 + 1] = 0xb6 / 255
      colors[i * 3 + 2] = 0xd4 / 255
    }
    
    sizes[i] = Math.random() * 2 + 0.5
  }
  
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  
  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  })
  
  return <points ref={particlesRef} geometry={geometry} material={material} />
}

export function DNAHelixCanvas({ 
  basePairs = 30, 
  autoRotate = true, 
  showLabels = true,
  height = 400
}: DNAHelixProps & { height?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 25], fov: 40 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* @ts-ignore */}
      <fog color="#0f172a" near={10} far={50} />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
      <directionalLight position={[-10, -5, 5]} intensity={0.8} />
      <pointLight position={[0, 5, 10]} color="#10b981" intensity={0.5} distance={30} decay={2} />
      <pointLight position={[0, -5, -10]} color="#06b6d4" intensity={0.3} distance={30} decay={2} />
      
      <ParticleField count={300} radius={15} />
      
      <group>
        <HelixStrand 
          basePairs={basePairs} 
          color="#059669" 
          phase={0} 
          strandIndex={0}
          radius={1.5}
          height={22}
          turns={3.5}
        />
        <HelixStrand 
          basePairs={basePairs} 
          color="#0d9488" 
          phase={Math.PI} 
          strandIndex={1}
          radius={1.5}
          height={22}
          turns={3.5}
        />
        <ConnectingBonds basePairs={basePairs} radius={1.5} height={22} turns={3.5} />
      </group>
      
      {showLabels && (
        <Html position={[0, 13, 0]} center>
          <motion.div 
            className="text-center pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-emerald-400 font-bold text-lg">DNA Double Helix</div>
            <div className="text-slate-400 text-xs mt-1">{basePairs} base pairs • Interactive 3D</div>
          </motion.div>
        </Html>
      )}
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        maxZoom={30} 
        minZoom={10}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}

export function DNAHelix({ className, height = 400, basePairs = 30, autoRotate = true, showLabels = true }: DNAHelixProps & { height?: number; basePairs?: number; autoRotate?: boolean; showLabels?: boolean }) {
  return (
    <div className={className} style={{ width: '100%', height: height, minHeight: height }}>
      <DNAHelixCanvas basePairs={basePairs} autoRotate={autoRotate} showLabels={showLabels} height={height} />
    </div>
  )
}