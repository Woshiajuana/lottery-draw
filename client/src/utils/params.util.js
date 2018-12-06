

export default {
    get () {
        let str = location.search.substring(location.search.indexOf('?'));
        let obj = {};
        if (str) {
            let ary = str.substr(1).split('&');
            ary.forEach((item) => {
                let subAry = item.split('=');
                obj[subAry[0]] = decodeURIComponent(subAry[1]);
            });
        }
        return obj;
    }
}
