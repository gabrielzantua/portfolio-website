'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
  title: string
  description: string
  tags: string[]
  github: string
}

export default function ProjectCard({ title, description, tags, github }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: -2, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="relative group" >
      <div className="bg-gradient-to-br from-terminal-green/40 via-terminal-blue/30 to-transparent p-[1px] rounded-xl group-hover:shadow-[0_0_15px_theme(colors.terminal-green/40)] transition-all">
        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl shadow-md transition-colors group-hover:bg-light-card/90 dark:group-hover:bg-dark-card/90"
    >
      <h3 className="text-lg font-semibold mb-2 text-terminal-green">{title}</h3>
      <p className="text-sm mb-4 text-light-muted dark:text-dark-muted">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-light-border text-light-text dark:bg-dark-border dark:text-dark-text rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link href={github} target="_blank" className="text-terminal-blue hover:underline text-sm">
        View on GitHub ↗
      </Link>
      </div>
          </div>
    </motion.div>
  )
}
