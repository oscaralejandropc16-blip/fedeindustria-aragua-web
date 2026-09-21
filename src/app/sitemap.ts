import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export const revalidate = 3600 // Revalidar sitemap cada hora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.fedeindustriaragua.org.ve'
  
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/directorio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/eventos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  let newsRoutes: MetadataRoute.Sitemap = []

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data: noticias } = await supabase
        .from('noticias')
        .select('id, fecha_publicacion')
        .order('id', { ascending: false })
        .limit(100)

      if (noticias && noticias.length > 0) {
        newsRoutes = noticias.map((item) => ({
          url: `${baseUrl}/noticias/${item.id}`,
          lastModified: item.fecha_publicacion ? new Date(item.fecha_publicacion) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        }))
      }
    }
  } catch (err) {
    console.error('Error generando URLs dinámicas para el sitemap:', err)
  }

  return [...staticRoutes, ...newsRoutes]
}
