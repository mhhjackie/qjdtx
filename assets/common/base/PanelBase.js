/*
 * 窗口父类
 */

import Base from 'Base';
cc.Class({
    extends: Base,

    properties: {
        close: cc.Node,
    },

    onLoad(isLayer = false, isBlock = false, isPanel = false) {
        this._super();

        this.node.on('onShow', this.onShow, this);
        this.close && this.close.on('touchend', this.onClose, this);
        this.node.isClose = true;
        if (isLayer) {
            this.getComponent(cc.BlockInputEvents) || this.addComponent(cc.BlockInputEvents);
        }
        if (isBlock) {
            let black = this.node.gn('black');
            black && black.on('touchend', this.callBlack, this);
        }
        if (isPanel) {
            let panel = this.node.gn('panel');
            panel && panel.addComponent(cc.BlockInputEvents);
        }
    },

    onDestroy() {
        this._super();
    },

    start() {
        this._super();
    },

    onEnable() {
        this._super();
    },

    onDisable() {
        this._super();
        this.node.data = null;
    },

    onShow(event) {
        // event = event.detail || event;
        // cc.log('panel', event);
    },

    onClose() {
        // os.audio.play('button');
        this.node.active = false;
    },

    callBlack() {
        this.node.isClose && (this.node.active = false);
    },
});