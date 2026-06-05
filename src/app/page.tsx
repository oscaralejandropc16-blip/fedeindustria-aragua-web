import { createClient } from '@/utils/supabase/server'
import HomeClient from '@/components/HomeClient'
import { cookies } from 'next/headers'

// Esto habilita la revalidación estática de la página cada 60 segundos (ISR)
export const revalidate = 60;

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Fetch Configuración Home
  const { data: configData } = await supabase.from('configuracion_home').select('*').eq('id', 1).single()
  const configHome = configData ? {
    titulo: configData.titulo,
    subtitulo: configData.subtitulo,
    video_url: configData.video_url
  } : {
    titulo: 'Conectamos el Futuro de la Industria',
    subtitulo: 'Únete a la red empresarial más sólida de la región central. Innovación, representación y crecimiento para tu empresa.',
    video_url: '/video-industrial.mp4'
  }

  // Fetch Empresas (Solo activas, limitado a 3)
  const { data: empresas } = await supabase
    .from('empresas_afiliadas')
    .select('id, nombre, logo_url, rubro, estatus_membresia') // <- Proyección de columnas para optimizar payload
    .eq('estatus_membresia', 'Activa')
    .order('orden', { ascending: true })
    .order('id', { ascending: false })
    .limit(3)

  // Fetch Eventos (Limitado a 2)
  const { data: eventos } = await supabase
    .from('eventos')
    .select('id, titulo, descripcion, fecha, fecha_fin, imagen_url')
    .order('orden', { ascending: true })
    .order('fecha', { ascending: false })
    .limit(2)

  // Fetch Noticias (Limitado a 3)
  const { data: noticias } = await supabase
    .from('noticias')
    .select('id, titulo, resumen, fecha_publicacion, imagen_url')
    .order('orden', { ascending: true })
    .order('fecha_publicacion', { ascending: false })
    .limit(3)

  // Fetch Aliados (Solo logos, limitado para no sobrecargar)
  const { data: aliados } = await supabase
    .from('aliados')
    .select('logo_url')
    .order('orden', { ascending: true })
    .order('id', { ascending: false })
    .limit(10) // Limitamos a 10 para el marquee

  const aliadosLogos = aliados && aliados.length > 0 
    ? aliados.map(a => a.logo_url) 
    : ['/logo.png']

  return (
    <HomeClient 
      configHome={configHome} 
      empresas={empresas || []} 
      eventos={eventos || []} 
      noticias={noticias || []} 
      aliadosLogos={aliadosLogos} 
    />
  )
}
