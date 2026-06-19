import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FadeInView from '../motion/FadeInView'
import { toolGroups } from '../../data/tools'
import { siteCopy } from '../../i18n/siteCopy'

// SMP 软件截图
const smpScreenshots = [
  '/media/gallery/sofware01/StartMenuPro_gkQ4AAmeg6.png',
  '/media/gallery/sofware01/StartMenuPro_hGNycgMUA2.png',
  '/media/gallery/sofware01/StartMenuPro_Jylm6kxEJm.png',
  '/media/gallery/sofware01/StartMenuPro_LRogJbhRGJ.png',
  '/media/gallery/sofware01/StartMenuPro_Lu34TqfBY7.png',
  '/media/gallery/sofware01/StartMenuPro_NNP8949lrC.png',
  '/media/gallery/sofware01/StartMenuPro_XqT5MceyVi.png',
]

// 管理员邀请码（实际应该放在服务器端验证）
const ADMIN_INVITE_CODE = 'ADMIN2026'

// For real access control, move verification to a Vercel API or Cloudflare Worker and return temporary private-storage download URLs.
const SecretTools = ({ lang }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showInvitePrompt, setShowInvitePrompt] = useState(false)
  const [inviteCode, setInviteCode] = useState('')
  const [inviteError, setInviteError] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState('')
  const copy = siteCopy?.[lang] ?? siteCopy.zh
  const sectionCopy = copy.secretTools ?? siteCopy.zh.secretTools

  const localizedGroups = useMemo(
    () =>
      toolGroups.map((group) => ({
        ...group,
        title: group.title?.[lang] ?? group.title?.zh ?? group.title?.en ?? '',
        items: group.items.map((tool) => ({
          ...tool,
          description: tool.description?.[lang] ?? tool.description?.zh ?? tool.description?.en ?? '',
          system: tool.system?.[lang] ?? tool.system?.zh ?? tool.system?.en ?? '',
        })),
      })),
    [lang],
  )

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % smpScreenshots.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + smpScreenshots.length) % smpScreenshots.length)
  }

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = ''
  }

  const handleDownloadClick = (url) => {
    setDownloadUrl(url)
    setShowInvitePrompt(true)
    setInviteCode('')
    setInviteError(false)
  }

  const closeInvitePrompt = () => {
    setShowInvitePrompt(false)
    setInviteCode('')
    setInviteError(false)
  }

  const handleInviteSubmit = (e) => {
    e.preventDefault()
    if (inviteCode.trim() === ADMIN_INVITE_CODE) {
      // 验证成功，开始下载
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = ''
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      closeInvitePrompt()
    } else {
      // 验证失败
      setInviteError(true)
    }
  }

  return (
    <>
      <section id="secret-tools" className="section-shell py-16 sm:py-20 md:py-24 lg:py-28">
        <FadeInView delay={0.08}>
          <div className="mt-10 sm:mt-12">
            <div className="grid gap-6 lg:grid-cols-2 xl:gap-8">
              {/* 左侧：工具信息 */}
              <div>
                {localizedGroups.map((group) => (
                  <section
                    key={group.id}
                    className="rounded-[1.5rem] border border-white/60 bg-white/70 p-5 shadow-soft backdrop-blur-xl md:p-6"
                  >
                    <h3 className={`font-display text-xl text-ink ${lang === 'zh' ? 'tracking-normal leading-[1.18]' : 'tracking-display'}`}>
                      {group.title}
                    </h3>
                    <div className="mt-4 space-y-4">
                      {group.items.map((tool) => (
                        <article key={tool.id} className="rounded-[1.25rem] border border-ink/8 bg-white/55 p-4">
                          <div className="space-y-3">
                            <div>
                              <h4 className={`text-base text-ink ${lang === 'zh' ? 'tracking-[0.04em]' : 'tracking-[0.02em]'}`}>{tool.name}</h4>
                              <p className={`mt-2 text-sm text-ink/60 ${lang === 'zh' ? 'leading-7' : 'leading-6'}`}>{tool.description}</p>
                            </div>
                            <dl className="space-y-2 text-sm text-ink/60">
                              <div className="flex items-center justify-between gap-4 border-t border-ink/8 pt-3">
                                <dt className={lang === 'zh' ? 'tracking-[0.08em] text-ink/40' : 'uppercase tracking-[0.16em] text-ink/40'}>{sectionCopy.version}</dt>
                                <dd className="text-right text-ink/72">{tool.version}</dd>
                              </div>
                              <div className="flex items-center justify-between gap-4">
                                <dt className={lang === 'zh' ? 'tracking-[0.08em] text-ink/40' : 'uppercase tracking-[0.16em] text-ink/40'}>{sectionCopy.size}</dt>
                                <dd className="text-right text-ink/72">{tool.size}</dd>
                              </div>
                              <div className="flex items-center justify-between gap-4">
                                <dt className={lang === 'zh' ? 'tracking-[0.08em] text-ink/40' : 'uppercase tracking-[0.16em] text-ink/40'}>{sectionCopy.system}</dt>
                                <dd className="text-right text-ink/72">{tool.system}</dd>
                              </div>
                            </dl>
                            <button
                              type="button"
                              onClick={() => handleDownloadClick(tool.downloadUrl)}
                              className={`ui-hover-lift inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-full border border-ink/14 bg-white/65 px-5 text-ink/72 transition hover:border-ink/28 hover:bg-white hover:text-ink active:scale-[0.98] ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}
                            >
                              {sectionCopy.download}
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* 右侧：图片预览 */}
              <div className="rounded-[1.5rem] border border-white/60 bg-white/70 p-5 shadow-soft backdrop-blur-xl md:p-6">
                <h3 className={`font-display text-xl text-ink mb-4 ${lang === 'zh' ? 'tracking-normal leading-[1.18]' : 'tracking-display'}`}>
                  {lang === 'zh' ? '软件预览' : 'Software Preview'}
                </h3>
                <div className="relative">
                  {/* 图片容器 - 可点击放大 */}
                  <button
                    type="button"
                    onClick={openModal}
                    className="relative w-full overflow-hidden rounded-lg bg-ink/5 transition hover:ring-2 hover:ring-ink/20 cursor-zoom-in"
                  >
                    <img
                      src={smpScreenshots[currentImageIndex]}
                      alt={`SMP Screenshot ${currentImageIndex + 1}`}
                      className="w-full h-auto"
                    />
                    {/* 放大提示 */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition">
                      <svg className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </button>

                  {/* 导航按钮 */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={prevImage}
                      className="ui-hover-lift flex h-10 w-10 items-center justify-center rounded-full border border-ink/14 bg-white/65 text-ink/72 transition hover:border-ink/28 hover:bg-white hover:text-ink active:scale-[0.98]"
                      aria-label="Previous image"
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                        <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* 指示器 */}
                    <div className="flex items-center gap-2">
                      {smpScreenshots.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'w-6 bg-ink/60'
                              : 'w-2 bg-ink/20 hover:bg-ink/40'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={nextImage}
                      className="ui-hover-lift flex h-10 w-10 items-center justify-center rounded-full border border-ink/14 bg-white/65 text-ink/72 transition hover:border-ink/28 hover:bg-white hover:text-ink active:scale-[0.98]"
                      aria-label="Next image"
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                        <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {/* 图片计数 */}
                  <p className={`mt-3 text-center text-sm text-ink/50 ${lang === 'zh' ? 'tracking-[0.08em]' : 'tracking-[0.12em]'}`}>
                    {currentImageIndex + 1} / {smpScreenshots.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInView>
      </section>

      {/* 放大模态框 */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            {/* 关闭按钮 */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 图片容器 */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={smpScreenshots[currentImageIndex]}
                alt={`SMP Screenshot ${currentImageIndex + 1}`}
                className="max-h-[90vh] w-auto rounded-lg"
              />

              {/* 模态框内的导航按钮 */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5">
                  <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 backdrop-blur-sm"
                aria-label="Next image"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5">
                  <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* 底部计数和指示器 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  {smpScreenshots.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'w-8 bg-white'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-white/80">
                  {currentImageIndex + 1} / {smpScreenshots.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 邀请码提示模态框 */}
      <AnimatePresence>
        {showInvitePrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={closeInvitePrompt}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md rounded-[1.5rem] border border-white/60 bg-white/95 p-6 shadow-soft backdrop-blur-xl dark:border-white/20 dark:bg-[#1a1a1a]/95"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <button
                type="button"
                onClick={closeInvitePrompt}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition hover:bg-ink/5 hover:text-ink dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 内容 */}
              <div>
                <div className="flex items-start gap-3 mb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/8 dark:bg-white/8">
                    <svg className="h-5 w-5 text-ink/60 dark:text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`mb-1 text-lg font-medium text-ink dark:text-white/90 ${lang === 'zh' ? 'tracking-[0.02em]' : 'tracking-tight'}`}>
                      {lang === 'zh' ? '请输入管理员邀请码' : 'Enter Admin Invitation Code'}
                    </h3>
                    <p className={`text-sm text-ink/60 dark:text-white/50 ${lang === 'zh' ? 'leading-6' : 'leading-5'}`}>
                      {lang === 'zh' ? '此软件需要管理员邀请码才能下载' : 'This software requires an admin invitation code to download'}
                    </p>
                  </div>
                </div>

                {/* 输入框 */}
                <form onSubmit={handleInviteSubmit}>
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => {
                      setInviteCode(e.target.value)
                      setInviteError(false)
                    }}
                    placeholder={lang === 'zh' ? '请输入邀请码' : 'Enter invitation code'}
                    className={`w-full rounded-full border ${
                      inviteError ? 'border-red-400 dark:border-red-500' : 'border-ink/12 dark:border-white/12'
                    } bg-white/75 px-5 py-3 text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/28 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white/28 ${lang === 'zh' ? 'text-sm tracking-[0.06em]' : 'text-sm'}`}
                    autoFocus
                  />
                  {inviteError && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                      {lang === 'zh' ? '邀请码不正确，请重新输入' : 'Invalid invitation code, please try again'}
                    </p>
                  )}

                  {/* 按钮组 */}
                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={closeInvitePrompt}
                      className={`flex-1 inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-ink/14 bg-white/65 px-5 text-ink/72 transition hover:border-ink/28 hover:bg-white hover:text-ink active:scale-[0.98] dark:border-white/14 dark:bg-white/5 dark:text-white/72 dark:hover:border-white/28 dark:hover:bg-white/10 ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}
                    >
                      {lang === 'zh' ? '取消' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className={`flex-1 inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-ink px-5 text-white transition hover:opacity-90 active:scale-[0.98] dark:bg-white/90 dark:text-ink ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}
                    >
                      {lang === 'zh' ? '确认' : 'Confirm'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SecretTools
