import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

function BannerCard({ onViewDetails }) {
  return (
    <motion.article
      className="relative h-[140px] overflow-hidden rounded-banner bg-gradient-to-r from-[#3FA34D] to-[#2E7D32] p-5 text-white shadow-soft"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative z-10 flex h-full max-w-[68%] flex-col justify-between">
        <div>
          <p className="text-xs font-medium text-white/85">Batdoor Badminton Academy</p>
          <p className="mt-1 text-sm">Get Special Offer</p>
          <h3 className="text-xl font-bold leading-tight">Up to 40% OFF</h3>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onViewDetails}
          className="inline-flex w-fit items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm"
        >
          View details
          <ChevronRight size={14} />
        </motion.button>
      </div>

      <div className="absolute right-2 top-1/2 h-[115px] w-[115px] -translate-y-1/2 rounded-full border border-white/20 bg-[radial-gradient(circle_at_30%_30%,#ffffff_15%,#f6f7f8_45%,#d6d8db_100%)]">
        <span className="absolute inset-0 flex items-center justify-center text-4xl">⚽</span>
      </div>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 right-10 h-20 w-20 rounded-full bg-white/10" />
    </motion.article>
  )
}

export default BannerCard
