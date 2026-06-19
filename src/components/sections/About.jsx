import FadeInView from '../motion/FadeInView'
import { profile } from '../../data/projects'
import { siteCopy } from '../../i18n/siteCopy'
import SoftwareLoop from '../ui/SoftwareLoop'

const About = ({ lang }) => {
  const copy = siteCopy?.[lang] ?? siteCopy.zh
  const paragraphs = profile.about?.[lang] ?? profile.about.zh

  return (
    <section id="about" className="section-shell py-16 sm:py-20 md:py-24 lg:py-28">
      <div>

        {/* Eyebrow + title — animate on mount (always in viewport on load) */}
        <FadeInView immediate>
          <p className={`eyebrow text-[22px] sm:text-[26px] tracking-normal normal-case ${lang === 'zh' ? 'tracking-[0.14em]' : ''}`}>{copy.about.eyebrow}</p>
        </FadeInView>

        {/* Body copy */}
        <FadeInView delay={0.08} immediate>
          <div className="mt-8 space-y-5">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className={`text-sm text-ink/68 sm:text-[15px] md:text-base dark:text-white/60 ${lang === 'zh' ? 'leading-8' : 'leading-7'}`}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Software compact card */}
          <div className="mt-10 rounded-[1.6rem] border border-ink/8 bg-white/55 px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-6 dark:border-white/8 dark:bg-white/5">
            <p className={`mb-4 text-ink/42 dark:text-white/38 ${lang === 'zh' ? 'text-sm tracking-[0.1em]' : 'text-xs uppercase tracking-[0.2em]'}`}>
              {copy.about.softwareTitle}
            </p>
            <SoftwareLoop
              items={[
                { id: 'coreldraw', label: 'CorelDRAW', icon: '/icons/tools/coreldraw.svg', fallback: 'CDR' },
                { id: 'photoshop', label: 'Photoshop', icon: '/icons/tools/photoshop.svg', fallback: 'Ps' },
                { id: 'blender', label: 'Blender', icon: '/icons/tools/blender.svg', fallback: 'Blender' },
                { id: 'capcut', label: 'CapCut', icon: '/icons/tools/capcut.svg', fallback: 'CapCut' },
                { id: 'illustrator', label: 'Illustrator', icon: '/icons/tools/illustrator.svg', fallback: 'Ai' },
                { id: 'chatgpt', label: 'ChatGPT', icon: '/icons/tools/chatgpt.svg', fallback: 'ChatGPT' },
                { id: 'gemini', label: 'Gemini', icon: '/icons/tools/gemini.svg', fallback: 'Gemini' },
                { id: 'claude', label: 'Claude', icon: '/icons/tools/claude.svg', fallback: 'Claude' },
              ]}
              primaryTag={copy.about.softwarePrimary}
              lang={lang}
              compact
            />
          </div>
        </FadeInView>

      </div>
    </section>
  )
}

export default About