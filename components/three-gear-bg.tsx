"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

function Gear({ rotationSpeed = 0.4, color = '#c53030', position = [0, 0, 0], scale = 1 }: any) {
  const ref = useRef<Mesh | null>(null)
  useFrame((_state, delta) => {
    if (ref.current) ref.current.rotation.z += rotationSpeed * delta
  })

  const teeth = useMemo(() => {
    const arr = []
    const numTeeth = 12
    for (let i = 0; i < numTeeth; i++) arr.push(i)
    return arr
  }, [])

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.18, 16, 100]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.35} />
      </mesh>

      {teeth.map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / teeth.length) * Math.PI * 2) * 1.35,
            Math.sin((i / teeth.length) * Math.PI * 2) * 1.35,
            0.06,
          ]}
          rotation={[Math.PI / 2, 0, (i / teeth.length) * Math.PI * 2]}
        >
          <boxGeometry args={[0.18, 0.06, 0.42]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.35} />
        </mesh>
      ))}

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.18, 32]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight intensity={0.6} position={[5, 5, 5]} />
      <group position={[0, 0, 0]}>
        <Gear rotationSpeed={0.4} color="#c12b2b" scale={2.4} position={[-2.0, -0.5, -0.5]} />
        <Gear rotationSpeed={-0.28} color="#0b5bd7" scale={1.8} position={[2.0, 0.6, -0.8]} />
      </group>
    </>
  )
}

export default function ThreeGearBg() {
  return (
    <div className="three-gear-bg fixed inset-0 -z-10 pointer-events-none select-none opacity-30 md:block">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 40 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
