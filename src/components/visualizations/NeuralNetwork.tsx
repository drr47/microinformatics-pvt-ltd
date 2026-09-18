'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface Layer {
  neurons: number
  label: string
  color: string
}

const LAYERS: Layer[] = [
  { neurons: 8, label: 'Input\n(Features)', color: '#10b981' },
  { neurons: 12, label: 'Hidden 1', color: '#0d9488' },
  { neurons: 10, label: 'Hidden 2', color: '#06b6d4' },
  { neurons: 6, label: 'Hidden 3', color: '#0891b2' },
  { neurons: 3, label: 'Output\n(Classes)', color: '#f59e0b' },
]

const SPACING_X = 4
const SPACING_Y = 1.2

function NeuralNetworkViz({ 
  showAnimation = true,
  speed = 1
}: { 
  showAnimation?: boolean
  speed?: number
}) {
  const networkRef = useRef<THREE.Group>(null)
  const neuronsRef = useRef<THREE.Mesh[]>([])
  const connectionsRef = useRef<THREE.Line[]>([])
  const [pulseIndex, setPulseIndex] = useState(0)
  const [animationPhase, setAnimationPhase] = useState(0)
  
  useFrame((state, delta) => {
    if (networkRef.current) {
      networkRef.current.rotation.y += delta * 0.02 * speed
      networkRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
    
    if (showAnimation) {
      setAnimationPhase(prev => prev + delta * 2 * speed)
      
      if (state.clock.getElapsedTime() > pulseIndex * 0.5 / speed) {
        setPulseIndex(prev => (prev + 1) % (LAYERS.length - 1))
      }
    }
  })

  const positions: THREE.Vector3[][] = []
  
  LAYERS.forEach((layer, layerIndex) => {
    const layerPositions: THREE.Vector3[] = []
    const startY = -(layer.neurons - 1) * SPACING_Y / 2
    const x = layerIndex * SPACING_X - (LAYERS.length - 1) * SPACING_X / 2
    
    for (let i = 0; i < layer.neurons; i++) {
      layerPositions.push(new THREE.Vector3(x, startY + i * SPACING_Y, 0))
    }
    positions.push(layerPositions)
  })

  const connectionLines: React.ReactElement[] = []
  
  for (let l = 0; l < LAYERS.length - 1; l++) {
    const currentLayer = positions[l]
    const nextLayer = positions[l + 1]
    
    currentLayer.forEach((pos1, i) => {
      nextLayer.forEach((pos2, j) => {
        const points = [
          pos1.clone(),
          new THREE.Vector3((pos1.x + pos2.x) / 2, (pos1.y + pos2.y) / 2 + Math.sin(i + j) * 0.3, 0),
          pos2.clone()
        ]
        
        const curve = new THREE.QuadraticBezierCurve3(points[0], points[1], points[2])
        const geometry = new THREE.TubeGeometry(curve, 8, 0.008, 4, false)
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(LAYER_COLORS[l]).lerp(new THREE.Color(LAYER_COLORS[l + 1]), 0.5),
          transparent: true,
          opacity: 0.15,
          blending: THREE.AdditiveBlending,
        })
        
        const key = `${l}-${i}-${j}`
        connectionLines.push(
          // @ts-ignore - Ref type issue with dynamic keys
          <mesh key={key} geometry={geometry} material={material} ref={(el) => { connectionsRef.current[key] = el! }} />
        )
      })
    })
  }

  const LAYER_COLORS = LAYERS.map(l => l.color)

  return (
    <group ref={networkRef}>
      {connectionLines}
      
      {positions.map((layerPositions, layerIndex) => {
        const layer = LAYERS[layerIndex]
        const isActive = showAnimation && layerIndex === pulseIndex || layerIndex === pulseIndex + 1
        
        return layerPositions.map((pos, neuronIndex) => {
          const pulsePhase = animationPhase - layerIndex * 0.5
          const pulseValue = Math.sin(pulsePhase * 3) * 0.15 + 1
          const isPulsing = isActive && showAnimation
          
          return (
            <Neuron
              key={`${layerIndex}-${neuronIndex}`}
              position={pos}
              color={layer.color}
              size={layerIndex === 0 || layerIndex === LAYERS.length - 1 ? 0.35 : 0.28}
              isPulsing={isPulsing}
              pulseValue={pulseValue}
              label={neuronIndex === 0 ? layer.label : undefined}
            />
          )
        })
      })}
      
      <Html position={[0, 8, 0]} center>
        <motion.div className="text-center pointer-events-none">
          <div className="text-emerald-400 font-bold text-sm">Deep Neural Network</div>
          <div className="text-slate-400 text-xs mt-1">Live forward propagation visualization</div>
        </motion.div>
      </Html>
    </group>
  )
}

function Neuron({ 
  position, 
  color, 
  size = 0.3, 
  isPulsing = false, 
  pulseValue = 1,
  label
}: { 
  position: THREE.Vector3
  color: string
  size?: number
  isPulsing?: boolean
  pulseValue?: number
  label?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
      meshRef.current.rotation.x += delta * 0.3
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        scale={isPulsing ? pulseValue : hovered ? 1.3 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[size, 24, 24]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isPulsing ? 0.8 : hovered ? 0.6 : 0.3}
          metalness={0.2}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.2}
          thickness={0.5}
        />
      </mesh>
      
      {label && (
        <Html position={[position.x, position.y - 1.5, position.z]} center>
          <motion.span className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
            {label}
          </motion.span>
        </Html>
      )}
    </group>
  )
}

function ParticleField({ count = 200, radius = 15 }: { count?: number; radius?: number }) {
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
    
    const colorChoice = Math.random()
    if (colorChoice < 0.25) {
      colors[i * 3] = 0x10 / 255; colors[i * 3 + 1] = 0xb9 / 255; colors[i * 3 + 2] = 0x81 / 255
    } else if (colorChoice < 0.5) {
      colors[i * 3] = 0x0d / 255; colors[i * 3 + 1] = 0x94 / 255; colors[i * 3 + 2] = 0x88 / 255
    } else if (colorChoice < 0.75) {
      colors[i * 3] = 0x06 / 255; colors[i * 3 + 1] = 0xb6 / 255; colors[i * 3 + 2] = 0xd4 / 255
    } else {
      colors[i * 3] = 0xf5 / 255; colors[i * 3 + 1] = 0x9e / 255; colors[i * 3 + 2] = 0x0b / 255
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
    opacity: 0.4,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  })
  
  return <points ref={particlesRef} geometry={geometry} material={material} />
}

export function NeuralNetworkCanvas({ height = 400 }: { height?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 28], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* @ts-ignore */}
      <fog color="#0f172a" near={15} far={60} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
      <directionalLight position={[-10, -5, 5]} intensity={0.5} />
      <pointLight position={[0, 8, 8]} color="#10b981" intensity={0.4} distance={30} decay={2} />
      <pointLight position={[0, -8, -8]} color="#f59e0b" intensity={0.3} distance={30} decay={2} />
      
      <ParticleField count={250} radius={18} />
      <NeuralNetworkViz showAnimation={true} speed={1} />
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        maxZoom={35} 
        minZoom={12}
        autoRotate={true}
        autoRotateSpeed={0.2}
      />
    </Canvas>
  )
}

export function NeuralNetwork({ className, height = 400 }: { className?: string; height?: number }) {
  return (
    <div className={className} style={{ width: '100%', height: height, position: 'relative' }}>
      <NeuralNetworkCanvas height={height} />
    </div>
  )
}

function group({ children }: { children: React.ReactNode }) {
  return <group>{children}</group>
}