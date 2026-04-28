const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('data.txt'),
  crlfDelay: Infinity
});

let lineCount = 0;

rl.on('line', (line) => {
  lineCount++;

  if (lineCount % 100 === 0) {
    console.log(`Line ${lineCount}: ${line}`);
  }
});

rl.on('close', () => {
  console.log(`Total lines: ${lineCount}`);
});

rl.on('error', (err) => {
  if (err.code === 'ENOENT') {
    console.error('File not found: data.txt');
  } else {
    console.error('Error reading file:', err.message);
  }
  process.exit(1);
});