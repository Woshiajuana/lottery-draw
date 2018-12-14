import Config           from 'config/env.config'

class Socket {
    constructor (ctx) {
        // this.socket = io(Config.SOCKET_URL);
        this.socket = io.connect(Config.SOCKET_URL);
        this.ctx = ctx;
    }
    // 事件注册
    on (event, callback) {
        if (typeof event === 'string') {
            this.socket.on(event, callback);
        }
        if (typeof event === 'object') {
            event.forEach((e = '') => {
                let handle = `${e}Handle`;
                this.socket.on(e, (data) => {
                    if (data && typeof data === 'string')
                        data = JSON.parse(data);
                    callback[handle] && callback[handle](data, this.socket);
                });
            });
        }
        return this;
    }
    // 发送消息
    emit (event, data) {
        if (typeof data === 'object')
            data = JSON.stringify(data);
        this.socket.emit(event, data, (data) => {
            console.log(data)
            if (data && typeof data === 'string')
                data = JSON.parse(data);
            let handle = `${event}Handle`;
            this.ctx && this.ctx[handle] && this.ctx[handle](data, this.socket);
        });
        return this;
    }
}

export default Socket;
