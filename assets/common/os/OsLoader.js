/*
 * 加载资源
 */

import { yyUrl, osGameName } from 'Config';
let resList = [];

export default class {
    constructor() {
        cc.log('os.loader init');
    }

    init() {

    }

    release() {
        cc.log('release', resList);
        // for (let i = resList.length - 1; i >= 0; i -= 1) {
        //     let res = resList[i];
        //     releaseResource(res.url, res.type);
        // }
        // resList = [];
    }

    releaseResource(url, type) {
        // let res = cc.loader.getRes(url, type);
        // let all = cc.loader.getDependsRecursively(res);
        // cc.loader.release(all);
        // cc.log('res', res, 'all', all);
    }

    loadSpriteFrame(url, cb) {
        if (os.util.isObject(url)) {
            cc.loader.load(url, (error, assets) => {
                if (error) {
                    cc.log('error url [' + url + ']');
                    return;
                }
                typeof cb === 'function' && cb(new cc.SpriteFrame(assets));
            });
        } else {
            url = os.gameName ? os.gameName + '/' + url : url;
            let type = cc.SpriteFrame;
            cc.loader.loadRes(url, type, (error, assets) => {
                if (error) {
                    cc.log('error url [' + url + ']');
                    return;
                }
                // cc.loader.setAutoRelease(assets, true);
                // resList.push({ url, type });
                typeof cb === 'function' && cb(assets);
            });
        }
    }

    loadSpriteAtlas(url, name, cb) {
        let type = cc.SpriteAtlas;
        cc.loader.loadRes(url, type, (err, atlas) => {
            if (err) {
                cc.log('error url [' + url + ']');
                return;
            }
            if (name) {
                let frame = atlas.getSpriteFrame(name);
                typeof cb === 'function' && cb(frame);
            } else {
                typeof cb === 'function' && cb(err, atlas);
            }

        })
    }

    loadJson(url, cb) {
        url = os.gameName ? os.gameName + '/' + url : url;
        let type = cc.JsonAsset;
        cc.loader.loadRes(url, type, (error, assets) => {
            if (error) {
                cc.log('error url [' + url + ']');
                return;
            }
            // cc.loader.setAutoRelease(assets, true);
            // resList.push({ url, type });
            typeof cb === 'function' && cb(assets.json || assets);
        });
    }

    loadTiledMap(url, cb) {
        url = os.gameName ? os.gameName + '/' + url : url;
        let type = cc.TiledMapAsset;
        cc.loader.loadRes(url, type, (error, assets) => {
            if (error) {
                cc.log('error url [' + url + ']');
                return;
            }
            // cc.loader.setAutoRelease(assets, true);
            // resList.push({ url, type });
            typeof cb === 'function' && cb(assets);
        });
    }

    loadPrefab(url, cb) {
        url = os.gameName ? os.gameName + '/' + url : url;
        let type = cc.Prefab;
        cc.loader.loadRes(url, type, (error, assets) => {
            if (error) {
                cc.log('error url [' + url + ']');
                return;
            }
            // cc.loader.setAutoRelease(assets, true);
            // resList.push({ url, type });
            typeof cb === 'function' && cb(cc.instantiate(assets));
        });
    }

    loadTxt(url, cb) {
        url = os.gameName ? os.gameName + '/' + url : url;
        let type = cc.TextAsset;
        cc.loader.loadRes(url, type, (error, assets) => {
            if (error) {
                cc.log('error url [' + url + ']');
                return;
            }
            // cc.loader.setAutoRelease(assets, true);
            // resList.push({ url, type });
            typeof cb === 'function' && cb(assets.text || assets);
        });
    }

    /**
     * 加载龙骨
     * @param {*} url 
     * @param {*} cb // { dragonAsset, dragonAtlasAsset, armatureName } 按照顺序赋值,不然会不播放
     */
    loadDragonBones(url, cb) {
        url = os.gameName ? os.gameName + '/' + url : url;
        let dragonAsset;
        let dragonAtlasAsset;
        cc.loader.loadResDir(url, function (error, assets) {
            if (error || assets.length <= 0) {
                cc.log('error url [' + url + ']');
                return;
            }
            assets.forEach(asset => {
                if (asset instanceof dragonBones.DragonBonesAsset) {
                    dragonAsset = asset;
                }
                if (asset instanceof dragonBones.DragonBonesAtlasAsset) {
                    dragonAtlasAsset = asset;
                }
            });
            let armatureName = 'Sprite';
            typeof cb === 'function' && cb({ dragonAsset, dragonAtlasAsset, armatureName });
        });
    }

    loadDragonBones2(name, cb) {
        let image = yyUrl + '/' + osGameName + '/' + name + '_tex.png';
        let ske = yyUrl + '/' + osGameName + '/' + name + '_ske.json';
        let atlas = yyUrl + '/' + osGameName + '/' + name + '_tex.json';
        cc.loader.load(image, (error, texture) => {
            cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
                cc.loader.load({ url: ske, type: 'txt' }, (error, dragonBonesJson) => {
                    let dragonAtlasAsset = new dragonBones.DragonBonesAtlasAsset();
                    dragonAtlasAsset.atlasJson = atlasJson;
                    dragonAtlasAsset.texture = texture;

                    let dragonAsset = new dragonBones.DragonBonesAsset();
                    dragonAsset.dragonBonesJson = dragonBonesJson;

                    let armatureName = 'armatureName';
                    typeof cb === 'function' && cb({ dragonAsset, dragonAtlasAsset, armatureName });
                });
            });
        });
    }

    loadParticle(url, cb) {
        url = os.gameName ? os.gameName + '/' + url : url;
        let type = cc.ParticleAsset;
        cc.loader.loadRes(url, type, (error, assets) => {
            if (error) {
                cc.log('error url [' + url + ']');
                return;
            }
            // cc.loader.setAutoRelease(assets, true);
            // resList.push({ url, type });
            typeof cb === 'function' && cb(assets);
        });
    }

    loadSubpackage(name, cb) {
        cc.loader.downloader.loadSubpackage(name, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('load subpackage successfully.');
            typeof cb === 'function' && cb();
        });
    }

    loadAudio(name, cb) {
        let url = 'audio/' + name;
        let type = cc.AudioClip;
        cc.loader.loadRes(url, type, (error, assets) => {
            typeof cb === 'function' && cb(error, assets);
        })
    }
}
