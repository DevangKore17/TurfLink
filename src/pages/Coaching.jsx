import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles } from 'lucide-react'
import FakeLoadingScreen from '../components/FakeLoadingScreen'
import FakePaymentGateway from '../components/FakePaymentGateway'
import FeedbackModal from '../components/FeedbackModal'
import Header from '../components/Header'
import { coaches } from '../data/coaches'

function Coaching() {
  const [loading, setLoading] = useState({ open: false, message: '' })
  const [payment, setPayment] = useState({ open: false, amount: 0, title: '', method: 'upi' })
  const [feedback, setFeedback] = useState({ open: false, title: '', message: '' })

  const runFakeLoading = (message, callback, duration = 900) => {
    setLoading({ open: true, message })
    setTimeout(() => {
      setLoading({ open: false, message: '' })
      callback?.()
    }, duration)
  }

  const handleBookCoach = (coach) => {
    runFakeLoading(`Checking available slots for ${coach.name}...`, () => {
      setPayment({
        open: true,
        amount: coach.fee,
        title: `Book session with ${coach.name}`,
        method: 'upi',
      })
    })
  }

  const completePayment = () => {
    runFakeLoading('Confirming coaching session...', () => {
      setPayment({ open: false, amount: 0, title: '', method: 'upi' })
      setFeedback({
        open: true,
        title: 'Session Booked',
        message: 'Your coaching slot is reserved. Session details are available in Matches.',
      })
    }, 1200)
  }

  return (
    <main className="space-y-4 pb-3">
      <Header showBrand={false} title="Coaching" />

      <section className="rounded-banner bg-gradient-to-r from-[#3FA34D] to-[#2E7D32] p-4 text-white shadow-soft">
        <p className="text-xs uppercase tracking-[0.1em] text-white/80">Coaching Pass</p>
        <h2 className="mt-1 text-lg font-semibold">Level up your game this week</h2>
        <p className="mt-1 text-xs text-white/90">Book 3 sessions and unlock 20% off on your next class.</p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <article className="rounded-card bg-white p-3 shadow-soft">
          <p className="text-[11px] text-text-secondary">Top Rated</p>
          <p className="text-lg font-bold text-brand-primary">4.8+</p>
        </article>
        <article className="rounded-card bg-white p-3 shadow-soft">
          <p className="text-[11px] text-text-secondary">Active Coaches</p>
          <p className="text-lg font-bold text-brand-primary">24</p>
        </article>
      </section>

      <section className="space-y-3">
        {coaches.map((coach) => (
          <motion.article
            key={coach.id}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-card bg-white p-3 shadow-soft"
          >
            <div className="flex gap-3">
              <img
                src={coach.image}
                alt={coach.name}
                className="h-[84px] w-[84px] rounded-card object-cover"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">{coach.name}</h3>
                    <p className="text-xs text-text-secondary">{coach.sport} Coach</p>
                  </div>
                  <span className="rounded-full bg-brand-light px-2 py-1 text-[10px] font-semibold text-brand-primary">
                    {coach.badge}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-text-secondary">
                  <p className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500" />
                    {coach.rating}
                  </p>
                  <p>{coach.sessions}</p>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-text-primary">₹{coach.fee}/session</p>
                  <button
                    type="button"
                    onClick={() => handleBookCoach(coach)}
                    className="inline-flex items-center gap-1 rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    <Sparkles size={12} />
                    Book
                  </button>
                </div>
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

export default Coaching
