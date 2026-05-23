"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { ArrowLeftIcon, NewspaperIcon, CalendarIcon, ImageIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NoticiaPage() {
  const params = useParams()
  const { id } = params
  const [noticia, setNoticia] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  // Cerrar lightbox con la tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImageIndex(null)
      if (e.key === 'ArrowLeft' && selectedImageIndex !== null && selectedImageIndex > 0) setSelectedImageIndex(prev => prev! - 1)
      if (e.key === 'ArrowRight' && selectedImageIndex !== null && noticia?.galeria_urls && selectedImageIndex < noticia.galeria_urls.length - 1) setSelectedImageIndex(prev => prev! + 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex, noticia])

  useEffect(() => {
    async function fetchNoticia() {
      if (!id) return
      const supabase = createClient()
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('id', id)
        .single()
      
      if (data && !error) {
        setNoticia(data)
      }
      setLoading(false)
    }
    fetchNoticia()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 pt-40 pb-24 px-6 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#002b7f] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 font-medium">Cargando artículo...</p>
        </div>
      </main>
    )
  }

  if (!noticia) {
    return (
      <main className="min-h-screen bg-slate-50 pt-40 pb-24 px-6 flex items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center max-w-md">
          <NewspaperIcon className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Noticia no encontrada</h2>
          <p className="text-slate-500 mb-8">El artículo que intentas leer ya no está disponible o el enlace es incorrecto.</p>
          <Link href="/" className="bg-[#002b7f] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors inline-flex items-center gap-2">
            <ArrowLeftIcon className="w-5 h-5" /> Volver al Inicio
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Lightbox Overlay a Pantalla Completa */}
      {selectedImageIndex !== null && noticia.galeria_urls && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center"
        >
          <button 
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-50"
            title="Cerrar (Esc)"
          >
            <XIcon className="w-8 h-8" />
          </button>
          
          {selectedImageIndex > 0 && (
            <button 
              onClick={() => setSelectedImageIndex(prev => prev! - 1)}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50 hidden md:block"
            >
              <ChevronLeftIcon className="w-8 h-8" />
            </button>
          )}

          {selectedImageIndex < noticia.galeria_urls.length - 1 && (
            <button 
              onClick={() => setSelectedImageIndex(prev => prev! + 1)}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50 hidden md:block"
            >
              <ChevronRightIcon className="w-8 h-8" />
            </button>
          )}

          <motion.img 
            key={selectedImageIndex}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
            src={noticia.galeria_urls[selectedImageIndex]} 
            alt="Fullscreen Gallery" 
            className="max-w-[95vw] md:max-w-[85vw] max-h-[85vh] object-contain drop-shadow-2xl select-none"
          />
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-md text-sm">
            {selectedImageIndex + 1} de {noticia.galeria_urls.length}
          </div>
        </motion.div>
      )}

      {/* Header Articulo */}
      <section className="relative pt-40 pb-16 px-6 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] rounded-full bg-blue-100/50 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-emerald-50/50 blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#002b7f] font-bold mb-8 transition-colors">
            <ArrowLeftIcon className="w-4 h-4" /> Volver al Inicio
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-sm mb-4">
              <CalendarIcon className="w-4 h-4" />
              {new Date(noticia.fecha_publicacion).toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
              {noticia.titulo}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contenido Noticia */}
      <section className="py-16 px-6 relative">
        <div className="max-w-4xl mx-auto">
          {noticia.imagen_url && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-16 -mt-32 relative z-20 border-4 border-white bg-slate-900 flex items-center justify-center"
            >
              <div className="absolute inset-0 z-0">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={noticia.imagen_url} className="w-full h-full object-cover blur-2xl opacity-60 scale-110" alt="" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={noticia.imagen_url} alt={noticia.titulo} className="relative z-10 w-full h-full object-contain" />
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-none"
          >
            {/* Resumen como un "Lead Paragraph" destacado */}
            <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap text-xl md:text-2xl mb-12 border-l-4 border-[#002b7f] pl-6 italic">
              {noticia.resumen}
            </p>

            {/* Contenido Completo (Reportaje) */}
            {noticia.contenido_completo && (
              <div className="prose prose-lg md:prose-xl prose-slate max-w-none mb-16 whitespace-pre-wrap text-slate-800 leading-relaxed">
                {noticia.contenido_completo}
              </div>
            )}

            {/* Galería de imágenes adicionales */}
            {noticia.galeria_urls && noticia.galeria_urls.length > 0 && (
              <div className="mt-16 pt-12 border-t border-slate-100">
                <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <ImageIcon className="w-8 h-8 text-[#002b7f]" />
                  Galería Fotográfica
                </h3>
                
                {/* Carrusel Horizontal Moderno */}
                <div className="flex overflow-x-auto gap-6 pb-8 pt-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {noticia.galeria_urls.map((url: string, index: number) => (
                    <div 
                      key={index} 
                      onClick={() => setSelectedImageIndex(index)}
                      className="flex-none w-[85vw] sm:w-[60vw] md:w-[450px] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50 relative group cursor-pointer snap-center shrink-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Galería ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#002b7f]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                         <span className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                           <ImageIcon className="w-4 h-4" /> Ampliar Imagen
                         </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
