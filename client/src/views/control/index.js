import $                from 'jquery'
import Toast            from 'utils/toast.util'
import Socket           from 'utils/socket.util'

// 登录控制器
const Controller = {
    $elPage: $('#login-wrap'),
    $elMenuPage: $('#menu-wrap'),
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
    menuData: {
        '0001': {
            type: '0001',
            title: '签到大屏幕',
        },
        '0002': {
            type: '0002',
            title: '抽取一二三等奖',
        },
        '0003': {
            type: '0003',
            title: '随机抽奖',
        },
    },
    init () {
        this.socketService.socket = new Socket();
        this.socketService.socket.on(this.socketService.event, this);
        this.$elBtn.on('click', this.handleLogin.bind(this));
        this.$elMenuPage.on('click', '.menu-item', this.handleMenu.bind(this));
    },
    // 菜单控制
    handleMenu (e) {
        let $elItem = $(e.target);
        let type = $elItem.data('type');
        let data = this.menuData[type];
        this.socketService.socket.emit('menu', data);
    },
    // 创建登录
    handleLogin () {
        let password = this.$elInput.val();
        if (!password)
            return Toast.msg('请输入口令');
        Toast.show();
        this.socketService.socket.emit('password', { password });
    },
    // 菜单处理
    menuHandle () {
        let {
            code,
            msg,
        } = data;
        Toast.msg(msg);
    },
    // 验证密码结果 验证口令
    passwordHandle (data, socket) {
        let {
            code,
            msg,
        } = data;
        if (code === '0000') {
            this.$elPage.removeClass('show');
            this.$elMenuPage.addClass('show');
        } else {
            this.$elPage.addClass('show');
            this.$elMenuPage.removeClass('show');
        }
        Toast.hide();
        Toast.msg(msg);
    },
    // 断开链接
    disconnectHandle (data) {
        console.log(data);
        Toast.hide();
        Toast.msg(data.msg);
    },
    // 链接错误
    errorHandle () {
        this.$elPage.show();
    },
    // 链接关闭
    closeHandle () {
        this.$elPage.show();
    },
};
Controller.init();
