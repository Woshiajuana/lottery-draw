import $                from 'jquery'
import Toast            from 'utils/toast.util'
import Config           from 'config/env.config'
import 'utils/es6-promise.util'

function Http (options) {
    this.method = options.method || 'post';
    this.data = options.data || {};
    this.url = options.url;
    return this[this.method]();
}

// 注册流程
Http.prototype.fetch = function () {
    let url = Config.API_URL_FETCH + this.url;
    console.log(url + '请求 => ', this.data);
    let [
        version,
        tokenkey,
        random,
        expire,
    ] = randomNumber();
    let data = Encrypt(JSON.stringify(this.data), tokenkey);
    let body = {
        expire,
        version,
        data,
    };
    console.log(url + '加密请求 => ', body);
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            timeout: 60 * 1000,
            url: url,
            data: JSON.stringify(body),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: (response) => {
                try {
                    let {
                        version,
                        expire,
                        data,
                        signature,
                    } = response;
                    let random = version.split('.');
                    let tokenkey = expire.toString().substring(0,random[0])+ version.toString().substring(0,random[1])+'JF';
                    let result = Decrypt(data, tokenkey);
                    result = JSON.parse(result);
                    console.log(result);
                    resolve(result);
                } catch (e) {
                    console.log(e);
                    reject('解析请求失败，请稍后重试');
                }
            },
            error: (err = '') => {
                console.log(err);
                let {
                    status,
                    responseJSON,
                } = err;
                let msg = responseJSON ? responseJSON.message : '请求失败，请稍后重试';
                reject(msg);
            }
        })
    });
};

// 信用卡验证流程
Http.prototype.post = function () {
    let url = Config.API_URL + this.url;
    console.log(url + '请求 => ', this.data);
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            timeout: 60 * 1000,
            url: url,
            data: JSON.stringify(this.data),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: (response) => {
                resolve(response);
            },
            error: (err) => {
                reject('请求失败，请稍后重试');
            }
        })
    });
};

export default (options) => {
    let {loading} = options;
    if (loading) Toast.show(loading);
    return new Http(options).finally(() => {
        loading && Toast.hide();
    });
}


// fetch加密获取随机数
function randomNumber(){
    let expire = new Date().getTime();
    let random1 = parseInt(Math.random()*14);
    let random2 = 14 - random1;
    let random3 = parseInt(Math.random()*14);
    let version = random1+'.'+random2+'.'+random3+'.'+new Date().getTime();
    let tokenkey = expire.toString().substring(0,random1)+version.toString().substring(0,random2)+'JF';
    return [version,tokenkey,random3,expire]
}

// ASE加密
function Encrypt(word,data1){
    let key = CryptoJS.enc.Utf8.parse(data1);
    let iv = CryptoJS.enc.Utf8.parse(data1);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

//ASE瑙ｅ瘑
function Decrypt(word,data1){
    let key = CryptoJS.enc.Utf8.parse(data1);
    let iv = CryptoJS.enc.Utf8.parse(data1);
    let decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
