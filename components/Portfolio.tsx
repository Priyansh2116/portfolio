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
import FadeIn from './FadeIn'
import CmdKHint from './CmdKHint'

type Theme = 'light' | 'dark'
type HeroVariant = 'particles' | 'mesh' | 'gradient' | 'terminal'

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
  const [heroBg, setHeroBg] = useState<HeroVariant>('terminal')
  const [activeSection, setActiveSection] = useState('overview')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const savedTheme = (localStorage.getItem('portfolio.theme') as Theme) ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    const savedAccent = localStorage.getItem('portfolio.accent') ?? 'slate'
    const savedHero = (localStorage.getItem('portfolio.hero') as HeroVariant) ?? 'terminal'
    setTheme(savedTheme)
    setAccent(savedAccent)
    setHeroBg(savedHero)
    document.documentElement.setAttribute('data-theme', savedTheme)
    applyAccent(savedAccent)
  }, [])

  // Close nav on route change / scroll
  useEffect(() => {
    if (mobileNavOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileNavOpen])

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('portfolio.theme', next)
  }, [theme])

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
      <CmdKHint />

      <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'var(--sans)' }}>
        <GridBg />

        {/* Accent + hero toggle */}
        <div className="settings-panel" style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 30,
          display: 'flex', gap: 6, flexWrap: 'wrap', maxWidth: 200,
          background: 'var(--bg-panel)', backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--line-soft)',
          borderRadius: 12, padding: '8px 10px', justifyContent: 'flex-end',
        }}>
          {Object.entries(ACCENTS).map(([key, val]) => (
            <button key={key} aria-label={`Switch to ${key} accent`} title={key}
              onClick={() => { setAccent(key); applyAccent(key); localStorage.setItem('portfolio.accent', key) }}
              style={{ width: 14, height: 14, borderRadius: '50%', background: `oklch(0.52 ${val.c} ${val.h})`, border: accent === key ? '2px solid var(--ink)' : '2px solid transparent', cursor: 'pointer', transition: 'border .15s', padding: 0 }}
            />
          ))}
          <div style={{ width: '100%', height: 1, background: 'var(--line-soft)' }} />
          {(['terminal', 'particles', 'mesh', 'gradient'] as const).map((v) => (
            <button key={v} title={`Hero: ${v}`}
              onClick={() => { setHeroBg(v); localStorage.setItem('portfolio.hero', v) }}
              style={{ padding: '3px 8px', borderRadius: 999, background: heroBg === v ? 'var(--bg-raised)' : 'transparent', border: `1px solid ${heroBg === v ? 'var(--line)' : 'transparent'}`, cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 10, color: heroBg === v ? 'var(--ink)' : 'var(--ink-faint)', fontWeight: heroBg === v ? 500 : 400, transition: 'all .15s' }}
            >
              {v}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <ChromeBar theme={theme} onThemeToggle={toggleTheme} onHamburger={() => setMobileNavOpen(o => !o)} mobileNavOpen={mobileNavOpen} />

          <div style={{ display: 'flex', flex: 1 }}>
            {/* Mobile overlay */}
            {mobileNavOpen && (
              <div
                onClick={() => setMobileNavOpen(false)}
                style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
              />
            )}

            {/* Sidebar */}
            <div className={`sidebar-wrapper${mobileNavOpen ? ' mob-open' : ''}`}>
              <Sidebar activeSection={activeSection} onNavClick={() => setMobileNavOpen(false)} />
            </div>

            {/* Main content */}
            <main className="main-content" style={{ flex: 1, padding: '32px 40px 80px', minWidth: 0 }}>
              <HeroPanel heroBg={heroBg} />

              <FadeIn delay={0}>
                <div style={{ display: 'grid', gap: 20, marginBottom: 28 }} className="two-col-main">
                  <ProjectsPanel />
                  <SkillsPanel />
                </div>
              </FadeIn>

              <FadeIn delay={60}>
                <div style={{ display: 'grid', gap: 20, marginBottom: 28 }} className="two-col-exp">
                  <ExperiencePanel />
                  <AwardsPanel />
                </div>
              </FadeIn>

              <FadeIn delay={120}>
                <ContactPanel />
              </FadeIn>
            </main>
          </div>
        </div>

        <style>{`
          .two-col-main { grid-template-columns: 1.6fr 1fr; }
          .two-col-exp  { grid-template-columns: 1.2fr 1fr; }

          /* Tablet */
          @media (max-width: 1023px) {
            .sidebar-wrapper {
              position: fixed !important;
              top: 46px; left: 0; bottom: 0;
              z-index: 45;
              width: 260px;
              transform: translateX(-260px);
              transition: transform 0.3s cubic-bezier(.4,0,.2,1);
              height: calc(100vh - 46px);
              display: block !important;
            }
            .sidebar-wrapper.mob-open {
              transform: translateX(0);
              box-shadow: 8px 0 32px rgba(0,0,0,0.15);
            }
            .hamburger { display: flex !important; }
            .two-col-main { grid-template-columns: 1fr !important; }
            .two-col-exp  { grid-template-columns: 1fr !important; }
            .main-content { padding: 24px 24px 80px !important; }
          }

          /* Mobile */
          @media (max-width: 767px) {
            .main-content { padding: 16px 16px 80px !important; }
            .hero-section { padding: 24px 20px 20px !important; }
            .stats-strip  { grid-template-columns: repeat(2, 1fr) !important; }
            .contact-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
            .exp-row      { grid-template-columns: 1fr !important; gap: 4px !important; }
            .exp-date     { font-size: 10px !important; margin-bottom: 4px; }
            .chrome-traffic { display: none !important; }
            .settings-panel { display: none !important; }
            .project-row-grid { grid-template-columns: 1fr auto !important; }
            .project-year { display: none !important; }
            .terminal-bg  { display: none !important; }
          }
        `}</style>
      </div>
    </>
  )
}
