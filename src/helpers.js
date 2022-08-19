module.exports = {
    isObject,
    isArray,
    isSameType
}

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
}

function isSameType(item1, item2) {
    return Object.prototype.toString.call(item1) === Object.prototype.toString.call(item2)
}