'use client'

import { useEffect, useRef } from 'react'

function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    let w = 0, h = 0
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    let raf: number

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = cv.parentElement!.getBoundingClientRect()
      w = r.width; h = r.height
      cv.width = w * dpr; cv.height = h * dpr
      cv.style.width = w + 'px'; cv.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 42; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.4,
      })
    }

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4a6fa5'

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
      }
      ctx.strokeStyle = accent
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 140) {
            ctx.globalAlpha = (1 - d / 140) * 0.25
            ctx.beginPath()
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 0.7
      ctx.fillStyle = accent
      for (const p of particles) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.9 }}
    />
  )
}

export default function HeroBg({ variant = 'particles' }: { variant?: 'particles' | 'mesh' | 'gradient' }) {
  if (variant === 'gradient') {
    return (
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: '-20%',
          background: 'radial-gradient(60% 50% at 20% 30%, var(--accent-glow), transparent 70%), radial-gradient(50% 50% at 80% 70%, var(--accent-soft), transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>
    )
  }
  if (variant === 'particles') {
    return (
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <ParticleField />
      </div>
    )
  }
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
        <defs>
          <radialGradient id="m1" cx="30%" cy="40%" r="40%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="m2" cx="75%" cy="65%" r="35%">
            <stop offset="0%" stopColor="var(--accent-ink)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent-ink)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#m1)" />
        <rect width="100%" height="100%" fill="url(#m2)" />
      </svg>
    </div>
  )
}
