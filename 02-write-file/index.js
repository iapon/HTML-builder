const readline = require('readline');
const fs = require('fs');

const path = require('path');
const absPath = path.resolve(__dirname, './text.txt');

const stream = fs.createWriteStream(absPath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('SIGINT', () => {
  console.log('Thanks for using our SuperPupper CLI tool!');
  rl.close();
});

rl.question('What would you like to write to the file? \n', (answer) => {
  stream.write(answer);
});
rl.on('line', (line) => {
  stream.write(`\n${line}`);
});
