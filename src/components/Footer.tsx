import { Github, Linkedin, Globe } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-light-border dark:border-dark-border mt-16 py-6 text-center text-sm text-light-muted dark:text-dark-muted">
      <div className="flex justify-center gap-6 mb-4">
        <Link href="https://github.com/gabrielzantua" target="_blank" aria-label="GitHub" className="hover:text-terminal-green">
          <Github size={18} />
        </Link>
        <Link href="https://www.linkedin.com/in/gabriel-zantua" target="_blank" aria-label="LinkedIn" className="hover:text-terminal-green">
          <Linkedin size={18} />
        </Link>
        <Link href="https://mastodon.social/@yourhandle" target="_blank" aria-label="Mastodon" className="hover:text-terminal-green">
          <Globe size={18} />
        </Link>
      </div>
      <p>
        © {new Date().getFullYear()} Gabriel Zantua. Built with Next.js & Tailwind CSS.
      </p>  
    </footer>
  )
}
