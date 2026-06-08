const fs = require('fs');
const path = 'src/app/admin/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add state for selectedMedios
if (!content.includes('const [selectedMedios')) {
  content = content.replace(
    /const \[msgMedios, setMsgMedios\] = useState\(\'\'\)/,
    'const [msgMedios, setMsgMedios] = useState(\'\')\n  const [selectedMedios, setSelectedMedios] = useState<string[]>([])'
  );
}

// 2. Add handleBulkDeleteMedios
if (!content.includes('const handleBulkDeleteMedios')) {
  const bulkDeleteCode = `
  const handleBulkDeleteMedios = async () => {
    if (selectedMedios.length === 0) return;
    if (!confirm(\`¿Estás seguro de eliminar \${selectedMedios.length} archivos seleccionados permanentemente?\`)) return;
    setLoadingMedios(true);
    const supabase = createClient();
    const { error } = await supabase.storage.from('media_institucional').remove(selectedMedios);
    if (error) {
      alert('Error eliminando: ' + error.message);
      setLoadingMedios(false);
    } else {
      setSelectedMedios([]);
      fetchMedios();
    }
  }

  const toggleMedioSelection = (path: string) => {
    setSelectedMedios(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    )
  }
`;
  content = content.replace(
    /const handleDeleteMedio = async/,
    bulkDeleteCode + '\n  const handleDeleteMedio = async'
  );
}

// 3. Update the Medios UI block
const oldUI = `                <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                </div>`;

const newUI = `                <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 tracking-tight">
                      Galería de Medios <span className="bg-[#002b7f]/10 text-[#002b7f] text-xs font-bold px-2.5 py-1 rounded-full ml-2">{listaMedios.length} archivos</span>
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Visualiza y elimina los archivos subidos al servidor (imágenes, videos).</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedMedios.length > 0 && (
                      <Button onClick={handleBulkDeleteMedios} className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl h-11 px-5 flex gap-2 items-center shadow-lg shadow-red-500/20 transition-all">
                        <TrashIcon className="w-4 h-4" /> Eliminar {selectedMedios.length}
                      </Button>
                    )}
                    <Button onClick={() => { setSelectedMedios([]); fetchMedios(); }} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl h-11 px-5 flex gap-2 items-center transition-all">
                      Actualizar
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 bg-slate-50/50 flex-1">
                  {loadingMedios ? (
                    <div className="flex justify-center py-20 text-slate-500 font-medium animate-pulse">Cargando biblioteca de medios...</div>
                  ) : listaMedios.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 font-medium">No hay archivos multimedia.</div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {listaMedios.map((file, i) => {
                        const isSelected = selectedMedios.includes(file.path);
                        return (
                        <div key={i} onClick={() => toggleMedioSelection(file.path)} className={\`group cursor-pointer relative bg-white border-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all aspect-square flex flex-col \${isSelected ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200'}\`}>
                          
                          {/* Checkbox Overlay */}
                          <div className="absolute top-3 left-3 z-20">
                            <div className={\`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all \${isSelected ? 'bg-red-500 border-red-500 text-white' : 'bg-white/80 border-slate-300 text-transparent'}\`}>
                              <CheckCircleIcon className="w-4 h-4" />
                            </div>
                          </div>

                          <div className="flex-1 bg-slate-100 relative overflow-hidden flex items-center justify-center p-2">
                            {file.metadata?.mimetype?.startsWith('video/') ? (
                              <video src={file.url} className="w-full h-full object-cover rounded-xl" muted />
                            ) : (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={file.url} className="w-full h-full object-contain drop-shadow-sm" alt={file.name} loading="lazy" />
                            )}
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                              <a href={file.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="bg-white text-slate-900 rounded-full p-2 hover:scale-110 transition-transform shadow-lg" title="Ver original">
                                <ImageIcon className="w-4 h-4" />
                              </a>
                              <button onClick={(e) => { e.stopPropagation(); handleDeleteMedio(file.path); }} className="bg-red-500 text-white rounded-full p-2 hover:scale-110 transition-transform shadow-lg" title="Eliminar archivo">
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
                      )})}
                    </div>
                  )}
                </div>`;

content = content.replace(oldUI, newUI);
fs.writeFileSync(path, content);
console.log('Bulk delete logic injected.');
