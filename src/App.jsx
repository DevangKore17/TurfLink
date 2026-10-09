import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import BottomNavigation from './components/BottomNavigation'
import Coaching from './pages/Coaching'
import Home from './pages/Home'
import Matches from './pages/Matches'
import Matchmaking from './pages/Matchmaking'
import Settings from './pages/Settings'

// TurfLink use case:
// This app supports sports players and teams in discovering turfs, finding match partners,
// tracking bookings, and accessing coaching services from a single mobile-friendly experience.
// The navigation acts as the central flow for booking and community engagement.

function App() {
  const location = useLocation()

  return (
    <div className="mobile-shell">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
        >
          <Routes location={location}>
            {/* Home: landing page for turf discovery and quick booking access. */}
            <Route path="/" element={<Home />} />

            {/* Matchmaking: helps users find teammates or opponents for upcoming games. */}
            <Route path="/matchmaking" element={<Matchmaking />} />

            {/* Profile/Settings: manages user preferences and account-related actions. */}
            <Route path="/profile" element={<Settings />} />

            {/* Matches: shows scheduled or recent game activity and ongoing match status. */}
            <Route path="/matches" element={<Matches />} />

            {/* Coaching: gives access to coaching options and athlete development services. */}
            <Route path="/coaching" element={<Coaching />} />

            {/* Fallback route: redirect any unknown route back to the home screen. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <BottomNavigation />
    </div>
  )
}

export default App
