import { motion, useReducedMotion } from 'framer-motion'

const FadeInView = ({ as = 'div', className, delay = 0, immediate = false, children }) => {
  const Component = motion[as] ?? motion.div
  const prefersReducedMotion = useReducedMotion()
  const isCompactViewport = typeof window !== 'undefined' && window.innerWidth < 768
  const offset = prefersReducedMotion ? 0 : isCompactViewport ? 14 : 28
  const duration = prefersReducedMotion ? 0.2 : isCompactViewport ? 0.45 : 0.75

  const variants = {
    hidden: { opacity: 0, y: offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  }

  // immediate: animate on mount regardless of scroll position (for above-the-fold content)
  if (immediate) {
    return (
      <Component
        className={className}
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </Component>
    )
  }

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: isCompactViewport ? 0.14 : 0.2 }}
    >
      {children}
    </Component>
  )
}

export default FadeInView
