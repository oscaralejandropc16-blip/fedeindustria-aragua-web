const https = require('https');

https.get('https://pixabay.com/videos/search/factory/', {headers: {'User-Agent': 'Mozilla/5.0'}}, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const matches = data.match(/https:\/\/cdn\.pixabay\.com\/video\/[0-9]{4}\/[0-9]{2}\/[0-9]{2}\/[^\"]+\.mp4/g);
    console.log(matches ? matches.slice(0, 3) : 'No');
  });
});
