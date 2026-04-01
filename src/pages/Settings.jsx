import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil } from 'lucide-react'
import FakeLoadingScreen from '../components/FakeLoadingScreen'
import FeedbackModal from '../components/FeedbackModal'
import Header from '../components/Header'
import SettingsItem from '../components/SettingsItem'
import { useTheme } from '../context/ThemeContext'
import { settingsGroups } from '../data/settings'

function Settings() {
  const { isDark, toggleTheme } = useTheme()
  const [loading, setLoading] = useState({ open: false, message: '' })
  const [feedback, setFeedback] = useState({ open: false, title: '', message: '' })

  const runFakeLoading = (message, callback, duration = 850) => {
    setLoading({ open: true, message })
    setTimeout(() => {
      setLoading({ open: false, message: '' })
      callback?.()
    }, duration)
  }

  const showMessage = (title, message) => setFeedback({ open: true, title, message })

  const handleEditProfile = () => {
    runFakeLoading('Loading profile editor...', () => {
      showMessage('Profile Updated', 'Your profile details have been saved successfully.')
    })
  }

  const handleSettingsAction = (item) => {
    if (item.id === 'appearance') {
      toggleTheme()
      showMessage('Theme Updated', `App switched to ${item.enabled ? 'dark' : 'light'} mode.`)
      return
    }

    if (item.type === 'toggle') {
      showMessage(
        item.label,
        `${item.label} is now ${item.enabled ? 'enabled' : 'disabled'} for this demo account.`,
      )
      return
    }

    runFakeLoading(`Opening ${item.label}...`, () => {
      showMessage(item.label, `${item.label} settings opened in demo mode.`)
    }, 650)
  }

  const handleLogout = () => {
    runFakeLoading('Signing out securely...', () => {
      showMessage('Logged Out', 'You have been logged out from the TurfLink demo account.')
    }, 1100)
  }

  return (
    <main className="space-y-4 pb-3">
      <Header showBrand={false} title="Settings" />

      <section className="rounded-card bg-white p-4 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-light text-lg font-bold text-brand-primary">
            S
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-text-primary">Surya</h2>
            <p className="text-xs text-text-secondary">+91 98765 43210</p>
            <p className="text-xs text-text-secondary">surya28@example.com</p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={handleEditProfile}
          className="mt-4 inline-flex items-center gap-1 rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-white"
        >
          <Pencil size={14} />
          Edit Profile
        </motion.button>
      </section>

      {settingsGroups.map((group) => (
        <section key={group.title} className="space-y-2">
          <h3 className="text-xs font-semibold tracking-[0.08em] text-text-secondary">{group.title}</h3>
          <div className="rounded-card bg-white px-4 shadow-soft">
            {group.items.map((item) => (
              <SettingsItem
                key={item.id}
                item={item}
                onAction={handleSettingsAction}
                enabled={item.id === 'appearance' ? isDark : undefined}
              />
            ))}
          </div>
        </section>
      ))}

      <button
        type="button"
        onClick={handleLogout}
        className="w-full rounded-button bg-white py-3 text-sm font-semibold text-red-500 shadow-soft"
      >
        Log Out
      </button>

      <FakeLoadingScreen open={loading.open} message={loading.message} />
      <FeedbackModal
        open={feedback.open}
        title={feedback.title}
        message={feedback.message}
        onClose={() => setFeedback({ open: false, title: '', message: '' })}
      />
    </main>
  )
}

export default Settings
