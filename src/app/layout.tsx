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
  title: "Fedeindustria Aragua | Desarrollo y Producción Nacional",
  description: "Cúpula empresarial de referencia en la región central, liderando la transformación industrial de Aragua hacia un modelo productivo moderno.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth antialiased">
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
