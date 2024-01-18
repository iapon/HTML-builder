const fs = require('fs');

// get abs path
const path = require('path');
const absPath = path.resolve(__dirname, './text.txt');

const stream = fs.createReadStream(absPath);

stream.on('data', (chunk) => {
  console.log(chunk.toString());
});
