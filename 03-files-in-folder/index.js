const fs = require('fs');
const path = require('path');
const absPath = path.resolve(__dirname, './secret-folder');

fs.readdir(absPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    if (file.isFile()) {
      try {
        fs.stat(path.join(absPath, file.name), (_, stats) => {
          console.log(
            `${path.parse(file.name).name} - ${path
              .extname(file.name)
              .slice(1)} - ${stats.size} b`,
          );
        });
      } catch (err) {
        console.error(err);
        return;
      }
    }
  });
});
