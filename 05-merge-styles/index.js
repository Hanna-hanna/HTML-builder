const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(distDir, 'bundle.css');

fs.readdir(stylesDir, (err, files) => {
  if (err) {
    console.error(`Ошибка при чтении директории ${stylesDir}: ${err}`);
    return;
  }

  const fileContents = files.map((fileName) => {
    const filePath = path.join(stylesDir, fileName);
    return fs.readFileSync(filePath, 'utf8');
  });

  const outputText = fileContents.join('\n');

  fs.mkdir(distDir, { recursive: true }, (err) => {
    if (err) {
      console.error(`Ошибка при создании директории ${distDir}: ${err}`);
      return;
    }

    fs.writeFile(outputFile, outputText, (err) => {
      if (err) {
        console.error(`Ошибка при записи файла ${outputFile}: ${err}`);
        return;
      }
      console.log(`Файл ${outputFile} успешно создан.`);
    });
  });
});
