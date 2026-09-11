import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import BrandPanel from '../components/BrandPanel'
import ControlPanel from '../components/ControlPanel'
import MobileSheet from '../components/MobileSheet'
import CanvasOverlay from '../components/CanvasOverlay'
import { useProduct } from '../context/ProductContext'
import { useCustomModel } from '../hooks/useCustomModel'
import { useArchive } from '../hooks/useArchive'
import { PRODUCT_INFO } from '../data/productConfig'

// The Three.js / R3F scene is the heaviest chunk of the bundle — split
// it out so the shell (header, panels, controls) paints immediately.
const Scene = lazy(() => import('../scene/Scene'))

export default function Configurator() {
  const product = useProduct()
  const customModel = useCustomModel()
  const archive = useArchive()
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleSaveToArchive = () => {
    archive.save(product.config, product.selected)
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1">
        <BrandPanel />

        <main className="relative min-h-0 flex-1">
          <Suspense fallback={<SceneFallback />}>
            <Scene
              config={product.config}
              selected={product.selected}
              customModel={customModel}
              onModelError={customModel.reportLoadError}
            />
          </Suspense>
          <CanvasOverlay viewId={product.config.viewId} onSelectView={product.setView} />
        </main>

        <ControlPanel product={product} customModel={customModel} onSaveToArchive={handleSaveToArchive} />
      </div>

      <MobileSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        product={product}
        customModel={customModel}
        onSaveToArchive={handleSaveToArchive}
      />

      <MobileCustomizeBar onOpen={() => setSheetOpen(true)} />
    </div>
  )
}

function MobileCustomizeBar({ onOpen }) {
  return (
    <motion.div
      className="flex items-center justify-between border-t border-line px-5 py-3 lg:hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-graphite">Total</p>
        <p className="font-display text-lg tracking-tight">${PRODUCT_INFO.price}</p>
      </div>
      <button
        onClick={onOpen}
        className="rounded-full border border-bone px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] transition hover:bg-bone hover:text-ink"
      >
        Customize
      </button>
    </motion.div>
  )
}

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center font-mono text-[11px] uppercase tracking-widest text-graphite">
      Loading render engine…
    </div>
  )
}
