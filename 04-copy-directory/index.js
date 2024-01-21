const fs = require('fs');
const path = require('path');
const secretPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

//dunno why we do that sphagetty code and not use async/await
const copyDir = () => {
  fs.rm(copyPath, { recursive: true }, () => {
    fs.mkdir(copyPath, { recursive: true }, () => {
      fs.readdir(secretPath, { withFileTypes: true }, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files.forEach((file) => {
          if (file.isFile()) {
            fs.copyFile(
              path.join(secretPath, file.name),
              path.join(copyPath, file.name),
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
copyDir();
