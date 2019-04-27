"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 统计出现次数,为数组会深度遍历统计,为字符串使用正则进行匹配
 *
 * @export
 * @param {(any[] | string)} data
 * @param {*} obj
 * @returns {number}
 */
function count(data, obj) {
    if (Array.isArray(data)) {
        return data.reduce(function ($count, item) {
            if (item === obj) {
                return $count + 1;
            }
            if (Array.isArray(item)) {
                return $count + count(item, data);
            }
            return $count;
        }, 0);
    }
    var match = data.match(new RegExp(obj, 'g'));
    return (match && match.length) || 0;
}
exports.count = count;
function equals() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length < 2) {
        return true;
    }
    var data = args[0];
    for (var _a = 0, _b = args.slice(1); _a < _b.length; _a++) {
        var i = _b[_a];
        if (i !== data) {
            return false;
        }
    }
    return true;
}
exports.equals = equals;
function get(obj, keys) {
    var keyArr = keys.split('.');
    for (var _i = 0, keyArr_1 = keyArr; _i < keyArr_1.length; _i++) {
        var key = keyArr_1[_i];
        if (!obj) {
            return null;
        }
        obj = obj[key];
    }
    return obj;
}
exports.get = get;
/**
 * 确认source 是否包含str (includes)
 *
 * @export
 * @param {string} source
 * @param {string} str
 * @returns
 */
function includes(source, str) {
    if (Array.isArray(source)) {
        for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
            var i = source_1[_i];
            if (i === str) {
                return true;
            }
        }
        return false;
    }
    var sourceArr = source.split('');
    var strArr = str.split('');
    var index = 0;
    for (var _a = 0, sourceArr_1 = sourceArr; _a < sourceArr_1.length; _a++) {
        var i = sourceArr_1[_a];
        if (i === strArr[index]) {
            index++;
        }
        else if (i === strArr[0]) {
            index = 1;
        }
        else {
            index = 0;
        }
        if (index === strArr.length) {
            return true;
        }
    }
    return false;
}
exports.includes = includes;
function aa(parent) {
    var child = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        child[_i - 1] = arguments[_i];
    }
    var pArr = parent.split('');
    var childArrs = child.map(function (c) {
        return {
            os: '',
            index: 0,
            arr: c.split('')
        };
    });
    var _loop_1 = function (i) {
        childArrs.forEach(function (obj) {
            if (i === obj.arr[obj.index]) {
                obj.os += i;
                obj.index++;
            }
        });
    };
    for (var _a = 0, pArr_1 = pArr; _a < pArr_1.length; _a++) {
        var i = pArr_1[_a];
        _loop_1(i);
    }
    console.log(childArrs);
    return childArrs.every(function (item, index) {
        return item.os === child[index];
    });
    // return os === child
}
exports.aa = aa;
