import $                from 'jquery'
import Toast            from 'utils/toast.util'
import Socket           from 'utils/socket.util'

// 登录控制器
const Controller = {
    $elInput: $('input'),

    $elPage: $('.view-inner'),
    $elLoginPage: $('#login-inner'),        // 登录页面
    $elSignPage: $('#sign-inner'),          // 签到页面
    $elLotteryPage: $('#lottery-inner'),    // 抽奖页面

    $elLoginBtn: $('#login-button'),
    $elLoginInput: $('#login-input'),

    $elMenuBtn: $('#menu-btn'),             // 菜单按钮
    $elMenuPage: $('#menu-wrap'),           // 菜单页面

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
        // this.socketService.socket = new Socket();
        // this.socketService.socket.on(this.socketService.event, this);
        this.$elInput.on('focus', this.handleFocus.bind(this));
        this.$elInput.on('blur', this.handleBlur.bind(this));
        this.$elLoginBtn.on('click', this.handleLogin.bind(this));
        this.$elMenuBtn.on('click', this.handleMenuButton.bind(this));
        this.$elMenuPage.on('click', '.menu-item', this.handleMenu.bind(this));
    },
    // 菜单按钮
    handleMenuButton (e) {
        this.$elMenuPage.toggleClass('show');
        this.$elMenuBtn.toggleClass('close');
    },
    // 菜单选择
    handleMenu (e) {
        let type = $(e.target).data('type');
        this[type] && this[type]();
        this.handleMenuButton();
    },
    // input聚焦事件
    handleFocus (e) {
        $(e.target).parents('.input-wrap').addClass('focus');
    },
    // input失焦事件
    handleBlur (e) {
        $(e.target).parents('.input-wrap').removeClass('focus');
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
