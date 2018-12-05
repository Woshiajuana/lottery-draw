import $                from 'jquery'
import Toast            from 'utils/toast.util'
import WebSocketService from 'utils/websocket.util'

// 列表控制器
const DownloadController = {
    webSocket: null,
    init () {
        this.webSocket = new WebSocketService();
        this.addEvent();
    },
    addEvent() {
        this.webSocket.on('onmessage', this.handleNews.bind(this))
    },
    handleNews (e) {
        let msg = e.data;
        $('body').append(`<p>${msg}</p>`);
    },
};
DownloadController.init();
