import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState, useEffect, useRef } from 'react'
import FadeInView from '../motion/FadeInView'
import { projects } from '../../i18n/generatedGalleryData'
import { projects as fallbackProjects } from '../../data/projects'
import { siteCopy } from '../../i18n/siteCopy'

// 使用生成的数据，如果为空则使用 fallback
const galleryProjects = projects.length > 0 ? projects : fallbackProjects

// 从 project 取封面 src，优先新路径，fallback 到旧路径
const getCoverSrc = (project) => {
  return project.coverSrc ?? project.thumb?.src ?? null
}

const getCoverFallback = (project) => {
  return project.thumb?.fallback ?? project.thumb?.src ?? null
}

const GalleryCard = ({ lang, project, index, onOpen }) => {
  const prefersReducedMotion = useReducedMotion()
  const title = project.title?.[lang] ?? project.title
  const summary = project.summary?.[lang] ?? project.summary
  const coverSrc = getCoverSrc(project)
  const coverFallback = getCoverFallback(project)
  const hasVideo = Boolean(project.previewVideo)
  const isFeatured = project.slug === 'motion-showcase'

  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const videoRef = useRef(null)

  // 控制视频播放
  useEffect(() => {
    if (!videoRef.current) return
    if (isHovered && !prefersReducedMotion) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [isHovered, prefersReducedMotion])

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('ProjectCard clicked:', project.id, project.title)
    onOpen(project)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`break-inside-avoid ${isFeatured ? 'mb-8 md:mb-10' : 'mb-6 md:mb-8'}`}
      style={isFeatured ? { columnSpan: 'all' } : {}}
    >
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group w-full cursor-pointer text-left"
      >
        {/* 媒体区 */}
        <div
          className="relative overflow-hidden bg-ink/5"
          style={{ maxHeight: isFeatured ? '600px' : '800px' }}
        >
          {hasVideo ? (
            <video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : coverSrc ? (
            <motion.img
              src={coverSrc}
              alt={title}
              loading={index < 3 ? 'eager' : 'lazy'}
              decoding="async"
              onError={(e) => { if (coverFallback && e.target.src !== coverFallback) e.target.src = coverFallback }}
              animate={isHovered && !prefersReducedMotion ? {
                x: [-12, 12],
                scale: 1.06
              } : {
                x: 0,
                scale: 1
              }}
              transition={{
                x: { duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
                scale: { duration: 0.6, ease: 'easeOut' }
              }}
              className="w-full h-auto object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
              style={{ maxHeight: isFeatured ? '600px' : '800px' }}
            />
          ) : (
            <div className="flex w-full aspect-square items-center justify-center">
              <span className={`text-ink/20 ${lang === 'zh' ? 'text-sm tracking-[0.1em]' : 'text-xs uppercase tracking-[0.2em]'}`}>
                {title}
              </span>
            </div>
          )}

          {/* hover 遮罩 */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 px-5 pb-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <p className={`text-white/80 ${lang === 'zh' ? 'text-sm leading-relaxed' : 'text-xs leading-relaxed'}`}>
              {summary}
            </p>
          </div>
        </div>

        {/* 标题区 — 极简 */}
        <div className="mt-4 px-1">
          <h3 className={`text-ink transition duration-300 group-hover:text-ink/70 dark:text-white/85 dark:group-hover:text-white/55 ${isFeatured ? 'text-lg md:text-xl' : ''} ${lang === 'zh' ? 'text-base tracking-[0.02em]' : 'text-sm tracking-tight'}`}>
            {title}
          </h3>
        </div>
      </button>
    </motion.div>
  )
}

const Gallery = ({ lang, onOpen }) => {
  const prefersReducedMotion = useReducedMotion()
  const copy = siteCopy?.[lang] ?? siteCopy.zh

  const sortedProjects = useMemo(() => {
    return [...galleryProjects].sort((a, b) => {
      const aHasVideo = Boolean(a.previewVideo) || a.gallery?.some((item) => typeof item === 'object' && item.type === 'video')
      const bHasVideo = Boolean(b.previewVideo) || b.gallery?.some((item) => typeof item === 'object' && item.type === 'video')
      if (aHasVideo && !bHasVideo) return -1
      if (!aHasVideo && bHasVideo) return 1
      return 0
    })
  }, [])

  return (
    <section id="gallery" className="section-shell py-16 sm:py-20 md:py-24 lg:py-28">
      <FadeInView>
        <div>
          <p className={`eyebrow text-[22px] sm:text-[26px] tracking-normal normal-case mb-2`}>{copy.gallery.eyebrow}</p>
          <h2 className={`text-sm text-ink/55 whitespace-nowrap dark:text-white/45 ${lang === 'zh' ? 'tracking-[0.04em]' : 'tracking-tight'}`}>
            {copy.gallery.title}
          </h2>
        </div>
      </FadeInView>

      <div className="mt-10 sm:mt-12 columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 lg:gap-10">
        <AnimatePresence mode="popLayout">
          {sortedProjects.map((project, index) => (
            <GalleryCard key={project.id} lang={lang} project={project} index={index} onOpen={onOpen} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Gallery
