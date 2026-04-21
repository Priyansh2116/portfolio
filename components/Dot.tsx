type Tone = 'live' | 'wip' | 'default'

interface Props {
  tone?: Tone
}

const toneColor: Record<Tone, string> = {
  live: 'oklch(0.72 0.15 150)',
  wip: 'oklch(0.78 0.15 80)',
  default: 'var(--ink-faint)',
}

export default function Dot({ tone = 'live' }: Props) {
  const color = toneColor[tone]
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: 7, height: 7, flexShrink: 0 }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }} />
      <span
        style={{
          position: 'absolute',
          inset: -3,
          borderRadius: '50%',
          background: color,
          opacity: 0.3,
          animation: 'pulse 2s ease-out infinite',
        }}
      />
    </span>
  )
}
