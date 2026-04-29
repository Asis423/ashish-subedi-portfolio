'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#work',    label: 'Work'    },
  { href: '#about',   label: 'About'   },
  { href: '#skills',  label: 'Skills'  },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex items-center justify-between',
        'px-12 transition-all duration-500',
        scrolled
          ? 'py-4 bg-bg/85 backdrop-blur-xl border-b border-border-subtle'
          : 'py-7'
      )}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-3 group" aria-label="home">
        <span className="font-ui font-extrabold text-lg tracking-wide text-gold">
          AS
        </span>
        <span className="w-px h-4 bg-border-gold" />
        <span className="font-ui text-[11px] font-medium tracking-[0.12em] uppercase text-ink-dim
                         hidden sm:block group-hover:text-ink transition-colors duration-300">
          Ashish Subedi
        </span>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className="relative font-ui text-[11px] font-medium tracking-[0.15em] uppercase
                         text-ink-dim hover:text-ink transition-colors duration-300
                         after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0
                         after:bg-gold after:transition-[width] after:duration-400
                         hover:after:w-full"
            >
              {label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="mailto:ashishsubedi423@gmail.com"
            data-hover
            className="font-ui text-[11px] font-semibold tracking-[0.2em] uppercase
                       text-gold border border-border-gold px-5 py-2.5
                       hover:bg-gold hover:text-bg transition-all duration-300"
          >
            Hire Me
          </a>
        </li>
      </ul>

      {/* Mobile burger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1 z-1001"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span className={cn(
          'block w-6 h-px bg-ink transition-transform duration-300',
          open && 'translate-y-1.25 rotate-45'
        )} />
        <span className={cn(
          'block w-6 h-px bg-ink transition-transform duration-300',
          open && '-translate-y-1.25 -rotate-45'
        )} />
      </button>

      {/* Mobile overlay */}
      <div className={cn(
        'fixed inset-0 bg-bg flex flex-col items-center justify-center gap-8 md:hidden',
        'transition-opacity duration-400',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="font-ui text-sm font-semibold tracking-widest2 uppercase text-ink-dim
                       hover:text-ink transition-colors duration-300"
          >
            {label}
          </a>
        ))}
        <a
          href="mailto:ashishsubedi423@gmail.com"
          className="font-ui text-[11px] font-semibold tracking-widest2 uppercase
                     text-gold border border-border-gold px-8 py-3 mt-4"
        >
          Hire Me
        </a>
      </div>
    </nav>
  )
}