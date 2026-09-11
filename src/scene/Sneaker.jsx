import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

/**
 * A fully procedural sneaker built from primitive geometry — no external
 * GLB required. Every part reads live from the customization config so
 * color / material / sole / component toggles update instantly.
 */
export default function Sneaker({ color, material, sole, components, spinning }) {
  const group = useRef()

  useFrame((_, delta) => {
    if (spinning && group.current) {
      group.current.rotation.y += delta * 0.18
    }
  })

  const upperMat = useMemo(
    () => ({
      color: color.code,
      roughness: material.roughness,
      metalness: material.metalness,
      clearcoat: material.clearcoat,
      clearcoatRoughness: 0.25,
      envMapIntensity: 1.1,
    }),
    [color, material],
  )

  const accentMat = useMemo(
    () => ({
      color: color.accent,
      roughness: Math.max(material.roughness - 0.1, 0.08),
      metalness: material.metalness,
      clearcoat: material.clearcoat,
      envMapIntensity: 1.1,
    }),
    [color, material],
  )

  const soleMat = useMemo(() => {
    if (sole.transparent) {
      return {
        color: sole.color,
        roughness: 0.1,
        metalness: 0,
        transmission: 0.6,
        thickness: 0.3,
        ior: 1.2,
        clearcoat: 0.5,
        envMapIntensity: 1.1,
      }
    }
    return {
      color: sole.color,
      roughness: sole.tread ? 0.78 : 0.55,
      metalness: 0.05,
      clearcoat: sole.tread ? 0 : 0.15,
    }
  }, [sole])

  const treadBlocks = useMemo(() => {
    if (!sole.tread) return []
    const blocks = []
    for (let i = 0; i < 10; i++) {
      const z = -1.05 + i * 0.235
      const width = 0.62 - Math.abs(i - 4.5) * 0.035
      blocks.push({ z, width })
    }
    return blocks
  }, [sole.tread])

  return (
    <group ref={group} position={[0, -0.05, 0]}>
      {/* ---------- OUTSOLE ---------- */}
      <RoundedBox
        args={[1.05, 0.16, 2.55]}
        radius={0.09}
        smoothness={2}
        position={[0, -0.02, 0.02]}
      >
        <meshPhysicalMaterial {...soleMat} />
      </RoundedBox>

      {treadBlocks.map((b, i) => (
        <mesh key={i} position={[0, -0.1, b.z]}>
          <boxGeometry args={[b.width, 0.03, 0.1]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
        </mesh>
      ))}

      {/* ---------- MIDSOLE ---------- */}
      <RoundedBox
        args={[1.12, 0.22, 2.62]}
        radius={0.1}
        smoothness={2}
        position={[0, 0.14, 0]}
      >
        <meshPhysicalMaterial
          color={sole.transparent ? sole.color : '#f2efe9'}
          roughness={sole.transparent ? 0.1 : 0.85}
          metalness={0.02}
          transmission={sole.transparent ? 0.5 : 0}
          transparent={sole.transparent}
          opacity={sole.transparent ? 0.85 : 1}
        />
      </RoundedBox>

      {/* ---------- UPPER BODY ---------- */}
      <group position={[0, 0.38, -0.05]}>
        {/* main shell */}
        <RoundedBox args={[0.92, 0.62, 2.15]} radius={0.28} smoothness={2} position={[0, 0.08, 0.05]}>
          <meshPhysicalMaterial {...upperMat} />
        </RoundedBox>

        {/* toe cap */}
        <mesh position={[0, -0.02, 1.12]} scale={[0.86, 0.62, 0.55]}>
          <sphereGeometry args={[0.55, 16, 16]} />
          <meshPhysicalMaterial {...upperMat} />
        </mesh>

        {/* heel counter */}
        <RoundedBox args={[0.86, 0.72, 0.5]} radius={0.2} smoothness={2} position={[0, 0.14, -1.02]}>
          <meshPhysicalMaterial {...upperMat} />
        </RoundedBox>

        {/* collar rim */}
        <mesh position={[0, 0.46, -0.55]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.07, 8, 16, Math.PI * 1.15]} />
          <meshPhysicalMaterial {...accentMat} />
        </mesh>

        {/* tongue */}
        <RoundedBox args={[0.42, 0.32, 0.62]} radius={0.08} smoothness={2} position={[0, 0.42, 0.1]} rotation={[0.18, 0, 0]}>
          <meshPhysicalMaterial {...accentMat} />
        </RoundedBox>

        {/* side panel blade */}
        {components.stripe && (
          <group>
            <mesh position={[0.47, 0.06, 0.15]} rotation={[0, 0, 0.05]}>
              <boxGeometry args={[0.03, 0.34, 1.5]} />
              <meshPhysicalMaterial {...accentMat} />
            </mesh>
            <mesh position={[-0.47, 0.06, 0.15]} rotation={[0, 0, -0.05]}>
              <boxGeometry args={[0.03, 0.34, 1.5]} />
              <meshPhysicalMaterial {...accentMat} />
            </mesh>
          </group>
        )}

        {/* heel tab */}
        {components.heelTab && (
          <RoundedBox args={[0.16, 0.28, 0.08]} radius={0.03} smoothness={2} position={[0, 0.58, -1.24]}>
            <meshPhysicalMaterial {...accentMat} />
          </RoundedBox>
        )}

        {/* laces */}
        {components.laces && <Laces />}
      </group>
    </group>
  )
}

function Laces() {
  const rows = 5
  const laces = []
  for (let i = 0; i < rows; i++) {
    const z = -0.28 + i * 0.22
    laces.push(
      <mesh key={`l-${i}`} position={[0, 0.5, z]} rotation={[0, 0, Math.PI / 5]}>
        <cylinderGeometry args={[0.018, 0.018, 0.5, 6]} />
        <meshStandardMaterial color="#e7e2d6" roughness={0.6} />
      </mesh>,
      <mesh key={`r-${i}`} position={[0, 0.5, z + 0.06]} rotation={[0, 0, -Math.PI / 5]}>
        <cylinderGeometry args={[0.018, 0.018, 0.5, 6]} />
        <meshStandardMaterial color="#e7e2d6" roughness={0.6} />
      </mesh>,
    )
  }
  return <group>{laces}</group>
}
