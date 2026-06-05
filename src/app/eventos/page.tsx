import { createClient } from '@/utils/supabase/server'
import EventosClient from '@/components/EventosClient'

export const revalidate = 60

export default async function EventosPage() {
  const supabase = await createClient()

  const { data: eventos } = await supabase
    .from('eventos')
    .select('id, titulo, descripcion, fecha, fecha_fin, imagen_url, link_detalles, link_mapa, ubicacion')
    .order('fecha', { ascending: false })
    .limit(12)

  return <EventosClient eventos={eventos || []} />
}
