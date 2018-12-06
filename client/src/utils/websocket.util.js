import $                from 'jquery'
import Config           from 'config/env.config'


class WebSocketService {
    constructor () {
        this.websocket = new WebSocket(Config.SOCKET_URL);
    }
    // 事件注册
    on (event, callback) {
        callback && (this.websocket[event] = callback);
        return this;
    }
    // 发送消息
    send (message) {
        message && this.websocket.send(message);
        return this;
    }
}

export default WebSocketService;

// onclose      关闭
// onmessage    消息
// onopen       链接
