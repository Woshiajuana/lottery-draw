
import config from './config'
import Client from './client'
import Screen from './screen'
import Control from './control'

class Io {
    constructor (server) {
        this.io = require('socket.io')(server);
        this.maxLink = config.maxLink;
        this.controlClient = [];
        this.screenClient = [];
        this.controlPassword = ['666'];
        this.screenPassword = ['000'];
        this.io.on('connection', this._connectionHandle.bind(this));
    }

    _connectionHandle (socket) {
        socket.on('password', (data) => { this._passwordHandle(data, socket) })
    }

    _passwordHandle (data, socket) {
        try {
            let {
                password,
            } = data;
            if (!password)
                throw new Error();

        } catch (e) {
             
        }
    }

}

export default Io;
