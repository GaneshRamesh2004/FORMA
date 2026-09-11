import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCT_INFO } from '../data/productConfig'

export default function ConfigSummary({ selected, config, onReset, isDefault, onSave }) {
  const [justSaved, setJustSaved] = useState(false)
  const activeComponents = Object.entries(config.components)
    .filter(([, v]) => v)
    .map(([k]) => k)

  const handleSave = () => {
    onSave?.()
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 1800)
  }

  return (
    <div className="border-t border-line pt-5">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
        Configuration
      </p>

      <div className="space-y-1.5 font-mono text-[11px] uppercase tracking-wide text-graphite">
        <SummaryRow label="Color" value={selected.color.label} />
        <SummaryRow label="Material" value={selected.material.label} />
        <SummaryRow label="Sole" value={selected.sole.label} />
        <SummaryRow label="Fittings" value={`${activeComponents.length}/3 active`} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">Total</p>
          <p className="font-display text-2xl tracking-tight">${PRODUCT_INFO.price}</p>
        </div>

        <div className="flex items-center gap-2">
          {onSave && (
            <button
              onClick={handleSave}
              className="rounded-full border border-line-light/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-graphite transition hover:border-bone hover:text-bone"
            >
              {justSaved ? 'Saved ✓' : 'Save to archive'}
            </button>
          )}

          <AnimatePresence>
            {!isDefault && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={onReset}
                className="rounded-full border border-line-light/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-graphite transition hover:border-bone hover:text-bone"
              >
                Reset design
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="text-bone/85">{value}</span>
    </div>
  )
}
