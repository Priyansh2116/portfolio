'use client'

import { useEffect, useState } from 'react'
import Dot from './Dot'

interface Props {
  theme: 'light' | 'dark'
  onThemeToggle: () => void
  onHamburger: () => void
  mobileNavOpen: boolean
}

export default function ChromeBar({ theme, onThemeToggle, onHamburger, mobileNavOpen }: Props) {
  const [date, setDate] = useState('')

  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 46,
        borderBottom: '1px solid var(--line-soft)',
        background: 'var(--bg-panel)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        fontFamily: 'var(--mono)',
        fontSize: 11,
        color: 'var(--ink-mute)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Hamburger — mobile only */}
        <button
          className="hamburger"
          onClick={onHamburger}
          aria-label="Toggle navigation"
          style={{
            display: 'none', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, background: 'none', border: 'none',
            cursor: 'pointer', padding: 4, borderRadius: 6, color: 'var(--ink-mute)',
            flexShrink: 0,
          }}
        >
          {mobileNavOpen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M2 4h12M2 8h12M2 12h12" />
            </svg>
          )}
        </button>

        <div className="chrome-traffic" style={{ display: 'flex', gap: 6 }}>
          {(['#f87171', '#fbbf24', '#4ade80'] as const).map((c) => (
            <i key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, display: 'block', flexShrink: 0 }} />
          ))}
        </div>
        <span>~/priyansh/portfolio</span>
        <span style={{ color: 'var(--ink-faint)' }}>main</span>
        <span style={{ color: 'var(--ink-faint)' }}>·</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'oklch(0.72 0.15 150)' }}>
          <Dot tone="live" />
          live
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span>sess · 001</span>
        {date && <span>{date}</span>}
        <button
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: 'var(--chip-bg)',
            border: '1px solid var(--line)',
            borderRadius: 999,
            cursor: 'pointer',
            padding: '3px 8px 3px 6px',
            fontFamily: 'var(--mono)',
            fontSize: 10,
            color: 'var(--ink-mute)',
            transition: 'background .15s, border-color .15s',
          }}
        >
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
              width: 28,
              height: 14,
              borderRadius: 999,
              background: theme === 'dark' ? 'var(--accent)' : 'var(--line)',
              transition: 'background .2s',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 2,
                left: theme === 'dark' ? 'calc(100% - 12px)' : 2,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left .2s cubic-bezier(.4,0,.2,1)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.18)',
              }}
            />
          </span>
          <span>{theme === 'light' ? '☀' : '☽'}</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <kbd style={kbdStyle}>⌘</kbd>
          <kbd style={kbdStyle}>K</kbd>
        </div>
      </div>
    </div>
  )
}

const kbdStyle: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: 10,
  padding: '1px 5px',
  borderRadius: 3,
  background: 'var(--chip-bg)',
  border: '1px solid var(--line)',
  color: 'var(--ink-mute)',
}
