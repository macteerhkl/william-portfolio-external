import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// 根据宽高比计算卡片尺寸（响应式）
const getCardDimensions = (item, isMobile) => {
  const aspectRatio = item.aspectRatio || (item.width && item.height ? item.width / item.height : 1)

  if (isMobile) {
    // 手机端：限制在屏幕内
    const maxWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 48, 400) : 350
    const maxHeight = typeof window !== 'undefined' ? window.innerHeight * 0.6 : 400

    if (aspectRatio > 1) {
      // 横图
      return { width: maxWidth, height: Math.min(maxWidth / aspectRatio, maxHeight) }
    } else {
      // 竖图
      return { width: Math.min(maxHeight * aspectRatio, maxWidth), height: maxHeight }
    }
  }

  // 桌面端：原有逻辑
  const baseHeight = 500
  if (aspectRatio > 2.5) {
    return { width: Math.min(baseHeight * aspectRatio, 800), height: baseHeight }
  } else if (aspectRatio > 1.2) {
    return { width: baseHeight * aspectRatio, height: baseHeight }
  } else if (aspectRatio < 0.65) {
    return { width: baseHeight * aspectRatio, height: Math.min(baseHeight * 1.5, 700) }
  } else {
    return { width: baseHeight * aspectRatio, height: baseHeight }
  }
}

const HorizontalMediaMarquee = ({ mediaItems, title }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const baseX = useMotionValue(0)
  const scrollVelocity = useRef(0)

  // 检测是否为手机端
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 重复媒体项 3 次以实现无缝循环
  const loopedItems = [...mediaItems, ...mediaItems, ...mediaItems]

  const gap = isMobile ? 16 : 40
  const singleLoopWidth = mediaItems.reduce((sum, item) => {
    const dims = getCardDimensions(item, isMobile)
    return sum + dims.width + gap
  }, 0)

  // 自动滚动动画
  useAnimationFrame((t, delta) => {
    if (isDragging || isHovered) return

    const moveBy = -0.8 * (delta / 16)
    scrollVelocity.current = moveBy

    let newX = baseX.get() + moveBy

    if (newX <= -singleLoopWidth) {
      newX = newX + singleLoopWidth
    }

    baseX.set(newX)
  })

  return (
    <div
      className="relative flex h-full w-full max-w-full items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        maskImage: isMobile ? 'none' : 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: isMobile ? 'none' : 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: -singleLoopWidth * 2, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        style={{
          x: baseX,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        className="flex items-center"
        onDrag={(e, info) => {
          let newX = baseX.get() + info.delta.x
          if (newX <= -singleLoopWidth) {
            newX = newX + singleLoopWidth
            baseX.set(newX)
          } else if (newX > 0) {
            newX = newX - singleLoopWidth
            baseX.set(newX)
          }
        }}
      >
        {loopedItems.map((item, i) => {
          const dims = getCardDimensions(item, isMobile)
          const aspectRatio = item.aspectRatio || 1

          return (
            <div
              key={i}
              className="shrink-0 select-none overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/40 to-black/20 shadow-xl backdrop-blur-sm"
              style={{
                width: dims.width,
                height: dims.height,
                marginRight: gap,
                maxWidth: isMobile ? 'calc(100vw - 48px)' : 'none',
              }}
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                  draggable={false}
                />
              ) : item.src ? (
                <img
                  src={item.src}
                  alt={`${title} ${(i % mediaItems.length) + 1}`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    if (item.fallback && e.target.src !== item.fallback) {
                      e.target.src = item.fallback
                    }
                  }}
                  className="h-full w-full object-contain"
                  draggable={false}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/5">
                  <span className="text-xs uppercase tracking-widest text-white/20">
                    {title}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default HorizontalMediaMarquee
