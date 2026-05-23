"use client"

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BuildingIcon, LogOutIcon, CalendarIcon, ShieldCheckIcon, ImageIcon, NewspaperIcon, LayoutDashboardIcon, MapPinIcon, PhoneIcon, TrashIcon, PencilIcon, XIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Estados para Empresas
  const [nombre, setNombre] = useState('')
  const [rif, setRif] = useState('')
  const [rubro, setRubro] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [web, setWeb] = useState('')
  const [estatus, setEstatus] = useState('Activa')
  const [file, setFile] = useState<File | null>(null)
  const [editingEmpresaId, setEditingEmpresaId] = useState<number | null>(null)
  
  // Estados para Eventos
  const [tituloEvento, setTituloEvento] = useState('')
  const [descripcionEvento, setDescripcionEvento] = useState('')
  const [fechaEvento, setFechaEvento] = useState('')
  const [editingEventoId, setEditingEventoId] = useState<number | null>(null)
  
  // Estados para Noticias
  const [tituloNoticia, setTituloNoticia] = useState('')
  const [resumenNoticia, setResumenNoticia] = useState('')
  const [fileNoticia, setFileNoticia] = useState<File | null>(null)
  const [editingNoticiaId, setEditingNoticiaId] = useState<number | null>(null)

  // Estados para Aliados
  const [nombreAliado, setNombreAliado] = useState('')
  const [fileAliado, setFileAliado] = useState<File | null>(null)
  const [editingAliadoId, setEditingAliadoId] = useState<number | null>(null)

  // Estados para las Listas
  const [listaEmpresas, setListaEmpresas] = useState<any[]>([])
  const [listaEventos, setListaEventos] = useState<any[]>([])
  const [listaNoticias, setListaNoticias] = useState<any[]>([])
  const [listaAliados, setListaAliados] = useState<any[]>([])
  const [loadingListas, setLoadingListas] = useState(true)

  // Estados de carga y mensajes
  const [loading, setLoading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('') 
  const [msg, setMsg] = useState('')
  const [msgEvento, setMsgEvento] = useState('')
  const [msgNoticia, setMsgNoticia] = useState('')
  const [msgAliado, setMsgAliado] = useState('')
  
  // Referencias
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileNoticiaRef = useRef<HTMLInputElement>(null)
  const fileAliadoRef = useRef<HTMLInputElement>(null)

  const fetchData = async () => {
    const supabase = createClient()
    setLoadingListas(true)
    
    const { data: emp } = await supabase.from('empresas_afiliadas').select('*').order('id', { ascending: false })
    if (emp) setListaEmpresas(emp)

    const { data: eve } = await supabase.from('eventos').select('*').order('fecha_evento', { ascending: false })
    if (eve) setListaEventos(eve)

    const { data: not } = await supabase.from('noticias').select('*').order('fecha_publicacion', { ascending: false })
    if (not) setListaNoticias(not)

    const { data: ali } = await supabase.from('aliados').select('*').order('id', { ascending: false })
    if (ali) setListaAliados(ali)

    setLoadingListas(false)
  }

  useEffect(() => {
    const supabase = createClient()
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
      } else {
        setIsAuthenticated(true)
        fetchData()
      }
    }
    checkSession()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const handleDelete = async (id: number, tabla: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este registro permanentemente?')) return;
    const supabase = createClient()
    const { error } = await supabase.from(tabla).delete().eq('id', id)
    if (error) alert('Error eliminando: ' + error.message)
    else fetchData() // refrescar listas
  }

  const handleEditEmpresa = (empresa: any) => {
    setEditingEmpresaId(empresa.id)
    setNombre(empresa.nombre)
    setRif(empresa.rif)
    setRubro(empresa.rubro || '')
    setDireccion(empresa.direccion || '')
    setTelefono(empresa.telefono || '')
    setInstagram(empresa.instagram || '')
    setTiktok(empresa.tiktok || '')
    setWeb(empresa.web || '')
    setEstatus(empresa.estatus_membresia)
    setFile(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEditEvento = (evento: any) => {
    setEditingEventoId(evento.id)
    setTituloEvento(evento.titulo)
    setDescripcionEvento(evento.descripcion)
    setFechaEvento(evento.fecha_evento)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEditNoticia = (noticia: any) => {
    setEditingNoticiaId(noticia.id)
    setTituloNoticia(noticia.titulo)
    setResumenNoticia(noticia.resumen)
    setFileNoticia(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEditAliado = (aliado: any) => {
    setEditingAliadoId(aliado.id)
    setNombreAliado(aliado.nombre)
    setFileAliado(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // --- Handlers de Inserción/Actualización ---
  const handleAddEmpresa = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    setUploadStatus('')
    
    const supabase = createClient()
    let logo_url = null

    if (file) {
      setUploadStatus('Subiendo logotipo...')
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `empresas/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('media_institucional')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })

      if (uploadError) {
        setMsg(`❌ Error subiendo imagen: ${uploadError.message}`)
        setLoading(false)
        setUploadStatus('')
        return
      }

      const { data } = supabase.storage.from('media_institucional').getPublicUrl(filePath)
      logo_url = data.publicUrl
    }

    setUploadStatus('Guardando datos de la empresa...')
    
    const payload: any = { nombre, rif, rubro, direccion, telefono, instagram, tiktok, web, estatus_membresia: estatus }
    if (logo_url) payload.logo_url = logo_url

    let error;
    if (editingEmpresaId) {
      const res = await supabase.from('empresas_afiliadas').update(payload).eq('id', editingEmpresaId)
      error = res.error
    } else {
      const res = await supabase.from('empresas_afiliadas').insert([payload])
      error = res.error
    }

    if (error) {
      setMsg(`❌ Error: ${error.message}`)
    } else {
      setMsg(editingEmpresaId ? '✅ Empresa actualizada exitosamente.' : '✅ Empresa registrada exitosamente.')
      setNombre(''); setRif(''); setRubro(''); setDireccion(''); setTelefono(''); setInstagram(''); setTiktok(''); setWeb(''); setFile(null)
      setEditingEmpresaId(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      fetchData()
    }
    
    setLoading(false)
    setUploadStatus('')
  }

  const handleAddEvento = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsgEvento('')
    
    const supabase = createClient()
    const payload = { titulo: tituloEvento, descripcion: descripcionEvento, fecha_evento: fechaEvento }
    
    let error;
    if (editingEventoId) {
      const res = await supabase.from('eventos').update(payload).eq('id', editingEventoId)
      error = res.error
    } else {
      const res = await supabase.from('eventos').insert([payload])
      error = res.error
    }

    if (error) setMsgEvento(`❌ Error: ${error.message}`)
    else {
      setMsgEvento(editingEventoId ? '✅ Evento actualizado exitosamente.' : '✅ Evento agendado exitosamente.')
      setTituloEvento(''); setDescripcionEvento(''); setFechaEvento('')
      setEditingEventoId(null)
      fetchData()
    }
    setLoading(false)
  }

  const handleAddNoticia = async (e: React.FormEvent) => {
    // ... lógica idéntica anterior, omitida por brevedad visual, pero completamente funcional
    e.preventDefault()
    setLoading(true)
    setMsgNoticia('')
    setUploadStatus('Subiendo imagen de noticia...')
    
    const supabase = createClient()
    let imagen_url = null

    if (fileNoticia) {
      const fileExt = fileNoticia.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `noticias/${fileName}`
      const { error: uploadError } = await supabase.storage.from('media_institucional').upload(filePath, fileNoticia)
      if (uploadError) {
        setMsgNoticia(`❌ Error subiendo imagen: ${uploadError.message}`)
        setLoading(false)
        return
      }
      imagen_url = supabase.storage.from('media_institucional').getPublicUrl(filePath).data.publicUrl
    }

    setUploadStatus('Publicando noticia...')
    const payload: any = { titulo: tituloNoticia, resumen: resumenNoticia }
    if (imagen_url) payload.imagen_url = imagen_url

    let error;
    if (editingNoticiaId) {
      const res = await supabase.from('noticias').update(payload).eq('id', editingNoticiaId)
      error = res.error
    } else {
      const res = await supabase.from('noticias').insert([payload])
      error = res.error
    }

    if (error) setMsgNoticia(`❌ Error: ${error.message}`)
    else {
      setMsgNoticia(editingNoticiaId ? '✅ Noticia actualizada exitosamente.' : '✅ Noticia publicada exitosamente.')
      setTituloNoticia(''); setResumenNoticia(''); setFileNoticia(null)
      setEditingNoticiaId(null)
      if (fileNoticiaRef.current) fileNoticiaRef.current.value = ''
      fetchData()
    }
    setLoading(false); setUploadStatus('')
  }

  const handleAddAliado = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileAliado) { setMsgAliado('❌ Debes seleccionar el logo.'); return }
    setLoading(true); setMsgAliado(''); setUploadStatus('Subiendo logo...')
    
    const supabase = createClient()
    const fileExt = fileAliado.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `aliados/${fileName}`

    const { error: uploadError } = await supabase.storage.from('media_institucional').upload(filePath, fileAliado)
    if (uploadError) { setMsgAliado(`❌ Error: ${uploadError.message}`); setLoading(false); return }

    const logo_url = supabase.storage.from('media_institucional').getPublicUrl(filePath).data.publicUrl
    }
    
    setUploadStatus('Guardando aliado...')
    const payload: any = { nombre: nombreAliado }
    if (logo_url) payload.logo_url = logo_url

    let error;
    if (editingAliadoId) {
      const res = await supabase.from('aliados').update(payload).eq('id', editingAliadoId)
      error = res.error
    } else {
      const res = await supabase.from('aliados').insert([payload])
      error = res.error
    }

    if (error) setMsgAliado(`❌ Error: ${error.message}`)
    else {
      setMsgAliado(editingAliadoId ? '✅ Aliado actualizado exitosamente.' : '✅ Aliado agregado exitosamente.')
      setNombreAliado(''); setFileAliado(null)
      setEditingAliadoId(null)
      if (fileAliadoRef.current) fileAliadoRef.current.value = ''
      fetchData()
    }
    setLoading(false); setUploadStatus('')
  }

  if (!isAuthenticated) return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex items-center justify-center flex-col gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white font-medium">Verificando credenciales...</p>
    </div>
  )

  return (
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
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden p-6 md:p-12 relative">
        {/* Glow de fondo tenue */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Gestión de Contenido</h2>
            <p className="text-slate-500 font-medium mt-2">Agrega y administra la información pública del portal web.</p>
          </div>

          <Tabs defaultValue="empresas" className="w-full">
            {/* TABS ESTILO NAVEGACIÓN MODERNA */}
            <TabsList className="flex flex-wrap w-full md:w-auto h-auto bg-transparent border-b border-slate-200 rounded-none mb-10 gap-8 justify-start p-0">
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
            </TabsList>

            {/* CONTENIDO EMPRESAS (Rediseñado en tarjetas) */}
            <TabsContent value="empresas">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <form onSubmit={handleAddEmpresa} className="space-y-8">
                  
                  {/* Tarjeta: Información Principal */}
                  <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden">
                    <CardHeader className="border-b border-slate-100 bg-white pb-6 pt-8 px-8">
                      <CardTitle className="text-xl font-bold text-slate-900 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BuildingIcon className="w-5 h-5 text-blue-600" /> {editingEmpresaId ? 'Editar Empresa' : 'Registrar Nueva Empresa'}
                        </div>
                        {editingEmpresaId && (
                          <Button type="button" variant="ghost" onClick={() => { setEditingEmpresaId(null); setNombre(''); setRif(''); setRubro(''); setDireccion(''); setTelefono(''); setInstagram(''); setTiktok(''); setWeb(''); setFile(null); }} className="text-slate-500 hover:text-slate-700 font-bold flex items-center gap-2">
                            <XIcon className="w-4 h-4" /> Cancelar Edición
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Razón Social o Nombre Comercial</Label>
                        <Input required value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej. Manufacturas Aragua C.A." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">RIF Empresarial</Label>
                        <Input required value={rif} onChange={e => setRif(e.target.value)} placeholder="J-12345678-9" className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Rubro Sectorial</Label>
                        <Input required value={rubro} onChange={e => setRubro(e.target.value)} placeholder="Ej. Metalmecánica, Textil..." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Estatus de Membresía</Label>
                        <select 
                          value={estatus} 
                          onChange={e => setEstatus(e.target.value)} 
                          className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#002b7f] text-slate-700"
                          disabled={loading}
                        >
                          <option value="Activa">🟢 Membresía Activa</option>
                          <option value="Pendiente">🟡 Trámite Pendiente</option>
                          <option value="Inactiva">🔴 Membresía Inactiva</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tarjeta: Contacto e Identidad */}
                  <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden">
                    <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
                      
                      {/* Columna de Contacto */}
                      <div className="space-y-8">
                        <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-2">Contacto y Ubicación</h3>
                        <div className="space-y-3">
                          <Label className="text-slate-700 font-bold flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-slate-400" /> Teléfono</Label>
                          <Input value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="0243-5550000" className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-slate-700 font-bold flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-slate-400" /> Dirección Física</Label>
                          <Input required value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Ej. Zona Industrial San Vicente..." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-slate-700 font-bold flex items-center gap-2">
                            <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                            Instagram <span className="text-xs text-slate-400 font-normal">(Opcional)</span>
                          </Label>
                          <Input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@tuempresa" className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-slate-700 font-bold flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                            TikTok <span className="text-xs text-slate-400 font-normal">(Opcional)</span>
                          </Label>
                          <Input value={tiktok} onChange={e => setTiktok(e.target.value)} placeholder="@tuempresa" className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-slate-700 font-bold flex items-center gap-2">
                            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            Página Web <span className="text-xs text-slate-400 font-normal">(Opcional)</span>
                          </Label>
                          <Input value={web} onChange={e => setWeb(e.target.value)} placeholder="www.tuempresa.com" className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                        </div>
                      </div>

                      {/* Columna de Imagen */}
                      <div className="space-y-8 md:border-l md:border-slate-100 md:pl-8">
                        <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-2">Identidad Visual</h3>
                        <div className="space-y-4">
                          <Label className="text-slate-700 font-bold flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-400" /> Logotipo de la Empresa</Label>
                          <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 p-6 flex flex-col items-center justify-center text-center transition-colors hover:bg-slate-100 hover:border-[#002b7f]/50 group relative">
                            <ImageIcon className="w-10 h-10 text-slate-300 mb-3 group-hover:text-[#002b7f] transition-colors" />
                            <p className="text-sm font-bold text-slate-700">Haz clic para buscar archivo</p>
                            <p className="text-xs text-slate-400 mt-1">PNG o JPG. Formato cuadrado recomendado.</p>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={e => setFile(e.target.files?.[0] || null)}
                              ref={fileInputRef}
                              disabled={loading}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {file && <div className="mt-4 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">{file.name}</div>}
                          </div>
                        </div>
                      </div>

                    </CardContent>
                    
                    {/* Botonera de Acción */}
                    <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="w-full">
                        {msg && <div className={`p-4 rounded-xl font-bold text-sm ${msg.includes('❌') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>{msg}</div>}
                        {loading && uploadStatus && <div className="text-sm font-bold text-[#002b7f] mt-2 flex items-center gap-2"><div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> {uploadStatus}</div>}
                      </div>
                      <Button type="submit" disabled={loading} className="w-full md:w-auto bg-[#002b7f] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all text-base flex-shrink-0">
                        {loading ? 'Procesando...' : (editingEmpresaId ? 'Guardar Cambios' : 'Guardar Empresa')}
                      </Button>
                    </div>
                  </Card>

                </form>

                {/* LISTA DE EMPRESAS */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Directorio de Empresas</h3>
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    {loadingListas ? (
                      <div className="p-8 text-center text-slate-500 font-medium animate-pulse">Cargando registros...</div>
                    ) : listaEmpresas.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 font-medium">No hay empresas registradas.</div>
                    ) : (
                      <ul className="divide-y divide-slate-100">
                        {listaEmpresas.map(emp => (
                          <li key={emp.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
                                {emp.logo_url ? <img src={emp.logo_url} className="w-full h-full object-cover" alt="Logo" /> : <BuildingIcon className="w-5 h-5 text-slate-300" />}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 text-lg leading-tight">{emp.nombre}</h4>
                                <p className="text-sm text-slate-500 font-medium">{emp.rubro} • <span className={emp.estatus_membresia === 'Activa' ? 'text-emerald-600' : 'text-slate-500'}>{emp.estatus_membresia}</span></p>
                              </div>
                            </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" onClick={() => handleEditEmpresa(emp)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl h-12 w-12 p-0 flex-shrink-0">
                                  <PencilIcon className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" onClick={() => handleDelete(emp.id, 'empresas_afiliadas')} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-12 w-12 p-0 flex-shrink-0">
                                  <TrashIcon className="w-5 h-5" />
                                </Button>
                              </div>
                            </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

              </motion.div>
            </TabsContent>

            {/* CONTENIDO EVENTOS */}
            <TabsContent value="eventos">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden">
                  <CardHeader className="border-b border-slate-100 bg-white pb-6 pt-8 px-8">
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-emerald-600" /> {editingEventoId ? 'Editar Evento' : 'Agendar Nuevo Evento'}
                      </div>
                      {editingEventoId && (
                        <Button type="button" variant="ghost" onClick={() => { setEditingEventoId(null); setTituloEvento(''); setDescripcionEvento(''); setFechaEvento(''); }} className="text-slate-500 hover:text-slate-700 font-bold flex items-center gap-2">
                          <XIcon className="w-4 h-4" /> Cancelar Edición
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6 bg-white">
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Título del Evento</Label>
                      <Input required value={tituloEvento} onChange={e => setTituloEvento(e.target.value)} placeholder="Ej. Asamblea Anual 2026..." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Fecha del Evento</Label>
                      <Input required type="date" value={fechaEvento} onChange={e => setFechaEvento(e.target.value)} className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Descripción Corta</Label>
                      <textarea required value={descripcionEvento} onChange={e => setDescripcionEvento(e.target.value)} placeholder="Breve descripción del evento..." className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002b7f] min-h-[100px] resize-y" disabled={loading} />
                    </div>
                  </CardContent>
                  <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full">
                      {msgEvento && <div className={`p-4 rounded-xl font-bold text-sm ${msgEvento.includes('❌') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>{msgEvento}</div>}
                    </div>
                    <Button onClick={handleAddEvento} disabled={loading} className="w-full md:w-auto bg-[#002b7f] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all text-base flex-shrink-0">
                      {loading ? 'Procesando...' : (editingEventoId ? 'Guardar Cambios' : 'Agendar Evento')}
                    </Button>
                  </div>
                </Card>

                {/* LISTA DE EVENTOS */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Eventos Programados</h3>
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    {loadingListas ? (
                      <div className="p-8 text-center text-slate-500 font-medium animate-pulse">Cargando registros...</div>
                    ) : listaEventos.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 font-medium">No hay eventos programados.</div>
                    ) : (
                      <ul className="divide-y divide-slate-100">
                        {listaEventos.map(eve => (
                          <li key={eve.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex flex-col items-center justify-center border border-emerald-100 text-emerald-700 font-bold">
                                <span className="text-xs uppercase">{new Date(eve.fecha_evento).toLocaleDateString('es-VE', { month: 'short' })}</span>
                                <span className="text-lg leading-none">{new Date(eve.fecha_evento).getDate()}</span>
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 text-lg leading-tight">{eve.titulo}</h4>
                                <p className="text-sm text-slate-500 font-medium line-clamp-1">{eve.descripcion}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" onClick={() => handleEditEvento(eve)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl h-12 w-12 p-0 flex-shrink-0">
                                <PencilIcon className="w-5 h-5" />
                              </Button>
                              <Button variant="ghost" onClick={() => handleDelete(eve.id, 'eventos')} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-12 w-12 p-0 flex-shrink-0">
                                <TrashIcon className="w-5 h-5" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

              </motion.div>
            </TabsContent>

            {/* CONTENIDO NOTICIAS */}
            <TabsContent value="noticias">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden">
                  <CardHeader className="border-b border-slate-100 bg-white pb-6 pt-8 px-8">
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <NewspaperIcon className="w-5 h-5 text-blue-600" /> {editingNoticiaId ? 'Editar Noticia' : 'Publicar Noticia'}
                      </div>
                      {editingNoticiaId && (
                        <Button type="button" variant="ghost" onClick={() => { setEditingNoticiaId(null); setTituloNoticia(''); setResumenNoticia(''); setFileNoticia(null); }} className="text-slate-500 hover:text-slate-700 font-bold flex items-center gap-2">
                          <XIcon className="w-4 h-4" /> Cancelar Edición
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6 bg-white">
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Título de la Noticia</Label>
                      <Input required value={tituloNoticia} onChange={e => setTituloNoticia(e.target.value)} placeholder="Ej. Fedeindustria firma nueva alianza con..." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Resumen / Contenido Breve</Label>
                      <textarea required value={resumenNoticia} onChange={e => setResumenNoticia(e.target.value)} placeholder="Escribe el resumen de la noticia aquí..." className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002b7f] min-h-[120px] resize-y" disabled={loading} />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-400" /> Imagen Destacada</Label>
                      <Input type="file" accept="image/*" onChange={e => setFileNoticia(e.target.files?.[0] || null)} ref={fileNoticiaRef} disabled={loading} className="h-12 bg-slate-50 cursor-pointer pt-3 rounded-xl border-slate-200" />
                    </div>
                  </CardContent>
                  <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full">
                      {msgNoticia && <div className={`p-4 rounded-xl font-bold text-sm ${msgNoticia.includes('❌') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>{msgNoticia}</div>}
                    </div>
                    <Button onClick={handleAddNoticia} disabled={loading} className="w-full md:w-auto bg-[#002b7f] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all text-base flex-shrink-0">
                      {loading ? 'Procesando...' : (editingNoticiaId ? 'Guardar Cambios' : 'Publicar Noticia')}
                    </Button>
                  </div>
                </Card>

                {/* LISTA DE NOTICIAS */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Noticias Publicadas</h3>
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    {loadingListas ? (
                      <div className="p-8 text-center text-slate-500 font-medium animate-pulse">Cargando registros...</div>
                    ) : listaNoticias.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 font-medium">No hay noticias publicadas.</div>
                    ) : (
                      <ul className="divide-y divide-slate-100">
                        {listaNoticias.map(not => (
                          <li key={not.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                {not.imagen_url ? <img src={not.imagen_url} className="w-full h-full object-cover" alt="Noticia" /> : <NewspaperIcon className="w-5 h-5 text-slate-300 m-auto h-full" />}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 text-base leading-tight line-clamp-1">{not.titulo}</h4>
                                <p className="text-xs text-slate-400 font-medium">{new Date(not.fecha_publicacion).toLocaleDateString('es-VE')}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" onClick={() => handleEditNoticia(not)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl h-12 w-12 p-0 flex-shrink-0">
                                <PencilIcon className="w-5 h-5" />
                              </Button>
                              <Button variant="ghost" onClick={() => handleDelete(not.id, 'noticias')} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-12 w-12 p-0 flex-shrink-0">
                                <TrashIcon className="w-5 h-5" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

              </motion.div>
            </TabsContent>

            {/* CONTENIDO ALIADOS */}
            <TabsContent value="aliados">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden">
                  <CardHeader className="border-b border-slate-100 bg-white pb-6 pt-8 px-8">
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-blue-600" /> {editingAliadoId ? 'Editar Aliado' : 'Registrar Nuevo Aliado'}
                      </div>
                      {editingAliadoId && (
                        <Button type="button" variant="ghost" onClick={() => { setEditingAliadoId(null); setNombreAliado(''); setFileAliado(null); }} className="text-slate-500 hover:text-slate-700 font-bold flex items-center gap-2">
                          <XIcon className="w-4 h-4" /> Cancelar Edición
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6 bg-white">
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Nombre de la Institución o Marca</Label>
                      <Input required value={nombreAliado} onChange={e => setNombreAliado(e.target.value)} placeholder="Ej. Banesco, Movilnet..." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-400" /> Logo Oficial</Label>
                      <Input type="file" accept="image/*" onChange={e => setFileAliado(e.target.files?.[0] || null)} ref={fileAliadoRef} disabled={loading} className="h-12 bg-slate-50 cursor-pointer pt-3 rounded-xl border-slate-200" />
                    </div>
                  </CardContent>
                  <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full">
                      {msgAliado && <div className={`p-4 rounded-xl font-bold text-sm ${msgAliado.includes('❌') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>{msgAliado}</div>}
                    </div>
                    <Button onClick={handleAddAliado} disabled={loading} className="w-full md:w-auto bg-[#002b7f] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all text-base flex-shrink-0">
                      {loading ? 'Procesando...' : (editingAliadoId ? 'Guardar Cambios' : 'Agregar Aliado')}
                    </Button>
                  </div>
                </Card>

                {/* LISTA DE ALIADOS */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Aliados Estratégicos</h3>
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    {loadingListas ? (
                      <div className="p-8 text-center text-slate-500 font-medium animate-pulse">Cargando registros...</div>
                    ) : listaAliados.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 font-medium">No hay aliados registrados.</div>
                    ) : (
                      <ul className="divide-y divide-slate-100">
                        {listaAliados.map(ali => (
                          <li key={ali.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-10 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center p-1 border border-slate-200">
                                <img src={ali.logo_url} className="w-full h-full object-contain" alt="Logo Aliado" />
                              </div>
                              <h4 className="font-bold text-slate-900">{ali.nombre}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" onClick={() => handleEditAliado(ali)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl h-12 w-12 p-0 flex-shrink-0">
                                <PencilIcon className="w-5 h-5" />
                              </Button>
                              <Button variant="ghost" onClick={() => handleDelete(ali.id, 'aliados')} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-12 w-12 p-0 flex-shrink-0">
                                <TrashIcon className="w-5 h-5" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

              </motion.div>
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  )
}
