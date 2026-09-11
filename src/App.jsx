import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Layout from './components/Layout'
import Configurator from './pages/Configurator'
import Specification from './pages/Specification'
import Archive from './pages/Archive'
import { ProductProvider } from './context/ProductContext'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <ProductProvider>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Configurator />} />
              <Route path="specification" element={<Specification />} />
              <Route path="archive" element={<Archive />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </ProductProvider>
  )
}
