import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import NoticiasClient from '@/components/NoticiasClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Noticias y Actualidad Industrial',
  description: 'Últimas noticias, comunicados, acuerdos y novedades del sector industrial, empresarial y comercial del estado Aragua y Venezuela.',
  keywords: [
    'Noticias Fedeindustria Aragua',
    'Actualidad industrial Aragua',
    'Noticias de economía Maracay',
    'Empresas Aragua noticias',
    'Sector productivo venezolano'
  ],
  alternates: {
    canonical: 'https://www.fedeindustriaragua.org.ve/noticias',
  },
  openGraph: {
    title: 'Noticias y Actualidad Industrial | Fedeindustria Aragua',
    description: 'Boletines y novedades del sector industrial y empresarial de Aragua.',
    url: 'https://www.fedeindustriaragua.org.ve/noticias',
  }
}

export default async function TodasLasNoticiasPage() {
  const supabase = await createClient()

  const { data: noticias } = await supabase
    .from('noticias')
    .select('id, titulo, resumen, fecha_publicacion, imagen_url, galeria_urls')
    .order('orden', { ascending: true })
    .order('fecha_publicacion', { ascending: false })
    .limit(12)

  return <NoticiasClient noticias={noticias || []} />
}
