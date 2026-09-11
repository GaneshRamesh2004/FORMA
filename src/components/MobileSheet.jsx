import { motion, AnimatePresence } from 'framer-motion'
import { MATERIALS, SOLES } from '../data/productConfig'
import ColorSwatches from './ColorSwatches'
import OptionGroup from './OptionGroup'
import ComponentToggles from './ComponentToggles'
import ConfigSummary from './ConfigSummary'
import ModelUploadPanel from './ModelUploadPanel'

export default function MobileSheet({ open, onClose, product, customModel, onSaveToArchive }) {
  const { config, selected, setColor, setMaterial, setSole, toggleComponent, reset, isDefault } = product
  const hasCustomModel = Boolean(customModel.file)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[82vh] flex-col gap-6 rounded-t-2xl border-t border-line bg-ink px-6 pb-8 pt-4 lg:hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose()
            }}
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-line-light/40" />

            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                Build your own
              </p>
              <button
                onClick={onClose}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite"
              >
                Close
              </button>
            </div>

            <div className="flex-1 space-y-7 overflow-y-auto thin-scroll">
              <fieldset
                disabled={hasCustomModel}
                className={`flex flex-col gap-7 border-0 p-0 transition-opacity ${hasCustomModel ? 'pointer-events-none opacity-30' : ''}`}
              >
                <ColorSwatches activeId={config.colorId} onSelect={setColor} />
                <OptionGroup
                  title="Material"
                  groupKey="m-material"
                  options={MATERIALS}
                  activeId={config.materialId}
                  onSelect={setMaterial}
                />
                <OptionGroup
                  title="Sole"
                  groupKey="m-sole"
                  options={SOLES}
                  activeId={config.soleId}
                  onSelect={setSole}
                />
                <ComponentToggles components={config.components} onToggle={toggleComponent} />
              </fieldset>

              <ModelUploadPanel
                customModel={customModel}
                onUpload={customModel.upload}
                onClear={customModel.clear}
              />

              {!hasCustomModel && (
                <ConfigSummary
                  selected={selected}
                  config={config}
                  onReset={reset}
                  isDefault={isDefault}
                  onSave={onSaveToArchive}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
