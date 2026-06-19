import { motion, useReducedMotion } from 'framer-motion'
import FadeInView from '../motion/FadeInView'
import { profile } from '../../data/projects'
import { siteCopy } from '../../i18n/siteCopy'
import SoftwareLoop from '../ui/SoftwareLoop'

const Hero = ({ lang, onOpenContact }) => {
  const prefersReducedMotion = useReducedMotion()
  const compactMotion = typeof window !== 'undefined' && window.innerWidth < 768
  const copy = siteCopy?.[lang] ?? siteCopy.zh
  const location = copy.hero?.eyebrow ?? siteCopy.zh.hero.eyebrow
  const title = profile.title?.[lang] ?? profile.title.zh
  const intro = copy.hero?.intro ?? siteCopy.zh.hero.intro
  const softwareItems = [
    { id: 'cdr', label: copy.hero?.software?.cdr ?? siteCopy.zh.hero.software.cdr },
    { id: 'ps', label: copy.hero?.software?.ps ?? siteCopy.zh.hero.software.ps },
    { id: 'blender', label: copy.hero?.software?.blender ?? siteCopy.zh.hero.software.blender },
  ]

  return (
    <section id="software" className="section-shell pb-16 pt-12 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20 lg:pb-32 lg:pt-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: prefersReducedMotion ? 0 : compactMotion ? 0.06 : 0.12,
            },
          },
        }}
        className="grid gap-8 lg:grid-cols-[minmax(320px,0.95fr),minmax(0,1.05fr)] lg:items-start lg:gap-10"
      >
        <FadeInView className="w-full">
          <div className="w-full max-w-xl rounded-[1.9rem] border border-white/60 bg-white/70 p-5 shadow-soft backdrop-blur-xl sm:p-6 md:p-7">
            <div className="flex flex-col gap-4">
              <div>
                <p className={`text-sm text-ink/42 ${lang === 'zh' ? 'tracking-[0.08em]' : 'uppercase tracking-[0.22em]'}`}>
                  {title}
                </p>
              </div>
              <SoftwareLoop items={softwareItems} primaryTag={copy.hero.cdrTag} lang={lang} />
            </div>
          </div>
        </FadeInView>

        <div className="min-w-0">
          <motion.p
            variants={{ hidden: { opacity: 0, y: prefersReducedMotion ? 0 : compactMotion ? 12 : 18 }, visible: { opacity: 1, y: 0 } }}
            className={`eyebrow ${lang === 'zh' ? 'tracking-[0.14em]' : ''}`}
          >
            {location}
          </motion.p>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: prefersReducedMotion ? 0 : compactMotion ? 14 : 24 }, visible: { opacity: 1, y: 0 } }}
            className={`max-w-3xl font-display font-medium text-ink ${lang === 'zh' ? 'text-[2.2rem] leading-[1.14] tracking-normal sm:text-[2.6rem] md:text-[3rem]' : 'text-[2.05rem] leading-[1.04] tracking-display sm:text-[2.45rem] md:text-[2.9rem]'}`}
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: prefersReducedMotion ? 0 : compactMotion ? 12 : 18 }, visible: { opacity: 1, y: 0 } }}
            className={`mt-5 max-w-2xl text-sm text-ink/68 sm:text-[15px] md:text-base ${lang === 'zh' ? 'leading-8' : 'leading-7'}`}
          >
            {intro}
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: prefersReducedMotion ? 0 : compactMotion ? 10 : 16 }, visible: { opacity: 1, y: 0 } }}
            className="mt-8"
          >
            <button
              type="button"
              onClick={onOpenContact}
              className={`rounded-full border border-ink/12 bg-white/72 px-6 py-3 text-ink shadow-soft backdrop-blur-sm transition hover:border-ink/25 hover:bg-white/88 ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-[11px] uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.18em]'}`}
            >
              {copy.hero.secondaryCta}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
