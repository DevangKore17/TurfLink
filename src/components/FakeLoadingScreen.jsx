import { motion, AnimatePresence } from 'framer-motion'
import { LoaderCircle } from 'lucide-react'

function FakeLoadingScreen({ open, message = 'Processing...' }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/35 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-[320px] rounded-card bg-white p-5 text-center shadow-soft"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
          >
            <LoaderCircle className="mx-auto animate-spin text-brand-primary" size={30} />
            <p className="mt-3 text-sm font-semibold text-text-primary">{message}</p>
            <p className="mt-1 text-xs text-text-secondary">Please wait, this is a simulated flow.</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default FakeLoadingScreen
