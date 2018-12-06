import $                from 'jquery'
import DeviceUtil       from 'utils/device.util'
import Toast            from 'utils/toast.util'

// 列表控制器
const DownloadController = {
    $elBtn: $('#button'),
    device: {},
    init () {
        this.getDeviceInfo();
        this.addEvent();
    },
    getDeviceInfo () {
        this.device = DeviceUtil.get();
    },
    addEvent() {
        this.$elBtn.on('click', this.handleDown.bind(this));
    },
    handleDown () {
        let url = ANDROID_URL;
        if (this.isWeChat && this.isQq)
            return Toast.msg('请使用系统浏览器打开本页面进行下载');
        if (this.device.isAndroid)
            url = ANDROID_URL;
        else if (this.device.isIphone)
            url = iOS_URL;
        window.location.href = url;
    },
};
DownloadController.init();
