"use client"

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BuildingIcon, LogOutIcon, CalendarIcon, ShieldCheckIcon, ImageIcon, NewspaperIcon, LayoutDashboardIcon, MapPinIcon, PhoneIcon, TrashIcon, PencilIcon, XIcon, GripVerticalIcon, ArrowLeftIcon, PlusIcon, InboxIcon, CheckCircleIcon, MailIcon, UsersIcon, FolderOpenIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from '@/components/SortableItem'

export default function Dashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Estados para Empresas
  const [showFormEmpresa, setShowFormEmpresa] = useState(false)
  const [nombre, setNombre] = useState('')
  const [rif, setRif] = useState('')
  const [rubro, setRubro] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  const [telefono2, setTelefono2] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [web, setWeb] = useState('')
  const [email, setEmail] = useState('')
  const [estatus, setEstatus] = useState('Activa')
  const [ordenEmpresa, setOrdenEmpresa] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [currentImagenEmpresa, setCurrentImagenEmpresa] = useState<string | null>(null)
  const [editingEmpresaId, setEditingEmpresaId] = useState<number | null>(null)
  
  // Estados para Eventos
  const [showFormEvento, setShowFormEvento] = useState(false)
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
  const [showFormNoticia, setShowFormNoticia] = useState(false)
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
  const [showFormAliado, setShowFormAliado] = useState(false)
  const [nombreAliado, setNombreAliado] = useState('')
  const [fileAliado, setFileAliado] = useState<File | null>(null)
  const [currentImagenAliado, setCurrentImagenAliado] = useState<string | null>(null)
  const [ordenAliado, setOrdenAliado] = useState(0)
  const [editingAliadoId, setEditingAliadoId] = useState<number | null>(null)

  // Estados para Junta Directiva
  const [showFormDirectiva, setShowFormDirectiva] = useState(false)
  const [nombreDirectiva, setNombreDirectiva] = useState('')
  const [cargoDirectiva, setCargoDirectiva] = useState('')
  const [fileDirectiva, setFileDirectiva] = useState<File | null>(null)
  const [currentImagenDirectiva, setCurrentImagenDirectiva] = useState<string | null>(null)
  const [ordenDirectiva, setOrdenDirectiva] = useState(0)
  const [editingDirectivaId, setEditingDirectivaId] = useState<number | null>(null)

  // Estados para Config Home
  const [homeTitulo, setHomeTitulo] = useState('Conectamos el Futuro de la Industria')
  const [homeSubtitulo, setHomeSubtitulo] = useState('Únete a la red empresarial más sólida de la región central. Innovación, representación y crecimiento para tu empresa.')
  const [homeVideoUrl, setHomeVideoUrl] = useState('/video-industrial.mp4')
  const [fileHomeVideo, setFileHomeVideo] = useState<File | null>(null)
  const fileHomeVideoRef = useRef<HTMLInputElement>(null)
  
  const [homeLogoUrl, setHomeLogoUrl] = useState('/logo.png')
  const [fileHomeLogo, setFileHomeLogo] = useState<File | null>(null)
  const fileHomeLogoRef = useRef<HTMLInputElement>(null)

  // Estados de Contacto Global
  const [homeTelefono1, setHomeTelefono1] = useState('0242-6888183')
  const [homeTelefono2, setHomeTelefono2] = useState('0424-5401990')
  const [homeTelefono3, setHomeTelefono3] = useState('0414-4677830')
  const [homeEmail1, setHomeEmail1] = useState('fedeindustriaregistroaragua@gmail.com')
  const [homeEmail2, setHomeEmail2] = useState('fedeindustriaaragua@gmail.com')
  const [homeDireccion, setHomeDireccion] = useState('Av. Las Delicias, Centro Empresarial, Piso 3. Maracay, Edo. Aragua.')

  // Estados para las Listas
  const [listaEmpresas, setListaEmpresas] = useState<any[]>([])
  const [listaEventos, setListaEventos] = useState<any[]>([])
  const [listaNoticias, setListaNoticias] = useState<any[]>([])
  const [listaAliados, setListaAliados] = useState<any[]>([])
  const [listaDirectiva, setListaDirectiva] = useState<any[]>([])
  const [listaSolicitudes, setListaSolicitudes] = useState<any[]>([])
  const [loadingListas, setLoadingListas] = useState(true)

  // Estados para Medios (Galería Global)
  const [listaMedios, setListaMedios] = useState<any[]>([])
  const [loadingMedios, setLoadingMedios] = useState(false)
  const [msgMedios, setMsgMedios] = useState('')
  // Estado para Modal Global
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, title: string, message: string, onConfirm: () => void}>({ isOpen: false, title: '', message: '', onConfirm: () => {} });
  const [selectedMedios, setSelectedMedios] = useState<string[]>([])

  // Estados de carga y mensajes
  const [loading, setLoading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('') 
  const [msg, setMsg] = useState('')
  const [msgEvento, setMsgEvento] = useState('')
  const [msgNoticia, setMsgNoticia] = useState('')
  const [msgAliado, setMsgAliado] = useState('')
  const [msgDirectiva, setMsgDirectiva] = useState('')
  
  // Referencias
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileNoticiaRef = useRef<HTMLInputElement>(null)
  const galeriaNoticiaRef = useRef<HTMLInputElement>(null)
  const fileAliadoRef = useRef<HTMLInputElement>(null)
  const fileDirectivaRef = useRef<HTMLInputElement>(null)

  
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
          const path = carpeta === '' ? file.name : `${carpeta}/${file.name}`
          const url = supabase.storage.from('media_institucional').getPublicUrl(path).data.publicUrl
          todosLosArchivos.push({ ...file, path, url, carpeta: carpeta === '' ? 'raíz' : carpeta })
        })
      }
    }
    
    todosLosArchivos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    setListaMedios(todosLosArchivos)
    setLoadingMedios(false)
  }

  
  const handleBulkDeleteMedios = () => {
    if (selectedMedios.length === 0) return;
    setConfirmModal({
      isOpen: true,
      title: 'Eliminación Masiva',
      message: `¿Estás seguro de eliminar ${selectedMedios.length} archivos seleccionados permanentemente?`,
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
  }

  const toggleMedioSelection = (path: string) => {
    setSelectedMedios(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    )
  }

  const handleDeleteMedio = (path: string) => {
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
  }

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

    const { data: dir } = await supabase.from('junta_directiva').select('*').order('orden', { ascending: true }).order('id', { ascending: false })
    if (dir) setListaDirectiva(dir)

    const { data: sol } = await supabase.from('solicitudes_afiliacion').select('*').order('created_at', { ascending: false })
    if (sol) setListaSolicitudes(sol)

    const { data: configHomeData } = await supabase.from('configuracion_home').select('*').eq('id', 1).single()
    if (configHomeData) {
      setHomeTitulo(configHomeData.titulo)
      setHomeSubtitulo(configHomeData.subtitulo)
      setHomeVideoUrl(configHomeData.video_url)
      if (configHomeData.logo_url) setHomeLogoUrl(configHomeData.logo_url)
      if (configHomeData.telefono_1 !== null && configHomeData.telefono_1 !== undefined) setHomeTelefono1(configHomeData.telefono_1)
      if (configHomeData.telefono_2 !== null && configHomeData.telefono_2 !== undefined) setHomeTelefono2(configHomeData.telefono_2)
      if (configHomeData.telefono_3 !== null && configHomeData.telefono_3 !== undefined) setHomeTelefono3(configHomeData.telefono_3)
      if (configHomeData.email_1 !== null && configHomeData.email_1 !== undefined) setHomeEmail1(configHomeData.email_1)
      if (configHomeData.email_2 !== null && configHomeData.email_2 !== undefined) setHomeEmail2(configHomeData.email_2)
      if (configHomeData.direccion !== null && configHomeData.direccion !== undefined) setHomeDireccion(configHomeData.direccion)
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

  const scrollToForm = (formId: string) => {
    const formEl = document.getElementById(formId);
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const mainEl = document.getElementById('dashboard-main');
      if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
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
    setEmail(empresa.email || '')
    setEstatus(empresa.estatus_membresia)
    setOrdenEmpresa(empresa.orden || 0)
    setFile(null)
    setCurrentImagenEmpresa(empresa.logo_url || null)
    setShowFormEmpresa(true)
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
    setShowFormEvento(true)
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
    setShowFormNoticia(true)
  }

  const handleEditAliado = (aliado: any) => {
    setEditingAliadoId(aliado.id)
    setNombreAliado(aliado.nombre)
    setOrdenAliado(aliado.orden || 0)
    setFileAliado(null)
    setCurrentImagenAliado(aliado.logo_url)
    setShowFormAliado(true)
  }

  const handleEditDirectiva = (miembro: any) => {
    setEditingDirectivaId(miembro.id)
    setNombreDirectiva(miembro.nombre)
    setCargoDirectiva(miembro.cargo)
    setOrdenDirectiva(miembro.orden || 0)
    setFileDirectiva(null)
    setCurrentImagenDirectiva(miembro.imagen_url)
    setShowFormDirectiva(true)
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
    const payload: any = { nombre, rif, rubro, direccion, telefono: combinedTelefono, email: email.trim() || null, instagram, tiktok, web, estatus_membresia: estatus, orden: ordenEmpresa }
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
      if (error.message.includes('email')) {
        setMsg(`❌ Error: Falta la columna 'email' en la tabla 'empresas_afiliadas' en Supabase. Ejecuta el archivo SQL update_empresas_email.sql en tu panel de Supabase.`)
      } else {
        setMsg(`❌ Error: ${error.message}`)
      }
    } else {
      setMsg(editingEmpresaId ? '✅ Empresa actualizada exitosamente.' : '✅ Empresa registrada exitosamente.')
      setNombre(''); setRif(''); setRubro(''); setDireccion(''); setTelefono(''); setTelefono2(''); setInstagram(''); setTiktok(''); setWeb(''); setEmail(''); setFile(null); setOrdenEmpresa(0)
      setEditingEmpresaId(null)
      setShowFormEmpresa(false)
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
      setShowFormEvento(false)
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
      setShowFormNoticia(false)
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
      setShowFormAliado(false)
      if (fileAliadoRef.current) fileAliadoRef.current.value = ''
      fetchData()
    }
    setLoading(false); setUploadStatus('')
  }

  const handleAddDirectiva = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setMsgDirectiva(''); 
    
    const supabase = createClient()
    let imagen_url = null;

    if (fileDirectiva) {
      setUploadStatus('Subiendo foto...')
      const fileExt = fileDirectiva.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `directiva/${fileName}`

      const { error: uploadError } = await supabase.storage.from('media_institucional').upload(filePath, fileDirectiva)
      if (uploadError) { setMsgDirectiva(`❌ Error: ${uploadError.message}`); setLoading(false); return }

      imagen_url = supabase.storage.from('media_institucional').getPublicUrl(filePath).data.publicUrl
    }
    
    setUploadStatus('Guardando miembro...')
    const payload: any = { nombre: nombreDirectiva, cargo: cargoDirectiva, orden: ordenDirectiva }
    if (imagen_url !== null) {
      payload.imagen_url = imagen_url
    } else if (editingDirectivaId && currentImagenDirectiva === null) {
      payload.imagen_url = null
    }

    let error;
    if (editingDirectivaId) {
      const res = await supabase.from('junta_directiva').update(payload).eq('id', editingDirectivaId)
      error = res.error
    } else {
      const res = await supabase.from('junta_directiva').insert([payload])
      error = res.error
    }

    if (error) setMsgDirectiva(`❌ Error: ${error.message}`)
    else {
      setMsgDirectiva(editingDirectivaId ? '✅ Miembro actualizado exitosamente.' : '✅ Miembro agregado exitosamente.')
      setNombreDirectiva(''); setCargoDirectiva(''); setFileDirectiva(null); setOrdenDirectiva(0)
      setEditingDirectivaId(null)
      setShowFormDirectiva(false)
      if (fileDirectivaRef.current) fileDirectivaRef.current.value = ''
      fetchData()
    }
    setLoading(false); setUploadStatus('')
  }

  const handleSaveHomeConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setUploadStatus('Guardando configuración...')
    const supabase = createClient()
    let finalVideoUrl = homeVideoUrl
    let finalLogoUrl = homeLogoUrl

    if (fileHomeVideo) {
      setUploadStatus('Subiendo video (esto puede tardar)...')
      const fileExt = fileHomeVideo.name.split('.').pop()
      const fileName = `home-bg-${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('media_institucional').upload(`videos/${fileName}`, fileHomeVideo)
      if (uploadError) { setMsg('❌ Error subiendo video.'); setLoading(false); return }
      finalVideoUrl = supabase.storage.from('media_institucional').getPublicUrl(`videos/${fileName}`).data.publicUrl
      setHomeVideoUrl(finalVideoUrl)
    }

    if (fileHomeLogo) {
      setUploadStatus('Subiendo logo...')
      const fileExt = fileHomeLogo.name.split('.').pop()
      const fileName = `home-logo-${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('media_institucional').upload(`imagenes/${fileName}`, fileHomeLogo)
      if (uploadError) { setMsg('❌ Error subiendo logo.'); setLoading(false); return }
      finalLogoUrl = supabase.storage.from('media_institucional').getPublicUrl(`imagenes/${fileName}`).data.publicUrl
      setHomeLogoUrl(finalLogoUrl)
    }

    const payloadHome = { 
      id: 1, 
      titulo: homeTitulo, 
      subtitulo: homeSubtitulo, 
      video_url: finalVideoUrl, 
      logo_url: finalLogoUrl,
      telefono_1: homeTelefono1,
      telefono_2: homeTelefono2,
      telefono_3: homeTelefono3,
      email_1: homeEmail1,
      email_2: homeEmail2,
      direccion: homeDireccion 
    };
    const { error } = await supabase.from('configuracion_home').upsert(payloadHome)
    if (error) {
      if (error.message.includes('logo_url')) {
        setMsg(`❌ Error: Falta la columna 'logo_url' (tipo text) en la tabla 'configuracion_home' en Supabase. Añádela desde el panel SQL para guardar el logo.`);
      } else if (error.message.includes('telefono_1') || error.message.includes('email_1')) {
        setMsg(`❌ Error: Faltan las columnas de contacto en Supabase (telefono_1, telefono_2, telefono_3, email_1, email_2, direccion). Añádelas como texto (text) en la tabla 'configuracion_home'.`);
      } else {
        setMsg(`❌ Error: ${error.message}`);
      }
    } else { 
      setMsg('✅ Configuración de la Portada actualizada exitosamente.'); 
      if (fileHomeVideoRef.current) fileHomeVideoRef.current.value = ''; 
      setFileHomeVideo(null);
      if (fileHomeLogoRef.current) fileHomeLogoRef.current.value = ''; 
      setFileHomeLogo(null);
    }
    setLoading(false); setUploadStatus('')
  }

  const handleUpdateSolicitud = async (id: number, nuevoEstatus: string) => {
    const supabase = createClient()
    const { error } = await supabase.from('solicitudes_afiliacion').update({ estatus: nuevoEstatus }).eq('id', id)
    if (error) alert('Error actualizando estado: ' + error.message)
    else fetchData()
  }

  // --- Manejo del Drag and Drop (Reordenamiento Visual) ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: any, tipo: 'empresas' | 'eventos' | 'noticias' | 'aliados' | 'directiva') => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    let items: any[] = [];
    let setItems: any;
    let tabla = '';

    if (tipo === 'empresas') { items = listaEmpresas; setItems = setListaEmpresas; tabla = 'empresas_afiliadas' }
    if (tipo === 'eventos') { items = listaEventos; setItems = setListaEventos; tabla = 'eventos' }
    if (tipo === 'noticias') { items = listaNoticias; setItems = setListaNoticias; tabla = 'noticias' }
    if (tipo === 'aliados') { items = listaAliados; setItems = setListaAliados; tabla = 'aliados' }
    if (tipo === 'directiva') { items = listaDirectiva; setItems = setListaDirectiva; tabla = 'junta_directiva' }

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
    <Tabs defaultValue="home" orientation="vertical" className="fixed inset-0 z-[100] bg-[#f8fafc] flex flex-col md:flex-row overflow-hidden font-sans">
      
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

        <TabsList className="flex-1 flex flex-col justify-start p-6 space-y-2 bg-transparent border-none overflow-y-auto">
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
            <ImageIcon className="w-5 h-5" /> Carrusel de Logos (Inicio)
          </TabsTrigger>
          <TabsTrigger value="directiva" className="w-full justify-start gap-3 px-4 py-3.5 h-auto rounded-xl data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent data-[state=active]:border-blue-100">
            <UsersIcon className="w-5 h-5" /> Junta Directiva
          </TabsTrigger>
          
          <TabsTrigger value="medios" className="w-full justify-start gap-3 px-4 py-3.5 h-auto rounded-xl data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent data-[state=active]:border-blue-100" onClick={() => fetchMedios()}>
            <FolderOpenIcon className="w-5 h-5" /> Galería de Medios
          </TabsTrigger>
          <TabsTrigger value="solicitudes" className="w-full flex items-center justify-between gap-3 px-4 py-3.5 h-auto rounded-xl data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent data-[state=active]:border-blue-100">
            <div className="flex items-center gap-3 overflow-hidden">
              <InboxIcon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate whitespace-nowrap">Solicitudes de Afiliación</span>
            </div>
            {listaSolicitudes.filter(s => s.estatus === 'Pendiente').length > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0 shadow-sm">
                {listaSolicitudes.filter(s => s.estatus === 'Pendiente').length}
              </span>
            )}
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
          </div>

            {/* CONTENIDO HOME */}
            <TabsContent value="home" className="focus-visible:outline-none">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12 mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
                
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 bg-[#002b7f]/10 rounded-xl flex items-center justify-center text-[#002b7f]">
                    <LayoutDashboardIcon className="w-5 h-5" />
                  </div>
                  Configuración de la Portada Principal
                </h3>

                {msg && (
                  <div className={`p-4 mb-6 rounded-xl font-bold relative z-10 ${msg.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {msg}
                  </div>
                )}

                <form onSubmit={handleSaveHomeConfig} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Título Principal</Label>
                        <Input value={homeTitulo} onChange={e => setHomeTitulo(e.target.value)} placeholder="Conectamos el Futuro..." className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" required />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Subtítulo</Label>
                        <textarea value={homeSubtitulo} onChange={e => setHomeSubtitulo(e.target.value)} placeholder="Únete a la red empresarial..." className="w-full min-h-[120px] p-4 bg-slate-50 border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002b7f] rounded-xl resize-none" required />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Logo de la Página Web</Label>
                        <div className="flex flex-col sm:flex-row gap-4">
                          {homeLogoUrl && !fileHomeLogo && (
                            <div className="w-full sm:w-40 p-4 border border-slate-200 bg-slate-50 rounded-2xl text-center shrink-0 flex flex-col justify-center items-center relative group overflow-hidden">
                              <img src={homeLogoUrl} className="max-h-16 w-auto object-contain mix-blend-multiply" alt="Logo actual" />
                              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-xs font-bold text-center">Logo<br/>Actual</span>
                              </div>
                            </div>
                          )}
                          <div className={`w-full border-2 border-dashed ${fileHomeLogo ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300'} rounded-2xl p-6 transition-all text-center relative cursor-pointer flex-1 flex flex-col items-center justify-center min-h-[120px]`}>
                            <input type="file" accept="image/*" onChange={e => setFileHomeLogo(e.target.files?.[0] || null)} ref={fileHomeLogoRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <div className="pointer-events-none flex flex-col items-center">
                              {fileHomeLogo ? (
                                <>
                                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                  </div>
                                  <p className="text-sm font-bold text-emerald-800 break-all">{fileHomeLogo.name}</p>
                                  <p className="text-xs text-emerald-600 mt-1 font-medium">Listo para subir</p>
                                </>
                              ) : (
                                <>
                                  <ImageIcon className="w-8 h-8 text-blue-400 mb-2" />
                                  <p className="text-sm font-bold text-slate-700">Subir nuevo logo</p>
                                  <p className="text-xs text-slate-400 mt-1">PNG o JPG (Fondo transparente)</p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mt-8">
                        <Label className="text-slate-700 font-bold">Video de Fondo Principal</Label>
                        <div className="flex flex-col sm:flex-row gap-4">
                          {homeVideoUrl && !fileHomeVideo && (
                            <div className="w-full sm:w-40 p-2 border border-slate-200 bg-slate-50 rounded-2xl text-center shrink-0 flex flex-col justify-center items-center relative group overflow-hidden">
                              <video src={homeVideoUrl} className="w-full h-20 object-cover rounded-xl shadow-sm" muted loop autoPlay playsInline />
                              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                                <span className="text-white text-xs font-bold px-2 text-center">Video Actual</span>
                              </div>
                            </div>
                          )}
                          <div className={`w-full border-2 border-dashed ${fileHomeVideo ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300'} rounded-2xl p-6 transition-all text-center relative cursor-pointer flex-1 flex flex-col items-center justify-center min-h-[120px]`}>
                            <input type="file" accept="video/mp4,video/webm" onChange={e => setFileHomeVideo(e.target.files?.[0] || null)} ref={fileHomeVideoRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <div className="pointer-events-none flex flex-col items-center">
                              {fileHomeVideo ? (
                                <>
                                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                  </div>
                                  <p className="text-sm font-bold text-emerald-800 break-all">{fileHomeVideo.name}</p>
                                  <p className="text-xs text-emerald-600 mt-1 font-medium">Listo para subir</p>
                                </>
                              ) : (
                                <>
                                  <ImageIcon className="w-8 h-8 text-blue-400 mb-2" />
                                  <p className="text-sm font-bold text-slate-700">Subir nuevo video</p>
                                  <p className="text-xs text-slate-400 mt-1">Formato MP4</p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 mt-10 border-t border-slate-100 pt-8 md:col-span-2">
                    <h4 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2"><PhoneIcon className="w-5 h-5 text-[#002b7f]" /> Información de Contacto Global</h4>
                    <p className="text-sm text-slate-500 mb-6">Esta información se actualizará automáticamente en el Footer y en la página de Contacto de toda la web.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-blue-500" /> Teléfono 1</Label>
                        <Input value={homeTelefono1} onChange={e => setHomeTelefono1(e.target.value)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-blue-500" /> Teléfono 2 (Opcional)</Label>
                        <Input value={homeTelefono2} onChange={e => setHomeTelefono2(e.target.value)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-blue-500" /> Teléfono 3 (Opcional)</Label>
                        <Input value={homeTelefono3} onChange={e => setHomeTelefono3(e.target.value)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold flex items-center gap-2"><MailIcon className="w-4 h-4 text-red-500" /> Email Principal</Label>
                        <Input value={homeEmail1} onChange={e => setHomeEmail1(e.target.value)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold flex items-center gap-2"><MailIcon className="w-4 h-4 text-red-500" /> Email Secundario (Opcional)</Label>
                        <Input value={homeEmail2} onChange={e => setHomeEmail2(e.target.value)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" />
                      </div>
                      <div className="space-y-3 lg:col-span-3">
                        <Label className="text-slate-700 font-bold flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-emerald-500" /> Dirección Principal</Label>
                        <Input value={homeDireccion} onChange={e => setHomeDireccion(e.target.value)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" />
                      </div>
                    </div>
                  </div>

                  {msg && (
                    <div className={`p-4 mt-8 mb-6 rounded-xl font-bold relative z-10 ${msg.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                      {msg}
                    </div>
                  )}

                  <Button type="submit" disabled={loading} className="h-14 px-8 bg-[#002b7f] hover:bg-blue-900 text-white font-bold rounded-xl shadow-lg shadow-[#002b7f]/25 transition-all w-full md:w-auto">
                    {loading ? uploadStatus || 'Guardando...' : 'Guardar Configuración de Portada'}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="empresas" className="mt-0 outline-none">
                <div className="space-y-10">
                  {showFormEmpresa ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl p-8 md:p-10 transition-all duration-700 bg-white border border-slate-200 shadow-xl shadow-[#002b7f]/5 relative z-10 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#002b7f] to-blue-400" />
                    <div id="form-empresa-header" className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black flex items-center gap-3 text-[#002b7f] tracking-tight">
                        <BuildingIcon className="w-6 h-6 text-[#002b7f]/70" />
                        {editingEmpresaId ? <span>Edición: <span className="font-medium text-slate-500">{nombre}</span></span> : 'Registrar Nueva Empresa'}
                      </h3>
                      <Button variant="ghost" onClick={() => { setShowFormEmpresa(false); setEditingEmpresaId(null); setNombre(''); setRif(''); setRubro(''); setDireccion(''); setTelefono(''); setTelefono2(''); setInstagram(''); setTiktok(''); setWeb(''); setEmail(''); setFile(null); setMsg(''); }} className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors rounded-xl h-10 px-4 font-bold">
                        <ArrowLeftIcon className="w-4 h-4 mr-2" /> Volver al Directorio
                      </Button>
                    </div>
                <form onSubmit={handleAddEmpresa} className="space-y-10">
                  
                  {/* SECCIÓN 1: INFORMACIÓN BÁSICA */}
                  <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                      <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <BuildingIcon className="w-5 h-5 text-blue-600" /> Información Empresarial
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">Datos fundamentales de la empresa y su clasificación.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-sm font-bold text-slate-700">Razón Social o Nombre Comercial</Label>
                        <Input id="nombre-empresa" name="nombreEmpresa" autoComplete="off" required value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej. Manufacturas Aragua C.A." className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-blue-500 text-base" disabled={loading} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700">RIF Empresarial</Label>
                        <Input required value={rif} onChange={e => setRif(e.target.value)} placeholder="J-12345678-9" className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-blue-500" disabled={loading} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700">Rubro Sectorial</Label>
                        <Input required value={rubro} onChange={e => setRubro(e.target.value)} placeholder="Ej. Metalmecánica, Textil..." className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-blue-500" disabled={loading} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700">Estatus de Membresía</Label>
                        <select 
                          value={estatus} 
                          onChange={e => setEstatus(e.target.value)} 
                          className="w-full h-12 rounded-xl border border-slate-200 bg-white shadow-sm px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                          disabled={loading}
                        >
                          <option value="Activa">🟢 Membresía Activa</option>
                          <option value="Pendiente">🟡 Trámite Pendiente</option>
                          <option value="Inactiva">🔴 Membresía Inactiva</option>
                          <option value="Desactivada">⛔ Desactivada (Falta de Pago)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700">Posición Visual</Label>
                        <Input type="number" value={ordenEmpresa} onChange={e => setOrdenEmpresa(parseInt(e.target.value) || 0)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-blue-500" disabled={loading} />
                      </div>
                    </div>
                  </div>

                  {/* SECCIÓN 2: CONTACTO */}
                  <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                      <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <MapPinIcon className="w-5 h-5 text-emerald-600" /> Contacto y Ubicación
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">Información de contacto público y redes sociales.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-sm font-bold text-slate-700">Dirección Física</Label>
                        <Input required value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Ej. Zona Industrial San Vicente..." className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-blue-500" disabled={loading} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700">Teléfono Principal</Label>
                        <Input value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="0243-5550000" className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-blue-500" disabled={loading} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700 flex items-center gap-1">Teléfono Secundario <span className="text-xs font-normal text-slate-400">(Opcional)</span></Label>
                        <Input value={telefono2} onChange={e => setTelefono2(e.target.value)} placeholder="0414-1234567" className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-blue-500" disabled={loading} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700 flex items-center gap-2"><svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> Instagram <span className="text-xs font-normal text-slate-400">(Opcional)</span></Label>
                        <Input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@tuempresa" className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-blue-500" disabled={loading} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700 flex items-center gap-2"><svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> TikTok <span className="text-xs font-normal text-slate-400">(Opcional)</span></Label>
                        <Input value={tiktok} onChange={e => setTiktok(e.target.value)} placeholder="@tuempresa" className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-blue-500" disabled={loading} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          <MailIcon className="w-4 h-4 text-blue-600" /> Correo Electrónico <span className="text-xs font-normal text-slate-400">(Opcional)</span>
                        </Label>
                        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="contacto@empresa.com" className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-blue-500" disabled={loading} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700 flex items-center gap-2"><svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Página Web <span className="text-xs font-normal text-slate-400">(Opcional)</span></Label>
                        <Input value={web} onChange={e => setWeb(e.target.value)} placeholder="www.tuempresa.com" className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-blue-500" disabled={loading} />
                      </div>
                    </div>
                  </div>

                  {/* SECCIÓN 3: IDENTIDAD VISUAL */}
                  <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                      <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-purple-600" /> Identidad Visual
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">Logotipo oficial para el directorio.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                      {editingEmpresaId && currentImagenEmpresa && !file && (
                        <div className="w-full md:w-64 p-4 border border-slate-200 bg-slate-50 rounded-2xl text-center shrink-0 flex flex-col justify-between">
                          <div>
                            <img src={currentImagenEmpresa} alt="Actual" className="w-24 h-24 object-contain mx-auto mb-3 bg-white rounded-lg p-2 border border-slate-200 shadow-sm" />
                            <p className="text-sm font-bold text-slate-700 mb-2">Logo Actual</p>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setCurrentImagenEmpresa(null)}
                            className="text-xs bg-white border border-red-200 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all w-full font-bold shadow-sm mt-4"
                          >
                            Eliminar Logo
                          </button>
                        </div>
                      )}

                      <div className={`w-full border-2 border-dashed ${file ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/30'} rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all relative group min-h-[160px]`}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={e => {
                              const selected = e.target.files?.[0];
                              if (selected) {
                                if (selected.size > 10 * 1024 * 1024) {
                                  alert("El archivo excede el límite de 10MB. Por favor, comprime la imagen.");
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
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        {file ? (
                          <div className="flex flex-col items-center z-20 pointer-events-none">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <p className="text-sm font-bold text-emerald-800 break-all px-2">{file.name}</p>
                            <p className="text-xs text-emerald-600 mt-1 font-medium">Listo para subir</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center pointer-events-none">
                            <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            </div>
                            <p className="text-sm font-bold text-slate-700">Arrastra o haz clic para subir logo</p>
                            <p className="text-xs text-slate-500 mt-1">Formato PNG o JPG. Tamaño recomendado 500x500px (Máx. 2MB)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* BOTONERA DE ACCIÓN */}
                  <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col md:flex-row items-center md:justify-between gap-4">
                    <div className="w-full md:w-auto flex-1">
                      {msg && <div className={`p-4 rounded-xl font-bold text-sm flex items-center gap-2 ${msg.includes('❌') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>{msg}</div>}
                      {loading && uploadStatus && <div className="text-sm font-bold text-blue-700 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3"><div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> {uploadStatus}</div>}
                    </div>
                    <Button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white h-14 px-12 rounded-xl font-bold shadow-md shadow-blue-600/20 transition-all text-base flex-shrink-0">
                      {loading ? 'Procesando...' : (editingEmpresaId ? 'Guardar Cambios' : 'Registrar Empresa')}
                    </Button>
                  </div>
                </form>
                  </motion.div>
                  ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 tracking-tight">Directorio de Empresas <span className="bg-[#002b7f]/10 text-[#002b7f] text-xs font-bold px-2.5 py-1 rounded-full ml-2">{listaEmpresas.length} en total</span></h3>
                        <p className="text-sm text-slate-500 mt-1">Gestiona las empresas afiliadas a Fedeindustria Aragua.</p>
                      </div>
                      <Button onClick={() => { setEditingEmpresaId(null); setNombre(''); setRif(''); setRubro(''); setDireccion(''); setTelefono(''); setTelefono2(''); setInstagram(''); setTiktok(''); setWeb(''); setEmail(''); setFile(null); setMsg(''); setShowFormEmpresa(true); }} className="bg-[#002b7f] hover:bg-blue-900 text-white shadow-md shadow-[#002b7f]/20 font-bold rounded-xl h-11 px-5 flex gap-2 items-center transition-all">
                        <PlusIcon className="w-5 h-5" /> Registrar Empresa
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-slate-50/50 min-h-[400px]">
                      {loadingListas ? (
                        <div className="p-12 text-center flex flex-col items-center justify-center">
                           <div className="w-8 h-8 border-4 border-blue-200 border-t-[#002b7f] rounded-full animate-spin mb-4" />
                           <p className="text-slate-500 font-medium">Cargando directorio...</p>
                        </div>
                      ) : listaEmpresas.length === 0 ? (
                        <div className="p-16 text-center flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-slate-200">
                          <BuildingIcon className="w-12 h-12 text-slate-300 mb-4" />
                          <p className="text-slate-500 font-medium">No hay empresas registradas todavía.</p>
                        </div>
                      ) : (
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'empresas')}>
                          <SortableContext items={listaEmpresas.map(e => e.id.toString())} strategy={verticalListSortingStrategy}>
                            <ul className="space-y-3">
                              {listaEmpresas.map(emp => (
                                <SortableItem key={emp.id} id={emp.id.toString()}>
                                  <div className="flex flex-col md:flex-row md:items-center justify-between w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                      <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center border border-slate-100 shadow-inner flex-shrink-0 group-hover:scale-105 transition-transform">
                                        {emp.logo_url ? <img src={emp.logo_url} className="w-full h-full object-contain p-1" alt="Logo" /> : <BuildingIcon className="w-6 h-6 text-slate-300" />}
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-slate-900 text-[15px] leading-tight group-hover:text-[#002b7f] transition-colors">{emp.nombre}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">{emp.rubro}</span>
                                          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md ${emp.estatus_membresia === 'Activa' ? 'bg-emerald-50 text-emerald-600' : emp.estatus_membresia === 'Pendiente' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>{emp.estatus_membresia}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3 md:pt-0 md:border-0 md:pl-4">
                                      <Button variant="ghost" onClick={() => handleEditEmpresa(emp)} className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg h-9 px-3 flex items-center gap-2 font-medium text-xs">
                                        <PencilIcon className="w-4 h-4" /> <span className="md:hidden lg:inline">Editar</span>
                                      </Button>
                                      <Button variant="ghost" onClick={() => handleDelete(emp.id, 'empresas_afiliadas')} className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg h-9 px-3 flex items-center gap-2 font-medium text-xs">
                                        <TrashIcon className="w-4 h-4" /> <span className="md:hidden lg:inline">Borrar</span>
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
                  </motion.div>
                  )}
                </div>
            </TabsContent>

            {/* CONTENIDO EVENTOS */}
            <TabsContent value="eventos" className="mt-0 outline-none">
                <div className="space-y-10">
                  {showFormEvento ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl p-8 md:p-10 transition-all duration-700 bg-white border border-slate-200 shadow-xl shadow-[#002b7f]/5 relative z-10 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#002b7f] to-emerald-400" />
                    <div id="form-evento-header" className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black flex items-center gap-3 text-[#002b7f] tracking-tight">
                        <CalendarIcon className="w-6 h-6 text-[#002b7f]/70" />
                        {editingEventoId ? <span>Edición: <span className="font-medium text-slate-500">{tituloEvento}</span></span> : 'Programar Nuevo Evento'}
                      </h3>
                      <Button variant="ghost" onClick={() => { setShowFormEvento(false); setEditingEventoId(null); setTituloEvento(''); setDescripcionEvento(''); setFechaEvento(''); setFechaEventoFin(''); setUbicacionEvento(''); setLinkDetallesEvento(''); setLinkMapaEvento(''); setFileEvento(null); setCurrentImagenEvento(null); setMsgEvento(''); }} className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors rounded-xl h-10 px-4 font-bold">
                        <ArrowLeftIcon className="w-4 h-4 mr-2" /> Volver a Agenda
                      </Button>
                    </div>
                  <CardContent className="p-8 space-y-6 bg-transparent">
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Título del Evento</Label>
                      <Input id="titulo-evento" name="tituloEvento" autoComplete="off" required value={tituloEvento} onChange={e => setTituloEvento(e.target.value)} placeholder="Ej. Asamblea Anual 2026..." className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Fecha de Inicio</Label>
                        <Input required type="date" value={fechaEvento} onChange={e => setFechaEvento(e.target.value)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Fecha de Fin (Opcional)</Label>
                        <Input type="date" value={fechaEventoFin} onChange={e => setFechaEventoFin(e.target.value)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-slate-400" /> Ubicación (Opcional)</Label>
                        <Input value={ubicacionEvento} onChange={e => setUbicacionEvento(e.target.value)} placeholder="Ej. Hotel Eurobuilding, Caracas" className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Link de Google Maps (Opcional)</Label>
                        <Input type="url" value={linkMapaEvento} onChange={e => setLinkMapaEvento(e.target.value)} placeholder="https://maps.app.goo.gl/..." className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Link "Ver Detalles" Externo (Opcional)</Label>
                      <Input type="url" value={linkDetallesEvento} onChange={e => setLinkDetallesEvento(e.target.value)} placeholder="https://instagram.com/p/..." className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
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
                            if (selected.size > 10 * 1024 * 1024) {
                              alert("El póster excede el límite de 10MB.");
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
                      <Input type="number" value={ordenEvento} onChange={e => setOrdenEvento(parseInt(e.target.value) || 0)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
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
                  ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 tracking-tight">Agenda de Eventos <span className="bg-[#002b7f]/10 text-[#002b7f] text-xs font-bold px-2.5 py-1 rounded-full ml-2">{listaEventos.length} en total</span></h3>
                        <p className="text-sm text-slate-500 mt-1">Administra los próximos eventos y actividades.</p>
                      </div>
                      <Button onClick={() => { setEditingEventoId(null); setTituloEvento(''); setDescripcionEvento(''); setFechaEvento(''); setFechaEventoFin(''); setUbicacionEvento(''); setLinkDetallesEvento(''); setLinkMapaEvento(''); setFileEvento(null); setCurrentImagenEvento(null); setMsgEvento(''); setShowFormEvento(true); }} className="bg-[#002b7f] hover:bg-blue-900 text-white shadow-md shadow-[#002b7f]/20 font-bold rounded-xl h-11 px-5 flex gap-2 items-center transition-all">
                        <PlusIcon className="w-5 h-5" /> Programar Evento
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-slate-50/50 min-h-[400px]">
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
                                      <span className="text-xs uppercase">{new Date(eve.fecha).toLocaleDateString('es-VE', { timeZone: 'UTC', month: 'short' })}</span>
                                      <span className="text-lg leading-none">{new Date(eve.fecha).getUTCDate()}</span>
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
                  </motion.div>
                  )}
                </div>
            </TabsContent>

            {/* CONTENIDO NOTICIAS */}
            <TabsContent value="noticias" className="mt-0 outline-none">
                <div className="space-y-10">
                  {showFormNoticia ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl p-8 md:p-10 transition-all duration-700 bg-white border border-slate-200 shadow-xl shadow-[#002b7f]/5 relative z-10 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#002b7f] to-amber-400" />
                    <div id="form-noticia-header" className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black flex items-center gap-3 text-[#002b7f] tracking-tight">
                        <NewspaperIcon className="w-6 h-6 text-[#002b7f]/70" />
                        {editingNoticiaId ? <span>Edición: <span className="font-medium text-slate-500">{tituloNoticia}</span></span> : 'Redactar Nueva Noticia'}
                      </h3>
                      <Button variant="ghost" onClick={() => { setShowFormNoticia(false); setEditingNoticiaId(null); setTituloNoticia(''); setResumenNoticia(''); setContenidoCompletoNoticia(''); setFileNoticia(null); setCurrentGaleriaNoticia([]); setGaleriaNoticia([]); setFechaPublicacionNoticia(''); setMsgNoticia(''); }} className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors rounded-xl h-10 px-4 font-bold">
                        <ArrowLeftIcon className="w-4 h-4 mr-2" /> Volver a Noticias
                      </Button>
                    </div>
                  <CardContent className="p-8 space-y-6 bg-transparent">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Título de la Noticia</Label>
                        <Input id="titulo-noticia" name="tituloNoticia" autoComplete="off" required value={tituloNoticia} onChange={e => setTituloNoticia(e.target.value)} placeholder="Ej. Fedeindustria firma nueva alianza con..." className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Fecha de Publicación</Label>
                        <Input type="date" value={fechaPublicacionNoticia} onChange={e => setFechaPublicacionNoticia(e.target.value)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
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
                            if (selected.size > 10 * 1024 * 1024) {
                              alert("La foto de portada excede el límite de 10MB.");
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
                              
                              const validFiles = newFiles.filter(f => f.size <= 10 * 1024 * 1024);
                              if (validFiles.length < newFiles.length) {
                                alert(`Se descartaron ${newFiles.length - validFiles.length} imágenes porque exceden el límite de 10MB cada una.`);
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
                      <Input type="number" value={ordenNoticia} onChange={e => setOrdenNoticia(parseInt(e.target.value) || 0)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
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
                  ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 tracking-tight">Sala de Prensa <span className="bg-[#002b7f]/10 text-[#002b7f] text-xs font-bold px-2.5 py-1 rounded-full ml-2">{listaNoticias.length} en total</span></h3>
                        <p className="text-sm text-slate-500 mt-1">Administra las noticias y notas de prensa publicadas.</p>
                      </div>
                      <Button onClick={() => { setEditingNoticiaId(null); setTituloNoticia(''); setResumenNoticia(''); setContenidoCompletoNoticia(''); setFileNoticia(null); setCurrentGaleriaNoticia([]); setGaleriaNoticia([]); setFechaPublicacionNoticia(''); setMsgNoticia(''); setShowFormNoticia(true); }} className="bg-[#002b7f] hover:bg-blue-900 text-white shadow-md shadow-[#002b7f]/20 font-bold rounded-xl h-11 px-5 flex gap-2 items-center transition-all">
                        <PlusIcon className="w-5 h-5" /> Redactar Noticia
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-slate-50/50 min-h-[400px]">
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
                                      <p className="text-xs text-slate-400 font-medium">{new Date(not.fecha_publicacion).toLocaleDateString('es-VE', { timeZone: 'UTC' })}</p>
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
                  </motion.div>
                  )}
                </div>
            </TabsContent>

            {/* CONTENIDO ALIADOS */}
            <TabsContent value="aliados" className="mt-0 outline-none">
                <div className="space-y-10">
                  {showFormAliado ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl p-8 md:p-10 transition-all duration-700 bg-white border border-slate-200 shadow-xl shadow-[#002b7f]/5 relative z-10 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#002b7f] to-purple-400" />
                    <div id="form-aliado-header" className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black flex items-center gap-3 text-[#002b7f] tracking-tight">
                        <ImageIcon className="w-6 h-6 text-[#002b7f]/70" />
                        {editingAliadoId ? <span>Edición: <span className="font-medium text-slate-500">{nombreAliado}</span></span> : 'Agregar Logo al Carrusel'}
                      </h3>
                      <Button variant="ghost" onClick={() => { setShowFormAliado(false); setEditingAliadoId(null); setNombreAliado(''); setFileAliado(null); setCurrentImagenAliado(null); setMsgAliado(''); }} className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors rounded-xl h-10 px-4 font-bold">
                        <ArrowLeftIcon className="w-4 h-4 mr-2" /> Volver al Carrusel
                      </Button>
                    </div>
                  <CardContent className="p-8 space-y-6 bg-transparent">
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold">Nombre de la Empresa o Marca</Label>
                      <Input id="nombre-aliado" name="nombreAliado" autoComplete="off" required value={nombreAliado} onChange={e => setNombreAliado(e.target.value)} placeholder="Ej. Bera, Nuciven, Lumalac..." className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-400" /> Logo Oficial para el Carrusel</Label>
                      
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
                            if (selected.size > 10 * 1024 * 1024) {
                              alert("El logo excede el límite de 10MB.");
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
                      <Input type="number" value={ordenAliado} onChange={e => setOrdenAliado(parseInt(e.target.value) || 0)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                  </CardContent>
                  <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full">
                      {msgAliado && <div className={`p-4 rounded-xl font-bold text-sm ${msgAliado.includes('❌') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>{msgAliado}</div>}
                    </div>
                    <Button onClick={handleAddAliado} disabled={loading} className="w-full md:w-auto bg-[#002b7f] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all text-base flex-shrink-0">
                      {loading ? 'Procesando...' : (editingAliadoId ? 'Guardar Cambios' : 'Agregar Logo al Carrusel')}
                    </Button>
                  </div>
                </motion.div>
                  ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 tracking-tight">Carrusel de Logos (Inicio) <span className="bg-[#002b7f]/10 text-[#002b7f] text-xs font-bold px-2.5 py-1 rounded-full ml-2">{listaAliados.length} en total</span></h3>
                        <p className="text-sm text-slate-500 mt-1">Gestiona las marcas y logos de empresas que se desplazan horizontalmente en la portada principal.</p>
                      </div>
                      <Button onClick={() => { setEditingAliadoId(null); setNombreAliado(''); setFileAliado(null); setCurrentImagenAliado(null); setMsgAliado(''); setShowFormAliado(true); }} className="bg-[#002b7f] hover:bg-blue-900 text-white shadow-md shadow-[#002b7f]/20 font-bold rounded-xl h-11 px-5 flex gap-2 items-center transition-all">
                        <PlusIcon className="w-5 h-5" /> Agregar Logo
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-slate-50/50 min-h-[400px]">
                    {loadingListas ? (
                      <div className="p-8 text-center text-slate-500 font-medium animate-pulse">Cargando registros...</div>
                    ) : listaAliados.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 font-medium">No hay logos registrados en el carrusel todavía.</div>
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
                  </motion.div>
                  )}
                </div>
            </TabsContent>

            {/* CONTENIDO JUNTA DIRECTIVA */}
            <TabsContent value="directiva" className="mt-0 outline-none">
                <div className="space-y-10">
                  {showFormDirectiva ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl p-8 md:p-10 transition-all duration-700 bg-white border border-slate-200 shadow-xl shadow-[#002b7f]/5 relative z-10 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#002b7f] to-orange-400" />
                    <div id="form-directiva-header" className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black flex items-center gap-3 text-[#002b7f] tracking-tight">
                        <UsersIcon className="w-6 h-6 text-[#002b7f]/70" />
                        {editingDirectivaId ? <span>Edición: <span className="font-medium text-slate-500">{nombreDirectiva}</span></span> : 'Registrar Nuevo Miembro'}
                      </h3>
                      <Button variant="ghost" onClick={() => { setShowFormDirectiva(false); setEditingDirectivaId(null); setNombreDirectiva(''); setCargoDirectiva(''); setFileDirectiva(null); setCurrentImagenDirectiva(null); setMsgDirectiva(''); }} className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors rounded-xl h-10 px-4 font-bold">
                        <ArrowLeftIcon className="w-4 h-4 mr-2" /> Volver a Junta Directiva
                      </Button>
                    </div>
                  <CardContent className="p-8 space-y-6 bg-transparent">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Nombre Completo</Label>
                        <Input id="nombre-directiva" name="nombreDirectiva" autoComplete="off" required value={nombreDirectiva} onChange={e => setNombreDirectiva(e.target.value)} placeholder="Ej. Juan Pérez" className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold">Cargo</Label>
                        <Input id="cargo-directiva" name="cargoDirectiva" autoComplete="off" required value={cargoDirectiva} onChange={e => setCargoDirectiva(e.target.value)} placeholder="Ej. Presidente" className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-bold flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-400" /> Fotografía</Label>
                      
                      {editingDirectivaId && currentImagenDirectiva && !fileDirectiva && (
                        <div className="mb-4 flex items-center justify-between p-4 border border-blue-100 bg-blue-50/50 rounded-xl relative group">
                          <div className="flex items-center gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={currentImagenDirectiva} alt="Actual" className="w-20 h-20 object-cover bg-white rounded-lg border border-blue-200 shadow-sm p-1" />
                            <div className="text-sm">
                              <p className="font-bold text-blue-900">Foto actual guardada</p>
                              <p className="text-blue-700">Sube una nueva abajo si deseas cambiarla.</p>
                            </div>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setCurrentImagenDirectiva(null)}
                            className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white rounded-full p-2 transition-all shadow-sm"
                            title="Eliminar foto actual"
                          >
                            <XIcon className="w-5 h-5" />
                          </button>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <Input type="file" accept="image/*" onChange={e => {
                          const selected = e.target.files?.[0];
                          if (selected) {
                            if (selected.size > 10 * 1024 * 1024) {
                              alert("La imagen excede el límite de 10MB.");
                              if (fileDirectivaRef.current) fileDirectivaRef.current.value = '';
                              return;
                            }
                            setFileDirectiva(selected);
                          } else {
                            setFileDirectiva(null);
                          }
                        }} ref={fileDirectivaRef} disabled={loading} className="h-12 bg-white shadow-sm cursor-pointer pt-3 rounded-xl border-slate-200 flex-1" />
                        {fileDirectiva && (
                          <button 
                            type="button" 
                            onClick={() => { setFileDirectiva(null); if(fileDirectivaRef.current) fileDirectivaRef.current.value = '' }}
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
                      <Input type="number" value={ordenDirectiva} onChange={e => setOrdenDirectiva(parseInt(e.target.value) || 0)} className="h-12 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-[#002b7f]" disabled={loading} />
                    </div>
                  </CardContent>
                  <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full">
                      {msgDirectiva && <div className={`p-4 rounded-xl font-bold text-sm ${msgDirectiva.includes('❌') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>{msgDirectiva}</div>}
                    </div>
                    <Button onClick={handleAddDirectiva} disabled={loading} className="w-full md:w-auto bg-[#002b7f] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all text-base flex-shrink-0">
                      {loading ? 'Procesando...' : (editingDirectivaId ? 'Guardar Cambios' : 'Agregar Miembro')}
                    </Button>
                  </div>
                </motion.div>
                  ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 tracking-tight">Junta Directiva <span className="bg-[#002b7f]/10 text-[#002b7f] text-xs font-bold px-2.5 py-1 rounded-full ml-2">{listaDirectiva.length} miembros</span></h3>
                        <p className="text-sm text-slate-500 mt-1">Gestiona los miembros de la Junta Directiva.</p>
                      </div>
                      <Button onClick={() => { setEditingDirectivaId(null); setNombreDirectiva(''); setCargoDirectiva(''); setFileDirectiva(null); setCurrentImagenDirectiva(null); setMsgDirectiva(''); setShowFormDirectiva(true); }} className="bg-[#002b7f] hover:bg-blue-900 text-white shadow-md shadow-[#002b7f]/20 font-bold rounded-xl h-11 px-5 flex gap-2 items-center transition-all">
                        <PlusIcon className="w-5 h-5" /> Agregar Miembro
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-slate-50/50 min-h-[400px]">
                    {loadingListas ? (
                      <div className="p-8 text-center text-slate-500 font-medium animate-pulse">Cargando registros...</div>
                    ) : listaDirectiva.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 font-medium">No hay miembros registrados.</div>
                    ) : (
                      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'directiva')}>
                        <SortableContext items={listaDirectiva.map(e => e.id.toString())} strategy={verticalListSortingStrategy}>
                          <ul className="divide-y divide-slate-100/0 space-y-2 p-2">
                            {listaDirectiva.map(dir => (
                              <SortableItem key={dir.id} id={dir.id.toString()}>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full overflow-hidden flex items-center justify-center border border-slate-200">
                                      {dir.imagen_url ? <img src={dir.imagen_url} className="w-full h-full object-cover" alt={dir.nombre} /> : <UsersIcon className="w-5 h-5 text-slate-400" />}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-slate-900">{dir.nombre}</h4>
                                      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{dir.cargo}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" onClick={() => handleEditDirectiva(dir)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl h-10 w-10 p-0 flex-shrink-0">
                                      <PencilIcon className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" onClick={() => handleDelete(dir.id, 'junta_directiva')} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-10 w-10 p-0 flex-shrink-0">
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
                  </motion.div>
                  )}
                </div>
            </TabsContent>

            
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
                        <div key={i} onClick={() => toggleMedioSelection(file.path)} className={`group cursor-pointer relative bg-white border-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all aspect-square flex flex-col ${isSelected ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200'}`}>
                          
                          {/* Checkbox Overlay */}
                          <div className="absolute top-3 left-3 z-20">
                            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-red-500 border-red-500 text-white' : 'bg-white/80 border-slate-300 text-transparent'}`}>
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
                </div>
              </div>
            </TabsContent>

            {/* MÓDULO DE SOLICITUDES DE AFILIACIÓN */}
            <TabsContent value="solicitudes" className="mt-0 outline-none">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-[#002b7f]/5 p-8 md:p-12 mb-10">
                <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <InboxIcon className="w-5 h-5" />
                  </div>
                  Buzón de Solicitudes de Afiliación
                </h3>
                <p className="text-slate-500 mb-8 font-medium">Gestiona las solicitudes de empresas interesadas en unirse a Fedeindustria Aragua.</p>

                <div className="space-y-4">
                  {listaSolicitudes.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <InboxIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <h4 className="text-lg font-bold text-slate-600">No hay solicitudes</h4>
                      <p className="text-slate-400">Aún no se han recibido formularios de contacto.</p>
                    </div>
                  ) : (
                    listaSolicitudes.map((sol) => (
                      <div key={sol.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        {/* Indicador lateral */}
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${sol.estatus === 'Pendiente' ? 'bg-red-500' : sol.estatus === 'Contactada' ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                        
                        <div className="flex flex-col md:flex-row justify-between gap-6 pl-4">
                          <div className="space-y-4 flex-1">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="text-xl font-black text-slate-900">{sol.empresa}</h4>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${sol.estatus === 'Pendiente' ? 'bg-red-50 text-red-600 border-red-200' : sol.estatus === 'Contactada' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                                  {sol.estatus}
                                </span>
                              </div>
                              <p className="text-slate-500 font-bold text-sm">RIF: {sol.rif}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                              <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Contacto</p>
                                <p className="text-slate-800 font-medium">{sol.persona_contacto}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Fecha</p>
                                <p className="text-slate-800 font-medium">{new Date(sol.created_at).toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}</p>
                              </div>
                            </div>
                            
                            {sol.mensaje && (
                              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                                <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">Mensaje Adjunto</p>
                                <p className="text-slate-700 font-medium text-sm leading-relaxed">{sol.mensaje}</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col gap-3 min-w-[200px] border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center md:text-left mb-1">Acciones Rápidas</p>
                            <a 
                              href={`https://wa.me/${sol.telefono.replace(/\D/g,'')}?text=Hola%20${encodeURIComponent(sol.persona_contacto)},%20hemos%20recibido%20su%20solicitud%20de%20afiliación%20para%20${encodeURIComponent(sol.empresa)}%20en%20Fedeindustria%20Aragua.`} 
                              target="_blank" rel="noopener noreferrer" 
                              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                            >
                              <PhoneIcon className="w-4 h-4" /> WhatsApp
                            </a>
                            <a 
                              href={`mailto:${sol.email}?subject=Respuesta a Solicitud de Afiliación - Fedeindustria Aragua`} 
                              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                            >
                              <MailIcon className="w-4 h-4" /> Enviar Correo
                            </a>
                            
                            <div className="h-px w-full bg-slate-100 my-1" />
                            
                            <select 
                              value={sol.estatus} 
                              onChange={(e) => handleUpdateSolicitud(sol.id, e.target.value)}
                              className="w-full text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="Pendiente">Marcar Pendiente</option>
                              <option value="Contactada">Marcar Contactada</option>
                              <option value="Completada">Marcar Completada</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

        </div>
      </main>
    </Tabs>
  )
}
