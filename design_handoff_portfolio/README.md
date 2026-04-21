# Handoff: Priyansh Sonthalia — Personal Portfolio

## Overview
A personal developer portfolio for Priyansh Sonthalia — CS undergrad at SRM, focused on AI systems, network security, and systems work. The primary chosen direction is **"Dashboard"** (Direction B): a dev-tool-inspired layout with sidebar navigation, panel chrome, monospace accents, and a calm warm-neutral palette with a subtle grid background. Two alternative directions (Techy Calm, Editorial) are bundled as reference variants but Direction B is the target to implement.

## About the Design Files
The files in this bundle are **design references created in HTML + inline JSX** — prototypes showing intended look, structure, and behavior. They are not production code to copy directly.

The task is to **recreate these designs in a real production codebase**. If starting fresh, recommended stack:
- **Next.js 14+ (App Router)** with TypeScript
- **Tailwind CSS** for styling (tokens translate cleanly from the CSS vars used here)
- **Framer Motion** for the micro-interactions (magnetic button, marquee, pulse dot, fade-ups)
- Deploy to **Vercel** or **Netlify**

The prototype uses React 18 loaded via `<script>` tags + Babel standalone — that's for the design tool only. Rewrite as idiomatic TSX components.

## Fidelity
**High-fidelity.** Exact colors (oklch), spacing, typography, layout, and interactions are all specified in the source files. Recreate pixel-perfectly.

## Target Direction: B — "Dashboard"

### Canvas & Global Layout
- Full-bleed page (no artboard framing in production).
- Top sticky terminal-style chrome bar (46px tall).
- Below it: **2-column grid** — `260px sidebar | 1fr main content`.
- Content max-width: the main column fills remaining viewport.
- Main content padding: `32px 40px 80px`.
- Background: warm off-white with a **subtle dotted grid** overlay, radial-masked to fade at edges.

### Top Chrome Bar
- Height ~46px, padding `12px 24px`.
- Sticky, z-index 20.
- `backdrop-filter: blur(12px)`, background `var(--bg-panel)` (translucent white).
- Border-bottom `1px solid var(--line-soft)`.
- Font: mono 11px, `var(--ink-mute)`.
- Left cluster: 3 "traffic-light" dots (red `#f87171`, amber `#fbbf24`, green `#4ade80`, 11px circles), then `~/priyansh/portfolio`, then `main` (faint), then `● live` (accent color).
- Right cluster: `sess · 001`, current date in `MM/DD/YYYY`, then a `⌘K` kbd pair.

### Sidebar (260px)
- Padding `24px 20px`.
- Background: `color-mix(in oklch, var(--bg-raised) 50%, transparent)`.
- Border-right `1px solid var(--line-soft)`.
- Sticky, top offset = chrome height (46px), min-height fills viewport.
- **Profile block** (top): 38×38px rounded-10 accent-color square with white mono "ps" initials, name "Priyansh" (14px semibold), sub "@priyansh · srm '27" (mono 10px faint).
- Horizontal divider below.
- **Nav group "navigate"** — mono 10px uppercase label "navigate", spaced 10px below. Items:
  - `01 Overview` (active — bg `var(--chip-bg)`, ink color, 500 weight)
  - `02 Projects`, `03 Stack`, `04 Experience`, `05 Contact` (muted)
  - Each item: `6px 10px` padding, border-radius 6, flex with 12px gap, 13px font, number prefix in mono 10px faint.
- **Group "status"** — key/value rows in mono 11px: `role: intern`, `at: Smoad`, `focus: networks`, `open: Summer '26` (accent color).
- **Group "links"** — mono 11px list: `github.com/priyansh ↗`, `linkedin.com/in/priyansh ↗`, `mail ↗`. Hover turns from muted to ink.

### Hero Panel
Rounded 16, bordered, backdrop-blur-12, padding `48px 48px 36px`, margin-bottom 28.
Above it sits a hero background layer (particles by default — animated canvas). Content is z-indexed above.

- Mono 11px uppercase eyebrow: `$ cat /about/me.md` (the `$` in accent color).
- **H1**: 60px / line-height 1.02 / letter-spacing -1.8 / weight 500 / max-width 820. Copy:
  > AI systems, network tools, and the *weird corners* between.
  — "weird corners" in `var(--accent-ink)`.
- Body: 16px / line-height 1.55 / muted / max-width 620:
  > Priyansh Sonthalia — CS undergrad at SRM. Interning at Smoad Networks on real-time network monitoring; previously Samsung R&D on LLM-powered pricing systems.
- Buttons row (margin-top 32, gap 10):
  - Primary "Browse projects" with arrow icon — **magnetic** (see Interactions).
  - Ghost "Resume ↗".
- **Stats strip** — 4 columns, top border, padding `16px 18px` per cell, right-divider between cells:
  - `CGPA` / `9.42`
  - `Projects shipped` / `12+`
  - `Rover challenge` / `5th intl.`
  - `Years building` / `3`
  - Labels: mono 10px uppercase faint, letter-spacing 0.6.
  - Values: 26px / weight 500 / letter-spacing -0.6 / tabular-nums.

### Two-Column: Projects + Skills
Grid `1.6fr 1fr`, gap 20, margin-bottom 28.

#### Projects Panel (left)
- Panel: rounded 14, bordered `var(--line-soft)`, backdrop-blur-12.
- Header: `14px 20px`, mono 11px. Left: `02 PROJECTS` (number in accent, title uppercase letter-spacing 1). Right: meta text `{N} total`.
- Rows (one per project, vertical list):
  - Grid `60px 1fr auto`, gap 18, padding `18px 20px`, bottom-border between rows.
  - Col 1: year, mono 11px faint.
  - Col 2:
    - Title: 16px semibold + ` · {kicker}` in mono 10px faint inline.
    - Description: 13px / line-height 1.55 / muted.
    - Tech chips: 5px gap, capped at 4 chips visible.
  - Col 3: `open ↗` mono 12px, faint by default, becomes accent-ink on hover with 4px x-shift.
  - **Hover row background**: `color-mix(in oklch, var(--accent-soft) 40%, transparent)`, transition 200ms.

**Projects list (exact order & content):**
1. **STARSHIP** · Rover base station · 2025 · Deployed
   > React base station for real-time GPS + acceleration telemetry from a rover. ZeroMQ for fast comms, LattePanda + Zephyr OS onboard.
   Tech: React, ZeroMQ, Python, Zephyr OS
2. **AIIMAGING** · Implant identifier · 2025 · Live
   > Web system that identifies medical implants from X-rays using a 3D nnU-Net. Preprocessing, inference, and result viz in one flow.
   Tech: nnU-Net, Python, FastAPI, React
3. **Glenoid Bone Loss** · Medical 3D segmentation · 2024 · Research
   > Trained a 3D nnU-Net on 52 CT scans to measure glenoid bone loss. Full pipeline: curation, annotation, training, eval.
   Tech: nnU-Net, PyTorch, Python
4. **RUDRA** · Mars rover team site · 2024 · Shipped
   > Full-stack Next.js site for my college's Mars rover team. Signups, registrations, content, all on MongoDB.
   Tech: Next.js, MongoDB, TypeScript
5. **Samsung Pricing** · LLM-powered e-commerce scanner · 2025 · Internal
   > AI pricing platform that pulls live prices from major e-commerce sites via Browser-Use + self-hosted LLMs. FastAPI backend, search UI.
   Tech: Browser-Use, FastAPI, LLMs, Python
6. **Smoad NetMon** · Real-time network monitor · 2025 · In progress
   > Latency, jitter, packet loss — visualized live. Routers set up as RIPE Atlas hosts with secure tunneled private-IP pings.
   Tech: RIPE Atlas, Networking, Dashboards

#### Skills Panel (right)
- Same panel chrome.
- Header `03 STACK` / meta `interactive` (or `> {category}` when filtered).
- Body: padding `16px 20px 20px`.
- Filter pill row (gap 6): `All` + one pill per category. Active pill: accent bg, white text. Inactive: transparent, mono 10px, `var(--ink-mute)`.
- Categories listed vertically (gap 14). Each group:
  - Mono 10px uppercase faint label.
  - Chip row, gap 6.
  - When a filter is active, non-matching categories fade to opacity 0.3 (250ms transition).

**Categories & items:**
- **AI & ML**: Machine Learning, Agentic AI, nnU-Net, LLMs, Browser-Use
- **Languages**: Python, TypeScript, C, C++, Java, SQL
- **Systems**: Network Security, FastAPI, ZeroMQ, Zephyr OS, RIPE Atlas
- **Frontend**: React, Next.js, MongoDB
- **Explore**: Quantum Computation

### Two-Column: Experience + Awards
Grid `1.2fr 1fr`, gap 20.

#### Experience Panel
- Header `04 EXPERIENCE / timeline`.
- Rows: grid `110px 1fr`, padding `14px 0`, top-border between rows (not first).
- Col 1: date range mono 10px faint.
- Col 2: role (15px / 500), company (12px muted), 8px spacer, bullet list — each bullet 12px muted, `paddingLeft 12`, pseudo-dash `4×1` line at `top 9` left 0.

**Entries:**
1. **Project Intern** — Smoad Networks — Sep 2025 — Present
   - Real-time network monitoring (latency, jitter, packet loss).
   - Router dashboard for performance + health metrics.
   - Configured RIPE Atlas hosts with secure tunneled private-IP pinging.
2. **Prism Project Intern** — Samsung R&D Institute India — Bangalore — Jul 2025 — Dec 2025
   - AI pricing platform using Browser-Use + self-hosted LLMs.
   - FastAPI backend + automated browser workflows that normalize offers.
   - Shipped a search-based frontend for cross-retailer price compare.
3. **B.Tech, Computer Science** — SRM Institute of Science and Technology — Jun 2023 — May 2027
   - CGPA 9.42 / 10.00.
   - Focus: AI, network security, systems.

#### Awards Panel
- Header `· AWARDS`.
- Rows padding `14px 20px`, top-border between.
- Title 13px / 500. Optional sub: mono 11px faint.

**Entries:**
- 5th — Intl. Rover Challenge 2025 — with team RUDRA
- SIH Top 50 — '24 & '25 — Smart India Hackathon qualifiers
- Microsoft GitHub Copilot Cert.
- LCM Distinction — Public Communication

### Contact Panel
- Full-width panel, padding 40.
- Grid `1fr 1fr`, gap 40, align center.
- Left column:
  - Inline section label `05 / CONTACT`.
  - H3 "Got a weird problem?" (32px / 500 / letter-spacing -0.8 / line-height 1.1, margin `16px 0 8px`).
  - Body 14px muted: "Say hi — I respond faster than my terminal."
  - Mono 12px key/value rows: `email: priyansh@example.com`, `github: @priyansh`, `linkedin: in/priyansh`.
- Right column: form, gap 10.
  - Input "your name", input "your@email.com", textarea "what's the problem?" (4 rows).
  - Submit button: magnetic primary "Send" with arrow icon.
  - Input styling: `12px 14px` padding, rounded 8, `1px solid var(--line)`, bg `var(--bg)`, 13px font.

## Design Tokens

### Typography
- **Sans** — Geist (Google Fonts), weights 300/400/500/600/700. Fallback: system-ui sans stack.
- **Mono** — Geist Mono, 400/500. Fallback: JetBrains Mono, ui-monospace.
- **Serif** — Instrument Serif (italic used for accent phrases). Fallback: Georgia.

Used heavily: mono for labels/eyebrows/keys. Serif italic only appears in directions A and C, not B.

### Colors (oklch — four accent palettes)
Default theme = light + slate accent.

**Light theme:**
```
--bg:        oklch(0.975 0.008 75);
--bg-raised: oklch(0.99  0.005 75);
--bg-panel:  oklch(1 0 0 / 0.7);     /* translucent for glass */
--ink:       oklch(0.2   0.01 60);
--ink-mute:  oklch(0.42  0.01 60);
--ink-faint: oklch(0.6   0.01 60);
--line:      oklch(0.86  0.006 70);
--line-soft: oklch(0.92  0.006 70);
--grid:      oklch(0.5   0.01 70 / 0.07);
--chip-bg:   oklch(0.95  0.006 70 / 0.7);
```

**Dark theme:**
```
--bg:        oklch(0.18 0.008 65);
--bg-raised: oklch(0.22 0.008 65);
--bg-panel:  oklch(0.24 0.008 65 / 0.7);
--ink:       oklch(0.96 0.008 65);
--ink-mute:  oklch(0.72 0.01 65);
--ink-faint: oklch(0.48 0.01 65);
--line:      oklch(0.32 0.008 65);
--line-soft: oklch(0.26 0.008 65);
--grid:      oklch(1 0 0 / 0.04);
--chip-bg:   oklch(0.28 0.008 65 / 0.6);
```

**Accents** — per-palette `(h, c)`:
- `slate` (default): `h=230, c=0.045` — Slate Blue
- `terracotta`: `h=35,  c=0.09`  — Terracotta
- `moss`:       `h=135, c=0.05`  — Moss
- `graphite`:   `h=260, c=0.01`  — Graphite

Derived from the accent pair:
```
--accent:      oklch(0.52 {c} {h});
--accent-soft: oklch(0.92 {c*0.4} {h});
--accent-glow: oklch(0.7  {c} {h} / 0.25);
--accent-ink:  oklch(0.35 {c} {h});
```

### Spacing
Uses absolute px (translate to Tailwind's 4px scale). Common values used: 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 60, 80.

### Radii
- Chips / kbd: 3–6
- Panels / inputs: 8–14
- Hero panel: 16
- Pills: 999

### Grid Background
Dotted radial: `radial-gradient(circle at 1px 1px, var(--grid) 1px, transparent 1px)`, size 24px. Masked with `radial-gradient(ellipse at center, black 40%, transparent 85%)` so it fades near edges. Fixed behind content, pointer-events none.

## Interactions & Behavior

### Magnetic Button
Primary CTAs. On `mousemove` inside the button's bounding box:
- Button translates by `(mx * 0.14, my * 0.2)`.
- Inner label translates by `(mx * 0.25, my * 0.35)` (creates parallax).
- On `mouseleave`, reset to 0.
- Transition: `transform .25s cubic-bezier(.2,.7,.3,1)`.
Use `useRef` for button + label nodes.

### Custom Cursor
Only enabled when `(hover: hover)` media matches.
- A 32×32 outlined ring (`1px solid var(--accent)`, 50% radius, `mix-blend-mode: difference`, opacity 0.6) that eases toward the cursor (lerp factor 0.18 per frame via rAF).
- A 6×6 filled accent dot that tracks the cursor exactly.
- Ring enlarges to 48×48 when hovering `button, a, [data-magnetic]` (class toggle `.cc-lg`).
- Scoped to a root element via a ref (not document-wide), so it lives inside the portfolio region.

### Skill Filter
Clicking a category pill:
- Sets active filter (state).
- All non-matching category groups fade to opacity 0.3 (250ms transition).
- Chips inside the active category render with `accent-soft` background and `accent-ink` color.
- Clicking "All" clears the filter.

### Tag / Chip
- Padding `4px 10px`, mono 11px, rounded 999.
- Default: `var(--chip-bg)` + 1px `var(--line-soft)` + `var(--ink-mute)` text.
- Active: `var(--accent-soft)` bg, `transparent` border, `var(--accent-ink)` text.

### Status Dot (pulse)
Absolute-positioned 7×7 dot with an outer `-3px inset` copy at 30% opacity, `animation: pulse 2s ease-out infinite`.
```
@keyframes pulse {
  0%   { opacity: .6; transform: scale(1); }
  70%  { opacity: 0;  transform: scale(2.4); }
  100% { opacity: 0; }
}
```
Tones: `live` green (`oklch(0.72 0.15 150)`), `wip` amber (`oklch(0.78 0.15 80)`).

### Hero Background Variants
Three variants (expose as a user-facing toggle or keep `particles` as the one).
1. **mesh** — SVG with two radial gradients (accent + accent-ink), opacity 0.6.
2. **gradient** — absolute full-bleed with two radial gradients blurred 40px.
3. **particles** — `<canvas>` with 42 floating dots + lines connecting pairs within 140px. DPR-scaled. Accent color for strokes/fills, line alpha `(1 - d/140) * 0.25`.

### Project Row Hover
- Background transitions to accent-soft-tint in 200ms.
- Right-column `open ↗` translates 4px right and shifts color to accent-ink.

### Smooth Scroll
Use CSS `scroll-behavior: smooth` on `html`. Anchor hrefs `#work`, `#stack`, etc. target corresponding sections (nav items in sidebar should be wired up).

### Theme Toggle
Light / dark swaps all CSS vars listed above. Persist to `localStorage` key `portfolio.theme`. Default: follow `prefers-color-scheme`, fallback light.

### Accent Toggle
Optional — can be exposed as a settings affordance or just pick `slate` and ship. If exposing, pattern matches theme toggle (persist to localStorage).

## State Management
- `theme` — `'light' | 'dark'` (global, persisted).
- `accent` — one of `'slate' | 'terracotta' | 'moss' | 'graphite'` (persisted).
- `hero` — `'mesh' | 'gradient' | 'particles'` (persisted).
- `skillFilter` — `string | null` (local to skills panel).
- Contact form — local state per field + client-side validation (required + email regex). POST endpoint TBD (suggest Formspree / a serverless function / Resend).

## Assets
- **Resume** included as `resume.pdf` — link from sidebar or "Resume ↗" button.
- **No images or icons included** — icons in the design are inline SVGs (arrow, grip). Recommend `lucide-react` in the rewrite: `ArrowRight` for CTAs, `ExternalLink` for `↗` indicators, `Terminal` / `Dot` where the dev vocab appears.
- **No profile photo** in the current design. Add one if desired (52×52 round, top-left of sidebar, replacing the "ps" mark).

## Files in this Bundle
- `Portfolio.html` — entry HTML. Loads the JSX modules.
- `portfolio-data.jsx` — all resume-derived content (name, role, stats, about, skills, projects, experience, awards). **This is the source of truth for copy.**
- `portfolio-primitives.jsx` — shared primitives:
  - `ACCENTS`, `applyAccent`, `applyTheme` — theming utilities
  - `GridBg` — the background grid
  - `MagButton` — magnetic button
  - `Tag`, `Dot`, `ArrowIcon` — small UI atoms
  - `HeroBg` + `ParticleField` — three hero background variants
  - `CustomCursor` — the cursor component
- `portfolio-dir-b.jsx` — **THE TARGET DIRECTION.** Implement this one.
- `portfolio-dir-a.jsx` — reference variant (editorial, glass cards). Skip unless asked.
- `portfolio-dir-c.jsx` — reference variant (oversized editorial). Skip unless asked.
- `resume.pdf` — source resume, for reference and for linking.

## Responsive Behavior
The design is built desktop-first. For the rewrite, implement these breakpoints:
- **≥ 1024px**: exact design as documented.
- **768–1023px**: collapse sidebar into a top drawer / hamburger; hero stats go 2×2; two-column grids become stacked; projects panel keeps full row layout; skills panel chips wrap more.
- **< 768px**: single column; hero H1 scales to ~36–40px; stats become 2-column; chrome bar hides traffic lights, keeps status + ⌘K; sidebar becomes a bottom-sheet nav.

## Implementation Notes for Claude Code

1. **Start with `portfolio-data.jsx`** — translate directly to a typed `data.ts` export. Don't re-type the copy; use it verbatim.
2. **Primitive components first**: Tag, Dot, MagButton, ArrowIcon, GridBg, CustomCursor. These are reused everywhere.
3. **Then build sections**: Chrome → Sidebar → HeroPanel → ProjectsPanel → SkillsPanel → ExperiencePanel → AwardsPanel → ContactPanel.
4. **CSS variables**: set them on `:root` once at mount (or via a `ThemeProvider`). Don't hardcode hex — the oklch values are intentional.
5. **Tailwind mapping**: add the oklch vars to `tailwind.config.ts` as `colors.bg`, `colors.ink`, etc. Use `font-mono` class with `Geist Mono` wired into `@theme` or `fontFamily`.
6. **Accessibility**:
   - Custom cursor: offer a `prefers-reduced-motion` escape hatch (disable ring easing).
   - Magnetic button: same — disable transforms if reduced motion.
   - Ensure all nav links are real `<a>` tags with visible focus rings.
   - The skill filter pills need proper `aria-pressed` state.
   - Contact form fields need `<label>` associations.
7. **SEO**: good meta tags, OG image (render a 1200×630 variant of the hero panel), structured data for Person.
8. **Analytics**: add a privacy-friendly option (Plausible / Umami) — avoid GA.

---

Questions during implementation → the HTML prototypes in this bundle are the source of truth. Open `Portfolio.html` directly in a browser to see the live reference.
