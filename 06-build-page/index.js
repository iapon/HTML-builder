const fs = require('fs').promises;
const path = require('path');
const { mergeStyles } = require('../05-merge-styles/index.js');
const { copyDir } = require('../04-copy-directory/index.js');

const bundle = async () => {
  await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
  let templateStr = await fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
  );
  await mergeStyles(
    path.join(__dirname, './styles'),
    path.join(__dirname, 'project-dist', 'style.css'),
  );
  await copyDir(
    path.join(__dirname, 'assets'),
    path.join(__dirname, 'project-dist', 'assets'),
  );
  const files = await fs.readdir(path.join(__dirname, 'components'));
  for (const file of files) {
    if (path.extname(file) === '.html') {
      const componentStr = await fs.readFile(
        path.join(__dirname, 'components', file),
        'utf-8',
      );
      templateStr = templateStr.replace(
        `{{${path.parse(file).name}}}`,
        componentStr,
      );
    }
  }
  await fs.writeFile(
    path.join(__dirname, 'project-dist', 'index.html'),
    templateStr,
  );
};

const init = async () => {
  await bundle();
};
if (require.main === module) {
  init();
}
