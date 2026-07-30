'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

type CookiePrefs = {
  analytics: boolean
  marketing: boolean
}

export default function CookieBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [prefs, setPrefs] = useState<CookiePrefs>({ analytics: false, marketing: false })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
    setShowModal(false)
  }

  const refuseAll = () => {
    localStorage.setItem('cookie-consent', 'refused')
    setVisible(false)
    setShowModal(false)
  }

  const savePrefs = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ technical: true, ...prefs }))
    setVisible(false)
    setShowModal(false)
  }

  if (!visible) return null

  return (
    <>
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-gray-900 border-t border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-white/80 text-sm flex-1">
            {t.cookie.message}{' '}
            <Link href="/cookies" className="text-white underline">{t.cookie.learnMore}</Link>
          </p>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={refuseAll}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors"
            >
              {t.cookie.refuseAll}
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors"
            >
              {t.cookie.customize}
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 bg-navy hover:bg-electric text-white text-sm font-semibold rounded-xl transition-colors"
            >
              {t.cookie.acceptAll}
            </button>
          </div>
        </div>
      </div>

      {/* Preferences modal */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t.cookie.manageTitle}</h2>
            <p className="text-gray-500 dark:text-white/50 text-sm mb-5">
              {t.cookie.manageDesc}
            </p>

            <div className="space-y-4">
              {/* Technical — always on */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded bg-electric flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    {t.cookie.technical}
                    <span className="text-xs font-normal text-muted dark:text-white/40">{t.cookie.technicalRequired}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-white/50 mt-0.5">{t.cookie.technicalDesc}</p>
                </div>
              </div>

              {/* Analytics */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={e => setPrefs(p => ({ ...p, analytics: e.target.checked }))}
                  className="mt-0.5 w-5 h-5 rounded accent-electric cursor-pointer flex-shrink-0"
                />
                <div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">{t.cookie.analytics}</div>
                  <p className="text-xs text-gray-500 dark:text-white/50 mt-0.5">{t.cookie.analyticsDesc}</p>
                </div>
              </label>

              {/* Marketing */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={e => setPrefs(p => ({ ...p, marketing: e.target.checked }))}
                  className="mt-0.5 w-5 h-5 rounded accent-electric cursor-pointer flex-shrink-0"
                />
                <div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">{t.cookie.marketing}</div>
                  <p className="text-xs text-gray-500 dark:text-white/50 mt-0.5">{t.cookie.marketingDesc}</p>
                </div>
              </label>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={refuseAll}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white text-sm font-medium rounded-xl transition-colors"
              >
                {t.cookie.refuseAll}
              </button>
              <button
                onClick={savePrefs}
                className="flex-1 py-2.5 bg-navy hover:bg-electric text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {t.cookie.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
