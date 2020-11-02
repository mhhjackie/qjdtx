import PanelBase from 'PanelBase';
import YouYou from './YouYou';
cc.Class({
    extends: PanelBase,

    properties: {
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(1000, 1000),
        gravity: -9000,
        drag: 1000,
        direction: 0, //人物方向,释放鼠标会归零 -1: 左 1:右
        jumpSpeed: 500,
        jumpCount: 0, //跳跃次数 落地之后才可以再跳
        hunker: false,//是否蹲下
        getScore: 0,
        isDied: false,
        fallDown: false, //是否为下落状态
        life: 1,  //角色生命值
        buttonIsPressed: false,//左右键盘是否被摁下
        _stopDir: 0,  //释放按键缓冲后方向 -1: 左 1:右
        _speedIndex: 0,
        _beginPosX: 0, //开始点击按键人物X坐标
        _arrSpeed: [],
        _holdClick: false,    //用来检测点击
        _holdTimeEclipse: 0, //用来检测长按还是短按
        _bLongPress: false, //是否长按
        _bInBounce: false, //是否在按着方向键
        camera: {
            default: null,
            type: cc.Node,
        },
        deadPrefab: {
            type: cc.Prefab,
            default: null,
        },
    },

    onLoad() {
        this.collisionX = this.collisionY = this.touchingNumber = this._speedIndex = 0;
        this._arrSpeed = [1000, 300, 0.001];
        this._bLongPress = this._holdClick = this._bInBounce = false;
        this._holdTimeEclipse = 0;
    },

    reStart() {
    },

    onDestroy() {
    },

    noDownControlPlayer() {
        if (this.touchingNumber === 0) {
            return;
        }
        if (!this.isDied) {
            if (this.direction !== 0) {
                this.player_walk();
            } else {
                this.player_idle();
            }
            this.hunker = false;
        }
    },
    noLRControlPlayer() {
        this.direction = 0;
        this._bInBounce = false;
        //this._speedIndex = 0;
        if (!this.isDied && this.jumpCount == 0)//jumpCount 跳跃次数 落地为0 落地之后才可以再跳
        {
            //console.log("player缓冲了!!!");
            this.player_cushion();
            if (this.node) {
                this._beginPosX = this.node.x;
            }
            this._holdClick = false;
        }
        this.buttonIsPressed = false;
        //console.log("holdTimeEclipse:  " + this._holdTimeEclipse);
        if(this._holdTimeEclipse>=30)
        {                
            this._bLongPress = true;
        }
    },
    noUpControlPlayer() {
        //console.log("noUpControlPlayer")
        //console.log("noUpControlPlayer*******:   " + this.touchingNumber);
        this._bInBounce = false;
        if (this.touchingNumber == 0) {
            // this.jumping = false; //是否在跳状态
            //console.log("释放上键点击******:  " + this.speed.x);
            //this.player_idle();
        }
    },
    playerLeft() {
        if (!this.node || this.jumping) return;
        if (this.direction !== -1 && this.jumpCount == 0 && !this.isDied) {
            this._holdClick = true;
            this._bInBounce = false;
            this.player_walk();
        }      
        this.buttonIsPressed = true;
        this.turnLeft();
        this.direction = -1;
    },
    turnLeft() {
        this.node.getComponent(cc.Animation).play("leftrun");
    },
    playerRight() {
        if (!this.node || this.jumping) return;
        if (this.direction !== 1 && this.jumpCount == 0 && !this.isDied) {
            this._holdClick = true;
            this._bInBounce = false;
            this.player_walk();
        }
        this.buttonIsPressed = true;
        this.turnRight();
        this.direction = 1;
    },
    turnRight() {
        this.node.getComponent(cc.Animation).play("rightrun");
    },
    playerUp() {
        //console.log('this.jumping: ' + this.jumping);
        //console.log('this.jumpCount: ' + this.jumpCount);
        if (!this.node) return;
        this.jumpCount++;
        //this.speed.y >= 0 //需要上升到一定高度再跳
        if (!this.jumping && this.jumpCount <= 2 && !this.isDied)// 如果活着的没在跳跃状态，并且玩家着地
        {
            this.player_jump();
            if (this.speed) {
                this.speed.y = this.jumpSpeed * 0.65;
            }
            //this.jumping = true;
        }
    },
    playerDown() {
        if (this.touchingNumber === 0) {
            return;
        }
        if (!this.hunker && !this.isDied) {
            this.player_hunker();
            this.hunker = true;
        }
    },

    player_cushion() {
        //console.log("player_cushion");
        if (this.node) {
            if (this.speed.x < 0) {
                this.node.getComponent(cc.Animation).play("leftrun");
            }else if(this.speed.x > 0) {
                this.node.getComponent(cc.Animation).play("rightrun");
            }
        }
    },

    player_idle() {
        //this.anim.play("player_idle");
        //console.log("speed x:  " + this.speed.x);
        if (this.node) {
            if (this.speed.x < 0) {
                this.node.getComponent(cc.Animation).play("leftstand");
            }else if(this.speed.x > 0) {
                this.node.getComponent(cc.Animation).play("rightstand");
            }
        }
    },
    player_walk() {
        //this.anim.play("player_walk");
        if (this.node) {
            if (this.speed.x < 0) {
                this.node.getComponent(cc.Animation).play("leftrun");
            }else if(this.speed.x > 0) {
                this.node.getComponent(cc.Animation).play("rightrun");
            }
        }
    },
    player_jump() {
        //console.log("currrent clip ******");
        var curClipName = this.node.getComponent(cc.Animation).currentClip.name;
        if (curClipName == 'rightstand' || curClipName == 'rightrun') {
            this.node.getComponent(cc.Animation).play("rightrun");
        }else if(curClipName == 'leftstand' || curClipName == 'leftrun') {
            this.node.getComponent(cc.Animation).play("leftrun");
        }
    },
    player_hunker() {
        //this.anim.play("player_hunker");
    },
    rabbitJump() {//玩家踩到敌人的跳跃
        //this.anim.play("player_jump");
        this.speed.y = this.jumpSpeed * 0.5;
    },
    rabbitDieJump() {
        //cc.audioEngine.play(this.dieAudio, false, Global.volume);
        //this.anim.play("player_die");
        this.speed.y = this.jumpSpeed;
        cc.director.getCollisionManager().enabled = false;
        this.touchingNumber = 0;
        this.isDied = true;
        this.life = 0;
        //this.node.parent.getComponent('Cameras').isRun = false;
        //Global.playIsAlive = false;
        //setTimeout(() => { this.node.destroy() }, 2100)
    },
    OverNodeLoad() {
        // if (this.life == 0) {
        //     this.scheduleOnce(function () {
        //         // 这里的 this 指向 component
        //         cc.find('over').active = true;
        //     }, 2);
        // }
    },

    onCollisionEnter: function (other, self) {
        //console.log("other name***************:    " + other.node.name);
        //console.log("other tag***************:    " + other.tag);
        if (this.touchingNumber == 0) {
            if (this.buttonIsPressed) // 左右按键
                this.player_walk();// 有按键时，快要落地之前为walk状态
            else
                this.player_idle();// 没有按键时，快要落地之前为idle状态
        }
        switch (other.tag) {
            case 0:
                this.collisionPlatformEnter(other, self);
                break;
            case 1:
                this.collisionFireEnter(other, self);
                break;
            case 3:
                this.collisionMonkeyEnter(other, self);
                break;
            case 4:
                this.collisionHoleEnter(other, self);
                break;
            case 6:
                console.log("yuliu");
                break;
            case 7: //终点牌
                this.collisionDestinationEnter(other, self);
                break;
            case 8:
                console.log("yuliu");
                break;
        }
    },

    collisionDestinationEnter(other, self) {
        console.log("碰到终点牌!!!");
        //console.log(this.node.parent);
        this.camera.getChildByName("touchLyt").getComponent(cc.BlockInputEvents).enabled = true;
        this.camera.getChildByName('winpanel').active = true;
    },

    collisionMonkeyEnter(other, self) {
        //console.log("碰到猴子了");
        //var selfAabb = self.world.aabb;
        //var otherAabb = other.world.aabb;
        //console.log("speed x:  " + this.speed.x);
        //console.log("speed y:  " + this.speed.y);
        var monkeyScript = other.node.getComponent("Monkey");
        if (this.speed.y == 0 && monkeyScript._bDead == false) {
            this.playerDead();
            var camera = this.camera;
            this.scheduleOnce(function() {
                camera.getChildByName("touchLyt").getComponent(cc.BlockInputEvents).enabled = true;
                camera.getChildByName('losepanel').active = true;
            }, 1.7);
        }
    },

    playerDead() {
        if (this.node) this.node.active = false;
        var deadPrefab = cc.instantiate(this.deadPrefab);            
        deadPrefab.parent = this.node.parent;
        deadPrefab.x = this.node.x;
        deadPrefab.y = this.node.y + this.node.height / 2.5;
        cc.tween(deadPrefab)
        .delay(0.2)
        .by(0.3, {y: 55}, {easing:"SineIn"})
        .by(0.2, {y: -90}, {easing:"SineOut"})
        .to(1, {opacity: 0})
        .call(() => {
                if(deadPrefab) deadPrefab.destroy();
                if(this.node) this.node.destroy();
            })
        .start();
    },

    collisionFireEnter(other, self) {
        console.log("碰到火圈了");
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();
        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            //console.log("yMax:  " + selfPreAabb.yMax + "  otherMax:  " + otherPreAabb.yMax);
            if ((otherPreAabb.yMax - selfPreAabb.yMax == 33)) {
                // this.node.y = otherPreAabb.yMax - this.node.parent.y - 7;
                // this.jumping = false;//下落碰到地面或砖块木桩等
                // this.collisionY = -1;
                console.log("下落碰到物体");
            }else{
                this.playerDead();
                var camera = this.camera;
                this.scheduleOnce(function(){
                    camera.getChildByName("touchLyt").getComponent(cc.BlockInputEvents).enabled = true;
                    camera.getChildByName('losepanel').active = true;
                }, 1.7);
            }
        }       
    },

    collisionHoleEnter(other, self) {
        this.playerDead();
        var camera = this.camera;
        this.scheduleOnce(function(){
            camera.getChildByName("touchLyt").getComponent(cc.BlockInputEvents).enabled = true;
            camera.getChildByName('losepanel').active = true;
        }, 1.7);
    },

    collisionPlatformEnter(other, self) {
        console.log("on collidePlatFormEnter *****");
        //console.log(com_array);
        this.touchingNumber++;
        this.jumpCount = 0;
        //碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();
        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)) {
                this.node.x += Math.floor(Math.abs(otherAabb.xMax - selfAabb.xMin));
                this.collisionX = -1;
            }else if (this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {
                this.node.x -= Math.floor(Math.abs(otherAabb.xMin - selfAabb.xMax));
                this.collisionX = 1;
            }else if (this.speed.x == 0 && (selfPreAabb.xMax == otherPreAabb.xMin)) {
                this.fallDown = true;
            }
            this.speed.x = 0;
            other.touchingX = true;
            if (other.node.name == "stone") {
                if (this.collisionX == 1) {
                    cc.tween(this.node)
                    .by(0.05, {x: 10, y: 0})
                    .by(0.05, {x: -9, y: 0})
                    .call(() => {
                        this._bInBounce = true;
                        var curClipName = this.node.getComponent(cc.Animation).currentClip.name;
                        if (curClipName == 'rightrun') {
                            this.node.getComponent(cc.Animation).play("rightstand");
                        }
                    })
                    .start();
                }else if(this.collisionX == -1){
                    cc.tween(this.node)
                    .by(0.05, {x: -10, y: 0})
                    .by(0.05, {x: 9, y: 0})
                    .call(() => {
                        this._bInBounce = true;
                        var curClipName = this.node.getComponent(cc.Animation).currentClip.name;
                        if (curClipName == 'leftrun') {
                            this.node.getComponent(cc.Animation).play("leftstand");
                        }
                    })
                    .start();
                }
            }   
            return;
        }
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                this.node.y = otherPreAabb.yMax - this.node.parent.y - 7;
                this.jumping = false;//下落碰到地面或砖块木桩等
                this.collisionY = -1;
            }
            else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)) {
                this.jumping = true;
                this._stopDir = this.direction;
                this.node.y = otherPreAabb.yMin - selfPreAabb.height - this.node.parent.y - 10;
                this.collisionY = 1;
            }
            this.speed.y = 0;
            other.touchingY = true;
        }

        //碰到地面
        console.log("other name is*****:  " + other.name);
        if (other.name == 'ground<BoxCollider>') {
            //this.changeHeroBoxCld(false);
            this.backStandState();
        }else if(other.name == 'floattile<BoxCollider>'){
            //os.util.shake(other.node, this.collisionY == 1 ? false : true);
            //var collider = other.node.getComponent(cc.BoxCollider);
            //console.log("the arrFloatTile length is:  " + YouYou.arrFloatTile.length);
            if (YouYou.arrFloatTile) {
                for(var i = 0; i < YouYou.arrFloatTile.length; i++) {
                    var tile = YouYou.arrFloatTile[i];
                    if (tile.getNumberOfRunningActions() == 0 && this.speed.x == 0) {
                        os.util.shake(tile.getComponent(cc.Sprite).node, this.collisionY == 1 ? false : true);
                    }
                }
            }
        }
    },

    changeHeroBoxCld(bAboveTile) {
        var com_array = this.node.getComponents(cc.PolygonCollider);
        com_array[0].enabled = !bAboveTile;
        com_array[1].enabled = bAboveTile;
    },

    backStandState() {
        var curClip = this.node.getComponent(cc.Animation).currentClip;
        if (curClip) {
            //没有点击左右情况下的下落
            if (this.direction == 0) {
                this.jumping = false;
                if (curClip.name == 'leftrun') {
                    this.node.getComponent(cc.Animation).play("leftstand");
                }else if(curClip.name == 'rightrun') {
                    this.node.getComponent(cc.Animation).play("rightstand");
                }
            }
        }else{
            this.node.getComponent(cc.Animation).play("rightstand");
        }
    },

    onCollisionStay (other, self) {
        //this.jumpCount = 0;
        //if (this.collisionY === -1) {
        if (other.node.group === 'stone') {
            //console.log("stay width stone");
            this.speed.x = 0;
        }
        //}
    },

    onCollisionExit(other, self) {
        this.fallDown = false;
        if (other.node.group == 'stone' || other.node.group == 'Ground' || other.node.group == "Platform" ||
           other.node.group == "fireplate") {
            this.touchingNumber--;
        }
        //this.jumpCount = 1;
        if (this.jumpCount !== 0 && this.touchingNumber === 0) // 非着陆状态
        {
            //this.anim.play("player_jump");
        }
        //console.log("onCollisionExit touchingNumber:   " + this.touchingNumber);
        if (this.touchingNumber === 0) {
            // this.node.color = cc.Color.WHITE;
            //this.jumping = true;// 在空中设为跳跃状态
        }

        console.log("other node group:  " + other.node.group);
        if (other.node.group == 'stone' || other.node.group == 'Platform') {
            //this.jumping = true;// 在空中设为跳跃状态
            this.changeHeroBoxCld(true);
            if (this.speed.x < 0) {
                if (other.node.group == 'stone' && self.node.y > other.node.y) {
                    this.speed.x = 0;
                    cc.tween(this.node)
                    .by(0.2, {x: -60, y: 5})
                    .start();
                }
            }else if (this.speed.x > 0) {
                if (other.node.group == 'stone' && self.node.y > other.node.y) {
                    this.speed.x = 0;
                    cc.tween(this.node)
                    .by(0.2, {x: 70, y: 5})
                    .start();
                }
            }
        }

        if (other.node.group == 'Ground') {
            this.changeHeroBoxCld(true);
        }

        if (other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        }
        else if (other.touchingY) {
            this.collisionY = 0;
            other.touchingY = false;
        }
    },

    lateUpdate(dt) {
        //console.log("ccwinsize width: " + cc.winSize.width);
        //var screenWidth = 1280;
        if (this._bInBounce == true) return;
        if (this.node.x > 0 && this.node.x < cc.winSize.width * 2) {
            if (this.node.x > this.camera.x) {
                this.camera.x = this.node.x;
            } else if (this.node.x < this.camera.x) {
                this.camera.x = this.node.x;
            }
        }else if (this.node.x <= -cc.winSize.width / 2 + this.node.width / 4 - 10) {
            this.node.x = -cc.winSize.width / 2 + this.node.width / 4 - 10;
        }else if (this.node.x >= cc.winSize.width + cc.winSize.width / 2 - this.node.width / 4 + cc.winSize.width) {
            this.node.x = cc.winSize.width + cc.winSize.width / 2 - this.node.width / 4 + cc.winSize.width;
        }
    
        //console.log("touchNumber:  "+ this.touchingNumber);
        //console.log(this.fallDown);
        if (this.touchingNumber === 0 || this.fallDown || this.touchingNumber === -1) {
            this.speed.y += this.gravity * dt;
            if (Math.abs(this.speed.y) > this.maxSpeed.y) {
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }
        }
        //高度跳跃限制
        if (this.node.y > 600) {
            this.touchingNumber = 0;
        }
        if (this.direction === 0) {
            if (this.speed.x > 0) {
                if (this._bLongPress) {  
                    if (this.node.x < this._beginPosX + 50) {
                        this._speedIndex = 0;
                    }else if (this.node.x >= this._beginPosX + 50 && this.node.x < this._beginPosX + 90){
                        this._speedIndex = 1;
                    }else if(this.node.x >= this._beginPosX + 100 && this.node.x < this._beginPosX + 130) {
                        this._speedIndex = 2;
                    }
                    this.speed.x += this._arrSpeed[this._speedIndex] * dt * 0.3;
                    if(this.node.x >= this._beginPosX + 130) {
                        this._stopDir = 1;
                        this.speed.x = 0;
                        this._speedIndex = 0;
                    }
                }else {
                    this.speed.x += this.drag * dt;
                    if (this.speed.x >= 0) {
                        this.speed.x = 0;
                        this._stopDir = 1;
                    }
                }
            }
            
            if (this.speed.x < 0) {
                if (this._bLongPress) {
                    if (this.node.x > this._beginPosX - 50) {
                        this._speedIndex = 0;
                    }else if (this.node.x <= this._beginPosX - 50 && this.node.x > this._beginPosX - 90){
                        this._speedIndex = 1;
                    }else if(this.node.x <= this._beginPosX - 90 && this.node.x > this._beginPosX - 130) {
                        this._speedIndex = 2;
                    }
                    this.speed.x -= this._arrSpeed[this._speedIndex] * dt * 0.3;
                    if(this.node.x <= this._beginPosX - 130) {
                        this._stopDir = -1;
                        this.speed.x = 0;
                        this._speedIndex = 0;
                    }
                }else{
                    this.speed.x -= this.drag * dt;
                    if (this.speed.x <= 0) {
                        this.speed.x = 0;
                        this._stopDir = -1;
                    }
                }
            }
        }
        else {
            this._stopDir = this.direction;
            this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
            if (Math.abs(this.speed.x) > this.maxSpeed.x) {
                this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x;
            }
        }

        //x碰到障碍
        if (this.speed.x * this.collisionX > 0 || this.jumping) {
            this.speed.x = 0;
        }
        if (this.speed.x == 0 && this.speed.y == 0 && !this.jumping) {
            if (this._stopDir == -1) {
                this.node.getComponent(cc.Animation).play("leftstand");
            }else if (this._stopDir == 1) {
                this.node.getComponent(cc.Animation).play("rightstand");
            }
            this._holdTimeEclipse = 0;
            this._bLongPress = false;
        }
        this.node.x += this.speed.x * dt * 2.5;
        this.node.y += this.speed.y * dt * 1.3;

        if(this._holdClick)
        {
            this._holdTimeEclipse+=2;
            if(this._holdTimeEclipse > 30)//如果长按时间大于2s，则认为长按了2s
            {
                this._holdTimeEclipse = 30;
            }
        }
    },
});
