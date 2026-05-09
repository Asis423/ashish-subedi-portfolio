'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send, Mail, MapPin, Link, Computer } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const formRef    = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
    )
    gsap.fromTo(formRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
    )
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400)) // replace with real submit logic
    setLoading(false)
    setSent(true)
  }

  return (
    <section ref={sectionRef} id="contact" className="relative py-36 px-12 bg-bg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border-subtle" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(200,169,110,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-350 mx-auto">
        <div className="mb-16">
          <span className="section-label">Contact · Section 07</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20">
          {/* Left — headline */}
          <div className="flex flex-col justify-between">
            <h2
              ref={headingRef}
              className="font-display font-light leading-none text-[clamp(40px,6vw,88px)]"
            >
              Let's{' '}
              <em className="text-gold not-italic font-semibold block">Work</em>
              Together.
            </h2>

            <div className="flex flex-col gap-6 mt-12 lg:mt-0">
              <a
                href="mailto:ashishsubedi423@gmail.com"
                data-hover
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 border border-border-gold flex items-center justify-center
                               group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                  <Mail size={14} className="text-gold group-hover:text-bg transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-ui text-[10px] tracking-widest2 uppercase text-ink-faint">Email</p>
                  <p className="font-ui text-sm text-ink group-hover:text-gold transition-colors duration-300">
                    ashishsubedi423@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border-subtle flex items-center justify-center">
                  <MapPin size={14} className="text-ink-faint" />
                </div>
                <div>
                  <p className="font-ui text-[10px] tracking-widest2 uppercase text-ink-faint">Location</p>
                  <p className="font-ui text-sm text-ink">Kathmandu, Nepal · Open to Remote</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border-subtle">
                <a
                  href="https://linkedin.com/in/ashish-subedi"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="w-10 h-10 border border-border-subtle flex items-center justify-center
                             hover:border-gold hover:bg-gold/10 transition-all duration-300"
                >
                  <Link size={14} className="text-ink-dim" />
                </a>
                <a
                  href="https://github.com/Asis423"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="w-10 h-10 border border-border-subtle flex items-center justify-center
                             hover:border-gold hover:bg-gold/10 transition-all duration-300"
                >
                  <Computer size={14} className="text-ink-dim" />
                </a>
                <span className="font-ui text-[10px] tracking-widest2 uppercase text-ink-faint ml-2">
                  Available for global opportunities
                </span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div ref={formRef}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center gap-6 text-center py-20">
                <div className="w-16 h-16 border border-gold flex items-center justify-center">
                  <Send size={20} className="text-gold" />
                </div>
                <div>
                  <p className="font-display text-3xl font-light text-ink mb-2">Message Sent</p>
                  <p className="font-ui text-sm text-ink-faint">
                    Ashish will get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="font-ui text-[11px] tracking-widest2 uppercase text-gold border-b border-gold/40 hover:border-gold transition-colors duration-300"
                  data-hover
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-ui text-[10px] font-semibold tracking-widest2 uppercase text-ink-faint">
                      Name
                    </label>
                    <Input placeholder="Your name" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-ui text-[10px] font-semibold tracking-widest2 uppercase text-ink-faint">
                      Email
                    </label>
                    <Input type="email" placeholder="your@email.com" required />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-ui text-[10px] font-semibold tracking-widest2 uppercase text-ink-faint">
                    Project Type
                  </label>
                  <Input placeholder="Brand Identity, Packaging, Campaign…" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-ui text-[10px] font-semibold tracking-widest2 uppercase text-ink-faint">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell Ashish about your project…"
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="self-start flex items-center gap-3"
                  data-hover
                >
                  {loading ? (
                    <span className="animate-pulse">Sending…</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={13} />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}