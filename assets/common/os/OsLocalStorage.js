/*
 * 把本地数据库的接口从sys.localStorage 挪到这里，以便进行显示的调用
 * cocos2dx 中存取数据时都是用的字符串，也就是恢复为具体数据类型的逻辑需要自己去写
 */

import { osGameName, localStorageInit, localStorageConfig } from 'Config';
export default class {
    constructor() {
        cc.log('os.ls init');

        localStorageInit.call(this);
        this.isLoad = false;
        this.dataArr = [];
        this.keyList = [];
    }

    init() {
        localStorageConfig.call(this);
        this.keyList = this.getItem2('keyList');
        let i = 0;
        let len = this.dataArr.length - 1;
        if (cc.sys.isBrowser) {
            for (i = 0; i <= len; i += 1) {
                this.initItem(i);
            }
            this.setItem2('keyList', this.keyList);
            this.isLoad = true;
        } else {
            let c = 10;
            let intervalId = setInterval(() => {
                for (let n = 0; n < c; n += 1) {
                    this.initItem(i);
                    i += 1;
                }
                if (i >= len) {
                    clearInterval(intervalId);
                    this.setItem2('keyList', this.keyList);
                    this.isLoad = true;
                }
            }, 50);
        }
    }

    addItem(key, value) {
        this.dataArr.push({ key, value });
    }

    initItem(i) {
        let obj = this.dataArr[i];
        if (obj && this.keyList.indexOf(obj.key) === -1) {
            this.keyList.push(obj.key);
            this.setItem(obj.key, obj.value, true);
        }
    }

    // string, number, boolean, array, object, null, undefined, function
    setItem(key, value, flag) {
        if (!key || typeof key !== 'string' || typeof key === 'undefined') {
            cc.log('setItem param error key', key, value);
            return;
        }
        if (typeof value === 'undefined' || typeof value === 'function') {
            cc.log('setItem param error value', key, value);
            return;
        }
        if (this._isObject(value) || this._isArray(value)) {
            value = JSON.stringify(value);
        } else {
            value += '';
        }
        let k = flag ? key : osGameName ? osGameName + '_' + key : key;
        cc.sys.localStorage.setItem(k, value);
    }

    // string, number, boolean, array, object, null, undefined, function
    getItem(key) {
        if (!key || typeof key !== 'string' || typeof key === 'undefined') {
            cc.log('getItem param error key', key);
            return null;
        }
        let k = osGameName ? osGameName + '_' + key : key;
        let value = cc.sys.localStorage.getItem(k);
        if (value === 'true') {
            return true;
        } else if (value === 'false') {
            return false;
        } else if (this._isNumber(value)) {
            return parseFloat(value, 10);
        } else {
            try {
                return JSON.parse(value);
            } catch (error) {
                cc.log('no parse', k, value);
                return value;
            }
        }
    }

    removeItem(key) {
        if (!key || typeof key !== 'string' || typeof key === 'undefined') {
            cc.log('removeItem param error key', key);
            return;
        }
        let k = osGameName ? osGameName + '_' + key : key;
        cc.sys.localStorage.removeItem(k);
    }

    clear() {
        cc.sys.localStorage.clear();
    }

    setItem2(key, value) {
        if (!key || typeof key !== 'string' || typeof key === 'undefined') {
            cc.log('setItem param error key', key, value);
            return;
        }
        if (typeof value === 'undefined' || typeof value === 'function') {
            cc.log('setItem param error value', key, value);
            return;
        }
        if (this._isObject(value) || this._isArray(value)) {
            value = JSON.stringify(value);
        } else {
            value += '';
        }
        let k = osGameName + '#' + key;
        cc.sys.localStorage.setItem(k, value);
    }

    getItem2(key) {
        if (!key || typeof key !== 'string' || typeof key === 'undefined') {
            cc.log('getItem param error key', key);
            return null;
        }
        let k = osGameName + '#' + key;
        let value = cc.sys.localStorage.getItem(k);
        if (value === 'true') {
            return true;
        } else if (value === 'false') {
            return false;
        } else if (this._isNumber(value)) {
            return parseFloat(value, 10);
        } else {
            try {
                return JSON.parse(value);
            } catch (error) {
                cc.log('no parse', k, value);
                return value;
            }
        }
    }

    removeItem2(key) {
        if (!key || typeof key !== 'string' || typeof key === 'undefined') {
            cc.log('removeItem param error key', key);
            return;
        }
        let k = osGameName + '#' + key;
        cc.sys.localStorage.removeItem(k);
    }

    // 是否是对象
    _isObject(obj) {
        return typeof obj === 'object';
    }

    // 是否是数组
    _isArray(value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    }

    // 是否是数字
    _isNumber(value) {
        // return typeof value === 'number' && isFinite(value);
        let patrn = /^(-)?\d+(\.\d+)?$/;
        if (patrn.exec(value) === null || value === '') {
            return false;
        } else {
            return true;
        }
    }
}