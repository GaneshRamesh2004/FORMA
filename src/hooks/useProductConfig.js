import { useCallback, useMemo, useState } from 'react'
import { COLORS, MATERIALS, SOLES, VIEWS, DEFAULT_CONFIG } from '../data/productConfig'

/**
 * Owns the full customization state for the product and exposes
 * setters + derived lookups. Kept as a single hook so the scene and
 * the control panel always read from the same state shape.
 */
export function useProductConfig() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [history, setHistory] = useState([])

  const update = useCallback((patch) => {
    setConfig((prev) => {
      setHistory((h) => [...h, prev].slice(-20))
      return { ...prev, ...patch }
    })
  }, [])

  const loadConfig = useCallback((nextConfig) => {
    setConfig((prev) => {
      setHistory((h) => [...h, prev].slice(-20))
      return { ...nextConfig, components: { ...nextConfig.components } }
    })
  }, [])

  const setColor = useCallback((colorId) => update({ colorId }), [update])
  const setMaterial = useCallback((materialId) => update({ materialId }), [update])
  const setSole = useCallback((soleId) => update({ soleId }), [update])
  const setView = useCallback((viewId) => update({ viewId }), [update])

  const toggleComponent = useCallback((id) => {
    setConfig((prev) => ({
      ...prev,
      components: { ...prev.components, [id]: !prev.components[id] },
    }))
  }, [])

  const reset = useCallback(() => {
    setHistory((h) => [...h, config].slice(-20))
    setConfig(DEFAULT_CONFIG)
  }, [config])

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h
      const prev = h[h.length - 1]
      setConfig(prev)
      return h.slice(0, -1)
    })
  }, [])

  const selected = useMemo(() => ({
    color: COLORS.find((c) => c.id === config.colorId),
    material: MATERIALS.find((m) => m.id === config.materialId),
    sole: SOLES.find((s) => s.id === config.soleId),
    view: VIEWS.find((v) => v.id === config.viewId),
  }), [config])

  const isDefault = useMemo(
    () => JSON.stringify(config) === JSON.stringify(DEFAULT_CONFIG),
    [config],
  )

  return {
    config,
    selected,
    setColor,
    setMaterial,
    setSole,
    setView,
    toggleComponent,
    reset,
    undo,
    loadConfig,
    canUndo: history.length > 0,
    isDefault,
  }
}
