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
    title: 'Obsidian Notes',
    description: 'My Second Brain',
    tags: ['Obsidian', 'Notes', 'Second Brain'],
    github: 'https://github.com/gabrielzantua/tuxidian'
  },
  {
    title: 'Portfolio Website',
    description: 'The website you are viewing right now, built with Next.js and Tailwind CSS.',
    tags: ['Web Dev', 'Next.js', 'Tailwind'],
    github: 'https://github.com/gabrielzantua/portfolio-website'
  },
  {
    title: 'Flashcard Creator for Obsidian',
    description: 'A time-efficient desktop application for creating Anki-style flashcards from Obsidian notes.',
    tags: ['Obsidian', 'Flashcards', 'Anki'],
    github: 'https://github.com/gabrielzantua/flashcard-creator'
  },
  {
    title: 'Backup Script for Linux Dotfiles',
    description: 'My Backup Script for Linux Dotfiles',
    tags: ['Linux', 'Shell', 'Dotfiles'],
    github: 'https://github.com/gabrielzantua/backup-script'
  },
  {
    title: 'Project R.I.S.E',
    description: 'Renovating Indoor Sports for Excellence',
    tags: ['Web Dev', 'Tailwind', 'Three.js'],
    github: 'https://gabrielzantua.github.io/PROJECT-R.I.S.E'
  },
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
