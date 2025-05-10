"use client"

import { useState, useRef, useEffect } from "react"
import { useThree, Canvas, useFrame,} from "@react-three/fiber"
import { Environment, Float, Text, } from "@react-three/drei"
import { animated, useSpring } from '@react-spring/three';
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTheme } from "next-themes"
import type * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

interface ProjectProps {
  position: [x: number, y: number, z: number]
  name: string
  color: string
  projectUrl: string
  description: string
  index: number
  setHovered: (index: number | null) => void
  hovered: number | null
}

const ProjectCard = ({ position, name, color, projectUrl, description, index, setHovered, hovered }: ProjectProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const isHovered = hovered === index
  const { theme } = useTheme();

  // Animation springs
  const { scale, rotation } = useSpring({
    scale: isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
    rotation: isHovered ? [0, Math.PI / 8, 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  })

  // Continuous animation when not hovered
  useFrame((state) => {
    if (!isHovered && meshRef.current) {
      // Gentle floating animation when not hovered
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.1
    }
  })

  return (
    <group position={position}>
      <animated.mesh
        ref={meshRef}
        scale={scale}
        rotation={rotation}
        onClick={() => window.open(projectUrl, "_blank")}
        onPointerOver={() => setHovered(index)}
        onPointerOut={() => setHovered(null)}
      >
        {/* Card geometry - thin box */}
        <boxGeometry args={[1.5, 1, 0.1]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />

        {/* Card content */}
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.15}
          color={theme === 'dark' ? 'white' : 'black'}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.3}
          textAlign="center"
        >
          {name}
        </Text>
      </animated.mesh>

      {/* Description that appears when hovered */}
      {isHovered && (
        <Text
          position={[0, -0.7, 0]}
          fontSize={0.15}
          color="black"
          anchorX="left"
          anchorY="bottom"
          maxWidth={2}
          textAlign="center"
        >
          {description}
        </Text>
      )}
    </group>
  )
}

const Scene = () => {
  const { camera } = useThree()
  const { resolvedTheme } = useTheme()
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    camera.position.set(0, 0, 5)
  }, [camera])

  const projects = [
    {
      name: "Brand Identity",
      position: [-2.5, 0.5, 0] as [number, number, number],
      color: "#FF5A5F",
      projectUrl: "/projects/brand-identity",
      description: "Complete brand identity systems for various clients",
    },
    {
      name: "UI/UX Design",
      position: [0, 1, 0] as [number, number, number],
      color: "#3498db",
      projectUrl: "/projects/ui-ux",
      description: "User interfaces and experiences for web and mobile apps",
    },
    {
      name: "Print Design",
      position: [2.5, 0.5, 0] as [number, number, number],
      color: "#2ecc71",
      projectUrl: "/projects/print",
      description: "Brochures, posters, and other print materials",
    },
    {
      name: "Packaging",
      position: [-3, -1, 0] as [number, number, number],
      color: "#f1c40f",
      projectUrl: "/projects/packaging",
      description: "Product packaging design for retail brands",
    },
    {
      name: "Motion Graphics",
      position: [3, -1, 0] as [number, number, number],
      color: "#9b59b6",
      projectUrl: "/projects/motion",
      description: "Animated graphics and visual effects for video",
    },
  ]

  return (
    <>
      <Environment preset={resolvedTheme === "dark" ? "night" : "sunset"} />
      <ambientLight intensity={0.6} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} castShadow />

      <group>
        {projects.map((project, index) => (
          <Float key={index} speed={1.5} rotationIntensity={0.2} floatIntensity={0.3} floatingRange={[-0.1, 0.1]}>
            <ProjectCard
              key={index}
              name={project.name}
              position={project.position}
              color={project.color}
              projectUrl={project.projectUrl}
              description={project.description}
              index={index}
              setHovered={setHovered}
              hovered={hovered}
            />
          </Float>
        ))}
      </group>
    </>
  )
}

export default function ProjectsShowcase() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    gsap.fromTo(
      section,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen py-20 relative dark:bg-black/80 transition-colors duration-300 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-emerald-500">Featured Projects</h2>

        <div className="relative h-[600px] w-full">
          <Canvas>
            <Scene />
          </Canvas>

          
        </div>
      </div>
    </section>
  )
}
