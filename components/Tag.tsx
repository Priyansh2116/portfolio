interface Props {
  children: React.ReactNode
  active?: boolean
}

export default function Tag({ children, active = false }: Props) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: 999,
        fontFamily: 'var(--mono)',
        fontSize: 11,
        letterSpacing: 0.2,
        color: active ? 'var(--accent-ink)' : 'var(--ink-mute)',
        background: active ? 'var(--accent-soft)' : 'var(--chip-bg)',
        border: `1px solid ${active ? 'transparent' : 'var(--line-soft)'}`,
        transition: 'all .15s',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}
