/*
 * 数据类
 */

let allData = {};                                             // json数据

export default class {
    constructor() {
        cc.log('os.data init');
    }

    init() {

    }

    setJsonData(data) { allData = data; }
    getJsonData() { return os.util.cloneData(allData); }

    parseAllData(data, isObj) {
        let d = {};
        let keyArr = Object.keys(data);
        for (let i = 0, len = keyArr.length; i < len; i += 1) {
            let k = keyArr[i];
            d[k] = this.parseData(isObj, data[k]);
        }
        return d;
    }

    parseData(isObj, data) {
        let list = isObj ? {} : [];
        let keyList = data[0];
        for (let i = 1; i < data.length; i += 1) {
            let obj = {};
            let d = data[i];
            for (let j = 0, len = d.length; j < len; j += 1) {
                let k = keyList[j];
                obj[k] = d[j];
            }
            list[isObj ? i : i - 1] = obj;
        }
        return list;
    }

    // 打印json数据
    print(name, ...list) {
        name = os.gameName ? os.gameName + '_' + name : name;
        if (!!name && allData[name]) {
            let data = this.getDataForName(name);
            if (list.length) {
                for (let i = 0, len = data.length; i < len; i += 1) {
                    let el = data[i];
                    for (let j = 0, len1 = list.length; j < len1; j += 1) {
                        let key = list[j];
                        delete el[key];
                    }
                }
            }
            let str = JSON.stringify(data);
            str = str.replace(/\[{/, '[\n{');
            str = str.replace(/}]/, '}\n]');
            str = str.replace(/},{/g, '},\n{');
            cc.log(str);
        }
    }

    getData(name, value, key = 'id', flag = false) {
        name = os.gameName ? os.gameName + '_' + name : name;
        let data = allData[name];
        if (!!data) {
            data = os.util.cloneArray(data);
            if (key === 'id' || flag) {
                // 二分法查找
                let len = data.length;
                let start = 0;
                let end = len - 1;
                while (start <= end) {
                    let middle = start + ((end - start) >> 1);
                    let v = data[middle][key];
                    if (value === v) {
                        return data[middle];
                    } else if (value > v) {
                        start = middle + 1;
                    } else {
                        end = middle - 1;
                    }
                }
            } else {
                for (let el of data) {
                    if (el[key] === value) {
                        return el;
                    }
                }
            }
        }
        cc.log('error getData ' + name);
        return null;
    }

    getDataForName(name) {
        name = os.gameName ? os.gameName + '_' + name : name;
        let data = allData[name];
        if (!!data) {
            return os.util.cloneData(data);
        }
        cc.log('error getDataForName ' + name);
        return null;
    }

    setDataForName(name, data) {
        name = os.gameName ? os.gameName + '_' + name : name;
        if (allData[name]) {
            allData[name] = data;
        }
    }

    /**
     * 通过键值返回 键值绑定的对象
     * @param {*} name  表名
     * @param {*} key   表里面的键值
     */
    getDataForObject(name, key = 'id') {
        name = os.gameName ? os.gameName + '_' + name : name;
        let data = allData[name];
        let obj = {};
        if (!!data) {
            data = os.util.cloneData(data);
            for (let i = 0, len = data.length; i < len; i += 1) {
                let el = data[i];
                obj[el[key]] = el;
            }
        }
        return obj;
    }
}