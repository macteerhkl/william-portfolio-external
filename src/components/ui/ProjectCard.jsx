import { motion, useReducedMotion } from 'framer-motion'
import LazyImage from './LazyImage'

const aspectByVariant = {
  feature: 'aspect-[4/4.8] sm:aspect-[4/4.2] md:aspect-[4/4.6] lg:aspect-[4/4.1]',
  tall: 'aspect-[4/5.2] sm:aspect-[4/4.9] md:aspect-[4/5.4] lg:aspect-[4/5.1]',
  wide: 'aspect-[4/3.4] sm:aspect-[4/3.1] md:aspect-[4/3.2] lg:aspect-[4/3]',
  compact: 'aspect-[4/4.1] sm:aspect-[4/3.9] md:aspect-[4/4.2] lg:aspect-[4/4]',
  standard: 'aspect-[4/4.6] sm:aspect-[4/4.3] md:aspect-[4/4.7] lg:aspect-[4/4.4]',
}

const ProjectCard = ({ lang, project, layoutVariant = 'standard', priority = false, onOpen }) => {
  const prefersReducedMotion = useReducedMotion()
  const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
  const title = project.title?.[lang] ?? project.title
  const summary = project.summary?.[lang] ?? project.summary
  const tags = project.tags?.[lang] ?? project.tags ?? []
  const previewTags = tags.slice(0, 2)

  return (
    <motion.article
      layout={!prefersReducedMotion}
      whileHover={supportsHover ? { y: -4 } : undefined}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="group min-w-0"
    >
      <div className="relative overflow-hidden rounded-[1.85rem]">
        <LazyImage
          alt={title}
          src={project.thumb.src}
          fallback={project.thumb.fallback}
          eager={priority}
          onClick={() => onOpen(project)}
          aspectClassName={aspectByVariant[layoutVariant] ?? aspectByVariant.standard}
          wrapperClassName="w-full"
          className="transition duration-500 ease-out group-hover:scale-[1.015]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/32 via-black/8 to-transparent px-5 pb-5 pt-14 opacity-100 transition duration-500 ease-out sm:opacity-0 sm:group-hover:opacity-100">
          <div className="max-w-md">
            <h3 className={`font-display text-white ${lang === 'zh' ? 'text-xl leading-[1.18] tracking-normal' : 'text-xl tracking-display'}`}>
              {title}
            </h3>
            <p className={`mt-2 text-sm text-white/78 ${lang === 'zh' ? 'line-clamp-2 leading-7' : 'line-clamp-2 leading-6'}`}>
              {summary}
            </p>
          </div>
        </div>
      </div>

      <button type="button" onClick={() => onOpen(project)} className="ui-hover-lift mt-4 block w-full min-w-0 text-left">
        <div className="min-w-0">
          <h3 className={`font-display text-xl text-ink ${lang === 'zh' ? 'tracking-normal leading-[1.18]' : 'tracking-display'}`}>{title}</h3>
          <p className={`mt-2 max-w-md text-sm text-ink/58 ${lang === 'zh' ? 'line-clamp-2 leading-7' : 'line-clamp-2 leading-6'}`}>
            {summary}
          </p>
        </div>
        {previewTags.length ? (
          <div className="mt-3 flex flex-wrap gap-2 text-ink/40">
            {previewTags.map((tag) => (
              <span
                key={tag}
                className={`${lang === 'zh' ? 'text-[12px] tracking-[0.08em]' : 'text-[11px] uppercase tracking-[0.16em]'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </button>
    </motion.article>
  )
}

export default ProjectCard
