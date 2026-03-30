import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock3, CircleCheck, CircleAlert, Filter } from 'lucide-react'
import FakeLoadingScreen from '../components/FakeLoadingScreen'
import FakePaymentGateway from '../components/FakePaymentGateway'
import FeedbackModal from '../components/FeedbackModal'
import Header from '../components/Header'
import { bookings } from '../data/bookings'

function Matches() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState({ open: false, message: '' })
  const [payment, setPayment] = useState({ open: false, amount: 0, title: '', method: 'upi' })
  const [feedback, setFeedback] = useState({ open: false, title: '', message: '' })
  const filterModes = ['All', 'Confirmed', 'Pending']

  const runFakeLoading = (message, callback, duration = 900) => {
    setLoading({ open: true, message })
    setTimeout(() => {
      setLoading({ open: false, message: '' })
      callback?.()
    }, duration)
  }

  const filteredBookings = useMemo(() => {
    if (activeFilter === 'All') {
      return bookings
    }
    return bookings.filter((booking) => booking.status === activeFilter)
  }, [activeFilter])

  const confirmed = bookings.filter((item) => item.status === 'Confirmed').length

  const rotateFilter = () => {
    runFakeLoading('Applying filters...', () => {
      setActiveFilter((prev) => filterModes[(filterModes.indexOf(prev) + 1) % filterModes.length])
    }, 700)
  }

  const openPayment = (booking) => {
    setPayment({
      open: true,
      amount: booking.price,
      title: `Complete ${booking.sport} booking`,
      method: 'upi',
    })
  }

  const completePayment = () => {
    runFakeLoading('Finalizing transaction...', () => {
      setPayment({ open: false, amount: 0, title: '', method: 'upi' })
      setFeedback({
        open: true,
        title: 'Payment Successful',
        message: 'Your booking payment is completed. Invoice has been generated.',
      })
    }, 1200)
  }

  return (
    <main className="space-y-4 pb-3">
      <Header showBrand={false} title="Matches" />

      <section className="grid grid-cols-3 gap-2">
        <article className="rounded-card bg-white p-3 text-center shadow-soft">
          <p className="text-[11px] text-text-secondary">Upcoming</p>
          <p className="text-lg font-bold text-brand-primary">{bookings.length}</p>
        </article>
        <article className="rounded-card bg-white p-3 text-center shadow-soft">
          <p className="text-[11px] text-text-secondary">Confirmed</p>
          <p className="text-lg font-bold text-brand-primary">{confirmed}</p>
        </article>
        <article className="rounded-card bg-white p-3 text-center shadow-soft">
          <p className="text-[11px] text-text-secondary">Total Spend</p>
          <p className="text-lg font-bold text-brand-primary">
            ₹{bookings.reduce((sum, item) => sum + item.price, 0)}
          </p>
        </article>
      </section>

      <button
        type="button"
        onClick={rotateFilter}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-text-primary shadow-soft"
      >
        <Filter size={15} />
        Filter Bookings ({activeFilter})
      </button>

      <section className="space-y-3">
        {filteredBookings.map((booking) => (
          <motion.article
            key={booking.id}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-card bg-white p-4 shadow-soft"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-text-primary">{booking.sport}</h3>
                <p className="text-xs text-text-secondary">{booking.turf}</p>
              </div>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  booking.status === 'Confirmed'
                    ? 'bg-brand-light text-brand-primary'
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                {booking.status === 'Confirmed' ? <CircleCheck size={12} /> : <CircleAlert size={12} />}
                {booking.status}
              </span>
            </div>

            <div className="mt-3 space-y-1.5 text-sm text-text-secondary">
              <p className="flex items-center gap-1.5">
                <Calendar size={14} />
                {booking.date}
              </p>
              <p className="flex items-center gap-1.5">
                <Clock3 size={14} />
                {booking.time}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <p className="text-xs text-text-secondary">Payable</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-text-primary">₹{booking.price}</p>
                <button
                  type="button"
                  onClick={() => openPayment(booking)}
                  className="rounded-full bg-brand-primary px-3 py-1 text-[11px] font-semibold text-white"
                >
                  Pay
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <FakeLoadingScreen open={loading.open} message={loading.message} />
      <FakePaymentGateway
        open={payment.open}
        title={payment.title}
        amount={payment.amount}
        selectedMethod={payment.method}
        onSelectMethod={(method) => setPayment((prev) => ({ ...prev, method }))}
        onClose={() => setPayment({ open: false, amount: 0, title: '', method: 'upi' })}
        onPay={completePayment}
      />
      <FeedbackModal
        open={feedback.open}
        title={feedback.title}
        message={feedback.message}
        onClose={() => setFeedback({ open: false, title: '', message: '' })}
      />
    </main>
  )
}

export default Matches
