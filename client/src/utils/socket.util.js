import Config           from 'config/env.config'


console.log('Socket')
class Socket {
    constructor () {
        console.log(1111111111)
        console.log(Config.SOCKET_URL)
        this.socket = io(Config.SOCKET_URL);
    }
    // 事件注册
    on (event, callback) {
        this.socket.on(event, callback);
        return this;
    }
    // 发送消息
    emit (event, data) {
        this.socket.emit(event, data);
        return this;
    }
}

export default Socket;
