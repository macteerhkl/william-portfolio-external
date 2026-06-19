import { useEffect } from 'react'

export const useScrollLock = (locked) => {
  useEffect(() => {
    if (!locked) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [locked])
}
