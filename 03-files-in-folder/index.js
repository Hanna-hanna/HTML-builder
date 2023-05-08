const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(`Ошибка при чтении директории ${folderPath}: ${err}`);
    return;
  }

  console.log(`Содержимое папки ${folderPath}:`);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(`Ошибка при получении информации о файле ${filePath}: ${err}`);
        return;
      }

      console.log(`${file} (${stats.isDirectory() ? 'папка' : 'файл'})`);
    });
  });
});
