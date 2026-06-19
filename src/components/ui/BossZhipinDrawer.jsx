import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const BossZhipinDrawer = ({ isOpen, onClose, lang }) => {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  const title = lang === 'zh' ? 'BOSS直聘' : 'BOSS Zhipin'
  const description = lang === 'zh' ? '扫码查看我的 BOSS 直聘信息' : 'Scan to view my BOSS Zhipin profile'
  const placeholder = lang === 'zh' ? '二维码待上传' : 'QR code pending'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/25 backdrop-blur-sm"
          />

          {/* 抽屉 */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col overflow-y-auto bg-[#fbfaf7]/95 shadow-2xl backdrop-blur-xl sm:w-[420px]"
          >
            {/* 关闭按钮 */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-ink/60 backdrop-blur-sm transition hover:border-ink/20 hover:bg-white/80 hover:text-ink"
              style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              {lang === 'zh' ? '关闭' : 'Close'}
            </button>

            {/* 内容 */}
            <div className="flex flex-1 flex-col items-center justify-center px-8 py-16">
              <h2 className={`font-display text-ink ${lang === 'zh' ? 'text-2xl tracking-normal' : 'text-2xl tracking-tight'}`}>
                {title}
              </h2>
              <p className={`mt-3 text-center text-ink/58 ${lang === 'zh' ? 'text-sm leading-relaxed' : 'text-sm leading-relaxed'}`}>
                {description}
              </p>

              {/* 二维码 */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
                {!imgError ? (
                  <img
                    src="/images/qrcodes/boss-zhipin.png"
                    alt="BOSS Zhipin QR Code"
                    onError={() => setImgError(true)}
                    className="h-[240px] w-[240px] object-contain"
                  />
                ) : (
                  <div className="flex h-[240px] w-[240px] items-center justify-center bg-ink/5">
                    <span className="text-center text-ink/30" style={{ fontSize: '12px', letterSpacing: '0.08em' }}>
                      {placeholder}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BossZhipinDrawer
