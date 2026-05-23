ALTER TABLE eventos ADD COLUMN IF NOT EXISTS ubicacion TEXT NULL;
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS link_detalles TEXT NULL;
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS link_mapa TEXT NULL;

-- Este comando obliga a Supabase a reconocer las nuevas columnas inmediatamente
NOTIFY pgrst, 'reload schema';
