// 4. Simple File Writer
// Write a CLI script that:

// Takes two arguments: node writer.js hello.txt "Hello World"

// Writes the second argument to the file named in the first argument

// Uses fs.writeFile and handles errors (permission, invalid path, etc.)

const fs = require('fs');
const filename = process.argv[2];
const content  = process.argv[3];

if (!filename || !content) {
  console.error('Usage: node qn4.js <filename> <content>');
  process.exit(1);
}

fs.writeFile(filename, content, 'utf8', (err) => {

  if (err) {

    
    if (err.code === 'EACCES') {
      console.error('Permission denied — cannot write to', filename);

    } else if (err.code === 'ENOENT') {
      console.error('Invalid path — folder does not exist:', filename);

    } else if (err.code === 'EISDIR') {
      console.error('That is a directory, not a file:', filename);

    } else {
      console.error('Error writing file:', err.message);
    }

    process.exit(1);
  }
  console.log(` Successfully wrote to "${filename}"`);
});
