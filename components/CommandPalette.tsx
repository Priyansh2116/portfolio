'use client'

import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { DATA } from '@/lib/data'

interface Command {
  id: string
  label: string
  hint?: string
  action: () => void
}

interface Props {
  theme: 'light' | 'dark'
  onThemeToggle: () => void
}

export default function CommandPalette({ theme, onThemeToggle }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands: Command[] = [
    { id: 'overview',    label: 'Go to Overview',    hint: 'nav',     action: () => { document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }) } },
    { id: 'work',        label: 'Go to Projects',    hint: 'nav',     action: () => { document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) } },
    { id: 'stack',       label: 'Go to Stack',       hint: 'nav',     action: () => { document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }) } },
    { id: 'experience',  label: 'Go to Experience',  hint: 'nav',     action: () => { document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) } },
    { id: 'contact',     label: 'Go to Contact',     hint: 'nav',     action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) } },
    { id: 'theme',       label: `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`, hint: 'theme', action: onThemeToggle },
    { id: 'github',      label: 'Open GitHub',       hint: 'link ↗',  action: () => window.open(DATA.githubUrl, '_blank') },
    { id: 'linkedin',    label: 'Open LinkedIn',     hint: 'link ↗',  action: () => window.open(DATA.linkedinUrl, '_blank') },
    { id: 'resume',      label: 'View Resume',       hint: 'link ↗',  action: () => window.open(DATA.resumeUrl, '_blank') },
    { id: 'email',       label: 'Send Email',        hint: 'contact', action: () => window.open(`mailto:${DATA.email}`) },
  ]

  const filtered = query.trim()
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
        setQuery('')
        setActive(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => { setActive(0) }, [query])

  const run = (cmd: Command) => {
    cmd.action()
    setOpen(false)
    setQuery('')
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
    if (e.key === 'Enter' && filtered[active]) run(filtered[active])
  }

  if (!mounted) return null

  return createPortal(
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 8000,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '18vh',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 520,
              background: 'var(--bg-raised)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
            }}
          >
            {/* Search input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 16px',
              borderBottom: '1px solid var(--line-soft)',
            }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--accent)' }}>⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: 14,
                  color: 'var(--ink)',
                  fontFamily: 'var(--sans)',
                  padding: 0,
                }}
              />
              <kbd style={kbdStyle}>esc</kbd>
            </div>

            {/* Results */}
            <div style={{ padding: '6px 0', maxHeight: 320, overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <div style={{ padding: '12px 16px', fontSize: 13, color: 'var(--ink-faint)', fontFamily: 'var(--mono)' }}>
                  No commands found.
                </div>
              ) : filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onClick={() => run(cmd)}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '9px 16px',
                    background: i === active ? 'color-mix(in oklch, var(--accent-soft) 60%, transparent)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background .1s',
                  }}
                >
                  <span style={{ fontSize: 13, color: i === active ? 'var(--accent-ink)' : 'var(--ink)' }}>
                    {cmd.label}
                  </span>
                  {cmd.hint && (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)' }}>
                      {cmd.hint}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  )
}

const kbdStyle: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: 10,
  padding: '2px 6px',
  borderRadius: 4,
  background: 'var(--chip-bg)',
  border: '1px solid var(--line)',
  color: 'var(--ink-faint)',
}
