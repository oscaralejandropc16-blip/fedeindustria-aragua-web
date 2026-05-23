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

  // Funciones auxiliares para dinámica de color (Light Theme)
  const getHoverStyles = (estatus: string) => {
    const state = estatus.toLowerCase()
    if (state === 'activa') return 'hover:border-emerald-300 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)]'
    if (state === 'pendiente') return 'hover:border-amber-300 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)]'
    return 'hover:border-slate-300 hover:shadow-[0_20px_40px_-15px_rgba(100,116,139,0.3)]'
  }

  const getBadgeVariant = (estatus: string) => {
    const state = estatus.toLowerCase()
    if (state === 'activa') return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    if (state === 'pendiente') return 'bg-amber-100 text-amber-700 border-amber-200'
    return 'bg-slate-100 text-slate-700 border-slate-200'
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
    <main className="min-h-screen relative overflow-hidden bg-slate-50">
      
      {/* Background Mesh Gradient & Grid (Light Theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/60 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-50/60 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 space-y-12">
        
        {/* Cabecera y Buscador */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#002b7f]/10 bg-white px-4 py-1.5 text-sm font-bold text-[#002b7f] shadow-sm">
            <SparklesIcon className="w-4 h-4 text-emerald-500" />
            Red de Afiliados Premium
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-[#002b7f]">
            Directorio Empresarial
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
            Encuentra y conecta con los líderes de la industria en Aragua. Un ecosistema diseñado para la sinergia comercial.
          </p>
          
          <div className="w-full max-w-2xl relative mt-8 group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-slate-400 group-focus-within:text-[#002b7f] transition-colors" />
            </div>
            <Input 
              type="search" 
              placeholder="Buscar por nombre o rubro industrial..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-14 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#002b7f] rounded-2xl text-lg font-medium shadow-sm transition-all"
            />
          </div>
        </motion.div>

        {/* Grilla de Resultados Animada */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-72 rounded-3xl bg-white border border-slate-100 shadow-sm animate-pulse" />
            ))}
          </div>
        ) : filteredEmpresas.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center border border-slate-200 rounded-3xl bg-white shadow-sm mt-8"
          >
            <div className="rounded-full bg-slate-50 p-6 mb-6 border border-slate-100">
              <SearchIcon className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#002b7f] tracking-tight">No hay coincidencias</h3>
            <p className="mt-3 text-slate-500 max-w-sm text-lg font-medium">
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
                    className={`group flex flex-col h-full overflow-hidden rounded-3xl bg-white border border-slate-200 transition-all duration-500 hover:-translate-y-2 cursor-pointer ${getHoverStyles(empresa.estatus_membresia)}`}
                  >
                    
                    {/* Área Superior: Logo/Imagen */}
                    <div className="h-40 w-full relative flex items-center justify-center bg-slate-50/50 p-6 overflow-hidden border-b border-slate-100">
                      {empresa.logo_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img 
                          src={empresa.logo_url} 
                          alt={`Logo de ${empresa.nombre}`} 
                          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-3 opacity-40 group-hover:opacity-80 transition-opacity">
                          <BuildingIcon className="w-10 h-10 text-[#002b7f]" />
                          <span className="text-xs font-bold text-[#002b7f] uppercase tracking-widest">Sin Logo</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Contenido Textual */}
                    <div className="flex flex-col flex-grow p-6 pt-5">
                      <div className="flex-grow">
                        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight line-clamp-2 leading-snug group-hover:text-[#002b7f] transition-colors">
                          {empresa.nombre}
                        </h3>
                        <p className="text-slate-500 mt-2 font-medium text-sm line-clamp-1">
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
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                          <svg className="w-4 h-4 text-[#002b7f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Botón Cerrar */}
              <button 
                onClick={() => setSelectedEmpresa(null)} 
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md hover:bg-slate-100 rounded-full text-slate-600 transition-colors z-20 shadow-sm"
              >
                <XIcon className="w-5 h-5" />
              </button>

              {/* Cabecera del Modal con Logo */}
              <div className="h-48 w-full relative flex items-center justify-center bg-slate-50 p-8 border-b border-slate-100">
                {selectedEmpresa.logo_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={selectedEmpresa.logo_url} alt="Logo" className="w-full h-full object-contain drop-shadow-sm" />
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <BuildingIcon className="w-16 h-16 text-[#002b7f] opacity-50" />
                  </div>
                )}
              </div>

              {/* Contenido del Modal */}
              <div className="p-8 overflow-y-auto">
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#002b7f] tracking-tight leading-snug">
                      {selectedEmpresa.nombre}
                    </h2>
                    <Badge className={`mt-3 font-bold px-3 py-1 ${getBadgeVariant(selectedEmpresa.estatus_membresia)}`}>
                      {selectedEmpresa.estatus_membresia}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-2.5 rounded-xl text-[#002b7f]"><BriefcaseIcon className="w-5 h-5" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rubro Sectorial</p>
                      <p className="font-medium text-slate-700 mt-0.5">{selectedEmpresa.rubro || 'No especificado'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-2.5 rounded-xl text-[#002b7f]"><HashIcon className="w-5 h-5" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">RIF</p>
                      <p className="font-medium text-slate-700 mt-0.5">{selectedEmpresa.rif}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-2.5 rounded-xl text-[#002b7f]"><PhoneIcon className="w-5 h-5" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Teléfono de Contacto</p>
                      <p className="font-medium text-slate-700 mt-0.5">{selectedEmpresa.telefono || 'No disponible'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-2.5 rounded-xl text-[#002b7f]"><MapPinIcon className="w-5 h-5" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dirección Física</p>
                      <p className="font-medium text-slate-700 mt-0.5 leading-relaxed">{selectedEmpresa.direccion || 'No disponible'}</p>
                    </div>
                  </div>

                  {selectedEmpresa.instagram && (
                    <div className="flex items-start gap-4">
                      <div className="bg-pink-50 p-2.5 rounded-xl text-pink-600">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Instagram</p>
                        <a 
                          href={`https://instagram.com/${selectedEmpresa.instagram.replace('@', '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-bold text-pink-600 hover:text-pink-700 mt-0.5 leading-relaxed block hover:underline"
                        >
                          {selectedEmpresa.instagram.startsWith('@') ? selectedEmpresa.instagram : `@${selectedEmpresa.instagram}`}
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedEmpresa.tiktok && (
                    <div className="flex items-start gap-4">
                      <div className="bg-slate-100 p-2.5 rounded-xl text-slate-900">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">TikTok</p>
                        <a 
                          href={`https://tiktok.com/${selectedEmpresa.tiktok.replace('@', '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-bold text-slate-800 hover:text-slate-900 mt-0.5 leading-relaxed block hover:underline"
                        >
                          {selectedEmpresa.tiktok.startsWith('@') ? selectedEmpresa.tiktok : `@${selectedEmpresa.tiktok}`}
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedEmpresa.web && (
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Página Web</p>
                        <a 
                          href={selectedEmpresa.web.startsWith('http') ? selectedEmpresa.web : `https://${selectedEmpresa.web}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-bold text-blue-600 hover:text-blue-700 mt-0.5 leading-relaxed block hover:underline"
                        >
                          {selectedEmpresa.web.replace(/(^\w+:|^)\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
