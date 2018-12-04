
const fs = require('fs');
const path = require('path');


module.exports = {
    run (dirPath, cut = '') {
        let result = {};
        let loop;
        (loop = (dir) => {
            fs.readdirSync(dir).forEach((file) => {
                let filePath = path.join(dir, '/' + file);
                let fileStat = fs.statSync(filePath);
                if (fileStat.isFile() && file === 'entry.js') {
                    let fileDirArr = filePath.substring(filePath.indexOf(cut) + cut.length + 1).replace(/\\/g, '/').split('\/');
                    fileDirArr = unique(fileDirArr);
                    let key = fileDirArr.join('_');
                    result[key] = filePath;
                } else if (fileStat.isDirectory()) {
                    loop(filePath);
                }
            });
        })(dirPath);
        return result;
    }
};
function unique(array){
    let n = [];
    for(let i = 0; i < array.length; i++){
        if (n.indexOf(array[i]) === -1 && array[i] !== 'entry.js') n.push(array[i]);
    }
    return n;
}
