import FadeInView from '../motion/FadeInView'
import ProjectCard from '../ui/ProjectCard'
import { featuredProjects } from '../../data/projects'
import { siteCopy } from '../../i18n/siteCopy'

const FeaturedProjects = ({ lang, onOpen }) => {
  const copy = siteCopy?.[lang] ?? siteCopy.zh

  return (
    <section id="featured-projects" className="section-shell py-16 sm:py-20 md:py-24 lg:py-28">
      <FadeInView>
        <p className={`eyebrow ${lang === 'zh' ? 'normal-case tracking-[0.14em]' : ''}`}>{copy.featured.eyebrow}</p>
        <div className="flex flex-col gap-5 md:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className={`section-title max-w-2xl ${lang === 'zh' ? 'tracking-normal leading-[1.18]' : ''}`}>
            {copy.featured.title}
          </h2>
          <p className={`section-copy max-w-xl ${lang === 'zh' ? 'leading-8' : ''}`}>{copy.featured.intro}</p>
        </div>
      </FadeInView>

      <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8">
        {featuredProjects.map((project, index) => (
          <FadeInView key={project.id} delay={index * 0.06}>
            <ProjectCard lang={lang} project={project} priority={index === 0} onOpen={onOpen} />
          </FadeInView>
        ))}
      </div>
    </section>
  )
}

export default FeaturedProjects
