'use client'

import { useState } from 'react'
import MagButton from './MagButton'
import ArrowIcon from './ArrowIcon'
import { DATA } from '@/lib/data'

const panelBox: React.CSSProperties = {
  borderRadius: 14,
  border: '1px solid var(--line-soft)',
  background: 'var(--bg-panel)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  overflow: 'hidden',
  padding: 40,
}

export default function ContactPanel() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('All fields are required.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email.')
      return
    }
    setError('')
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`)
    window.open(`mailto:${DATA.email}?subject=${subject}&body=${body}`, '_blank')
    setSent(true)
  }

  return (
    <section id="contact" style={panelBox}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: 'var(--mono)',
              fontSize: 11,
              color: 'var(--ink-faint)',
              letterSpacing: 0.8,
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>05</span>
            <span style={{ width: 24, height: 1, background: 'var(--line)', display: 'inline-block' }} />
            <span>Contact</span>
          </div>

          <h3
            style={{
              fontSize: 32,
              fontWeight: 500,
              letterSpacing: -0.8,
              margin: '16px 0 8px',
              lineHeight: 1.1,
            }}
          >
            Got a weird problem?
          </h3>
          <p style={{ fontSize: 14, color: 'var(--ink-mute)', lineHeight: 1.55, margin: 0 }}>
            Say hi — I respond faster than my terminal.
          </p>

          <div
            style={{
              marginTop: 20,
              display: 'grid',
              gap: 6,
              fontFamily: 'var(--mono)',
              fontSize: 12,
            }}
          >
            <KVRow k="email" v={DATA.email} href={`mailto:${DATA.email}`} />
            <KVRow k="github" v="@Priyansh2116" href={DATA.githubUrl} />
            <KVRow k="linkedin" v="in/priyansh-sonthalia" href={DATA.linkedinUrl} />
          </div>
        </div>

        {/* Right — Form */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }} noValidate>
          {sent ? (
            <div
              style={{
                padding: '20px',
                borderRadius: 8,
                border: '1px solid var(--line)',
                background: 'var(--accent-soft)',
                color: 'var(--accent-ink)',
                fontFamily: 'var(--mono)',
                fontSize: 13,
                textAlign: 'center',
              }}
            >
              ✓ Message opened in your email client.
            </div>
          ) : (
            <>
              <label htmlFor="contact-name" style={{ display: 'none' }}>Name</label>
              <input
                id="contact-name"
                placeholder="your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                autoComplete="name"
              />
              <label htmlFor="contact-email" style={{ display: 'none' }}>Email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                autoComplete="email"
              />
              <label htmlFor="contact-message" style={{ display: 'none' }}>Message</label>
              <textarea
                id="contact-message"
                placeholder="what's the problem?"
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
              {error && (
                <p style={{ fontSize: 12, color: 'oklch(0.55 0.18 25)', fontFamily: 'var(--mono)' }}>
                  {error}
                </p>
              )}
              <MagButton variant="primary" icon={<ArrowIcon />} type="submit">
                Send
              </MagButton>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

function KVRow({ k, v, href }: { k: string; v: string; href?: string }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <span style={{ color: 'var(--ink-faint)', minWidth: 64 }}>{k}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--ink)', textDecoration: 'none', transition: 'color .15s' }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--ink)')}
        >
          {v}
        </a>
      ) : (
        <span style={{ color: 'var(--ink)' }}>{v}</span>
      )}
    </div>
  )
}
