import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { siteCopy } from '../i18n/siteCopy'
import { tutorialsData } from '../i18n/tutorialsData'

const TutorialsPage = ({ lang }) => {
  const prefersReducedMotion = useReducedMotion()
  const copy = siteCopy?.[lang] ?? siteCopy.zh
  const data = tutorialsData?.[lang] ?? tutorialsData.zh
  const [expandedId, setExpandedId] = useState(null)

  return (
    <div className="min-h-screen pb-20 pt-32 md:pt-40">
      <div className="section-shell">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className={`mb-4 text-ink/50 ${lang === 'zh' ? 'text-sm tracking-[0.2em]' : 'text-xs uppercase tracking-[0.24em]'}`}>
            {copy.tutorials.eyebrow}
          </p>
          <h1 className={`mb-6 text-ink ${lang === 'zh' ? 'text-3xl tracking-[0.02em] md:text-4xl' : 'text-2xl tracking-tight md:text-3xl'}`}>
            {copy.tutorials.title}
          </h1>
          <p className={`mx-auto max-w-2xl text-ink/65 ${lang === 'zh' ? 'text-base leading-relaxed tracking-[0.02em]' : 'text-sm leading-relaxed'}`}>
            {copy.tutorials.intro}
          </p>
        </motion.div>

        {/* Tutorials List */}
        <div className="mx-auto max-w-3xl space-y-4">
          {data.tutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass-panel overflow-hidden rounded-2xl transition hover:shadow-md">
                <div className="p-6">
                  {/* Tutorial Header */}
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className={`mb-2 text-ink ${lang === 'zh' ? 'text-xl tracking-[0.02em]' : 'text-lg tracking-tight'}`}>
                        {tutorial.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className={`rounded-full border border-ink/10 bg-white/50 px-3 py-1 text-ink/60 ${lang === 'zh' ? 'text-xs tracking-[0.08em]' : 'text-[11px] uppercase tracking-[0.12em]'}`}>
                          {tutorial.category}
                        </span>
                        <span className={`rounded-full border border-ink/10 bg-white/50 px-3 py-1 text-ink/60 ${lang === 'zh' ? 'text-xs tracking-[0.08em]' : 'text-[11px] uppercase tracking-[0.12em]'}`}>
                          {tutorial.difficulty}
                        </span>
                      </div>
                    </div>
                    <span className={`shrink-0 text-ink/40 ${lang === 'zh' ? 'text-xs tracking-[0.08em]' : 'text-[11px] tracking-[0.12em]'}`}>
                      {tutorial.updatedAt}
                    </span>
                  </div>

                  {/* Tutorial Description */}
                  <p className={`mb-4 text-ink/65 ${lang === 'zh' ? 'text-sm leading-relaxed tracking-[0.02em]' : 'text-xs leading-relaxed'}`}>
                    {tutorial.description}
                  </p>

                  {/* View Button */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(expandedId === tutorial.id ? null : tutorial.id)}
                    className={`ui-hover-lift rounded-full border border-ink/10 px-4 py-2 text-ink transition hover:border-ink/20 ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.16em]'}`}
                  >
                    {expandedId === tutorial.id ? copy.tutorials.collapse : copy.tutorials.view}
                  </button>

                  {/* Expanded Content */}
                  {expandedId === tutorial.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-4 overflow-hidden border-t border-ink/10 pt-4"
                    >
                      <p className={`text-ink/50 ${lang === 'zh' ? 'text-sm leading-relaxed tracking-[0.02em]' : 'text-xs leading-relaxed'}`}>
                        {copy.tutorials.placeholder}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="#gallery"
            className={`ui-hover-lift inline-block text-ink/65 transition hover:text-ink ${lang === 'zh' ? 'text-sm tracking-[0.1em]' : 'text-xs uppercase tracking-[0.18em]'}`}
          >
            ← {copy.nav.backHome}
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default TutorialsPage
