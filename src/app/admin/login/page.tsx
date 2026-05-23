"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LockIcon } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200 rounded-2xl overflow-hidden">
        {/* Adorno superior azul marino */}
        <div className="h-2 w-full bg-[#002b7f]" />
        <CardHeader className="space-y-3 text-center pb-6 border-b border-slate-100 bg-white">
          <div className="mx-auto w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#002b7f] border border-blue-100">
            <LockIcon className="w-7 h-7" />
          </div>
          <CardTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">Panel Administrativo</CardTitle>
          <CardDescription className="text-slate-500 font-medium">
            Ingresa tus credenciales para gestionar el portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 bg-white">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold text-slate-700">Correo Electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="correo@empresa.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 border-slate-200 bg-slate-50 focus-visible:ring-[#002b7f]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-bold text-slate-700">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 border-slate-200 bg-slate-50 focus-visible:ring-[#002b7f]"
              />
            </div>
            
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3.5 rounded-lg border border-red-100 font-bold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error === 'Invalid login credentials' ? 'Credenciales inválidas' : error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-[#002b7f] hover:bg-blue-900 text-white h-12 rounded-lg font-bold text-md transition-all shadow-md mt-2"
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Iniciar Sesión'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
