import { motion } from 'framer-motion'

function TurfCard({ turf, onBook }) {
  return (
    <motion.article
      className="h-[180px] w-[160px] flex-shrink-0 overflow-hidden rounded-card bg-white shadow-soft"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <img src={turf.image} alt={turf.name} className="h-[82px] w-full object-cover" />

      <div className="flex h-[98px] flex-col justify-between p-3">
        <div>
          <h3 className="line-clamp-1 text-sm font-semibold text-text-primary">{turf.name}</h3>
          <p className="mt-0.5 text-xs text-text-secondary">{turf.distance}</p>
          <p className="text-sm font-semibold text-brand-primary">₹{turf.price}</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="h-7 rounded-full bg-brand-primary text-xs font-semibold text-white"
          type="button"
          onClick={() => onBook?.(turf)}
        >
          Book Match
        </motion.button>
      </div>
    </motion.article>
  )
}

export default TurfCard
