import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import About from './components/sections/About'
import Gallery from './components/sections/Gallery'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import ProjectModal from './components/ui/ProjectModal'
import SuperToolsPage from './pages/SuperToolsPage'
import TutorialsPage from './pages/TutorialsPage'

const getPage = () => {
  const hash = window.location.hash
  if (hash === '#/super-tools') return 'super-tools'
  if (hash === '#/tutorials') return 'tutorials'
  return 'home'
}

const App = () => {
  const [lang, setLang] = useState('zh')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [page, setPage] = useState(getPage)
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('theme') ?? 'light'
  })

  // 刷新时强制回到顶部，禁用浏览器自动 scroll 恢复
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  // 同步 class 到 <html> 并持久化
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    const handleHash = () => setPage(getPage())
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const navbarProps = { lang, setLang, onOpenContact: () => setIsContactOpen(true), theme, onToggleTheme: toggleTheme }

  if (page === 'super-tools') {
    return (
      <div className="min-h-screen text-ink dark:text-white/88">
        <Navbar {...navbarProps} />
        <main>
          <SuperToolsPage lang={lang} />
        </main>
        <Contact
          lang={lang}
          drawerOnly
          isOpen={isContactOpen}
          onOpen={() => setIsContactOpen(true)}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    )
  }

  if (page === 'tutorials') {
    return (
      <div className="min-h-screen text-ink dark:text-white/88">
        <Navbar {...navbarProps} />
        <main>
          <TutorialsPage lang={lang} />
        </main>
        <Contact
          lang={lang}
          drawerOnly
          isOpen={isContactOpen}
          onOpen={() => setIsContactOpen(true)}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen text-ink dark:text-white/88">
      <Navbar {...navbarProps} />
      <main>
        <About lang={lang} />
        <Experience lang={lang} />
        <Gallery lang={lang} onOpen={setSelectedProject} />
      </main>
      <Footer lang={lang} />
      <Contact
        lang={lang}
        drawerOnly
        isOpen={isContactOpen}
        onOpen={() => setIsContactOpen(true)}
        onClose={() => setIsContactOpen(false)}
      />
      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal lang={lang} project={selectedProject} onClose={() => setSelectedProject(null)} />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default App
