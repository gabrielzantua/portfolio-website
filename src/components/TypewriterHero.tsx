'use client'

import { useEffect, useState } from 'react'

export default function TypewriterHero() {
  const [displayText, setDisplayText] = useState('')
  const [currentPhase, setCurrentPhase] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  
  const phrases = [
    'Gabriel Zantua',
    'Full-Stack Developer',
    'AI Enthusiast',
    'Problem Solver'
  ]
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const typeWriter = async () => {
      const currentPhrase = phrases[currentPhase]
      
      // Typing phase
      for (let i = 0; i <= currentPhrase.length; i++) {
        await new Promise(resolve => {
          timeoutId = setTimeout(() => {
            setDisplayText(currentPhrase.slice(0, i))
            resolve(void 0)
          }, 100 + Math.random() * 50) // Variable typing speed for natural feel
        })
      }
      
      // Pause at end
      await new Promise(resolve => {
        timeoutId = setTimeout(resolve, currentPhase === 0 ? 5000 : 2500)
      })
      
      // Erasing phase (except for main name)
      if (currentPhase > 0) {
        for (let i = currentPhrase.length; i >= 0; i--) {
          await new Promise(resolve => {
            timeoutId = setTimeout(() => {
              setDisplayText(currentPhrase.slice(0, i))
              resolve(void 0)
            }, 50)
          })
        }
        
        // Brief pause before next phrase
        await new Promise(resolve => {
          timeoutId = setTimeout(resolve, 1000)
        })
      }
      
      // Move to next phase
      setCurrentPhase((prev) => (prev + 1) % phrases.length)
    }
    
    typeWriter()
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [currentPhase])
  
  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    
    return () => clearInterval(cursorInterval)
  }, [])
  
  return (
    <div className="fixed top-8 left-8 z-20 pointer-events-none select-none">
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-cyan-500/20 blur-xl rounded-lg transform scale-110" />
        
        {/* Main text */}
        <div className="relative bg-black/10 dark:bg-white/5 backdrop-blur-sm rounded-lg px-6 py-4 border border-green-500/20">
          <div className="font-mono text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            $ echo "{displayText}"
            <span 
              className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
              style={{ color: 'currentColor' }}
            >
              |
            </span>
          </div>
          
          {/* Subtitle for main name */}
          {currentPhase === 0 && displayText === phrases[0] && (
            <div className="mt-2 text-sm text-gray-400 dark:text-gray-500 font-mono opacity-0 animate-fade-in">
              Portfolio & Projects
            </div>
          )}
        </div>
        
        {/* Terminal window decoration */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full opacity-60" />
        <div className="absolute -top-1 -left-1 translate-x-4 w-3 h-3 bg-yellow-500 rounded-full opacity-60" />
        <div className="absolute -top-1 -left-1 translate-x-8 w-3 h-3 bg-green-500 rounded-full opacity-60" />
      </div>
    </div>
  )
}
