"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { ArrowLeftIcon, NewspaperIcon, CalendarIcon, ChevronRightIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TodasLasNoticiasPage() {
  const [noticias, setNoticias] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNoticias() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .order('orden', { ascending: true })
        .order('fecha_publicacion', { ascending: false })
      
      if (data && !error) {
        setNoticias(data)
      }
      setLoading(false)
    }
    fetchNoticias()
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#002b7f] font-bold mb-8 transition-colors">
            <ArrowLeftIcon className="w-4 h-4" /> Volver al Inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-4">
            <NewspaperIcon className="w-10 h-10 text-[#002b7f]" /> Sala de Prensa
          </h1>
          <p className="mt-4 text-xl text-slate-500 font-medium">Mantente al día con nuestros anuncios institucionales y de aliados.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-[450px] bg-white border border-slate-100 rounded-3xl animate-pulse" />)}
          </div>
        ) : noticias.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center border-2 border-slate-200 border-dashed rounded-3xl bg-white text-center p-6">
             <NewspaperIcon className="w-12 h-12 text-slate-300 mb-4" />
             <p className="text-slate-500 font-medium">Aún no hay noticias publicadas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.map((noticia, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={noticia.id} 
                className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#002b7f]/20 transition-all duration-300 flex flex-col"
              >
                {/* Foto Noticia */}
                <div className="h-56 relative bg-slate-100 overflow-hidden">
                  {noticia.imagen_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={noticia.imagen_url} alt={noticia.titulo} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <NewspaperIcon className="w-12 h-12 text-slate-300" />
                    </div>
                  )}
                  {noticia.galeria_urls && noticia.galeria_urls.length > 0 && (
                     <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                       +{noticia.galeria_urls.length} Fotos
                     </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Contenido Noticia */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-4">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {new Date(noticia.fecha_publicacion).toLocaleDateString('es-VE', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-[#002b7f] transition-colors line-clamp-2">
                    {noticia.titulo}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {noticia.resumen}
                  </p>
                  
                  <Link href={`/noticias/${noticia.id}`} className="mt-auto inline-flex items-center gap-2 text-[#002b7f] font-bold hover:text-blue-900 transition-colors text-sm">
                    Leer artículo completo <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
