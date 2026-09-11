import { useEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Renders a user-uploaded GLB/GLTF, centered on its own bounding box and
 * uniformly scaled to roughly match the footprint of the procedural
 * sneaker so camera presets and lighting still feel right regardless of
 * how the source file was authored.
 */
export default function CustomModel({ url, spinning, onError }) {
  const group = useRef()
  const gltf = useGLTF(url)

  useEffect(() => {
    if (!gltf?.scene) {
      onError?.('This file did not contain a renderable scene.')
    }
  }, [gltf, onError])

  const { scene, scale, offset } = useMemo(() => {
    const cloned = gltf.scene.clone(true)
    cloned.traverse((child) => {
      if (child.isMesh) {
        const isTransparent = child.material?.transparent || child.material?.opacity < 0.9
        child.castShadow = !isTransparent
        child.receiveShadow = true
      }
    })

    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    box.getSize(size)
    const center = new THREE.Vector3()
    box.getCenter(center)

    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const targetSize = 2.4
    const fitScale = targetSize / maxDim

    return { scene: cloned, scale: fitScale, offset: center }
  }, [gltf])

  useFrame((_, delta) => {
    if (spinning && group.current) {
      group.current.rotation.y += delta * 0.18
    }
  })

  return (
    <group ref={group}>
      <group scale={scale} position={[-offset.x * scale, -offset.y * scale, -offset.z * scale]}>
        <primitive object={scene} />
      </group>
    </group>
  )
}
