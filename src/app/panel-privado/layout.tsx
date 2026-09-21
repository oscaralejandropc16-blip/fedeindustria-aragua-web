import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acceso Privado | Fedeindustria Aragua',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function PanelPrivadoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
