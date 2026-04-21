'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { DATA } from '@/lib/data'

interface NavItem {
  n: string
  l: string
  href: string
  active?: boolean
}

interface Props {
  activeSection: string
  onNavClick?: () => void
}

const navItems: NavItem[] = [
  { n: '01', l: 'Overview', href: '#overview' },
  { n: '02', l: 'Projects', href: '#work' },
  { n: '03', l: 'Stack', href: '#stack' },
  { n: '04', l: 'Experience', href: '#experience' },
  { n: '05', l: 'Contact', href: '#contact' },
]

export default function Sidebar({ activeSection, onNavClick }: Props) {
  const [lightbox, setLightbox] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <aside
      style={{
        padding: '24px 20px',
        borderRight: '1px solid var(--line-soft)',
        background: 'color-mix(in oklch, var(--bg-raised) 50%, transparent)',
        position: 'sticky',
        top: 46,
        alignSelf: 'flex-start',
        height: 'calc(100vh - 46px)',
        overflowY: 'auto',
        flexShrink: 0,
        width: 260,
      }}
    >
      {/* Profile */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          paddingBottom: 20,
          borderBottom: '1px solid var(--line-soft)',
        }}
      >
        <button onClick={() => setLightbox(true)} style={{ flexShrink: 0, display: 'block', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <img
            src="/photo.jpg"
            alt="Priyansh Sonthalia"
            width={48}
            height={48}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              border: '2px solid var(--line-soft)',
              transition: 'border-color .15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line-soft)')}
          />
        </button>

        {mounted && lightbox && createPortal(
          <div
            onClick={() => setLightbox(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9000,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'zoom-out',
            }}
          >
            <img
              src="/photo.jpg"
              alt="Priyansh Sonthalia"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '80vw',
                maxHeight: '85vh',
                borderRadius: 20,
                objectFit: 'contain',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                cursor: 'default',
              }}
            />
          </div>,
          document.body
        )}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Priyansh</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)' }}>
            @priyansh · srm &apos;27
          </div>
        </div>
      </div>

      {/* Navigate */}
      <SideGroup label="navigate">
        <div style={{ display: 'grid', gap: 2 }}>
          {navItems.map((it) => {
            const isActive = activeSection === it.href.slice(1)
            return (
              <a
                key={it.l}
                href={it.href}
                onClick={onNavClick}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  padding: '6px 10px',
                  borderRadius: 6,
                  fontSize: 13,
                  textDecoration: 'none',
                  color: isActive ? 'var(--ink)' : 'var(--ink-mute)',
                  background: isActive ? 'var(--chip-bg)' : 'transparent',
                  fontWeight: isActive ? 500 : 400,
                  transition: 'background .15s, color .15s',
                }}
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)' }}>
                  {it.n}
                </span>
                {it.l}
              </a>
            )
          })}
        </div>
      </SideGroup>

      {/* Status */}
      <SideGroup label="status">
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            display: 'grid',
            gap: 6,
            color: 'var(--ink-mute)',
          }}
        >
          <KVRow k="role" v="intern" />
          <KVRow k="at" v="Smoad" />
          <KVRow k="focus" v="full-stack" />
          <KVRow k="open" v="Summer '26" accent />
        </div>
      </SideGroup>

      {/* Links */}
      <SideGroup label="links">
        <div style={{ display: 'grid', gap: 4, fontFamily: 'var(--mono)', fontSize: 11 }}>
          <a href={DATA.githubUrl} target="_blank" rel="noopener noreferrer" className="sidelink">
            github.com/Priyansh2116 ↗
          </a>
          <a href={DATA.linkedinUrl} target="_blank" rel="noopener noreferrer" className="sidelink">
            linkedin/priyansh-sonthalia ↗
          </a>
          <a href={`mailto:${DATA.email}`} className="sidelink">
            mail ↗
          </a>
        </div>
      </SideGroup>
    </aside>
  )
}

function SideGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 22 }}>
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          color: 'var(--ink-faint)',
          letterSpacing: 1,
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  )
}

function KVRow({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: 'var(--ink-faint)' }}>{k}</span>
      <span style={{ color: accent ? 'var(--accent)' : 'var(--ink)' }}>{v}</span>
    </div>
  )
}
