import SceneBase from 'SceneBase';
import YouYou from './YouYou';
cc.Class({
    extends: SceneBase,

    properties: {
        Player: { //玩家
            type: cc.Node,
            default: null,
        },
        lblTime: {
            type: cc.Label,
            default: null,
        },
        left: {
            type: cc.Node,
            default: null,
        },
        right: {
            type: cc.Node,
            default: null,
        },
        up: {
            type: cc.Node,
            default: null,
        },
        // attack: {
        //     type: cc.Node,
        //     default: null,
        // },
        camera: { //摄像机
            type: cc.Node, //属性类型
            default: null, //默认值
        },
        circleFire: {
            type: cc.Prefab,
            default: null,
        },
        floorPrefab: {
            type: cc.Prefab,
            default: null,
        },
        firePlate: {
            type: cc.Prefab,
            default: null,
        },
        fireHole: {
            type: cc.Prefab,
            default: null,
        },
        floatTile: {
            type: cc.Prefab,
            default: null,
        },
        monkeyObj: {
            type: cc.Prefab,
            default: null,
        },
        flowerObj: {
            type: cc.Prefab,
            default: null,
        },
        stoneObj: {
            type: cc.Prefab,
            default: null,
        },
        ground: {
            type: cc.Node,
            default: null,
        },
        arrBackground: {
            default: [],
            type: [cc.Node]
        },
        destination: {
            type: cc.Node,
            default: null,
        },
        _targetFire: null,  //单/双火圈
        nearCamera: cc.Camera,  //近摄像机
        farCamera: cc.Camera, //远摄像机
        bg01: cc.Sprite,         
        bg02: cc.Sprite,
        nearbg01: cc.Sprite,
        nearbg02: cc.Sprite,
        _count: 0,      //时间计数器
        _farCount: 0,   //远计数
        _nearCount: 0,  //近计数
        _farSpeed: 0,   //远处速度
        _nearSpeed: 0,  //近处速度
        _initFireX: 300, //第一个火盘左侧距离
        _arrStonePos: null, //石头数组
        _arrXkPos: null, //悬空地块位置数组
        _arrXkAtrPos: null, //悬空地块属性数组
        _arrHqPos: null, //火圈位置数组
        _arrHpPos: null, //火盘位置数组
        _arrHkPos: null, //火坑位置数组
        _arrHkDir: null, //火坑发射方向数组
        _arrMonkeyPos: null, //猴子出生位置数组
        _arrMonkeyAtr: null, //猴子属性数组
        _arrFlowerPos: null, //食人花位置数组
    },

    playerJS: null, //玩家脚本

    onLoad () {
        this._super();
        os.init();
        //cc.director.getPhysicsManager().enabled = true;
        //cc.director.getPhysicsManager().gravity = cc.v2(0, -980);
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        //manager.enabledDrawBoundingBox = true;
        this._farCount = this._nearCount = 1;
        this._farSpeed = this._nearSpeed = 0;
        this.playerJS = this.Player.getComponent("Player"); //获取玩家脚本
        this.Player.getComponent(cc.PolygonCollider).tag = 5; //碰撞盒tag
        this.left.on(cc.Node.EventType.TOUCH_START, this.leftPress, this);
        this.left.on(cc.Node.EventType.TOUCH_END, this.leftRelease, this);
        this.left.on(cc.Node.EventType.TOUCH_CANCEL, this.leftRelease, this);
        this.right.on(cc.Node.EventType.TOUCH_START, this.rightPress, this);
        this.right.on(cc.Node.EventType.TOUCH_END, this.rightRelease, this);
        this.right.on(cc.Node.EventType.TOUCH_CANCEL, this.rightRelease, this);
        this.up.on(cc.Node.EventType.TOUCH_START, this.upPress, this);
        this.up.on(cc.Node.EventType.TOUCH_END, this.upRelease, this);
        this.up.on(cc.Node.EventType.TOUCH_CANCEL, this.upRelease, this);
        //this.attack.on(cc.Node.EventType.TOUCH_START, this.attackPress, this);
        //this.Player.getComponent(cc.Animation)._clips[4].speed = 0.1;
        //this.Player.getComponent(cc.Animation)._clips[5].speed = 0.1;
        this.Player.zIndex = this.camera.zIndex - 3;
        this.destination.zIndex = this.Player.zIndex - 1;
        this.destination.getComponent(cc.BoxCollider).tag = 7;
    },

    start () {
        //地图外观
        this.changeUISkin();
        this.createMapNode();
        this.parseJsonData();
        //石头挡路
        this.createStone();
        //悬空地块
        //this.createFloatTile();
        //火圈
        //this.createFloatFire();
        //猴子
        //this.createMonkey();
        //火盘
        //this.createFirePlate();
        //火坑
        //this.createFireHole();
        //食人花
        //this.createFlower();
    },

    changeUISkin() {
        //console.log(this.arrBackground.length);
        var self = this;
        for (var i = 0; i < self.arrBackground.length; i++) {
            var bgTxture = self.arrBackground[i];
            var strBg = YouYou.selectLevel == 2 ? "bgxuedi" : "background";
            cc.loader.loadRes(strBg, cc.SpriteFrame, function(err, spriteFrame) { 　
                bgTxture.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    　　　　 });
        }
    },

    createMapNode() {
        //console.log("createMapNode");
        for(var i = 0; i < 50; i++) {
            var floorPrefab = cc.instantiate(this.floorPrefab);
            floorPrefab.zIndex = this.Player.zIndex - 1;
            if (YouYou.selectLevel == 2) {
                floorPrefab.getChildByName("btmtile1").active = true;
            }else {
                floorPrefab.getChildByName("btmtile1").active = false;
            }
            floorPrefab.parent = this.node;
            floorPrefab.x = -cc.winSize.width / 2 + floorPrefab.width / 2 + floorPrefab.width * i;
            floorPrefab.y = -cc.winSize.height / 2 + floorPrefab.height * 2 - 3;
        }
    },

    parseJsonData() {
        //console.log("parseJsonData********");
        var guanqiaConfig = os.data.getDataForName('guanqia');
        //console.log("allData is:   ");
        var dataCfg = guanqiaConfig[0]; //测试第一关数据
        console.log(dataCfg);
        if (dataCfg.gametime > 0) {
            this._count = dataCfg.gametime;
            this.schedule(function() {
                this.calculateTime();
            }, 1, dataCfg.gametime, 0);
        }else {
            this.lblTime.string = "";
        }
        this._arrStonePos = os.util.splitToArray(dataCfg.shikuai);
        this._arrXkPos = os.util.splitToArray(dataCfg.xkpos);
        this._arrXkAtrPos = os.util.splitToArray(dataCfg.xkattr);
        this._arrHqPos = os.util.splitToArray(dataCfg.hqpos);
        this._arrHpPos = os.util.splitToArray(dataCfg.hppos);
        this._arrHkPos = os.util.splitToArray(dataCfg.hkpos);
        this._arrMonkeyPos = os.util.splitToArray(dataCfg.mkpos);
        this._arrMonkeyAtr = os.util.splitToSingleArray(dataCfg.mkattr);
        this._arrHkDir = os.util.splitToSingleArray(dataCfg.hkdirect);
        this._arrFlowerPos = os.util.splitToArray(dataCfg.flowerpos);
    },

    createStone() {
        for (let i = 0; i < this._arrStonePos.length; i++) {
            var posData = this._arrStonePos[i];
            if (posData.x == 0 && posData.y == 0) continue;
            var stoneTile = cc.instantiate(this.stoneObj);
            stoneTile.x = posData.x;
            stoneTile.y = this.ground.y + posData.y;
            stoneTile.getComponent(cc.BoxCollider).tag = 0;
            stoneTile.zIndex = this.Player.zIndex - 1;
            stoneTile.parent = this.node;
        }
    },

    createFloatTile() {
        for (var i = 0; i < this._arrXkPos.length; ++i) {
            var posData = this._arrXkPos[i];
            if (posData.x == 0 && posData.y == 0) continue;
            var num = this._arrXkAtrPos[i].x;
            var yPos = this._arrXkAtrPos[i].y;
            for(var i = 0; i < num; ++i) {
                var floatTile = cc.instantiate(this.floatTile);
                if (i == 0) {
                    var leftTile = floatTile.getChildByName("lefttile");
                    var rightTile = floatTile.getChildByName("righttile");
                    var boxCld = floatTile.addComponent(cc.BoxCollider);
                    //boxCld.tag = 0;
                    //leftTile.active = true;
                    //rightTile.active = true;
                    var offSetX = num > 1 ? 30 + (num - 2) * 30 : 0;
                    rightTile.x += 60 * (num - 1);
                    var leftPolygonColider = leftTile.getComponent(cc.PolygonCollider);
                    var rightPolygonColider = rightTile.getComponent(cc.PolygonCollider);
                    leftPolygonColider.enabled = rightPolygonColider.enabled = true;
                    leftPolygonColider.tag = rightPolygonColider.tag = 0;
                    boxCld.offset = cc.v2(offSetX, 0);
                    boxCld.size = cc.size(60 * num, 45);
                }
                var floatTileJS = floatTile.getComponent("FloatTile");
                floatTileJS._bCanMove = yPos;
                YouYou.arrFloatTile.push(floatTile);
                floatTile.parent = this.node;
                floatTile.zIndex = this.Player.zIndex - 1;
                floatTile.x = posData.x + i * 60;
                floatTile.y = this.ground.y + 200 + floatTile.height / 2;
            }
        }
    },

    createFirePlate() {
        for(var i = 0; i < this._arrHpPos.length; i++) {
            if (this._arrHpPos[i].x == 0 && this._arrHpPos[i].y == 0) continue;
            var firePlate = cc.instantiate(this.firePlate);
            firePlate.zIndex = (this.camera.zIndex - 1);
            firePlate.parent = this.node;
            firePlate.x = this._arrHpPos[i].x;
            firePlate.y = this.ground.y + this._arrHpPos[i].y;
        }
    },

    createFireHole() {
        for(var i = 0; i < this._arrHkPos.length; i++) {
            if (this._arrHkPos[i].x == 0 && this._arrHkPos[i].y == 0) continue;
            var shootDir = Number(this._arrHkDir[i]);
            var fireHole = cc.instantiate(this.fireHole);
            fireHole.getComponent(cc.BoxCollider).tag = 4;
            var holeTileJS = fireHole.getComponent("HoleControl");
            holeTileJS._shootDir = shootDir;
            fireHole.zIndex = (this.camera.zIndex - 1);
            fireHole.parent = this.node;
            fireHole.x = this._arrHkPos[i].x;
            fireHole.y = this.ground.y + this._arrHkPos[i].y;
        }
    },

    createFlower() {
        //for(var i = 0; i < this._arrFlowerPos; ++i) {
            //if (this._arrFlowerPos[i].x == 0 && this._arrFlowerPos[i].y == 0) continue;
            //console.log("add flower************");
            var flower = cc.instantiate(this.flowerObj);
            flower.getComponent(cc.Animation)._clips[0].speed = 2;
            flower.zIndex = (this.camera.zIndex - 1);
            flower.parent = this.node;
            flower.scale = 0.4;
            flower.x = 60;
            flower.y = this.ground.y + flower.height / 4;
        //}
    },

    createFloatFire() {
        var self = this;
        for (let i = 0; i < this._arrHqPos.length; i++) {
            if (self._arrHqPos[i].x === 0 && self._arrHqPos[i].y === 0) continue;
            this.schedule(function() {
                self._targetFire = cc.instantiate(self.circleFire);
                if (self._targetFire) {
                    //self._targetFire.getComponent(cc.BoxCollider).tag = 1;
                    self._targetFire.x = self._arrHqPos[i].x;
                    self._targetFire.y = self.ground.y + self._arrHqPos[i].y - 36;
                    self._targetFire.zIndex = self.Player.zIndex + 1;
                    self._targetFire.parent = self.node;
                }
            }, 6, cc.macro.REPEAT_FOREVER, 5);
        }
    },

    createMonkey() {
        var self = this;
        for (let i = 0; i < this._arrMonkeyPos.length; i++) {
            if (self._arrMonkeyPos[i].x == 0 && self._arrMonkeyPos[i].y == 0) continue;
            var monkeyType = Number(self._arrMonkeyAtr[i]);
            this.scheduleOnce(function() {
                var monkeyObj = cc.instantiate(self.monkeyObj);
                monkeyObj.getComponent(cc.BoxCollider).tag = 3;
                var monkeyJs = monkeyObj.getComponent("Monkey");
                monkeyJs._monkeyType = Number(monkeyType) - 1;
                monkeyObj.x = this._arrMonkeyPos[i].x;
                monkeyObj.y = self.ground.y + this._arrMonkeyPos[i].y;
                monkeyObj.zIndex = self.Player.zIndex;
                monkeyObj.parent = self.node;
            }, 0);
        }
    },

    calculateTime() {
        this.lblTime.string = this._count.toString();
        if (this._count == 0) {
            this.unschedule(this.calculateTime);
            return;
        }
        this._count--;
    },

    onDestroy() {
        this.left.off(cc.Node.EventType.TOUCH_START, this.leftPress, this);
        this.left.off(cc.Node.EventType.TOUCH_END, this.leftRelease, this);
        this.left.off(cc.Node.EventType.TOUCH_CANCEL, this.leftRelease, this);
        this.right.off(cc.Node.EventType.TOUCH_START, this.rightPress, this);
        this.right.off(cc.Node.EventType.TOUCH_END, this.rightRelease, this);
        this.right.off(cc.Node.EventType.TOUCH_CANCEL, this.rightRelease, this);
        this.up.off(cc.Node.EventType.TOUCH_START, this.upPress, this);
        this.up.off(cc.Node.EventType.TOUCH_CANCEL, this.upRelease, this);
        this.up.off(cc.Node.EventType.TOUCH_END, this.upRelease, this);
    },

    leftPress() {
        if (this.playerJS.life > 0) { //如果玩家hp大于0，就是玩家活着
            //if (this.playerJS.isRun == false) { //如果能跑动是错误的
                this._farSpeed = -60;
                this._nearSpeed = -300;
                this.playerJS.playerLeft(); //玩家方向设为左
            //}
        }
    },

    rightPress() {
        if (this.playerJS.life > 0) { //如果玩家hp大于0，就是玩家活着
            //if (this.playerJS.isRun == false) { //如果能跑动是错误的
                this._farSpeed = 90;
                this._nearSpeed = 600;
                this.playerJS.playerRight();  //玩家方向设为右
            //}
        }
    },

    leftRelease() {
        if (this.playerJS.life > 0) { //如果玩家hp大于0，就是玩家活着
            //if (this.playerJS.isRun && this.playerJS.playerDirection == 0) { //如果在跑动,并且玩家方向朝左
                this._farSpeed = this._nearSpeed = 0;
                this.playerJS.noLRControlPlayer();
                // if (this.playerJS.playerState == 0) { //如果玩家狀態為站立
                //     this.Player.getComponent(cc.Animation).play("leftstand");
                // }
            //}
        }
    },

    rightRelease(){
        if (this.playerJS.life > 0) { //如果玩家hp大于0，就是玩家活着
            //if (this.playerJS.isRun && this.playerJS.playerDirection == 1) { //如果在跑动,并且玩家方向朝右
                this._farSpeed = this._nearSpeed = 0;
                this.playerJS.noLRControlPlayer();
                // if (this.playerJS.playerState == 0) { //如果玩家狀態為站立
                //     this.Player.getComponent(cc.Animation).play("rightstand");
                // }
            //}
        }
    },

    upPress() {
        if (this.playerJS.life > 0) { //如果玩家hp大于0，就是玩家活着        
            this.playerJS.playerUp();
            //if (this.playerJS.playerDirection == 0) { //如果玩家方向为左
                //this.Player.getComponent(cc.Animation).stop("leftrun");
                //this.Player.getComponent(cc.Animation).play("leftjump");
            //} else { //否则，就是玩家方向为右
                //this.Player.getComponent(cc.Animation).stop("rightrun");
                //this.Player.getComponent(cc.Animation).play("rightjump");
            //}
        }
    },

    // attackPress() {

    // },

    upRelease() {
        if (this.playerJS.life > 0) { //如果玩家hp大于0，就是玩家活着
            this.playerJS.noUpControlPlayer();
        }
    },

    backToMainMenu() {
        this.changeScene('Home');
    },

    winNodeTouch(evt, customData) {
        switch(customData) {
            case "1":
                this.changeScene('Home');
                break;
            case "2":
                this.changeScene('Game');
                break;
            case "3":
                this.changeScene('Game');
                break;
            case "4":
                this.changeScene('Level');
                break;
        }
    },

    loseNodeTouch(evt, customData) {
        switch(customData) {
            case "1":
                this.changeScene('Home');
                break;
            case "2":
                this.changeScene('Game');
                break;
            case "4":
                this.changeScene('Level');
                break;
        }
    },

    ////////////////////背景移动//////////////
    lateUpdate (dt) {
        if (this.Player.active == false) return;
        this.updateFarCamera(dt);  //远相机
        //this.updateNearCamera(dt); //近相机
    },

    updateFarCamera(dt) {
        // if (this.Player.x <= -cc.winSize.width / 2 + this.node.width / 4 - 10 || this.Player.x >= cc.winSize.width + cc.winSize.width / 2 - this.node.width / 4 + cc.winSize.width + 10) {
        //     return;
        // }
        if (this.playerJS.speed.x == 0 || this.playerJS._bInBounce == true) return;
        if (this.Player.x < 0) {
            return;
        }
        if (this.Player.x > cc.winSize.width * 2) {
            return;
        }

        //console.log("远处摄像机懂了!!!!!!!");
        this.farCamera.node.x += dt*this._farSpeed;
        var yu = this._farCount % 2;
        if (yu == 1) {
            if (this.farCamera.node.x > this._farCount * this.bg01.node.width) {
                this.bg01.node.x = (this._farCount+1) * this.bg01.node.width;
                this._farCount++;
            }
        } else {
            if (this.farCamera.node.x > this._farCount * this.bg02.node.width) {
                this.bg02.node.x = (this._farCount+1) * this.bg02.node.width;
                this._farCount++;
            }
        }
    },

    updateNearCamera(dt) {
        if (this.Player.x <= (-cc.winSize.width / 2 + this.Player.width) + 100 || this.Player.x >= cc.winSize.width + cc.winSize.width / 2 - this.Player.width - 50) {
            return;
        }
        this.nearCamera.node.x += dt*this._nearSpeed;
        var yu = this._nearCount % 2;
        if (yu == 1) {
            if (this.nearCamera.node.x > this._nearCount * this.nearbg01.node.width) {
                this.nearbg01.node.x = (this._nearCount+1) * this.nearbg01.node.width;
                this._nearCount++;
            }
        } else {
            if (this.nearCamera.node.x > this._nearCount * this.nearbg02.node.width) {
                this.nearbg02.node.x = (this._nearCount+1) * this.nearbg02.node.width;
                this._nearCount++;
            }
        }
    }
});
