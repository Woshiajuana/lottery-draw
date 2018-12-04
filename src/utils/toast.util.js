import $                from 'jquery'

export default {
    show () {
        let html = `<div class="pop-wrap"><span class="pop-icon"></span></div>`;
        $('body').append(html);
    },
    hide() {
        $('.pop-wrap').remove();
    },
    msg (text) {
        console.log(text);
        let html = `<div class="pop-msg-wrap"><span class="pop-prompt">${text}</span></div>`;
        $('body').append(html);
        setTimeout(() => {
            $('.pop-msg-wrap').remove();
        }, 2000);
    },
    confirm: (options = '') => new Promise((resolve, reject) => {
        let addEvent = () => {
            $('#pop-confirm').on('click', '.pop-confirm-btn', handle);
        };
        let removeEvent = () => {
            $('#pop-confirm').off('click', '.pop-confirm-btn', handle).remove();
        };
        let handle = function () {
            let text = $(this).text();
            resolve(text);
            removeEvent();
        };
        let appendHtml = () => {
            let content = options.content || options || '';
            let cancelText = options.cancelText || '取消';
            let sureText = options.sureText || '确认';
            let html = `
            <div class="pop-confirm" id="pop-confirm">
                <div class="pop-confirm-inner">
                    <div class="pop-confirm-con">${content}</div>
                    <div class="pop-confirm-operate">
                        <div class="pop-confirm-cancel pop-confirm-btn">${cancelText}</div>
                        <div class="pop-confirm-sure pop-confirm-btn">${sureText}</div>
                    </div>
                </div>
            </div>`;
            $('body').append(html);
        };
        let init = () => {
            appendHtml();
            addEvent();
        };

        init();
    }),
}
