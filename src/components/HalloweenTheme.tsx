"use client"

import { usePathname } from "next/navigation"

export default function HalloweenTheme() {
  const pathname = usePathname()

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/panel-privado")) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none" aria-hidden="true">
      <style>{`
        @keyframes batGlideLeftToRight {
          0% {
            transform: translate3d(-10vw, 14vh, 0) scale(0.65);
            opacity: 0;
          }
          10% {
            opacity: 0.35;
          }
          50% {
            transform: translate3d(50vw, 8vh, 0) scale(0.8);
            opacity: 0.4;
          }
          90% {
            opacity: 0.35;
          }
          100% {
            transform: translate3d(115vw, 16vh, 0) scale(0.65);
            opacity: 0;
          }
        }

        @keyframes batGlideRightToLeft {
          0% {
            transform: translate3d(110vw, 24vh, 0) scale(-0.6, 0.6);
            opacity: 0;
          }
          12% {
            opacity: 0.3;
          }
          55% {
            transform: translate3d(45vw, 18vh, 0) scale(-0.75, 0.75);
            opacity: 0.35;
          }
          88% {
            opacity: 0.3;
          }
          100% {
            transform: translate3d(-15vw, 26vh, 0) scale(-0.6, 0.6);
            opacity: 0;
          }
        }

        .bat-animation-1 {
          animation: batGlideLeftToRight 22s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          will-change: transform, opacity;
        }

        .bat-animation-2 {
          animation: batGlideRightToLeft 28s cubic-bezier(0.4, 0, 0.6, 1) 9s infinite;
          will-change: transform, opacity;
        }
      `}</style>

      {/* 1. Telaraña Superior Izquierda (Visible tanto en móviles como en escritorio) */}
      <div className="absolute top-0 left-0 w-24 sm:w-36 md:w-44 h-24 sm:h-36 md:h-44 opacity-25">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-slate-400 drop-shadow-sm"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
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

      {/* 2. Telaraña Superior Derecha (Visible tanto en móviles como en escritorio) */}
      <div className="absolute top-0 right-0 w-24 sm:w-36 md:w-44 h-24 sm:h-36 md:h-44 opacity-25 scale-x-[-1]">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-slate-400 drop-shadow-sm"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
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

      {/* 3. Murciélagos suaves volando con animación CSS pura en GPU (sin javascript, 60fps en Safari) */}
      <div className="bat-animation-1 absolute top-0 left-0 text-slate-700">
        <svg className="w-6 sm:w-8 h-6 sm:h-8 fill-current drop-shadow-sm" viewBox="0 0 24 24">
          <path d="M22 13.5c-1.5 0-3-1-3.8-2.2-.6 1.4-2.1 2.2-3.7 2.2-1.3 0-2.5-.6-3.2-1.6-.2.1-.4.1-.6.1-.2 0-.4 0-.6-.1-.7 1-1.9 1.6-3.2 1.6-1.6 0-3.1-.8-3.7-2.2-.8 1.2-2.3 2.2-3.8 2.2-.6 0-1.1-.1-1.6-.4.4 2.2 2.3 3.9 4.6 3.9 1.4 0 2.6-.6 3.5-1.5.8 1.2 2.2 2 3.8 2s3-.8 3.8-2c.9.9 2.1 1.5 3.5 1.5 2.3 0 4.2-1.7 4.6-3.9-.5.3-1 .4-1.6.4zM12 9c-.8 0-1.5.7-1.5 1.5 0 .2 0 .4.1.6.4-.1.9-.2 1.4-.2s1 .1 1.4.2c.1-.2.1-.4.1-.6 0-.8-.7-1.5-1.5-1.5z" />
        </svg>
      </div>

      <div className="bat-animation-2 absolute top-0 left-0 text-slate-700">
        <svg className="w-5 sm:w-7 h-5 sm:h-7 fill-current drop-shadow-sm" viewBox="0 0 24 24">
          <path d="M22 13.5c-1.5 0-3-1-3.8-2.2-.6 1.4-2.1 2.2-3.7 2.2-1.3 0-2.5-.6-3.2-1.6-.2.1-.4.1-.6.1-.2 0-.4 0-.6-.1-.7 1-1.9 1.6-3.2 1.6-1.6 0-3.1-.8-3.7-2.2-.8 1.2-2.3 2.2-3.8 2.2-.6 0-1.1-.1-1.6-.4.4 2.2 2.3 3.9 4.6 3.9 1.4 0 2.6-.6 3.5-1.5.8 1.2 2.2 2 3.8 2s3-.8 3.8-2c.9.9 2.1 1.5 3.5 1.5 2.3 0 4.2-1.7 4.6-3.9-.5.3-1 .4-1.6.4zM12 9c-.8 0-1.5.7-1.5 1.5 0 .2 0 .4.1.6.4-.1.9-.2 1.4-.2s1 .1 1.4.2c.1-.2.1-.4.1-.6 0-.8-.7-1.5-1.5-1.5z" />
        </svg>
      </div>
    </div>
  )
}
