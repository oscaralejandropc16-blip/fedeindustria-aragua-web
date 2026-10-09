"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { createClient } from "@/utils/supabase/client"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoUrl, setLogoUrl] = useState("/logo.png")
  const pathname = usePathname()

  useEffect(() => {
    const fetchLogo = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('configuracion_home').select('logo_url').eq('id', 1).single()
      if (data && data.logo_url) {
        setLogoUrl(data.logo_url)
      }
    }
    fetchLogo()
  }, [])

  // Evitar mostrar el navbar en las rutas de admin o panel privado para que no estorbe el dashboard
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/panel-privado')) {
    return null
  }

  return (
    <div className="relative mt-6 z-50 flex justify-center px-4 pointer-events-none mb-6">
      <header className="w-full max-w-7xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl min-h-[6rem] px-4 md:px-8 py-4 flex flex-col justify-center pointer-events-auto transition-all">
        
        <div className="flex items-center justify-between w-full h-full">
          {/* Logo Oficial Extra Grande con Detalle Festivo de Halloween */}
          <Link href="/" className="flex items-center group relative" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative inline-block">
              {/* Sombrerito de Bruja Estilizado Vectorial */}
              <motion.div
                initial={{ rotate: -16, y: 0 }}
                animate={{ rotate: [-16, -11, -16], y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -top-3.5 sm:-top-4 -left-1 sm:-left-2 w-7 sm:w-9 h-7 sm:h-9 z-20 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-110"
                title="¡Edición Especial Halloween!"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Base / Ala del sombrero */}
                  <ellipse cx="50" cy="80" rx="42" ry="12" fill="#1e1b4b" stroke="#0f172a" strokeWidth="1.5" />
                  {/* Copa cónica */}
                  <path d="M 22 78 C 36 54, 46 34, 62 14 C 55 35, 65 55, 78 78 Z" fill="#312e81" />
                  <path d="M 22 78 C 30 72, 70 72, 78 78 C 65 55, 55 35, 62 14 C 45 35, 35 55, 22 78 Z" fill="#1e1b4b" />
                  {/* Cinta Naranja vibrante */}
                  <path d="M 27 75 Q 50 71 73 75 Q 71 68 49 66 Q 29 68 27 75 Z" fill="#ea580c" />
                  {/* Hebilla Dorada */}
                  <rect x="46" y="66" width="9" height="7" rx="1.5" fill="#facc15" stroke="#b45309" strokeWidth="1" />
                  {/* Brillo mágico en la punta */}
                  <circle cx="62" cy="15" r="2.5" fill="#fef08a" />
                </svg>
              </motion.div>

              <img 
                src={logoUrl} 
                alt="Fedeindustria Aragua" 
                className="w-40 md:w-64 h-auto object-contain mix-blend-multiply transition-transform duration-500 max-h-24" 
              />
            </div>
            {/* Fallback Textual por si falla la imagen */}
            <div className="hidden flex-col justify-center">
              <span className="text-xs font-black text-[#002b7f] tracking-[0.2em] uppercase leading-none">Somos</span>
              <span className="font-black text-2xl tracking-tighter text-[#002b7f] leading-none mt-1">
                FedeIndustria <span className="font-light italic">Aragua</span>
              </span>
            </div>
          </Link>

          {/* Enlaces de Navegación Centrados (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[15px] font-bold text-slate-600 hover:text-[#002b7f] transition-colors relative group">
              Inicio
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#002b7f] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/nosotros" className="text-[15px] font-bold text-slate-600 hover:text-[#002b7f] transition-colors relative group">
              Nosotros
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#002b7f] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/directorio" className="text-[15px] font-bold text-slate-600 hover:text-[#002b7f] transition-colors relative group">
              Directorio
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#002b7f] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/eventos" className="text-[15px] font-bold text-slate-600 hover:text-[#002b7f] transition-colors relative group">
              Eventos
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#002b7f] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/noticias" className="text-[15px] font-bold text-slate-600 hover:text-[#002b7f] transition-colors relative group">
              Noticias
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#002b7f] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Call to Action (CTA) (Desktop) */}
          <div className="hidden md:block">
            <Link href="/contacto" className="text-[15px] font-bold bg-[#002b7f] text-white px-8 py-3.5 rounded-full hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2 group">
              <span>Afiliar mi Empresa</span>
              <span className="text-sm group-hover:scale-125 transition-transform duration-300">🎃</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-[#002b7f] bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pt-6 pb-4 flex flex-col gap-4 border-t border-slate-100 mt-4 animate-in slide-in-from-top-4 fade-in duration-200">
            <Link 
              href="/" 
              className="text-lg font-bold text-slate-700 hover:text-[#002b7f] active:text-[#002b7f] px-4 py-3 rounded-xl hover:bg-slate-50 active:bg-blue-50 active:scale-95 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/nosotros" 
              className="text-lg font-bold text-slate-700 hover:text-[#002b7f] active:text-[#002b7f] px-4 py-3 rounded-xl hover:bg-slate-50 active:bg-blue-50 active:scale-95 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link 
              href="/directorio" 
              className="text-lg font-bold text-slate-700 hover:text-[#002b7f] active:text-[#002b7f] px-4 py-3 rounded-xl hover:bg-slate-50 active:bg-blue-50 active:scale-95 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Directorio
            </Link>
            <Link 
              href="/eventos" 
              className="text-lg font-bold text-slate-700 hover:text-[#002b7f] active:text-[#002b7f] px-4 py-3 rounded-xl hover:bg-slate-50 active:bg-blue-50 active:scale-95 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link 
              href="/noticias" 
              className="text-lg font-bold text-slate-700 hover:text-[#002b7f] active:text-[#002b7f] px-4 py-3 rounded-xl hover:bg-slate-50 active:bg-blue-50 active:scale-95 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Noticias
            </Link>
            <div className="pt-4 mt-2 border-t border-slate-100">
              <Link 
                href="/contacto" 
                className="block text-center text-[15px] font-bold bg-[#002b7f] text-white px-8 py-3.5 rounded-xl hover:bg-blue-900 transition-all shadow-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Afiliar mi Empresa
              </Link>
            </div>
          </nav>
        )}
      </header>
    </div>
  )
}
