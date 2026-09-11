import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Smoothly interpolates the camera + OrbitControls target toward the
 * currently selected preset view whenever it changes, without fighting
 * the user's ability to keep orbiting once they touch the controls again.
 */
export default function CameraRig({ view, controlsRef }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(...view.position))
  const targetLook = useRef(new THREE.Vector3(...view.target))
  const animating = useRef(true)

  useEffect(() => {
    targetPos.current.set(...view.position)
    targetLook.current.set(...view.target)
    animating.current = true
  }, [view])

  useFrame(() => {
    if (!animating.current) return
    camera.position.lerp(targetPos.current, 0.06)

    const controls = controlsRef.current
    if (controls) {
      controls.target.lerp(targetLook.current, 0.06)
      controls.update()
    }

    if (camera.position.distanceTo(targetPos.current) < 0.01) {
      animating.current = false
    }
  })

  return null
}
