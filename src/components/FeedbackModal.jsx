import { AnimatePresence, motion } from 'framer-motion'
import { CircleCheckBig, X } from 'lucide-react'

function FeedbackModal({ open, title, message, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-[320px] rounded-card bg-white p-5 shadow-soft"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="flex items-start justify-between">
              <CircleCheckBig className="text-brand-primary" size={26} />
              <button
                type="button"
                onClick={onClose}
                className="text-text-secondary"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <h3 className="mt-3 text-base font-semibold text-text-primary">{title}</h3>
            <p className="mt-1 text-sm text-text-secondary">{message}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 h-10 w-full rounded-button bg-brand-primary text-sm font-semibold text-white"
            >
              Done
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default FeedbackModal
