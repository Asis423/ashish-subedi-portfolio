import { useEffect, useState } from "react"

// Custom hook for responsive layouts
const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    
    // Initial check
    checkSize()
    
    // Add event listener
    window.addEventListener('resize', checkSize)
    
    // Clean up
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  return { isMobile, isTablet }
}