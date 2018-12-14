import $                from 'jquery'
import Toast            from 'utils/toast.util'
import Http             from 'utils/http.util'

const Controller = {
    $elPage: $('.view-inner'),
    $elSignPage: $('#sign-inner'),
    $elLoginPage: $('#login-inner'),
    $elLoginBtn: $('#login-button'),
    $elLoginInput: $('#login-input'),
    device: {},
    init () {
        this.$elLoginBtn.on('click', this.handleLogin.bind(this));
    },
    handleLogin () {
        let value = this.$elLoginInput.val().trim();
        if (!value)
            return Toast.msg('请输入验证码');
        let body = {
            nums: value,
            user: {
                openId: '123',
                nickName: '哈哈',
            },
        };
        Http({
            url: 'lottery/user_sign',
            data: body,
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            Toast.msg(err);
        })
    },
};
Controller.init();
