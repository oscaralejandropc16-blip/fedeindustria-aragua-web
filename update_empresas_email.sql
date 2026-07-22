ALTER TABLE empresas_afiliadas ADD COLUMN IF NOT EXISTS email TEXT NULL;

-- Este comando obliga a Supabase a reconocer la nueva columna inmediatamente
NOTIFY pgrst, 'reload schema';
