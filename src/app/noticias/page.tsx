import { createClient } from '@/utils/supabase/server'
import NoticiasClient from '@/components/NoticiasClient'

export const revalidate = 60

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
