import type React from "react"
import { Palette, Layers, Monitor, Printer, Briefcase, Share2 } from "lucide-react"

export interface Skill {
  name: string
  level: number // 0-100, used for styling but not displayed
}

export interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: Skill[]
}

export const skillsData: SkillCategory[] = [
  {
    title: "Design Software",
    icon: <Palette className="h-5 w-5 text-emerald-500" />,
    skills: [
      { name: "Adobe Photoshop", level: 90 },
      { name: "Adobe Illustrator", level: 85 },
      { name: "Adobe InDesign", level: 80 },
      { name: "Figma", level: 95 },
      { name: "Adobe XD", level: 85 },
      { name: "After Effects", level: 75 },
      { name: "Canva", level: 90 },
    ],
  },
  {
    title: "Design & Visual Skills",
    icon: <Layers className="h-5 w-5 text-green-500" />,
    skills: [
      { name: "Typography", level: 92 },
      { name: "Color Theory", level: 88 },
      { name: "Layout & Composition", level: 90 },
      { name: "Branding", level: 85 },
      { name: "Iconography", level: 80 },
      { name: "Illustration", level: 75 },
      { name: "Image Retouching", level: 85 },
    ],
  },
  {
    title: "UI/UX Knowledge",
    icon: <Monitor className="h-5 w-5 text-emerald-600" />,
    skills: [
      { name: "Wireframing", level: 95 },
      { name: "Prototyping", level: 90 },
      { name: "Responsive Design", level: 88 },
      { name: "Design Systems", level: 85 },
      { name: "Accessibility", level: 80 },
      { name: "HTML/CSS", level: 75 },
    ],
  },
  {
    title: "Print Design",
    icon: <Printer className="h-5 w-5 text-green-600" />,
    skills: [
      { name: "Prepress Production", level: 85 },
      { name: "CMYK Color Format", level: 90 },
      { name: "DPI & Resolution", level: 92 },
      { name: "Packaging Design", level: 80 },
    ],
  },
  {
    title: "Project Tools",
    icon: <Briefcase className="h-5 w-5 text-emerald-500" />,
    skills: [
      { name: "Asana", level: 85 },
      { name: "Trello", level: 90 },
      { name: "Jira", level: 75 },
      { name: "Notion", level: 88 },
      { name: "Google Drive", level: 95 },
    ],
  },
  {
    title: "Digital Marketing Design",
    icon: <Share2 className="h-5 w-5 text-green-500" />,
    skills: [
      { name: "Social Media Graphics", level: 92 },
      { name: "Email Templates", level: 85 },
      { name: "Web Banners", level: 88 },
      { name: "Ad Creatives", level: 90 },
    ],
  },
]
