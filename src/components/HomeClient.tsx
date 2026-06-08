"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, BuildingIcon, ChevronRightIcon, NewspaperIcon, CalendarIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

export default function HomeClient({ configHome, empresas, eventos, noticias, aliadosLogos }: any) {
  return (
    <div className="w-full bg-slate-50">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video 
            autoPlay loop muted playsInline 
            className="absolute inset-0 w-full h-full object-cover"
            key={configHome.video_url}
          >
            <source src={configHome.video_url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[6px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 shadow-sm text-sm font-bold text-blue-200 mb-8 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Impulsando el motor productivo de Aragua
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] max-w-5xl drop-shadow-2xl"
          >
            {configHome.titulo.split(' ').slice(0, -1).join(' ')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{configHome.titulo.split(' ').slice(-1)}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-xl md:text-2xl text-slate-200 font-medium max-w-3xl leading-relaxed drop-shadow-md whitespace-pre-line"
          >
            {configHome.subtitulo}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-6"
          >
            <Link href="/directorio" className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 group">
              Explorar Ecosistema <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/nosotros" className="h-14 px-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold flex items-center justify-center transition-all">
              Conocer a la Junta
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN MARQUEE: ALIADOS ESTRATÉGICOS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-custom-marquee {
          animation: customMarquee 30s linear infinite;
        }
        .animate-custom-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
      <section className="py-16 bg-white border-y border-slate-100 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div className="text-center mb-10 relative z-20">
          <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase">Respaldados por Aliados de Primera Línea</h3>
        </div>
        
        <div className="flex w-fit">
          <div className="flex items-center gap-12 md:gap-20 px-6 md:px-10 animate-custom-marquee">
            {[...aliadosLogos, ...aliadosLogos, ...aliadosLogos, ...aliadosLogos, ...aliadosLogos, ...aliadosLogos].map((src: string, i: number) => (
              <div key={i} className="h-16 md:h-20 w-[120px] relative flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer flex-shrink-0">
                <Image src={src} alt="Logo Aliado" fill className="object-contain" sizes="120px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTICIAS */}
      <section className="py-24 relative overflow-hidden bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Sala de Prensa</h2>
              <p className="mt-4 text-lg md:text-xl text-slate-500 font-medium">Mantente al día con nuestros anuncios institucionales y de aliados.</p>
            </motion.div>
            <Link href="/noticias" className="hidden text-[#002b7f] font-bold hover:text-blue-900 md:flex items-center gap-1 transition-colors">
              Ver todas las noticias <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {noticias.length === 0 ? (
               <div className="md:col-span-3 h-48 flex items-center justify-center border border-slate-200 border-dashed rounded-3xl text-slate-500 font-medium bg-white">
                 Aún no hay noticias publicadas.
               </div>
            ) : (
              noticias.map((noticia: any, index: number) => (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  key={noticia.id} 
                  className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                >
                  <div className="h-56 relative bg-slate-100 overflow-hidden">
                    {noticia.imagen_url ? (
                      <Image src={noticia.imagen_url} alt={noticia.titulo} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                        <NewspaperIcon className="w-12 h-12 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">
                      {new Date(noticia.fecha_publicacion).toLocaleDateString('es-VE', { timeZone: 'UTC' })}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#002b7f] transition-colors line-clamp-2 leading-snug mb-3">
                      {noticia.titulo}
                    </h3>
                    <p className="text-slate-500 font-medium line-clamp-3 mb-6">
                      {noticia.resumen}
                    </p>
                    <div className="mt-auto pt-6 border-t border-slate-50">
                      <Link href={`/noticias/${noticia.id}`} className="text-[#002b7f] font-bold flex items-center gap-2 group/btn text-sm hover:text-blue-900 transition-colors inline-flex">
                        Leer artículo completo <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* DASHBOARD DINÁMICO */}
      <section className="py-32 bg-[#020817] relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 mb-6 uppercase tracking-widest">
                Ecosistema en Tiempo Real
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                Pulso <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Industrial</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Nuevos Afiliados */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20"><BuildingIcon className="w-5 h-5 text-blue-400" /></div>
                  Nuevas Incorporaciones
                </h3>
                <Link href="/directorio" className="group text-sm text-blue-400 font-bold flex items-center gap-1">
                  Ver directorio <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {empresas.length === 0 ? (
                  <div className="h-48 rounded-3xl border border-dashed border-white/10 flex items-center justify-center text-slate-500 font-medium">Aún no hay empresas.</div>
                ) : empresas.map((empresa: any, index: number) => (
                  <Link href="/directorio" key={empresa.id} className="block outline-none">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      viewport={{ once: true, margin: "-50px" }} 
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative flex items-center gap-6 p-6 bg-slate-900/50 hover:bg-slate-800/80 border border-white/5 hover:border-white/10 backdrop-blur-xl rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white p-3 flex-shrink-0 relative overflow-hidden shadow-lg z-10">
                        {empresa.logo_url ? <Image src={empresa.logo_url} alt={empresa.nombre} fill sizes="80px" className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" /> : <BuildingIcon className="w-8 h-8 text-slate-300 absolute inset-0 m-auto" />}
                      </div>
                      <div className="flex-1 z-10">
                        <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-200 tracking-tight">{empresa.nombre}</h4>
                        <p className="text-slate-400 font-medium mt-1 text-sm md:text-base">{empresa.rubro || 'Rubro Industrial'}</p>
                      </div>
                      <div className="hidden sm:flex z-10">
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 font-bold">
                          {empresa.estatus_membresia}
                        </Badge>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Próximos Eventos */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20"><CalendarIcon className="w-5 h-5 text-emerald-400" /></div>
                  Agenda Oficial
                </h3>
                <Link href="/eventos" className="group text-sm text-emerald-400 font-bold flex items-center gap-1">
                  Calendario <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="flex flex-col gap-6 h-full">
                {eventos.length === 0 ? (
                  <div className="flex-1 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center p-8">
                    <p className="text-slate-400 font-medium">No hay eventos próximos agendados.</p>
                  </div>
                ) : eventos.map((evento: any, index: number) => (
                  <Link href="/eventos" key={evento.id} className="block group outline-none">
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      viewport={{ once: true, margin: "-50px" }} 
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/50 backdrop-blur-xl transition-all duration-500"
                    >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 to-blue-500" />
                    <div className="p-8 pl-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                      {evento.imagen_url && (
                        <div className="w-full sm:w-32 h-40 sm:h-32 rounded-xl relative overflow-hidden flex-shrink-0 bg-slate-800">
                           <Image src={evento.imagen_url} alt={evento.titulo} fill sizes="(max-width: 640px) 100vw, 128px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs">
                            {new Date(evento.fecha).toLocaleDateString('es-VE', { timeZone: 'UTC', month: 'short', day: '2-digit' })}
                          </span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">{evento.titulo}</h4>
                        <p className="text-slate-400 font-medium line-clamp-2">{evento.descripcion}</p>
                      </div>
                    </div>
                  </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
