// Direction B — "Dashboard Panel"
// Dashboard-y, command-palette aesthetic. More panels, more data,
// monospace-forward, looks like a dev tool.

function DirectionB() {
  const rootRef = React.useRef(null);
  const [skillFilter, setSkillFilter] = React.useState(null);

  const [hero, setHero] = React.useState(window.__TWEAKS?.hero || 'particles');
  React.useEffect(() => {
    const h = (e) => { if (e.detail?.hero) setHero(e.detail.hero); };
    window.addEventListener('tweaks:change', h);
    return () => window.removeEventListener('tweaks:change', h);
  }, []);

  const allCats = Object.keys(DATA.skills);

  return (
    <div ref={rootRef} className="pB" style={{
      position: 'relative', width: '100%', minHeight: '100%',
      background: 'var(--bg)', color: 'var(--ink)',
      fontFamily: 'var(--sans)', overflow: 'hidden',
    }}>
      <CustomCursor scope={rootRef} />
      <GridBg density="dense" dots />

      {/* Top chrome bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 24px', borderBottom: '1px solid var(--line-soft)',
        background: 'var(--bg-panel)', backdropFilter: 'blur(12px)',
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)',
        position: 'sticky', top: 0, zIndex: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <i style={traffic('#f87171')} /><i style={traffic('#fbbf24')} /><i style={traffic('#4ade80')} />
          </div>
          <span>~/priyansh/portfolio</span>
          <span style={{ color: 'var(--ink-faint)' }}>main</span>
          <span style={{ color: 'var(--ink-faint)' }}>·</span>
          <span style={{ color: 'var(--accent)' }}>● live</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span>sess · 001</span>
          <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <kbd style={kbdStyleB}>⌘</kbd><kbd style={kbdStyleB}>K</kbd>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 'calc(100% - 46px)' }}>
        {/* SIDEBAR */}
        <aside style={{
          padding: '24px 20px', borderRight: '1px solid var(--line-soft)',
          background: 'color-mix(in oklch, var(--bg-raised) 50%, transparent)',
          position: 'sticky', top: 46, alignSelf: 'flex-start', height: 'fit-content',
          minHeight: 'calc(100vh - 46px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 20, borderBottom: '1px solid var(--line-soft)' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              fontFamily: 'var(--mono)', fontWeight: 600, fontSize: 14 }}>ps</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Priyansh</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)' }}>@priyansh · srm '27</div>
            </div>
          </div>
          <SideGroup label="navigate" items={[
            { n: '01', l: 'Overview', active: true },
            { n: '02', l: 'Projects' },
            { n: '03', l: 'Stack' },
            { n: '04', l: 'Experience' },
            { n: '05', l: 'Contact' },
          ]} />
          <SideGroup label="status">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, display: 'grid', gap: 6, color: 'var(--ink-mute)' }}>
              <Row k="role" v="intern" />
              <Row k="at" v="Smoad" />
              <Row k="focus" v="networks" />
              <Row k="open" v="Summer '26" accent />
            </div>
          </SideGroup>
          <SideGroup label="links">
            <div style={{ display: 'grid', gap: 4, fontFamily: 'var(--mono)', fontSize: 11 }}>
              <a href="#" className="sidelink">github.com/priyansh ↗</a>
              <a href="#" className="sidelink">linkedin.com/in/priyansh ↗</a>
              <a href="#" className="sidelink">mail ↗</a>
            </div>
          </SideGroup>
        </aside>

        {/* MAIN */}
        <main style={{ padding: '32px 40px 80px' }}>
          {/* HERO PANEL */}
          <section style={{ position: 'relative', borderRadius: 16, overflow: 'hidden',
            border: '1px solid var(--line)', background: 'var(--bg-panel)',
            backdropFilter: 'blur(12px)', padding: '48px 48px 36px', marginBottom: 28 }}>
            <HeroBg variant={hero} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)',
                letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 16 }}>
                <span style={{ color: 'var(--accent)' }}>$</span> cat /about/me.md
              </div>
              <h1 style={{
                fontSize: 60, fontWeight: 500, lineHeight: 1.02, letterSpacing: -1.8, margin: 0, maxWidth: 820,
              }}>
                AI systems, network tools, and the <span style={{ color: 'var(--accent-ink)' }}>weird corners</span> between.
              </h1>
              <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.55, color: 'var(--ink-mute)', maxWidth: 620 }}>
                Priyansh Sonthalia — CS undergrad at SRM. Interning at Smoad Networks on real-time network monitoring; previously
                Samsung R&D on LLM-powered pricing systems.
              </p>
              <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <MagButton variant="primary" icon={<ArrowIcon />}>Browse projects</MagButton>
                <MagButton variant="ghost">Resume ↗</MagButton>
              </div>
              <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
                borderTop: '1px solid var(--line-soft)' }}>
                {DATA.stats.map((s, i) => (
                  <div key={s.label} style={{ padding: '16px 18px',
                    borderRight: i < 3 ? '1px solid var(--line-soft)' : 'none' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: 0.6 }}>{s.label}</div>
                    <div style={{ fontSize: 26, fontWeight: 500, marginTop: 4, letterSpacing: -0.6, fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Two-col: projects + skills */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 28 }}>
            {/* PROJECTS list */}
            <section style={panelBoxB}>
              <PanelHeader num="02" title="Projects" meta={`${DATA.projects.length} total`} />
              <div style={{ display: 'grid' }}>
                {DATA.projects.map((p, i) => <ProjectRowB key={p.id} p={p} last={i === DATA.projects.length - 1} />)}
              </div>
            </section>

            {/* SKILLS */}
            <section style={panelBoxB}>
              <PanelHeader num="03" title="Stack" meta={skillFilter ? `> ${skillFilter}` : 'interactive'} />
              <div style={{ padding: '16px 20px 20px' }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                  <FilterPill active={!skillFilter} onClick={() => setSkillFilter(null)}>All</FilterPill>
                  {allCats.map(c => (
                    <FilterPill key={c} active={skillFilter === c} onClick={() => setSkillFilter(c)}>{c}</FilterPill>
                  ))}
                </div>
                <div style={{ display: 'grid', gap: 14 }}>
                  {allCats.map(cat => {
                    const dim = skillFilter && skillFilter !== cat;
                    return (
                      <div key={cat} style={{ opacity: dim ? 0.3 : 1, transition: 'opacity .25s' }}>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)',
                          letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>{cat}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {DATA.skills[cat].map(s => <Tag key={s} active={skillFilter === cat}>{s}</Tag>)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* Experience + awards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, marginBottom: 28 }}>
            <section style={panelBoxB}>
              <PanelHeader num="04" title="Experience" meta="timeline" />
              <div style={{ padding: '16px 20px 24px' }}>
                {DATA.experience.map((e, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16,
                    padding: '14px 0', borderTop: i > 0 ? '1px solid var(--line-soft)' : 'none',
                  }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)' }}>{e.when}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{e.role}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>{e.company}</div>
                      <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 3 }}>
                        {e.bullets.map((b, j) => (
                          <li key={j} style={{ fontSize: 12, color: 'var(--ink-mute)', paddingLeft: 12, position: 'relative', lineHeight: 1.5 }}>
                            <span style={{ position: 'absolute', left: 0, top: 9, width: 4, height: 1, background: 'var(--ink-faint)' }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section style={panelBoxB}>
              <PanelHeader num="·" title="Awards" meta="" />
              <div style={{ padding: '6px 0 12px' }}>
                {DATA.awards.map((a, i) => (
                  <div key={i} style={{ padding: '14px 20px', borderTop: i > 0 ? '1px solid var(--line-soft)' : 'none' }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{a.t}</div>
                    {a.s && <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 2, fontFamily: 'var(--mono)' }}>{a.s}</div>}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* CONTACT */}
          <section style={{ ...panelBoxB, padding: 40 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
              <div>
                <PanelHeaderInline num="05" title="Contact" />
                <h3 style={{ fontSize: 32, fontWeight: 500, letterSpacing: -0.8, margin: '16px 0 8px', lineHeight: 1.1 }}>
                  Got a weird problem?
                </h3>
                <p style={{ fontSize: 14, color: 'var(--ink-mute)', lineHeight: 1.55, margin: 0 }}>
                  Say hi — I respond faster than my terminal.
                </p>
                <div style={{ marginTop: 20, display: 'grid', gap: 6, fontFamily: 'var(--mono)', fontSize: 12 }}>
                  <Row k="email" v="priyansh@example.com" />
                  <Row k="github" v="@priyansh" />
                  <Row k="linkedin" v="in/priyansh" />
                </div>
              </div>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: 10 }}>
                <InputB placeholder="your name" />
                <InputB placeholder="your@email.com" />
                <textarea placeholder="what's the problem?" rows={4} style={{ ...inputStyleB, resize: 'none', fontFamily: 'inherit' }} />
                <MagButton variant="primary" icon={<ArrowIcon />}>Send</MagButton>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function ProjectRowB({ p, last }) {
  const [hov, setHov] = React.useState(false);
  return (
    <a href="#" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 18,
        padding: '18px 20px', borderBottom: last ? 'none' : '1px solid var(--line-soft)',
        textDecoration: 'none', color: 'inherit',
        background: hov ? 'color-mix(in oklch, var(--accent-soft) 40%, transparent)' : 'transparent',
        transition: 'background .2s',
      }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)' }}>{p.year}</div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.2 }}>{p.title}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)' }}>· {p.kicker}</div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-mute)', marginTop: 4, lineHeight: 1.55 }}>{p.desc}</div>
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {p.tech.slice(0, 4).map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: hov ? 'var(--accent-ink)' : 'var(--ink-faint)',
        transition: 'color .2s, transform .2s', transform: hov ? 'translateX(4px)' : 'none',
        display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'center' }}>
        open <ArrowIcon size={11} />
      </div>
    </a>
  );
}

function PanelHeader({ num, title, meta }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 20px', borderBottom: '1px solid var(--line-soft)',
      fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: 0.4,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: 'var(--accent)' }}>{num}</span>
        <span style={{ color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500 }}>{title}</span>
      </div>
      {meta && <span>{meta}</span>}
    </div>
  );
}
const PanelHeaderInline = ({ num, title }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: 0.8, textTransform: 'uppercase' }}>
    <span style={{ color: 'var(--accent)' }}>{num}</span>
    <span style={{ width: 24, height: 1, background: 'var(--line)' }} />
    <span>{title}</span>
  </div>
);

function SideGroup({ label, items, children }) {
  return (
    <div style={{ marginTop: 22 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)',
        letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
      {items ? (
        <div style={{ display: 'grid', gap: 2 }}>
          {items.map(it => (
            <a key={it.l} href="#" style={{
              display: 'flex', gap: 12, alignItems: 'center',
              padding: '6px 10px', borderRadius: 6,
              fontSize: 13, textDecoration: 'none', color: it.active ? 'var(--ink)' : 'var(--ink-mute)',
              background: it.active ? 'var(--chip-bg)' : 'transparent',
              fontWeight: it.active ? 500 : 400,
            }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-faint)' }}>{it.n}</span>
              {it.l}
            </a>
          ))}
        </div>
      ) : children}
    </div>
  );
}

function Row({ k, v, accent }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: 'var(--ink-faint)' }}>{k}</span>
      <span style={{ color: accent ? 'var(--accent)' : 'var(--ink)' }}>{v}</span>
    </div>
  );
}

function FilterPill({ children, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      border: '1px solid var(--line)',
      background: active ? 'var(--accent)' : 'transparent',
      color: active ? '#fff' : 'var(--ink-mute)',
      borderColor: active ? 'var(--accent)' : 'var(--line)',
      padding: '4px 10px', borderRadius: 999,
      fontFamily: 'var(--mono)', fontSize: 10, cursor: 'pointer',
      letterSpacing: 0.3, transition: 'all .15s',
    }}>{children}</button>
  );
}

const traffic = (bg) => ({ width: 11, height: 11, borderRadius: '50%', background: bg, display: 'block' });

const panelBoxB = {
  borderRadius: 14, border: '1px solid var(--line-soft)',
  background: 'var(--bg-panel)', backdropFilter: 'blur(12px)',
  overflow: 'hidden',
};

const inputStyleB = {
  padding: '12px 14px', borderRadius: 8,
  border: '1px solid var(--line)', background: 'var(--bg)',
  color: 'var(--ink)', fontSize: 13, outline: 'none', fontFamily: 'inherit',
};
const InputB = (p) => <input {...p} style={inputStyleB} />;

const kbdStyleB = {
  fontFamily: 'var(--mono)', fontSize: 10,
  padding: '1px 5px', borderRadius: 3,
  background: 'var(--chip-bg)', border: '1px solid var(--line)',
  color: 'var(--ink-mute)',
};

window.DirectionB = DirectionB;
