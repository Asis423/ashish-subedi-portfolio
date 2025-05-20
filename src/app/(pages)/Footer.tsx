"use client"

import { useEffect, useRef } from "react"
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const newsletterRef = useRef<HTMLDivElement>(null)
  const copyrightRef = useRef<HTMLDivElement>(null)

  
  // Create a single reusable scroll function
  

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      }
    })

    tl.from(logoRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(linksRef.current?.children || [], {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.4")
    .from(contactRef.current?.children || [], {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.3")
    .from(newsletterRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.2")
    .from(copyrightRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2")

    // Hover animations for links
    gsap.utils.toArray<HTMLElement>(".footer-link").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, { 
          x: 5,
          duration: 0.3,
          ease: "power2.out"
        })
      })
      link.addEventListener("mouseleave", () => {
        gsap.to(link, { 
          x: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const scrollToSection = (sectionId:string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <footer ref={footerRef} className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-9 mx-10 my-10">
          {/* Brand Column */}
          <div>
            <div ref={logoRef} className="mb-4">
              <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Ashish Subedi</h2>
              <p className="text-sm mt-1">Creating digital excellence</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Links</h3>
             <div ref={linksRef} className="space-y-2">
      <section 
        id="home-link" 
        className="block cursor-pointer footer-link hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        onClick={() => scrollToSection("home")}
      >
        Home
      </section>
      
      <section 
        id="about-link" 
        className="block cursor-pointer footer-link hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        onClick={() => scrollToSection("about")}
      >
        About
      </section>
      
      <section 
        id="project" 
        className="block cursor-pointer footer-link hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        onClick={() => scrollToSection("projects")}
      >
        Projects
      </section>
      

    </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Contact</h3>
            <div ref={contactRef} className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                <a href="mailto:ashishsubedi423@gmail.com"className="cursor-pointer text-gray-700 dark:text-gray-300 break-all">ashishsubedi423@gmail.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                <a href="tel:9860104336"className="text-gray-700 dark:text-gray-300">+977 (9841) 456-7890</a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="text-gray-700 dark:text-gray-300">Thankot Kathmandu</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Newsletter</h3>
            <div ref={newsletterRef}>
              <p className="text-sm mb-3">Subscribe to our newsletter for updates.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 w-full rounded-l-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-700"
                />
                <button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-4 py-2 rounded-r-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div ref={copyrightRef} className=" border-gray-200 dark:border-gray-800 mt-12 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Ashish Subedi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}