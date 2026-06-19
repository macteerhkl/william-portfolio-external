import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FadeInView from '../motion/FadeInView'
import { siteCopy } from '../../i18n/siteCopy'
import { useScrollLock } from '../../hooks/useScrollLock'
import BossZhipinDrawer from '../ui/BossZhipinDrawer'

const WeChatMark = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
    <path d="M8.2 4.2c-3.42 0-6.2 2.31-6.2 5.26 0 1.69.92 3.18 2.35 4.15l-.6 2.23 2.39-1.25c.63.15 1.28.23 1.95.23.16 0 .32-.01.48-.02a5.87 5.87 0 0 1-.67-2.72c0-2.94 2.78-5.26 6.2-5.26.14 0 .28.01.42.02-.88-1.55-2.75-2.62-4.92-2.62Zm-2.54 4.39a.87.87 0 1 1 0 1.74.87.87 0 0 1 0-1.74Zm5.08 0a.87.87 0 1 1 0 1.74.87.87 0 0 1 0-1.74ZM15.78 8.6c-3.43 0-6.22 2.2-6.22 4.94 0 2.74 2.79 4.95 6.22 4.95.69 0 1.37-.09 2-.27l2.44 1.28-.66-2.35c1.4-.91 2.24-2.29 2.24-3.61 0-2.74-2.78-4.94-6.02-4.94Zm-2.49 3.28a.82.82 0 1 1 0 1.64.82.82 0 0 1 0-1.64Zm4.98 0a.82.82 0 1 1 0 1.64.82.82 0 0 1 0-1.64Z" />
  </svg>
)

const contactItems = [
  { id: 'wechat', flag: <WeChatMark />, labelKey: 'wechat', value: 'A18581795129', allowCopy: true },
]

const phoneItems = [
  { id: 'hk', flag: '🇭🇰', labelKey: 'hongKong', value: '+85294020545', displayValue: '+852 •••• ••45', allowCopy: false },
  { id: 'uk', flag: '🇬🇧', labelKey: 'unitedKingdom', value: '+447563834009', displayValue: '+44 •••• •••09', allowCopy: false },
]

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
}

const Contact = ({ lang, isOpen, onOpen, onClose, drawerOnly = false }) => {
  const [copiedId, setCopiedId] = useState('')
  const [bossDrawerOpen, setBossDrawerOpen] = useState(false)
  const copy = siteCopy?.[lang] ?? siteCopy.zh

  useScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!copiedId) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setCopiedId(''), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [copiedId])

  const copyValue = async (id, value) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = value
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'absolute'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }

      setCopiedId(id)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = value
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedId(id)
    }
  }

  return (
    <>
    {!drawerOnly && (
    <section id="contact" className="section-shell py-16 sm:py-20 md:py-24 lg:py-28">
      <FadeInView>
        <div className="rounded-[1.75rem] border border-ink/10 bg-ink px-4 py-8 text-white shadow-[0_28px_90px_rgba(10,10,10,0.18)] sm:rounded-[2rem] sm:px-6 sm:py-11 md:px-10 md:py-14 lg:px-14">
          <p className={`text-white/45 ${lang === 'zh' ? 'text-sm tracking-[0.12em]' : 'text-xs uppercase tracking-[0.24em]'}`}>
            {copy.contact.eyebrow}
          </p>
          <div className="mt-7 grid gap-9 lg:mt-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-end lg:gap-10">
            <div>
              <h2 className={`font-display text-white sm:text-[2.35rem] md:text-5xl lg:text-6xl ${lang === 'zh' ? 'text-[2rem] leading-[1.18] tracking-normal' : 'text-[2rem] leading-[1.02] tracking-display'}`}>
                {copy.contact.title}
              </h2>
              <p className={`mt-3 text-white/85 sm:text-xl md:text-2xl ${lang === 'zh' ? 'text-lg tracking-[0.02em]' : 'text-base tracking-tight'}`}>
                {copy.contact.subtitle}
              </p>
              <p className={`mt-6 max-w-2xl text-sm text-white/70 sm:text-base ${lang === 'zh' ? 'leading-8' : 'leading-7'}`}>
                {copy.contact.intro}
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={onOpen}
                className={`ui-hover-lift block w-full rounded-full bg-white px-6 py-4 text-center text-ink transition hover:bg-stone-warm ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.2em]'}`}
              >
                {copy.contact.open}
              </button>
            </div>
          </div>
        </div>
      </FadeInView>
    </section>
    )}

      <AnimatePresence>
        {isOpen ? (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-ink/12 backdrop-blur-[2px]"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.28 }}
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              role="dialog"
              aria-modal="true"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-black/20 bg-[#2c3640] shadow-[-8px_0_60px_rgba(0,0,0,0.3)] sm:w-[420px] md:w-[480px]"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 px-5 py-5 sm:px-7 sm:py-6">
                <div className="min-w-0">
                  <p className={`text-white ${lang === 'zh' ? 'text-sm tracking-[0.12em]' : 'text-xs uppercase tracking-[0.24em]'}`}>
                    {copy.contact.eyebrow}
                  </p>
                  <h2 className={`mt-2 font-display text-white ${lang === 'zh' ? 'text-[1.75rem] leading-[1.18] tracking-normal' : 'text-[1.75rem] leading-[1.02] tracking-display'}`}>
                    {copy.contact.open}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={copy.contact.close}
                  className="ui-hover-lift ml-4 mt-1 shrink-0 rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white/40 hover:text-white"
                >
                  <span className={lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.2em]'}>
                    {copy.contact.close}
                  </span>
                </button>
              </div>

              {/* Contact items */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-7">
                <div className="grid gap-3">
                  {/* 微信 - 首位 */}
                  {contactItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => item.allowCopy && copyValue(item.id, item.value)}
                      className="ui-hover-lift w-full rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-4 text-left transition hover:border-white/20 hover:bg-white/12 sm:px-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className={`flex items-center gap-2 text-white ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}>
                            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-white">{item.flag}</span>
                            <span>{copy.contact[item.labelKey]}</span>
                          </p>
                          <p className="mt-2 break-all text-base text-white sm:text-lg">{item.value}</p>
                        </div>
                        <span className={`shrink-0 text-white ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}>
                          {copiedId === item.id ? copy.contact.copied : copy.contact.copy}
                        </span>
                      </div>
                    </button>
                  ))}

                  {/* BOSS直聘 - 第二位 */}
                  <button
                    type="button"
                    onClick={() => setBossDrawerOpen(true)}
                    className={`ui-hover-lift w-full rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-4 text-left transition hover:border-white/20 hover:bg-white/12 sm:px-5 ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.14em]'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className={`text-white ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}>
                          {lang === 'zh' ? '招聘平台' : 'Recruitment'}
                        </p>
                        <p className="mt-2 text-base text-white sm:text-lg">
                          {lang === 'zh' ? 'BOSS直聘' : 'BOSS Zhipin'}
                        </p>
                      </div>
                      <span className={`shrink-0 text-white ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}>
                        {lang === 'zh' ? '扫码查看' : 'Scan QR'}
                      </span>
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="my-1 border-t border-white/10" />

                  {/* 模糊电话号码 - 不可复制 */}
                  {phoneItems.map((item) => (
                    <div
                      key={item.id}
                      className="w-full rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-4 sm:px-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className={`flex items-center gap-2 text-white ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}>
                            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-white">{item.flag}</span>
                            <span>{copy.contact[item.labelKey]}</span>
                          </p>
                          <p className="mt-2 break-all text-base text-white/60 sm:text-lg">{item.displayValue}</p>
                        </div>
                        <span className={`shrink-0 text-white/40 ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}>
                          {lang === 'zh' ? '已隐藏' : 'Hidden'}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* WhatsApp - 模糊显示 */}
                  <div
                    className="block w-full rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-4 sm:px-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className={`text-white ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}>
                          WhatsApp
                        </p>
                        <p className="mt-2 text-base text-white/60 sm:text-lg">
                          +31 •••• •• 264
                        </p>
                      </div>
                      <span className={`shrink-0 text-white/40 ${lang === 'zh' ? 'text-sm tracking-[0.08em]' : 'text-xs uppercase tracking-[0.18em]'}`}>
                        {lang === 'zh' ? '已隐藏' : 'Hidden'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

    <BossZhipinDrawer isOpen={bossDrawerOpen} onClose={() => setBossDrawerOpen(false)} lang={lang} />
  </>
  )
}

export default Contact
