const fs = require('fs');

const path = 'src/app/admin/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldLayoutStart = `  return (
    // ESTO ES CLAVE: fixed inset-0 z-[100] para sobreescribir el layout público
    <div className="fixed inset-0 z-[100] bg-[#f8fafc] flex flex-col md:flex-row overflow-hidden">
      
      {/* SIDEBAR ADMINISTRATIVO (Estilo SaaS Premium) */}
      <aside className="w-full md:w-72 md:h-screen bg-[#020a1f] text-slate-300 flex flex-col flex-shrink-0 relative overflow-hidden z-20 shadow-2xl">
        {/* Decoración de fondo sidebar */}
        <div className="absolute top-[-10%] right-[-50%] w-[150%] h-[50%] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="p-8 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
              <ShieldCheckIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-extrabold text-lg tracking-tight">Portal CMS</h1>
              <p className="text-xs text-blue-400 font-medium">Fedeindustria Aragua</p>
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 relative z-10 space-y-2">
          <div className="px-3 mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Módulos del Sistema</div>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/20 text-blue-400 font-bold border border-blue-500/20 transition-all">
            <LayoutDashboardIcon className="w-5 h-5" /> Base de Datos
          </button>
        </div>

        <div className="p-6 border-t border-white/10 relative z-10">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 font-bold transition-all border border-transparent hover:border-red-500/30">
            <LogOutIcon className="w-4 h-4" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL (Main Content) */}
      <main id="dashboard-main" className="flex-1 h-screen overflow-y-auto overflow-x-hidden p-6 md:p-12 relative scroll-smooth">
        {/* Glow de fondo tenue */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Gestión de Contenido</h2>
            <p className="text-slate-500 font-medium mt-2">Agrega y administra la información pública del portal web.</p>
          </div>

          <Tabs defaultValue="home" className="w-full">
            {/* TABS ESTILO NAVEGACIÓN MODERNA */}
            <TabsList className="flex flex-wrap w-full md:w-auto h-auto bg-transparent border-b border-slate-200 rounded-none mb-10 gap-8 justify-start p-0">
              <TabsTrigger value="home" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#002b7f] data-[state=active]:text-[#002b7f] text-slate-500 font-bold text-base px-1 pb-4 rounded-none transition-all">
                <LayoutDashboardIcon className="w-4 h-4 mr-2" /> Portada (Inicio)
              </TabsTrigger>
              <TabsTrigger value="empresas" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#002b7f] data-[state=active]:text-[#002b7f] text-slate-500 font-bold text-base px-1 pb-4 rounded-none transition-all">
                <BuildingIcon className="w-4 h-4 mr-2" /> Directorio
              </TabsTrigger>
              <TabsTrigger value="eventos" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#002b7f] data-[state=active]:text-[#002b7f] text-slate-500 font-bold text-base px-1 pb-4 rounded-none transition-all">
                <CalendarIcon className="w-4 h-4 mr-2" /> Agenda de Eventos
              </TabsTrigger>
              <TabsTrigger value="noticias" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#002b7f] data-[state=active]:text-[#002b7f] text-slate-500 font-bold text-base px-1 pb-4 rounded-none transition-all">
                <NewspaperIcon className="w-4 h-4 mr-2" /> Sala de Prensa
              </TabsTrigger>
              <TabsTrigger value="aliados" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#002b7f] data-[state=active]:text-[#002b7f] text-slate-500 font-bold text-base px-1 pb-4 rounded-none transition-all">
                <ImageIcon className="w-4 h-4 mr-2" /> Aliados
              </TabsTrigger>
            </TabsList>`;

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

content = content.replace(oldLayoutStart, newLayoutStart);

const oldEnding = `          </Tabs>
        </div>
      </main>
    </div>`;

const newEnding = `        </div>
      </main>
    </Tabs>`;

content = content.replace(oldEnding, newEnding);

const oldEditingStyle = 'bg-white border border-[#002b7f]/20 shadow-[0_20px_60px_-15px_rgba(0,43,127,0.15)] ring-1 ring-[#002b7f]/5 scale-[1.01] md:scale-[1.02] relative z-10 overflow-hidden';
const newEditingStyle = 'bg-white border border-slate-200 shadow-lg shadow-blue-500/5 scale-[1.01] relative z-10 overflow-hidden';
content = content.split(oldEditingStyle).join(newEditingStyle);

const oldFormPadding = 'rounded-[2rem]';
const newFormPadding = 'rounded-2xl';
content = content.split(oldFormPadding).join(newFormPadding);

content = content.split('bg-slate-50 border-slate-200').join('bg-white border-slate-200 shadow-sm');

fs.writeFileSync(path, content, 'utf8');
console.log('Done rewriting dashboard layout');
