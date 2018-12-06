
import http                 from 'http'
import Koa                  from 'koa'
const app = new Koa();
const server = http.createServer(app.callback());
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.emit('connect success', { hello: 'world' });
    socket.on('password', function (data) {
        console.log(data);
    });
});


server.listen(9090);

console.log('Listening: 9090');
