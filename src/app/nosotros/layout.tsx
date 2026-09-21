import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiénes Somos | Identidad y Junta Directiva',
  description: 'Conoce la historia, misión, visión y junta directiva de Fedeindustria Aragua. Cúpula empresarial comprometida con la reactivación económica, gremial e industrial de la región central.',
  keywords: [
    'Fedeindustria Aragua junta directiva',
    'Florimar Ontiveros',
    'Presidenta Fedeindustria Aragua',
    'Quiénes somos Fedeindustria Aragua',
    'Misión Fedeindustria Aragua',
    'Gremio empresarial Aragua'
  ],
  alternates: {
    canonical: 'https://www.fedeindustriaragua.org.ve/nosotros',
  },
  openGraph: {
    title: 'Quiénes Somos | Fedeindustria Aragua',
    description: 'Nuestra misión, visión y liderazgo gremial en la región central de Venezuela.',
    url: 'https://www.fedeindustriaragua.org.ve/nosotros',
  }
}

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
