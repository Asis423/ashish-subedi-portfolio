"use client"

import { useState } from "react"

import { useRef, useEffect } from "react"
import { useThree, Canvas } from "@react-three/fiber"
import { Environment, Float, PresentationControls, Text } from "@react-three/drei"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTheme } from "next-themes"

gsap.registerPlugin(ScrollTrigger)
interface ProjectProps {
    position:  [x: number, y: number, z: number];
    rotation: any; // or define a specific type for rotation
    scale: any; // or define a specific type for scale
    name: string;
    color: string;
    onClick: () => void;
}


const Project = ({ position, rotation, scale, name, color, onClick }: ProjectProps) => {
  
    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh position={position} rotation={rotation} scale={scale} onClick={onClick}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
            </mesh>
            <Text
                position={[position[0], position[1] - 0.8, position[2]]}
                fontSize={0.15}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {name}
            </Text>
        </Float>
    )
}

type SetSelectedProjectInterFace = (projectName: string | null) => void;
const Scene = ({ setSelectedProject }: { setSelectedProject: SetSelectedProjectInterFace }) => {
    const { camera } = useThree()
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        camera.position.set(0, 0, 5)
    }, [camera])

    const projects = [
    { name: "Brand Identity", position: [-2, 0, 0] as [number, number, number], color: "#FF5A5F", scale: [0.8, 0.8, 0.8] },
    { name: "UI/UX Design", position: [0, 0, 0] as [number, number, number], color: "#3498db", scale: [1, 1, 1] },
    { name: "Print Design", position: [2, 0, 0] as [number, number, number], color: "#2ecc71", scale: [0.8, 0.8, 0.8] },
    { name: "Packaging", position: [-1.5, -1.5, 0] as [number, number, number], color: "#f1c40f", scale: [0.7, 0.7, 0.7] },
    { name: "Motion Graphics", position: [1.5, -1.5, 0] as [number, number, number], color: "#9b59b6", scale: [0.7, 0.7, 0.7] },
];


    type PresentationControlsConfig = {
        mass: number;
        tension: number;
    };

    return (
        <>
            <Environment preset={resolvedTheme === "dark" ? "night" : "sunset"} />
            <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
            >
               {projects.map((project, index) => (
  <PresentationControls key={index} global rotation={[0.13, 0.1, 0]}> // Add a unique key prop here
    <Project key={index} name={project.name} position={project.position} rotation={[0, Math.PI / 4, 0]} scale={project.scale} color={project.color} onClick={() => setSelectedProject(project.name)} />
  </PresentationControls>
))}
            </PresentationControls>
        </>
    )
}

export default function ProjectsShowcase() {
    const sectionRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

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
        <section ref={sectionRef} className="min-h-screen py-20 relative dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">Featured Projects</h2>

                <div className="relative h-[600px] w-full">
                    <Canvas>
                        <Scene setSelectedProject={setSelectedProject} />
                    </Canvas>

                    {selectedProject && (
                        <div className="absolute bottom-10 left-0 right-0 bg-white dark:bg-gray-800 p-6 mx-auto max-w-md rounded-lg shadow-lg transition-all duration-300 transform translate-y-0">
                            <h3 className="text-xl font-bold mb-2 dark:text-white">{selectedProject}</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Click on a project to view details. This would showcase your {selectedProject} work with images and
                                descriptions.
                            </p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                onClick={() => setSelectedProject(null)}
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-800"></div>
        </section>
    )
}
