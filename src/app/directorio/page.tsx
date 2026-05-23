"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { SearchIcon, BuildingIcon, SparklesIcon, XIcon, MapPinIcon, PhoneIcon, HashIcon, BriefcaseIcon } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

type Empresa = {
  id: number
  nombre: string
  rif: string
  rubro: string | null
  logo_url: string | null
  telefono: string | null
  direccion: string | null
  estatus_membresia: string
  instagram: string | null
  tiktok: string | null
  web: string | null
}

export default function DirectorioPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null)

  useEffect(() => {
    async function fetchEmpresas() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('empresas_afiliadas')
        .select('*')
        .order('orden', { ascending: true })
        .order('nombre')

      if (!error && data) {
        setEmpresas(data)
      } else {
        console.error("Error fetching empresas:", error)
      }
      setLoading(false)
    }

    fetchEmpresas()
  }, [])

  const filteredEmpresas = empresas.filter((empresa) => {
    const query = searchQuery.toLowerCase()
    return (
      empresa.nombre.toLowerCase().includes(query) ||
      (empresa.rubro && empresa.rubro.toLowerCase().includes(query))
    )
  })

  // Funciones auxiliares para dinámica de color (Dark Theme)
  const getHoverStyles = (estatus: string) => {
    // Usamos un hover unificado azul corporativo sin importar el estatus, para que se vea más limpio
    return 'hover:border-blue-500/40 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)]'
  }

  const getBadgeVariant = (estatus: string) => {
    const state = estatus.toLowerCase()
    if (state === 'activa') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    if (state === 'pendiente') return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
  }

  // Variantes de Framer Motion
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020817]">
      
      {/* Background Mesh Gradient & Grid (Dark Theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 relative z-10 space-y-12">
        
        {/* Cabecera y Buscador */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-sm font-bold text-blue-300 shadow-sm">
            <SparklesIcon className="w-4 h-4 text-emerald-400" />
            Red de Afiliados Premium
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-white drop-shadow-xl">
            Directorio <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Empresarial</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
            Encuentra y conecta con los líderes de la industria en Aragua. Un ecosistema diseñado para la sinergia comercial.
          </p>
          
          <div className="w-full max-w-2xl relative mt-8 group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <Input 
              type="search" 
              placeholder="Buscar por nombre o rubro industrial..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-14 bg-slate-900/50 backdrop-blur-xl border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl text-lg font-medium shadow-xl transition-all"
            />
          </div>
        </motion.div>

        {/* Grilla de Resultados Animada */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-72 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm animate-pulse" />
            ))}
          </div>
        ) : filteredEmpresas.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center border border-white/10 rounded-3xl bg-slate-900/50 backdrop-blur-md shadow-sm mt-8"
          >
            <div className="rounded-full bg-white/5 p-6 mb-6 border border-white/5">
              <SearchIcon className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">No hay coincidencias</h3>
            <p className="mt-3 text-slate-400 max-w-sm text-lg font-medium">
              Prueba con otro rubro o nombre comercial. Nuestro ecosistema siempre está creciendo.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8"
          >
            <AnimatePresence>
              {filteredEmpresas.map((empresa) => (
                <motion.div 
                  variants={itemVariants}
                  key={empresa.id}
                  layout
                >
                  <div 
                    onClick={() => setSelectedEmpresa(empresa)}
                    className={`group flex flex-col h-full overflow-hidden rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-white/5 transition-all duration-500 hover:-translate-y-2 cursor-pointer ${getHoverStyles(empresa.estatus_membresia)}`}
                  >
                    
                    {/* Área Superior: Logo/Imagen */}
                    <div className="h-40 w-full relative flex items-center justify-center bg-white p-6 overflow-hidden border-b border-white/10">
                      {empresa.logo_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img 
                          src={empresa.logo_url} 
                          alt={`Logo de ${empresa.nombre}`} 
                          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-3 opacity-50 group-hover:opacity-80 transition-opacity">
                          <BuildingIcon className="w-10 h-10 text-slate-400" />
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sin Logo</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Contenido Textual */}
                    <div className="flex flex-col flex-grow p-6 pt-5">
                      <div className="flex-grow">
                        <h3 className="text-xl font-extrabold text-white tracking-tight line-clamp-2 leading-snug group-hover:text-blue-300 transition-colors">
                          {empresa.nombre}
                        </h3>
                        <p className="text-slate-400 mt-2 font-medium text-sm line-clamp-1">
                          {empresa.rubro || 'Rubro Industrial'}
                        </p>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <Badge 
                          variant="outline"
                          className={`font-bold px-3 py-1 ${getBadgeVariant(empresa.estatus_membresia)}`}
                        >
                          {empresa.estatus_membresia}
                        </Badge>
                        
                        {/* Indicador interactivo */}
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 border border-blue-500/20">
                          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modal de Detalles de la Empresa */}
      <AnimatePresence>
        {selectedEmpresa && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEmpresa(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#0a0f1c] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Botón Cerrar */}
              <button 
                onClick={() => setSelectedEmpresa(null)} 
                className="absolute top-4 right-4 p-2 bg-slate-800/80 backdrop-blur-md hover:bg-slate-700 border border-white/5 rounded-full text-slate-300 transition-colors z-20 shadow-sm"
              >
                <XIcon className="w-5 h-5" />
              </button>

              {/* Cabecera del Modal con Logo */}
              <div className="h-48 w-full relative flex items-center justify-center bg-white p-8 border-b border-white/10">
                {selectedEmpresa.logo_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={selectedEmpresa.logo_url} 
                    alt={`Logo de ${selectedEmpresa.nombre}`} 
                    className="object-contain h-full w-full drop-shadow-lg"
                  />
                ) : (
                  <BuildingIcon className="w-20 h-20 text-slate-600 opacity-50" />
                )}
                <div className="absolute bottom-4 left-4">
                   <Badge variant="outline" className={`font-bold px-3 py-1 ${getBadgeVariant(selectedEmpresa.estatus_membresia)} shadow-lg`}>
                     {selectedEmpresa.estatus_membresia}
                   </Badge>
                </div>
              </div>

              {/* Cuerpo del Modal */}
              <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-white tracking-tight leading-snug">{selectedEmpresa.nombre}</h2>
                  <p className="text-blue-400 font-bold mt-1">{selectedEmpresa.rubro || 'Rubro No Especificado'}</p>
                </div>
                
                <div className="space-y-4">
                  {/* Detalles con iconos minimalistas */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <HashIcon className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">RIF Comercial</p>
                      <p className="text-white font-medium mt-0.5">{selectedEmpresa.rif}</p>
                    </div>
                  </div>
                  
                  {selectedEmpresa.direccion && (
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <MapPinIcon className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ubicación Físca</p>
                        <p className="text-white font-medium mt-0.5 leading-relaxed">{selectedEmpresa.direccion}</p>
                      </div>
                    </div>
                  )}

                  {selectedEmpresa.telefono && (
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <PhoneIcon className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contacto Telefónico</p>
                        <a href={`tel:${selectedEmpresa.telefono}`} className="text-blue-400 font-bold hover:text-blue-300 transition-colors mt-0.5 block">
                          {selectedEmpresa.telefono}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Enlaces y Redes */}
                  <div className="pt-4 mt-2 border-t border-white/10 flex flex-wrap gap-3">
                    {selectedEmpresa.web && (
                      <a href={selectedEmpresa.web} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/25">
                        <BriefcaseIcon className="w-4 h-4" /> Sitio Web
                      </a>
                    )}
                    {selectedEmpresa.instagram && (
                      <a href={`https://instagram.com/${selectedEmpresa.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-colors">
                        <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> Instagram
                      </a>
                    )}
                    {selectedEmpresa.tiktok && (
                      <a href={`https://tiktok.com/${selectedEmpresa.tiktok.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-colors">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.51.62-5.18 2.6-6.66 1.1-.81 2.45-1.19 3.81-1.2v4.06c-.85.04-1.74.22-2.39.81-.95.84-1.28 2.29-.86 3.48.45 1.35 1.88 2.31 3.29 2.19 1.45-.11 2.58-1.43 2.52-2.88V.02z"/></svg> TikTok
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
