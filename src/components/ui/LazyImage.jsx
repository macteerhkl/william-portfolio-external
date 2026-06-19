import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const toAvif = (src) => src?.replace(/\.(webp|jpg|jpeg|png)$/i, '.avif')

const shimmer =
  'linear-gradient(110deg, rgba(255,255,255,0.22) 8%, rgba(255,255,255,0.5) 18%, rgba(255,255,255,0.22) 33%)'

const LazyImage = ({
  alt,
  src,
  fallback,
  className = '',
  wrapperClassName = '',
  aspectClassName = 'aspect-[4/5]',
  eager = false,
  hires = false,
  onClick,
}) => {
  const { ref, isVisible } = useIntersectionObserver()
  const shouldLoad = eager || isVisible
  const avifSrc = useMemo(() => (src ? toAvif(src) : undefined), [src])
  const activeSrc = shouldLoad ? src : undefined
  const activeFallback = shouldLoad ? fallback : undefined
  const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

  return (
    <div ref={ref} className={`min-w-0 ${wrapperClassName}`}>
      <motion.div
        whileHover={onClick && supportsHover ? { y: -4 } : undefined}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/40 ${aspectClassName}`}
      >
        {!shouldLoad && (
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background: shimmer,
              backgroundSize: '200% 100%',
            }}
          />
        )}

        {shouldLoad && (
          <picture>
            {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
            {activeSrc && <source srcSet={activeSrc} type="image/webp" />}
            <img
              src={activeFallback || activeSrc}
              alt={alt}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              className={`h-full w-full object-cover ${className}`}
            />
          </picture>
        )}

        {hires && (
          <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/70 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
            HD on demand
          </div>
        )}

        {onClick && (
          <button
            type="button"
            onClick={onClick}
            className="absolute inset-0"
            aria-label={`Open ${alt}`}
          />
        )}
      </motion.div>
    </div>
  )
}

export default LazyImage
