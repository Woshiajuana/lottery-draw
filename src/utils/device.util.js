

export default {
    get () {
        let result = {};
        let ua = (navigator.userAgent || navigator.vendor || window.opera);
        if (ua) {
            let uaName = ua.toLowerCase();
            result = {
                isAndroid: /android/i.test(uaName) || ua.indexOf('Linux') > -1,
                isIphone: /iphone/i.test(uaName),
                isWeChat: /micromessenger/i.test(uaName),
                isQq: /qq/i.test(uaName),
            }
        }
        return result;
    }
}
