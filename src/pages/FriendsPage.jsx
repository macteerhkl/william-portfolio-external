import { motion, useReducedMotion } from 'framer-motion'
import { siteCopy } from '../i18n/siteCopy'
import { friendsData } from '../i18n/friendsData'

const FriendsPage = ({ lang }) => {
  const prefersReducedMotion = useReducedMotion()
  const copy = siteCopy?.[lang] ?? siteCopy.zh
  const data = friendsData?.[lang] ?? friendsData.zh

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
            {copy.friends.eyebrow}
          </p>
          <h1 className={`mb-6 text-ink ${lang === 'zh' ? 'text-3xl tracking-[0.02em] md:text-4xl' : 'text-2xl tracking-tight md:text-3xl'}`}>
            {copy.friends.title}
          </h1>
          <p className={`mx-auto max-w-2xl text-ink/65 ${lang === 'zh' ? 'text-base leading-relaxed tracking-[0.02em]' : 'text-sm leading-relaxed'}`}>
            {copy.friends.intro}
          </p>
        </motion.div>

        {/* Photo Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="glass-panel overflow-hidden rounded-2xl transition hover:shadow-md">
                {/* Photo Placeholder */}
                <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-ink/5 via-ink/8 to-ink/5">
                  <div className="flex h-full items-center justify-center">
                    <div className={`text-ink/20 ${lang === 'zh' ? 'text-sm tracking-[0.1em]' : 'text-xs uppercase tracking-[0.16em]'}`}>
                      {photo.title}
                    </div>
                  </div>
                </div>

                {/* Photo Info */}
                <div className="p-5">
                  <h3 className={`mb-2 text-ink ${lang === 'zh' ? 'text-lg tracking-[0.02em]' : 'text-base tracking-tight'}`}>
                    {photo.title}
                  </h3>
                  <p className={`mb-2 text-ink/50 ${lang === 'zh' ? 'text-xs tracking-[0.08em]' : 'text-[11px] uppercase tracking-[0.12em]'}`}>
                    {photo.location} · {photo.date}
                  </p>
                  <p className={`text-ink/60 ${lang === 'zh' ? 'text-sm leading-relaxed tracking-[0.02em]' : 'text-xs leading-relaxed'}`}>
                    {photo.description}
                  </p>
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

export default FriendsPage
