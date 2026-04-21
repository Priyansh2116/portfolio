// Direction A — "Techy Calm"
// Warm neutrals, left-aligned editorial hero with mono accents,
// subtle grid, glassy panels. The "calm" one.

function DirectionA() {
  const rootRef = React.useRef(null);
  const [filter, setFilter] = React.useState('All');
  const tagFilters = ['All', 'AI & ML', 'Languages', 'Systems', 'Frontend'];

  const [hero, setHero] = React.useState(window.__TWEAKS?.hero || 'mesh');
  React.useEffect(() => {
    const h = (e) => { if (e.detail?.hero) setHero(e.detail.hero); };
    window.addEventListener('tweaks:change', h);
    return () => window.removeEventListener('tweaks:change', h);
  }, []);

  return (
    <div ref={rootRef} className="pA" style={{
      position: 'relative', width: '100%', minHeight: '100%',
      background: 'var(--bg)', color: 'var(--ink)',
      fontFamily: 'var(--sans)',
      overflow: 'hidden',
    }}>
      <CustomCursor scope={rootRef} />
      <GridBg density="normal" />

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 40px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'color-mix(in oklch, var(--bg) 70%, transparent)',
        borderBottom: '1px solid var(--line-soft)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Mark />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-mute)' }}>priyansh.dev</span>
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 13, color: 'var(--ink-mute)' }}>
          {['Work', 'About', 'Stack', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="navlink" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)' }}>
          <Dot tone="live" />
          <span>Available · Summer '26</span>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', padding: '96px 40px 120px', minHeight: 620 }}>
        <HeroBg variant={hero} />
        <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 12px',
            border: '1px solid var(--line)', borderRadius: 999, fontFamily: 'var(--mono)',
            fontSize: 11, color: 'var(--ink-mute)', background: 'var(--bg-panel)', marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
            v1.0 · portfolio · 2026
          </div>
          <h1 style={{
            fontSize: 84, fontWeight: 500, lineHeight: 0.98, letterSpacing: -2.5,
            margin: 0, textWrap: 'balance', maxWidth: 900,
          }}>
            Building quiet tools<br />
            for <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-ink)' }}>intelligent</em> systems.
          </h1>
          <p style={{ marginTop: 28, fontSize: 19, lineHeight: 1.5, color: 'var(--ink-mute)', maxWidth: 620 }}>
            I'm <span style={{ color: 'var(--ink)', fontWeight: 500 }}>Priyansh Sonthalia</span> — a CS undergrad working at the
            seam of AI, network security, and systems. Previously at Samsung R&D; currently building network monitoring at Smoad.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <MagButton variant="primary" icon={<ArrowIcon />}>View work</MagButton>
            <MagButton variant="ghost">Get in touch</MagButton>
            <div data-magnetic style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 18px',
              fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-mute)' }}>
              <kbd style={kbdStyle}>⌘</kbd><kbd style={kbdStyle}>K</kbd>
              <span>to navigate</span>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
            borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
            {DATA.stats.map((s, i) => (
              <div key={s.label} style={{ padding: '20px 24px',
                borderRight: i < 3 ? '1px solid var(--line-soft)' : 'none' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)', letterSpacing: 0.8, textTransform: 'uppercase' }}>{s.label}</div>
                <div style={{ fontSize: 32, fontWeight: 500, marginTop: 6, letterSpacing: -1 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '100px 40px', position: 'relative' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64 }}>
          <div>
            <SectionLabel num="01" label="About" />
          </div>
          <div>
            <h2 style={h2Style}>Systems, but soft.</h2>
            <div style={{ marginTop: 28, display: 'grid', gap: 20, fontSize: 17, lineHeight: 1.6, color: 'var(--ink-mute)', maxWidth: 640 }}>
              {DATA.about.map((p, i) => <p key={i} style={{ margin: 0 }}>{p}</p>)}
            </div>
            <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Tag active>Currently · Smoad Networks</Tag>
              <Tag>SRM · B.Tech CS · '27</Tag>
              <Tag>Chennai, IN</Tag>
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={{ padding: '80px 40px', position: 'relative' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
            <div>
              <SectionLabel num="02" label="Selected work" />
              <h2 style={{ ...h2Style, marginTop: 16 }}>Things I've shipped.</h2>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['All', 'AI', 'Systems', 'Web'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ border: '1px solid var(--line)', background: filter === f ? 'var(--ink)' : 'transparent',
                    color: filter === f ? 'var(--bg)' : 'var(--ink-mute)', borderColor: filter === f ? 'var(--ink)' : 'var(--line)',
                    padding: '6px 14px', borderRadius: 999, fontFamily: 'var(--mono)', fontSize: 11, cursor: 'pointer',
                    transition: 'all .15s' }}>{f}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {DATA.projects.map((p, i) => <ProjectCardA key={p.id} p={p} featured={i === 0} />)}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" style={{ padding: '100px 40px', position: 'relative' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <SectionLabel num="03" label="Stack" />
          <h2 style={{ ...h2Style, marginTop: 16, marginBottom: 40 }}>What I build with.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {Object.entries(DATA.skills).map(([cat, items]) => (
              <div key={cat} style={{
                padding: 20, borderRadius: 14, background: 'var(--bg-panel)',
                backdropFilter: 'blur(12px)', border: '1px solid var(--line-soft)',
              }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 0.8,
                  textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 14 }}>{cat}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {items.map(s => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section style={{ padding: '100px 40px', position: 'relative' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64 }}>
          <div>
            <SectionLabel num="04" label="Timeline" />
          </div>
          <div>
            <h2 style={h2Style}>Where I've been.</h2>
            <div style={{ marginTop: 40, position: 'relative', paddingLeft: 28 }}>
              <div style={{ position: 'absolute', left: 6, top: 8, bottom: 8, width: 1, background: 'var(--line)' }} />
              {DATA.experience.map((e, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: 40 }}>
                  <div style={{ position: 'absolute', left: -28, top: 8, width: 13, height: 13, borderRadius: '50%',
                    background: 'var(--bg)', border: '2px solid var(--accent)' }} />
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: 0.4 }}>{e.when}</div>
                  <div style={{ fontSize: 22, fontWeight: 500, marginTop: 6, letterSpacing: -0.3 }}>{e.role}</div>
                  <div style={{ fontSize: 14, color: 'var(--ink-mute)', marginTop: 2 }}>{e.company}</div>
                  <ul style={{ margin: '14px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
                    {e.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: 14, color: 'var(--ink-mute)', lineHeight: 1.5, paddingLeft: 18, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, top: 8, width: 6, height: 1, background: 'var(--ink-faint)' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS strip */}
      <section style={{ padding: '40px 40px 80px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto',
          padding: 28, borderRadius: 20, border: '1px solid var(--line-soft)',
          background: 'var(--bg-panel)', backdropFilter: 'blur(12px)',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {DATA.awards.map((a, i) => (
            <div key={i} style={{ borderLeft: i > 0 ? '1px solid var(--line-soft)' : 'none', paddingLeft: i > 0 ? 20 : 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{a.t}</div>
              {a.s && <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 4 }}>{a.s}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '100px 40px', position: 'relative' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <SectionLabel num="05" label="Contact" centered />
          <h2 style={{ ...h2Style, fontSize: 56, marginTop: 16 }}>
            Let's build something <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-ink)' }}>thoughtful</em>.
          </h2>
          <p style={{ marginTop: 20, fontSize: 17, color: 'var(--ink-mute)', lineHeight: 1.6 }}>
            I'm open to summer '26 internships, research collabs, and anything weird at the intersection of AI and systems.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{
            marginTop: 40, padding: 8, borderRadius: 16, background: 'var(--bg-panel)',
            backdropFilter: 'blur(12px)', border: '1px solid var(--line)',
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center',
          }}>
            <input placeholder="your@email.com" style={{
              padding: '14px 18px', border: 'none', background: 'transparent',
              color: 'var(--ink)', fontSize: 15, outline: 'none', fontFamily: 'inherit',
            }} />
            <MagButton variant="primary" icon={<ArrowIcon />}>Reach out</MagButton>
          </form>
          <div style={{ marginTop: 28, display: 'flex', gap: 28, justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-mute)' }}>
            <a href="#" style={{ color: 'inherit' }}>github ↗</a>
            <a href="#" style={{ color: 'inherit' }}>linkedin ↗</a>
            <a href="#" style={{ color: 'inherit' }}>email ↗</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '32px 40px', borderTop: '1px solid var(--line-soft)',
        display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>
        <span>© 2026 Priyansh Sonthalia</span>
        <span>Built calmly · Chennai, IN</span>
      </footer>
    </div>
  );
}

function ProjectCardA({ p, featured }) {
  const [hov, setHov] = React.useState(false);
  return (
    <a href="#" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', display: 'block', textDecoration: 'none', color: 'inherit',
        padding: 28, borderRadius: 18,
        border: '1px solid var(--line-soft)',
        background: 'var(--bg-panel)',
        backdropFilter: 'blur(12px)',
        transition: 'transform .35s cubic-bezier(.2,.7,.3,1), border-color .25s, box-shadow .25s',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: hov ? 'var(--accent)' : 'var(--line-soft)',
        boxShadow: hov ? '0 16px 48px oklch(0.2 0.01 60 / 0.08)' : 'none',
        gridColumn: featured ? 'span 2' : 'span 1',
        overflow: 'hidden',
      }}>
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: featured ? '45%' : 0,
        background: 'linear-gradient(135deg, var(--accent-soft), transparent 70%)',
        opacity: hov ? 0.6 : 0.35, transition: 'opacity .3s, width .3s' }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Dot tone={p.status === 'In progress' ? 'wip' : 'live'} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)' }}>{p.status}</span>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>{p.year}</div>
        </div>
        <div style={{ marginTop: featured ? 72 : 48 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: 0.6 }}>{p.kicker}</div>
          <div style={{ fontSize: featured ? 36 : 26, fontWeight: 500, letterSpacing: -0.8, marginTop: 6 }}>{p.title}</div>
          <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.55, color: 'var(--ink-mute)', maxWidth: featured ? 500 : 'none' }}>{p.desc}</p>
          <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {p.tech.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
        <div style={{
          position: 'absolute', bottom: 0, right: 0, display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent-ink)',
          transform: hov ? 'translateX(0)' : 'translateX(-4px)',
          opacity: hov ? 1 : 0.7,
          transition: 'all .25s',
        }}>
          open <ArrowIcon size={12} />
        </div>
      </div>
    </a>
  );
}

function Mark() {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: 8, background: 'var(--accent)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontFamily: 'var(--mono)', fontWeight: 600, fontSize: 14,
      letterSpacing: -0.5,
    }}>ps</div>
  );
}

function SectionLabel({ num, label, centered }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)',
      letterSpacing: 0.8, textTransform: 'uppercase',
      justifyContent: centered ? 'center' : 'flex-start',
    }}>
      <span style={{ color: 'var(--accent)' }}>{num}</span>
      <span style={{ width: 24, height: 1, background: 'var(--line)' }} />
      <span>{label}</span>
    </div>
  );
}

const h2Style = {
  fontSize: 44, fontWeight: 500, letterSpacing: -1.2, margin: 0,
  lineHeight: 1.05,
};

const kbdStyle = {
  fontFamily: 'var(--mono)', fontSize: 11,
  padding: '2px 6px', borderRadius: 4,
  background: 'var(--chip-bg)', border: '1px solid var(--line)',
  color: 'var(--ink-mute)',
};

window.DirectionA = DirectionA;
