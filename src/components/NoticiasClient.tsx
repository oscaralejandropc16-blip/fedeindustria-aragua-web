"use client"

import { useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeftIcon, 
  NewspaperIcon, 
  CalendarIcon, 
  ChevronRightIcon, 
  ChevronLeftIcon,
  SearchIcon,
  XIcon
} from 'lucide-react'
import { motion } from 'framer-motion'

export type Noticia = {
  id: number
  titulo: string
  resumen: string
  fecha_publicacion: string
  imagen_url: string | null
  galeria_urls: string[] | null
  orden?: number
}

interface NoticiasClientProps {
  noticias: Noticia[]
}

const ITEMS_PER_PAGE = 9

export default function NoticiasClient({ noticias = [] }: NoticiasClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  const normalizeText = (text: string | null | undefined) => {
    if (!text) return ''
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  // Filtrado reactivo de noticias
  const filteredNoticias = useMemo(() => {
    if (!searchQuery.trim()) return noticias
    const query = normalizeText(searchQuery)
    return noticias.filter(n => 
      normalizeText(n.titulo).includes(query) || 
      normalizeText(n.resumen).includes(query)
    )
  }, [noticias, searchQuery])

  // Paginación
  const totalPages = Math.ceil(filteredNoticias.length / ITEMS_PER_PAGE) || 1
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredNoticias.length)
  const paginatedNoticias = filteredNoticias.slice(startIndex, endIndex)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page)
      // Desplazamiento suave al inicio de la lista de noticias
      if (gridRef.current) {
        const yOffset = -120
        const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }

  // Helper para generar números de página con elipsis si hay muchas páginas
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages]
    }

    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return dateStr
      return d.toLocaleDateString('es-VE', { 
        timeZone: 'UTC', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    } catch {
      return dateStr
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-36 md:pt-40 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera y Navegación */}
        <div className="mb-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#002b7f] font-bold mb-6 transition-colors group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#002b7f] text-xs font-bold border border-blue-100">
                  <NewspaperIcon className="w-3.5 h-3.5" /> Fedeindustria Aragua
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                  {noticias.length} {noticias.length === 1 ? 'noticia publicada' : 'noticias publicadas'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                Sala de Prensa
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
                Mantente al día con los comunicados oficiales, notas de prensa y novedades del sector industrial y empresarial de Aragua.
              </p>
            </div>

            {/* Buscador de noticias */}
            <div className="w-full md:w-80 lg:w-96">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Buscar noticias..."
                  className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002b7f]/20 focus:border-[#002b7f] shadow-sm transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ancla para scroll de paginación */}
        <div ref={gridRef} className="scroll-mt-36" />

        {/* Listado de Noticias */}
        {noticias.length === 0 ? (
          <div className="h-72 flex flex-col items-center justify-center border-2 border-slate-200 border-dashed rounded-3xl bg-white text-center p-8">
            <NewspaperIcon className="w-12 h-12 text-slate-300 mb-4" />
            <h2 className="text-lg font-bold text-slate-800 mb-1">Aún no hay noticias publicadas</h2>
            <p className="text-slate-500 text-sm">Próximamente estaremos compartiendo las últimas novedades.</p>
          </div>
        ) : filteredNoticias.length === 0 ? (
          <div className="h-72 flex flex-col items-center justify-center border-2 border-slate-200 border-dashed rounded-3xl bg-white text-center p-8">
            <SearchIcon className="w-12 h-12 text-slate-300 mb-4" />
            <h2 className="text-lg font-bold text-slate-800 mb-1">No se encontraron resultados</h2>
            <p className="text-slate-500 text-sm max-w-md mb-6">
              No hay publicaciones que coincidan con &ldquo;{searchQuery}&rdquo;. Intenta con otros términos.
            </p>
            <button
              onClick={clearSearch}
              className="px-5 py-2.5 rounded-xl bg-[#002b7f] text-white font-bold text-sm hover:bg-blue-900 transition-colors shadow-sm"
            >
              Ver todas las noticias
            </button>
          </div>
        ) : (
          <div>
            {/* Grid de Noticias */}
            <motion.div 
              key={`grid-${currentPage}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {paginatedNoticias.map((noticia, index) => (
                <motion.div
                  key={noticia.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#002b7f]/20 transition-all duration-300 flex flex-col"
                >
                  {/* Foto Noticia */}
                  <div className="h-56 relative bg-slate-100 overflow-hidden">
                    {noticia.imagen_url ? (
                      <Image
                        src={noticia.imagen_url}
                        alt={noticia.titulo}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <NewspaperIcon className="w-12 h-12 text-slate-300" />
                      </div>
                    )}

                    {noticia.galeria_urls && noticia.galeria_urls.length > 0 && (
                      <div className="absolute top-4 right-4 bg-slate-900/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/10">
                        +{noticia.galeria_urls.length} Fotos
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Contenido Noticia */}
                  <div className="p-7 sm:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-3">
                      <CalendarIcon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{formatDate(noticia.fecha_publicacion)}</span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-[#002b7f] transition-colors line-clamp-2">
                      {noticia.titulo}
                    </h2>

                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1 font-normal">
                      {noticia.resumen}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-50">
                      <Link
                        href={`/noticias/${noticia.id}`}
                        className="inline-flex items-center gap-2 text-[#002b7f] font-bold hover:text-blue-900 transition-colors text-sm group/btn"
                      >
                        Leer artículo completo
                        <ChevronRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Barra de Paginación */}
            {totalPages > 1 && (
              <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-500 font-medium">
                  Mostrando <span className="font-bold text-slate-900">{startIndex + 1}</span> a{' '}
                  <span className="font-bold text-slate-900">{endIndex}</span> de{' '}
                  <span className="font-bold text-slate-900">{filteredNoticias.length}</span>{' '}
                  {filteredNoticias.length === 1 ? 'noticia' : 'noticias'}
                  {searchQuery && (
                    <span className="text-slate-400"> (filtradas de {noticias.length})</span>
                  )}
                </p>

                <div className="flex items-center gap-2">
                  {/* Botón Anterior */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:text-[#002b7f] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 transition-all shadow-sm"
                  >
                    <ChevronLeftIcon className="w-4 h-4" /> Anterior
                  </button>

                  {/* Números de Página */}
                  <div className="flex items-center gap-1.5 py-1">
                    {getPageNumbers().map((pageNum, idx) => {
                      if (pageNum === '...') {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-slate-400 font-bold text-sm"
                          >
                            ...
                          </span>
                        )
                      }

                      const num = pageNum as number
                      const isActive = currentPage === num

                      return (
                        <button
                          key={num}
                          onClick={() => goToPage(num)}
                          aria-current={isActive ? 'page' : undefined}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${
                            isActive
                              ? 'bg-[#002b7f] text-white shadow-md shadow-[#002b7f]/25 scale-105'
                              : 'bg-white text-slate-600 hover:text-[#002b7f] hover:bg-blue-50/60 border border-slate-200 shadow-sm'
                          }`}
                        >
                          {num}
                        </button>
                      )
                    })}
                  </div>

                  {/* Botón Siguiente */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:text-[#002b7f] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 transition-all shadow-sm"
                  >
                    Siguiente <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
