'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Neuron {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  size: number
  activation: number
  connections: number[]
  lastFired: number
  type: 'input' | 'hidden' | 'output'
  id: string
  isDragging: boolean
  dragOffsetX: number
  dragOffsetY: number
  wanderAngle: number
  wanderRadius: number
  baseX: number
  baseY: number
}

interface DataPacket {
  x: number
  y: number
  targetX: number
  targetY: number
  speed: number
  life: number
  color: string
  command: string
}

interface TerminalWindow {
  x: number
  y: number
  width: number
  height: number
  content: string[]
  opacity: number
  age: number
  isTyping: boolean
  currentLine: string
  typeIndex: number
}

const TERMINAL_COMMANDS = [
  'ls -la /neural/networks/',
  'cat /proc/brain/activity',
  'grep -r "pattern" /memories/*',
  'tail -f /var/log/thoughts.log',
  'ps aux | grep consciousness',
  'netstat -an | grep :8080',
  'find /creativity -name "*.idea"',
  'chmod +x /imagination/dreams',
  'sudo apt update && sudo apt install wisdom',
  'python3 neural_network.py --train',
  'git commit -m "evolving consciousness"',
  'docker run --rm creativity:latest',
  'ssh user@consciousness.local',
  'vim /etc/personality.conf',
  'make intelligence && make install',
  'echo "Gabriel Zantua"',
  'whoami && echo "Gabriel Zantua"',
  'cat ~/.profile | grep "Gabriel"'
]



export default function NeuralTerminalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const neuronsRef = useRef<Neuron[]>([])
  const packetsRef = useRef<DataPacket[]>([])
  const terminalsRef = useRef<TerminalWindow[]>([])

  const mouseRef = useRef({ x: 0, y: 0 })
  const [isReady, setIsReady] = useState(false)
  const lastClick = useRef(0)
  const glitchRef = useRef({ active: false, intensity: 0, duration: 0 })
  const dragRef = useRef({ isDragging: false, neuronId: '', startX: 0, startY: 0 })


  // Initialize neural network structure
  const initializeNeurons = useCallback((canvas: HTMLCanvasElement) => {
    const neurons: Neuron[] = []
    
    // Performance-optimized layer sizing based on screen size
    const screenArea = canvas.width * canvas.height
    const performanceRatio = Math.min(1, screenArea / (1920 * 1080)) // Scale based on screen size
    
    const baseLayers = [8, 12, 10, 8, 6, 3]
    const layers = baseLayers.map(size => Math.ceil(size * Math.sqrt(performanceRatio)))
    
    let neuronId = 0

    layers.forEach((layerSize, layerIndex) => {
      const isInput = layerIndex === 0
      const isOutput = layerIndex === layers.length - 1
      const type = isInput ? 'input' : isOutput ? 'output' : 'hidden'
      
      for (let i = 0; i < layerSize; i++) {
        const x = (canvas.width / (layers.length + 1)) * (layerIndex + 1)
        const y = (canvas.height / (layerSize + 1)) * (i + 1)
        
        const startX = x + (Math.random() - 0.5) * 50
        const startY = y + (Math.random() - 0.5) * 30
        
        neurons.push({
          x: startX,
          y: startY,
          targetX: startX,
          targetY: startY,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 6 + 4,
          activation: Math.random(),
          connections: [],
          lastFired: 0,
          type,
          id: `neuron_${neuronId++}`,
          isDragging: false,
          dragOffsetX: 0,
          dragOffsetY: 0,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderRadius: 50 + Math.random() * 100,
          baseX: startX,
          baseY: startY
        })
      }
    })

    // Create connections between layers
    layers.forEach((_, layerIndex) => {
      if (layerIndex < layers.length - 1) {
        const currentLayerStart = layers.slice(0, layerIndex).reduce((a, b) => a + b, 0)
        const nextLayerStart = layers.slice(0, layerIndex + 1).reduce((a, b) => a + b, 0)
        
        for (let i = currentLayerStart; i < nextLayerStart; i++) {
          for (let j = nextLayerStart; j < nextLayerStart + layers[layerIndex + 1]; j++) {
            // Reduce connection density for better performance while maintaining visual appeal
            if (Math.random() > 0.5) { // 50% connection probability
              neurons[i].connections.push(j)
            }
          }
        }
      }
    })

    neuronsRef.current = neurons
  }, [])

  // Create data packet
  const createDataPacket = useCallback((fromNeuron: Neuron, toNeuron: Neuron) => {
    const packet: DataPacket = {
      x: fromNeuron.x,
      y: fromNeuron.y,
      targetX: toNeuron.x,
      targetY: toNeuron.y,
      speed: Math.random() * 2 + 1,
      life: 1,
      color: `hsl(${120 + Math.random() * 60}, 70%, 60%)`,
      command: TERMINAL_COMMANDS[Math.floor(Math.random() * TERMINAL_COMMANDS.length)]
    }
    packetsRef.current.push(packet)
  }, [])

  // Create terminal window
  const createTerminalWindow = useCallback((x: number, y: number) => {
    const terminal: TerminalWindow = {
      x: x - 150,
      y: y - 100,
      width: 300,
      height: 150,
      content: ['$ ' + TERMINAL_COMMANDS[Math.floor(Math.random() * TERMINAL_COMMANDS.length)]],
      opacity: 0,
      age: 0,
      isTyping: true,
      currentLine: '',
      typeIndex: 0
    }
    terminalsRef.current.push(terminal)
  }, [])



  // Trigger glitch effect
  const triggerGlitch = useCallback(() => {
    glitchRef.current = {
      active: true,
      intensity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 500 + 200
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeNeurons(canvas)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      // Activate nearby neurons
      neuronsRef.current.forEach(neuron => {
        const dx = neuron.x - e.clientX
        const dy = neuron.y - e.clientY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          neuron.activation = Math.min(1, neuron.activation + (100 - distance) / 500)
          neuron.lastFired = Date.now()
        }
      })
    }

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      // Find neuron under mouse
      let targetNeuron: Neuron | null = null
      let minDistance = Infinity
      
      neuronsRef.current.forEach((neuron: Neuron) => {
        const dx = neuron.x - mouseX
        const dy = neuron.y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < neuron.size + 10 && distance < minDistance) {
          minDistance = distance
          targetNeuron = neuron
        }
      })
      
      if (targetNeuron) {
        const neuron = targetNeuron as Neuron
        // Start dragging
        dragRef.current = {
          isDragging: true,
          neuronId: neuron.id,
          startX: mouseX,
          startY: mouseY
        }
        
        neuron.isDragging = true
        neuron.dragOffsetX = mouseX - neuron.x
        neuron.dragOffsetY = mouseY - neuron.y
        
        // Prevent default to avoid text selection
        e.preventDefault()
      }
    }
    
    const handleMouseUp = (e: MouseEvent) => {
      if (dragRef.current.isDragging) {
        const draggedNeuron = neuronsRef.current.find(n => n.id === dragRef.current.neuronId)
        if (draggedNeuron) {
          draggedNeuron.isDragging = false
          // Update base position for wandering
          draggedNeuron.baseX = draggedNeuron.x
          draggedNeuron.baseY = draggedNeuron.y
        }
        
        dragRef.current.isDragging = false
      }
    }

    const handleClick = (e: MouseEvent) => {
      // Only handle click if not dragging
      if (dragRef.current.isDragging) return
      
      const now = Date.now()
      
      // Double click detection
      if (now - lastClick.current < 300) {
        createTerminalWindow(e.clientX, e.clientY)
      }
      
      lastClick.current = now
      
      // Find nearest neuron and fire it
      let nearestNeuron: Neuron | null = null
      let minDistance = Infinity
      
      neuronsRef.current.forEach((neuron: Neuron) => {
        const dx = neuron.x - e.clientX
        const dy = neuron.y - e.clientY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < minDistance) {
          minDistance = distance
          nearestNeuron = neuron
        }
      })
      
      if (nearestNeuron && minDistance < 150) {
        const neuron = nearestNeuron as Neuron
        neuron.activation = 1
        neuron.lastFired = now
        
        // Fire connected neurons
        neuron.connections.forEach((connId: number) => {
          const connectedNeuron = neuronsRef.current[connId]
          if (connectedNeuron) {
            setTimeout(() => {
              createDataPacket(neuron, connectedNeuron)
            }, Math.random() * 200)
          }
        })
      }
    }

    // Performance variables
    let lastFrameTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS
    
    // Animation loop with frame rate limiting
    const animate = (currentTime: number = 0) => {
      // Limit frame rate for better performance
      if (currentTime - lastFrameTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = currentTime
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const now = Date.now()
      const isDark = document.documentElement.classList.contains('dark')
      
      // Apply glitch effect
      if (glitchRef.current.active) {
        ctx.save()
        const intensity = glitchRef.current.intensity
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = `rgba(255, 0, 0, ${intensity * 0.1})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Random displacement
        ctx.translate(
          (Math.random() - 0.5) * intensity * 10,
          (Math.random() - 0.5) * intensity * 10
        )
        
        glitchRef.current.duration -= 16
        if (glitchRef.current.duration <= 0) {
          glitchRef.current.active = false
        }
        ctx.restore()
      }



      // Update neuron positions with smooth movement
      neuronsRef.current.forEach((neuron, index) => {
        // Handle dragging
        if (neuron.isDragging && dragRef.current.isDragging) {
          neuron.x = mouseRef.current.x - neuron.dragOffsetX
          neuron.y = mouseRef.current.y - neuron.dragOffsetY
        } else {
          // Smooth wandering animation when not dragging
          const time = Date.now() * 0.001
          neuron.wanderAngle += (Math.random() - 0.5) * 0.1
          
          // Calculate wander target
          const wanderX = neuron.baseX + Math.cos(neuron.wanderAngle + time * 0.5) * neuron.wanderRadius
          const wanderY = neuron.baseY + Math.sin(neuron.wanderAngle + time * 0.3) * neuron.wanderRadius * 0.6
          
          // Boundary constraints
          const constrainedX = Math.max(neuron.size, Math.min(canvas.width - neuron.size, wanderX))
          const constrainedY = Math.max(neuron.size, Math.min(canvas.height - neuron.size, wanderY))
          
          // Smooth movement towards target (improved easing)
          const easeSpeed = 0.03 // Slightly faster for more responsive feel
          neuron.x += (constrainedX - neuron.x) * easeSpeed
          neuron.y += (constrainedY - neuron.y) * easeSpeed
        }
        
        // Decay activation
        neuron.activation *= 0.99
        
        // Draw connections (optimized - only draw if active)
        neuron.connections.forEach(connId => {
          const connected = neuronsRef.current[connId]
          if (!connected) return
          
          const activation = Math.max(neuron.activation, connected.activation)
          const timeSinceLastFired = now - Math.max(neuron.lastFired, connected.lastFired)
          const fadeOut = Math.max(0, 1 - timeSinceLastFired / 2000)
          
          // Only draw if connection is visible (performance optimization)
          if (activation * fadeOut < 0.01) return
          
          ctx.save()
          ctx.globalAlpha = activation * fadeOut * 0.3
          ctx.strokeStyle = isDark ? '#00ff00' : '#00aa00'
          ctx.lineWidth = 1 + activation * 2
          ctx.beginPath()
          ctx.moveTo(neuron.x, neuron.y)
          ctx.lineTo(connected.x, connected.y)
          ctx.stroke()
          ctx.restore()
        })

        // Draw neuron
        const timeSinceLastFired = now - neuron.lastFired
        const glow = Math.max(0, 1 - timeSinceLastFired / 1000)
        
        ctx.save()
        ctx.globalAlpha = 0.7 + neuron.activation * 0.3
        
        // Glow effect
        if (glow > 0) {
          ctx.shadowColor = isDark ? '#00ff00' : '#00aa00'
          ctx.shadowBlur = 10 + glow * 20
        }
        
        // Neuron color based on type
        let neuronColor = isDark ? '0, 255, 0' : '0, 170, 0' // Green
        if (neuron.type === 'input') neuronColor = isDark ? '0, 170, 255' : '0, 136, 204' // Blue
        if (neuron.type === 'output') neuronColor = isDark ? '255, 102, 0' : '204, 68, 0' // Orange
        
        // Enhanced neuron rendering with beautiful glow effect
        const gradient = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, neuron.size * 1.5)
        gradient.addColorStop(0, `rgba(${neuronColor}, ${Math.min(1, neuron.activation + 0.4)})`)
        gradient.addColorStop(0.6, `rgba(${neuronColor}, ${Math.min(0.8, neuron.activation + 0.2)})`)
        gradient.addColorStop(1, `rgba(${neuronColor}, 0)`)
        
        // Add outer glow for more beautiful effect
        const outerGradient = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, neuron.size * 2.5)
        outerGradient.addColorStop(0, `rgba(${neuronColor}, ${Math.min(0.3, neuron.activation)})`)
        outerGradient.addColorStop(1, `rgba(${neuronColor}, 0)`)
        
        // Draw outer glow
        ctx.fillStyle = outerGradient
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.size * 2.5, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw main neuron
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Calculate distance from mouse for hover effects
        const dx = mouseRef.current.x - neuron.x
        const dy = mouseRef.current.y - neuron.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 30) {
          ctx.fillStyle = isDark ? '#ffffff' : '#000000'
          ctx.font = '10px monospace'
          ctx.fillText(neuron.id, neuron.x + 15, neuron.y - 15)
        }
        
        ctx.restore()
      })

      // Update and draw data packets
      packetsRef.current = packetsRef.current.filter(packet => {
        const dx = packet.targetX - packet.x
        const dy = packet.targetY - packet.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < packet.speed) {
          // Packet reached target
          return false
        }
        
        // Move packet
        packet.x += (dx / distance) * packet.speed
        packet.y += (dy / distance) * packet.speed
        packet.life -= 0.01
        
        // Draw packet
        ctx.save()
        ctx.globalAlpha = packet.life
        ctx.fillStyle = packet.color
        ctx.shadowColor = packet.color
        ctx.shadowBlur = 5
        ctx.beginPath()
        ctx.arc(packet.x, packet.y, 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw command text
        ctx.fillStyle = isDark ? '#ffffff' : '#000000'
        ctx.font = '8px monospace'
        ctx.fillText(packet.command.slice(0, 20) + '...', packet.x + 5, packet.y - 5)
        
        ctx.restore()
        
        return packet.life > 0
      })

      // Update and draw terminal windows
      terminalsRef.current = terminalsRef.current.filter(terminal => {
        terminal.age += 16
        terminal.opacity = Math.min(1, terminal.age / 200) * Math.max(0, 1 - (terminal.age - 2000) / 800)
        
        if (terminal.opacity <= 0) return false
        
        // Typing animation (faster)
        if (terminal.isTyping && terminal.age % 20 === 0) { // Faster typing (was 50)
          const command = TERMINAL_COMMANDS[Math.floor(Math.random() * TERMINAL_COMMANDS.length)]
          if (terminal.typeIndex < command.length) {
            terminal.currentLine = command.slice(0, terminal.typeIndex++)
          } else {
            terminal.content.push('$ ' + command)
            terminal.typeIndex = 0
            if (terminal.content.length > 4) { // Fewer lines (was 8)
              terminal.isTyping = false
            }
          }
        }
        
        // Draw terminal window
        ctx.save()
        ctx.globalAlpha = terminal.opacity
        
        // Terminal background
        ctx.fillStyle = isDark ? 'rgba(10, 10, 10, 0.9)' : 'rgba(245, 245, 245, 0.9)'
        ctx.fillRect(terminal.x, terminal.y, terminal.width, terminal.height)
        
        // Terminal border
        ctx.strokeStyle = isDark ? '#00ff00' : '#00aa00'
        ctx.lineWidth = 1
        ctx.strokeRect(terminal.x, terminal.y, terminal.width, terminal.height)
        
        // Terminal title bar
        ctx.fillStyle = isDark ? '#1a1a1a' : '#e0e0e0'
        ctx.fillRect(terminal.x, terminal.y, terminal.width, 20)
        
        // Terminal text
        ctx.fillStyle = isDark ? '#00ff00' : '#00aa00'
        ctx.font = '10px monospace'
        
        terminal.content.forEach((line, index) => {
          ctx.fillText(line, terminal.x + 5, terminal.y + 35 + index * 12)
        })
        
        // Current typing line
        if (terminal.isTyping) {
          ctx.fillText('$ ' + terminal.currentLine + '_', terminal.x + 5, terminal.y + 35 + terminal.content.length * 12)
        }
        
        ctx.restore()
        
        return true
      })



      // Auto-fire neurons occasionally
      if (Math.random() < 0.02) {
        const randomNeuron = neuronsRef.current[Math.floor(Math.random() * neuronsRef.current.length)]
        randomNeuron.activation = Math.min(1, randomNeuron.activation + 0.5)
        randomNeuron.lastFired = now
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    setIsReady(true)
    animate()

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('click', handleClick)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('click', handleClick)
    }
  }, [initializeNeurons, createDataPacket, createTerminalWindow, triggerGlitch])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-20"
        style={{ 
          background: 'transparent',
          cursor: dragRef.current.isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      />
      {isReady && (
        <div className="fixed bottom-4 right-4 -z-10 text-xs font-mono opacity-50 pointer-events-none">
          <div className="bg-black/20 p-2 rounded border border-terminal-green/30">
            Neural Network Active<br/>
            Click neurons to fire<br/>
            Double-click for terminal<br/>
            Move mouse to activate
          </div>
        </div>
      )}
    </>
  )
}
