import HeroSection from '@/components/HeroSection';
import JourneySection from '@/components/Journey';
import ProjectsShowcase from '@/components/ProjectShowcase';
import React from 'react'

const Home = () => {
  return (
    <div className='overflow:hidden'>
      <HeroSection/>
      <JourneySection/>
      <ProjectsShowcase/>
    </div>
  )
}

export default Home;
