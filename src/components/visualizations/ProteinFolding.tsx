'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

const AMINO_ACIDS = [
  { code: 'ALA', color: '#c8c8c8', hydrophobic: true },
  { code: 'ARG', color: '#145aff', hydrophobic: false },
  { code: 'ASN', color: '#00dcdc', hydrophobic: false },
  { code: 'ASP', color: '#e60a0a', hydrophobic: false },
  { code: 'CYS', color: '#e6e600', hydrophobic: true },
  { code: 'GLN', color: '#00dcdc', hydrophobic: false },
  { code: 'GLU', color: '#e60a0a', hydrophobic: false },
  { code: 'GLY', color: '#ebebeb', hydrophobic: true },
  { code: 'HIS', color: '#8282d2', hydrophobic: false },
  { code: 'ILE', color: '#0f820f', hydrophobic: true },
  { code: 'LEU', color: '#0f820f', hydrophobic: true },
  { code: 'LYS', color: '#145aff', hydrophobic: false },
  { code: 'MET', color: '#e6e600', hydrophobic: true },
  { code: 'PHE', color: '#3232aa', hydrophobic: true },
  { code: 'PRO', color: '#dcdc00', hydrophobic: true },
  { code: 'SER', color: '#fa9600', hydrophobic: false },
  { code: 'THR', color: '#fa9600', hydrophobic: false },
  { code: 'TRP', color: '#b45ab4', hydrophobic: true },
  { code: 'TYR', color: '#3232aa', hydrophobic: false },
  { code: 'VAL', color: '#0f820f', hydrophobic: true },
]

function ProteinChain({ 
  length = 60, 
  folded = false 
}: { 
  length?: number
  folded?: boolean
}) {
  const chainRef = useRef<THREE.Group>(null)
  const residuesRef = useRef<THREE.Mesh[]>([])
  const [animationProgress, setAnimationProgress] = useState(0)
  const [isFolding, setIsFolding] = useState(false)
  
  useEffect(() => {
    if (folded && !isFolding) {
      setIsFolding(true)
      setAnimationProgress(0)
    } else if (!folded && isFolding) {
      setIsFolding(false)
      setAnimationProgress(0)
    }
  }, [folded])
  
  useFrame((state, delta) => {
    if (chainRef.current) {
      chainRef.current.rotation.y += delta * 0.03
    }
    
    if (isFolding) {
      setAnimationProgress(prev => Math.min(1, prev + delta * 0.5))
    } else if (!isFolding && animationProgress > 0) {
      setAnimationProgress(prev => Math.max(0, prev - delta * 0.5))
    }
  })

  const residues = []
  for (let i = 0; i < length; i++) {
    const aa = AMINO_ACIDS[Math.floor(Math.random() * AMINO_ACIDS.length)]
    
    let unfoldedPos = new THREE.Vector3(
      (i - length/2) * 0.8,
      Math.sin(i * 0.5) * 2,
      Math.cos(i * 0.5) * 2
    )
    
    let foldedPos = new THREE.Vector3(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 8
    )
    
    const currentPos = new THREE.Vector3().lerpVectors(unfoldedPos, foldedPos, animationProgress)
    
    residues.push(
      <Residue
        key={i}
        aa={aa}
        position={currentPos}
        index={i}
        ref={(el) => { if (el) residuesRef.current[i] = el as THREE.Mesh }}
        animationProgress={animationProgress}
      />
    )
  }
  
  const backbonePoints = residuesRef.current.map((_, i) => {
    const aa = AMINO_ACIDS[Math.floor(Math.random() * AMINO_ACIDS.length)]
    let unfoldedPos = new THREE.Vector3(
      (i - length/2) * 0.8,
      Math.sin(i * 0.5) * 2,
      Math.cos(i * 0.5) * 2
    )
    let foldedPos = new THREE.Vector3(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 8
    )
    return new THREE.Vector3().lerpVectors(unfoldedPos, foldedPos, animationProgress)
  })
  
  if (backbonePoints.length > 3) {
    const curve = new THREE.CatmullRomCurve3(backbonePoints)
    const geometry = new THREE.TubeGeometry(curve, length * 3, 0.18, 8, false)
    const material = new THREE.MeshPhysicalMaterial({
      color: '#059669',
      metalness: 0.2,
      roughness: 0.5,
      clearcoat: 0.3,
      clearcoatRoughness: 0.3,
      transparent: true,
      opacity: 0.4,
    })
    residues.unshift(<mesh key="backbone" geometry={geometry} material={material} />)
  }

  return (
    <group ref={chainRef}>
      {residues}
      
      <Html position={[0, 8, 0]} center>
        <motion.div className="text-center pointer-events-none">
          <div className="text-emerald-400 font-bold text-sm">Protein Structure</div>
          <div className="text-slate-400 text-xs mt-1">{length} amino acids • Folding simulation</div>
          <div className="mt-2 flex gap-2 justify-center">
            <button
              onClick={() => setAnimationProgress(0)}
              className="px-3 py-1 text-xs bg-emerald-600/20 border border-emerald-500/50 rounded-lg text-emerald-300 hover:bg-emerald-600/30 transition-colors backdrop-blur"
            >
              Unfolded
            </button>
            <button
              onClick={() => setAnimationProgress(1)}
              className="px-3 py-1 text-xs bg-emerald-600/20 border border-emerald-500/50 rounded-lg text-emerald-300 hover:bg-emerald-600/30 transition-colors backdrop-blur"
            >
              Folded
            </button>
          </div>
        </motion.div>
      </Html>
    </group>
  )
}

function Residue({ 
  aa, 
  position, 
  index, 
  animationProgress,
  ref
}: { 
  aa: typeof AMINO_ACIDS[0]
  position: THREE.Vector3
  index: number
  animationProgress: number
  ref?: React.RefObject<THREE.Mesh> | ((el: THREE.Mesh | null) => void)
}) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.scale.setScalar(hovered ? 1.4 : 1)
    }
  })

  return (
    <mesh
      ref={(el) => { meshRef.current = el; if (ref) (ref as React.MutableRefObject<THREE.Mesh | null>).current = el }}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <group>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshPhysicalMaterial
          color={aa.color}
          emissive={aa.color}
          emissiveIntensity={hovered ? 0.5 : aa.hydrophobic ? 0.15 : 0.05}
          metalness={aa.hydrophobic ? 0.3 : 0.1}
          roughness={aa.hydrophobic ? 0.4 : 0.6}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          transmission={0.1}
          thickness={0.5}
        />
      </group>
      
      <Html position={[0, 0.8, 0]} center>
        <motion.span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 backdrop-blur text-white whitespace-nowrap"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: animationProgress > 0.5 ? 1 : 0.5, opacity: animationProgress > 0.5 ? 1 : 0.5 }}
          transition={{ delay: index * 0.01 }}
        >
          {aa.code}
        </motion.span>
      </Html>
    </mesh>
  )
}

function ParticleField({ count = 100, radius = 10 }: { count?: number; radius?: number }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.01
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
    
    colors[i * 3] = 0x10 / 255
    colors[i * 3 + 1] = 0xb9 / 255
    colors[i * 3 + 2] = 0x81 / 255
    
    sizes[i] = Math.random() * 1 + 0.2
  }
  
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  
  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  })
  
  return <points ref={particlesRef} geometry={geometry} material={material} />
}

export function ProteinFoldingCanvas({ length = 60, height = 400 }: { length?: number; height?: number }) {
  const [folded, setFolded] = useState(false)
  
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 25], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* @ts-ignore */}
        <fog color="#0f172a" near={15} far={50} />
        
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} castShadow />
        <directionalLight position={[-10, -5, 5]} intensity={0.6} />
        <pointLight position={[0, 8, 8]} color="#10b981" intensity={0.4} distance={30} decay={2} />
        <pointLight position={[0, -8, -8]} color="#06b6d4" intensity={0.3} distance={30} decay={2} />
        
        <ParticleField count={150} radius={12} />
        <ProteinChain length={length} folded={folded} />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxZoom={30} 
          minZoom={10}
          autoRotate={true}
          autoRotateSpeed={0.4}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto">
        <button
          onClick={() => setFolded(false)}
          className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
            !folded 
              ? 'bg-emerald-600 text-white border-emerald-500' 
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur'
          }`}
        >
          Unfolded
        </button>
        <button
          onClick={() => setFolded(true)}
          className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
            folded 
              ? 'bg-emerald-600 text-white border-emerald-500' 
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur'
          }`}
        >
          Folded
        </button>
      </div>
    </div>
  )
}

export function ProteinFolding({ className, height = 400, length = 60, ...props }: { className?: string; height?: number; length?: number }) {
  return (
    <div className={className} style={{ width: '100%', height: height, minHeight: height, position: 'relative' }}>
      <ProteinFoldingCanvas height={height} length={length} />
    </div>
  )
}