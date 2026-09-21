import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/panel-privado/', '/admin/', '/api/'],
    },
    sitemap: 'https://www.fedeindustriaragua.org.ve/sitemap.xml',
  }
}
