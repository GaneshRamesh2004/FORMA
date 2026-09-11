import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-ink text-bone">
      <Header />
      <div className="min-h-0 flex-1 overflow-y-auto thin-scroll">
        <Outlet />
      </div>
    </div>
  )
}
