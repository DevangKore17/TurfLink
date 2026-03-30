import { useMemo, useState } from 'react'
import { Search, MapPin, Trophy, Shield, Dumbbell, Star, Target, Sparkles } from 'lucide-react'
import BannerCard from '../components/BannerCard'
import CategoryCard from '../components/CategoryCard'
import FakeLoadingScreen from '../components/FakeLoadingScreen'
import FakePaymentGateway from '../components/FakePaymentGateway'
import FeedbackModal from '../components/FeedbackModal'
import Header from '../components/Header'
import TurfCard from '../components/TurfCard'
import { categories } from '../data/categories'
import { turfs } from '../data/turfs'

const iconMap = {
  Cricket: Trophy,
  Football: Target,
  Badminton: Shield,
  Basketball: Star,
  Volleyball: Dumbbell,
}

function Home() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState({ open: false, message: '' })
  const [payment, setPayment] = useState({ open: false, amount: 0, title: '', method: 'upi' })
  const [feedback, setFeedback] = useState({ open: false, title: '', message: '' })

  const filteredTurfs = useMemo(() => {
    const lower = query.trim().toLowerCase()
    return turfs.filter((turf) => {
      const queryMatch =
        lower.length === 0 ||
        turf.name.toLowerCase().includes(lower) ||
        turf.distance.toLowerCase().includes(lower)
      const categoryMatch = selectedCategory === 'all' || turf.sport === selectedCategory
      return queryMatch && categoryMatch
    })
  }, [query, selectedCategory])

  const runFakeLoading = (message, callback, duration = 1000) => {
    setLoading({ open: true, message })
    setTimeout(() => {
      setLoading({ open: false, message: '' })
      callback?.()
    }, duration)
  }

  const openPayment = (amount, title) => {
    setPayment({ open: true, amount, title, method: 'upi' })
  }

  const handleBookTurf = (turf) => {
    runFakeLoading('Checking available slots...', () => {
      openPayment(turf.price, `Book ${turf.name}`)
    })
  }

  const completePayment = () => {
    runFakeLoading('Processing payment...', () => {
      setPayment({ open: false, amount: 0, title: '', method: 'upi' })
      setFeedback({
        open: true,
        title: 'Booking Confirmed',
        message: 'Your booking is confirmed. TurfLink pass has been emailed to you.',
      })
    }, 1400)
  }

  const handleBannerCta = () => {
    runFakeLoading('Loading offer details...', () => {
      setFeedback({
        open: true,
        title: 'Special Offer Unlocked',
        message: 'Use code BAT40 at checkout to get up to 40% off on eligible slots.',
      })
    }, 900)
  }

  const handleFinderAction = (mode) => {
    runFakeLoading(mode === 'join' ? 'Matching players...' : 'Searching bookings...', () => {
      setFeedback({
        open: true,
        title: mode === 'join' ? '3 Players Found' : '5 Open Bookings Found',
        message:
          mode === 'join'
            ? 'You have 3 compatible football players ready to join now.'
            : 'Showing nearby public bookings that can be joined instantly.',
      })
    }, 1200)
  }

  return (
    <main className="space-y-5 pb-3">
      <Header />

      <div className="relative h-11">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for sports, turfs, matches..."
          className="h-full w-full rounded-full bg-[#EEF3F0] pl-11 pr-4 text-sm text-text-secondary outline-none"
        />
      </div>

      <section className="space-y-1">
        <h2 className="text-2xl font-bold text-text-primary">Hello, Surya 👋</h2>
        <p className="flex items-center gap-1.5 text-sm text-text-secondary">
          <MapPin size={14} />
          Chennai
        </p>
      </section>

      <BannerCard onViewDetails={handleBannerCta} />

      <section className="space-y-3">
        <h3 className="section-title">Popular Categories</h3>
        <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`h-[80px] w-[80px] flex-shrink-0 rounded-card text-xs font-semibold shadow-soft transition hover:-translate-y-[2px] ${
              selectedCategory === 'all' ? 'bg-brand-primary text-white' : 'bg-white text-text-primary'
            }`}
          >
            All
          </button>
          {categories.map((item) => (
            <CategoryCard
              key={item.id}
              name={item.name}
              bg={item.bg}
              icon={iconMap[item.icon] || Trophy}
              active={selectedCategory === item.name}
              onClick={() => setSelectedCategory(item.name)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="section-title">Nearby Turfs</h3>
        <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
          {filteredTurfs.length > 0 ? (
            filteredTurfs.map((turf) => <TurfCard key={turf.id} turf={turf} onBook={handleBookTurf} />)
          ) : (
            <div className="w-full rounded-card bg-white p-4 text-sm text-text-secondary shadow-soft">
              No matching turfs found.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="section-title">Match Finder</h3>
        <div className="grid grid-cols-2 gap-3">
          <article className="flex h-[120px] flex-col justify-between rounded-card bg-white p-4 shadow-soft transition hover:-translate-y-[2px]">
            <div>
              <p className="text-sm font-semibold text-text-primary">Matched Players</p>
              <p className="mt-1 text-xs text-text-secondary">3 Players Matched for Football</p>
            </div>
            <button
              type="button"
              onClick={() => handleFinderAction('join')}
              className="w-fit rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-primary"
            >
              Join Match
            </button>
          </article>

          <article className="flex h-[120px] flex-col justify-between rounded-card bg-white p-4 shadow-soft transition hover:-translate-y-[2px]">
            <div>
              <p className="text-sm font-semibold text-text-primary">Search Bookings</p>
              <p className="mt-1 text-xs text-text-secondary">Find and join ongoing turf bookings</p>
            </div>
            <button
              type="button"
              onClick={() => handleFinderAction('explore')}
              className="w-fit rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-primary"
            >
              Explore
            </button>
          </article>
        </div>
      </section>

      <section className="rounded-card bg-white p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-text-primary">Quick Player Search</p>
            <p className="mt-1 text-xs text-text-secondary">Try finding nearby players instantly.</p>
          </div>
          <button
            type="button"
            onClick={() => handleFinderAction('join')}
            className="inline-flex items-center gap-1 rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-white"
          >
            <Sparkles size={12} />
            Search
          </button>
        </div>
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

export default Home
