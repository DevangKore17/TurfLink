import { AnimatePresence, motion } from 'framer-motion'
import { CreditCard, Landmark, Wallet } from 'lucide-react'

const methods = [
  { id: 'upi', name: 'UPI', icon: Wallet },
  { id: 'card', name: 'Card', icon: CreditCard },
  { id: 'netbanking', name: 'Net Banking', icon: Landmark },
]

function FakePaymentGateway({ open, title, amount, selectedMethod, onSelectMethod, onClose, onPay }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full rounded-t-[24px] bg-white p-5 shadow-soft"
            initial={{ y: 320 }}
            animate={{ y: 0 }}
            exit={{ y: 320 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-slate-200" />
            <h3 className="text-base font-semibold text-text-primary">{title || 'Complete Payment'}</h3>
            <p className="mt-1 text-xs text-text-secondary">This is a fake payment gateway for demo purposes.</p>

            <div className="mt-4 space-y-2">
              {methods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => onSelectMethod(method.id)}
                  className={`flex w-full items-center justify-between rounded-card border px-3 py-3 text-sm transition ${
                    selectedMethod === method.id
                      ? 'border-brand-primary bg-brand-light/50 text-brand-primary'
                      : 'border-slate-200 bg-white text-text-primary'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <method.icon size={16} />
                    {method.name}
                  </span>
                  <span className="text-xs font-semibold">{selectedMethod === method.id ? 'Selected' : 'Select'}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-card bg-slate-50 px-3 py-3">
              <span className="text-xs text-text-secondary">Amount  </span>
              <span className="text-base font-semibold text-text-primary">₹{amount}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-11 rounded-button border border-slate-200 bg-white text-sm font-semibold text-text-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onPay}
                className="h-11 rounded-button bg-brand-primary text-sm font-semibold text-white"
              >
                Pay Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default FakePaymentGateway
