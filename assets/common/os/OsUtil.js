/*
 * 工具类
 */

export default class {
    constructor() {
        cc.log('os.util init');

        // this.fibonacci = this.memoizer([0, 1], function (recur, n) { return recur(n - 1) + recur(n - 2); });
        // this.factorial = this.memoizer([1, 1], function (recur, n) { return n * recur(n - 1); });
        // cc.log(this.fibonacci(10));
        // cc.log(this.factorial(10));
        this.persistRootNodeList = [];
    }

    init() {
        this.printEnv();
    }

    shake(obj, bUp) {
        let x = obj.x; let y = obj.y;
        let action = cc.sequence(
            cc.moveTo(0.1, cc.v2(x, y - (bUp ? 4 : -4))),
            cc.moveTo(0.1, cc.v2(x, y)),
        )
        obj.runAction(action);
        setTimeout(() => {
            obj.stopAction(action);
            obj.x = x; obj.y = y;
        }, 1000);
    }

    // 打印cocos环境
    printEnv() {
        cc.log('isBrowser', cc.sys.isBrowser);
        cc.log('isMobile', cc.sys.isMobile);
        cc.log('isNative', cc.sys.isNative);
        typeof CC_BUILD !== 'undefined' && cc.log('CC_BUILD', CC_BUILD);
        typeof CC_DEBUG !== 'undefined' && cc.log('CC_DEBUG', CC_DEBUG);
        typeof CC_DEV !== 'undefined' && cc.log('CC_DEV', CC_DEV);
        typeof CC_EDITOR !== 'undefined' && cc.log('CC_EDITOR', CC_EDITOR);
        typeof CC_JSB !== 'undefined' && cc.log('CC_JSB', CC_JSB);
        typeof CC_PREVIEW !== 'undefined' && cc.log('CC_PREVIEW', CC_PREVIEW);
        typeof CC_QQPLAY !== 'undefined' && cc.log('CC_QQPLAY', CC_QQPLAY);
        typeof CC_RUNTIME !== 'undefined' && cc.log('CC_RUNTIME', CC_RUNTIME);
        typeof CC_SUPPORT_JIT !== 'undefined' && cc.log('CC_SUPPORT_JIT', CC_SUPPORT_JIT);
        typeof CC_TEST !== 'undefined' && cc.log('CC_TEST', CC_TEST);
        typeof CC_WECHATGAME !== 'undefined' && cc.log('CC_WECHATGAME', CC_WECHATGAME);
        typeof CC_WECHATGAMESUB !== 'undefined' && cc.log('CC_WECHATGAMESUB', CC_WECHATGAMESUB);
    }

    // 获取正整数
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // 获取正数
    getRandomFloat(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    // 获取负数到正数
    getRandomNumber(min, max) {
        let v = Math.abs(min) + Math.abs(max);
        return max - Math.random() * v;
    }

    // 重复数据删除
    dedupe(arr) {
        if (Array.from) {
            return Array.from(new Set(arr));
        } else {
            return this.filter(arr);
        }
    }

    // 是否是对象
    isObject(obj) {
        return typeof obj === 'object';
    }

    // 是否是数组
    isArray(value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    }

    // 是否是数字
    isNumber(value) {
        // return typeof value === 'number' && isFinite(value);
        let patrn = /^(-)?\d+(\.\d+)?$/;
        if (patrn.exec(value) === null || value === '') {
            return false;
        } else {
            return true;
        }
    }

    // 克隆对象
    cloneObject(data) {
        if (this.isObject(data)) {
            return JSON.parse(JSON.stringify(data));
        }
        cc.warn('clone object fail', data);
        return data;
    }

    // 克隆数组
    cloneArray(data) {
        if (this.isArray(data)) {
            return JSON.parse(JSON.stringify(data));
        }
        cc.warn('clone array fail', data);
        return data;
    }

    cloneData(data) {
        if (this.isArray(data) || this.isObject(data)) {
            return JSON.parse(JSON.stringify(data));
        }
        cc.warn('clone data fail', data);
        return data;
    }

    parseFloatArray(list) {
        if (this.isArray(list) && list.length) {
            for (let i = list.length - 1; i >= 0; i -= 1) {
                list[i] = parseFloat(list[i]);
            }
        }
        return list;
    }

    parseColor(str) {
        let a = this.parseFloatArray(str.split(','));
        return cc.color(a[0], a[1], a[2]);
    }

    //先把中文替换成两个字节的英文，再计算长度
    getStrLength(str) {
        return str.replace(/[\u0391-\uFFE5]/g, 'aa').length;
    }

    // 为对象添加重载函数
    addMethod(obj, name, fn) {
        let old = obj[name];
        obj[name] = function () {
            let func = old;
            if (fn.length === arguments.length) {
                return fn.apply(this, arguments);
            } else if (typeof func === 'function') {
                return func.apply(this, arguments);
            }
        };
    }

    /**
     * 记忆函数
     * @param {Array} memo 
     * @param {Function} formula 
     * @returns 返回一个管理meno存储和在需要时调用formula函数的recur函数
     * 我们把这个recur函数和它的参数传递给formula函数
     */
    memoizer(memo, formula) {
        let recur = function (n) {
            let result = memo[n];
            if (typeof result !== 'number') {
                result = formula(recur, n);
                memo[n] = result;
            }
            return result;
        };
        return recur;
    }

    // 创建二位数组
    matrix(rows, cols, initial = null) {
        let arr = [];
        for (let i = 0; i < rows; i += 1) {
            let columns = [];
            for (let j = 0; j < cols; j += 1) {
                columns[j] = initial;
            }
            arr[i] = columns;
        }
        return arr;
    }

    // by函数接受一个成员名字字符串和一个可选的次要比较函数作为参数,
    // 并返回一个可以用来对包含该成员的对象数组进行排序的比较函数.
    // 当o[name]和p[name]相等时,次要比较函数被用来决出高下.
    // let s = [{ first: 'Joe', last: 'Besser' }, { first: 'Moe', last: 'Howard' }];
    // s.sort(by('last', by('first')));
    // 从小到大
    by1(name, minor) {
        return function (o, p) {
            if (o && p && typeof o === 'object' && typeof p === 'object') {
                let a = o[name];
                let b = p[name];
                if (a === b) {
                    return typeof minor === 'function' ? minor(o, p) : 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
            } else {
                cc.log('Expected an object when sorting by ' + name);
            }
        };
    }

    // 从大到小
    by2(name, minor) {
        return function (o, p) {
            if (o && p && typeof o === 'object' && typeof p === 'object') {
                let a = o[name];
                let b = p[name];
                if (a === b) {
                    return typeof minor === 'function' ? minor(o, p) : 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? 1 : -1;
                }
            } else {
                cc.log('Expected an object when sorting by ' + name);
            }
        };
    }

    // 去除字符串中的空格
    trim(str) {
        return str.replace(/[\s]/g, '');
    }

    // 查找字符串中的数字并返回数组
    match(str) {
        return str.match(/\d+/g);
    }

    // 返回字符串中以'|'分割位置数组
    splitToArray(str) {
        var arrPosList = [];
        var arrPos = str.split("|");
        for(var i = 0; i < arrPos.length; ++i) {
            var arrObj = os.util.match(arrPos[i]);
            for(var j = 0; j < arrObj.length; j++) {
                if (j > 0 && j % 2 != 0) {
                    arrPosList.push(cc.v2(Number(arrObj[j - 1]), Number(arrObj[j])));
                }
            }
        }
        return arrPosList;
    }

    //返回分隔符以'|'的单个字符
    splitToSingleArray(str) {
        return str.split("|");
    }
 
    distance(p1, p2) {
        let v = cc.ENGINE_VERSION.split('.')[0];
        if (v === '1' || v === 'Cocos2d-x-lite v1') {
            return cc.pDistance(p1, p2);
        }
        return p1.sub(p2).mag();
    }

    // 获取当前时间戳
    getCurrentTimestamp() {
        return Math.round(new Date() / 1000);
    }

    // 获取凌晨的时间戳
    getBeforeDawnTimestamp(timestamp) {
        let t = null;
        if (timestamp) {
            t = new Date(new Date(parseInt(timestamp)).setHours(0, 0, 0, 0)) / 1000;
        } else {
            t = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
        }
        return t;
    }

    // 根据秒获得时分秒
    getTime(leftTime) {
        let hours = Math.floor(leftTime % 86400 / 3600) + '';
        let minutes = Math.floor(leftTime % 3600 / 60) + '';
        let seconds = Math.floor(leftTime % 60) + '';
        hours = hours.length === 1 ? '0' + hours : hours;
        minutes = minutes.length === 1 ? '0' + minutes : minutes;
        seconds = seconds.length === 1 ? '0' + seconds : seconds;
        return { hours, minutes, seconds };
    }

    /**
    * 根据秒获得时分秒
    * @param {Number} leftTime 
    * @param {type} 1 return秒 2 return 分+秒 3 return 时+分+秒
    * @return {String}
    */
    getTime2(leftTime, type = 3) {
        let hours = (Math.floor(leftTime % 86400 / 3600) < 10 ? '0' : '') + Math.floor(leftTime % 86400 / 3600);
        let minutes = (Math.floor(leftTime % 3600 / 60) < 10 ? '0' : '') + Math.floor(leftTime % 3600 / 60);
        let seconds = (Math.floor(leftTime % 60) < 10 ? '0' : '') + Math.floor(leftTime % 60);
        switch (type) {
            case 1: return seconds;
            case 2: return minutes + ':' + seconds;
            case 3: return hours + ':' + minutes + ':' + seconds;
        }
    }

    getTime3(time) {
        let minutes = (Math.floor(time / 60) < 10 ? '0' : '') + Math.floor(time / 60);
        let seconds = (Math.floor(time % 60) < 10 ? '0' : '') + Math.floor(time % 60);
        return minutes + '分' + seconds + '秒';
    }

    /**
     * 设置精灵状态
     * @param {cc.Node} node 
     * @param {Number} state 0:正常状态 cc.Sprite.State.NORMAL 1:置灰状态 cc.Sprite.State.GRAY
     */
    setState(node, state = 0) {
        if (node.getComponent(cc.Button)) {
            let btn = node.getComponent(cc.Button);
            btn.enableAutoGrayEffect = true;
            btn.interactable = state === 1 ? false : true;
        } else if (node.getComponent(cc.Sprite)) {
            let sprite = node.getComponent(cc.Sprite);
            if (!!sprite._sgNode) {
                node.getComponent(cc.Sprite)._sgNode.setState(state);
            } else {
                node.getComponent(cc.Sprite).setState(state);
            }
        } else {
            cc.warn('置灰失败', node);
        }
    }

    // 阿拉伯数字转换为简体汉字
    toChinese(money) {
        let cnNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //汉字的数字
        let cnIntRadice = ['', '十', '百', '千'];//基本单位
        let cnIntUnits = ['', '万', '亿', '兆']; //对应整数部分扩展单位
        let maxNum = 999999999999999.9999; //最大处理的数字
        let integerNum; //金额整数部分
        let chineseStr = ''; //输出的中文金额字符串
        if (money === '') {
            return '';
        }
        money = parseFloat(money);
        if (money >= maxNum) {
            cc.log('超出最大处理数字');
            return '';
        }
        if (money === 0) {
            return '';
        }
        integerNum = money.toString();
        if (parseInt(integerNum, 10) > 0) {
            let zeroCount = 0;
            let IntLen = integerNum.length;
            for (let i = 0; i < IntLen; i += 1) {
                let n = integerNum.substr(i, 1);
                let p = IntLen - i - 1;
                let q = p / 4;
                let m = p % 4;
                if (n === '0') {
                    zeroCount += 1;
                } else {
                    zeroCount = 0; //归零
                    chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m === 0 && zeroCount < 4) {
                    chineseStr += cnIntUnits[q];
                }
            }
        }
        if (chineseStr.indexOf('一十') === 0) {
            chineseStr = chineseStr.substr(1);
        }
        return chineseStr;
    }

    // 添加常驻节点
    addPersistRootNode(node, zIndex = 0) {
        if (!node || !node.name) {
            return;
        }
        let scene = cc.director.getScene();
        if (!scene.getChildByName(node.name)) {
            let pos = node.parent.convertToWorldSpaceAR(node.position);
            node.parent = scene;
            node.position = pos;
            node.zIndex = zIndex;
            cc.game.addPersistRootNode(node);
            let isPush = true;
            for (let i = 0, len = this.persistRootNodeList.length; i < len; i += 1) {
                let el = this.persistRootNodeList[i];
                if (el.name === node.name) {
                    isPush = false;
                    this.persistRootNodeList[i] = { name: node.name, zIndex };
                    break;
                }
            }
            isPush && this.persistRootNodeList.push({ name: node.name, zIndex });
        }
    }

    // 改变常驻节点父类为Canvas
    loadSceneForRootNode() {
        if (os.util.persistRootNodeList.length) {
            let parent = cc.find('Canvas');
            let list = os.util.persistRootNodeList;
            for (let i = 0, len = list.length; i < len; i += 1) {
                let el = list[i];
                let node = cc.find(el.name);
                if (node) {
                    let pos = node.position.sub(os.s2);
                    node.parent = parent;
                    node.position = pos;
                }
            }
        }
    }

    changeSceneForRootNode() {
        if (os.util.persistRootNodeList.length) {
            let list = os.util.persistRootNodeList;
            for (let i = 0, len = list.length; i < len; i += 1) {
                let el = list[i];
                let node = cc.find('Canvas/' + el.name);
                if (node) {
                    os.util.addPersistRootNode(node, el.zIndex);
                }
            }
        }
    }

    // 节点坐标转世界坐标
    convertToWorldSpaceAR(node) {
        return node.parent.convertToWorldSpaceAR(node.position);
    }

    // 节点坐标转画布坐标
    convertToCanvasPosition(node) {
        let pos = this.convertToWorldSpaceAR(node);
        return pos.sub(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
    }

    // 万以上的数字转K显示
    tok(num) {
        num = parseFloat(num);
        if (num >= 10000) {
            num /= 10000;
            let n = Math.floor(num * 100) / 100;
            return n + 'K';
        }
        return num + '';
    }

    /**
     * 获取弧度
     * @param {cc.v2} p1 目标坐标
     * @param {cc.v2} p2 当前坐标
     * return 当前坐标的弧度
     */
    getDegree(p1, p2) {
        let x = p2.x - p1.x;
        let y = p2.y - p1.y;
        let degree = Math.atan(x / y) * 180 / Math.PI;
        if (y < 0) {
            if (x < 0) {
                degree = 180 + Math.abs(degree);
            } else {
                degree = 180 - Math.abs(degree);
            }
        }
        return degree;
    }

    // 根据概率获取
    weightRand(arr, key = 'weight') {
        let sum = 0;
        let rand = 0;
        let result = null;
        for (let i = 0, len = arr.length; i < len; i += 1) {
            let el = arr[i];
            sum += el[key];
        }
        // 如果设置的数落在随机数内，则返回，否则减去本次的数
        for (let i = 0, len = arr.length; i < len; i += 1) {
            let el = arr[i];
            rand = Math.floor(Math.random() * sum + 1);
            if (el[key] >= rand) {
                result = el;
                break;
            } else {
                sum -= el[key];
            }
        }
        return result;
    }

    // 检测非法字符
    checkWord(word) {
        word += '';
        if (word.match(/^\s*$/)) {
            return true;
        }
        let check = (str) => {
            return os.shieldedFontLibrary.indexOf(str);
        };
        let trimWord = this.trim(word);
        let arr = [];
        arr.push(check(word));//正常匹配
        arr.push(check(trimWord));//去空格匹配
        arr.push(check(this.getChineseCharacters(trimWord)));//提取汉字匹配
        arr.push(check(this.getChineseCharactersAndNumber(trimWord)));//提取汉字和数字匹配
        for (let i = 0, len = arr.length; i < len; i += 1) {
            let el = arr[i];
            if (el >= 0) {
                return true;
            }
        }
        return false;
    }

    // 获取汉字字符
    getChineseCharacters(name) {
        let reg = /[\u4e00-\u9fa5]/g;
        let names = name.match(reg);
        if (!names) {
            return '1';
        }
        return names.join('');
    }

    // 获取汉字和数字字符
    getChineseCharactersAndNumber(name) {
        let reg = /[0-9\u4e00-\u9fa5]/g;
        let names = name.match(reg);
        if (!names) {
            return '1';
        }
        return names.join('');
    }

    // 打印对象
    showJsonData(name, arr) {
        let str = JSON.stringify(arr);
        str = str.replace(/:0,/g, ':"0",');
        cc.log(name, str);
    }

    // 打印数组
    showArrayData(data) {
        let str = JSON.stringify(data);
        str = str.replace(/\[{/, '[\n{');
        str = str.replace(/}]/, '}\n]');
        str = str.replace(/},{/g, '},\n{');
        cc.log(str);
    }

    // 去除数组重复
    filter(arr = []) {
        let tmp = {};
        arr.forEach(function (value) {
            tmp[value] = 1;
        });
        let result = [];
        let keyArr = Object.keys(tmp);
        for (let i = 0, len = keyArr.length; i < len; i += 1) {
            result.push(keyArr[i]);
        }
        return result;
    }
}