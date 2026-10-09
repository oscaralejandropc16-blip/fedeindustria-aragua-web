"use client"

import { usePathname } from "next/navigation"

export default function HalloweenTheme() {
  const pathname = usePathname()

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/panel-privado")) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none hidden lg:block" aria-hidden="true">
      {/* Telaraña Superior Izquierda: solo en pantallas de escritorio, ultra-sutil y 100% pasiva */}
      <div className="absolute top-0 left-0 w-36 h-36 opacity-20">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-slate-500"
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

      {/* Telaraña Superior Derecha: sutil y pasiva */}
      <div className="absolute top-0 right-0 w-36 h-36 opacity-20 scale-x-[-1]">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-slate-500"
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
    </div>
  )
}
