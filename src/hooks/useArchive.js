import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'forma.archive.v1'

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeStore(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // storage unavailable (private browsing, quota, etc.) — fail silently
  }
}

/**
 * Persists saved product configurations to localStorage so the Archive
 * page can list, restore, and delete past designs across sessions.
 */
export function useArchive() {
  const [entries, setEntries] = useState(() => readStore())

  useEffect(() => {
    writeStore(entries)
  }, [entries])

  const save = useCallback((config, selected) => {
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      config,
      label: `${selected.color.label} · ${selected.material.label}`,
      swatch: selected.color.swatch,
      accent: selected.color.accent,
    }
    setEntries((prev) => [entry, ...prev].slice(0, 24))
    return entry
  }, [])

  const remove = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const clear = useCallback(() => setEntries([]), [])

  return { entries, save, remove, clear }
}
