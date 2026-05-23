import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
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
        <footer className="bg-[#020a1f] text-white pt-24 pb-12 border-t border-white/10 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[#002b7f] to-transparent opacity-50" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#002b7f]/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
            
            <div className="md:col-span-5 space-y-8">
              <div className="bg-white p-4 rounded-2xl inline-block shadow-xl shadow-black/20">
                <img src="/logo.png" alt="Logo Fedeindustria" className="h-20 w-auto object-contain" />
              </div>
              <p className="text-slate-400 text-base leading-relaxed max-w-md font-medium">
                La cúpula empresarial del centro del país. Fomentamos el desarrollo integral de la pequeña y mediana industria en Aragua con innovación y excelencia.
              </p>
            </div>

            <div className="md:col-span-3 space-y-6">
              <h3 className="font-extrabold text-white tracking-widest uppercase text-xs opacity-50">Explorar</h3>
              <ul className="space-y-4">
                <li><Link href="/nosotros" className="text-slate-300 hover:text-white hover:translate-x-1 inline-block transition-all font-medium">Nuestra Historia</Link></li>
                <li><Link href="/directorio" className="text-slate-300 hover:text-white hover:translate-x-1 inline-block transition-all font-medium">Directorio Oficial</Link></li>
                <li><Link href="/eventos" className="text-slate-300 hover:text-white hover:translate-x-1 inline-block transition-all font-medium">Agenda y Eventos</Link></li>
                <li><Link href="/contacto" className="text-slate-300 hover:text-white hover:translate-x-1 inline-block transition-all font-medium">Contáctanos</Link></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-6">
              <h3 className="font-extrabold text-white tracking-widest uppercase text-xs opacity-50">Sede Principal</h3>
              <ul className="space-y-5 text-slate-300 font-medium">
                <li className="flex items-start gap-4 group">
                  <div className="bg-white/10 p-2.5 rounded-xl group-hover:bg-[#002b7f] transition-colors"><MapPinIcon className="w-5 h-5 text-white" /></div>
                  <span className="mt-1 leading-relaxed">Av. Las Delicias, Centro Empresarial, Piso 3. Maracay, Edo. Aragua.</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="bg-white/10 p-2.5 rounded-xl group-hover:bg-[#002b7f] transition-colors"><PhoneIcon className="w-5 h-5 text-white" /></div>
                  <span className="leading-relaxed">+58 (243) 555-0000</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="bg-white/10 p-2.5 rounded-xl group-hover:bg-[#002b7f] transition-colors"><MailIcon className="w-5 h-5 text-white" /></div>
                  <a href="mailto:contacto@fedeindustriaaragua.org" className="hover:text-white transition-colors">contacto@fedeindustriaaragua.org</a>
                </li>
              </ul>
              
              <div className="pt-6 flex gap-4">
                <a href="https://www.instagram.com/fedeindustriaragua/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#002b7f] hover:scale-110 hover:shadow-lg hover:shadow-blue-900/50 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#002b7f] hover:scale-110 hover:shadow-lg hover:shadow-blue-900/50 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>

          </div>
          
          <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-medium text-slate-400">
            <p>© {new Date().getFullYear()} Fedeindustria Aragua. Todos los derechos reservados.</p>
            <div className="flex gap-6 items-center">
              <Link href="#" className="hover:text-white transition-colors">Términos de Servicio</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
              <Link href="/admin/dashboard" className="text-xs text-slate-600 hover:text-blue-500 transition-colors flex items-center gap-1 ml-4" title="Acceso Administrativo">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Intranet
              </Link>
            </div>
          </div>
        </footer>
        <ScrollToTop />
      </body>
    </html>
  );
}
