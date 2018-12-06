
export default {
    filterPhone (value) {
        return value ? value.substring(0,3) + ' **** ' + value.substring(7) : '';
    },

    filterName (value) {
        // return value ? value.replace(/.(?=.)/g, '*') : '';
        if (!value) return '';
        if (value.length < 3) {
            return value.substring(0,1) + new Array(value.length).join('*');
        } else {
            return value.substring(0,1) + new Array(value.length -1).join('*') + value.substr(-1);
        }
    },
}
