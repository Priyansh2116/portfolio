// Direction C — "Editorial Techy"
// Huge type, silent whitespace, an oversized project showcase.
// Still techy (mono labels, grid, glass) but with editorial rhythm.

function DirectionC() {
  const rootRef = React.useRef(null);
  const [activeProj, setActiveProj] = React.useState(0);

  const [hero, setHero] = React.useState(window.__TWEAKS?.hero || 'gradient');
  React.useEffect(() => {
    const h = (e) => { if (e.detail?.hero) setHero(e.detail.hero); };
    window.addEventListener('tweaks:change', h);
    return () => window.removeEventListener('tweaks:change', h);
  }, []);

  return (
    <div ref={rootRef} className="pC" style={{
      position: 'relative', width: '100%', minHeight: '100%',
      background: 'var(--bg)', color: 'var(--ink)',
      fontFamily: 'var(--sans)', overflow: 'hidden',
    }}>
      <CustomCursor scope={rootRef} />

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px',
        background: 'color-mix(in oklch, var(--bg) 78%, transparent)',
        backdropFilter: 'blur(14px)',
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', fontWeight: 500 }}>
          PRIYANSH <span style={{ color: 'var(--ink-faint)' }}>/ SONTHALIA</span>
        </div>
        <div style={{ display: 'flex', gap: 6, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)' }}>
          {['index', 'work', 'stack', 'info'].map((l, i) => (
            <a key={l} href={`#${l}`} style={{ color: 'inherit', textDecoration: 'none', padding: '6px 10px', borderRadius: 6 }}>
              <span style={{ color: 'var(--ink-faint)' }}>{String(i).padStart(2, '0')}</span> {l}
            </a>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)' }}>
          CHN · 28.6°C
        </div>
      </nav>

      {/* HERO — oversized editorial */}
      <section style={{ position: 'relative', padding: '80px 48px 40px', minHeight: 700 }}>
        <HeroBg variant={hero} />
        <GridBg density="loose" />
        <div style={{ position: 'relative', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end', marginBottom: 40 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)', letterSpacing: 0.8 }}>
              [VOL.01] &nbsp; PORTFOLIO · 2026 EDITION &nbsp; <span style={{ color: 'var(--accent)' }}>●</span> OPEN TO INTERNSHIPS
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)' }}>
              ISSUE 001 / {new Date().getFullYear()}
            </div>
          </div>

          <h1 style={{
            fontSize: 'clamp(72px, 11vw, 168px)',
            fontWeight: 400, lineHeight: 0.92, letterSpacing: -4.5,
            margin: 0, textWrap: 'balance',
          }}>
            Priyansh<br />
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300 }}>Sonthalia</span>
            <span style={{ color: 'var(--accent)' }}>.</span>
          </h1>

          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-mute)', letterSpacing: 0.4 }}>
              <div>→ AI ENGINEER</div>
              <div>→ SYSTEMS BUILDER</div>
              <div>→ CS · SRM · 2027</div>
              <div style={{ color: 'var(--accent)' }}>→ AVAILABLE SUMMER '26</div>
            </div>
            <p style={{ fontSize: 21, lineHeight: 1.45, color: 'var(--ink-mute)', maxWidth: 520, margin: 0, justifySelf: 'end', textAlign: 'right' }}>
              A quiet studio for AI systems and network tools. Currently building real-time
              monitoring at Smoad. Previously Samsung R&D.
            </p>
          </div>

          <div style={{ marginTop: 56, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <MagButton variant="primary" icon={<ArrowIcon />}>See the work</MagButton>
            <MagButton variant="ghost">Download CV</MagButton>
          </div>
        </div>
      </section>

      {/* MARQUEE band */}
      <div style={{
        borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
        padding: '18px 0', overflow: 'hidden',
        background: 'var(--bg-raised)',
        fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-mute)',
        whiteSpace: 'nowrap',
      }}>
        <div style={{ display: 'inline-block', animation: 'marquee 40s linear infinite' }}>
          {Array(3).fill(0).map((_, i) => (
            <span key={i}>
              &nbsp;&nbsp;AGENTIC AI &nbsp;✦&nbsp; NETWORK SECURITY &nbsp;✦&nbsp; 3D MEDICAL SEGMENTATION &nbsp;✦&nbsp; QUANTUM COMPUTATION &nbsp;✦&nbsp; FASTAPI &nbsp;✦&nbsp; BROWSER-USE &nbsp;✦&nbsp; RIPE ATLAS &nbsp;✦&nbsp; ZEPHYR OS &nbsp;✦&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* WORK — oversized list + preview */}
      <section id="work" style={{ padding: '100px 48px', position: 'relative' }}>
        <GridBg density="loose" />
        <div style={{ position: 'relative', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
            <SectionLabel num="01" label="Selected work" />
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>{DATA.projects.length} entries</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60 }}>
            <div style={{ borderTop: '1px solid var(--line)' }}>
              {DATA.projects.map((p, i) => (
                <div key={p.id} onMouseEnter={() => setActiveProj(i)}
                  style={{
                    display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 20,
                    padding: '24px 8px', alignItems: 'center',
                    borderBottom: '1px solid var(--line)',
                    cursor: 'pointer',
                    transition: 'padding .25s',
                    paddingLeft: activeProj === i ? 20 : 8,
                  }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: activeProj === i ? 'var(--accent)' : 'var(--ink-faint)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div style={{
                      fontSize: 32, fontWeight: 400, letterSpacing: -0.8, lineHeight: 1.1,
                      color: activeProj === i ? 'var(--ink)' : 'var(--ink-mute)',
                      transition: 'color .2s',
                    }}>
                      {p.title}<span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, color: 'var(--ink-faint)' }}> — {p.kicker}</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>{p.year}</div>
                </div>
              ))}
            </div>

            {/* PREVIEW panel */}
            <div style={{ position: 'sticky', top: 100, alignSelf: 'flex-start' }}>
              <div style={{
                borderRadius: 18, overflow: 'hidden',
                border: '1px solid var(--line)',
                background: 'var(--bg-panel)', backdropFilter: 'blur(14px)',
                aspectRatio: '4 / 3', position: 'relative',
              }}>
                <ProjectPreview p={DATA.projects[activeProj]} />
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: 0.8, textTransform: 'uppercase' }}>
                  {DATA.projects[activeProj].kicker}
                </div>
                <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.55, color: 'var(--ink-mute)' }}>
                  {DATA.projects[activeProj].desc}
                </p>
                <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {DATA.projects[activeProj].tech.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT + STACK interleaved */}
      <section style={{ padding: '120px 48px', position: 'relative' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
            <div>
              <SectionLabel num="02" label="Notes" />
              <h2 style={{ fontSize: 56, fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.05, marginTop: 24 }}>
                Quiet builder of <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}>loud</span> systems.
              </h2>
              <div style={{ marginTop: 28, display: 'grid', gap: 18, fontSize: 17, lineHeight: 1.55, color: 'var(--ink-mute)', maxWidth: 520 }}>
                {DATA.about.map((p, i) => <p key={i} style={{ margin: 0 }}>{p}</p>)}
              </div>
            </div>
            <div>
              <SectionLabel num="03" label="Stack" />
              <div style={{ marginTop: 32, display: 'grid', gap: 24 }}>
                {Object.entries(DATA.skills).map(([cat, items]) => (
                  <div key={cat} style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                      <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: -0.4 }}>{cat}</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>{String(items.length).padStart(2, '0')}</div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {items.map(s => <Tag key={s}>{s}</Tag>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE & AWARDS */}
      <section style={{ padding: '40px 48px 100px', position: 'relative' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <SectionLabel num="04" label="Trail" />
          <h2 style={{ fontSize: 56, fontWeight: 400, letterSpacing: -1.5, margin: '24px 0 48px' }}>Trail.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }}>
            {DATA.experience.map((e, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--line)', paddingTop: 20 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: 0.4 }}>{e.when}</div>
                <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: -0.4, marginTop: 8 }}>{e.role}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-mute)', marginTop: 2 }}>{e.company}</div>
                <ul style={{ margin: '16px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
                  {e.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize: 13, color: 'var(--ink-mute)', lineHeight: 1.55, paddingLeft: 16, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: 8, width: 8, height: 1, background: 'var(--ink-faint)' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT — enormous */}
      <section id="info" style={{ padding: '140px 48px 80px', position: 'relative' }}>
        <HeroBg variant={hero} />
        <div style={{ position: 'relative', maxWidth: 1400, margin: '0 auto' }}>
          <SectionLabel num="05" label="Reach" />
          <h2 style={{
            fontSize: 'clamp(56px, 9vw, 140px)',
            fontWeight: 400, lineHeight: 0.95, letterSpacing: -4, margin: '32px 0 48px',
          }}>
            Let's make<br />
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, color: 'var(--accent-ink)' }}>something new</span>.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <InputC label="name" placeholder="Your name" />
                <InputC label="email" placeholder="your@email.com" />
              </div>
              <InputC label="about" placeholder="What are you building?" textarea />
              <MagButton variant="primary" icon={<ArrowIcon />} style={{ justifySelf: 'flex-start' }}>Send message</MagButton>
            </form>
            <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
              <LinkRowC k="email" v="priyansh@example.com" />
              <LinkRowC k="github" v="@priyansh" />
              <LinkRowC k="linkedin" v="in/priyansh" />
              <LinkRowC k="location" v="Chennai, IN" />
              <div style={{ marginTop: 20, padding: 20, borderRadius: 14, border: '1px solid var(--line-soft)', background: 'var(--bg-panel)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Dot tone="live" />
                  <div style={{ fontSize: 14, fontWeight: 500 }}>Currently accepting projects</div>
                </div>
                <div style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-mute)', lineHeight: 1.5 }}>
                  Best for AI/ML, agentic systems, network tooling, or medical imaging.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER — enormous wordmark */}
      <footer style={{ padding: '80px 48px 40px', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{
            fontSize: 'clamp(64px, 14vw, 220px)',
            fontWeight: 400, letterSpacing: -6, lineHeight: 0.9,
            color: 'var(--ink)', opacity: 0.9,
          }}>
            PRIYANSH<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>
            <span>© 2026 · ALL RIGHTS RESERVED</span>
            <span>CRAFTED IN CHENNAI</span>
            <span>V1.0 · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProjectPreview({ p }) {
  // A stylized placeholder preview — NOT a fake rendering. Indicates what the project is.
  const hue = { starship: 200, aiimaging: 330, glenoid: 20, rudra: 280, pricing: 140, netmon: 260 }[p.id] || 220;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(135deg, oklch(0.9 0.03 ${hue}), oklch(0.82 0.05 ${hue}))`,
      display: 'flex', flexDirection: 'column',
      padding: 24,
      fontFamily: 'var(--mono)', color: 'oklch(0.25 0.05 ' + hue + ')',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, letterSpacing: 0.6 }}>
        <span>{p.id.toUpperCase()}.PREVIEW</span>
        <span>{p.year}</span>
      </div>
      <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: 0.6 }}>[ PLACEHOLDER · PROJECT VISUAL ]</div>
          <div style={{ fontSize: 56, fontWeight: 500, letterSpacing: -1.5, marginTop: 10, fontFamily: 'var(--sans)' }}>
            {p.title}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>{p.kicker}</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, opacity: 0.6, letterSpacing: 0.4 }}>
        <span>● {p.status}</span>
        <span>{p.tech.join(' · ')}</span>
      </div>
    </div>
  );
}

function InputC({ label, placeholder, textarea }) {
  const T = textarea ? 'textarea' : 'input';
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)', letterSpacing: 0.8, textTransform: 'uppercase' }}>{label}</span>
      <T placeholder={placeholder} rows={textarea ? 3 : undefined} style={{
        padding: '14px 0', borderRadius: 0,
        border: 'none', borderBottom: '1px solid var(--line)',
        background: 'transparent', color: 'var(--ink)',
        fontSize: 17, outline: 'none', fontFamily: 'inherit', resize: 'none',
      }} />
    </label>
  );
}

function LinkRowC({ k, v }) {
  return (
    <a href="#" style={{
      display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 16, alignItems: 'center',
      padding: '14px 0', borderBottom: '1px solid var(--line)',
      textDecoration: 'none', color: 'var(--ink)',
    }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: 0.8 }}>{k}</span>
      <span style={{ fontSize: 17, fontWeight: 500 }}>{v}</span>
      <ArrowIcon size={13} />
    </a>
  );
}

window.DirectionC = DirectionC;
