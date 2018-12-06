
import fs from 'fs-extra'
import path from 'path'
import {
    log
} from 'wow-cmd'

const copyArr = [
    {
        from: path.join(__dirname, '../src/assets/lib'),
        to: path.join(__dirname, '../dist/assets/lib'),
    },
];

const CopyUtil = {
    run (from, to) {
        this.mkDir(to);
        let loop;
        (loop = (fromDir, toDir) => {
            let fromFiles = fs.readdirSync(fromDir);
            fromFiles.forEach((file) => {
                let fromFilePath = path.join(fromDir, '/' + file);
                let toFilePath = path.join(toDir, '/' + file);
                let fromFileStat = fs.statSync(fromFilePath);
                if (fromFileStat.isFile()) {
                    let readable = fs.createReadStream(fromFilePath);       // 创建读取流
                    let writable = fs.createWriteStream(toFilePath);      // 创建写入流
                    readable.pipe(writable);
                } else if (fromFileStat.isDirectory()) {
                    if (!fs.existsSync(toFilePath)) {
                        fs.mkdirSync(toFilePath);
                    }
                    loop(fromFilePath, toFilePath);
                }
            })
        })(from, to);
    },

    mkDir (to) {
        let paths = to.split(path.sep);
        let filePath = '';
        paths.forEach((dir, index) => {
            !dir && (dir = '/');
            filePath = filePath ? path.join(filePath, dir) : dir;
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath);
            }
        });
    },
};

const Handle = (options, data) => new Promise((resolve, reject) => {
    let {
        params,
        parameters,
    } = options;
    if (!copyArr.length)
        return resolve();
    try {
        copyArr.forEach((item, index) => {
            let {
                from,
                to,
            } = item;
            CopyUtil.run(from, to);
        });
    } catch (e) {
        return reject(`复制目录出错：${e}`);
    }
    return resolve();
});

// 参数 options
Handle.options = {
    cmd: ['-c', '--copy'],
};

// 成功
Handle.success = (res, next) => {
    log(`复制目录成功`);
    next(res);
};

// 失败
Handle.error = (err, next) => {
    log(err, '004');
    next();
};

export default Handle;

