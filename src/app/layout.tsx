import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

// Utilizamos Inter como fuente principal, es la más profesional y limpia para UI corporativa.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fedeindustriaragua.org.ve'),
  title: {
    default: "Fedeindustria Aragua | Impulsando el Motor Productivo",
    template: "%s | Fedeindustria Aragua"
  },
  description: "Cámara de Industriales, Empresarios y Comerciantes del estado Aragua. Cúpula empresarial de referencia en Maracay y la región central de Venezuela. Directorio de empresas afiliadas, eventos y noticias.",
  keywords: [
    "Fedeindustria Aragua",
    "fedeindustriaragua",
    "Fedeindustria",
    "fedeindustriaragua.org.ve",
    "www.fedeindustriaragua.org.ve",
    "Cámara de Industriales Aragua",
    "Cúpula empresarial Aragua",
    "Empresas en Aragua",
    "Industria Maracay",
    "Producción nacional Venezuela",
    "Directorio empresarial Aragua",
    "Florimar Ontiveros",
    "Noticias industriales Aragua",
    "Eventos empresariales Maracay",
    "Comercio Aragua",
    "Sector productivo Aragua"
  ],
  authors: [{ name: "Fedeindustria Aragua", url: "https://www.fedeindustriaragua.org.ve" }],
  creator: "Fedeindustria Aragua",
  publisher: "Fedeindustria Aragua",
  openGraph: {
    title: 'Fedeindustria Aragua | Impulsando el Motor Productivo',
    description: 'Cúpula empresarial de referencia en la región central, liderando la transformación industrial de Aragua hacia un modelo productivo moderno.',
    url: 'https://www.fedeindustriaragua.org.ve',
    siteName: 'Fedeindustria Aragua',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Fedeindustria Aragua Logo Oficial',
      }
    ],
    locale: 'es_VE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fedeindustria Aragua',
    description: 'Cúpula empresarial de referencia en la región central de Venezuela.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.fedeindustriaragua.org.ve',
  },
  verification: {
    google: 'googleda7f5277621fb132',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.fedeindustriaragua.org.ve/#website",
      "url": "https://www.fedeindustriaragua.org.ve",
      "name": "Fedeindustria Aragua",
      "alternateName": [
        "Fedeindustria",
        "fedeindustriaragua",
        "Fedeindustria Estado Aragua",
        "Cámara de Industriales de Aragua",
        "Fedeindustria Aragua Oficial"
      ],
      "description": "Cámara de Industriales, Empresarios y Comerciantes del estado Aragua. Cúpula empresarial de referencia en la región central de Venezuela.",
      "inLanguage": "es-VE",
      "publisher": {
        "@id": "https://www.fedeindustriaragua.org.ve/#organization"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.fedeindustriaragua.org.ve/#organization",
      "name": "Fedeindustria Aragua",
      "legalName": "Cámara de Industriales, Empresarios y Comerciantes del Estado Aragua",
      "url": "https://www.fedeindustriaragua.org.ve",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.fedeindustriaragua.org.ve/logo.png",
        "caption": "Logo Oficial Fedeindustria Aragua"
      },
      "image": "https://www.fedeindustriaragua.org.ve/logo.png",
      "description": "Cúpula empresarial de referencia en la región central de Venezuela, liderando la transformación industrial de Aragua hacia un modelo productivo moderno.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Las Delicias, Urb. Andrés Bello, Calle Armando Reverón N° 122, Quinta Fedeindustria",
        "addressLocality": "Maracay",
        "addressRegion": "Aragua",
        "postalCode": "2101",
        "addressCountry": "VE"
      },
      "telephone": ["+58 242-6888183", "+58 424-5401990", "+58 414-4677830", "+58 412-0276706"],
      "email": "fedeindustriaaragua@gmail.com",
      "sameAs": [
        "https://www.instagram.com/fedeindustriaragua",
        "https://www.tiktok.com/@fedeindustriaragua"
      ],
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Estado Aragua, Venezuela"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Aseguramos que Inter sea la fuente base en todo el body */}
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900`}>
        
        {/* Navbar Flotante Ultra-Moderno con estado responsivo */}
        <Navbar />

        {/* Contenido Principal */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Footer Institucional Rediseñado */}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
