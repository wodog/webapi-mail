'use strict';

const slice = Array.prototype.slice;
const toString = Object.prototype.toString;

/**
 * 过滤不需要的属性
 */
module.exports = function filtrate(obj, arr) {

    // 过滤属性是字符串
    if (toString.call(arr) === '[]object String') {
        arr = [arr];
    }

    // 过滤对象是数组
    if (toString.call(obj) === '[object Array]') {
        let result = [];
        for (let i = 0; i < obj.length; i++) {
            result.push(filtrate(obj[i], arr));
        }
        return result;
    }

    // 过滤对象是对象
    else if (toString.call(obj) === '[object Object]') {
        let result = {};
        let forbidden = ['_id', '__v', 'api_key'];
        forbidden = forbidden.concat(arr);
        result = duplicateObj(obj.toJSON());
        for (let i = 0; i < forbidden.length; i++) {
            delete result[forbidden[i]];
        }
        return result;
    }
};

/**
 * 复制对象
 */
function duplicateObj(obj) {
    let result = {};
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        result[keys[i]] = obj[keys[i]];
    }
    return result;
}
