const fs = require('fs');
const path = require('path');
const { mergeStyles } = require('../05-merge-styles/index.js');
const { copyDir } = require('../04-copy-directory/index.js');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, () => {
  let templateStr = '';

  const templateSteam = fs.createReadStream(
    path.join(__dirname, 'template.html'),
    'utf-8',
  );
  templateSteam.on('data', (chunk) => {
    templateStr += chunk;
  });
  templateSteam.on('end', () => {
    mergeStyles(
      path.join(__dirname, './styles'),
      path.join(__dirname, 'project-dist', 'style.css'),
    );
    fs.readdir(
      path.join(__dirname, 'assets'),
      { withFileTypes: true },
      (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files.forEach((file) => {
          if (!file.isFile()) {
            copyDir(
              path.join(__dirname, 'assets', file.name),
              path.join(__dirname, 'project-dist', 'assets', file.name),
            );
          }
        });
      },
    );

    fs.readdir(
      path.join(__dirname, 'components'),
      { withFileTypes: true },
      (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files.forEach((file) => {
          if (file.isFile() && path.extname(file.name) === '.html') {
            fs.readFile(
              path.join(__dirname, 'components', file.name),
              'utf-8',
              (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }
                templateStr = templateStr.replace(
                  `{{${path.parse(file.name).name}}}`,
                  data,
                );
                const writeStream = fs.createWriteStream(
                  path.join(__dirname, 'project-dist', 'index.html'),
                );
                writeStream.write(templateStr);
              },
            );
          }
        });
      },
    );
  });
});
