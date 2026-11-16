-- Script de migración: Añadir Misión y Visión a configuracion_home
-- Ejecuta este script en el SQL Editor de tu proyecto Supabase

-- 1. Añadir columnas 'mision' y 'vision' si no existen
ALTER TABLE configuracion_home 
ADD COLUMN IF NOT EXISTS mision TEXT,
ADD COLUMN IF NOT EXISTS vision TEXT;

-- 2. Actualizar la fila única (id: 1) con los nuevos textos oficiales
UPDATE configuracion_home 
SET 
  mision = 'Respaldar la industria aragueña con fé y alianzas para el progreso',
  vision = 'Liderar la transformación industrial en el estado Aragua.'
WHERE id = 1;

-- 3. Notificar a PostgREST para recargar el schema cache inmediatamente
NOTIFY pgrst, 'reload schema';
