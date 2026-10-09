"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { SparklesIcon, XIcon, Volume2Icon, VolumeXIcon } from "lucide-react"

interface Particle {
  id: number
  x: number
  y: number
  emoji: string
  scale: number
  rotation: number
  duration: number
}

const HALLOWEEN_MESSAGES = [
  "🎃 ¡Buu! Fedeindustria Aragua les desea un feliz y productivo Halloween.",
  "💼 ¡Innovación, trabajo arduo y un toque de magia para el sector empresarial!",
  "🍬 ¡Que no falte la creatividad ni los dulces en tu industria!",
  "🕸️ Tejiendo redes de productividad y crecimiento comercial en Aragua.",
  "👻 ¡Espantando los límites para llevar la producción regional a lo más alto!",
]

export default function HalloweenTheme() {
  const pathname = usePathname()
  const [hasMounted, setHasMounted] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [activeMessage, setActiveMessage] = useState<string | null>(null)
  const [pumpkinGlow, setPumpkinGlow] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const stored = localStorage.getItem("fede_halloween_theme")
    if (stored !== null) {
      setIsEnabled(stored === "true")
    }
  }, [])

  const toggleHalloween = (val: boolean) => {
    setIsEnabled(val)
    localStorage.setItem("fede_halloween_theme", String(val))
  }

  // Trigger playful celebration particles
  const triggerCelebration = () => {
    setPumpkinGlow(true)
    setTimeout(() => setPumpkinGlow(false), 800)

    // Random message
    const randomMsg = HALLOWEEN_MESSAGES[Math.floor(Math.random() * HALLOWEEN_MESSAGES.length)]
    setActiveMessage(randomMsg)
    setTimeout(() => setActiveMessage(null), 4000)

    // Burst of particles
    const emojis = ["🎃", "🍬", "🦇", "✨", "🍭", "👻", "🕸️", "⭐"]
    const newParticles: Particle[] = Array.from({ length: 24 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 260,
      y: -(Math.random() * 220 + 40),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      scale: Math.random() * 0.7 + 0.8,
      rotation: (Math.random() - 0.5) * 360,
      duration: Math.random() * 1 + 1.2,
    }))

    setParticles((prev) => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)))
    }, 2500)
  }

  if (!hasMounted) return null
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/panel-privado")) {
    return null
  }

  return (
    <>
      {/* 1. CORNER SPIDERWEBS (Sutiles y elegantes, no interfieren con clics) */}
      {isEnabled && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
          {/* Telaraña Superior Izquierda */}
          <div className="absolute top-0 left-0 w-32 sm:w-48 h-32 sm:h-48 opacity-35 transition-opacity duration-700">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-slate-400 drop-shadow-sm"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            >
              <line x1="0" y1="0" x2="100" y2="0" />
              <line x1="0" y1="0" x2="92" y2="38" />
              <line x1="0" y1="0" x2="70" y2="70" />
              <line x1="0" y1="0" x2="38" y2="92" />
              <line x1="0" y1="0" x2="0" y2="100" />
              {/* Arcos concéntricos */}
              <path d="M 20 0 Q 18 10 14 14 Q 10 18 0 20" />
              <path d="M 40 0 Q 36 20 28 28 Q 20 36 0 40" />
              <path d="M 60 0 Q 55 30 42 42 Q 30 55 0 60" />
              <path d="M 80 0 Q 72 40 56 56 Q 40 72 0 80" />
              <path d="M 100 0 Q 90 50 70 70 Q 50 90 0 100" />
            </svg>

            {/* Pequeña arañita colgante con animación de péndulo */}
            <motion.div
              animate={{ rotate: [-6, 6, -6], y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ transformOrigin: "top center" }}
              className="absolute left-16 top-12 flex flex-col items-center pointer-events-auto cursor-pointer group"
              onClick={triggerCelebration}
              title="¡Haz clic en la arañita!"
            >
              <div className="w-[1px] h-8 bg-slate-400/60 group-hover:bg-amber-400 transition-colors" />
              <div className="w-3.5 h-3.5 bg-slate-800 rounded-full flex items-center justify-center shadow-sm relative group-hover:scale-125 transition-transform">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                {/* Patitas */}
                <div className="absolute -left-1.5 top-0.5 w-1 h-0.5 bg-slate-700 -rotate-45" />
                <div className="absolute -left-1.5 bottom-0.5 w-1 h-0.5 bg-slate-700 rotate-45" />
                <div className="absolute -right-1.5 top-0.5 w-1 h-0.5 bg-slate-700 rotate-45" />
                <div className="absolute -right-1.5 bottom-0.5 w-1 h-0.5 bg-slate-700 -rotate-45" />
              </div>
            </motion.div>
          </div>

          {/* Telaraña Superior Derecha */}
          <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 opacity-35 scale-x-[-1] transition-opacity duration-700">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-slate-400 drop-shadow-sm"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            >
              <line x1="0" y1="0" x2="100" y2="0" />
              <line x1="0" y1="0" x2="92" y2="38" />
              <line x1="0" y1="0" x2="70" y2="70" />
              <line x1="0" y1="0" x2="38" y2="92" />
              <line x1="0" y1="0" x2="0" y2="100" />
              <path d="M 20 0 Q 18 10 14 14 Q 10 18 0 20" />
              <path d="M 40 0 Q 36 20 28 28 Q 20 36 0 40" />
              <path d="M 60 0 Q 55 30 42 42 Q 30 55 0 60" />
              <path d="M 80 0 Q 72 40 56 56 Q 40 72 0 80" />
              <path d="M 100 0 Q 90 50 70 70 Q 50 90 0 100" />
            </svg>
          </div>

          {/* Murciélagos suaves flotando en el fondo */}
          <motion.div
            initial={{ x: "-10vw", y: "15vh", opacity: 0 }}
            animate={{
              x: ["-10vw", "110vw"],
              y: ["15vh", "8vh", "18vh", "10vh"],
              opacity: [0, 0.45, 0.45, 0],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "linear",
              delay: 3,
            }}
            className="absolute top-0 left-0 text-slate-800"
          >
            <svg className="w-8 h-8 fill-current drop-shadow-sm" viewBox="0 0 24 24">
              <path d="M22 13.5c-1.5 0-3-1-3.8-2.2-.6 1.4-2.1 2.2-3.7 2.2-1.3 0-2.5-.6-3.2-1.6-.2.1-.4.1-.6.1-.2 0-.4 0-.6-.1-.7 1-1.9 1.6-3.2 1.6-1.6 0-3.1-.8-3.7-2.2-.8 1.2-2.3 2.2-3.8 2.2-.6 0-1.1-.1-1.6-.4.4 2.2 2.3 3.9 4.6 3.9 1.4 0 2.6-.6 3.5-1.5.8 1.2 2.2 2 3.8 2s3-.8 3.8-2c.9.9 2.1 1.5 3.5 1.5 2.3 0 4.2-1.7 4.6-3.9-.5.3-1 .4-1.6.4zM12 9c-.8 0-1.5.7-1.5 1.5 0 .2 0 .4.1.6.4-.1.9-.2 1.4-.2s1 .1 1.4.2c.1-.2.1-.4.1-.6 0-.8-.7-1.5-1.5-1.5z" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ x: "105vw", y: "28vh", opacity: 0 }}
            animate={{
              x: ["105vw", "-15vw"],
              y: ["28vh", "22vh", "30vh", "20vh"],
              opacity: [0, 0.35, 0.35, 0],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "linear",
              delay: 14,
            }}
            className="absolute top-0 left-0 text-slate-700 scale-x-[-1]"
          >
            <svg className="w-6 h-6 fill-current drop-shadow-sm" viewBox="0 0 24 24">
              <path d="M22 13.5c-1.5 0-3-1-3.8-2.2-.6 1.4-2.1 2.2-3.7 2.2-1.3 0-2.5-.6-3.2-1.6-.2.1-.4.1-.6.1-.2 0-.4 0-.6-.1-.7 1-1.9 1.6-3.2 1.6-1.6 0-3.1-.8-3.7-2.2-.8 1.2-2.3 2.2-3.8 2.2-.6 0-1.1-.1-1.6-.4.4 2.2 2.3 3.9 4.6 3.9 1.4 0 2.6-.6 3.5-1.5.8 1.2 2.2 2 3.8 2s3-.8 3.8-2c.9.9 2.1 1.5 3.5 1.5 2.3 0 4.2-1.7 4.6-3.9-.5.3-1 .4-1.6.4zM12 9c-.8 0-1.5.7-1.5 1.5 0 .2 0 .4.1.6.4-.1.9-.2 1.4-.2s1 .1 1.4.2c.1-.2.1-.4.1-.6 0-.8-.7-1.5-1.5-1.5z" />
            </svg>
          </motion.div>
        </div>
      )}

      {/* 2. PARTICULAS DE CELEBRACIÓN / TRICK OR TREAT */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: "calc(2rem + 24px)",
                y: "calc(100vh - 5rem)",
                scale: 0.2,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                x: `calc(2rem + 24px + ${particle.x}px)`,
                y: `calc(100vh - 5rem + ${particle.y}px)`,
                scale: particle.scale,
                opacity: [1, 1, 0],
                rotate: particle.rotation,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: particle.duration,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute text-2xl select-none"
            >
              {particle.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. WIDGET FLOTANTE INTERACTIVO (ESQUINA INFERIOR IZQUIERDA) */}
      <aside aria-label="Especial Halloween Fedeindustria" className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
        {/* Toast / Mensaje flotante de la Calabaza */}
        <AnimatePresence>
          {activeMessage && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/95 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-2xl border border-orange-500/40 max-w-xs sm:max-w-sm flex items-center gap-2.5 relative"
            >
              <span className="text-xl">🎃</span>
              <p className="leading-tight text-slate-100">{activeMessage}</p>
              <div className="absolute -bottom-2 left-6 w-3 h-3 bg-slate-900 rotate-45 border-r border-b border-orange-500/40" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tarjeta de Control / Compañero Festivo */}
        {!isMinimized ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="group relative bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-amber-950/80 backdrop-blur-xl border border-orange-500/30 text-white rounded-3xl p-3.5 sm:p-4 shadow-[0_12px_40px_rgba(234,88,12,0.22)] flex items-center gap-3.5 transition-all hover:border-orange-400/60"
          >
            {/* Glow decorativo de fondo */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl blur-md -z-10 group-hover:opacity-100 transition-opacity" />

            {/* Calabaza Interactiva */}
            <button
              onClick={triggerCelebration}
              className={`relative w-12 h-12 flex-shrink-0 cursor-pointer rounded-2xl bg-gradient-to-b from-orange-500/20 to-amber-600/30 border border-orange-400/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-inner ${
                pumpkinGlow ? "scale-125 ring-4 ring-orange-400/60 shadow-[0_0_25px_rgba(251,146,60,0.8)]" : ""
              }`}
              title="¡Haz clic en la calabaza para celebrar!"
            >
              {/* Jack O' Lantern SVG */}
              <svg viewBox="0 0 100 100" className="w-9 h-9 drop-shadow-md">
                {/* Tallo */}
                <path d="M 50 15 C 47 6, 57 2, 53 18" fill="none" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" />
                {/* Cuerpo Calabaza */}
                <path
                  d="M 50 20 C 25 20, 15 35, 15 56 C 15 78, 30 88, 50 88 C 70 88, 85 78, 85 56 C 85 35, 75 20, 50 20 Z"
                  fill="url(#pumpkinGrad)"
                />
                {/* Ojos y Nariz iluminados */}
                <polygon points="32,45 42,48 38,56" fill="#fef08a" />
                <polygon points="68,45 58,48 62,56" fill="#fef08a" />
                <polygon points="50,56 46,63 54,63" fill="#fef08a" />
                {/* Sonrisa tenebrosa y juguetona */}
                <path
                  d="M 28 66 Q 50 84 72 66 Q 66 75 58 68 Q 50 78 42 68 Q 34 75 28 66 Z"
                  fill="#fef08a"
                />
                <defs>
                  <radialGradient id="pumpkinGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="70%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#c2410c" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Chispitas festivas al hover */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-75" />
            </button>

            {/* Texto y switch de activación */}
            <div className="flex flex-col pr-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black tracking-wider uppercase text-amber-400">
                  Especial Halloween
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {isEnabled ? "Modo festivo activo" : "Efectos en pausa"}
              </p>

              {/* Botón rápido para dulce o truco */}
              <button
                onClick={triggerCelebration}
                className="mt-1 text-[11px] font-bold text-amber-300/90 hover:text-amber-200 underline decoration-amber-400/50 hover:decoration-amber-300 flex items-center gap-1 transition-all text-left"
              >
                <SparklesIcon className="w-3 h-3 text-amber-400 inline" />
                ¡Tocar para sorpresa!
              </button>
            </div>

            {/* Controles: On/Off y Minimizar */}
            <div className="flex flex-col items-center gap-2 border-l border-white/10 pl-2.5">
              <button
                onClick={() => toggleHalloween(!isEnabled)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 cursor-pointer flex items-center ${
                  isEnabled ? "bg-amber-500 justify-end" : "bg-slate-700 justify-start"
                }`}
                title={isEnabled ? "Desactivar detalles de Halloween" : "Activar detalles de Halloween"}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center text-[8px]"
                >
                  {isEnabled ? "🎃" : "⚪"}
                </motion.div>
              </button>

              <button
                onClick={() => setIsMinimized(true)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                title="Minimizar panel festivo"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Estado Minimizado (Botón discreto con la calabacita) */
          <motion.button
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsMinimized(false)}
            className="w-12 h-12 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-orange-500/40 shadow-xl flex items-center justify-center cursor-pointer group text-xl relative"
            title="Abrir Especial de Halloween"
          >
            <span>🎃</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
          </motion.button>
        )}
      </aside>
    </>
  )
}
