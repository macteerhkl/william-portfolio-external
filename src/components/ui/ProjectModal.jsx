import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useScrollLock } from '../../hooks/useScrollLock'
import { siteCopy } from '../../i18n/siteCopy'
import HorizontalMediaMarquee from './HorizontalMediaMarquee'

const ProjectModal = ({ lang, project, onClose }) => {
  const copy = siteCopy?.[lang] ?? siteCopy.zh
  const title = project.title?.[lang] ?? project.title
  const summary = project.summary?.[lang] ?? project.summary

  useScrollLock(Boolean(project))

  // 构建媒体列表：优先新路径 /media/gallery/...，fallback 到旧路径
  const mediaItems = (() => {
    const items = []

    // 辅助函数：处理路径，添加 base URL
    const processPath = (path) => {
      if (!path) return null
      if (path.startsWith('/')) {
        return `${import.meta.env.BASE_URL}${path.substring(1)}`
      }
      return path
    }

    // 封面
    const coverSrc = project.coverSrc ?? project.cover?.src ?? project.cover
    const coverFallback = project.cover?.full?.fallback ?? project.thumb?.fallback
    if (coverSrc) items.push({ type: 'image', src: processPath(coverSrc), fallback: processPath(coverFallback) })

    // gallery 数组
    if (Array.isArray(project.gallery)) {
      for (const g of project.gallery) {
        if (typeof g === 'string') {
          items.push({ type: 'image', src: processPath(g), fallback: null })
        } else {
          const src = g?.full?.src ?? g?.src
          const fallback = g?.full?.fallback ?? g?.fallback
          if (src) items.push({ type: 'image', src: processPath(src), fallback: processPath(fallback) })
        }
      }
    }

    // 视频
    if (project.previewVideo) {
      items.push({ type: 'video', src: processPath(project.previewVideo) })
    }

    return items.length ? items : [{ type: 'image', src: null, fallback: null }]
  })()

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!project) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-black/90 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
    >
      {/* 关闭按钮 */}
      <button
        type="button"
        onClick={onClose}
        className="fixed right-6 top-6 z-20 rounded-full border border-white/20 bg-black/40 px-5 py-2.5 text-white/70 backdrop-blur-md transition hover:border-white/40 hover:bg-black/60 hover:text-white md:right-8 md:top-8"
        style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
      >
        {copy.modal.close}
      </button>

      {/* 横向媒体滚动区 */}
      <div className="flex-1" onClick={(e) => e.stopPropagation()}>
        <HorizontalMediaMarquee mediaItems={mediaItems} title={title} />
      </div>

      {/* 底部标题和简介 */}
      <div className="relative z-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-6 pb-8 pt-16 backdrop-blur-sm md:px-12 md:pb-10 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className={`font-display text-white/90 ${lang === 'zh' ? 'text-xl leading-tight tracking-normal md:text-2xl' : 'text-xl tracking-tight md:text-2xl'}`}>
              {title}
            </h2>
            <p className={`mt-2 max-w-2xl text-white/50 ${lang === 'zh' ? 'text-sm leading-relaxed' : 'text-sm leading-relaxed'}`}>
              {summary}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectModal
