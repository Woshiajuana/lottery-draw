

export default {
    returnFail () {

    },

    broadcastSocket (sockets, event, data) {
        this.forEach(sockets, (socket, key) => {
            socket.emit(event, data);
        })
    },

    forEach (sockets, callback) {
        for (let key in sockets) {
            callback && callback(sockets[key], key);
        }
    }
}
