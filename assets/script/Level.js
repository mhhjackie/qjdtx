import SceneBase from 'SceneBase';
import YouYou from './YouYou';
cc.Class({
    extends: SceneBase,

    properties: {
        btnPrefab: {
            type: cc.Prefab,
            default: null,
        },
        fontPrefab: {
            type: cc.Prefab,
            default: null,
        },
        _initX: 0,
        _initY: 0,
        _unlockPos: 0,
    },

    onLoad () {
        this._super();
        this._initX = -cc.winSize.width / 4 + 7;
        this._initY = 20;
        this._unlockPos = 5;
    },

    start () {
        var self = this;
        for(let i = 0; i < 10; i++) {
            let btnLv = cc.instantiate(self.btnPrefab);
            if (btnLv) {
                if (i < this._unlockPos){
                    btnLv.touchEnabled = true;
                    cc.loader.loadRes('jiesuo', cc.SpriteFrame, function(err, spriteFrame) {
                        let background = btnLv.getChildByName("Background");
                        background.getComponent(cc.Sprite).spriteFrame = spriteFrame; 　
                        btnLv.x = self._initX + (btnLv.width + 80) * Math.floor(i % 5);
                        btnLv.y = self._initY - (btnLv.height + 70) * Math.floor(i / 5);
                        if (i == 0) {
                            background.getChildByName("Label").getComponent(cc.Label).node.x = 9;
                        }
                        background.getChildByName("Label").getComponent(cc.Label).string = (i + 1).toString();
                        btnLv.parent = self.node;
            　　　　 });
                    btnLv.on(cc.Node.EventType.TOUCH_END, self.touchLv, self);
                }else{
                    btnLv.touchEnabled = false;
                    cc.loader.loadRes('weijiesuo2', cc.SpriteFrame, function(err, spriteFrame) {
                        let background = btnLv.getChildByName("Background");
                        background.getComponent(cc.Sprite).spriteFrame = spriteFrame; 
                        background.getChildByName("Label").getComponent(cc.Label).string = "";
                        btnLv.x = self._initX + (btnLv.width + 80) * Math.floor(i % 5);
                        btnLv.y = self._initY - (btnLv.height + 70) * Math.floor(i / 5);
                        btnLv.parent = self.node;
            　　　　 });
                }
            }
        }
    },

    touchLv(event) {
        var btnName = event.currentTarget.name;
        if (YouYou.heroPower >= 1) {
            YouYou.heroPower -= 1;
            os.ls.setItem2("powerNum", YouYou.heroPower.toString());
            //this.showFloatFont();
        }
        var lastIndex = btnName.substr(btnName.length-1,1);
        YouYou.selectLevel = lastIndex;
        //this.changeScene('Game');
        cc.director.loadScene('Game');
    },

    showFloatFont() {
        var powerLbl = cc.instantiate(this.fontPrefab);
        powerLbl.x = cc.winSize.width / 2;
        powerLbl.y = cc.winSize.height / 2;
        powerLbl.parent = this.node;
    },

    backHome() {
        this.changeScene('Home');
    },
    // update (dt) {},
});
