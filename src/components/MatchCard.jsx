import { motion } from 'framer-motion'
import { Clock3, MapPin } from 'lucide-react'
import AvatarGroup from './AvatarGroup'

function MatchCard({ match, onAction }) {
  return (
    <motion.article
      className="rounded-card bg-white p-4 shadow-soft"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="rounded-[12px] px-2.5 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: match.badgeColor }}
        >
          {match.sport}
        </span>
        <p className="text-xs font-medium text-text-secondary">{match.date}</p>
      </div>

      <div className="mt-3 space-y-1.5 text-sm text-text-primary">
        <p className="flex items-center gap-1.5 text-text-secondary">
          <Clock3 size={14} />
          {match.time}
        </p>
        <p className="font-semibold">{match.venue}</p>
        <p className="flex items-center gap-1.5 text-xs text-text-secondary">
          <MapPin size={13} />
          {match.turf}
        </p>
      </div>

      <p className="mt-3 text-sm font-semibold text-text-primary">{match.teamStatus}</p>

      <div className="mt-3 flex items-center justify-between">
        <AvatarGroup avatars={match.avatars} />
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          className="rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-white"
          onClick={() => onAction?.(match)}
        >
          {match.cta}
        </motion.button>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs text-text-secondary">
        <span>{match.spots}</span>
        <span className="font-semibold text-text-primary">₹{match.price}</span>
        <span>{match.distance}</span>
      </div>
    </motion.article>
  )
}

export default MatchCard
