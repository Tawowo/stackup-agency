'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function LogoMark() {
  return (
    <svg width="40" height="52" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2 L32 2 L32 10 L20 10 L20 22 L4 22 Z" fill="#1E3A5F" />
      <path d="M4 26 L16 26 L16 38 L32 38 L32 46 L4 46 Z" fill="#F59E0B" />
      <path d="M16 10 L32 10 L32 26 L16 26 Z" fill="#2D7DD2" />
    </svg>
  )
}

export default function PageLoader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0A0F1C]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative">
              <motion.div
                className="w-20 h-20 rounded-2xl bg-[#060D1A] border border-white/10 flex items-center justify-center"
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <LogoMark />
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-gold"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <motion.p
                className="text-white font-extrabold tracking-widest text-base uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                Stackup
              </motion.p>
              <motion.p
                className="text-[#F59E0B] font-semibold tracking-[0.25em] text-xs uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.1 }}
              >
                Agency
              </motion.p>
            </div>
            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-electric to-gold rounded-full"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
