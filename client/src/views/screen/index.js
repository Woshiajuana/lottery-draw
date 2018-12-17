import $                from 'jquery'
import Toast            from 'utils/toast.util'
import Socket           from 'utils/socket.util'

// 列表控制器
const Controller = {
    $elInput: $('input'),

    $elPage: $('.view-inner'),
    $elLoginPage: $('#login-inner'),
    $elSignPage: $('#sign-inner'),
    $elPrizePage: $('#prize-inner'),
    $elLotteryPage: $('#lottery-inner'),
    $elHomePage: $('#home-inner'),          // 欢迎页面


    $elLoginBtn: $('#login-button'),
    $elLoginInput: $('#login-input'),

    $elSignUserPop: $('#sign-pop'),


    signUser: {
        numbers: [],
        index: -1,
    },

    socketService: {
        is: false,
        socket: null,
        event: [
            'error',
            'close',
            'disconnect',
            'signEvent',
            'screenAcceptEvent',
        ],
    },
    init () {
        // this.socketService.socket = new Socket();
        // this.socketService.socket.on(this.socketService.event, this);
        this.$elInput.on('focus', this.handleFocus.bind(this));
        this.$elInput.on('blur', this.handleBlur.bind(this));
        this.$elLoginBtn.on('click', this.handleLogin.bind(this));

        this.signUserShowPop();
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
    // 签到事件
    signEventHandle (data) {
        console.log('签到事件', data);
        this.signUser.numbers.push(data);
    },

    signUserShowPop () {
        let {
            index,
            numbers,
        } = this.signUser;
        index++;
        let user = numbers[index];
        if (user && this.$elSignPage.hasClass('show')) {
            let {
                headImgUrl,
                nickName,
            } = user;
            this.$elSignUserPop.find('img').prop('src', headImgUrl);
            this.$elSignUserPop.find('span').text(nickName);
            this.$elSignUserPop.show();
            this.signUser.index = index;
            setTimeout(() => {
                this.$elSignUserPop.hide();
            },3000);
        }
        setTimeout(() => {
            this.signUserShowPop();
        }, 5000);
    },

    // 大屏幕信息接收事件
    screenAcceptEventHandle (data) {
        console.log('大屏幕信息接收事件', data);
        let {
            scene,
            type,
            title,
            number,
        } = data;
        switch (scene) {
            // 签到展示
            case '0001':
                this.switchPage(this.$elSignPage);
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
                this.switchPage(this.$elLotteryPage);
                break;
        }
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
