import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

const SoftwareLoop = ({ items, primaryTag, lang, compact = false }) => {
  const prefersReducedMotion = useReducedMotion()
  const marqueeItems = [...items, ...items]

  return (
    <div className="relative overflow-hidden rounded-[1.4rem] border border-white/60 bg-white/72 p-4 shadow-soft backdrop-blur-xl sm:p-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#f5f3ef] to-transparent sm:w-12" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#f5f3ef] to-transparent sm:w-12" />
      <motion.div
        className="flex w-max items-center gap-3 sm:gap-4"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: ['0%', '-50%'] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: compact ? 20 : 24, ease: 'linear', repeat: Infinity }
        }
      >
        {marqueeItems.map((item, index) => {
          const isPrimary = item.id === 'coreldraw'

          return (
            <ToolCard
              key={`${item.id}-${index}`}
              item={item}
              isPrimary={isPrimary}
              primaryTag={primaryTag}
              lang={lang}
              compact={compact}
              prefersReducedMotion={prefersReducedMotion}
            />
          )
        })}
      </motion.div>
    </div>
  )
}

const ToolCard = ({ item, isPrimary, primaryTag, lang, compact, prefersReducedMotion }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      animate={
        prefersReducedMotion
          ? undefined
          : { y: [0, isPrimary ? -4 : -2, 0] }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration: isPrimary ? 4.8 : 5.8,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: isPrimary ? 0 : 0.2,
            }
      }
      whileHover={{ y: -3, scale: 1.02 }}
      className={`shrink-0 rounded-[1.3rem] border px-5 py-5 transition-all ${
        isPrimary
          ? compact
            ? 'min-w-[11rem] border-[#2c3640]/20 bg-[#2c3640] text-white shadow-[0_12px_28px_rgba(44,54,64,0.18)] sm:min-w-[12.5rem] sm:px-6 sm:py-6'
            : 'min-w-[14rem] border-[#2c3640]/20 bg-[#2c3640] text-white shadow-[0_18px_44px_rgba(44,54,64,0.18)] sm:min-w-[16rem] sm:px-7 sm:py-6'
          : compact
            ? 'min-w-[9rem] border-ink/10 bg-white/88 text-ink shadow-[0_8px_20px_rgba(10,10,10,0.05)] sm:min-w-[10.5rem] sm:px-6 sm:py-6'
            : 'min-w-[11rem] border-ink/10 bg-white/88 text-ink shadow-[0_14px_32px_rgba(10,10,10,0.05)] sm:min-w-[12.5rem]'
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Logo/Icon */}
        <div
          className={`flex shrink-0 items-center justify-center rounded-xl ${
            isPrimary ? 'bg-white/90' : 'bg-white/75'
          } ${compact ? 'h-10 w-10 p-1.5 sm:h-11 sm:w-11 sm:p-2' : 'h-12 w-12 p-2 sm:h-[52px] sm:w-[52px] sm:p-2.5'}`}
        >
          {!imgError && item.icon ? (
            <img
              src={item.icon}
              alt={item.label}
              onError={() => setImgError(true)}
              className="h-full w-full object-contain"
              draggable={false}
            />
          ) : (
            <span className="text-ink/60 text-xs font-medium">
              {item.fallback?.slice(0, 2) || item.label.slice(0, 2)}
            </span>
          )}
        </div>

        {/* Label */}
        <div className="flex flex-col gap-1">
          {isPrimary && (
            <span
              className={
                compact
                  ? lang === 'zh'
                    ? 'text-[9px] tracking-[0.1em] text-white/60'
                    : 'text-[8px] uppercase tracking-[0.16em] text-white/60'
                  : lang === 'zh'
                    ? 'text-[10px] tracking-[0.12em] text-white/60'
                    : 'text-[9px] uppercase tracking-[0.18em] text-white/60'
              }
            >
              {primaryTag}
            </span>
          )}
          <span
            className={`font-display ${
              isPrimary
                ? compact
                  ? lang === 'zh'
                    ? 'text-[1.15rem] leading-none tracking-[0.02em] sm:text-[1.2rem]'
                    : 'text-[1.15rem] leading-none tracking-[0.04em] sm:text-[1.2rem]'
                  : lang === 'zh'
                    ? 'text-[1.4rem] leading-none tracking-[0.02em]'
                    : 'text-[1.4rem] leading-none tracking-[0.04em]'
                : compact
                  ? lang === 'zh'
                    ? 'text-[1rem] leading-none tracking-[0.02em] sm:text-[1.05rem]'
                    : 'text-[1rem] leading-none tracking-[0.03em] sm:text-[1.05rem]'
                  : lang === 'zh'
                    ? 'text-[1.1rem] leading-none tracking-[0.02em]'
                    : 'text-[1.1rem] leading-none tracking-[0.03em]'
            }`}
          >
            {item.label}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default SoftwareLoop
