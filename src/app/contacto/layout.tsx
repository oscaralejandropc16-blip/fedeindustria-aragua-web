import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto y Afiliación Empresarial',
  description: 'Comunícate con Fedeindustria Aragua. Afílitate a la cúpula empresarial más importante de la región central. Sede en Maracay, teléfonos y correo de atención.',
  keywords: [
    'Afiliación Fedeindustria Aragua',
    'Contacto Fedeindustria Aragua',
    'Teléfonos Fedeindustria Maracay',
    'Cómo afiliar mi empresa en Aragua',
    'Sede Fedeindustria Aragua'
  ],
  alternates: {
    canonical: 'https://www.fedeindustriaragua.org.ve/contacto',
  },
  openGraph: {
    title: 'Contacto y Afiliación | Fedeindustria Aragua',
    description: 'Únete y contáctate con el equipo gremial de Fedeindustria Aragua en Maracay.',
    url: 'https://www.fedeindustriaragua.org.ve/contacto',
  }
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
