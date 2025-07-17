'use client'

import ProjectCard from '@/components/ProjectCard'
import { motion } from 'framer-motion'


const projects = [
  {
    title: 'Dotfiles Backup',
    description: 'A declarative dotfiles manager written in Bash to keep your *nix config under version control.',
    tags: ['Linux', 'Shell', 'Dotfiles'],
    github: 'https://github.com/gabrielzantua/dotfiles-backup'
  },
  {
    title: 'Packet Sniffer',
    description: 'A tiny TCP/IP packet sniffer built with Go for educational purposes.',
    tags: ['Networking', 'Go', 'TCP/IP'],
    github: 'https://github.com/gabrielzantua/packetsniffer'
  },
  {
    title: 'Portfolio Website',
    description: 'The website you are viewing right now, built with Next.js and Tailwind CSS.',
    tags: ['Web Dev', 'Next.js', 'Tailwind'],
    github: 'https://github.com/gabrielzantua/portfolio-website'
  }
]

export default function ProjectsPage() {
  return (
    <section>
      <motion.h1
        className="text-3xl font-bold mb-6 text-terminal-green"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Projects
      </motion.h1>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}
