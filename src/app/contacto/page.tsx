"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircleIcon, MailIcon, PhoneIcon, ArrowRightIcon, Building2Icon, UserIcon, HashIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [nombre, setNombre] = useState('')
  const [rif, setRif] = useState('')
  const [contacto, setContacto] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const { createClient } = await import('@/utils/supabase/client')
    const supabase = createClient()
    
    const payload = {
      empresa: nombre,
      rif: rif,
      persona_contacto: contacto,
      email: email,
      telefono: telefono,
      mensaje: mensaje,
      estatus: 'Pendiente'
    }

    const { error } = await supabase.from('solicitudes_afiliacion').insert([payload])

    if (error) {
      console.error(error)
      alert('Error enviando la solicitud. Asegúrese de haber creado la tabla en Supabase.')
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const beneficios = [
    "Networking estratégico con líderes industriales",
    "Representación y vocería gremial a nivel nacional",
    "Acceso prioritario a ruedas de negocios y exposiciones",
    "Asesoría legal, tributaria y laboral especializada"
  ]

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Fondo dividido: Azul Izquierda (o Arriba en móvil) / Claro Derecha */}
      <div className="absolute top-0 left-0 w-full h-[850px] lg:h-full lg:w-[45%] bg-[#002b7f] z-0 lg:clip-path-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }} />
      <div className="hidden lg:block absolute top-0 left-0 w-full h-full bg-[#002b7f] z-0 lg:w-[45%]" />
      
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] z-0 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-[80px] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 lg:pt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Columna Izquierda: Copy y Beneficios */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8 text-white lg:pt-10"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-bold text-sm mb-6 border border-white/20 backdrop-blur-md">
                <Building2Icon className="w-4 h-4" />
                Afiliación Empresarial
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
                Impulsa el futuro <br/><span className="text-blue-300">de tu industria.</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-blue-50/90 leading-relaxed max-w-lg">
                Únete a la cúpula empresarial más fuerte y conectada de la región central. Fortalece tus operaciones y expande tus horizontes comerciales.
              </p>
            </div>

            <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-md border border-white/20 shadow-xl shadow-black/5">
              <h3 className="text-xl font-bold mb-6 text-white">Beneficios Exclusivos</h3>
              <ul className="space-y-4">
                {beneficios.map((beneficio, i) => (
                  <motion.li 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1) }}
                    key={i} className="flex items-start gap-3"
                  >
                    <CheckCircleIcon className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-medium text-white/90">{beneficio}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md border border-white/10 flex-shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Llámanos</p>
                  <p className="font-bold text-white text-sm">0242-6888183</p>
                  <p className="font-bold text-white text-sm">0424-5401990</p>
                  <p className="font-bold text-white text-sm">0414-4677830</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md border border-white/10 flex-shrink-0">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Escríbenos</p>
                  <p className="font-bold text-white text-xs lowercase">fedeindustriaregistroaragua@gmail.com</p>
                  <p className="font-bold text-white text-xs lowercase">fedeindustriaaragua@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna Derecha: Formulario */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-[#002b7f]/10 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
              
              <div className="relative z-10">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <CheckCircleIcon className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">¡Solicitud Enviada!</h3>
                    <p className="text-lg text-slate-600 max-w-sm">
                      Hemos recibido tu información. Nuestro equipo de atención al afiliado te contactará en las próximas 24 horas.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 px-6 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#002b7f] font-bold rounded-xl transition-all shadow-sm"
                    >
                      Enviar otra solicitud
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-black text-[#002b7f] mb-2 tracking-tight">Formulario de Afiliación</h2>
                    <p className="text-slate-500 font-medium mb-8">Completa tus datos y da el primer paso hacia el éxito institucional.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Building2Icon className="w-4 h-4 text-[#002b7f]" /> Nombre de la Empresa *
                          </label>
                          <Input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Inversiones Aragua C.A." className="h-14 bg-slate-50/50 border-slate-200 focus-visible:ring-[#002b7f] rounded-xl text-base font-medium placeholder:text-slate-400" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <HashIcon className="w-4 h-4 text-[#002b7f]" /> RIF Comercial *
                          </label>
                          <Input required value={rif} onChange={(e) => setRif(e.target.value)} placeholder="Ej. J-12345678-9" className="h-14 bg-slate-50/50 border-slate-200 focus-visible:ring-[#002b7f] rounded-xl text-base uppercase font-medium placeholder:text-slate-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          <UserIcon className="w-4 h-4 text-[#002b7f]" /> Persona de Contacto *
                        </label>
                        <Input required value={contacto} onChange={(e) => setContacto(e.target.value)} placeholder="Ej. Juan Pérez - Director General" className="h-14 bg-slate-50/50 border-slate-200 focus-visible:ring-[#002b7f] rounded-xl text-base font-medium placeholder:text-slate-400" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <MailIcon className="w-4 h-4 text-[#002b7f]" /> Correo Electrónico *
                          </label>
                          <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contacto@empresa.com" className="h-14 bg-slate-50/50 border-slate-200 focus-visible:ring-[#002b7f] rounded-xl text-base font-medium placeholder:text-slate-400" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <PhoneIcon className="w-4 h-4 text-[#002b7f]" /> Teléfono Móvil *
                          </label>
                          <Input required type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+58 (414) 123-4567" className="h-14 bg-slate-50/50 border-slate-200 focus-visible:ring-[#002b7f] rounded-xl text-base font-medium placeholder:text-slate-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Mensaje o Comentarios (Opcional)</label>
                        <textarea 
                          value={mensaje}
                          onChange={(e) => setMensaje(e.target.value)}
                          placeholder="Háblanos un poco sobre el rubro de tu empresa o cualquier duda que tengas..." 
                          className="min-h-[120px] w-full p-4 bg-slate-50/50 border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002b7f] rounded-xl text-base resize-none font-medium placeholder:text-slate-400"
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-14 bg-[#002b7f] hover:bg-blue-900 text-white font-bold rounded-xl shadow-lg shadow-[#002b7f]/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 mt-4"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Procesando...
                          </span>
                        ) : (
                          <>
                            Solicitar Afiliación Formal <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                      
                      <p className="text-center text-xs text-slate-400 font-medium mt-4 pt-2">
                        Tus datos están protegidos y serán tratados con absoluta confidencialidad bajo nuestras políticas de privacidad.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
