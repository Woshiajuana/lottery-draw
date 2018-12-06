
import http                 from 'http'
import Koa                  from 'koa'
const app = new Koa();
const server = http.createServer(app.callback());
const io = require('socket.io')(server);

const controllerClient = {
    '666': null,
};    // 控制器
const screenClient = {
    '000': null,
};        // 大屏幕

io.on('connection', (socket) => {

    // 触发链接成功
    socket.emit('success', {});

    // 验证口令
    socket.on('password', (data = '') => {
        try {
            let {
                password,
            } = data;
            if (!password)
                throw new Error();
            let isRight = false;
            for (let key in controllerClient) {
                if (key === password) {
                    controllerClient[key] = socket;
                    isRight = true;
                }
            }
            if (!isRight)
                throw new Error();
            socket.emit('password', { code: '0000', msg: '登录成功！'})
        } catch (e) {
            socket.emit('password', { code: '-1', msg: '口令错误！'})
        }
    });

    // 断开链接
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});





server.listen(9090);

console.log('Listening: 9090');
