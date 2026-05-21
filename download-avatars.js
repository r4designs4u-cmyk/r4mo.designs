const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  'https://i.postimg.cc/8c1S4rwg/channels4-profile.jpg',
  'https://i.postimg.cc/C5Fg7fJT/channels4-profile-(1).jpg',
  'https://i.postimg.cc/3NKT1D1z/channels4-profile-(2).jpg',
  'https://i.postimg.cc/pr2HCnC7/channels4-profile-(3).jpg',
  'https://i.postimg.cc/RhMBdndg/channels4-profile-(4).jpg',
  'https://i.postimg.cc/yxVHjSjG/channels4-profile-(5).jpg',
  'https://i.postimg.cc/wM6p2s20/channels4-profile-(6).jpg'
];

const dir = path.join(__dirname, 'public', 'uploads', 'avatars');

// Create directory if it doesn't exist
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`Created directory: ${dir}`);
}

let completed = 0;
let failed = 0;

urls.forEach((url, idx) => {
  const filename = path.join(dir, `creator-${idx}.jpg`);
  const file = fs.createWriteStream(filename);

  https.get(url, (response) => {
    if (response.statusCode !== 200) {
      file.close();
      fs.unlink(filename, () => {});
      console.log(`❌ Failed to download image ${idx + 1}: Status ${response.statusCode}`);
      failed++;
      return;
    }

    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log(`✅ Downloaded: creator-${idx}.jpg`);
      completed++;
      
      if (completed + failed === urls.length) {
        console.log(`\n✨ Complete! Downloaded ${completed} images, ${failed} failed.`);
        console.log(`Images saved to: ${dir}`);
      }
    });
  }).on('error', (err) => {
    file.close();
    fs.unlink(filename, () => {});
    console.log(`❌ Error downloading image ${idx + 1}: ${err.message}`);
    failed++;
  });
});
