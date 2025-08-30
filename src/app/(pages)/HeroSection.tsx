"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import demo from "@/assets/demo.jpg"
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  

  useEffect(() => {
    if (!nameRef.current || !titleRef.current) return

    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(nameRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    ).fromTo(titleRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 
      "-=0.5"
    )

    return () => {
      tl.kill()
    }
  }, [])

  useEffect(() => {
    if (imageLoaded && containerRef.current) {
      gsap.to(containerRef.current.querySelector('.holographic-effect'), {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      })
    }
  }, [imageLoaded])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const image = new window.Image()
        image.src = e.target?.result as string
        image.onload = () => {
          setImageLoaded(true)
          setShowUpload(false)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center"
    >
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-[20vw] font-bold uppercase tracking-wider opacity-10 select-none">
          Ashish Subedi
        </h2>
      </div>

      {/* Holographic container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Image container with holographic effect */}
        <div className="relative mb-8 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
          <div className="absolute inset-0 holographic-effect opacity-0"></div>
          
          {showUpload ? (
            <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-emerald-500/30 rounded-full">
              <label htmlFor="image-upload" className="cursor-pointer text-center p-4">
                <div className="text-emerald-500 mb-2 text-4xl">+</div>
                <span className="text-sm text-emerald-500/80">Upload Image</span>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full holographic-glare"></div>
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src={demo}
                  alt="Ashish Subedi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full border border-emerald-500/30 holographic-ring"></div>
              <div className="absolute -inset-4 rounded-full border border-emerald-500/10 holographic-ring-outer"></div>
            </div>
          )}
        </div>

        {/* Name and title */}
        <div className="text-center">
          <h1 ref={nameRef} className="text-5xl md:text-6xl font-bold mb-2 text-white">
            Ashish Subedi
          </h1>
          <p ref={titleRef} className="text-xl md:text-2xl text-emerald-400 font-light tracking-wider">
            Graphic Designer
          </p>
        </div>
      </div>

      {/* Subtle particles effect */}
      <div className="absolute inset-0 particles-container"></div>

      <style jsx>{`
        .holographic-effect {
          background: linear-gradient(
            125deg,
            transparent 0%,
            rgba(110, 231, 183, 0.1) 40%,
            rgba(110, 231, 183, 0.2) 50%,
            rgba(110, 231, 183, 0.1) 60%,
            transparent 100%
          );
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 2;
        }
        
        .holographic-glare {
          animation: holographicGlare 8s infinite linear;
          mix-blend-mode: overlay;
        }
        
        .holographic-ring {
          box-shadow: 
            0 0 15px rgba(110, 231, 183, 0.3),
            inset 0 0 15px rgba(110, 231, 183, 0.2);
          animation: holographicPulse 3s infinite alternate;
        }
        
        .holographic-ring-outer {
          box-shadow: 0 0 30px rgba(110, 231, 183, 0.1);
          animation: holographicRotate 15s infinite linear;
        }
        
        .particles-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, rgba(110, 231, 183, 0.3), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(110, 231, 183, 0.2), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(110, 231, 183, 0.3), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(110, 231, 183, 0.2), transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(110, 231, 183, 0.1), transparent);
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: particlesMove 20s infinite linear;
        }
        
        @keyframes holographicGlare {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes holographicPulse {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        
        @keyframes holographicRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes particlesMove {
          0% { background-position: 0 0; }
          100% { background-position: 200px 200px; }
        }
      `}</style>
    </section>
  )
}