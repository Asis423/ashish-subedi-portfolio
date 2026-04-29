import type { Metadata } from 'next'
import { Cormorant_Garamond, Syne } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ashish Subedi —  Graphic Designer',
  description:
    'Multi-disciplinary Graphic Designer from Kathmandu. Specializing in brand identity, visual communication, typography, and design systems.',
  openGraph: {
    title: 'Ashish Subedi —  Graphic Designer',
    description: 'Brand identity · Visual systems · Typography · Packaging',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  )
}