import { Bell, Search, ShieldCheck } from 'lucide-react'

function Header({ title = 'TURFLINK', showBrand = true }) {
  return (
    <header className="flex h-14 items-center justify-between">
      <div className="flex items-center gap-2">
        {showBrand ? (
          <>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-light text-brand-primary">
              <ShieldCheck size={16} strokeWidth={2.5} />
            </span>
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-brand-primary">
              {title}
            </span>
          </>
        ) : (
          <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-secondary shadow-soft"
          type="button"
          aria-label="Search"
        >
          <Search size={17} />
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-secondary shadow-soft"
          type="button"
          aria-label="Notifications"
        >
          <Bell size={17} />
        </button>
      </div>
    </header>
  )
}

export default Header
