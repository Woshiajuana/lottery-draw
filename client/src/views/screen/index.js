import $                from 'jquery'
import Toast            from 'utils/toast.util'
import Socket           from 'utils/socket.util'

// 列表控制器
const Controller = {
    $elInput: $('input'),

    $elPage: $('.view-wrap'),
    $elLoginPage: $('#login-wrap'),
    $elSignPage: $('#sign-wrap'),
    $elPrizePage: $('#prize-wrap'),
    $elLotteryPage: $('#lottery-wrap'),


    $elLoginBtn: $('#login-button'),
    $elLoginInput: $('#login-input'),

    socketService: {
        is: false,
        socket: null,
        event: [
            'error',
            'close',
            'disconnect',
        ],
    },
    init () {
        // this.socketService.socket = new Socket();
        // this.socketService.socket.on(this.socketService.event, this);
        this.$elInput.on('focus', this.handleFocus.bind(this));
        this.$elInput.on('blur', this.handleBlur.bind(this));
        this.$elLoginBtn.on('click', this.handleLogin.bind(this));
    },
    // 创建登录
    handleLogin () {
        let password = this.$elLoginInput.val();
        if (!password)
            return Toast.msg('请输入口令');
        if (!this.socketService.socket) {
            this.socketService.socket = new Socket();
            this.socketService.socket.on(this.socketService.event, this);
        }
        Toast.show();
        this.socketService.socket.emit('loginEvent', { password });
    },
    // input聚焦事件
    handleFocus (e) {
        $(e.target).parents('.input-wrap').addClass('focus');
    },
    // input失焦事件
    handleBlur (e) {
        $(e.target).parents('.input-wrap').removeClass('focus');
    },
    // 页面展示
    switchPage (page) {
        this.$elPage.removeClass('show');
        page && page.addClass('show');
    },



    // 登录事件处理
    loginEventHandle (data) {
        let {
            code,
            message,
        } = data;
        if (code === '0000') {
            this.switchPage(this.$elHomePage);
        } else {
            this.switchPage(this.$elLoginPage);
        }
        Toast.hide();
        Toast.msg(message);
    },


    // 断开链接
    disconnectHandle (data = '', socket) {
        console.log('断开链接', data);
        let {
            code,
            message,
        } = data;
        this.socketService.socket = null;
        this.switchPage(this.$elLoginPage);
        Toast.hide();
        message && Toast.msg(message);
    },
    // 链接错误
    errorHandle () {
        console.log('链接错误', data);
        this.switchPage(this.$elLoginPage);
    },
    // 链接关闭
    closeHandle () {
        console.log('链接关闭', data);
        this.switchPage(this.$elLoginPage);
    },
};
Controller.init();
