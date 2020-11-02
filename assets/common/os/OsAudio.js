/*
 * 声音管理
 */

let musicId = 0;

const effectMgr = {};

export default class {
    constructor() {
        cc.log('os.audio init');
        this.musicScale = 1;
        this.sxfScale = 1;
        this.musicName = '';
    }

    init() {

    }


    playMusic(name, volume = 0.3, loop = true, cb) {
        if (!os.ls.getItem2('bgm')) {
            return;
        }
        if (this.musicName === name) {
            return;
        }
        this.musicName = name;
        cc.audioEngine.stop(musicId);
        // let url = os.gameName ? os.gameName + '/audio/' + name : 'audio/' + name;
        // let type = cc.AudioClip;
        // os.loader.releaseResource(url, type);

        os.loader.loadAudio(name, (error, assets) => {
            if (error) {
                cc.log('error music url [' + name + ']');
                return;
            }
            volume *= this.musicScale;
            musicId = cc.audioEngine.play(assets, loop, volume);
            cc.audioEngine.setFinishCallback(musicId, () => {
                this.musicName = '';
                cb && cb();
            });
        })
        // cc.loader.loadRes(url, type, (error, assets) => {
        //     if (error) {
        //         cc.log('error music url [' + name + ']');
        //         return;
        //     }

        // });
    }

    stopMusic() {
        this.musicName = '';
        cc.audioEngine.stop(musicId);
    }

    getMusicName() {
        return this.musicName;
    }

    pauseMusic() {
        cc.audioEngine.pause(musicId);
    }

    resumeMusic() {
        cc.audioEngine.resume(musicId);
    }

    setMusicScale(tscale) {
        this.musicScale = tscale / 100;
        cc.log(musicId)
        if (musicId !== 0) {
            cc.audioEngine.setVolume(musicId, this.musicScale);
        }
    }

    setSxfScale(tscale) {
        this.sxfScale = tscale / 100;
        for (let i in effectMgr) {
            cc.audioEngine.setVolume(effectMgr[i], this.sxfScale);
        }
    }

    play(name, volume = 1, cb) {
        try {
            if (!os.ls.getItem2('sfx')) {
                return;
            }
            if (effectMgr[name]) {
                return;
            }
            // let url = os.gameName ? os.gameName + '/audio/' + name : 'audio/' + name;
            // let type = cc.AudioClip;
            os.loader.loadAudio(name, (error, assets) => {
                if (error) {
                    cc.log('error sxf url [' + name + ']');
                    return;
                }
                volume *= this.sxfScale;
                let audioId = cc.audioEngine.play(assets, false, volume);
                effectMgr[name] = audioId;
                cc.audioEngine.setFinishCallback(audioId, () => {
                    // cc.log('音乐触发回调函数');
                    // os.loader.releaseResource(url, type);
                    cb && cb();
                    delete effectMgr[name];

                });
            });
        } catch (error) {
            cc.log('播放音效失败');
        }
    }

    play2(name, volume = 1, loop = false) {
        try {
            if (!os.ls.getItem2('sfx')) {
                return;
            }
            if (effectMgr[name]) {
                return;
            }
            os.loader.loadAudio(name, (error, assets) => {
                if (error) {
                    cc.log('error sfx2 url [' + name + ']');
                    return;
                }
                volume *= this.sxfScale;
                let audioId = cc.audioEngine.play(assets, loop, volume);
                effectMgr[name] = audioId;
            });
        } catch (error) {
            cc.log('播放音效失败');
        }
    }

    stop(name) {
        try {
            if (typeof effectMgr[name] !== 'undefined') {
                cc.audioEngine.stop(effectMgr[name]);
                delete effectMgr[name];
            }
        } catch (error) {
            cc.log('停止音效失败');
        }
    }

    stopAllSfx() {
        for (let i in effectMgr) {
            this.stop(i);
        }
    }
}