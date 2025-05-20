import ContactPage from '@/app/(pages)/Contact';
import HeroSection from '@/app/(pages)/HeroSection';
import JourneySection from '@/app/(pages)/Journey';
import ProjectsShowcase from '@/app/(pages)/ProjectShowcase';
import React from 'react'
import BlogPage from './(pages)/Blogs';
import SkillsSection from './(pages)/SkillsSection';
import AboutSection from './(pages)/AboutMe';


const Home = () => {
  return (
    <div className='overflow:hidden'>
      <HeroSection/>
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
