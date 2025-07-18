'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
  type: 'dot' | 'line' | 'square'
}

export default function ModernBackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.min(150, Math.floor((window.innerWidth * window.innerHeight) / 8000))
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.1,
          hue: Math.random() * 60 + 100, // Green-ish hues for terminal theme
          type: ['dot', 'line', 'square'][Math.floor(Math.random() * 3)] as 'dot' | 'line' | 'square'
        })
      }
    }

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get theme colors
      const isDark = document.documentElement.classList.contains('dark')
      const primaryColor = isDark ? '0, 255, 0' : '0, 180, 0' // Terminal green
      const secondaryColor = isDark ? '0, 170, 255' : '0, 120, 200' // Terminal blue
      
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction - particles move away from cursor
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const force = (150 - distance) / 150
          particle.x -= (dx / distance) * force * 0.5
          particle.y -= (dy / distance) * force * 0.5
        }

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Color cycling for variety
        const useSecondary = index % 3 === 0
        const color = useSecondary ? secondaryColor : primaryColor
        
        // Draw particle based on type
        ctx.save()
        ctx.globalAlpha = particle.opacity
        
        switch (particle.type) {
          case 'dot':
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${color}, ${particle.opacity})`
            ctx.fill()
            break
            
          case 'line':
            ctx.beginPath()
            ctx.moveTo(particle.x - particle.size, particle.y)
            ctx.lineTo(particle.x + particle.size, particle.y)
            ctx.strokeStyle = `rgba(${color}, ${particle.opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
            break
            
          case 'square':
            ctx.fillStyle = `rgba(${color}, ${particle.opacity * 0.6})`
            ctx.fillRect(
              particle.x - particle.size / 2,
              particle.y - particle.size / 2,
              particle.size,
              particle.size
            )
            break
        }
        ctx.restore()

        // Connect nearby particles with lines
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.save()
            ctx.globalAlpha = (100 - distance) / 100 * 0.1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(${primaryColor}, 0.3)`
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    initParticles()
    animate()

    // Event listeners
    window.addEventListener('resize', () => {
      resizeCanvas()
      initParticles()
    })
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  )
}
