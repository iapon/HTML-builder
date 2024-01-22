const fs = require('fs').promises;
const path = require('path');
const absPath = path.resolve(__dirname, './secret-folder');

const showFiles = async () => {
  const files = await fs.readdir(absPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const stats = await fs.stat(path.join(absPath, file.name), 'utf-8');
      console.log(
        `${path.parse(file.name).name} - ${path
          .extname(file.name)
          .slice(1)} - ${stats.size} b`,
      );
    }
  }
};

const init = async () => {
  await showFiles();
};
if (require.main === module) {
  init();
}
module.exports = { showFiles };
