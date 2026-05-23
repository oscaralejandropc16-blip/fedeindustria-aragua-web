import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ookbqfgsbwvnjqmdgmal.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9va2JxZmdzYnd2bmpxbWRnbWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjEyNTgsImV4cCI6MjA5NTA5NzI1OH0.jIzaM6xfL8U0GngsjD8dFVSmkV1wXyNIsnnuqc8Og18';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createUser() {
  const { data, error } = await supabase.auth.signUp({
    email: 'test@gmail.com',
    password: 'AdminPassword2026!'
  });
  
  if (error) {
    console.error('ERROR CREANDO USUARIO:', error.message);
  } else {
    console.log('USUARIO CREADO CON ÉXITO:');
    console.log('Email:', data.user?.email);
    console.log('Requiere confirmación de email (Session null):', data.session === null);
  }
}

createUser();
