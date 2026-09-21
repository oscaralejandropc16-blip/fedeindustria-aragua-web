import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import DirectorioClient from '@/components/DirectorioClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Directorio de Empresas Afiliadas',
  description: 'Conoce las empresas e industrias líderes afiliadas a Fedeindustria en el estado Aragua. Encuentra proveedores confiables en manufactura, comercio, metalmecánica, química, agroindustria y servicios.',
  keywords: [
    'Directorio empresarial Aragua',
    'Empresas en Aragua',
    'Industrias en Maracay',
    'Empresas afiliadas Fedeindustria',
    'Proveedores industriales Aragua',
    'Manufactura Aragua',
    'Cámara de industriales Aragua'
  ],
  alternates: {
    canonical: 'https://www.fedeindustriaragua.org.ve/directorio',
  },
  openGraph: {
    title: 'Directorio de Empresas Afiliadas | Fedeindustria Aragua',
    description: 'Encuentra las empresas, fabricantes e industrias más sólidas del estado Aragua.',
    url: 'https://www.fedeindustriaragua.org.ve/directorio',
  }
}

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
