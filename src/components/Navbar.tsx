import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur border-b border-light-border dark:border-dark-border">
      <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <div className="text-terminal-green font-bold text-lg">
          <Link href="/">$ ~</Link>
        </div>
        <ul className="flex gap-6 font-mono text-sm">
          <li className="hover:text-terminal-green transition-colors">
            <Link href="/about">about</Link>
          </li>
          <li className="hover:text-terminal-green transition-colors">
            <Link href="/projects">projects</Link>
          </li>
          <li className="hover:text-terminal-green transition-colors">
            <Link href="/contact">contact</Link>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  )
}
