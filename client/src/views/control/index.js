import $                from 'jquery'
import Toast            from 'utils/toast.util'
import Socket           from 'utils/socket.util'

// 登录控制器
const Controller = {
    $elPage: $('#login-wrap'),
    $elBtn: $('#login-button'),
    $elInput: $('#login-input'),
    socket: null,
    init () {
        this.addDivEvent();
    },
    addDivEvent() {
        this.$elBtn.on('click', this.handleLogin.bind(this));
    },
    addSocketEvent () {
        if (!this.socket)
            return null;
        this.socket.on('connect success', this.handleConnect.bind(this));
        this.socket.on('error', this.handleError.bind(this));
        this.socket.on('close', this.handleClose.bind(this));
    },
    // 创建登录
    handleLogin () {
        let password = this.$elInput.val();
        if (!password)
            return Toast.msg('请输入口令');
        Toast.show();
        this.socket = new Socket();
        this.addSocketEvent();
    },
    // 链接成功
    handleConnect (data) {
        Toast.hide();
        this.$elPage.hide();
        $('body').append(`<p>登录成功${data}</p>`);
        let password = this.$elInput.val();
        this.socket.emit('password', { password });
    },
    // 链接错误
    handleError () {
        this.$elPage.show();
    },
    // 链接关闭
    handleClose () {
        this.$elPage.show();
    },
};
Controller.init();
