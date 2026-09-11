import { motion } from 'framer-motion'

/**
 * A vertical list of selectable technical options (used for Material
 * and Sole). Each row shows a label + short description, with a shared
 * layoutId indicator that glides between the active row.
 */
export default function OptionGroup({ title, groupKey, options, activeId, onSelect }) {
  return (
    <div>
      <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
        {title}
      </p>
      <div className="border-t border-line/60">
        {options.map((opt) => {
          const active = opt.id === activeId
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className="group relative flex w-full items-center justify-between border-b border-line/60 py-3 text-left transition"
            >
              {active && (
                <motion.div
                  layoutId={`${groupKey}-indicator`}
                  className="absolute -left-3 h-1.5 w-1.5 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
              <div>
                <p
                  className={`font-body text-[13px] transition ${
                    active ? 'text-bone' : 'text-graphite group-hover:text-bone/80'
                  }`}
                >
                  {opt.label}
                </p>
                {opt.description && (
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-graphite/70">
                    {opt.description}
                  </p>
                )}
              </div>
              <span
                className={`font-mono text-[10px] transition ${
                  active ? 'text-accent' : 'text-transparent group-hover:text-graphite'
                }`}
              >
                {active ? 'SELECTED' : 'SELECT'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
