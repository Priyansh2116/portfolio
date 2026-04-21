import MagButton from './MagButton'
import HeroBg from './HeroBg'
import ArrowIcon from './ArrowIcon'
import { DATA } from '@/lib/data'

export default function HeroPanel({ heroBg }: { heroBg: 'particles' | 'mesh' | 'gradient' }) {
  return (
    <section
      id="overview"
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid var(--line)',
        background: 'var(--bg-panel)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '48px 48px 36px',
        marginBottom: 28,
      }}
    >
      <HeroBg variant={heroBg} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'var(--ink-faint)',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          <span style={{ color: 'var(--accent)' }}>$</span> cat /about/me.md
        </div>

        {/* H1 */}
        <h1
          style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: -1.8,
            margin: 0,
            maxWidth: 820,
          }}
        >
          Full-stack AI systems, network tools, and the{' '}
          <span style={{ color: 'var(--accent-ink)' }}>weird corners</span> between.
        </h1>

        {/* Body */}
        <p
          style={{
            marginTop: 20,
            fontSize: 16,
            lineHeight: 1.55,
            color: 'var(--ink-mute)',
            maxWidth: 620,
          }}
        >
          Priyansh Sonthalia — CS undergrad at SRM. Interning at Smoad Networks on real-time network
          monitoring; previously Samsung R&D on LLM-powered pricing systems.
        </p>

        {/* CTAs */}
        <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <MagButton variant="primary" icon={<ArrowIcon />} href="#work">
            Browse projects
          </MagButton>
          <MagButton variant="ghost" href={DATA.resumeUrl}>
            Resume ↗
          </MagButton>
        </div>

        {/* Stats strip */}
        <div
          style={{
            marginTop: 44,
            display: 'grid',
            gridTemplateColumns: `repeat(${DATA.stats.length}, 1fr)`,
            borderTop: '1px solid var(--line-soft)',
          }}
        >
          {DATA.stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: '16px 18px',
                borderRight: i < DATA.stats.length - 1 ? '1px solid var(--line-soft)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  color: 'var(--ink-faint)',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 500,
                  marginTop: 4,
                  letterSpacing: -0.6,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
