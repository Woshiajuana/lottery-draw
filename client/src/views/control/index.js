import $                from 'jquery'
import Toast            from 'utils/toast.util'
import WebSocketService from 'utils/websocket.util'

// var socket = io('ws://localhost:8008');
// console.log(socket)
// 列表控制器
const Controller = {
    $elBtn: $('#button'),
    $elInput: $('#input'),
    webSocket: null,
    init () {
        // this.webSocket = new WebSocketService();
        this.addEvent();
    },
    addEvent() {
        this.$elBtn.on('click', this.handleSend.bind(this));
        // this.webSocket.on('onmessage', this.handleNews.bind(this))
        // socket.on('news', function (data) {
        //     console.log(data);
        // });
    },
    handleSend () {
        let value = this.$elInput.val();
        if (!value)
            return null;
        this.sendMessage(value);
    },
    sendMessage (msg) {
        // console.log(msg)
        // this.webSocket.send(msg);
        // socket.emit('my other event', { my: 'data' });
    },
    handleNews (e) {
        let msg = e.data;
        $('body').append(`<p>${msg}</p>`);
    },
};
Controller.init();
