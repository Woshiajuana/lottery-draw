import $                from 'jquery'
import Toast            from 'utils/toast.util'
import WebSocketService from 'utils/websocket.util'

// 列表控制器
const Controller = {
    $elBtn: $('#button'),
    $elInput: $('#input'),
    webSocket: null,
    init () {
        this.webSocket = new WebSocketService();
        this.addEvent();
    },
    addEvent() {
        this.$elBtn.on('click', this.handleSend.bind(this));
    },
    handleSend () {
        console.log(1111)
        let value = this.$elInput.val();
        if (!value)
            return null;
        this.sendMessage(value);
    },
    sendMessage (msg) {
        console.log(msg)
        this.webSocket.send(msg);
    },
};
Controller.init();
