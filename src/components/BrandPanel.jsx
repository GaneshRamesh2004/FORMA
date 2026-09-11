import { motion } from 'framer-motion'
import { PRODUCT_INFO } from '../data/productConfig'

export default function BrandPanel() {
  return (
    <aside className="hidden w-[300px] shrink-0 flex-col justify-between border-r border-line px-8 py-10 lg:flex">
      <div>
        <motion.div
          className="mb-6 overflow-hidden rounded-xl border border-line-light/30 bg-ink-card p-1 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/logo-dark.jpg"
            alt="FORMA Brand Logo"
            className="h-36 w-full rounded-lg object-cover"
          />
        </motion.div>

        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          {PRODUCT_INFO.edition}
        </motion.p>

        <motion.h1
          className="mt-4 font-display text-[42px] leading-[0.95] tracking-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {PRODUCT_INFO.name}
        </motion.h1>

        <motion.p
          className="mt-3 max-w-[22ch] font-body text-sm leading-relaxed text-graphite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {PRODUCT_INFO.category} — engineered for a single, uninterrupted
          silhouette. Configured piece by piece, built to order.
        </motion.p>
      </div>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          Specification
        </p>
        <ul className="divide-y divide-line/60 border-t border-line/60">
          {PRODUCT_INFO.specs.map((s) => (
            <li key={s.label} className="flex items-baseline justify-between py-2.5">
              <span className="font-mono text-[11px] uppercase tracking-wide text-graphite">
                {s.label}
              </span>
              <span className="font-body text-[13px] text-bone/90 text-right">
                {s.value}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </aside>
  )
}
