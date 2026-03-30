import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import BottomNavigation from './components/BottomNavigation'
import Coaching from './pages/Coaching'
import Home from './pages/Home'
import Matches from './pages/Matches'
import Matchmaking from './pages/Matchmaking'
import Settings from './pages/Settings'

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
            <Route path="/" element={<Home />} />
            <Route path="/matchmaking" element={<Matchmaking />} />
            <Route path="/profile" element={<Settings />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <BottomNavigation />
    </div>
  )
}

export default App
