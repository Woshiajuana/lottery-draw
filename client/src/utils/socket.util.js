import Config           from 'config/env.config'

class Socket {
    constructor () {
        this.socket = io(Config.SOCKET_URL);
    }
    // 事件注册
    on (event, callback) {
        if (typeof event === 'string') {
            this.socket.on(event, callback);
        }
        if (typeof event === 'object') {
            event.forEach((e = '') => {
                let handle = `handle${e.toUpperCase().substring(0,1)}${e.substring(1)}`;
                this.socket.on(e, (data) => {
                    callback[handle] && callback[handle](data, this);
                });
            });
        }
        return this;
    }
    // 发送消息
    emit (event, data) {
        this.socket.emit(event, data);
        return this;
    }
}

export default Socket;
