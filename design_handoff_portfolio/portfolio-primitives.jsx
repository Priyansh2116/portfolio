// Shared primitives for all three portfolio directions.
// Every Direction reads CSS vars; the Tweaks panel rewrites them live.

const ACCENTS = {
  slate:     { h: 230, c: 0.045, name: 'Slate Blue' },
  terracotta:{ h: 35,  c: 0.09,  name: 'Terracotta' },
  moss:      { h: 135, c: 0.05,  name: 'Moss' },
  graphite:  { h: 260, c: 0.01,  name: 'Graphite' },
};

function applyAccent(key) {
  const a = ACCENTS[key] || ACCENTS.slate;
  const root = document.documentElement;
  root.style.setProperty('--accent',       `oklch(0.52 ${a.c} ${a.h})`);
  root.style.setProperty('--accent-soft',  `oklch(0.92 ${a.c * 0.4} ${a.h})`);
  root.style.setProperty('--accent-glow',  `oklch(0.7  ${a.c} ${a.h} / 0.25)`);
  root.style.setProperty('--accent-ink',   `oklch(0.35 ${a.c} ${a.h})`);
}

function applyTheme(dark) {
  const r = document.documentElement;
  if (dark) {
    r.style.setProperty('--bg',        'oklch(0.18 0.008 65)');
    r.style.setProperty('--bg-raised', 'oklch(0.22 0.008 65)');
    r.style.setProperty('--bg-panel',  'oklch(0.24 0.008 65 / 0.7)');
    r.style.setProperty('--ink',       'oklch(0.96 0.008 65)');
    r.style.setProperty('--ink-mute',  'oklch(0.72 0.01 65)');
    r.style.setProperty('--ink-faint', 'oklch(0.48 0.01 65)');
    r.style.setProperty('--line',      'oklch(0.32 0.008 65)');
    r.style.setProperty('--line-soft', 'oklch(0.26 0.008 65)');
    r.style.setProperty('--grid',      'oklch(1 0 0 / 0.04)');
    r.style.setProperty('--chip-bg',   'oklch(0.28 0.008 65 / 0.6)');
  } else {
    r.style.setProperty('--bg',        'oklch(0.975 0.008 75)');
    r.style.setProperty('--bg-raised', 'oklch(0.99 0.005 75)');
    r.style.setProperty('--bg-panel',  'oklch(1 0 0 / 0.7)');
    r.style.setProperty('--ink',       'oklch(0.2 0.01 60)');
    r.style.setProperty('--ink-mute',  'oklch(0.42 0.01 60)');
    r.style.setProperty('--ink-faint', 'oklch(0.6 0.01 60)');
    r.style.setProperty('--line',      'oklch(0.86 0.006 70)');
    r.style.setProperty('--line-soft', 'oklch(0.92 0.006 70)');
    r.style.setProperty('--grid',      'oklch(0.5 0.01 70 / 0.07)');
    r.style.setProperty('--chip-bg',   'oklch(0.95 0.006 70 / 0.7)');
  }
}

// A subtle grid background layer. Use as a `background-image` via CSS var.
function GridBg({ density = 'normal', dots = false, style }) {
  const size = density === 'dense' ? 24 : density === 'loose' ? 64 : 40;
  const bg = dots
    ? `radial-gradient(circle at 1px 1px, var(--grid) 1px, transparent 1px)`
    : `linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)`;
  return (
    <div aria-hidden style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: bg, backgroundSize: `${size}px ${size}px`,
      maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
      ...style,
    }} />
  );
}

// Magnetic button — hover pulls the label toward the cursor.
function MagButton({ children, onClick, variant = 'primary', icon, style }) {
  const ref = React.useRef(null);
  const labelRef = React.useRef(null);
  const onMove = (e) => {
    const el = ref.current, lab = labelRef.current;
    if (!el || !lab) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - r.left - r.width / 2;
    const my = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${mx * 0.14}px, ${my * 0.2}px)`;
    lab.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
  };
  const onLeave = () => {
    ref.current.style.transform = '';
    labelRef.current.style.transform = '';
  };

  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '12px 22px', borderRadius: 999, cursor: 'pointer',
    fontSize: 14, fontWeight: 500, letterSpacing: -0.1,
    fontFamily: 'inherit',
    transition: 'transform .25s cubic-bezier(.2,.7,.3,1), background .15s, border-color .15s',
    willChange: 'transform',
    ...style,
  };
  const variants = {
    primary: { background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)' },
    ghost:   { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)' },
  };
  return (
    <button ref={ref} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ ...base, ...variants[variant] }}>
      <span ref={labelRef} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, willChange: 'transform', transition: 'transform .25s cubic-bezier(.2,.7,.3,1)' }}>
        {children}
        {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      </span>
    </button>
  );
}

// Arrow icon used for CTAs
const ArrowIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

// Tag chip
function Tag({ children, mono = true, active = false }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      fontFamily: mono ? 'var(--mono)' : 'var(--sans)',
      fontSize: 11, letterSpacing: 0.2,
      color: active ? 'var(--accent-ink)' : 'var(--ink-mute)',
      background: active ? 'var(--accent-soft)' : 'var(--chip-bg)',
      border: `1px solid ${active ? 'transparent' : 'var(--line-soft)'}`,
      transition: 'all .15s',
    }}>{children}</span>
  );
}

// Status dot
function Dot({ tone = 'live' }) {
  const color = tone === 'live' ? 'oklch(0.72 0.15 150)' : tone === 'wip' ? 'oklch(0.78 0.15 80)' : 'var(--ink-faint)';
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: 7, height: 7 }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }} />
      <span style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: color, opacity: 0.3, animation: 'pulse 2s ease-out infinite' }} />
    </span>
  );
}

// Particle/gradient/mesh hero background — switchable
function HeroBg({ variant = 'mesh' }) {
  if (variant === 'gradient') {
    return (
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: '-20%',
          background: 'radial-gradient(60% 50% at 20% 30%, var(--accent-glow), transparent 70%), radial-gradient(50% 50% at 80% 70%, var(--accent-soft), transparent 70%)',
          filter: 'blur(40px)' }} />
      </div>
    );
  }
  if (variant === 'particles') {
    return <ParticleField />;
  }
  // mesh — softer, blended gradient mesh
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
        <defs>
          <radialGradient id="m1" cx="30%" cy="40%" r="40%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="m2" cx="75%" cy="65%" r="35%">
            <stop offset="0%" stopColor="var(--accent-ink)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent-ink)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#m1)" />
        <rect width="100%" height="100%" fill="url(#m2)" />
      </svg>
    </div>
  );
}

function ParticleField() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let w, h, particles = [], raf;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = cv.parentElement.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      cv.style.width = w + 'px'; cv.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const N = 42;
    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.4,
      });
    }
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4a5a7a';
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      }
      // lines
      ctx.strokeStyle = accent;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 140) {
            ctx.globalAlpha = (1 - d / 140) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // dots
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = accent;
      for (const p of particles) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.9 }} />;
}

// A custom cursor — soft ring + dot. Only enabled on hover-capable devices.
function CustomCursor({ scope }) {
  const ringRef = React.useRef(null);
  const dotRef = React.useRef(null);
  React.useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const ring = ringRef.current, dot = dotRef.current;
    let rx = 0, ry = 0, tx = 0, ty = 0, raf;
    const mv = (e) => {
      const root = scope?.current || document.body;
      const r = root.getBoundingClientRect();
      tx = e.clientX - r.left; ty = e.clientY - r.top;
      dot.style.transform = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`;
    };
    const tick = () => {
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
      ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const host = scope?.current || window;
    host.addEventListener('mousemove', mv);
    tick();
    // enlarge on interactives
    const onOver = (e) => { if (e.target.closest('button, a, [data-magnetic]')) ring.classList.add('cc-lg'); };
    const onOut = (e) => { if (e.target.closest('button, a, [data-magnetic]')) ring.classList.remove('cc-lg'); };
    host.addEventListener('mouseover', onOver);
    host.addEventListener('mouseout', onOut);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener('mousemove', mv);
      host.removeEventListener('mouseover', onOver);
      host.removeEventListener('mouseout', onOut);
    };
  }, []);
  return (
    <>
      <div ref={ringRef} className="cc-ring" style={{
        position: 'absolute', width: 32, height: 32, borderRadius: '50%',
        border: '1px solid var(--accent)', pointerEvents: 'none', zIndex: 50,
        mixBlendMode: 'difference', opacity: 0.6,
        transition: 'width .2s, height .2s, opacity .2s',
      }} />
      <div ref={dotRef} style={{
        position: 'absolute', width: 6, height: 6, borderRadius: '50%',
        background: 'var(--accent)', pointerEvents: 'none', zIndex: 51,
      }} />
    </>
  );
}

Object.assign(window, { ACCENTS, applyAccent, applyTheme, GridBg, MagButton, ArrowIcon, Tag, Dot, HeroBg, CustomCursor });
