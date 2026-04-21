'use client'

import { useEffect, useState } from 'react'

export default function CmdKHint() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('portfolio.cmdkhint.v2')) return
    } catch {}

    const show = setTimeout(() => setVisible(true), 2500)
    const hide = setTimeout(() => {
      setFading(true)
      setTimeout(() => {
        setVisible(false)
        try { localStorage.setItem('portfolio.cmdkhint.v2', '1') } catch {}
      }, 400)
    }, 6000)

    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 72,
        right: 24,
        zIndex: 500,
        background: 'var(--accent)',
        borderRadius: 999,
        padding: '7px 14px',
        fontFamily: 'var(--mono)',
        fontSize: 11,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 16px var(--accent-glow)',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease',
        animation: fading ? 'none' : 'fadeUp 0.35s ease',
      }}
    >
      press
      <span style={{ display: 'inline-flex', gap: 3 }}>
        <kbd style={kbdStyle}>⌘</kbd>
        <kbd style={kbdStyle}>K</kbd>
      </span>
      to navigate
    </div>
  )
}

const kbdStyle: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: 10,
  padding: '2px 5px',
  borderRadius: 4,
  background: 'rgba(255,255,255,0.2)',
  border: '1px solid rgba(255,255,255,0.3)',
  color: '#fff',
}
