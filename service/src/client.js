
import util from './util'

export default class Client {
    constructor (socket) {
        this.sockets = socket;
    }

    on (event, callback) {
        this.sockets.on(event, () => {
            callback(this.sockets);
        });
    }

    emit (event, data = {}) {
        this.sockets.emit(event, data);
        return this;
    }

    emitSuc (event, data = {}) {
        let params = {
            data,
            code: '0000',
            msg: '操作成功',
        };
        this.emit(event, params);
        return this;
    }

    emitErr (event, msg = '操作失败') {
        let params = {
            code: '-1',
            msg,
        };
        this.emit(event, params);
        return this;
    }

    close (data = {}) {
        this.emit('disconnect', data);
        this.sockets.close();
    }
}
