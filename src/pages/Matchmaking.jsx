import { useState } from 'react'
import { ChevronDown, Search, Sparkles } from 'lucide-react'
import FakeLoadingScreen from '../components/FakeLoadingScreen'
import FakePaymentGateway from '../components/FakePaymentGateway'
import FeedbackModal from '../components/FeedbackModal'
import Header from '../components/Header'
import MatchCard from '../components/MatchCard'
import { matches } from '../data/matches'

const locationOptions = ['Chennai', 'Bengaluru', 'Hyderabad']
const timeOptions = ['This Week', 'Today', 'This Weekend']
const playerDirectory = [
  { name: 'Aditya Kumar', skill: 'Football - Striker', distance: '2.1 km' },
  { name: 'Rohan Jain', skill: 'Football - Midfielder', distance: '3.4 km' },
  { name: 'Meera Ravi', skill: 'Badminton - Advanced', distance: '1.8 km' },
  { name: 'Vikram N', skill: 'Cricket - All Rounder', distance: '4.2 km' },
]

function Matchmaking() {
  const [activeTab, setActiveTab] = useState('Teams Needed')
  const [locationIndex, setLocationIndex] = useState(0)
  const [timeIndex, setTimeIndex] = useState(0)
  const [playerQuery, setPlayerQuery] = useState('')
  const [playerResults, setPlayerResults] = useState([])
  const [generatedResult, setGeneratedResult] = useState('')
  const [loading, setLoading] = useState({ open: false, message: '' })
  const [payment, setPayment] = useState({ open: false, amount: 0, title: '', method: 'upi' })
  const [feedback, setFeedback] = useState({ open: false, title: '', message: '' })

  const runFakeLoading = (message, callback, duration = 1000) => {
    setLoading({ open: true, message })
    setTimeout(() => {
      setLoading({ open: false, message: '' })
      callback?.()
    }, duration)
  }

  const rotateLocation = () => {
    runFakeLoading('Updating location filters...', () => {
      setLocationIndex((prev) => (prev + 1) % locationOptions.length)
    }, 700)
  }

  const rotateTime = () => {
    runFakeLoading('Refreshing available slots...', () => {
      setTimeIndex((prev) => (prev + 1) % timeOptions.length)
    }, 700)
  }

  const searchPlayers = () => {
    runFakeLoading('Searching players nearby...', () => {
      const keyword = playerQuery.trim().toLowerCase()
      const results = playerDirectory.filter(
        (player) =>
          keyword.length === 0 ||
          player.name.toLowerCase().includes(keyword) ||
          player.skill.toLowerCase().includes(keyword),
      )
      setPlayerResults(results)
    }, 900)
  }

  const generateMatchmaking = () => {
    runFakeLoading('Running TurfLink matchmaking engine...', () => {
      setGeneratedResult(
        `Matched 6 players in ${locationOptions[locationIndex]} for ${timeOptions[timeIndex].toLowerCase()}.`,
      )
    }, 1200)
  }

  const handleJoinMatch = (match) => {
    runFakeLoading('Reserving your spot...', () => {
      setPayment({
        open: true,
        amount: match.price,
        title: `${match.cta} - ${match.sport}`,
        method: 'upi',
      })
    })
  }

  const completePayment = () => {
    runFakeLoading('Verifying payment...', () => {
      setPayment({ open: false, amount: 0, title: '', method: 'upi' })
      setFeedback({
        open: true,
        title: 'Spot Confirmed',
        message: 'You are now part of the match. Team details are available under Matches.',
      })
    }, 1300)
  }

  return (
    <main className="space-y-4 pb-3">
      <Header showBrand={false} title="Matchmaking" />

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={rotateLocation}
          className="flex h-10 items-center justify-between rounded-full bg-white px-4 text-sm font-medium text-text-primary shadow-soft"
        >
          {locationOptions[locationIndex]}
          <ChevronDown size={16} className="text-text-secondary" />
        </button>

        <button
          type="button"
          onClick={rotateTime}
          className="flex h-10 items-center justify-between rounded-full bg-white px-4 text-sm font-medium text-text-primary shadow-soft"
        >
          {timeOptions[timeIndex]}
          <ChevronDown size={16} className="text-text-secondary" />
        </button>
      </div>

      <p className="text-sm font-semibold text-brand-primary">6 New Matches Found</p>

      <div className="grid grid-cols-2 rounded-full bg-white p-1 shadow-soft">
        {['Teams Needed', 'Open Bookings'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`h-9 rounded-full text-xs font-semibold transition ${
              activeTab === tab ? 'bg-brand-primary text-white' : 'text-text-secondary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <section className="rounded-card bg-white p-4 shadow-soft">
        <p className="text-sm font-semibold text-text-primary">Search Players</p>
        <div className="mt-2 flex gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              value={playerQuery}
              onChange={(event) => setPlayerQuery(event.target.value)}
              placeholder="Search by player name or skill"
              className="h-10 w-full rounded-full bg-app-muted pl-9 pr-3 text-xs text-text-primary outline-none"
            />
          </div>
          <button
            type="button"
            onClick={searchPlayers}
            className="rounded-full bg-brand-primary px-4 text-xs font-semibold text-white"
          >
            Search
          </button>
        </div>

        {playerResults.length > 0 ? (
          <div className="mt-3 space-y-2">
            {playerResults.map((player) => (
              <div key={player.name} className="rounded-card bg-slate-50 px-3 py-2">
                <p className="text-xs font-semibold text-text-primary">{player.name}</p>
                <p className="text-[11px] text-text-secondary">
                  {player.skill} • {player.distance}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <button
        type="button"
        onClick={generateMatchmaking}
        className="flex h-10 w-full items-center justify-center gap-1 rounded-full bg-brand-primary text-sm font-semibold text-white"
      >
        <Sparkles size={14} />
        Generate Matchmaking
      </button>

      {generatedResult ? (
        <p className="rounded-card bg-brand-light p-3 text-xs font-semibold text-brand-primary">{generatedResult}</p>
      ) : null}

      <div className="space-y-3">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} onAction={handleJoinMatch} />
        ))}
      </div>

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

export default Matchmaking
