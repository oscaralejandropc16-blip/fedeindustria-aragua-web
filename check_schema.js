const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkSchema() {
  const { data, error } = await supabase.from('eventos').select('*').limit(1);
  if (error) {
    console.error('Error fetching eventos:', error);
  } else {
    if (data.length > 0) {
      console.log('Columnas:', Object.keys(data[0]));
    } else {
      console.log('No data, checking schema via rpc or other means is hard. Try fetching 1 row.');
    }
  }
}

checkSchema();
