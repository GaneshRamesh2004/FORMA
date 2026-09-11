import { motion } from 'framer-motion'
import { VIEWS } from '../data/productConfig'

export default function ViewSelector({ activeId, onSelect }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-line p-1">
      {VIEWS.map((v) => {
        const active = v.id === activeId
        return (
          <button
            key={v.id}
            onClick={() => onSelect(v.id)}
            className="relative rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-graphite transition"
          >
            {active && (
              <motion.div
                layoutId="view-pill"
                className="absolute inset-0 rounded-full bg-bone"
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
            <span className={`relative z-10 ${active ? 'text-ink' : ''}`}>{v.label}</span>
          </button>
        )
      })}
    </div>
  )
}
