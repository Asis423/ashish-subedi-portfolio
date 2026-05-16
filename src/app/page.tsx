'use client'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SplashCursor from '@/components/SplashCursor'

const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false })
const About = dynamic(() => import('@/components/About'), { ssr: false })
const GallerySpin = dynamic(() => import('@/components/GallerySpin'), { ssr: false })
const VortexGallery = dynamic(() => import('@/components/VortexGallery'), { ssr: false })
const DomeGallery = dynamic(() => import('@/components/DomeGallery'), { ssr: false })
const EndlessGallery = dynamic(() => import('@/components/EndlessGallery'), { ssr: false })
const CinematicGallery = dynamic(() => import('@/components/CinematicGallery'), { ssr: false })
const Skills = dynamic(() => import('@/components/Skills'), { ssr: false })
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false })

export default function Home() {
  return (
    <>

      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#A855F7"
      />
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <About />
          <GallerySpin />
          <VortexGallery />
          <DomeGallery />
          <EndlessGallery />
          <CinematicGallery />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  )
}