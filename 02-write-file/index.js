const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const filePath = path.join(__dirname, 'example.txt');

const stream = fs.createWriteStream(filePath, { flags: 'a' });

console.log('Введите текст (для выхода введите "exit"):');

rl.on('line', (data) => {
    const input = data.toString().trim();
    
    if (input === 'exit') {
      console.log('Завершение работы программы...');
      process.exit();
    }

    stream.write(`${input}\n`);
    console.log(`Записано ${input}\n`);
 
});
  
rl.on('end', () => {
    console.log('Завершение работы программы...');
    process.exit();
});
  
rl.on('SIGINT', () => {
    console.log('Завершение работы программы...');
    process.exit();
  });

stream.on('close', () => {
    console.log('Поток записи закончен');
});
