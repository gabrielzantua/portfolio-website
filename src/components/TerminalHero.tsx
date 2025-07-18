'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function TerminalHero() {
  const name = 'Gabriel Zantua'
  const title = 'Linux Enthusiast, Programmer, and Networking Specialist'
  
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  
  // Smoother typewriter effect for the main echo
  useEffect(() => {
    const fullText = `$ echo "${name}"`
    let currentIndex = 0
    let animationFrame: number
    let startTime: number
    
    const typeWriter = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      
      const elapsed = timestamp - startTime
      const targetIndex = Math.floor(elapsed / 120) // Smooth 120ms per character
      
      if (targetIndex > currentIndex && currentIndex < fullText.length) {
        currentIndex = Math.min(targetIndex, fullText.length)
        setDisplayText(fullText.slice(0, currentIndex))
      }
      
      if (currentIndex < fullText.length) {
        animationFrame = requestAnimationFrame(typeWriter)
      } else {
        setIsTypingComplete(true)
        // Smooth restart after pause
        setTimeout(() => {
          currentIndex = 0
          startTime = 0
          setDisplayText('')
          setIsTypingComplete(false)
          animationFrame = requestAnimationFrame(typeWriter)
        }, 2500) // Wait 2.5 seconds before restarting
      }
    }
    
    animationFrame = requestAnimationFrame(typeWriter)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])
  
  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative"
      >
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-cyan-500/20 blur-xl rounded-lg transform scale-110" />
        
        {/* Main typewriter text */}
        <h1 className="relative text-4xl sm:text-6xl font-bold mb-4 font-mono bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {displayText}
          <span 
            className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 text-green-400`}
          >
            |
          </span>
        </h1>
      </motion.div>
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
