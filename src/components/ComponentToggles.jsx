import { COMPONENTS } from '../data/productConfig'

export default function ComponentToggles({ components, onToggle }) {
  return (
    <div>
      <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
        Components
      </p>
      <div className="space-y-0 border-t border-line/60">
        {COMPONENTS.map((c) => {
          const on = components[c.id]
          return (
            <button
              key={c.id}
              onClick={() => onToggle(c.id)}
              className="flex w-full items-center justify-between border-b border-line/60 py-3 text-left"
            >
              <span className="font-body text-[13px] text-bone/90">{c.label}</span>
              <span
                className={`relative h-4 w-8 rounded-full border transition-colors ${
                  on ? 'border-accent bg-accent/30' : 'border-line-light/40 bg-transparent'
                }`}
              >
                <span
                  className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-all ${
                    on ? 'left-[17px] bg-accent' : 'left-[3px] bg-graphite'
                  }`}
                />
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
