// Central configuration data for the FORMA product customizer.
// Keeping this as data (not scattered literals) makes the UI and the
// 3D scene read from a single source of truth.

export const COLORS = [
  {
    id: 'midnight',
    label: 'Midnight Black',
    code: '#0d0d0e',
    accent: '#232326',
    swatch: '#141416',
  },
  {
    id: 'bone',
    label: 'Bone White',
    code: '#eee8dc',
    accent: '#cfc6b4',
    swatch: '#e8e1d2',
  },
  {
    id: 'crimson',
    label: 'Crimson Red',
    code: '#7a1616',
    accent: '#a3241f',
    swatch: '#8c1c1c',
  },
  {
    id: 'electric',
    label: 'Electric Blue',
    code: '#1049c4',
    accent: '#2f6fe0',
    swatch: '#1554d6',
  },
]

export const MATERIALS = [
  {
    id: 'matte',
    label: 'Matte',
    description: 'Soft-touch synthetic, zero reflection',
    roughness: 0.92,
    metalness: 0.02,
    clearcoat: 0,
  },
  {
    id: 'leather',
    label: 'Leather',
    description: 'Full-grain, hand-burnished',
    roughness: 0.42,
    metalness: 0.05,
    clearcoat: 0.25,
  },
  {
    id: 'metallic',
    label: 'Metallic',
    description: 'Vacuum-plated composite shell',
    roughness: 0.22,
    metalness: 0.85,
    clearcoat: 0.6,
  },
]

export const SOLES = [
  {
    id: 'standard',
    label: 'Standard',
    description: 'Molded EVA, everyday cushioning',
    color: '#eae6dc',
    transparent: false,
    tread: false,
  },
  {
    id: 'performance',
    label: 'Performance',
    description: 'Dual-density, directional tread',
    color: '#181816',
    transparent: false,
    tread: true,
  },
  {
    id: 'transparent',
    label: 'Transparent',
    description: 'Cast polymer, visible core unit',
    color: '#cfe8ea',
    transparent: true,
    tread: false,
  },
]

export const VIEWS = [
  { id: 'front', label: 'Front', position: [0, 0.55, 4.1], target: [0, 0.15, 0] },
  { id: 'side', label: 'Side', position: [4.3, 0.5, 0.2], target: [0, 0.15, 0] },
  { id: 'top', label: 'Top', position: [0.2, 4.6, 0.6], target: [0, 0.1, 0] },
  { id: 'detail', label: 'Detail', position: [1.5, 0.9, 1.6], target: [0.3, 0.25, 0.2] },
]

export const COMPONENTS = [
  { id: 'laces', label: 'Laces', default: true },
  { id: 'stripe', label: 'Side Panel Blade', default: true },
  { id: 'heelTab', label: 'Heel Tab', default: true },
]

export const PRODUCT_INFO = {
  name: 'FORMA 01',
  category: 'Runner — Low',
  edition: 'Studio Configurator',
  price: 340,
  specs: [
    { label: 'Upper', value: 'Engineered composite weave' },
    { label: 'Midsole', value: 'Reactive foam cell, dual density' },
    { label: 'Outsole', value: 'Carbon-rubber traction map' },
    { label: 'Weight', value: '284g · size US 9' },
    { label: 'Origin', value: 'Assembled in Porto, PT' },
  ],
}

export const DEFAULT_CONFIG = {
  colorId: 'midnight',
  materialId: 'matte',
  soleId: 'standard',
  viewId: 'front',
  components: { laces: true, stripe: true, heelTab: true },
}
