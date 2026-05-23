"use client"

import { useState, useEffect } from 'react'
import { ArrowUpIcon } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Función para evaluar el scroll
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Hacer scroll hacia arriba suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        aria-label="Volver arriba"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#002b7f]/90 text-white shadow-[0_8px_30px_rgb(0,43,127,0.3)] backdrop-blur-md transition-all hover:scale-110 hover:bg-[#002b7f]"
      >
        <ArrowUpIcon className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" />
        {/* Glow effect on hover */}
        <div className="absolute inset-0 -z-10 rounded-full bg-[#002b7f] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60"></div>
      </button>
    </div>
  )
}
