import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, PerformanceMonitor } from '@react-three/drei'
import Sneaker from './Sneaker'
import CustomModel from './CustomModel'
import ModelErrorBoundary from './ModelErrorBoundary'
import Ground from './Ground'
import CameraRig from './CameraRig'
import CanvasLoader from './CanvasLoader'

export default function Scene({ config, selected, customModel, onModelError }) {
  const controlsRef = useRef()
  const [spinning, setSpinning] = useState(true)
  const [dpr, setDpr] = useState(1.5)

  // Capture the starting camera position/target ONCE.
  const [initialPosition] = useState(() => selected.view.position)
  const [initialTarget] = useState(() => selected.view.target)

  const hasCustomModel = Boolean(customModel?.url)

  return (
    <Canvas
      shadows
      dpr={dpr}
      gl={{ antialias: true, powerPreference: 'high-performance', precision: 'mediump' }}
      onPointerDown={() => setSpinning(false)}
      onWheel={() => setSpinning(false)}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />

      <color attach="background" args={['#111110']} />
      <fog attach="fog" args={['#111110', 8, 16]} />

      <PerspectiveCamera makeDefault fov={32} position={initialPosition} near={0.1} far={50} />

      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#8fa8ff" />
      <spotLight position={[0, 4, 3]} angle={0.35} penumbra={0.8} intensity={0.5} />

      <Suspense fallback={<CanvasLoader />}>
        <Environment preset="city" environmentIntensity={0.5} />
        <group position={[0, 0.1, 0]}>
          {hasCustomModel ? (
            <ModelErrorBoundary key={customModel.url} onError={onModelError}>
              <CustomModel url={customModel.url} spinning={spinning} onError={onModelError} />
            </ModelErrorBoundary>
          ) : (
            <Sneaker
              color={selected.color}
              material={selected.material}
              sole={selected.sole}
              components={config.components}
              spinning={spinning}
            />
          )}
        </group>
        <Ground />
      </Suspense>

      <CameraRig view={selected.view} controlsRef={controlsRef} />

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={2.2}
        maxDistance={7}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI / 2 - 0.05}
        target={initialTarget}
      />
    </Canvas>
  )
}
