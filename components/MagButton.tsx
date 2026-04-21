'use client'

import { useRef, type ReactNode, type CSSProperties } from 'react'

interface Props {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  icon?: ReactNode
  style?: CSSProperties
  type?: 'button' | 'submit'
  href?: string
}

export default function MagButton({ children, onClick, variant = 'primary', icon, style, type = 'button', href }: Props) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    const lab = labelRef.current
    if (!el || !lab) return
    const r = el.getBoundingClientRect()
    const mx = e.clientX - r.left - r.width / 2
    const my = e.clientY - r.top - r.height / 2
    el.style.transform = `translate(${mx * 0.14}px, ${my * 0.2}px)`
    lab.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
    if (labelRef.current) labelRef.current.style.transform = ''
  }

  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 22px',
    borderRadius: 999,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.1,
    fontFamily: 'var(--sans)',
    transition: 'transform .25s cubic-bezier(.2,.7,.3,1), background .15s, border-color .15s',
    willChange: 'transform',
    textDecoration: 'none',
    ...style,
  }

  const variants: Record<string, CSSProperties> = {
    primary: { background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)' },
    ghost: { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)' },
  }

  const labelStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    willChange: 'transform',
    transition: 'transform .25s cubic-bezier(.2,.7,.3,1)',
  }

  const combinedStyle = { ...base, ...variants[variant] }

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={combinedStyle}
      >
        <span ref={labelRef} style={labelStyle}>
          {children}
          {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
        </span>
      </a>
    )
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={combinedStyle}
    >
      <span ref={labelRef} style={labelStyle}>
        {children}
        {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      </span>
    </button>
  )
}
