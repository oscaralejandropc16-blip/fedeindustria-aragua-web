const fs = require('fs');
const path = 'src/app/admin/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add FolderOpenIcon to imports
content = content.replace(
  /import { BuildingIcon, LogOutIcon, (.*?) } from 'lucide-react'/,
  'import { BuildingIcon, LogOutIcon, $1, FolderOpenIcon } from \'lucide-react\''
);

// 2. Add states for Medios
if (!content.includes('const [listaMedios')) {
  content = content.replace(
    /const \[loadingListas, setLoadingListas\] = useState\(true\)/,
    'const [loadingListas, setLoadingListas] = useState(true)\n\n  // Estados para Medios (Galería Global)\n  const [listaMedios, setListaMedios] = useState<any[]>([])\n  const [loadingMedios, setLoadingMedios] = useState(false)\n  const [msgMedios, setMsgMedios] = useState(\'\')'
  );
}

// 3. Add fetchMedios and handleDeleteMedio
if (!content.includes('const fetchMedios')) {
  const fetchMediosCode = `
  const fetchMedios = async () => {
    setLoadingMedios(true)
    const supabase = createClient()
    const carpetas = ['', 'empresas', 'eventos', 'noticias', 'noticias/galeria', 'aliados', 'videos', 'imagenes', 'directiva']
    let todosLosArchivos: any[] = []

    for (const carpeta of carpetas) {
      const { data, error } = await supabase.storage.from('media_institucional').list(carpeta, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      })
      
      if (data) {
        const archivos = data.filter(f => f.id && f.name !== '.emptyFolderPlaceholder')
        archivos.forEach(file => {
          const path = carpeta === '' ? file.name : \`\${carpeta}/\${file.name}\`
          const url = supabase.storage.from('media_institucional').getPublicUrl(path).data.publicUrl
          todosLosArchivos.push({ ...file, path, url, carpeta: carpeta === '' ? 'raíz' : carpeta })
        })
      }
    }
    
    todosLosArchivos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    setListaMedios(todosLosArchivos)
    setLoadingMedios(false)
  }

  const handleDeleteMedio = async (path: string) => {
    if (!confirm('¿Estás seguro de eliminar permanentemente este archivo? Se romperán las imágenes en la web si está en uso.')) return;
    const supabase = createClient()
    const { error } = await supabase.storage.from('media_institucional').remove([path])
    if (error) {
      alert('Error eliminando: ' + error.message)
    } else {
      fetchMedios()
    }
  }
`;
  content = content.replace(
    /const fetchData = async \(\) => {/,
    fetchMediosCode + '\n  const fetchData = async () => {'
  );
}

// 4. Add TabsTrigger
if (!content.includes('value="medios"')) {
  const tabTrigger = `
          <TabsTrigger value="medios" className="w-full justify-start gap-3 px-4 py-3.5 h-auto rounded-xl data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent data-[state=active]:border-blue-100" onClick={() => fetchMedios()}>
            <FolderOpenIcon className="w-5 h-5" /> Galería de Medios
          </TabsTrigger>
`;
  content = content.replace(
    /<TabsTrigger value="solicitudes"/,
    tabTrigger + '          <TabsTrigger value="solicitudes"'
  );
}

// 5. Add TabsContent
if (!content.includes('CONTENIDO MEDIOS')) {
  const tabContent = `
            {/* CONTENIDO MEDIOS */}
            <TabsContent value="medios" className="mt-0 outline-none">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-[#002b7f]/5 overflow-hidden flex flex-col min-h-[600px]">
                <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 tracking-tight">
                      Galería de Medios <span className="bg-[#002b7f]/10 text-[#002b7f] text-xs font-bold px-2.5 py-1 rounded-full ml-2">{listaMedios.length} archivos</span>
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Visualiza y elimina los archivos subidos al servidor (imágenes, videos).</p>
                  </div>
                  <Button onClick={fetchMedios} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl h-11 px-5 flex gap-2 items-center transition-all">
                    Actualizar
                  </Button>
                </div>
                
                <div className="p-6 bg-slate-50/50 flex-1">
                  {loadingMedios ? (
                    <div className="flex justify-center py-20 text-slate-500 font-medium animate-pulse">Cargando biblioteca de medios...</div>
                  ) : listaMedios.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 font-medium">No hay archivos multimedia.</div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {listaMedios.map((file, i) => (
                        <div key={i} className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all aspect-square flex flex-col">
                          <div className="flex-1 bg-slate-100 relative overflow-hidden flex items-center justify-center p-2">
                            {file.metadata?.mimetype?.startsWith('video/') ? (
                              <video src={file.url} className="w-full h-full object-cover rounded-xl" muted />
                            ) : (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={file.url} className="w-full h-full object-contain drop-shadow-sm" alt={file.name} loading="lazy" />
                            )}
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                              <a href={file.url} target="_blank" rel="noreferrer" className="bg-white text-slate-900 rounded-full p-2 hover:scale-110 transition-transform shadow-lg" title="Ver original">
                                <ImageIcon className="w-4 h-4" />
                              </a>
                              <button onClick={() => handleDeleteMedio(file.path)} className="bg-red-500 text-white rounded-full p-2 hover:scale-110 transition-transform shadow-lg" title="Eliminar archivo">
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="p-3 border-t border-slate-100 bg-white">
                            <p className="text-xs font-bold text-slate-800 truncate" title={file.name}>{file.name}</p>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-[10px] font-bold text-[#002b7f] uppercase tracking-wider bg-blue-50 px-1.5 py-0.5 rounded">{file.carpeta}</p>
                              <p className="text-[10px] text-slate-400 font-medium">{((file.metadata?.size || 0) / 1024).toFixed(0)} KB</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
`;
  content = content.replace(
    /\{\/\* MÓDULO DE SOLICITUDES DE AFILIACIÓN \*\//,
    tabContent + '\n            {/* MÓDULO DE SOLICITUDES DE AFILIACIÓN */'
  );
}

fs.writeFileSync(path, content);
console.log('Medios gallery added successfully.');
