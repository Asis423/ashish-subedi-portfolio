'use client'
import dynamic from 'next/dynamic'
import Navbar  from '@/components/Navbar'
// import Footer  from '@/components/Footer'

/* Client-only components (browser APIs: Three.js, GSAP, Lenis) */
const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const Hero         = dynamic(() => import('@/components/Hero'),         { ssr: false })
const About        = dynamic(() => import('@/components/About'),        { ssr: false })
// const Projects     = dynamic(() => import('@/components/Projects'),     { ssr: false })
// const Skills       = dynamic(() => import('@/components/Skills'),       { ssr: false })
// const Contact      = dynamic(() => import('@/components/Contact'),      { ssr: false })

export default function Home() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <About />
          {/* <Projects />
          <Skills />
          <Contact /> */}
        </main>
        {/* <Footer /> */}
      </SmoothScroll>
    </>
  )
}