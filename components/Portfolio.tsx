'use client'

import { useEffect, useState, useCallback } from 'react'
import ChromeBar from './ChromeBar'
import Sidebar from './Sidebar'
import HeroPanel from './HeroPanel'
import ProjectsPanel from './ProjectsPanel'
import SkillsPanel from './SkillsPanel'
import ExperiencePanel from './ExperiencePanel'
import AwardsPanel from './AwardsPanel'
import ContactPanel from './ContactPanel'
import GridBg from './GridBg'
import CustomCursor from './CustomCursor'
import CommandPalette from './CommandPalette'

type Theme = 'light' | 'dark'
type HeroVariant = 'particles' | 'mesh' | 'gradient'

const ACCENTS: Record<string, { h: number; c: number }> = {
  slate:      { h: 230, c: 0.045 },
  terracotta: { h: 35,  c: 0.09 },
  moss:       { h: 135, c: 0.05 },
  graphite:   { h: 260, c: 0.01 },
}

function applyAccent(key: string) {
  const a = ACCENTS[key] ?? ACCENTS.slate
  const r = document.documentElement
  r.style.setProperty('--accent',      `oklch(0.52 ${a.c} ${a.h})`)
  r.style.setProperty('--accent-soft', `oklch(0.92 ${a.c * 0.4} ${a.h})`)
  r.style.setProperty('--accent-glow', `oklch(0.7 ${a.c} ${a.h} / 0.25)`)
  r.style.setProperty('--accent-ink',  `oklch(0.35 ${a.c} ${a.h})`)
}

export default function Portfolio() {
  const [theme, setTheme] = useState<Theme>('light')
  const [accent, setAccent] = useState('slate')
  const [heroBg, setHeroBg] = useState<HeroVariant>('particles')
  const [activeSection, setActiveSection] = useState('overview')

  // Hydrate from localStorage / system preference
  useEffect(() => {
    const savedTheme = (localStorage.getItem('portfolio.theme') as Theme) ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    const savedAccent = localStorage.getItem('portfolio.accent') ?? 'slate'
    const savedHero = (localStorage.getItem('portfolio.hero') as HeroVariant) ?? 'particles'
    setTheme(savedTheme)
    setAccent(savedAccent)
    setHeroBg(savedHero)
    document.documentElement.setAttribute('data-theme', savedTheme)
    applyAccent(savedAccent)
  }, [])

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('portfolio.theme', next)
  }, [theme])

  // Intersection observer for active sidebar nav
  useEffect(() => {
    const sections = ['overview', 'work', 'stack', 'experience', 'contact']
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <>
      <CustomCursor />
      <CommandPalette theme={theme} onThemeToggle={toggleTheme} />
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          background: 'var(--bg)',
          color: 'var(--ink)',
          fontFamily: 'var(--sans)',
        }}
      >
        <GridBg />

        {/* Accent toggle — top-right corner */}
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 30,
            display: 'flex',
            gap: 6,
            background: 'var(--bg-panel)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid var(--line-soft)',
            borderRadius: 999,
            padding: '6px 10px',
          }}
        >
          {Object.entries(ACCENTS).map(([key, val]) => (
            <button
              key={key}
              aria-label={`Switch to ${key} accent`}
              title={key}
              onClick={() => {
                setAccent(key)
                applyAccent(key)
                localStorage.setItem('portfolio.accent', key)
              }}
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: `oklch(0.52 ${val.c} ${val.h})`,
                border: accent === key ? '2px solid var(--ink)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'border .15s',
                padding: 0,
              }}
            />
          ))}
          {(['particles', 'mesh', 'gradient'] as const).map((v) => (
            <button
              key={v}
              title={`Hero: ${v}`}
              onClick={() => {
                setHeroBg(v)
                localStorage.setItem('portfolio.hero', v)
              }}
              style={{
                padding: '3px 8px',
                borderRadius: 999,
                background: heroBg === v ? 'var(--bg-raised)' : 'transparent',
                border: `1px solid ${heroBg === v ? 'var(--line)' : 'transparent'}`,
                cursor: 'pointer',
                fontFamily: 'var(--mono)',
                fontSize: 10,
                color: heroBg === v ? 'var(--ink)' : 'var(--ink-faint)',
                fontWeight: heroBg === v ? 500 : 400,
                transition: 'all .15s',
              }}
            >
              {v}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <ChromeBar theme={theme} onThemeToggle={toggleTheme} />

          <div style={{ display: 'flex', flex: 1 }}>
            {/* Sidebar — hidden on mobile via inline media query workaround */}
            <div className="sidebar-wrapper">
              <Sidebar activeSection={activeSection} />
            </div>

            {/* Main content */}
            <main style={{ flex: 1, padding: '32px 40px 80px', minWidth: 0 }}>
              <HeroPanel heroBg={heroBg} />

              {/* Projects + Skills */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.6fr 1fr',
                  gap: 20,
                  marginBottom: 28,
                }}
                className="two-col-main"
              >
                <ProjectsPanel />
                <SkillsPanel />
              </div>

              {/* Experience + Awards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: 20,
                  marginBottom: 28,
                }}
                className="two-col-exp"
              >
                <ExperiencePanel />
                <AwardsPanel />
              </div>

              <ContactPanel />
            </main>
          </div>
        </div>

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 1023px) {
            .sidebar-wrapper { display: none; }
            .two-col-main { grid-template-columns: 1fr !important; }
            .two-col-exp  { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 767px) {
            main { padding: 16px 16px 60px !important; }
          }
        `}</style>
      </div>
    </>
  )
}
