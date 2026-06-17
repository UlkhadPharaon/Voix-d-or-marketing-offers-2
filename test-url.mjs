import https from 'https';
https.get('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode', (res) => {
  console.log('Status:', res.statusCode);
});
