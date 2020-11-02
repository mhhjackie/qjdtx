/*
 * 父类
 */

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.className = this.name.match(/<(\S*)>/)[1];
        this.node.className = this.className;
        rpc[this.className] = this;
        // cc.log('rpc add [' + this.className + ']');
        this.startOpenPrefab = false;
    },

    onDestroy() {

    },

    start() {

    },

    onEnable() {


    },

    onDisable() {

    },

    changeScene(name) {
        os.changeScene({ name });
    },

    waiting(isWaiting) {
        os.waiting({ isWaiting });
    },

    miniMessage(content, cb, pos) {
        os.event.emit('miniMessage', { content, cb, pos });
    },

    // this.showPanel(node, { });
    showPanel(node, data) {
        if (!!node) {
            node.data = data;
            node.active = true;
            node.emit('onShow', data);
        } else {
            cc.log('error showPanel', node, data);
        }
    },

    // this.showPrefab('prefab', { }, parent, 1);
    showPrefab(name, data, parent, zIndex = 1) {
        if (this.startOpenPrefab) {
            return;
        }
        parent = !!parent ? parent : cc.director.getScene().gn('Canvas');
        let node = parent.gn(name);
        if (!!node) {
            node.data = data;
            node.active = true;
            node.emit('onShow', data);
        } else {
            os.loader.loadPrefab('prefab/' + name, (prefab) => {
                this.startOpenPrefab = false;
                prefab.zIndex = zIndex;
                prefab.data = data;
                prefab.active = true;
                prefab.parent = parent;
                prefab.emit('onShow', data);
            });
        }
    },

    showBgPrefab(name, data, parent, zIndex = 1) {
        if (this.startOpenPrefab) {
            return;
        }
        parent = !!parent ? parent : cc.director.getScene().gn('Canvas');
        let node = parent.gn(name);
        if (!!node) {
            node.data = data;
            node.active = true;
            node.emit('onShow', data);
        } else {
            os.loader.loadPrefab('prefab/bg_layer/' + name, (prefab) => {
                this.startOpenPrefab = false;
                prefab.zIndex = zIndex;
                prefab.data = data;
                prefab.active = true;
                prefab.parent = parent;
                prefab.emit('onShow', data);
            });
        }
    },
});