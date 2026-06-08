const fs = require('fs');
const path = 'src/app/admin/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add state for ConfirmModal
if (!content.includes('const [confirmModal')) {
  content = content.replace(
    /const \[msgMedios, setMsgMedios\] = useState\(\'\'\)/,
    'const [msgMedios, setMsgMedios] = useState(\'\')\n  // Estado para Modal Global\n  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, title: string, message: string, onConfirm: () => void}>({ isOpen: false, title: \'\', message: \'\', onConfirm: () => {} });'
  );
}

// 2. Replace handleDelete
content = content.replace(
  /const handleDelete = async \(id: number, tabla: string\) => \{\s*if \(\!confirm\('¿Estás seguro de eliminar este registro\?'\)\) return\s*const supabase = createClient\(\)\s*const \{ error \} = await supabase\.from\(tabla\)\.delete\(\)\.eq\('id', id\)\s*if \(error\) alert\('Error: ' \+ error\.message\)\s*else fetchData\(\)\s*\}/,
  `const handleDelete = (id: number, tabla: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Eliminar Registro',
      message: '¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.',
      onConfirm: async () => {
        const supabase = createClient()
        const { error } = await supabase.from(tabla).delete().eq('id', id)
        if (error) alert('Error: ' + error.message)
        else fetchData()
      }
    });
  }`
);

// 3. Replace handleDeleteMedio
content = content.replace(
  /const handleDeleteMedio = async \(path: string\) => \{\s*if \(\!confirm\('¿Estás seguro de eliminar permanentemente este archivo\? Se romperán las imágenes en la web si está en uso\.'\)\) return;\s*const supabase = createClient\(\)\s*const \{ error \} = await supabase\.storage\.from\('media_institucional'\)\.remove\(\[path\]\)\s*if \(error\) \{\s*alert\('Error eliminando: ' \+ error\.message\)\s*\} else \{\s*fetchMedios\(\)\s*\}\s*\}/,
  `const handleDeleteMedio = (path: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Eliminar Archivo',
      message: '¿Estás seguro de eliminar permanentemente este archivo? Se romperán las imágenes en la web si está en uso.',
      onConfirm: async () => {
        const supabase = createClient()
        const { error } = await supabase.storage.from('media_institucional').remove([path])
        if (error) {
          alert('Error eliminando: ' + error.message)
        } else {
          fetchMedios()
        }
      }
    });
  }`
);

// 4. Replace handleBulkDeleteMedios
content = content.replace(
  /const handleBulkDeleteMedios = async \(\) => \{\s*if \(selectedMedios\.length === 0\) return;\s*if \(\!confirm\(\`¿Estás seguro de eliminar \$\{selectedMedios\.length\} archivos seleccionados permanentemente\?\`\)\) return;\s*setLoadingMedios\(true\);\s*const supabase = createClient\(\);\s*const \{ error \} = await supabase\.storage\.from\('media_institucional'\)\.remove\(selectedMedios\);\s*if \(error\) \{\s*alert\('Error eliminando: ' \+ error\.message\);\s*setLoadingMedios\(false\);\s*\} else \{\s*setSelectedMedios\(\[\]\);\s*fetchMedios\(\);\s*\}\s*\}/,
  `const handleBulkDeleteMedios = () => {
    if (selectedMedios.length === 0) return;
    setConfirmModal({
      isOpen: true,
      title: 'Eliminación Masiva',
      message: \`¿Estás seguro de eliminar \${selectedMedios.length} archivos seleccionados permanentemente?\`,
      onConfirm: async () => {
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
    });
  }`
);

// 5. Add Modal HTML before closing tag
if (!content.includes('GLOBAL CONFIRM MODAL')) {
  const modalHTML = `
      {/* GLOBAL CONFIRM MODAL */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md border border-slate-100"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrashIcon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">{confirmModal.title}</h3>
                <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                  {confirmModal.message}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                    className="h-12 px-6 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={() => {
                      confirmModal.onConfirm();
                      setConfirmModal({ ...confirmModal, isOpen: false });
                    }}
                    className="h-12 px-6 rounded-xl font-bold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
                  >
                    Sí, Eliminar
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
`;
  content = content.replace(/<\/div>\s*\)\s*}\s*$/, modalHTML);
}

fs.writeFileSync(path, content);
console.log('Custom modal added successfully.');
