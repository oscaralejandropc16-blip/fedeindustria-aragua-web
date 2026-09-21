import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import EventosClient from '@/components/EventosClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Eventos y Encuentros Empresariales',
  description: 'Conoce los próximos eventos, ruedas de negocios, foros, exposiciones y talleres organizados por Fedeindustria Aragua.',
  keywords: [
    'Eventos Fedeindustria Aragua',
    'Ruedas de negocios Aragua',
    'Expo empresarial Maracay',
    'Foros industriales Aragua',
    'Capacitación empresarial Venezuela'
  ],
  alternates: {
    canonical: 'https://www.fedeindustriaragua.org.ve/eventos',
  },
  openGraph: {
    title: 'Eventos y Encuentros Empresariales | Fedeindustria Aragua',
    description: 'Participa en los eventos y actividades empresariales de referencia en el estado Aragua.',
    url: 'https://www.fedeindustriaragua.org.ve/eventos',
  }
}

export default async function EventosPage() {
  const supabase = await createClient()

  const { data: eventos } = await supabase
    .from('eventos')
    .select('id, titulo, descripcion, fecha, fecha_fin, imagen_url, link_detalles, link_mapa, ubicacion')
    .order('fecha', { ascending: false })
    .limit(12)

  return <EventosClient eventos={eventos || []} />
}
