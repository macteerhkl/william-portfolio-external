import FadeInView from '../motion/FadeInView'
import TimelineItem from '../ui/TimelineItem'
import { experience } from '../../data/projects'
import { siteCopy } from '../../i18n/siteCopy'

const getLocalizedField = (field, lang) => {
  if (typeof field === 'string') {
    return field
  }

  if (field && typeof field === 'object') {
    return field[lang] ?? field.zh ?? field.en ?? ''
  }

  return ''
}

const Experience = ({ lang = 'zh' }) => {
  const copy = siteCopy?.[lang] ?? siteCopy.zh

  const basicInfo = lang === 'zh' ? {
    location: '住址：市立医院本部附近 + 苏州工业园区新未来花园',
    target: '意向：平面设计',
    salary: '期望薪资：4k',
  } : {
    location: 'Location: Near the main campus of Suzhou Municipal Hospital + Xinweilai Garden, Suzhou Industrial Park',
    target: 'Target Role: Graphic Design',
    salary: 'Expected Salary: 5k',
  }

  return (
    <section id="experience" className="section-shell pb-16 pt-4 sm:pb-20 sm:pt-6 md:pb-24 md:pt-8 lg:pb-28 lg:pt-10">
      <FadeInView>
        <p className={`eyebrow text-[22px] sm:text-[26px] tracking-normal normal-case ${lang === 'zh' ? 'normal-case tracking-[0.14em]' : ''}`}>{copy.experience.eyebrow}</p>
      </FadeInView>

      {/* 基本信息 */}
      <FadeInView delay={0.1}>
        <div className="mt-8 rounded-[1.5rem] border border-white/60 bg-white/70 px-5 py-4 shadow-soft backdrop-blur-xl sm:mt-10 sm:rounded-[1.75rem] sm:px-6 sm:py-5 dark:border-white/8 dark:bg-white/5">
          <div className="flex flex-col gap-2 text-sm text-ink/68 sm:text-[15px] dark:text-white/60">
            <p className={lang === 'zh' ? 'leading-7' : 'leading-6'}>{basicInfo.location}</p>
            <p className={lang === 'zh' ? 'leading-7' : 'leading-6'}>{basicInfo.target}</p>
            <p className={lang === 'zh' ? 'leading-7' : 'leading-6'}>{basicInfo.salary}</p>
          </div>
        </div>
      </FadeInView>

      {/* 工作经历 */}
      <div className="mt-6 rounded-[1.5rem] border border-white/60 bg-white/70 px-4 py-2 shadow-soft backdrop-blur-xl sm:mt-8 sm:rounded-[1.75rem] sm:px-6 md:px-8 dark:border-white/8 dark:bg-white/5">
        {experience.map((item) => {
          const title = getLocalizedField(item.title, lang)
          const company = getLocalizedField(item.company, lang)
          const description = getLocalizedField(item.description, lang)

          return (
            <TimelineItem
              key={`${item.year}-${title}`}
              item={{
                ...item,
                title,
                company,
                description,
              }}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Experience
