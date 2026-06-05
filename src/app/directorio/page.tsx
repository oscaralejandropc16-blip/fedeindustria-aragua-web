import { createClient } from '@/utils/supabase/server'
import DirectorioClient from '@/components/DirectorioClient'

export const revalidate = 60

export default async function DirectorioPage() {
  const supabase = await createClient()

  // Proyección de columnas estrictamente necesarias
  const { data: empresas } = await supabase
    .from('empresas_afiliadas')
    .select('id, nombre, rif, rubro, logo_url, telefono, direccion, estatus_membresia, instagram, tiktok, web')
    .order('orden', { ascending: true })
    .order('nombre')
    // Limitando a 24 para evitar sobrecarga inicial.
    // Si se quiere paginación total, se requeriría estado de página en el cliente
    // o paginación por URL, pero por ahora esto previene over-fetching
    .limit(24)

  return <DirectorioClient empresasIniciales={empresas || []} />
}
