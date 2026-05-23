"use client"

import { BuildingIcon, UsersIcon, CheckCircleIcon, ArrowRightIcon } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'

export default function NosotrosPage() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden">
      
      {/* Header Institucional Premium */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-blue-100/50 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="show" variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#002b7f]/10 bg-white px-4 py-1.5 text-sm font-bold text-[#002b7f] shadow-sm mb-8">
              Nuestra Identidad Institucional
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 leading-[1.1]">
              Motor del desarrollo en el <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002b7f] to-blue-500">Centro del País</span>
            </h1>
            <p className="mt-8 text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Somos la cúpula empresarial que reúne, defiende y potencia a la pequeña y mediana industria del Estado Aragua desde su fundación.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visión y Misión con Tarjetas Premium */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group bg-white p-10 md:p-12 rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl hover:border-[#002b7f]/20 transition-all duration-500"
          >
            <div className="w-16 h-16 bg-blue-50 text-[#002b7f] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <BuildingIcon className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 group-hover:text-[#002b7f] transition-colors">Nuestra Misión</h2>
            <p className="text-slate-500 font-medium leading-relaxed text-lg">
              Representar, defender y promover los intereses de los industriales aragüeños. Fomentamos un ecosistema de innovación y competitividad que fortalece el aparato productivo nacional, acompañando a nuestros afiliados con asesoría técnica, legal y comercial.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group bg-[#002b7f] p-10 md:p-12 rounded-3xl border border-[#002b7f] shadow-lg shadow-blue-900/20 hover:shadow-2xl transition-all duration-500 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10">
              <CheckCircleIcon className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-6 relative z-10">Nuestra Visión</h2>
            <p className="text-blue-100 font-medium leading-relaxed text-lg relative z-10">
              Ser el gremio empresarial de referencia indiscutible en Venezuela, caracterizado por liderar la transformación hacia un modelo industrial tecnológico, sustentable y con capacidad exportadora.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Junta Directiva (Placeholders) */}
      <section className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Junta Directiva</h2>
            <p className="mt-4 text-xl text-slate-500 font-medium">Liderazgo comprometido con la excelencia industrial.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { role: 'Presidente', name: 'Nombre del Presidente' },
              { role: 'Vicepresidente', name: 'Nombre del Vicepresidente' },
              { role: 'Director Ejecutivo', name: 'Nombre del Director' }
            ].map((persona, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group flex flex-col items-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:border-slate-200 transition-all duration-300"
              >
                <div className="w-32 h-32 mb-6 rounded-full bg-slate-200 border-4 border-white shadow-md flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                  <UsersIcon className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{persona.name}</h3>
                <p className="text-[#002b7f] font-bold mt-2 uppercase tracking-widest text-sm">{persona.role}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link href="/directorio" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-[#002b7f] hover:shadow-lg hover:shadow-blue-900/30 transition-all hover:-translate-y-1">
              Conocer Empresas Afiliadas
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
