CREATE TABLE IF NOT EXISTS configuracion_home (
  id INT PRIMARY KEY DEFAULT 1,
  titulo TEXT NOT NULL,
  subtitulo TEXT NOT NULL,
  video_url TEXT NOT NULL
);

-- Insertar valores por defecto si no existen
INSERT INTO configuracion_home (id, titulo, subtitulo, video_url) 
VALUES (
  1, 
  'Conectamos el Futuro de la Industria', 
  'Únete a la red empresarial más sólida de la región central. Innovación, representación y crecimiento para tu empresa.',
  '/video-industrial.mp4'
) ON CONFLICT (id) DO NOTHING;
