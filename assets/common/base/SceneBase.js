/*
 * 场景父类
 */

import Base from 'Base';
cc.Class({
    extends: Base,

    properties: {

    },

    onLoad(name) {
        this._super();
        os.gameName = name || '';

        cc.log('%cSceneBase [' + this.className + ']', 'color:#f00;');
        os.sceneCount += 1;
        if (os.sceneCount >= 2) {
            cc.warn('一个场景只需要一个脚本继承SceneBase');
        }

        os.util.loadSceneForRootNode();
    },

    onDestroy() {
        this._super();
        window.rpc = {};
        os.sceneCount = 0;
    },

    start() {
        this._super();
    },

    onEnable() {
        this._super();
    },

    onDisable() {
        this._super();
    },
});