import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onDone }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 1400
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setPct(Math.round(t * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(onDone, 220)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-bone"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/logo-dark.jpg"
            alt="FORMA Logo"
            className="h-24 w-24 rounded-2xl border border-line-light/30 object-cover shadow-2xl ring-1 ring-accent/30"
          />
          <span className="font-display text-4xl tracking-tight">FORMA</span>
        </motion.div>

        <div className="h-px w-56 overflow-hidden bg-line">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${pct}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </div>

        <span className="font-mono text-[11px] tracking-[0.3em] text-graphite">
          LOADING EXPERIENCE — {pct}%
        </span>
      </div>
    </motion.div>
  )
}
