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
    $elLotteryInput: $('#lottery-inner input'),
    $elLotteryTitleInput: $('#lottery-inner .title'),
    $elLotteryNumberInput: $('#lottery-inner .number'),
    $elLotteryButton: $('#lottery-operate .button'),
    $elLotteryOperate: $('#lottery-operate'),

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
    prizeData: {
        '0001': {
            type: '0001',
            title: '签到展示',
        },
        '0002': {
            type: '0002',
            title: '特等奖',
            number: '5',
        },
        '0003': {
            type: '0003',
            title: '一等奖',
            number: '5',
        },
        '0004': {
            type: '0004',
            title: '二等奖',
            number: '5',
        },
        '0005': {
            type: '0005',
            title: '三等奖',
            number: '5',
        },
        '0006': {
            type: '0006',
            title: '',
            number: '',
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
        this.$elLotteryButton.on('click', this.handleLotteryButton.bind(this));
    },

    // 菜单按钮
    handleMenuButton (e) {
        this.$elMenuPage.toggleClass('show');
        this.$elMenuBtn.toggleClass('close');
    },
    // 菜单选择
    handleMenu (e) {
        let type = $(e.target).data('type');
        let page = this.$elLotteryPage;
        switch (type) {
            // 签到展示
            case '0001':
                page = this.$elSignPage;
                break;
            // 特等奖
            case '0002':
            // 一等奖
            case '0003':
            // 二等奖
            case '0004':
            // 三等奖
            case '0005':
            // 随机大抽奖
            case '0006':
                let {
                    title,
                    number,
                } = this.prizeData[type];
                this.$elLotteryNumberInput.val(number);
                this.$elLotteryTitleInput.val(title);
                break;
        }
        this.switchPage(page);
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
        if (!this.socketService.socket) {
            this.socketService.socket = new Socket();
            this.socketService.socket.on(this.socketService.event, this);
        }
        this.socketService.socket.on('loginevent', (res) => {
            console.log(res)
        });
        this.socketService.socket.emit('loginevent', { password });
    },
    // 抽奖按钮事件
    handleLotteryButton (e) {
        let type = $(e.target).data('type');
        switch (type) {
            // 重置撤销
            case 'reset':
                break;
            // 展示
            case 'go':
                break;
            // 开始
            case 'start':
                Toast.confirm({
                    content: `请确认是否显示到大屏幕？`,
                }).then((text) => {
                    text === '确认' && this.$elLotteryOperate.removeClass('start reset go stop').addClass(type);
                });
                break;
            // 停止
            case 'stop':
                break;
        }
        if (type !== 'go');
            this.$elLotteryOperate.removeClass('start reset go stop').addClass(type);
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
            this.switchPage(this.$elSignPage);
        } else {
            this.switchPage(this.$elLoginPage);
        }
        Toast.hide();
        Toast.msg(msg);
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
