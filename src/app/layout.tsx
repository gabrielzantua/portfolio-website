import './globals.css'
import { JetBrains_Mono, Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import MouseShadowBackground from '../components/MouseShadowBackground'

import Footer from '../components/Footer'
import type { Metadata } from 'next'

const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Portfolio | Linux Enthusiast, Programmer, Networking Specialist',
  description: 'Personal portfolio showcasing Linux, programming, and networking projects.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text font-mono">
        <MouseShadowBackground />
        <Navbar />
        <main className="flex-1 mx-auto max-w-5xl p-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
