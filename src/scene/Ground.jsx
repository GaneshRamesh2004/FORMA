import { ContactShadows } from '@react-three/drei'

export default function Ground() {
  return (
    <ContactShadows
      position={[0, -0.42, 0]}
      opacity={0.5}
      scale={8}
      blur={2.0}
      far={2}
      resolution={256}
      frames={1}
      color="#000000"
    />
  )
}
