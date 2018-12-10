
import Client from './client'

class Control extends Client () {
    constructor (id, options) {
        super(options);
        this.id = id;
    }
}

export default Control;
