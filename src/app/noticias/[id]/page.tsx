"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { ArrowLeftIcon, NewspaperIcon, CalendarIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NoticiaPage() {
  const params = useParams()
  const { id } = params
  const [noticia, setNoticia] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
              className="w-full h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl mb-16 -mt-32 relative z-20 border-4 border-white bg-slate-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={noticia.imagen_url} alt={noticia.titulo} className="w-full h-full object-cover object-top" />
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg md:prose-xl prose-slate max-w-none"
          >
            <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap text-lg md:text-xl">
              {noticia.resumen}
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
