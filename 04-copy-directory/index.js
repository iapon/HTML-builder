const fs = require('fs');
const path = require('path');

//dunno why we do that sphagetty code and not use async/await
const copyDir = (dirPath, destPath) => {
  destPath = path.join(__dirname, destPath);
  dirPath = path.join(__dirname, dirPath);
  fs.rm(destPath, { recursive: true }, () => {
    fs.mkdir(destPath, { recursive: true }, () => {
      fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files.forEach((file) => {
          if (file.isFile()) {
            fs.copyFile(
              path.join(dirPath, file.name),
              path.join(destPath, file.name),
              (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              },
            );
          }
        });
      });
    });
  });
};

//invoke
function init() {
  copyDir('files', 'files-copy');
}
if (require.main === module) {
  init();
}

module.exports = { init, copyDir };
