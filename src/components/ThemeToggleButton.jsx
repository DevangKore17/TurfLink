import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

function ThemeToggleButton({ label = true, className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-text-primary shadow-soft ${className}`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
      {label ? (isDark ? 'Light Mode' : 'Dark Mode') : null}
    </button>
  )
}

export default ThemeToggleButton
