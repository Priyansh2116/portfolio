'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    let rx = -100, ry = -100, tx = -100, ty = -100
    let raf: number

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY
      dot.style.transform = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`
    }

    const tick = () => {
      rx += (tx - rx) * 0.18
      ry += (ty - ry) * 0.18
      ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('button, a, [data-magnetic]')) ring.classList.add('cc-lg')
    }
    const onOut = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('button, a, [data-magnetic]')) ring.classList.remove('cc-lg')
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cc-ring" />
      <div ref={dotRef} className="cc-dot" />
    </>
  )
}
