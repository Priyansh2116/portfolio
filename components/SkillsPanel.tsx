'use client'

import { useState } from 'react'
import Tag from './Tag'
import { PanelHeader } from './ProjectsPanel'
import { DATA } from '@/lib/data'

const panelBox: React.CSSProperties = {
  borderRadius: 14,
  border: '1px solid var(--line-soft)',
  background: 'var(--bg-panel)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  overflow: 'hidden',
}

export default function SkillsPanel() {
  const [skillFilter, setSkillFilter] = useState<string | null>(null)
  const allCats = Object.keys(DATA.skills)

  return (
    <section id="stack" style={panelBox}>
      <PanelHeader
        num="03"
        title="Stack"
        meta={skillFilter ? `> ${skillFilter}` : 'interactive'}
      />
      <div style={{ padding: '16px 20px 20px' }}>
        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          <FilterPill active={!skillFilter} onClick={() => setSkillFilter(null)}>
            All
          </FilterPill>
          {allCats.map((c) => (
            <FilterPill
              key={c}
              active={skillFilter === c}
              onClick={() => setSkillFilter(skillFilter === c ? null : c)}
            >
              {c}
            </FilterPill>
          ))}
        </div>

        {/* Categories */}
        <div style={{ display: 'grid', gap: 14 }}>
          {allCats.map((cat) => {
            const dim = skillFilter !== null && skillFilter !== cat
            return (
              <div key={cat} style={{ opacity: dim ? 0.3 : 1, transition: 'opacity .25s' }}>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    color: 'var(--ink-faint)',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  {cat}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {DATA.skills[cat].map((s) => (
                    <Tag key={s} active={skillFilter === cat}>
                      {s}
                    </Tag>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FilterPill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? '#fff' : 'var(--ink-mute)',
        padding: '4px 10px',
        borderRadius: 999,
        fontFamily: 'var(--mono)',
        fontSize: 10,
        cursor: 'pointer',
        letterSpacing: 0.3,
        transition: 'all .15s',
      }}
    >
      {children}
    </button>
  )
}
