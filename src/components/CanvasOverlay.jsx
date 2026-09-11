import { motion } from 'framer-motion'
import ViewSelector from './ViewSelector'

export default function CanvasOverlay({ viewId, onSelectView }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 md:p-8">
      <div className="flex items-start justify-between">
        <motion.p
          className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.2em] text-graphite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Drag to rotate — scroll to zoom
        </motion.p>

        <motion.div
          className="pointer-events-auto"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <ViewSelector activeId={viewId} onSelect={onSelectView} />
        </motion.div>
      </div>

      <motion.div
        className="flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-graphite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span>VIEW / {viewId.toUpperCase()}</span>
        <span className="hidden sm:inline">FORMA STUDIO — REAL-TIME RENDER</span>
      </motion.div>
    </div>
  )
}
