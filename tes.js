const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


function generateDotVariants(username) {
  const results = [];
  const n = username.length;
  const maxMask = 1 << (n - 1);

  for (let mask = 0; mask < maxMask; mask++) {
    let variant = '';
    for (let i = 0; i < n; i++) {
      variant += username[i];
      if (i < n - 1 && (mask & (1 << i))) {
        variant += '.';
      }
    }
    results.push(`${variant}@gmail.com`);
  }
  return results;
}

readline.question('Masukkan username Gmail (tanpa titik): ', (username) => {
  if (!username || username.length < 1) {
    console.error('Username tidak valid.');
    readline.close();
    return;
  }

  const cleaned = username.trim();
  const variants = generateDotVariants(cleaned);

  const output = variants.join('\n');
  fs.writeFile('email.txt', output, (err) => {
    if (err) {
      console.error('Gagal menyimpan ke file email.txt:', err);
    } else {
      console.log(`Berhasil menyimpan ${variants.length} varian ke file email.txt`);
    }
    readline.close();
  });
});
