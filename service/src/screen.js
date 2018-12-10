
import Client from './client'

class Scree extends Client () {
    constructor (id, options) {
        super(options);
        this.id = id;
    }
}

export default Scree;
