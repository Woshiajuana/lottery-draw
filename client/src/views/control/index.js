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
        this.socket.on('success', this.handleConnect.bind(this));
        this.socket.on('error', this.handleError.bind(this));
        this.socket.on('close', this.handleClose.bind(this));
        this.socket.on('message', this.handleMessage.bind(this));
        this.socket.on('disconnect', this.handleDisconnect.bind(this));
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
        let password = this.$elInput.val();
        this.socket.emit('password', { password });
    },
    // 通讯
    handleMessage (data) {
        let {
            code,
            msg,
        } = data;
        if (code === '-1') {
            Toast.hide();
            Toast.msg(msg);
        }
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
