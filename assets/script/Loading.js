/*
 * 加载
 */
import { preloadSceneList } from 'Config';
import SceneBase from 'SceneBase';
cc.Class({
    extends: SceneBase,

    properties: {
        lbProgress: cc.Label,
        pro: cc.Node,
        backGround: cc.Node,
    },

    onLoad() {
        this._super();
        this.count = 0;
        this.prefabCount = 0;
        this.completedCount = 0;
        this.totalCount = 0;
        this.loadAudioList = [];
        this.loadAudioListLen = 0;
        this.audioIdx = 0;
        this.loadPrefabList = [];
        this.loadPrefabListLen = 0;
        this.prefabIdx = 0;
        this.loadResList = [];
        this.loadResListLen = 0;
        this.resIdx = 0;

        if (!os.isInitLoading) {
            os.init();
            os.isInitLoading = true;
            if (true) {
                this.preloadScene();
                this.loadOtherRes();
            } else {
                this.changeScene(true);
            }
        } else {
            this.changeScene(true);
        }
    },

    onEnable() {
        this.lbProgress.string = '';
        this.pro.fillRange = 0;
    },

    changeScene(isShowProgress) {
        if (isShowProgress) {
            cc.loader.onProgress = this.onProgress.bind(this);
        } else {

            cc.loader.onProgress = function () {
            };
        }
        if (os.ls.isLoad && os.isLoadJson && os.isLoadTxt) {
            this.runScene();
        } else {
            this.schedule(this.startGame, 1 / 60);
        }
    },

    startGame() {
        if (os.ls.isLoad && os.isLoadJson) {
            this.unschedule(this.startGame);
            this.runScene();
        }
    },

    runScene() {
        os.util.changeSceneForRootNode();
        cc.log('os.sceneName [' + os.sceneName + ']');
        cc.director.loadScene(os.sceneName);
    },

    preloadScene() {
        let sceneName = preloadSceneList[this.count];
        if (sceneName) {
            let v = cc.ENGINE_VERSION.split('.')[0];
            if (v === '1' || v === 'Cocos2d-x-lite v1') {
                cc.loader.onProgress = this.onProgress.bind(this);
                cc.director.preloadScene(sceneName, this.onLoaded.bind(this));
            } else {
                cc.director.preloadScene(sceneName, this.onProgress.bind(this), this.onLoaded.bind(this));
            }
        } else {
            // this.changeScene(true);
        }
    },

    onProgress(completedCount, totalCount) {
        this.completedCount = completedCount;
        this.totalCount = totalCount;
        this.flushPro();
    },

    flushPro() {
        let tempCount = this.completedCount + this.audioIdx + this.prefabIdx + this.resIdx;
        let maxLoadCount = this.totalCount + this.loadAudioListLen + this.loadPrefabListLen + this.loadResListLen;
        if (this.lbProgress) {
            let progress = (100 * tempCount / maxLoadCount).toFixed(2);
            this.lbProgress.string = progress + '%';
            this.pro && (this.pro.fillRange = progress / 100);
        }
        if (tempCount >= maxLoadCount) {
            this.changeScene(false);
        }
    },

    onLoaded() {
        let name = preloadSceneList[this.count];
        this.count += 1;
        cc.log(name + '场景加载完成');
        if (this.count >= preloadSceneList.length) {
            cc.log('全部场景加载完成');
        } else {
            this.preloadScene();
        }
    },

    loadOtherRes() {
        // this.startLoadAudio();
        // this.startLoadPrefab();
        // this.startLoadRes();
    },

    // startLoadAudio(guideId, mapId) {
    //     this.loadAudioList = [];
    //     if (guideId == 0) {
    //         this.loadAudioList = yy.needLoadAudio['bopian'];
    //     } else if (guideId < 7) {
    //         this.loadAudioList = yy.needLoadAudio['guide'];
    //     } else {
    //         let str = mapId < 10 ? 'map0' + mapId : 'map' + mapId;
    //         this.loadAudioList = yy.needLoadAudio[str];
    //     }
    //     this.loadAudioListLen = this.loadAudioList.length;
    //     this.loadAudio();
    // },

    // loadAudio() {
    //     if (!this.loadAudioListLen || this.audioIdx >= this.loadAudioListLen) {
    //         return;
    //     }
    //     os.loader.loadAudio(this.loadAudioList[this.audioIdx], (error, assets) => {
    //         if (error) {
    //             console.log('error audio url');
    //         }
    //         this.audioIdx += 1;
    //         this.loadAudio();
    //         this.flushPro();
    //     })
    // },

    // startLoadPrefab(guideId, mapId) {
    //     this.loadPrefabList = [
    //         'main_bg1',
    //         'main_bg2',
    //     ]
    //     this.loadPrefabListLen = this.loadPrefabList.length;
    //     this.loadPrefab();
    // },

    // loadPrefab() {
    //     if (!this.loadPrefabListLen || this.prefabIdx >= this.loadPrefabListLen) {
    //         return;
    //     }
    //     os.loader.loadPrefab('prefab/bg_layer/' + this.loadPrefabList[this.prefabIdx], () => {
    //         this.prefabIdx += 1;
    //         this.loadPrefab();
    //         this.flushPro();
    //     })
    // },

    // startLoadRes() {
    //     this.loadResList = [
    //         'item/item',
    //         'tips/tips1',
    //         'tips/tips2',
    //     ]
    //     this.loadResListLen = this.loadResList.length;
    //     this.loadRes();
    // },

    loadRes() {
        if (!this.loadPrefabListLen || this.resIdx >= this.loadPrefabListLen) {
            return;
        }
        os.loader.loadSpriteAtlas(this.loadResList[this.resIdx], null, () => {
            this.resIdx += 1;
            this.loadRes();
            this.flushPro();
        })
    },

});
