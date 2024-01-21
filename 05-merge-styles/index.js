const fs = require('fs');
const path = require('path');

const writeStream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
);

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((file) => {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const readStream = fs.createReadStream(
          path.join(__dirname, 'styles', file.name),
        );
        readStream.on('data', (chunk) => {
          writeStream.write(chunk.toString());
        });
      }
    });
  },
);
