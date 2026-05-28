"use client"

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BuildingIcon, LogOutIcon, CalendarIcon, ShieldCheckIcon, ImageIcon, NewspaperIcon, LayoutDashboardIcon, MapPinIcon, PhoneIcon, TrashIcon, PencilIcon, XIcon, GripVerticalIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from '@/components/SortableItem'

export default function Dashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Estados para Empresas
  const [nombre, setNombre] = useState('')
  const [rif, setRif] = useState('')
  const [rubro, setRubro] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  const [telefono2, setTelefono2] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [web, setWeb] = useState('')
  const [estatus, setEstatus] = useState('Activa')
  const [ordenEmpresa, setOrdenEmpresa] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [currentImagenEmpresa, setCurrentImagenEmpresa] = useState<string | null>(null)
  const [editingEmpresaId, setEditingEmpresaId] = useState<number | null>(null)
  
  // Estados para Eventos
  const [tituloEvento, setTituloEvento] = useState('')
  const [descripcionEvento, setDescripcionEvento] = useState('')
  const [fechaEvento, setFechaEvento] = useState('')
  const [fechaEventoFin, setFechaEventoFin] = useState('')
  const [ubicacionEvento, setUbicacionEvento] = useState('')
  const [linkDetallesEvento, setLinkDetallesEvento] = useState('')
  const [linkMapaEvento, setLinkMapaEvento] = useState('')
  const [ordenEvento, setOrdenEvento] = useState(0)
  const [editingEventoId, setEditingEventoId] = useState<number | null>(null)
  const [fileEvento, setFileEvento] = useState<File | null>(null)
  const [currentImagenEvento, setCurrentImagenEvento] = useState<string | null>(null)
  const fileEventoRef = useRef<HTMLInputElement>(null)
  
  // Estados para Noticias
  const [tituloNoticia, setTituloNoticia] = useState('')
  const [resumenNoticia, setResumenNoticia] = useState('')
  const [contenidoCompletoNoticia, setContenidoCompletoNoticia] = useState('')
  const [fileNoticia, setFileNoticia] = useState<File | null>(null)
  const [currentImagenNoticia, setCurrentImagenNoticia] = useState<string | null>(null)
  const [galeriaNoticia, setGaleriaNoticia] = useState<File[]>([])
  const [currentGaleriaNoticia, setCurrentGaleriaNoticia] = useState<string[]>([])
  const [ordenNoticia, setOrdenNoticia] = useState(0)
  const [fechaPublicacionNoticia, setFechaPublicacionNoticia] = useState('')
  const [editingNoticiaId, setEditingNoticiaId] = useState<number | null>(null)

  // Estados para Aliados
  const [nombreAliado, setNombreAliado] = useState('')
  const [fileAliado, setFileAliado] = useState<File | null>(null)
  const [currentImagenAliado, setCurrentImagenAliado] = useState<string | null>(null)
  const [ordenAliado, setOrdenAliado] = useState(0)
  const [editingAliadoId, setEditingAliadoId] = useState<number | null>(null)

  // Estados para Config Home
  const [homeTitulo, setHomeTitulo] = useState('Conectamos el Futuro de la Industria')
  const [homeSubtitulo, setHomeSubtitulo] = useState('Únete a la red empresarial más sólida de la región central. Innovación, representación y crecimiento para tu empresa.')
  const [homeVideoUrl, setHomeVideoUrl] = useState('/video-industrial.mp4')
  const [fileHomeVideo, setFileHomeVideo] = useState<File | null>(null)
  const fileHomeVideoRef = useRef<HTMLInputElement>(null)

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
  const galeriaNoticiaRef = useRef<HTMLInputElement>(null)
  const fileAliadoRef = useRef<HTMLInputElement>(null)

  const fetchData = async () => {
    const supabase = createClient()
    setLoadingListas(true)
    
    const { data: emp } = await supabase.from('empresas_afiliadas').select('*').order('orden', { ascending: true }).order('id', { ascending: false })
    if (emp) setListaEmpresas(emp)

    const { data: eve } = await supabase.from('eventos').select('*').order('orden', { ascending: true }).order('fecha', { ascending: false })
    if (eve) setListaEventos(eve)

    const { data: not } = await supabase.from('noticias').select('*').order('orden', { ascending: true }).order('fecha_publicacion', { ascending: false })
    if (not) setListaNoticias(not)

    const { data: ali } = await supabase.from('aliados').select('*').order('orden', { ascending: true }).order('id', { ascending: false })
    if (ali) setListaAliados(ali)

    const { data: configHomeData } = await supabase.from('configuracion_home').select('*').eq('id', 1).single()
    if (configHomeData) {
      setHomeTitulo(configHomeData.titulo)
      setHomeSubtitulo(configHomeData.subtitulo)
      setHomeVideoUrl(configHomeData.video_url)
    }

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

  const scrollToTop = () => {
    const mainEl = document.getElementById('dashboard-main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const handleEditEmpresa = (empresa: any) => {
    setEditingEmpresaId(empresa.id)
    setNombre(empresa.nombre)
    setRif(empresa.rif)
    setRubro(empresa.rubro || '')
    setDireccion(empresa.direccion || '')
    const [tel1, tel2] = (empresa.telefono || '').split(' / ')
    setTelefono(tel1 || '')
    setTelefono2(tel2 || '')
    setInstagram(empresa.instagram || '')
    setTiktok(empresa.tiktok || '')
    setWeb(empresa.web || '')
    setEstatus(empresa.estatus_membresia)
    setOrdenEmpresa(empresa.orden || 0)
    setFile(null)
    setCurrentImagenEmpresa(empresa.logo_url || null)
    scrollToTop()
  }

  const handleEditEvento = (evento: any) => {
    setEditingEventoId(evento.id)
    setTituloEvento(evento.titulo)
    setDescripcionEvento(evento.descripcion)
    setFechaEvento(evento.fecha)
    setFechaEventoFin(evento.fecha_fin || '')
    setUbicacionEvento(evento.ubicacion || '')
    setLinkDetallesEvento(evento.link_detalles || '')
    setLinkMapaEvento(evento.link_mapa || '')
    setOrdenEvento(evento.orden || 0)
    setCurrentImagenEvento(evento.imagen_url || null)
    setFileEvento(null)
    scrollToTop()
  }

  const handleEditNoticia = (noticia: any) => {
    setEditingNoticiaId(noticia.id)
    setTituloNoticia(noticia.titulo)
    setResumenNoticia(noticia.resumen || '')
    setContenidoCompletoNoticia(noticia.contenido_completo || '')
    setOrdenNoticia(noticia.orden || 0)
    setFechaPublicacionNoticia(noticia.fecha_publicacion ? noticia.fecha_publicacion.split('T')[0] : '')
    setFileNoticia(null)
    setCurrentImagenNoticia(noticia.imagen_url)
    setGaleriaNoticia([])
    setCurrentGaleriaNoticia(noticia.galeria_urls || [])
    scrollToTop()
  }

  const handleEditAliado = (aliado: any) => {
    setEditingAliadoId(aliado.id)
    setNombreAliado(aliado.nombre)
    setOrdenAliado(aliado.orden || 0)
    setFileAliado(null)
    setCurrentImagenAliado(aliado.logo_url)
    scrollToTop()
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
    
    const combinedTelefono = [telefono, telefono2].filter(t => t && t.trim() !== '').join(' / ')
    const payload: any = { nombre, rif, rubro, direccion, telefono: combinedTelefono, instagram, tiktok, web, estatus_membresia: estatus, orden: ordenEmpresa }
    if (logo_url !== null) {
      payload.logo_url = logo_url
    } else if (editingEmpresaId && currentImagenEmpresa === null) {
      payload.logo_url = null
    }

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
      setNombre(''); setRif(''); setRubro(''); setDireccion(''); setTelefono(''); setTelefono2(''); setInstagram(''); setTiktok(''); setWeb(''); setFile(null); setOrdenEmpresa(0)
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
    let imagen_url = null

    if (fileEvento) {
      const fileExt = fileEvento.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `eventos/${fileName}`
      const { error: uploadError } = await supabase.storage.from('media_institucional').upload(filePath, fileEvento)
      if (uploadError) {
        setMsgEvento(`❌ Error subiendo imagen: ${uploadError.message}`)
        setLoading(false)
        return
      }
      imagen_url = supabase.storage.from('media_institucional').getPublicUrl(filePath).data.publicUrl
    }

    const payload: any = { 
      titulo: tituloEvento, 
      descripcion: descripcionEvento, 
      fecha: fechaEvento, 
      orden: ordenEvento,
      ubicacion: ubicacionEvento || null,
      link_detalles: linkDetallesEvento || null,
      link_mapa: linkMapaEvento || null
    }
    
    if (fechaEventoFin) payload.fecha_fin = fechaEventoFin
    else payload.fecha_fin = null

    if (imagen_url !== null) {
      payload.imagen_url = imagen_url
    } else if (editingEventoId && currentImagenEvento === null) {
      payload.imagen_url = null
    }
    
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
      setTituloEvento(''); setDescripcionEvento(''); setFechaEvento(''); setFechaEventoFin(''); setUbicacionEvento(''); setLinkDetallesEvento(''); setLinkMapaEvento(''); setOrdenEvento(0); setCurrentImagenEvento(null); setFileEvento(null);
      if (fileEventoRef.current) fileEventoRef.current.value = ''
      setEditingEventoId(null)
      fetchData()
    }
    setLoading(false)
  }

  const handleAddNoticia = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsgNoticia('')
    setUploadStatus('Subiendo imagen principal de noticia...')
    
    const supabase = createClient()
    let imagen_url = null
    let galeria_urls: string[] = []

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

    if (galeriaNoticia && galeriaNoticia.length > 0) {
      setUploadStatus(`Subiendo ${galeriaNoticia.length} imágenes de galería...`)
      for (let i = 0; i < galeriaNoticia.length; i++) {
        const file = galeriaNoticia[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-gal-${i}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `noticias/galeria/${fileName}`
        
        const { error: uploadError } = await supabase.storage.from('media_institucional').upload(filePath, file)
        if (!uploadError) {
          const url = supabase.storage.from('media_institucional').getPublicUrl(filePath).data.publicUrl
          galeria_urls.push(url)
        }
      }
    }

    setUploadStatus('Publicando noticia...')
    const payload: any = { titulo: tituloNoticia, resumen: resumenNoticia, contenido_completo: contenidoCompletoNoticia, orden: ordenNoticia }
    if (fechaPublicacionNoticia) {
      payload.fecha_publicacion = fechaPublicacionNoticia
    }
    if (imagen_url !== null) {
      payload.imagen_url = imagen_url
    } else if (editingNoticiaId && currentImagenNoticia === null) {
      // Si estamos editando y currentImagenNoticia es null (el usuario la borró explícitamente), la quitamos en BD
      payload.imagen_url = null
    }

    if (editingNoticiaId) {
      payload.galeria_urls = [...(currentGaleriaNoticia || []), ...galeria_urls]
    } else if (galeria_urls.length > 0) {
      payload.galeria_urls = galeria_urls // ESTO REQUIERE LA COLUMNA EN SUPABASE
    }

    let error;
    if (editingNoticiaId) {
      const res = await supabase.from('noticias').update(payload).eq('id', editingNoticiaId)
      error = res.error
    } else {
      const res = await supabase.from('noticias').insert([payload])
      error = res.error
    }

    if (error) {
      if (error.message.includes('galeria_urls')) {
        setMsgNoticia(`❌ Error crítico: Falta la columna 'galeria_urls' (tipo text[]) en Supabase. Añádela desde el panel de SQL de Supabase para poder guardar galerías.`)
      } else {
        setMsgNoticia(`❌ Error: ${error.message}`)
      }
    }
    else {
      setMsgNoticia(editingNoticiaId ? '✅ Noticia actualizada exitosamente.' : '✅ Noticia publicada exitosamente.')
      setTituloNoticia(''); setResumenNoticia(''); setContenidoCompletoNoticia(''); setFileNoticia(null); setGaleriaNoticia([]); setCurrentGaleriaNoticia([]); setOrdenNoticia(0); setFechaPublicacionNoticia('')
      setEditingNoticiaId(null)
      if (fileNoticiaRef.current) fileNoticiaRef.current.value = ''
      if (galeriaNoticiaRef.current) galeriaNoticiaRef.current.value = ''
      fetchData()
    }
    setLoading(false); setUploadStatus('')
  }

  const handleAddAliado = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileAliado && !editingAliadoId) { setMsgAliado('❌ Debes seleccionar el logo.'); return }
    setLoading(true); setMsgAliado(''); 
    
    const supabase = createClient()
    let logo_url = null;

    if (fileAliado) {
      setUploadStatus('Subiendo logo...')
      const fileExt = fileAliado.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `aliados/${fileName}`

      const { error: uploadError } = await supabase.storage.from('media_institucional').upload(filePath, fileAliado)
      if (uploadError) { setMsgAliado(`❌ Error: ${uploadError.message}`); setLoading(false); return }

      logo_url = supabase.storage.from('media_institucional').getPublicUrl(filePath).data.publicUrl
    }
    
    setUploadStatus('Guardando aliado...')
    const payload: any = { nombre: nombreAliado, orden: ordenAliado }
    if (logo_url !== null) {
      payload.logo_url = logo_url
    } else if (editingAliadoId && currentImagenAliado === null) {
      payload.logo_url = null
    }

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
      setNombreAliado(''); setFileAliado(null); setOrdenAliado(0)
      setEditingAliadoId(null)
      if (fileAliadoRef.current) fileAliadoRef.current.value = ''
      fetchData()
    }
    setLoading(false); setUploadStatus('')
  }

  const handleSaveHomeConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setUploadStatus('Guardando configuración...')
    const supabase = createClient()
    let finalVideoUrl = homeVideoUrl

    if (fileHomeVideo) {
      setUploadStatus('Subiendo video (esto puede tardar)...')
      const fileExt = fileHomeVideo.name.split('.').pop()
      const fileName = `home-bg-${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('media_institucional').upload(`videos/${fileName}`, fileHomeVideo)
      if (uploadError) { setMsg('❌ Error subiendo video.'); setLoading(false); return }
      finalVideoUrl = supabase.storage.from('media_institucional').getPublicUrl(`videos/${fileName}`).data.publicUrl
      setHomeVideoUrl(finalVideoUrl)
    }

    const { error } = await supabase.from('configuracion_home').upsert({ id: 1, titulo: homeTitulo, subtitulo: homeSubtitulo, video_url: finalVideoUrl })
    if (error) setMsg(`❌ Error: ${error.message}`)
    else { setMsg('✅ Configuración de la Portada actualizada exitosamente.'); if (fileHomeVideoRef.current) fileHomeVideoRef.current.value = ''; setFileHomeVideo(null) }
    setLoading(false); setUploadStatus('')
  }

  // --- Manejo del Drag and Drop (Reordenamiento Visual) ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: any, tipo: 'empresas' | 'eventos' | 'noticias' | 'aliados') => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    let items: any[] = [];
    let setItems: any;
    let tabla = '';

    if (tipo === 'empresas') { items = listaEmpresas; setItems = setListaEmpresas; tabla = 'empresas_afiliadas' }
    if (tipo === 'eventos') { items = listaEventos; setItems = setListaEventos; tabla = 'eventos' }
    if (tipo === 'noticias') { items = listaNoticias; setItems = setListaNoticias; tabla = 'noticias' }
    if (tipo === 'aliados') { items = listaAliados; setItems = setListaAliados; tabla = 'aliados' }

    const oldIndex = items.findIndex((item) => item.id.toString() === active.id.toString());
    const newIndex = items.findIndex((item) => item.id.toString() === over.id.toString());

    const newArray = arrayMove(items, oldIndex, newIndex);
    const updatedArray = newArray.map((item, index) => ({ ...item, orden: index + 1 }));
    setItems(updatedArray);

    const supabase = createClient()
    const updates = updatedArray.map(item => supabase.from(tabla).update({ orden: item.orden }).eq('id', item.id))
    await Promise.all(updates)
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
            </TabsList>

            {/* CONTENIDO HOME */}
            <TabsContent value="home" className="focus-visible:outline-none">
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12 mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
                
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 bg-[#002b7f]/10 rounded-xl flex items-center justify-center text-[#002b7f]">
                    <LayoutDashboardIcon className="w-5 h-5" />
                  </div>
                  Configuración de la Portada Principal
                </h3>

                <form onSubmit={handleSaveHomeConfig} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Título Principal</Label>
                        <Input value={homeTitulo} onChange={e => setHomeTitulo(e.target.value)} placeholder="Conectamos el Futuro..." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" required />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Subtítulo</Label>
                        <textarea value={homeSubtitulo} onChange={e => setHomeSubtitulo(e.target.value)} placeholder="Únete a la red empresarial..." className="w-full min-h-[120px] p-4 bg-slate-50 border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002b7f] rounded-xl resize-none" required />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Video de Fondo (Opcional: Subir nuevo)</Label>
                        <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors text-center relative cursor-pointer">
                          <input type="file" accept="video/mp4,video/webm" onChange={e => setFileHomeVideo(e.target.files?.[0] || null)} ref={fileHomeVideoRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                          <div className="flex flex-col items-center justify-center pointer-events-none">
                            <ImageIcon className="w-8 h-8 text-blue-400 mb-2" />
                            <p className="text-sm font-bold text-slate-700">{fileHomeVideo ? fileHomeVideo.name : 'Haz clic para buscar un video (.mp4)'}</p>
                            <p className="text-xs text-slate-400 mt-1">Si no subes uno nuevo, se mantendrá el actual.</p>
                          </div>
                        </div>
                      </div>
                      {homeVideoUrl && (
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold">Vista Previa del Video Actual</Label>
                          <video src={homeVideoUrl} className="w-full h-40 object-cover rounded-xl shadow-md border border-slate-200" muted loop autoPlay playsInline />
                        </div>
                      )}
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="h-14 px-8 bg-[#002b7f] hover:bg-blue-900 text-white font-bold rounded-xl shadow-lg shadow-[#002b7f]/25 transition-all w-full md:w-auto">
                    {loading ? uploadStatus || 'Guardando...' : 'Guardar Configuración de Portada'}
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* CONTENIDO EMPRESAS */}
            <TabsContent value="empresas" className="mt-0 outline-none">
                <div className="space-y-10">
                  {/* Formulario Empresas */}
                  <motion.div 
                    layout
                    className={`rounded-[2rem] p-8 md:p-10 transition-all duration-700 ${editingEmpresaId ? 'bg-white border border-[#002b7f]/20 shadow-[0_20px_60px_-15px_rgba(0,43,127,0.15)] ring-1 ring-[#002b7f]/5 scale-[1.01] md:scale-[1.02] relative z-10 overflow-hidden' : 'bg-white border border-slate-100 shadow-sm hover:shadow-md'}`}
                  >
                    {editingEmpresaId && <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#002b7f] to-blue-400" />}
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black flex items-center gap-3 text-[#002b7f] tracking-tight">
                        <BuildingIcon className="w-6 h-6 text-[#002b7f]/70" />
                        {editingEmpresaId ? <span>Edición: <span className="font-medium text-slate-500">{nombre}</span></span> : 'Registrar Nueva Empresa'}
                      </h3>
                      {editingEmpresaId && (
                        <Button variant="ghost" onClick={() => { setEditingEmpresaId(null); setNombre(''); setRif(''); setRubro(''); setDireccion(''); setTelefono(''); setTelefono2(''); setInstagram(''); setTiktok(''); setWeb(''); setFile(null); }} className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <XIcon className="w-4 h-4 mr-2" /> Cancelar Edición
                        </Button>
                      )}
                    </div>
                <form onSubmit={handleAddEmpresa} className="space-y-8">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-transparent">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Razón Social o Nombre Comercial</Label>
                        <Input id="nombre-empresa" name="nombreEmpresa" autoComplete="off" required value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej. Manufacturas Aragua C.A." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
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
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold flex items-center gap-2">
                          Posición (Orden Visual)
                        </Label>
                        <Input type="number" value={ordenEmpresa} onChange={e => setOrdenEmpresa(parseInt(e.target.value) || 0)} className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                    </div>

                  {/* Tarjeta: Contacto e Identidad */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-transparent">
                      
                      {/* Columna de Contacto */}
                      <div className="space-y-8">
                        <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-2">Contacto y Ubicación</h3>
                        <div className="space-y-3">
                          <Label className="text-slate-700 font-bold flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-slate-400" /> Teléfono Principal</Label>
                          <Input value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="0243-5550000" className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-slate-700 font-bold flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-slate-400" /> Teléfono Secundario <span className="text-xs text-slate-400 font-normal">(Opcional)</span></Label>
                          <Input value={telefono2} onChange={e => setTelefono2(e.target.value)} placeholder="0414-1234567" className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
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
                          
                          {editingEmpresaId && currentImagenEmpresa && !file && (
                            <div className="mb-4 flex items-center justify-between p-4 border border-blue-100 bg-blue-50/50 rounded-xl relative group">
                              <div className="flex items-center gap-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={currentImagenEmpresa} alt="Actual" className="w-20 h-20 object-contain bg-white rounded-lg border border-blue-200 shadow-sm p-1" />
                                <div className="text-sm">
                                  <p className="font-bold text-blue-900">Logo actual guardado</p>
                                  <p className="text-blue-700">Sube uno nuevo abajo si deseas cambiarlo.</p>
                                </div>
                              </div>
                              <button 
                                type="button" 
                                onClick={() => setCurrentImagenEmpresa(null)}
                                className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white rounded-full p-2 transition-all shadow-sm"
                                title="Eliminar logo actual"
                              >
                                <XIcon className="w-5 h-5" />
                              </button>
                            </div>
                          )}

                          <div className="flex items-center gap-3">
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 p-6 flex flex-col items-center justify-center text-center transition-colors hover:bg-slate-100 hover:border-[#002b7f]/50 group relative flex-1">
                              <ImageIcon className="w-8 h-8 text-slate-300 mb-2 group-hover:text-[#002b7f] transition-colors" />
                              <p className="text-sm font-bold text-slate-700">Haz clic para buscar archivo</p>
                              <p className="text-xs text-slate-400 mt-1">PNG o JPG. Formato cuadrado recomendado.</p>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={e => {
                                    const selected = e.target.files?.[0];
                                    if (selected) {
                                      if (selected.size > 2 * 1024 * 1024) {
                                        alert("El archivo excede el límite de 2MB. Por favor, comprime la imagen.");
                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                        return;
                                      }
                                      setFile(selected);
                                    } else {
                                      setFile(null);
                                    }
                                  }}
                                ref={fileInputRef}
                                disabled={loading}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                            </div>
                            {file && (
                              <button 
                                type="button" 
                                onClick={() => { setFile(null); if(fileInputRef.current) fileInputRef.current.value = '' }}
                                className="bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white rounded-xl h-full p-4 flex flex-col items-center justify-center transition-all shadow-sm"
                                title="Descartar archivo"
                              >
                                <XIcon className="w-6 h-6 mb-2" />
                                <span className="text-xs font-bold text-center break-all max-w-[80px] line-clamp-2">{file.name}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                    
                    {/* Botonera de Acción */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="w-full">
                        {msg && <div className={`p-4 rounded-xl font-bold text-sm ${msg.includes('❌') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>{msg}</div>}
                        {loading && uploadStatus && <div className="text-sm font-bold text-[#002b7f] mt-2 flex items-center gap-2"><div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> {uploadStatus}</div>}
                      </div>
                      <Button type="submit" disabled={loading} className="w-full md:w-auto bg-[#002b7f] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all text-base flex-shrink-0">
                        {loading ? 'Procesando...' : (editingEmpresaId ? 'Guardar Cambios' : 'Guardar Empresa')}
                      </Button>
                    </div>

                </form>
                  </motion.div>

                  {/* LISTA DE EMPRESAS */}
                  <div className="mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Directorio de Empresas</h3>
                  <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[600px] overflow-y-auto custom-scrollbar">
                    {loadingListas ? (
                      <div className="p-8 text-center text-slate-500 font-medium animate-pulse">Cargando registros...</div>
                    ) : listaEmpresas.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 font-medium">No hay empresas registradas.</div>
                    ) : (
                      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'empresas')}>
                        <SortableContext items={listaEmpresas.map(e => e.id.toString())} strategy={verticalListSortingStrategy}>
                          <ul className="divide-y divide-slate-100/0 space-y-2 p-2">
                            {listaEmpresas.map(emp => (
                              <SortableItem key={emp.id} id={emp.id.toString()}>
                                <div className="flex items-center justify-between w-full">
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
                                    <Button variant="ghost" onClick={() => handleEditEmpresa(emp)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl h-10 w-10 p-0 flex-shrink-0">
                                      <PencilIcon className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" onClick={() => handleDelete(emp.id, 'empresas_afiliadas')} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-10 w-10 p-0 flex-shrink-0">
                                      <TrashIcon className="w-5 h-5" />
                                    </Button>
                                  </div>
                                </div>
                              </SortableItem>
                            ))}
                          </ul>
                        </SortableContext>
                      </DndContext>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* CONTENIDO EVENTOS */}
            <TabsContent value="eventos" className="mt-0 outline-none">
                <div className="space-y-10">
                  {/* Formulario Eventos */}
                  <motion.div 
                    layout
                    className={`rounded-[2rem] p-8 md:p-10 transition-all duration-700 ${editingEventoId ? 'bg-white border border-[#002b7f]/20 shadow-[0_20px_60px_-15px_rgba(0,43,127,0.15)] ring-1 ring-[#002b7f]/5 scale-[1.01] md:scale-[1.02] relative z-10 overflow-hidden' : 'bg-white border border-slate-100 shadow-sm hover:shadow-md'}`}
                  >
                    {editingEventoId && <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#002b7f] to-emerald-400" />}
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black flex items-center gap-3 text-[#002b7f] tracking-tight">
                        <CalendarIcon className="w-6 h-6 text-[#002b7f]/70" />
                        {editingEventoId ? <span>Edición: <span className="font-medium text-slate-500">{tituloEvento}</span></span> : 'Programar Nuevo Evento'}
                      </h3>
                      {editingEventoId && (
                        <Button variant="ghost" onClick={() => { setEditingEventoId(null); setTituloEvento(''); setDescripcionEvento(''); setFechaEvento(''); setFechaEventoFin(''); setUbicacionEvento(''); setLinkDetallesEvento(''); setLinkMapaEvento(''); setFileEvento(null); setCurrentImagenEvento(null); }} className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <XIcon className="w-4 h-4 mr-2" /> Cancelar Edición
                        </Button>
                      )}
                    </div>
                  <CardContent className="p-8 space-y-6 bg-transparent">
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Título del Evento</Label>
                      <Input id="titulo-evento" name="tituloEvento" autoComplete="off" required value={tituloEvento} onChange={e => setTituloEvento(e.target.value)} placeholder="Ej. Asamblea Anual 2026..." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Fecha de Inicio</Label>
                        <Input required type="date" value={fechaEvento} onChange={e => setFechaEvento(e.target.value)} className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Fecha de Fin (Opcional)</Label>
                        <Input type="date" value={fechaEventoFin} onChange={e => setFechaEventoFin(e.target.value)} className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-slate-400" /> Ubicación (Opcional)</Label>
                        <Input value={ubicacionEvento} onChange={e => setUbicacionEvento(e.target.value)} placeholder="Ej. Hotel Eurobuilding, Caracas" className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Link de Google Maps (Opcional)</Label>
                        <Input type="url" value={linkMapaEvento} onChange={e => setLinkMapaEvento(e.target.value)} placeholder="https://maps.app.goo.gl/..." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Link "Ver Detalles" Externo (Opcional)</Label>
                      <Input type="url" value={linkDetallesEvento} onChange={e => setLinkDetallesEvento(e.target.value)} placeholder="https://instagram.com/p/..." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Descripción Corta</Label>
                      <textarea required value={descripcionEvento} onChange={e => setDescripcionEvento(e.target.value)} placeholder="Breve descripción del evento..." className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002b7f] min-h-[100px] resize-y" disabled={loading} />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-400" /> Póster / Imagen del Evento (Opcional)</Label>
                      
                      {editingEventoId && currentImagenEvento && !fileEvento && (
                        <div className="mb-4 flex items-center justify-between p-4 border border-blue-100 bg-blue-50/50 rounded-xl relative group">
                          <div className="flex items-center gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={currentImagenEvento} alt="Actual" className="w-20 h-20 object-cover rounded-lg border border-blue-200 shadow-sm" />
                            <div className="text-sm">
                              <p className="font-bold text-blue-900">Póster actual guardado</p>
                              <p className="text-blue-700">Sube uno nuevo abajo si deseas cambiarlo.</p>
                            </div>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setCurrentImagenEvento(null)}
                            className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white rounded-full p-2 transition-all shadow-sm"
                            title="Eliminar póster actual"
                          >
                            <XIcon className="w-5 h-5" />
                          </button>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <Input type="file" accept="image/*" onChange={e => {
                          const selected = e.target.files?.[0];
                          if (selected) {
                            if (selected.size > 2 * 1024 * 1024) {
                              alert("El póster excede el límite de 2MB.");
                              if (fileEventoRef.current) fileEventoRef.current.value = '';
                              return;
                            }
                            setFileEvento(selected);
                          } else {
                            setFileEvento(null);
                          }
                        }} ref={fileEventoRef} disabled={loading} className="h-12 bg-white shadow-sm cursor-pointer pt-3 rounded-xl border-slate-200 flex-1" />
                        {fileEvento && (
                          <button 
                            type="button" 
                            onClick={() => { setFileEvento(null); if(fileEventoRef.current) fileEventoRef.current.value = '' }}
                            className="bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white rounded-xl h-12 w-12 flex items-center justify-center transition-all shadow-sm flex-shrink-0"
                            title="Descartar archivo"
                          >
                            <XIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      
                      {fileEvento && (
                        <div className="mt-4 p-4 border border-blue-100 bg-blue-50/50 rounded-xl relative group">
                          <h4 className="text-sm font-bold text-blue-900 mb-3">Previsualización del nuevo póster:</h4>
                          <div className="flex items-center gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={URL.createObjectURL(fileEvento)} alt="Preview Nuevo" className="w-20 h-20 object-cover rounded-lg border border-blue-200 shadow-sm" />
                            <div className="text-sm">
                              <p className="font-bold text-blue-800">Listo para subir</p>
                              <p className="text-blue-600">Al hacer clic en Agendar se guardará.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Posición (Orden Visual)</Label>
                      <Input type="number" value={ordenEvento} onChange={e => setOrdenEvento(parseInt(e.target.value) || 0)} className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                  </CardContent>
                  <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full">
                      {msgEvento && <div className={`p-4 rounded-xl font-bold text-sm ${msgEvento.includes('❌') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>{msgEvento}</div>}
                    </div>
                    <Button onClick={handleAddEvento} disabled={loading} className="w-full md:w-auto bg-[#002b7f] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all text-base flex-shrink-0">
                      {loading ? 'Procesando...' : (editingEventoId ? 'Guardar Cambios' : 'Agendar Evento')}
                    </Button>
                  </div>
                </motion.div>

                {/* LISTA DE EVENTOS */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Eventos Programados</h3>
                  <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[600px] overflow-y-auto custom-scrollbar">
                    {loadingListas ? (
                      <div className="p-8 text-center text-slate-500 font-medium animate-pulse">Cargando registros...</div>
                    ) : listaEventos.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 font-medium">No hay eventos programados.</div>
                    ) : (
                      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'eventos')}>
                        <SortableContext items={listaEventos.map(e => e.id.toString())} strategy={verticalListSortingStrategy}>
                          <ul className="divide-y divide-slate-100/0 space-y-2 p-2">
                            {listaEventos.map(eve => (
                              <SortableItem key={eve.id} id={eve.id.toString()}>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-emerald-50 rounded-xl flex flex-col items-center justify-center border border-emerald-100 text-emerald-700 font-bold">
                                      <span className="text-xs uppercase">{new Date(eve.fecha).toLocaleDateString('es-VE', { month: 'short' })}</span>
                                      <span className="text-lg leading-none">{new Date(eve.fecha).getDate()}</span>
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-slate-900 text-lg leading-tight">{eve.titulo}</h4>
                                      <p className="text-sm text-slate-500 font-medium line-clamp-1">{eve.descripcion}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" onClick={() => handleEditEvento(eve)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl h-10 w-10 p-0 flex-shrink-0">
                                      <PencilIcon className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" onClick={() => handleDelete(eve.id, 'eventos')} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-10 w-10 p-0 flex-shrink-0">
                                      <TrashIcon className="w-5 h-5" />
                                    </Button>
                                  </div>
                                </div>
                              </SortableItem>
                            ))}
                          </ul>
                        </SortableContext>
                      </DndContext>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* CONTENIDO NOTICIAS */}
            <TabsContent value="noticias" className="mt-0 outline-none">
                <div className="space-y-10">
                  {/* Formulario Noticias */}
                  <motion.div 
                    layout
                    className={`rounded-[2rem] p-8 md:p-10 transition-all duration-700 ${editingNoticiaId ? 'bg-white border border-[#002b7f]/20 shadow-[0_20px_60px_-15px_rgba(0,43,127,0.15)] ring-1 ring-[#002b7f]/5 scale-[1.01] md:scale-[1.02] relative z-10 overflow-hidden' : 'bg-white border border-slate-100 shadow-sm hover:shadow-md'}`}
                  >
                    {editingNoticiaId && <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#002b7f] to-amber-400" />}
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black flex items-center gap-3 text-[#002b7f] tracking-tight">
                        <NewspaperIcon className="w-6 h-6 text-[#002b7f]/70" />
                        {editingNoticiaId ? <span>Edición: <span className="font-medium text-slate-500">{tituloNoticia}</span></span> : 'Redactar Nueva Noticia'}
                      </h3>
                      {editingNoticiaId && (
                        <Button variant="ghost" onClick={() => { setEditingNoticiaId(null); setTituloNoticia(''); setResumenNoticia(''); setContenidoCompletoNoticia(''); setFileNoticia(null); setCurrentGaleriaNoticia([]); setGaleriaNoticia([]); setFechaPublicacionNoticia(''); }} className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <XIcon className="w-4 h-4 mr-2" /> Cancelar Edición
                        </Button>
                      )}
                    </div>
                  <CardContent className="p-8 space-y-6 bg-transparent">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Título de la Noticia</Label>
                        <Input id="titulo-noticia" name="tituloNoticia" autoComplete="off" required value={tituloNoticia} onChange={e => setTituloNoticia(e.target.value)} placeholder="Ej. Fedeindustria firma nueva alianza con..." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Fecha de Publicación</Label>
                        <Input type="date" value={fechaPublicacionNoticia} onChange={e => setFechaPublicacionNoticia(e.target.value)} className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Resumen Breve (Para tarjeta o preview)</Label>
                      <textarea required value={resumenNoticia} onChange={e => setResumenNoticia(e.target.value)} placeholder="Escribe el resumen corto aquí..." className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002b7f] min-h-[80px] resize-y" disabled={loading} />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Contenido Completo (Reportaje)</Label>
                      <textarea value={contenidoCompletoNoticia} onChange={e => setContenidoCompletoNoticia(e.target.value)} placeholder="Redacta el reportaje completo aquí..." className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002b7f] min-h-[200px] resize-y" disabled={loading} />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-400" /> Fotografía de Portada (Opcional)</Label>
                      
                      {editingNoticiaId && currentImagenNoticia && !fileNoticia && (
                        <div className="mb-4 flex items-center justify-between p-4 border border-blue-100 bg-blue-50/50 rounded-xl relative group">
                          <div className="flex items-center gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={currentImagenNoticia} alt="Actual" className="w-20 h-20 object-cover rounded-lg border border-blue-200 shadow-sm" />
                            <div className="text-sm">
                              <p className="font-bold text-blue-900">Imagen actual guardada</p>
                              <p className="text-blue-700">Sube una nueva imagen abajo si deseas cambiarla.</p>
                            </div>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setCurrentImagenNoticia(null)}
                            className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white rounded-full p-2 transition-all shadow-sm"
                            title="Eliminar imagen actual"
                          >
                            <XIcon className="w-5 h-5" />
                          </button>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <Input type="file" accept="image/*" onChange={e => {
                          const selected = e.target.files?.[0];
                          if (selected) {
                            if (selected.size > 2 * 1024 * 1024) {
                              alert("La foto de portada excede el límite de 2MB.");
                              if (fileNoticiaRef.current) fileNoticiaRef.current.value = '';
                              return;
                            }
                            setFileNoticia(selected);
                          } else {
                            setFileNoticia(null);
                          }
                        }} ref={fileNoticiaRef} disabled={loading} className="h-12 bg-white shadow-sm cursor-pointer pt-3 rounded-xl border-slate-200 flex-1" />
                        {fileNoticia && (
                          <button 
                            type="button" 
                            onClick={() => { setFileNoticia(null); if(fileNoticiaRef.current) fileNoticiaRef.current.value = '' }}
                            className="bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white rounded-xl h-12 w-12 flex items-center justify-center transition-all shadow-sm flex-shrink-0"
                            title="Descartar archivo"
                          >
                            <XIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-400" /> Galería de Imágenes Adicionales (Opcional)</Label>
                      
                      <div className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl p-6 transition-colors hover:border-[#002b7f]/30">
                        <Input 
                          type="file" 
                          accept="image/*" 
                          multiple 
                          onChange={e => {
                            if (e.target.files && e.target.files.length > 0) {
                              const newFiles = Array.from(e.target.files);
                              
                              const validFiles = newFiles.filter(f => f.size <= 2 * 1024 * 1024);
                              if (validFiles.length < newFiles.length) {
                                alert(`Se descartaron ${newFiles.length - validFiles.length} imágenes porque exceden el límite de 2MB cada una.`);
                              }

                              setGaleriaNoticia(prev => {
                                const currentTotal = currentGaleriaNoticia.length + prev.length;
                                const futureTotal = currentTotal + validFiles.length;
                                
                                if (futureTotal > 10) {
                                  alert(`El límite es de 10 imágenes en total para la galería. Solo se añadirán las primeras permitidas.`);
                                  const allowed = 10 - currentTotal;
                                  return [...prev, ...validFiles.slice(0, Math.max(0, allowed))];
                                }
                                return [...prev, ...validFiles];
                              });
                            }
                            // Usamos setTimeout para no interferir con el evento actual
                            setTimeout(() => {
                              if (galeriaNoticiaRef.current) galeriaNoticiaRef.current.value = '';
                            }, 10);
                          }} 
                          ref={galeriaNoticiaRef} 
                          disabled={loading} 
                          className="h-12 bg-white cursor-pointer pt-3 rounded-xl border-slate-200 w-full" 
                        />
                        <p className="text-sm text-slate-500 italic mt-3 text-center">
                          * Selecciona una o varias fotos para añadir al carrusel.
                        </p>

                        {/* Previsualización de imágenes ya guardadas en base de datos */}
                        {editingNoticiaId && currentGaleriaNoticia.length > 0 && (
                          <div className="mt-6 mb-8">
                            <h4 className="text-sm font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2">Galería actual guardada ({currentGaleriaNoticia.length}):</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-blue-100 bg-blue-50/50 rounded-xl">
                              {currentGaleriaNoticia.map((url, idx) => (
                                <div key={`current-${idx}`} className="relative group bg-white border border-blue-200 rounded-xl overflow-hidden aspect-square">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={url} alt="Current Preview" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button 
                                      type="button"
                                      onClick={() => setCurrentGaleriaNoticia(prev => prev.filter((_, i) => i !== idx))}
                                      className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                                      title="Eliminar esta imagen de la base de datos"
                                    >
                                      <XIcon className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Previsualización de archivos seleccionados */}
                        {galeriaNoticia.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-sm font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">Imágenes a subir ({galeriaNoticia.length}):</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {galeriaNoticia.map((file, idx) => (
                                <div key={idx} className="relative group bg-white border border-slate-200 rounded-xl overflow-hidden aspect-square">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button 
                                      type="button"
                                      onClick={() => setGaleriaNoticia(prev => prev.filter((_, i) => i !== idx))}
                                      className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                                      title="Quitar imagen"
                                    >
                                      <XIcon className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Posición (Orden Visual)</Label>
                      <Input type="number" value={ordenNoticia} onChange={e => setOrdenNoticia(parseInt(e.target.value) || 0)} className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                  </CardContent>
                  <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full">
                      {msgNoticia && <div className={`p-4 rounded-xl font-bold text-sm ${msgNoticia.includes('❌') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>{msgNoticia}</div>}
                    </div>
                    <Button onClick={handleAddNoticia} disabled={loading} className="w-full md:w-auto bg-[#002b7f] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all text-base flex-shrink-0">
                      {loading ? 'Procesando...' : (editingNoticiaId ? 'Guardar Cambios' : 'Publicar Noticia')}
                    </Button>
                  </div>
                </motion.div>

                {/* LISTA DE NOTICIAS */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Noticias Publicadas</h3>
                  <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[600px] overflow-y-auto custom-scrollbar">
                    {loadingListas ? (
                      <div className="p-8 text-center text-slate-500 font-medium animate-pulse">Cargando registros...</div>
                    ) : listaNoticias.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 font-medium">No hay noticias publicadas.</div>
                    ) : (
                      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'noticias')}>
                        <SortableContext items={listaNoticias.map(e => e.id.toString())} strategy={verticalListSortingStrategy}>
                          <ul className="divide-y divide-slate-100/0 space-y-2 p-2">
                            {listaNoticias.map(not => (
                              <SortableItem key={not.id} id={not.id.toString()}>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-4">
                                    <div className="w-16 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center">
                                      {not.imagen_url ? <img src={not.imagen_url} className="w-full h-full object-cover" alt="Noticia" /> : <NewspaperIcon className="w-5 h-5 text-slate-300" />}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-slate-900 text-base leading-tight line-clamp-1">{not.titulo}</h4>
                                      <p className="text-xs text-slate-400 font-medium">{new Date(not.fecha_publicacion).toLocaleDateString('es-VE')}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" onClick={() => handleEditNoticia(not)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl h-10 w-10 p-0 flex-shrink-0">
                                      <PencilIcon className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" onClick={() => handleDelete(not.id, 'noticias')} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-10 w-10 p-0 flex-shrink-0">
                                      <TrashIcon className="w-5 h-5" />
                                    </Button>
                                  </div>
                                </div>
                              </SortableItem>
                            ))}
                          </ul>
                        </SortableContext>
                      </DndContext>
                    )}
                  </div>
                </div>
                </div>
            </TabsContent>

            {/* CONTENIDO ALIADOS */}
            <TabsContent value="aliados" className="mt-0 outline-none">
                <div className="space-y-10">
                  {/* Formulario Aliados */}
                  <motion.div 
                    layout
                    className={`rounded-[2rem] p-8 md:p-10 transition-all duration-700 ${editingAliadoId ? 'bg-white border border-[#002b7f]/20 shadow-[0_20px_60px_-15px_rgba(0,43,127,0.15)] ring-1 ring-[#002b7f]/5 scale-[1.01] md:scale-[1.02] relative z-10 overflow-hidden' : 'bg-white border border-slate-100 shadow-sm hover:shadow-md'}`}
                  >
                    {editingAliadoId && <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#002b7f] to-purple-400" />}
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black flex items-center gap-3 text-[#002b7f] tracking-tight">
                        <ImageIcon className="w-6 h-6 text-[#002b7f]/70" />
                        {editingAliadoId ? <span>Edición: <span className="font-medium text-slate-500">{nombreAliado}</span></span> : 'Registrar Nuevo Aliado'}
                      </h3>
                      {editingAliadoId && (
                        <Button variant="ghost" onClick={() => { setEditingAliadoId(null); setNombreAliado(''); setFileAliado(null); }} className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <XIcon className="w-4 h-4 mr-2" /> Cancelar Edición
                        </Button>
                      )}
                    </div>
                  <CardContent className="p-8 space-y-6 bg-transparent">
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Nombre de la Institución o Marca</Label>
                      <Input id="nombre-aliado" name="nombreAliado" autoComplete="off" required value={nombreAliado} onChange={e => setNombreAliado(e.target.value)} placeholder="Ej. Banesco, Movilnet..." className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-400" /> Logo Oficial</Label>
                      
                      {editingAliadoId && currentImagenAliado && !fileAliado && (
                        <div className="mb-4 flex items-center justify-between p-4 border border-blue-100 bg-blue-50/50 rounded-xl relative group">
                          <div className="flex items-center gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={currentImagenAliado} alt="Actual" className="w-20 h-20 object-contain bg-white rounded-lg border border-blue-200 shadow-sm p-1" />
                            <div className="text-sm">
                              <p className="font-bold text-blue-900">Logo actual guardado</p>
                              <p className="text-blue-700">Sube uno nuevo abajo si deseas cambiarlo.</p>
                            </div>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setCurrentImagenAliado(null)}
                            className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white rounded-full p-2 transition-all shadow-sm"
                            title="Eliminar logo actual"
                          >
                            <XIcon className="w-5 h-5" />
                          </button>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <Input type="file" accept="image/*" onChange={e => {
                          const selected = e.target.files?.[0];
                          if (selected) {
                            if (selected.size > 2 * 1024 * 1024) {
                              alert("El logo del aliado excede el límite de 2MB.");
                              if (fileAliadoRef.current) fileAliadoRef.current.value = '';
                              return;
                            }
                            setFileAliado(selected);
                          } else {
                            setFileAliado(null);
                          }
                        }} ref={fileAliadoRef} disabled={loading} className="h-12 bg-white shadow-sm cursor-pointer pt-3 rounded-xl border-slate-200 flex-1" />
                        {fileAliado && (
                          <button 
                            type="button" 
                            onClick={() => { setFileAliado(null); if(fileAliadoRef.current) fileAliadoRef.current.value = '' }}
                            className="bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white rounded-xl h-12 w-12 flex items-center justify-center transition-all shadow-sm flex-shrink-0"
                            title="Descartar archivo"
                          >
                            <XIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Posición (Orden Visual)</Label>
                      <Input type="number" value={ordenAliado} onChange={e => setOrdenAliado(parseInt(e.target.value) || 0)} className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                  </CardContent>
                  <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full">
                      {msgAliado && <div className={`p-4 rounded-xl font-bold text-sm ${msgAliado.includes('❌') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>{msgAliado}</div>}
                    </div>
                    <Button onClick={handleAddAliado} disabled={loading} className="w-full md:w-auto bg-[#002b7f] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all text-base flex-shrink-0">
                      {loading ? 'Procesando...' : (editingAliadoId ? 'Guardar Cambios' : 'Agregar Aliado')}
                    </Button>
                  </div>
                </motion.div>

                {/* LISTA DE ALIADOS */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Aliados Estratégicos</h3>
                  <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[600px] overflow-y-auto custom-scrollbar">
                    {loadingListas ? (
                      <div className="p-8 text-center text-slate-500 font-medium animate-pulse">Cargando registros...</div>
                    ) : listaAliados.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 font-medium">No hay aliados registrados.</div>
                    ) : (
                      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'aliados')}>
                        <SortableContext items={listaAliados.map(e => e.id.toString())} strategy={verticalListSortingStrategy}>
                          <ul className="divide-y divide-slate-100/0 space-y-2 p-2">
                            {listaAliados.map(ali => (
                              <SortableItem key={ali.id} id={ali.id.toString()}>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-4">
                                    <div className="w-20 h-10 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center p-1 border border-slate-200">
                                      <img src={ali.logo_url} className="w-full h-full object-contain" alt="Logo Aliado" />
                                    </div>
                                    <h4 className="font-bold text-slate-900">{ali.nombre}</h4>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" onClick={() => handleEditAliado(ali)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl h-10 w-10 p-0 flex-shrink-0">
                                      <PencilIcon className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" onClick={() => handleDelete(ali.id, 'aliados')} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-10 w-10 p-0 flex-shrink-0">
                                      <TrashIcon className="w-5 h-5" />
                                    </Button>
                                  </div>
                                </div>
                              </SortableItem>
                            ))}
                          </ul>
                        </SortableContext>
                      </DndContext>
                    )}
                  </div>
                </div>
                </div>
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  )
}
