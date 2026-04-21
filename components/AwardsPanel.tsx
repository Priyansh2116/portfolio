import { DATA } from '@/lib/data'

const panelBox: React.CSSProperties = {
  borderRadius: 14,
  border: '1px solid var(--line-soft)',
  background: 'var(--bg-panel)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  overflow: 'hidden',
}

export default function AwardsPanel() {
  return (
    <section style={panelBox}>
      {/* Header */}
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
          <span style={{ color: 'var(--accent)' }}>·</span>
          <span style={{ color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500 }}>
            Awards
          </span>
        </div>
      </div>

      <div style={{ padding: '6px 0 12px' }}>
        {DATA.awards.map((a, i) => (
          <div
            key={i}
            style={{
              padding: '14px 20px',
              borderTop: i > 0 ? '1px solid var(--line-soft)' : 'none',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 500 }}>{a.t}</div>
            {a.s && (
              <div
                style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 2, fontFamily: 'var(--mono)' }}
              >
                {a.s}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
