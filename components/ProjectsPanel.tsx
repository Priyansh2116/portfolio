'use client'

import { useState } from 'react'
import Tag from './Tag'
import ArrowIcon from './ArrowIcon'
import { DATA, type Project } from '@/lib/data'

const panelBox: React.CSSProperties = {
  borderRadius: 14,
  border: '1px solid var(--line-soft)',
  background: 'var(--bg-panel)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  overflow: 'hidden',
}

function StatusDot({ status }: { status: string }) {
  const color =
    status === 'Live' || status === 'Deployed'
      ? 'oklch(0.72 0.15 150)'
      : status === 'In progress'
        ? 'oklch(0.78 0.15 80)'
        : 'var(--ink-faint)'
  return (
    <span
      style={{
        display: 'inline-block',
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: color,
        flexShrink: 0,
        marginRight: 4,
      }}
    />
  )
}

function ProjectRow({ p, last }: { p: Project; last: boolean }) {
  const [hov, setHov] = useState(false)
  const isExternal = Boolean(p.link)

  const content = (
    <>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', paddingTop: 2 }}>
        {p.year}
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.2 }}>{p.title}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)' }}>
            · {p.kicker}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'var(--mono)',
              fontSize: 10,
              color: 'var(--ink-faint)',
            }}
          >
            <StatusDot status={p.status} />
            {p.status}
          </div>
        </div>
        <div
          style={{ fontSize: 13, color: 'var(--ink-mute)', marginTop: 4, lineHeight: 1.55 }}
        >
          {p.desc}
        </div>
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {p.tech.slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 12,
          color: hov && isExternal ? 'var(--accent-ink)' : 'var(--ink-faint)',
          transition: 'color .2s, transform .2s',
          transform: hov && isExternal ? 'translateX(4px)' : 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          alignSelf: 'center',
          whiteSpace: 'nowrap',
          opacity: isExternal ? 1 : 0.4,
        }}
      >
        {isExternal ? (
          <>
            open <ArrowIcon size={11} />
          </>
        ) : (
          <span title={p.status === 'Internal' ? 'Internal project' : 'Coming soon'}>—</span>
        )}
      </div>
    </>
  )

  const rowStyle: React.CSSProperties = {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '60px 1fr auto',
    gap: 18,
    padding: '18px 20px',
    borderBottom: last ? 'none' : '1px solid var(--line-soft)',
    textDecoration: 'none',
    color: 'inherit',
    background: hov && isExternal ? 'color-mix(in oklch, var(--accent-soft) 40%, transparent)' : 'transparent',
    transition: 'background .2s',
    cursor: isExternal ? 'pointer' : 'default',
  }

  if (p.link) {
    return (
      <a
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={rowStyle}
      >
        {content}
      </a>
    )
  }
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={rowStyle}
    >
      {content}
    </div>
  )
}

export default function ProjectsPanel() {
  return (
    <section id="work" style={panelBox}>
      <PanelHeader num="02" title="Projects" meta={`${DATA.projects.length} total`} />
      <div style={{ display: 'grid' }}>
        {DATA.projects.map((p, i) => (
          <ProjectRow key={p.id} p={p} last={i === DATA.projects.length - 1} />
        ))}
      </div>
    </section>
  )
}

export function PanelHeader({ num, title, meta }: { num: string; title: string; meta?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        borderBottom: '1px solid var(--line-soft)',
        fontFamily: 'var(--mono)',
        fontSize: 11,
        color: 'var(--ink-faint)',
        letterSpacing: 0.4,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: 'var(--accent)' }}>{num}</span>
        <span style={{ color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500 }}>
          {title}
        </span>
      </div>
      {meta && <span>{meta}</span>}
    </div>
  )
}
