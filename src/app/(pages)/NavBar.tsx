"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Menu, X, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { id: "home", label: "Home" },
  { id: "journey", label: "Journey" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const navbarRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    // Close mobile menu if open
    if (isOpen) setIsOpen(false)

    // Get the section element
    const section = document.getElementById(sectionId)
    if (section) {
      // Calculate navbar height for offset
      const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0

      // Use native smooth scrolling
      window.scrollTo({
        top: section.offsetTop - navbarHeight,
        behavior: "smooth"
      })
    }
  }

  // Detect scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      // Update navbar background
      if (scrollPosition > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Update active section based on scroll position
      const sections = navLinks.map(link => {
        const element = document.getElementById(link.id)
        return element ? { id: link.id, offsetTop: element.offsetTop } : null
      }).filter(Boolean)

      const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0

      // Find current section (with some buffer for navbar)
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && scrollPosition >= sections[i]!.offsetTop - navbarHeight - 100) {
          setActiveSection(sections[i]!.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animate navbar on mount
  useEffect(() => {
    const navbar = navbarRef.current

    gsap.fromTo(
      navbar,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5, // Reduced delay for better UX
      },
    )
  }, [])

  // Animate mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return

    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" },
      )

      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll("button"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.2, ease: "power3.out" },
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      })
    }
  }, [isOpen])

  return (
    <header
      ref={navbarRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-colors duration-300",
        isScrolled
          ? isDarkMode
            ? "bg-black/80 text-white backdrop-blur-md"
            : "bg-white/80 text-black backdrop-blur-md"
          : "bg-transparent text-white",
        isOpen && "bg-black/80 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="text-xl font-bold font-mono relative h-10 overflow-hidden group cursor-pointer"
          >
            <div className="flex flex-col mt-3 transition-transform duration-300 group-hover:-translate-y-1/2">
              <span>
                Ashish Subedi<span className="text-emerald-500">.</span>
              </span>
              <span className="opacity-0 mt-0 group-hover:opacity-100 transition-opacity duration-300">
                Graphic Designer<span className="text-emerald-500">.</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "relative py-2 text-sm font-medium transition-colors hover:text-emerald-500 cursor-pointer",
                  activeSection === link.id ? "text-emerald-500" : "text-current",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-500 after:transition-all hover:after:w-full",
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full transition-colors",
                isScrolled || isDarkMode
                  ? "hover:bg-gray-200 dark:hover:bg-gray-800"
                  : "hover:bg-white/20"
              )}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "md:hidden p-2 rounded-full transition-colors",
                isScrolled || isDarkMode
                  ? "hover:bg-gray-200 dark:hover:bg-gray-800"
                  : "hover:bg-white/20"
              )}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={mobileMenuRef}
          className={cn("md:hidden overflow-hidden h-0 opacity-0", isDarkMode ? "bg-black/90" : "bg-white/90")}
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "block w-full text-left py-2 px-4 text-lg font-medium transition-colors hover:text-emerald-500",
                  activeSection === link.id ? "text-emerald-500" : isDarkMode ? "text-white" : "text-black",
                )}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}