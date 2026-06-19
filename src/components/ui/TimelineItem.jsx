const TimelineItem = ({ item }) => {
  return (
    <div className="grid gap-4 border-t border-ink/10 py-8 md:grid-cols-[120px,1fr] md:gap-8 dark:border-white/8">
      <div className="text-xs font-medium uppercase tracking-[0.22em] text-ink/40 dark:text-white/35">
        {item.year}
      </div>
      <div className="min-w-0">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
          <h3 className="font-display text-xl tracking-display text-ink dark:text-white/88">{item.title}</h3>
          <p className="text-sm text-ink/50 dark:text-white/45">{item.company}</p>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/60 dark:text-white/55">{item.description}</p>
      </div>
    </div>
  )
}

export default TimelineItem
