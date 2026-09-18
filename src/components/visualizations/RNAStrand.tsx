'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

const BASE_COLORS: Record<string, string> = {
  A: '#ff6b6b',
  U: '#4ecdc4',
  G: '#ffe66d',
  C: '#a8e6cf',
}

const RNA_BASES = ['A', 'U', 'G', 'C']

function RNAStrandInner({ 
  length = 50, 
  height = 25, 
  radius = 2,
  showFolding = true,
  color = '#0d9488'
}: { 
  length?: number
  height?: number
  radius?: number
  color?: string
  showFolding?: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [folded, setFolded] = useState(false)
  const basesRef = useRef<THREE.Mesh[]>([])
  const backboneRef = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
      
      if (showFolding && folded) {
        const time = state.clock.getElapsedTime()
        basesRef.current.forEach((base, i) => {
          if (base.userData.targetPosition) {
            const target = base.userData.targetPosition
            base.position.lerp(target, delta * 2)
            base.rotation.y += delta * 0.5
          }
        })
      }
    }
  })

  const toggleFolding = () => {
    setFolded(!folded)
    if (!folded) {
      const positions = calculateFoldedPositions(length, height, radius)
      basesRef.current.forEach((base, i) => {
        base.userData.targetPosition = positions[i]
      })
    } else {
      basesRef.current.forEach((base, i) => {
        const t = i / (length - 1)
        const angle = Math.PI * 2 * t * 3
        const y = (t - 0.5) * height
        const x = radius * Math.cos(angle)
        const z = radius * Math.sin(angle)
        base.userData.targetPosition = new THREE.Vector3(x, y, z)
      })
    }
  }

  const backbonePoints = []
  const basePositions: THREE.Vector3[] = []
  const baseRotations: number[] = []
  
  for (let i = 0; i < length; i++) {
    const t = i / (length - 1)
    const angle = Math.PI * 2 * t * 3
    const y = (t - 0.5) * height
    
    const x = radius * Math.cos(angle)
    const z = radius * Math.sin(angle)
    
    backbonePoints.push(new THREE.Vector3(x, y, z))
    basePositions.push(new THREE.Vector3(x + 1.2 * Math.cos(angle + Math.PI/2), y, z + 1.2 * Math.sin(angle + Math.PI/2)))
    baseRotations.push(angle + Math.PI/2)
  }
  
  const backboneCurve = new THREE.CatmullRomCurve3(backbonePoints)
  const backboneGeometry = new THREE.TubeGeometry(backboneCurve, length * 4, 0.15, 8, false)
  const backboneMaterial = new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.3,
    roughness: 0.4,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
    transmission: 0.1,
    thickness: 0.5,
  })

  return (
    <group ref={groupRef}>
      <mesh geometry={backboneGeometry} material={backboneMaterial} ref={backboneRef} castShadow receiveShadow />
      
      {basePositions.map((pos, i) => {
        const base = RNA_BASES[Math.floor(Math.random() * RNA_BASES.length)]
        const baseColor = BASE_COLORS[base]
        
        return (
          <RNABase
            key={i}
            base={base}
            position={pos}
            rotation={baseRotations[i]}
            color={baseColor}
            index={i}
            ref={(el) => { if (el) basesRef.current[i] = el as THREE.Mesh }}
          />
        )
      })}
      
      <Html position={[0, height/2 + 2, 0]} center>
        <motion.div className="text-center pointer-events-none">
          <div className="text-teal-400 font-bold text-sm">RNA Single Strand</div>
          <div className="text-slate-400 text-xs mt-1">{length} nucleotides • Interactive folding</div>
          <button
            onClick={toggleFolding}
            className="mt-2 px-3 py-1 text-xs bg-emerald-600/20 border border-emerald-500/50 rounded-lg text-emerald-300 hover:bg-emerald-600/30 transition-colors backdrop-blur"
          >
            {folded ? 'Unfold' : 'Fold Structure'}
          </button>
        </motion.div>
      </Html>
    </group>
  )
}

function RNABase({ 
  base, 
  position, 
  rotation, 
  color, 
  index,
  ref
}: { 
  base: string
  position: THREE.Vector3
  rotation: number
  color: string
  index: number
  ref?: React.RefObject<THREE.Mesh> | ((el: THREE.Mesh | null) => void)
}) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 3 + index) * 0.15
      meshRef.current.scale.setScalar(hovered ? 1.3 : 1)
    }
  })

  return (
    <mesh
      ref={(el) => { meshRef.current = el; if (ref) (ref as React.MutableRefObject<THREE.Mesh | null>).current = el }}
      position={position}
      rotation={[0, rotation, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <group>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.2}
          metalness={0.1}
          roughness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.2}
          thickness={0.5}
        />
      </group>
      
      <Html position={[0, 0.8, 0]} center>
        <motion.span
          className="text-xs font-bold px-1.5 py-0.5 rounded bg-black/50 backdrop-blur text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.02 }}
        >
          {base}
        </motion.span>
      </Html>
    </mesh>
  )
}

function calculateFoldedPositions(length: number, height: number, radius: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = []
  for (let i = 0; i < length; i++) {
    const t = i / (length - 1)
    const angle = Math.PI * 2 * t * 1.5
    const y = (t - 0.5) * height * 0.5
    const foldRadius = radius * (0.5 + 0.5 * Math.sin(t * Math.PI * 4))
    const x = foldRadius * Math.cos(angle)
    const z = foldRadius * Math.sin(angle)
    positions.push(new THREE.Vector3(x, y, z))
  }
  return positions
}

function ParticleField({ count = 150, radius = 12 }: { count?: number; radius?: number }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.015
      particlesRef.current.rotation.x += delta * 0.01
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
    
    sizes[i] = Math.random() * 1.5 + 0.3
  }
  
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  
  const material = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  })
  
  return <points ref={particlesRef} geometry={geometry} material={material} />
}

export function RNAStrandCanvas({ length = 50, height = 400 }: { length?: number; height?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* @ts-ignore */}
      <fog color="#0f172a" near={15} far={60} />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
      <directionalLight position={[-10, -5, 5]} intensity={0.8} />
      <pointLight position={[0, 5, 10]} color="#10b981" intensity={0.5} distance={30} decay={2} />
      <pointLight position={[0, -5, -10]} color="#06b6d4" intensity={0.3} distance={30} decay={2} />
      
      <ParticleField count={200} radius={15} />
      <RNAStrandInner length={length} height={25} radius={2} color="#0d9488" />
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        maxZoom={35} 
        minZoom={12}
        autoRotate={true}
        autoRotateSpeed={0.3}
      />
    </Canvas>
  )
}

export function RNAStrand({ className, height = 400, length = 50, ...props }: { className?: string; height?: number; length?: number }) {
  return (
    <div className={className} style={{ width: '100%', height: height, minHeight: height }}>
      <RNAStrandCanvas height={height} length={length} />
    </div>
  )
}