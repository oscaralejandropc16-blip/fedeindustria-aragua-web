const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ookbqfgsbwvnjqmdgmal.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9va2JxZmdzYnd2bmpxbWRnbWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjEyNTgsImV4cCI6MjA5NTA5NzI1OH0.jIzaM6xfL8U0GngsjD8dFVSmkV1wXyNIsnnuqc8Og18'
);

async function main() {
  const { data, error } = await supabase.from('configuracion_home').select('*').limit(1);
  console.log('Data:', data);
  console.log('Error:', error);
}

main();
