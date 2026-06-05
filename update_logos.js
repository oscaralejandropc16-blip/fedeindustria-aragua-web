const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const https = require('https');
const path = require('path');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('configuracion_home').select('logo_url').eq('id', 1).single();
  if (error) {
    console.error('Error fetching logo:', error);
    return;
  }
  
  const logoUrl = data.logo_url;
  console.log('Found logo URL:', logoUrl);
  
  if (!logoUrl) {
    console.log('No logo URL found.');
    return;
  }

  const downloadImage = (url, destPath) => {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
          return;
        }
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
        file.on('error', (err) => {
          fs.unlink(destPath, () => reject(err));
        });
      }).on('error', reject);
    });
  };

  try {
    const publicLogoPath = path.join(__dirname, 'public', 'logo.png');
    const appIconPath = path.join(__dirname, 'src', 'app', 'icon.png');
    
    await downloadImage(logoUrl, publicLogoPath);
    console.log('Saved to public/logo.png');
    
    await downloadImage(logoUrl, appIconPath);
    console.log('Saved to src/app/icon.png');
    
    const faviconPath = path.join(__dirname, 'src', 'app', 'favicon.ico');
    if (fs.existsSync(faviconPath)) {
      fs.unlinkSync(faviconPath);
      console.log('Deleted old favicon.ico');
    }
  } catch (e) {
    console.error('Error downloading:', e);
  }
}

run();
