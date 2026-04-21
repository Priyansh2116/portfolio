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

export default function ExperiencePanel() {
  return (
    <section id="experience" style={panelBox}>
      <PanelHeader num="04" title="Experience" meta="timeline" />
      <div style={{ padding: '16px 20px 24px' }}>
        {DATA.experience.map((e, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '110px 1fr',
              gap: 16,
              padding: '14px 0',
              borderTop: i > 0 ? '1px solid var(--line-soft)' : 'none',
            }}
          >
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)', lineHeight: 1.6 }}>
              {e.when}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{e.role}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>{e.company}</div>
              <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 3 }}>
                {e.bullets.map((b, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: 12,
                      color: 'var(--ink-mute)',
                      paddingLeft: 12,
                      position: 'relative',
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 9,
                        width: 4,
                        height: 1,
                        background: 'var(--ink-faint)',
                      }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
