-- Añadir columna de fecha_fin a la tabla eventos (imagen_url ya existe)
ALTER TABLE eventos ADD COLUMN IF NOT EXISTS fecha_fin DATE NULL;
