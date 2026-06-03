const fs = require('fs');
const path = 'src/app/admin/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const startMarker = `  return (
    // ESTO ES CLAVE: fixed inset-0 z-[100] para sobreescribir el layout público
    <div className="fixed inset-0 z-[100] bg-[#f8fafc] flex flex-col md:flex-row overflow-hidden">`;

const endMarker = `            </TabsList>`;

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker) + endMarker.length;

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find markers!");
  console.log("Start Index:", startIndex, "End Index:", endIndex);
  process.exit(1);
}

const newLayoutStart = `  return (
    <Tabs defaultValue="home" className="fixed inset-0 z-[100] bg-[#f8fafc] flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* SIDEBAR ADMINISTRATIVO */}
      <aside className="w-full md:w-72 md:h-screen bg-white border-r border-slate-200 flex flex-col flex-shrink-0 relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 border-b border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#002b7f] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <ShieldCheckIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-slate-900 font-black text-xl tracking-tight">Portal CMS</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Administración</p>
          </div>
        </div>

        <TabsList className="flex-1 flex flex-col justify-start h-full p-6 space-y-2 bg-transparent border-none">
          <div className="px-2 mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-full text-left">Módulos Principales</div>
          
          <TabsTrigger value="home" className="w-full justify-start gap-3 px-4 py-3.5 h-auto rounded-xl data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent data-[state=active]:border-blue-100">
            <LayoutDashboardIcon className="w-5 h-5" /> Portada (Inicio)
          </TabsTrigger>
          <TabsTrigger value="empresas" className="w-full justify-start gap-3 px-4 py-3.5 h-auto rounded-xl data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent data-[state=active]:border-blue-100">
            <BuildingIcon className="w-5 h-5" /> Directorio
          </TabsTrigger>
          <TabsTrigger value="eventos" className="w-full justify-start gap-3 px-4 py-3.5 h-auto rounded-xl data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent data-[state=active]:border-blue-100">
            <CalendarIcon className="w-5 h-5" /> Agenda de Eventos
          </TabsTrigger>
          <TabsTrigger value="noticias" className="w-full justify-start gap-3 px-4 py-3.5 h-auto rounded-xl data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent data-[state=active]:border-blue-100">
            <NewspaperIcon className="w-5 h-5" /> Sala de Prensa
          </TabsTrigger>
          <TabsTrigger value="aliados" className="w-full justify-start gap-3 px-4 py-3.5 h-auto rounded-xl data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent data-[state=active]:border-blue-100">
            <ImageIcon className="w-5 h-5" /> Aliados
          </TabsTrigger>
        </TabsList>

        <div className="p-6 border-t border-slate-100">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold transition-all border border-slate-200 hover:border-red-200 shadow-sm">
            <LogOutIcon className="w-5 h-5" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main id="dashboard-main" className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative scroll-smooth bg-[#f8fafc]">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#002b7f]/[0.03] to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto p-8 md:p-12 relative z-10">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Gestión de Contenido</h2>
              <p className="text-slate-500 font-medium mt-2">Administra la información pública de la plataforma web.</p>
            </div>
            <div className="hidden md:flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-sm font-bold text-slate-600">Sistema en Línea</span>
            </div>
          </div>`;

content = content.substring(0, startIndex) + newLayoutStart + content.substring(endIndex);

// Clean up the ending wrapper tags
const oldEndingMarker = `          </Tabs>
        </div>
      </main>
    </div>`;
const newEndingMarker = `        </div>
      </main>
    </Tabs>`;
content = content.replace(oldEndingMarker, newEndingMarker);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully replaced layout!');
