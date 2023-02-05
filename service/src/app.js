
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
    socket.on('loginEvent', (data = '') => {
        console.log('data => ', data, typeof data);
        data = JSON.parse(data)
        try {
            let {
                password,
            } = data;
            if (!password)
                throw new Error();
            let isRight = false;
            console.log('password => ', password, screenClient)
            for (let key in controllerClient) {
                if (key === password) {
                    controllerClient[key] = socket;
                    isRight = true;
                    console.log(`控制器${password}进入`);
                }
            }
            for (let key in screenClient) {
                if (key === password) {
                    screenClient[key] = socket;
                    isRight = true;
                    console.log(`大屏幕${password}进入`);
                }
            }
            if (!isRight)
                throw new Error();
            socket.emit('loginEvent', { code: '0000', msg: '登录成功！'})
        } catch (e) {
            socket.emit('loginEvent', { code: '-1', msg: '口令错误！'})
        }
    });

    // 菜单
    socket.on('menu', (data) => {
        console.log(data);
        try {
            let {
                type,
                title,
            } = data;
            broadcastSocket(screenClient, 'menu', {code: '0000', data, msg: '成功'});
        } catch (e) {
            socket.emit('password', { code: '-1', msg: e.toString()})
        }
    });

    // 断开链接
    socket.on('disconnect', () => {
        // console.log('user disconnected');
    });

});

function verifyIdentity (socket, sockets) {
    let result = false;
    verifyIdentity()
}

function broadcastSocket(sockets, event, data) {
    let result = false;
    for (let key in sockets) {
        let socket = sockets[key];
        if (socket) {
            socket.emit(event, data);
            result = true;
        }
    }
    if (!result)
        throw '暂无客户端接入';
}


server.listen(9090);

console.log('Listening: 9090');
