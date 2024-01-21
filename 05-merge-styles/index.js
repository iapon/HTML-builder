const fs = require('fs');
const path = require('path');

const mergeStyles = (dirPath, destPath, bundleName) => {
  const writeStream = fs.createWriteStream(
    path.join(__dirname, destPath, bundleName),
  );
  fs.readdir(
    path.join(__dirname, dirPath),
    { withFileTypes: true },
    (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      files.forEach((file) => {
        if (file.isFile() && path.extname(file.name) === '.css') {
          const readStream = fs.createReadStream(
            path.join(__dirname, dirPath, file.name),
          );
          readStream.on('data', (chunk) => {
            writeStream.write(chunk.toString());
          });
        }
      });
    },
  );
};

function init() {
  mergeStyles('styles', 'project-dist', 'bundle.css');
}
if (require.main === module) {
  init();
}

module.exports = { init, mergeStyles };
