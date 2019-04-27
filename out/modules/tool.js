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
/**
 * 获取对象的值 如果没有则为null
 *
 * @export
 * @param {*} obj
 * @param {string} keys ‘xxx.xxx.xxx’
 * @returns
 */
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
function clone(obj) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    var caches = new Map();
    sources.forEach(function (source) {
        Object.keys(source).forEach(function (key) {
            function copyObject(data) {
                var val = {};
                clone(val, data);
                return val;
            }
            function copyArray(arr) {
                return arr.map(function (item) {
                    return copy(item);
                });
            }
            function copyFunction(fn) {
                var fun = function () { };
                Object.setPrototypeOf(fun, Object.getPrototypeOf(fn));
                fn.call(fun);
                return fun;
            }
            function copy(data) {
                if (caches.has(data)) {
                    return caches.get(data);
                }
                var val = data;
                if (Array.isArray(data)) {
                    val = copyArray(data);
                }
                else if (data instanceof Function) {
                    val = copyFunction(data);
                }
                else if (data instanceof Date) {
                    val = new Date(data);
                }
                else if (typeof data === 'object') {
                    val = copyObject(data);
                }
                caches.set(data, val);
                return val;
            }
            var val = source[key];
            obj[key] = copy(val);
        });
    });
    caches.clear();
}
exports.clone = clone;
