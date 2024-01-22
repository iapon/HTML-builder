const fs = require('fs').promises;
const path = require('path');

const mergeStyles = async (dirPath, destPath) => {
  let data = '';
  const files = await fs.readdir(dirPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      let fileData = await fs.readFile(path.join(dirPath, file.name), 'utf-8');
      data += fileData;
    }
  }
  await fs.writeFile(destPath, data);
};

const init = async () => {
  await mergeStyles(
    path.join(__dirname, 'styles'),
    path.join(__dirname, 'project-dist', 'bundle.css'),
  );
};
if (require.main === module) {
  init();
}

module.exports = { init, mergeStyles };
