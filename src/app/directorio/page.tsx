import { createClient } from '@/utils/supabase/server'
import DirectorioClient from '@/components/DirectorioClient'

export const revalidate = 60

export default async function DirectorioPage() {
  const supabase = await createClient()

  // Proyección de columnas estrictamente necesarias
  const { data: empresas } = await supabase
    .from('empresas_afiliadas')
    .select('id, nombre, rif, rubro, logo_url, telefono, direccion, estatus_membresia, instagram, tiktok, web, email')
    .order('orden', { ascending: true })
    .order('nombre')

  return <DirectorioClient empresasIniciales={empresas || []} />
}
