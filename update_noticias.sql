-- Script para agregar columnas a la tabla 'noticias'
ALTER TABLE public.noticias
ADD COLUMN IF NOT EXISTS contenido_completo TEXT;

ALTER TABLE public.noticias
ADD COLUMN IF NOT EXISTS galeria_urls TEXT[];

-- Puedes ejecutar esto desde el SQL Editor en Supabase.
