'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Pulse {
  id: number
  x: number
  y: number
}

export default function MouseShadowBackground() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)
  const [pulses, setPulses] = useState<Pulse[]>([])
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isMoving, setIsMoving] = useState(false)
  const [shadowOpacity, setShadowOpacity] = useState(0)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })

  // Smooth animated mouse shadow with beautiful in/out transitions
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e
      
      setLastMousePos({ x, y })
      
      if (!isMoving) {
        setIsMoving(true)
        // Smooth fade-in animation
        setShadowOpacity(0.3)
      }
      
      if (overlayRef.current) {
        const dark = document.documentElement.classList.contains('dark')
        const edge = dark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.15)'
        
        // Use CSS transitions for smooth movement
        overlayRef.current.style.transition = 'all 0.1s ease-out'
        overlayRef.current.style.background = `radial-gradient(200px at ${x}px ${y}px, rgba(0,255,0,${shadowOpacity}) 0%, ${edge} 100%)`
      }
      
      // Clear existing timeout
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current)
      }
      
      // Set new timeout to smoothly hide shadow after 600ms of no movement
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false)
        // Smooth fade-out animation
        setShadowOpacity(0)
        
        if (overlayRef.current) {
          const dark = document.documentElement.classList.contains('dark')
          const edge = dark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.15)'
          overlayRef.current.style.transition = 'all 0.6s ease-out'
          overlayRef.current.style.background = `radial-gradient(200px at ${lastMousePos.x}px ${lastMousePos.y}px, rgba(0,255,0,0) 0%, ${edge} 100%)`
        }
      }, 600)
    }
    
    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current)
      }
    }
  }, [isMoving, shadowOpacity, lastMousePos.x, lastMousePos.y])

  // Click → add a pulse animation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      idRef.current += 1
      setPulses((prev) => [...prev, { id: idRef.current, x: e.clientX, y: e.clientY }])
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-300 dark:bg-transparent"
      // Transparent until mouse moves
    >
      <AnimatePresence>
        {pulses.map((pulse) => (
          <motion.span
            key={pulse.id}
            className="absolute rounded-full bg-green-400/20 pointer-events-none"
            style={{ width: 40, height: 40, left: pulse.x - 20, top: pulse.y - 20 }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onAnimationComplete={() =>
              setPulses((prev) => prev.filter((p) => p.id !== pulse.id))
            }
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
