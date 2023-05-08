const fs = require('fs');
const path = require('path');

const fileName = 'text.txt';
const filePath = path.join(__dirname, fileName);

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return err;
  }
  console.log(data);
});