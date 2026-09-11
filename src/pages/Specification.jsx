import { motion } from 'framer-motion'
import { COLORS, MATERIALS, SOLES, PRODUCT_INFO } from '../data/productConfig'
import { useProduct } from '../context/ProductContext'

export default function Specification() {
  const { selected } = useProduct()

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 md:px-10 md:py-20">
      <motion.p
        className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Full technical detail
      </motion.p>

      <motion.h1
        className="mt-4 font-display text-[40px] leading-[0.95] tracking-tight md:text-[56px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        Specification
      </motion.h1>

      <p className="mt-4 max-w-[48ch] font-body text-sm leading-relaxed text-graphite">
        {PRODUCT_INFO.name} — {PRODUCT_INFO.category}. Every unit is built to
        order from the configuration selected in the studio.
      </p>

      {/* Current build */}
      <section className="mt-14 border-t border-line pt-8">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          Your current build
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <BuildCard label="Color" value={selected.color.label} swatch={selected.color.swatch} />
          <BuildCard label="Material" value={selected.material.label} />
          <BuildCard label="Sole" value={selected.sole.label} />
          <BuildCard label="View" value={selected.view.label} />
        </div>
      </section>

      {/* Core spec sheet */}
      <section className="mt-14 border-t border-line pt-8">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          Base specification
        </p>
        <ul className="divide-y divide-line/60 border-t border-line/60">
          {PRODUCT_INFO.specs.map((s) => (
            <li key={s.label} className="flex items-baseline justify-between py-3">
              <span className="font-mono text-[11px] uppercase tracking-wide text-graphite">
                {s.label}
              </span>
              <span className="font-body text-sm text-bone/90">{s.value}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Material catalogue */}
      <section className="mt-14 border-t border-line pt-8">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          Material options
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {MATERIALS.map((m) => (
            <div key={m.id} className="border border-line-light/40 p-4">
              <p className="font-body text-[15px] text-bone/90">{m.label}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-graphite/70">
                {m.description}
              </p>
              <dl className="mt-3 space-y-1 font-mono text-[10px] uppercase tracking-wide text-graphite">
                <SpecLine label="Roughness" value={m.roughness} />
                <SpecLine label="Metalness" value={m.metalness} />
                <SpecLine label="Clearcoat" value={m.clearcoat} />
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* Sole catalogue */}
      <section className="mt-14 border-t border-line pt-8">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          Sole options
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {SOLES.map((s) => (
            <div key={s.id} className="border border-line-light/40 p-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full border border-line-light/40"
                  style={{ backgroundColor: s.color, opacity: s.transparent ? 0.5 : 1 }}
                />
                <p className="font-body text-[15px] text-bone/90">{s.label}</p>
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-graphite/70">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Colorways */}
      <section className="mt-14 border-t border-line pb-16 pt-8">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          Colorways
        </p>
        <div className="flex flex-wrap gap-4">
          {COLORS.map((c) => (
            <div key={c.id} className="flex items-center gap-2.5 border border-line-light/40 px-3 py-2">
              <span
                className="h-5 w-5 rounded-full border border-line-light/40"
                style={{ backgroundColor: c.swatch }}
              />
              <span className="font-mono text-[10px] uppercase tracking-wide text-bone/85">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function BuildCard({ label, value, swatch }) {
  return (
    <div className="border border-line-light/40 p-3.5">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-graphite">{label}</p>
      <div className="mt-1.5 flex items-center gap-2">
        {swatch && (
          <span className="h-2.5 w-2.5 rounded-full border border-line-light/40" style={{ backgroundColor: swatch }} />
        )}
        <p className="font-body text-[13px] text-bone/90">{value}</p>
      </div>
    </div>
  )
}

function SpecLine({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="text-bone/80">{value}</span>
    </div>
  )
}
