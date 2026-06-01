"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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

  // Evitar mostrar el navbar en las rutas de admin para que no estorbe el dashboard
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <div className="relative mt-6 z-50 flex justify-center px-4 pointer-events-none mb-6">
      <header className="w-full max-w-7xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl min-h-[6rem] px-4 md:px-8 py-4 flex flex-col justify-center pointer-events-auto transition-all">
        
        <div className="flex items-center justify-between w-full h-full">
          {/* Logo Oficial Extra Grande */}
          <Link href="/" className="flex items-center group relative" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src={logoUrl} 
              alt="Fedeindustria Aragua" 
              className="w-40 md:w-64 h-auto object-contain mix-blend-multiply transition-transform duration-500 max-h-24" 
            />
            {/* Fallback Textual por si falla la imagen */}
            <div className="hidden flex-col justify-center">
              <span className="text-xs font-black text-[#002b7f] tracking-[0.2em] uppercase leading-none">Somos</span>
              <span className="font-black text-2xl tracking-tighter text-[#002b7f] leading-none mt-1">
                FedeIndustria <span className="font-light italic">Aragua</span>
              </span>
            </div>
          </Link>

          {/* Enlaces de Navegación Centrados (Desktop) */}
          <nav className="hidden md:flex items-center gap-10">
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
          </nav>

          {/* Call to Action (CTA) (Desktop) */}
          <div className="hidden md:block">
            <Link href="/contacto" className="text-[15px] font-bold bg-[#002b7f] text-white px-8 py-3.5 rounded-full hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2">
              Afiliar mi Empresa
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
