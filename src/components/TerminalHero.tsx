'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TerminalHero() {
  const name = 'Gabriel Zantua'
  const title = 'Linux Enthusiast, Programmer, and Networking Specialist'

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.h1
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        initial="hidden"
        animate="visible"
        className="text-4xl sm:text-6xl font-bold text-terminal-green mb-4 whitespace-nowrap overflow-hidden border-r-4 border-terminal-green animate-typing inline-block"
        
        
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {`$ echo \"${name}\"`}
      </motion.h1>
      <motion.h2
        className="text-lg sm:text-2xl text-light-muted dark:text-dark-muted mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="mt-8 flex gap-4"
        
        
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link href="/about" className="px-4 py-2 rounded bg-terminal-green text-dark-bg hover:bg-terminal-green/80 transition-colors">About Me</Link>
        <Link href="/projects" className="px-4 py-2 rounded border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-dark-bg transition-colors">Projects</Link>
      </motion.div>
    </section>
  )
}
