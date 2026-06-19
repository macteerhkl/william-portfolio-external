const FilterBar = ({ categories, active, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 md:justify-end">
      {categories.map((category) => {
        const isActive = category.id === active

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition duration-300 ${
              isActive
                ? 'border-ink bg-ink text-white dark:border-white dark:bg-white dark:text-ink'
                : 'border-ink/10 bg-white/60 text-ink/60 hover:border-ink/20 hover:text-ink dark:border-white/12 dark:bg-white/6 dark:text-white/50 dark:hover:border-white/25 dark:hover:text-white/90'
            }`}
          >
            {category.label}
          </button>
        )
      })}
    </div>
  )
}

export default FilterBar
