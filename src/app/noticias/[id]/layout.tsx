import type { Metadata, ResolvingMetadata } from 'next'
import { createClient } from '@supabase/supabase-js'

type Props = {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params
  const id = resolvedParams?.id
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey || !id) {
    return {
      title: 'Noticia | Fedeindustria Aragua',
    }
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: noticia } = await supabase
      .from('noticias')
      .select('titulo, resumen, imagen_url')
      .eq('id', id)
      .single()

    if (!noticia) {
      return {
        title: 'Noticia no encontrada | Fedeindustria Aragua',
      }
    }

    const title = noticia.titulo
    const description = noticia.resumen || 'Artículo publicado por Fedeindustria Aragua.'
    const image = noticia.imagen_url || 'https://www.fedeindustriaragua.org.ve/logo.png'

    return {
      title,
      description,
      alternates: {
        canonical: `https://www.fedeindustriaragua.org.ve/noticias/${id}`,
      },
      openGraph: {
        title,
        description,
        url: `https://www.fedeindustriaragua.org.ve/noticias/${id}`,
        type: 'article',
        images: [
          {
            url: image,
            alt: noticia.titulo,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    }
  } catch {
    return {
      title: 'Noticia | Fedeindustria Aragua',
    }
  }
}

export default function NoticiaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
