'use client'

import { useEffect, useState } from 'react'
import MagButton from './MagButton'
import HeroBg from './HeroBg'
import ArrowIcon from './ArrowIcon'
import { DATA } from '@/lib/data'

const P1 = 'Full-stack AI systems, network tools, and the '
const P2 = 'weird corners'
const P3 = ' between.'
const FULL_LEN = P1.length + P2.length + P3.length

function TypedH1() {
  const [chars, setChars] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    if (chars >= FULL_LEN) return
    const delay = chars === 0 ? 600 : 28
    const t = setTimeout(() => setChars(c => c + 1), delay)
    return () => clearTimeout(t)
  }, [chars])

  useEffect(() => {
    if (chars < FULL_LEN) return
    const t = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(t)
  }, [chars])

  const p1 = P1.slice(0, Math.min(chars, P1.length))
  const p2 = chars > P1.length ? P2.slice(0, Math.min(chars - P1.length, P2.length)) : ''
  const p3 = chars > P1.length + P2.length ? P3.slice(0, chars - P1.length - P2.length) : ''
  const showCursor = chars < FULL_LEN || cursorVisible

  return (
    <h1 style={{ fontSize: 'clamp(28px, 5vw, 60px)', fontWeight: 500, lineHeight: 1.08, letterSpacing: -1.2, margin: 0, maxWidth: 820 }}>
      {p1}
      {p2 && <span style={{ color: 'var(--accent-ink)' }}>{p2}</span>}
      {p3}
      {showCursor && (
        <span style={{ color: 'var(--accent)', fontWeight: 300, marginLeft: 2, opacity: chars < FULL_LEN ? 1 : (cursorVisible ? 1 : 0) }}>|</span>
      )}
    </h1>
  )
}

export default function HeroPanel({ heroBg }: { heroBg: 'particles' | 'mesh' | 'gradient' | 'terminal' }) {
  return (
    <section
      id="overview"
      className="hero-section"
      style={{
        position: 'relative', borderRadius: 16, overflow: 'hidden',
        border: '1px solid var(--line)', background: 'var(--bg-panel)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        padding: '48px 48px 36px', marginBottom: 28,
      }}
    >
      <HeroBg variant={heroBg} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 16 }}>
          <span style={{ color: 'var(--accent)' }}>$</span> cat /about/me.md
        </div>

        <TypedH1 />

        <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.55, color: 'var(--ink-mute)', maxWidth: 620 }}>
          Priyansh Sonthalia — CS undergrad at SRM. Interning at Smoad Networks on real-time network
          monitoring; previously Samsung R&D on LLM-powered pricing systems.
        </p>

        <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <MagButton variant="primary" icon={<ArrowIcon />} href="#work">Browse projects</MagButton>
          <MagButton variant="ghost" href={DATA.resumeUrl}>Resume ↗</MagButton>
        </div>

        <div className="stats-strip" style={{ marginTop: 44, display: 'grid', gridTemplateColumns: `repeat(${DATA.stats.length}, 1fr)`, borderTop: '1px solid var(--line-soft)' }}>
          {DATA.stats.map((s, i) => (
            <div key={s.label} style={{ padding: '16px 18px', borderRight: i < DATA.stats.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: 0.6 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 500, marginTop: 4, letterSpacing: -0.6, fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
