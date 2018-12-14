import Config           from 'config/env.config'

class Socket {
    constructor () {
        // this.socket = io(Config.SOCKET_URL);
        this.socket = io.connect(Config.SOCKET_URL);
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
                    callback[handle] && callback[handle](data, this);
                });
            });
        }
        return this;
    }
    // 发送消息
    emit (event, data, callback) {
        if (typeof data === 'object')
            data = JSON.stringify(data);
        this.socket.emit(event, data, callback);
        return this;
    }
}

export default Socket;
