import { motion } from 'framer-motion'
import { MATERIALS, SOLES } from '../data/productConfig'
import ColorSwatches from './ColorSwatches'
import OptionGroup from './OptionGroup'
import ComponentToggles from './ComponentToggles'
import ConfigSummary from './ConfigSummary'
import ModelUploadPanel from './ModelUploadPanel'

export default function ControlPanel({ product, customModel, onSaveToArchive }) {
  const { config, selected, setColor, setMaterial, setSole, toggleComponent, reset, isDefault } = product
  const hasCustomModel = Boolean(customModel.file)

  return (
    <motion.aside
      className="hidden w-[340px] shrink-0 flex-col gap-7 overflow-y-auto border-l border-line px-7 py-10 lg:flex thin-scroll"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 0.6 }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
        Build your own — 05 steps
      </p>

      <fieldset
        disabled={hasCustomModel}
        className={`flex flex-col gap-7 border-0 p-0 transition-opacity ${hasCustomModel ? 'pointer-events-none opacity-30' : ''}`}
      >
        <ColorSwatches activeId={config.colorId} onSelect={setColor} />

        <OptionGroup
          title="Material"
          groupKey="material"
          options={MATERIALS}
          activeId={config.materialId}
          onSelect={setMaterial}
        />

        <OptionGroup
          title="Sole"
          groupKey="sole"
          options={SOLES}
          activeId={config.soleId}
          onSelect={setSole}
        />

        <ComponentToggles components={config.components} onToggle={toggleComponent} />
      </fieldset>

      <ModelUploadPanel customModel={customModel} onUpload={customModel.upload} onClear={customModel.clear} />

      {!hasCustomModel && (
        <ConfigSummary
          selected={selected}
          config={config}
          onReset={reset}
          isDefault={isDefault}
          onSave={onSaveToArchive}
        />
      )}
    </motion.aside>
  )
}
