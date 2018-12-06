
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
    socket.on('password', (data) => {
        console.log()
    });

    // 断开链接
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});





server.listen(9090);

console.log('Listening: 9090');
