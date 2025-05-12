import ContactPage from '@/app/(pages)/Contact';
import HeroSection from '@/app/(pages)/HeroSection';
import JourneySection from '@/app/(pages)/Journey';
import ProjectsShowcase from '@/components/ProjectShowcase';
import React from 'react'

const Home = () => {
  return (
    <div className='overflow:hidden'>
      <HeroSection/>
      <JourneySection/>
      <ProjectsShowcase/>
      <ContactPage/>
    </div>
  )
}

export default Home;
