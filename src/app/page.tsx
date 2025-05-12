import ContactPage from '@/app/(pages)/Contact';
import HeroSection from '@/app/(pages)/HeroSection';
import JourneySection from '@/app/(pages)/Journey';
import ProjectsShowcase from '@/app/(pages)/ProjectShowcase';
import React from 'react'
import BlogPage from './(pages)/Blogs';

const Home = () => {
  return (
    <div className='overflow:hidden'>
      <HeroSection/>
      <JourneySection/>
      <ProjectsShowcase/>
      <BlogPage/>
      <ContactPage/>
    </div>
  )
}

export default Home;
