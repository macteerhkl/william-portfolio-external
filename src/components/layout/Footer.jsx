import { profile } from '../../data/projects'
import { siteCopy } from '../../i18n/siteCopy'

const Footer = ({ lang }) => {
  const copy = siteCopy?.[lang] ?? siteCopy.zh

  return (
    <footer className="navbar-panel">
      <div className="section-shell pb-8 pt-12 sm:pb-10 sm:pt-14 md:pb-14">
        <div className="border-t border-white/10 pt-6 text-sm text-white/70">
          <p className="text-[13px] sm:text-sm">
            © 2026 William Lee all right reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
