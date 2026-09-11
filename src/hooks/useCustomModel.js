import { useCallback, useEffect, useRef, useState } from 'react'

const ACCEPTED_EXT = ['.glb', '.gltf']
const MAX_BYTES = 40 * 1024 * 1024 // 40MB

/**
 * Manages an uploaded GLB/GLTF file: validates it, creates/revokes the
 * object URL used to load it into the scene, and tracks load errors so
 * the UI can surface them and fall back to the procedural model.
 */
export function useCustomModel() {
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState(null)
  const [error, setError] = useState(null)
  const urlRef = useRef(null)

  useEffect(() => () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
  }, [])

  const upload = useCallback((selectedFile) => {
    setError(null)

    if (!selectedFile) return

    const name = selectedFile.name.toLowerCase()
    const validExt = ACCEPTED_EXT.some((ext) => name.endsWith(ext))
    if (!validExt) {
      setError('Unsupported file type — please upload a .glb or .gltf file.')
      return
    }
    if (selectedFile.size > MAX_BYTES) {
      setError('File is too large — please keep uploads under 40MB.')
      return
    }

    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    const objectUrl = URL.createObjectURL(selectedFile)
    urlRef.current = objectUrl

    setFile(selectedFile)
    setUrl(objectUrl)
  }, [])

  const clear = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current)
      urlRef.current = null
    }
    setFile(null)
    setUrl(null)
    setError(null)
  }, [])

  const reportLoadError = useCallback((message) => {
    setError(message || 'Could not load this model — reverting to FORMA 01.')
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current)
      urlRef.current = null
    }
    setFile(null)
    setUrl(null)
  }, [])

  return { file, url, error, upload, clear, reportLoadError }
}
