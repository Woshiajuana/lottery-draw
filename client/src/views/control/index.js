import $                from 'jquery'
import Toast            from 'utils/toast.util'
import Socket           from 'utils/socket.util'

// 登录控制器
const Controller = {
    $elInput: $('input'),

    $elPage: $('.view-inner'),
    $elLoginPage: $('#login-inner'),        // 登录页面
    $elSignPage: $('#sign-inner'),          // 签到页面
    $elHomePage: $('#home-inner'),          // 欢迎页面
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
            'error',
            'close',
            'disconnect',
            'loginEvent',
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

    consoleSendData: {

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
        let scene = $(e.target).data('type');
        let page = this.$elLotteryPage;
        switch (scene) {
            // 签到展示
            case '0001':
                this.consoleSendData = {
                    scene,
                    type: '2',
                    title: '签到',
                };
                page = this.$elSignPage;
                this.socketService.socket.emit('consoleSendEvent', this.consoleSendData);
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
                this.consoleSendData = {
                    scene,
                    type: '2',
                    title: title || '',
                    number: number || 0,
                };
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
        let password = this.$elLoginInput.val();
        if (!password)
            return Toast.msg('请输入口令');
        Toast.show();
        if (!this.socketService.socket) {
            this.socketService.socket = new Socket(this);
            this.socketService.socket.on(this.socketService.event, this);
        }
        this.socketService.socket.emit('loginEvent', {password});
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
                let number = this.$elLotteryNumberInput.val().trim();
                let title = this.$elLotteryTitleInput.val().trim();
                if (!number || !title)
                    return Toast.msg('请把参数填写完成');
                this.consoleSendData = {
                    ...this.consoleSendData,
                    type: '2',
                    title,
                    number,
                };
                this.socketService.socket.emit('consoleSendEvent', this.consoleSendData);
                break;
            // 开始
            case 'start':
                Toast.confirm({
                    content: `请确认是否显示到大屏幕？`,
                }).then((text) => {
                    if (text !== '确认')
                        return;
                    this.socketService.socket.emit('consoleSendEvent', {
                        scene: '0001',
                        type: '2',
                        title: '签到',
                    });
                    this.$elLotteryOperate.removeClass('start reset go stop').addClass(type);
                });
                break;
            // 停止
            case 'stop':
                break;
        }
        if (type !== 'go');
            this.$elLotteryOperate.removeClass('start reset go stop').addClass(type);
    },
    // 页面展示this
    switchPage (page) {
        this.$elPage.removeClass('show');
        if (page === this.$elLoginPage) {
            this.$elMenuBtn.addClass('hidden');
        } else {
            this.$elMenuBtn.removeClass('hidden');
        }
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
    // 签到事件处理
    signEventHandle (data) {
        console.log('签到事件处理', data);
    },
    // 控制器指令触发事件
    consoleSendEventHandle (data) {
        console.log('控制器指令触发事件', data);
    },

    // 信息数据处理
    messageHandle (data) {
        console.log('信息数据处理', data);
    },
    // 菜单处理
    menuHandle () {
        let {
            code,
            msg,
        } = data;
        Toast.msg(msg);
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
