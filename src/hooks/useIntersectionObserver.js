import { useEffect, useRef, useState } from 'react'

export const useIntersectionObserver = ({ rootMargin = '120px', threshold = 0.15 } = {}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node || isVisible) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [isVisible, rootMargin, threshold])

  return { ref, isVisible }
}
