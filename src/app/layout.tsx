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
    images: [
      {
        url: '/ashishsubedi2.jpg',
        width: 800,
        height: 600,
        alt: 'Ashish Subedi',
      },
    ],
    type: 'website',
  },
  icons: {
    icon: '/ashishsubedi2.jpg',
    // Add the favicon for the UK region
    apple: '/ashishsubedi2.jpg',
  
  },
   metadataBase: 'http://ashish-subedi.com.np',
   
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/ashishsubedi2.jpg" />
      </head>
      <body>{children}</body>
    </html>
  )
}