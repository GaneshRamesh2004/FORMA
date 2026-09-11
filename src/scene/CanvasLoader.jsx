import { Html, useProgress } from '@react-three/drei'

export default function CanvasLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 font-mono text-[11px] tracking-widest text-bone/70 uppercase">
        <span>Initializing scene</span>
        <span className="text-accent">{Math.round(progress)}%</span>
      </div>
    </Html>
  )
}
