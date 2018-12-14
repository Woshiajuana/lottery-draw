import $                from 'jquery'
import Toast            from 'utils/toast.util'
import Socket           from 'utils/socket.util'

// 列表控制器
const Controller = {
    $elPage: $('.view-wrap'),
    $elLoginPage: $('#login-wrap'),
    $elSignPage: $('#sign-wrap'),
    $elPrizePage: $('#prize-wrap'),
    $elLotteryPage: $('#lottery-wrap'),
    $elBtn: $('#login-button'),
    $elInput: $('#login-input'),
    socketService: {
        is: false,
        socket: null,
        event: [
            'success',
            'error',
            'close',
            'message',
            'disconnect',
            'password',
            'menu',
        ],
    },
    init () {
        // this.socketService.socket = new Socket();
        // this.socketService.socket.on(this.socketService.event, this);
        this.$elBtn.on('click', this.handleLogin.bind(this));
    },
    // 创建登录
    handleLogin () {
        let password = this.$elInput.val();
        if (!password)
            return Toast.msg('请输入口令');
        if (!this.socketService.socket) {
            this.socketService.socket = new Socket();
            this.socketService.socket.on(this.socketService.event, this);
        }
        Toast.show();
        this.socketService.socket.emit('loginEvent', { password });
    },
    // 页面展示
    switchPage (page) {
        this.$elPage.removeClass('show');
        if (page === this.$elLoginPage) {
            this.$elMenuBtn.addClass('hidden');
        } else {
            this.$elMenuBtn.removeClass('hidden');
        }
        page && page.addClass('show');
    },
    menuHandle (result, socket) {
        let {
            code,
            msg,
            data
        } = result;
        if (code !== '0000')
            return Toast.msg(msg);
        let {
            type
        } = data;
        this.$elPage.removeClass('show');
        switch (type) {
            case '0001':
                this.$elSignPage.addClass('show');
                break;
            case '0002':
                this.$elPrizePage.addClass('show');
                break;
            case '0003':
                this.$elLotteryPage.addClass('show');
                break;
        }
    },
    // 断开链接
    disconnectHandle (data) {
        console.log('断开链接', data);
        let {
            code,
            message,
        } = data;
        this.socketService.socket = null;
        this.switchPage(this.$elLoginPage);
        Toast.hide();
        Toast.msg(message);
    },
};
Controller.init();
