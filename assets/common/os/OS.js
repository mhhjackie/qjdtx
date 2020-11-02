/*
 * os 全局管理类
 */

import OsUtil from 'OsUtil';
import OsJsonData from 'OsJsonData';
import OsLoader from 'OsLoader';
import OsLocalStorage from 'OsLocalStorage';
import OsAudio from 'OsAudio';

import { osVersion, checkUrl, startSceneName, debugConfig, wechatConfig } from 'Config';

class OS {
    constructor() {
        console.log('os v' + osVersion);

        // 全局配置初始化
        this.cocosVersion = cc.ENGINE_VERSION.split('.');
        this.event = new cc.EventTarget();                                                      // 全局监听事件
        this.firstInit = false;                                                                 //首次进入游戏
        this.isInitLoading = false;                                                             // 初始化加载
        this.isInitRootNode = false;                                                            // 初始化常驻节点
        this.sceneCount = 0;                                                                    // 当前场景继承SceneBase的脚本数量
        this.sceneName = startSceneName;                                                        // 跳转的场景名
        this.shieldedFontLibrary = [];                                                          // 屏蔽字库
        this.gameHideTime = 0;
        this.shareTime = 0;
        this.firstLogin = true;
        this.serverData = {};

        this.util = new OsUtil();                                                               // 常用工具函数     
        this.data = new OsJsonData();                                                               // 路由和模拟数据
        this.loader = new OsLoader();                                                           // 加载resources
        this.audio = new OsAudio();                                                             // 声音管理
        this.ls = new OsLocalStorage();                                                         // 服务器通信

        cc.game.on(cc.game.EVENT_SHOW, this._gameOnShow, this);                                 // 监听游戏后台切换回来
        cc.game.on(cc.game.EVENT_HIDE, this._gameOnHide, this);                                 // 监听游戏切换到后台
        // cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, this._beforeSceneLoading, this);  // 场景加载前
        // cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._afterSceneLaunch, this);      // 场景加载完成
    }

    init() {
        console.log("OS init **************");
        debugConfig.call(this);

        this.s2 = {
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            width: cc.winSize.width / 2,
            height: cc.winSize.height / 2,
        };

        this.util.init();
        this.data.init();
        this.loader.init();
        this.audio.init();
        
        this.isLoadJson = true;
        this.isLoadTxt = true;
        this.isLoadImgage = true;
        this._loadJson();
    }

    changeScene(msg) {
        this.util.changeSceneForRootNode();
        this.sceneName = msg.name;
        cc.director.loadScene('Loading');
    }

    waiting(msg = {}) {
        if (cc.director.getScene()) {
            cc.director.getScene().gn('waiting_layer').active = msg.isWaiting;
        }
    }

    restart() {
        this.isInitLoading = false;
        this.isInitRootNode = false;
        this.shieldedFontLibrary = [];
        this.gameName = '';
        this.ls.isLoad = false;
        this.ls.clear();
        cc.game.restart();
    }

    _gameOnShow() {
        cc.game.resume();
        if (this.ls.getItem2('bgm')) {
            cc.audioEngine.resumeAll();
        } else {
            cc.audioEngine.pauseAll();
        }
        this.shareTime = this.util.getCurrentTimestamp() - this.gameHideTime;
    }

    _gameOnHide() {
        cc.audioEngine.pauseAll();
        cc.game.pause();
        this.gameHideTime = this.util.getCurrentTimestamp();

    }

    _beforeSceneLoading() {
        cc.log('beforeSceneLoading');
    }

    _afterSceneLaunch() {
        cc.log('afterSceneLaunch');
    }

    _loadJson() {
        console.log("_loadJSon ******");
        this.isLoadJson = false;
        this.loader.loadJson('json/osjson', (assets) => {
            let allData = this.data.parseAllData(assets);
            this.data.setJsonData(allData);
            window.osjson = this.data.parseAllData(assets, true);
            cc.log('allData', allData);
            cc.log('osjson', osjson);
            cc.log(cc.sys.localStorage);
            this.isLoadJson = true;
            this.ls.init();
        });
    }

    _loadServerJson() {
        this.isLoadServerJson = false;
        let serverPath = wechatConfig.serverPath;
        cc.loader.load(serverPath, (error, assets) => {
            if (error) {
                console.log('error url ' + serverPath);
                return;
            }

            this.isLoadServerJson = true;
            this.serverData = assets;
            console.log('this.serverData = ',assets,  this.serverData);
            cc.loader.release(serverPath);
        })
    }

    _loadTxt() {
        this.isLoadTxt = false;
        this.loader.loadTxt('txt/shielded_font_library', (assets) => {
            this.shieldedFontLibrary = assets.split(',');
            this.isLoadTxt = true;
        });
    }

    _isLoadImgage() {
        this.isLoadImgage = false;
        let url = checkUrl;
        let type = 'png';
        cc.loader.load({ url, type }, (error) => {
            if (error) {
                cc.log('图片加载失败');
                return;
            }
            this.isLoadImgage = true;
            cc.log('图片加载成功');
        });
    }

    _serverNeedJson() {
        let jsonList = [];
        let json = {};
        let osjson = this.data.getJsonData();
        let keyArr = Object.keys(osjson);
        for (let i = 0, len = keyArr.length; i < len; i += 1) {
            let name = keyArr[i];
            if (jsonList.indexOf(name) !== -1) {
                json[name] = osjson[name];
            }
        }
        cc.log(JSON.stringify(json));
    }
}
window.os = module.exports = new OS();
window.rpc = {};//remote procedure call 远距离的程序呼叫

