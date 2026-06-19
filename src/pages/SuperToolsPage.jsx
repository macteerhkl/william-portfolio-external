import { motion, useReducedMotion } from 'framer-motion'
import SecretTools from '../components/sections/SecretTools'
import { siteCopy } from '../i18n/siteCopy'

const SuperToolsPage = ({ lang }) => {
  const prefersReducedMotion = useReducedMotion()
  const copy = siteCopy?.[lang] ?? siteCopy.zh
  const navCopy = copy.nav ?? siteCopy.zh.nav

  const handleBack = () => {
    window.location.hash = ''
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen text-ink"
    >
      <div className="section-shell pt-8 pb-4 md:pt-10">
        <button
          type="button"
          onClick={handleBack}
          className={`ui-hover-lift inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/55 px-4 py-2 text-ink/65 transition hover:border-ink/22 hover:text-ink ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
            <path d="M10.5 3L5.5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          {navCopy.backHome}
        </button>
      </div>
      <SecretTools lang={lang} />
    </motion.div>
  )
}

export default SuperToolsPage
