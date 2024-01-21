const fs = require('fs');
const path = require('path');

const mergeStyles = (dirPath, destPath) => {
  const writeStream = fs.createWriteStream(destPath);
  writeStream.on('error', (err) => {
    console.error(err);
  });
  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((file) => {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const readStream = fs.createReadStream(path.join(dirPath, file.name));
        readStream.on('data', (chunk) => {
          writeStream.write(chunk.toString());
        });
      }
    });
  });
};

function init() {
  mergeStyles(
    path.join(__dirname, 'styles'),
    path.join(__dirname, 'project-dist', 'bundle.css'),
  );
}
if (require.main === module) {
  init();
}

module.exports = { init, mergeStyles };
