const fs = require('fs');
const path = require('path');

const getCurrentDirectoryBase = () => {
    return path.basename(process.cwd());
}

const directoryExists = (filePath) => {
    try {
        return fs
            .statSync(filePath)
            .isDirectory();
    } catch (err) {
        return false;
    }
}

const fileToArr =(path) =>{
    const file = fs.readFileSync(path, 'utf8');
    return file.split('\n').filter(l => l.charAt(0) !== '#' && l.charAt(0) !== '\r')
}

module.exports = {
    fileToArr,
    getCurrentDirectoryBase,
    directoryExists
};