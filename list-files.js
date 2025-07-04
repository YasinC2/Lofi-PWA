const fs = require('fs');
const path = require('path');

const baseDir = process.cwd(); // Current directory

function getAllFiles(dir, fileList = []) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      // Get path relative to baseDir and use forward slashes
      fileList.push(path.relative(baseDir, filePath).replace(/\\/g, '/'));
    }
  });
  return fileList;
}

const files = getAllFiles(baseDir);
console.log(JSON.stringify(files, null, 2));