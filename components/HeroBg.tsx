'use client'

import { useEffect, useRef, useState } from 'react'

const TERM_LINES = [
  { type: 'cmd',  text: 'whoami' },
  { type: 'out',  text: 'priyansh sonthalia · full-stack engineer' },
  { type: 'cmd',  text: 'cat /status' },
  { type: 'out',  text: "interning @ smoad · open to summer '26" },
  { type: 'cmd',  text: 'ls /projects/' },
  { type: 'out',  text: 'AIIMAGING  SAMSUNG  RUDRA  STARSHIP  NETMON' },
  { type: 'cmd',  text: 'git log --oneline -2' },
  { type: 'out',  text: 'a1b2c3 shipped implantdetect.com' },
  { type: 'out',  text: 'd4e5f6 built samsung pricing platform' },
  { type: 'cmd',  text: '' },
]

function TerminalBg() {
  const [shownLines, setShownLines] = useState<{ type: string; text: string; partial: string }[]>([])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    if (lineIdx >= TERM_LINES.length) { setDone(true); return }

    const line = TERM_LINES[lineIdx]
    const speed = line.type === 'cmd' ? 45 : 18

    if (charIdx < line.text.length) {
      const t = setTimeout(() => {
        const partial = line.text.slice(0, charIdx + 1)
        setShownLines(prev => {
          const next = [...prev]
          next[lineIdx] = { ...line, partial }
          return next
        })
        setCharIdx(c => c + 1)
      }, speed)
      return () => clearTimeout(t)
    } else {
      const pause = line.type === 'cmd' ? 180 : 80
      const t = setTimeout(() => {
        setShownLines(prev => {
          const next = [...prev]
          next[lineIdx] = { ...line, partial: line.text }
          return next
        })
        setLineIdx(l => l + 1)
        setCharIdx(0)
      }, pause)
      return () => clearTimeout(t)
    }
  }, [lineIdx, charIdx, done])

  return (
    <div
      aria-hidden
      className="terminal-bg"
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '52%',
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '24px 32px',
        maskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          lineHeight: 2,
          color: 'var(--ink)',
          opacity: 0.75,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {shownLines.map((line, i) => (
          <div key={i}>
            {line.type === 'cmd' ? (
              <span>
                <span style={{ color: 'var(--accent)', marginRight: 8 }}>$</span>
                {line.partial}
                {i === lineIdx - 1 && !done && (
                  <span style={{ animation: 'blink 1s step-end infinite', marginLeft: 1 }}>█</span>
                )}
              </span>
            ) : (
              <span style={{ paddingLeft: 16, color: 'var(--ink-faint)' }}>
                {line.partial}
              </span>
            )}
          </div>
        ))}
        {done && (
          <div>
            <span style={{ color: 'var(--accent)', marginRight: 8 }}>$</span>
            <span style={{ animation: 'blink 1s step-end infinite' }}>█</span>
          </div>
        )}
      </div>
    </div>
  )
}


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

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.0 + 0.4,
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
          if (d < 130) {
            ctx.globalAlpha = (1 - d / 130) * 0.22
            ctx.beginPath()
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 0.6
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
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 1 }}
    />
  )
}

export default function HeroBg({ variant = 'terminal' }: { variant?: 'particles' | 'mesh' | 'gradient' | 'terminal' }) {
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
  if (variant === 'terminal') return <TerminalBg />
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
