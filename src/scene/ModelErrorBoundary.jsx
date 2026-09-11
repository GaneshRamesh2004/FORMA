import { Component } from 'react'

/**
 * Catches failed GLTF loads (Suspense alone won't catch a rejected
 * loader promise). Mount a fresh instance per upload by passing
 * `key={url}` from the parent — that's the idiomatic React way to
 * reset boundary state, instead of diffing props in the boundary itself.
 */
export default class ModelErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    this.props.onError?.(
      'Could not load this model — the file may be corrupted or unsupported.',
    )
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('[FORMA] model load error:', error)
    }
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}
