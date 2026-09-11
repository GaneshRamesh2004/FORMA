import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Configurator', end: true },
  { to: '/specification', label: 'Specification' },
  { to: '/archive', label: 'Archive' },
]

export default function Header() {
  return (
    <header className="relative z-30 flex items-center justify-between border-b border-line px-5 py-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavLink to="/" className="flex items-center gap-2.5">
          <img src="/logo-dark.jpg" alt="FORMA Logo" className="h-7 w-7 rounded border border-line-light/30 object-cover shadow-sm" />
          <span className="font-display text-lg tracking-tight md:text-xl">FORMA</span>
          <span className="font-mono text-[9px] text-graphite">01</span>
        </NavLink>
      </motion.div>

      <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite md:flex">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `transition hover:text-bone ${isActive ? 'text-bone' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite sm:flex">
        <span className="rec-dot h-1.5 w-1.5 rounded-full bg-accent" />
        Live render
      </div>

      <MobileNav />
    </header>
  )
}

function MobileNav() {
  return (
    <nav className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-graphite md:hidden">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) => (isActive ? 'text-bone' : 'transition hover:text-bone')}
        >
          {link.label.slice(0, 4)}
        </NavLink>
      ))}
    </nav>
  )
}
