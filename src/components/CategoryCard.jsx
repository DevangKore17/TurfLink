import { motion } from 'framer-motion'

function CategoryCard({ icon: Icon, name, bg, active, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="w-[80px] flex-shrink-0"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`flex h-[80px] w-[80px] items-center justify-center rounded-card shadow-soft transition ${
          active ? 'ring-2 ring-brand-primary' : ''
        }`}
        style={{ backgroundColor: active ? '#E8F5E9' : bg }}
      >
        <Icon size={28} className="text-brand-primary" />
      </div>
      <p className={`mt-2 text-center text-xs font-medium ${active ? 'text-brand-primary' : 'text-text-primary'}`}>
        {name}
      </p>
    </motion.button>
  )
}

export default CategoryCard
