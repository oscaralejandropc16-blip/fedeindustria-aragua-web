"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { CalendarIcon, MapPinIcon, ClockIcon, ArrowRightIcon } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

export default function EventosPage() {
  const [eventos, setEventos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEventos() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .order('fecha', { ascending: false })

      if (!error && data) {
        setEventos(data)
      }
      setLoading(false)
    }
    fetchEventos()
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50">
      
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[0%] left-[20%] w-[50%] h-[50%] rounded-full bg-emerald-50/60 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_30%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-20 pb-24 relative z-10 space-y-16">
        
        {/* Cabecera */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-bold text-emerald-700 shadow-sm">
            <CalendarIcon className="w-4 h-4" />
            Agenda Oficial
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-[#002b7f]">
            Próximos Eventos
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Capacitación, networking y ruedas de negocios. No te pierdas las actividades de nuestra cúpula empresarial.
          </p>
        </motion.div>

        {/* Lista de Eventos */}
        {loading ? (
          <div className="grid gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-3xl bg-white border border-slate-100 shadow-sm animate-pulse" />
            ))}
          </div>
        ) : eventos.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 border border-slate-200 rounded-3xl bg-white shadow-sm"
          >
            <div className="rounded-full bg-slate-50 p-6 mb-4 border border-slate-100">
              <CalendarIcon className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#002b7f]">No hay eventos programados</h3>
            <p className="text-slate-500 mt-2 font-medium">Mantente atento a nuestras próximas actualizaciones.</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-8"
          >
            {eventos.map((evento) => (
              <motion.div 
                key={evento.id} 
                variants={itemVariants}
                className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#002b7f]/20 transition-all duration-500 flex flex-col md:flex-row"
              >
                {/* Banda de color */}
                <div className="absolute top-0 left-0 w-full h-1.5 md:w-1.5 md:h-full bg-gradient-to-b from-[#002b7f] to-emerald-500" />
                
                {/* Imagen del Evento (Si existe) */}
                {evento.imagen_url && (
                  <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#002b7f]/10 group-hover:bg-transparent transition-colors z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={evento.imagen_url} 
                      alt={evento.titulo} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </div>
                )}
                
                {/* Contenido del Evento */}
                <div className="p-8 md:p-10 flex flex-col justify-center flex-1">
                  <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-[#002b7f] mb-4">
                    <span className="flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full text-[#002b7f] border border-blue-100">
                      <ClockIcon className="w-4 h-4" />
                      {new Date(evento.fecha).toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      {evento.fecha_fin && (
                        <>
                          <span className="text-slate-400 mx-1">al</span>
                          {new Date(evento.fecha_fin).toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </>
                      )}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4 group-hover:text-[#002b7f] transition-colors">
                    {evento.titulo}
                  </h3>
                  
                  <p className="text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3">
                    {evento.descripcion}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                      <MapPinIcon className="w-4 h-4 text-emerald-500" />
                      {evento.ubicacion || 'Sede Fedeindustria'}
                    </div>
                    
                    {evento.link_detalles ? (
                      <a href={evento.link_detalles} target="_blank" rel="noopener noreferrer" className="text-[#002b7f] font-bold flex items-center gap-2 group/btn">
                        Ver Detalles 
                        <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <button className="text-[#002b7f] font-bold flex items-center gap-2 group/btn">
                        Ver Detalles 
                        <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  )
}
