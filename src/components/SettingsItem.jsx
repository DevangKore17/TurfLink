import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

function SettingsItem({ item, onAction, enabled: enabledOverride }) {
  const [enabled, setEnabled] = useState(Boolean(item.enabled))
  const isControlledToggle = item.type === 'toggle' && typeof enabledOverride === 'boolean'
  const currentEnabled = isControlledToggle ? enabledOverride : enabled

  useEffect(() => {
    setEnabled(Boolean(item.enabled))
  }, [item.enabled])

  const handleClick = () => {
    if (item.type === 'toggle') {
      const nextValue = !currentEnabled
      if (!isControlledToggle) {
        setEnabled(nextValue)
      }
      onAction?.({ ...item, enabled: nextValue })
      return
    }

    onAction?.(item)
  }

  return (
    <button
      type="button"
      className="flex w-full items-center justify-between border-b border-slate-100 py-3 last:border-b-0"
      onClick={handleClick}
    >
      <span className="text-sm font-medium text-text-primary">{item.label}</span>

      {item.type === 'toggle' ? (
        <span
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
            currentEnabled ? 'bg-brand-primary' : 'bg-slate-300'
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
              currentEnabled ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </span>
      ) : (
        <span className="flex items-center gap-2 text-xs text-text-secondary">
          {item.value ? item.value : null}
          <ChevronRight size={16} />
        </span>
      )}
    </button>
  )
}

export default SettingsItem
