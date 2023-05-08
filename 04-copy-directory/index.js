const fs = require('fs');
const path = require('path');


const sourceDir = path.join(__dirname, 'files');

const targetDir = path.join(__dirname, 'files-copy');

copyDir(sourceDir, targetDir);

function copyDir(sourceDir, targetDir) {
  fs.mkdir(targetDir, { recursive: true }, (err) => {
    if (err) {
      console.error(`Ошибка при создании директории ${targetDir}: ${err}`);
      return;
    }

    fs.readdir(sourceDir, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error(`Ошибка при чтении директории ${sourceDir}: ${err}`);
        return;
      }

      files.forEach((file) => {
        const sourceFile = path.join(sourceDir, file.name);
        const targetFile = path.join(targetDir, file.name);

        if (file.isDirectory()) {
          copyDir(sourceFile, targetFile);
        } else {
          fs.copyFile(sourceFile, targetFile, (err) => {
            if (err) {
              console.error(`Ошибка при копировании файла ${sourceFile}: ${err}`);
              return;
            }
            console.log(`Файл ${sourceFile} успешно скопирован в ${targetFile}`);
          });
        }
      });
    });
  });
}
