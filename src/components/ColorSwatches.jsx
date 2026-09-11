import { motion } from 'framer-motion'
import { COLORS } from '../data/productConfig'

export default function ColorSwatches({ activeId, onSelect }) {
  const active = COLORS.find((c) => c.id === activeId)

  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">Color</p>
        <p className="font-mono text-[10px] uppercase tracking-wide text-bone/80">
          {active?.label}
        </p>
      </div>
      <div className="flex gap-3">
        {COLORS.map((c) => {
          const isActive = c.id === activeId
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              aria-label={c.label}
              className="relative flex h-11 w-11 items-center justify-center"
            >
              {isActive && (
                <motion.div
                  layoutId="color-ring"
                  className="absolute inset-0 rounded-full border border-bone"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
              <span
                className="h-8 w-8 rounded-full border border-line-light/40 transition-transform hover:scale-105"
                style={{ backgroundColor: c.swatch }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
