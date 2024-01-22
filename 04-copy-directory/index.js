const fs = require('fs').promises;
const path = require('path');

const copyDir = async (dirPath, destPath) => {
  await fs.rm(destPath, { recursive: true, force: true });
  await fs.mkdir(destPath, { recursive: true });
  await copyItem(dirPath, destPath);
};
const copyItem = async (dirPath, destPath) => {
  const files = await fs.readdir(dirPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      await fs.copyFile(
        path.join(dirPath, file.name),
        path.join(destPath, file.name),
      );
    } else {
      copyDir(path.join(dirPath, file.name), path.join(destPath, file.name));
    }
  }
};

//invoke
const init = async () => {
  await copyDir(
    path.join(__dirname, 'files'),
    path.join(__dirname, 'files-copy'),
  );
};
if (require.main === module) {
  init();
}

module.exports = { init, copyDir };
