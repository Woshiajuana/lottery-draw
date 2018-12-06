import $                from 'jquery'
import Toast            from 'utils/toast.util'
import Config           from 'config/env.config'

export default {

    // 支付宝支付
    aLiPay (workId, txnAmt, cipherText) {
        let that = this;
        Toast.show();
        return new Promise((resolve, reject) => {
            that._fetchInfo(workId, txnAmt, cipherText).then((result) => {
                AlipayJSBridge.call('tradePay', {
                    tradeNO: result,
                    displayPayResult: true
                }, (data) => {
                    if (data.resultCode !='9000')
                        throw '交易失败';
                    resolve();
                    // let url = 'https://interaction.bayimob.com/gameHtml?appkey=124f420f1605c38eb2901bd1812feddd&adSpaceKey=fd5a8d1af52100cc62bd677288a937f0&1=1';
                    // window.location.href = url;
                });
            }).catch((err) => {
                reject(err);
            })
        }).finally(() => {
            Toast.hide();
        });
    },

    // 微信支付
    weChatPay (workId, txnAmt, cipherText) {
        let that = this;
        Toast.show();
        return new Promise((resolve, reject) => {
            that._fetchInfo(workId, txnAmt, cipherText).then((result) => {
                if (typeof WeixinJSBridge  !== 'undefined')
                    return _handleWeChat(result, resolve, reject);
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', () => {
                        that._handleWeChat(result, resolve, reject);
                    }, false);
                } else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', () => {
                        that._handleWeChat(result, resolve, reject);
                    });
                    document.attachEvent('onWeixinJSBridgeReady', () => {
                        that._handleWeChat(result, resolve, reject);
                    });
                }
            }).catch((err) => {
                reject(err);
            })
        }).finally(() => {
            Toast.hide();
        });
    },

    // 微信支付处理
    _handleWeChat (result, resolve, reject) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', $.parseJSON(result),
            (res) => {
                if (res.err_msg !== 'get_brand_wcpay_request:ok')
                    return reject('交易失败');
                resolve();
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    },

    // 获取信息
    _fetchInfo (workId, txnAmt, cipherText) {
        return new Promise((resolve, reject) => {
            try {
                $.ajax({
                    type: 'POST',
                    url: Config.PAY_URL,
                    timeout: 20 * 1000,
                    dataType:"json",
                    data: {
                        workId,
                        txnAmt,
                        cipherText,
                    },
                    success: (r) => {
                        if (!r.success)
                            throw r.errMsg || '交易失败';
                        let pubNumPayInfo = r.result.pubNumPayInfo;
                        resolve(pubNumPayInfo);
                    },
                    error: (err) => {
                        console.log(err);
                        reject(err);
                    }
                });
            } catch (err) {
                reject(err);
            }
        })
    }
}
