import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ModelUploadPanel({ customModel, onUpload, onClear }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = (fileList) => {
    const f = fileList?.[0]
    if (f) onUpload(f)
  }

  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          Custom model
        </p>
        {customModel.file && (
          <button
            onClick={onClear}
            className="font-mono text-[10px] uppercase tracking-wide text-graphite transition hover:text-bone"
          >
            Remove
          </button>
        )}
      </div>

      {customModel.file ? (
        <div className="flex items-center justify-between gap-3 border border-line-light/40 px-3 py-2.5">
          <div className="min-w-0">
            <p className="truncate font-body text-[13px] text-bone/90">{customModel.file.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-wide text-graphite/70">
              {(customModel.file.size / 1024 / 1024).toFixed(1)}MB · loaded in viewer
            </p>
          </div>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleFiles(e.dataTransfer.files)
          }}
          className={`flex w-full flex-col items-center gap-1.5 border border-dashed px-4 py-6 text-center transition ${
            dragOver ? 'border-accent bg-accent/5' : 'border-line-light/40 hover:border-bone/50'
          }`}
        >
          <span className="font-body text-[13px] text-bone/85">
            Drop a .glb / .gltf file, or click to browse
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide text-graphite/70">
            Replaces the preview model · up to 40MB
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <AnimatePresence>
        {customModel.error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-wide text-accent-soft"
          >
            {customModel.error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
