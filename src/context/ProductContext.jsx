import { createContext, useContext } from 'react'
import { useProductConfig } from '../hooks/useProductConfig'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const product = useProductConfig()
  return <ProductContext.Provider value={product}>{children}</ProductContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProduct() {
  const ctx = useContext(ProductContext)
  if (!ctx) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return ctx
}
