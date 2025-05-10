import HeroSection from '@/components/HeroSection';
import JourneySection from '@/components/Journey';
import React from 'react'

const Home = () => {
  return (
    <div className='overflow:hidden'>
      <HeroSection/>
      <JourneySection/>
    </div>
  )
}

export default Home;
