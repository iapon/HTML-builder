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
        const stats = fs.statSync(path.join(absPath, file.name));
        console.log(
          `${path.parse(file.name).name} - ${path
            .extname(file.name)
            .slice(1)} - ${toKiloBytes(stats.size)}`,
        );
      } catch (err) {
        console.error(err);
        return;
      }
    }
  });
});

const toKiloBytes = (bytes) => {
  return `${(bytes / 1000).toFixed(1)} KB`;
};
