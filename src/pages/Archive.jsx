import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../context/ProductContext'
import { useArchive } from '../hooks/useArchive'
import { MATERIALS, SOLES } from '../data/productConfig'

export default function Archive() {
  const { loadConfig } = useProduct()
  const archive = useArchive()
  const navigate = useNavigate()

  const restore = (entry) => {
    loadConfig(entry.config)
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 md:px-10 md:py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
        Saved designs
      </p>
      <h1 className="mt-4 font-display text-[40px] leading-[0.95] tracking-tight md:text-[56px]">
        Archive
      </h1>
      <p className="mt-4 max-w-[48ch] font-body text-sm leading-relaxed text-graphite">
        Every design you save from the configurator lands here, stored
        locally in this browser. Restore a past build in one click, or
        clear the archive entirely.
      </p>

      {archive.entries.length === 0 ? (
        <div className="mt-14 border border-dashed border-line-light/40 px-6 py-16 text-center">
          <p className="font-body text-sm text-graphite">
            Nothing saved yet — build something in the configurator, then
            hit &ldquo;Save to archive&rdquo;.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-10 flex items-center justify-between border-t border-line pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
              {archive.entries.length} saved {archive.entries.length === 1 ? 'design' : 'designs'}
            </p>
            <button
              onClick={archive.clear}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite transition hover:text-bone"
            >
              Clear all
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {archive.entries.map((entry) => (
                <ArchiveCard
                  key={entry.id}
                  entry={entry}
                  onRestore={() => restore(entry)}
                  onDelete={() => archive.remove(entry.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  )
}

function ArchiveCard({ entry, onRestore, onDelete }) {
  const material = MATERIALS.find((m) => m.id === entry.config.materialId)
  const sole = SOLES.find((s) => s.id === entry.config.soleId)
  const date = new Date(entry.createdAt)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="border border-line-light/40 p-4"
    >
      <div className="flex items-center gap-2.5">
        <span
          className="h-6 w-6 shrink-0 rounded-full border border-line-light/40"
          style={{ backgroundColor: entry.swatch }}
        />
        <div className="min-w-0">
          <p className="truncate font-body text-[14px] text-bone/90">{entry.label}</p>
          <p className="font-mono text-[9px] uppercase tracking-wide text-graphite/70">
            {date.toLocaleDateString()} · {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-1 font-mono text-[10px] uppercase tracking-wide text-graphite">
        <div className="flex justify-between">
          <span>Material</span>
          <span className="text-bone/80">{material?.label}</span>
        </div>
        <div className="flex justify-between">
          <span>Sole</span>
          <span className="text-bone/80">{sole?.label}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={onRestore}
          className="flex-1 rounded-full border border-bone py-2 font-mono text-[10px] uppercase tracking-[0.15em] transition hover:bg-bone hover:text-ink"
        >
          Restore
        </button>
        <button
          onClick={onDelete}
          className="rounded-full border border-line-light/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-graphite transition hover:border-bone hover:text-bone"
        >
          Delete
        </button>
      </div>
    </motion.div>
  )
}
