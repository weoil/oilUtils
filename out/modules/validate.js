"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function passIsFalse(target, methodName, descriptor) {
    var oldVal = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.pass) {
            return this;
        }
        return oldVal.apply(this, args);
    };
}
var Validate = /** @class */ (function () {
    function Validate(data) {
        this.data = '';
        this.pass = true;
        this.message = '';
        this.data = data;
    }
    Validate.of = function (data) {
        return new Validate(data);
    };
    Validate.Email = function (data) {
        var _v = new Validate(data);
        return _v.email().pass;
    };
    Validate.prototype.msg = function (msg) {
        if (!this.message && !this.pass) {
            this.message = msg;
        }
        return this;
    };
    /**
     *
     *
     * @param {number} min 最小范围
     * @param {number} [max] (可选)最大范围 0:无限制
     * @returns {Validate} this
     * @memberof Validate
     */
    Validate.prototype.len = function (min, max) {
        try {
            var data = this.data + '';
            if (!max && max !== 0) {
                max = min;
                min = 0;
            }
            if (!data.length) {
                throw new Error();
            }
            var len = data.length;
            if (len < min) {
                throw new Error();
                // max为0时为无限制
            }
            else if (max !== 0 && len > max) {
                throw new Error();
            }
        }
        catch (err) {
            this.pass = false;
        }
        return this;
    };
    /**
     *
     *
     * @param {number} min 最小范围
     * @param {number} [max] (可选)最大范围 0:无限制
     * @returns {Validate}
     * @memberof Validate
     */
    Validate.prototype.range = function (min, max) {
        try {
            var data = this.data;
            if (typeof data !== 'number') {
                throw new Error();
            }
            if (!max && max !== 0) {
                max = min;
                if (data > max) {
                    throw new Error();
                }
            }
            else if (max === 0 && data < min) {
                throw new Error();
            }
            else if (data < min || data > max) {
                throw new Error();
            }
        }
        catch (err) {
            this.pass = false;
        }
        return this;
    };
    Validate.prototype.email = function () {
        return this.regexp(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/);
    };
    Validate.prototype.phone = function () {
        return this.regexp(/^1[356789]\d{9}$/);
    };
    Validate.prototype.regexp = function (regexp) {
        try {
            if (typeof this.data === 'object') {
                throw new Error();
            }
            this.pass = regexp.test(this.data + '');
        }
        catch (err) {
            this.pass = false;
        }
        return this;
    };
    Validate.prototype.required = function () {
        if (!this.data) {
            this.pass = false;
        }
        return this;
    };
    Validate.prototype.equals = function (obj) {
        if (obj !== this.data) {
            this.pass = false;
        }
        return this;
    };
    Validate.prototype.then = function (cb) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.pass) return [3 /*break*/, 3];
                        result = cb(this.result);
                        if (!(result instanceof Promise)) return [3 /*break*/, 2];
                        return [4 /*yield*/, result];
                    case 1:
                        result = _a.sent();
                        _a.label = 2;
                    case 2:
                        this.result = result;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Validate.prototype.catch = function (cb) {
        if (!this.pass) {
            cb(this.message);
        }
    };
    __decorate([
        passIsFalse
    ], Validate.prototype, "len", null);
    __decorate([
        passIsFalse
    ], Validate.prototype, "range", null);
    __decorate([
        passIsFalse
    ], Validate.prototype, "email", null);
    __decorate([
        passIsFalse
    ], Validate.prototype, "phone", null);
    __decorate([
        passIsFalse
    ], Validate.prototype, "regexp", null);
    __decorate([
        passIsFalse
    ], Validate.prototype, "required", null);
    __decorate([
        passIsFalse
    ], Validate.prototype, "equals", null);
    return Validate;
}());
exports.default = Validate;
