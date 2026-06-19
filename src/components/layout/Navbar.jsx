import { useState, useEffect } from 'react'
import { motion, useReducedMotion, useAnimation } from 'framer-motion'
import { languages, siteCopy } from '../../i18n/siteCopy'

const SunIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

const MoonIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
)

const LockIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const Navbar = ({ lang, setLang, onOpenContact, theme, onToggleTheme }) => {
  const prefersReducedMotion = useReducedMotion()
  const compactMotion = typeof window !== 'undefined' && window.innerWidth < 768
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('#about')
  const lockControls = useAnimation()
  const copy = siteCopy?.[lang] ?? siteCopy.zh
  const navCopy = copy.nav ?? siteCopy.zh.nav

  const navItems = [
    { label: navCopy.about, href: '#about' },
    { label: navCopy.secretTools, href: '#/super-tools', hasLock: true },
  ]

  const handleLockShake = () => {
    if (prefersReducedMotion) return
    lockControls.start({
      rotate: [0, -10, 8, -4, 0],
      transition: { duration: 0.5, ease: 'easeInOut' },
    })
  }

  // 监听页面滚动，更新当前激活的导航项
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about']
      const scrollPosition = window.scrollY + 200
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveNav(`#${section}`)
            return
          }
        }
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const controls = (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Theme toggle */}
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="ui-hover-lift flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-white/40 hover:text-white"
      >
        {theme === 'dark' ? (
          <SunIcon className="h-[15px] w-[15px]" />
        ) : (
          <MoonIcon className="h-[15px] w-[15px]" />
        )}
      </button>

      {/* Language switcher */}
      <div className="flex rounded-full border border-white/20 p-1">
        {languages.map((item) => {
          const active = item.id === lang
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setLang(item.id)}
              className={`ui-hover-lift rounded-full px-3 py-1.5 text-[11px] transition sm:text-xs ${
                active
                  ? 'bg-white text-[#2c3640]'
                  : 'text-white/55 hover:text-white'
              } ${lang === 'zh' ? 'tracking-[0.08em]' : 'uppercase tracking-[0.16em]'}`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onOpenContact}
        className={`ui-hover-lift shrink-0 rounded-full border border-white/20 px-4 py-2 text-white/80 transition hover:border-white/40 hover:text-white ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}
      >
        {copy.nav.cta}
      </button>
    </div>
  )

  return (
    <motion.header
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : compactMotion ? -12 : -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: compactMotion ? 0.45 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40"
    >
      <div className="navbar-panel px-4 py-2 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto max-w-content">

          {/* Mobile layout */}
          <div className="flex items-center justify-between gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              className={`ui-hover-lift rounded-full border border-white/20 px-3.5 py-2 text-white/70 transition hover:border-white/40 hover:text-white ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.16em]'}`}
            >
              {mobileNavOpen ? '✕' : '☰'}
            </button>
            {controls}
          </div>

          {/* Mobile nav */}
          {mobileNavOpen && (
            <nav className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:hidden">
              {navItems.map((item) => {
                const isActive = activeNav === item.href
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setActiveNav(item.href)
                      setMobileNavOpen(false)
                      if (item.hasLock) handleLockShake()
                    }}
                    className={`ui-hover-lift rounded-full border px-3 py-2 text-center transition ${
                      isActive
                        ? 'border-white/30 bg-white/15 text-white'
                        : 'border-white/15 text-white/65 hover:border-white/30 hover:text-white'
                    } ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-[11px] uppercase tracking-[0.12em] sm:text-xs'}`}
                  >
                    {item.hasLock && (
                      <motion.span
                        animate={lockControls}
                        className="inline-block"
                        style={{ display: 'inline-block', marginRight: '0.35rem' }}
                      >
                        <LockIcon className="inline-block h-3.5 w-3.5" />
                      </motion.span>
                    )}
                    {item.label}
                  </a>
                )
              })}
            </nav>
          )}

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:justify-between md:gap-3 lg:gap-6">
            <nav className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto scrollbar-hide lg:gap-5">
              {navItems.map((item) => {
                const isActive = activeNav === item.href
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setActiveNav(item.href)
                      if (item.hasLock) handleLockShake()
                    }}
                    className={`relative shrink-0 whitespace-nowrap px-3 py-2 transition-colors duration-200 lg:px-4 ${
                      isActive
                        ? 'text-white'
                        : 'text-white/55 hover:text-white'
                    } ${lang === 'zh' ? 'text-sm tracking-[0.1em]' : 'text-[12px] uppercase tracking-[0.08em] lg:text-[13px]'}`}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {item.hasLock && (
                      <motion.span
                        animate={lockControls}
                        className="inline-block"
                        style={{ display: 'inline-block', marginRight: '0.35rem', verticalAlign: 'middle' }}
                      >
                        <LockIcon className="inline-block h-[14px] w-[14px] lg:h-4 lg:w-4" />
                      </motion.span>
                    )}
                    {item.label}
                  </a>
                )
              })}
            </nav>

            <div className="shrink-0">{controls}</div>
          </div>

        </div>
      </div>
    </motion.header>
  )
}

export default Navbar
