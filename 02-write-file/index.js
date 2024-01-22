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
  console.log('\nThanks for using our SuperPupper CLI tool!');
  let data = rl.history;
  if (rl.history.length > 0) {
    if (data[0] == 'exit') {
      data.shift();
    }
  }
  stream.write(data.reverse().join('\n').toString());
  rl.close();
});
rl.on('line', (prompt) => {
  if (prompt == 'exit') rl.emit('SIGINT');
});
rl.question('What would you like to write to the file? \n', (answer) => {
  stream.write(answer);
});
