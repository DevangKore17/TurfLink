import { motion } from 'framer-motion'
import { CalendarDays, CircleUserRound, Home, Trophy, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', icon: Home, to: '/' },
  { label: 'Matches', icon: Trophy, to: '/matches' },
  { label: 'Matchmaking', icon: Users, to: '/matchmaking', center: true },
  { label: 'Coaching', icon: CalendarDays, to: '/coaching' },
  { label: 'Profile', icon: CircleUserRound, to: '/profile' },
]

function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 h-[70px] w-full max-w-[420px] -translate-x-1/2 border-t border-slate-100 bg-white px-4 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <ul className="flex h-full items-center justify-between">
        {navItems.map((item) => {
          if (item.center) {
            return (
              <li key={item.to} className="-mt-8">
                <NavLink to={item.to}>
                  {({ isActive }) => (
                    <motion.div whileTap={{ scale: 0.97 }}>
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-soft ${
                          isActive ? 'bg-brand-primary text-white' : 'bg-brand-secondary text-white'
                        }`}
                      >
                        <item.icon size={24} />
                      </div>
                    </motion.div>
                  )}
                </NavLink>
              </li>
            )
          }

          return (
            <li key={item.to}>
              <NavLink to={item.to}>
                {({ isActive }) => (
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <div className="flex min-w-[58px] flex-col items-center gap-1">
                      <item.icon size={19} className={isActive ? 'text-brand-primary' : 'text-slate-400'} />
                      <span
                        className={`text-[11px] font-medium ${
                          isActive ? 'text-brand-primary' : 'text-slate-400'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </motion.div>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BottomNavigation
