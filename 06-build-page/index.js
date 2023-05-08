const fs = require('fs');
const path = require('path');

const folderProjectDist = path.join(__dirname, 'project-dist');
const fileTemplate = path.join(__dirname, 'template.html');
const folderComponents = path.join(__dirname, 'components');

// Html

const fileIndexHtml = path.join(folderProjectDist, 'index.html');

// Styles

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(distDir, 'style.css');

// Assets

const sourceDir = path.join(__dirname, 'assets');
const targetDir = path.join(folderProjectDist, 'assets');

fs.mkdir(folderProjectDist, { recursive: true }, (err) => {
    if (err) {
      console.error(`Ошибка при создании директории ${distDir}: ${err}`);
      return;
    }

    fs.readFile(fileTemplate, 'utf8', (err, templateContent) => {
        if (err) {
          console.error(`Ошибка при чтении директории ${folderComponents}: ${err}`);
          return;
        }
        fs.readdir(folderComponents, (err, files) => {
            if (err) {
              console.error(`Ошибка при чтении директории ${folderComponents}: ${err}`);
              return;
            }
    
            const componentContents = {};
        
            fs.readdir(folderComponents, (err, files) => {
                if (err) throw err;
              
                let count = 0;
              
                files.forEach((fileName) => {
                  const componentName = path.parse(fileName).name;
                  const componentPath = path.join(folderComponents, fileName);
              
                  fs.readFile(componentPath, 'utf8', (err, data) => {
                    if (err) throw err;
              
                    componentContents[componentName] = data;
                    count++;
              
                    if (count === files.length) {
                      replaceTemplate();
                    }
                  });
                });
              });
              
              function replaceTemplate() {
                fs.readFile(fileTemplate, 'utf8', (err, data) => {
                  if (err) throw err;
              
                  let output = data;
              
                  for (const componentName in componentContents) {
                    const placeholder = `{{${componentName}}}`;
                    const content = componentContents[componentName];
                    output = output.replace(placeholder, content);
                  }
              
                  fs.writeFile(fileIndexHtml, output, (err) => {
                    if (err) throw err;
              
                    console.log(`Файл html собран в ${fileIndexHtml}`);
                  });
                });
              }

        });
    });

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
});






