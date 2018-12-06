import $                from 'jquery'
import Toast            from 'utils/toast.util'
import Socket           from 'utils/socket.util'

// 登录控制器
const Controller = {
    $elPage: $('#login-wrap'),
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
        ],
    },
    init () {
        this.socketService.socket = new Socket();
        this.socketService.socket.on(this.socketService.event, this);
        this.$elBtn.on('click', this.handleLogin.bind(this));
    },
    // 创建登录
    handleLogin () {
        let password = this.$elInput.val();
        if (!password)
            return Toast.msg('请输入口令');
        Toast.show();
        this.socketService.socket.emit('password', { password });
    },
    // 验证密码结果 验证口令
    handlePassword (data, socket) {
        let {
            code,
            msg,
        } = data;
        code === '0000' ? this.$elPage.hide() : this.$elPage.show();
        Toast.hide();
        Toast.msg(msg);
    },
    // 断开链接
    handleDisconnect (data) {
        console.log(data);
        Toast.hide();
        Toast.msg(data.msg);
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
