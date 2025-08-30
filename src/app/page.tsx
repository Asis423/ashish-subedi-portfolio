import ContactPage from '@/app/(pages)/Contact';
import HeroSection from '@/app/(pages)/HeroSection';
import JourneySection from '@/app/(pages)/Journey';
import ProjectsShowcase from '@/app/(pages)/ProjectShowcase';
import React from 'react'
import BlogPage from './(pages)/Blogs';
import SkillsSection from './(pages)/SkillsSection';
import AboutSection from './(pages)/AboutMe';
import SplashCursor from '@/components/react-bits/SplashCursor';


const Home = () => {
  return (
    <div className='overflow:hidden'>
      <HeroSection/>
      <SplashCursor/>
      <AboutSection/>
      <JourneySection/>
      <ProjectsShowcase/>
      <BlogPage/>
      <SkillsSection/>
      <ContactPage/>
    </div>
  )
}

export default Home;
