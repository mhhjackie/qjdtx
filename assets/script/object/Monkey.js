const YouYou = require("../YouYou");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(1300, 1300),
        drag: 1000,
        direction: 0,
        bone: {
            type: cc.Prefab,
            default: null,
        },
        _monkeyType: 0,  //类型 0: white 1: yellow 2: red 3: black
        _bDead: false,
    },

    onLoad () {
        this.collisionX = 0;
        this.direction = -1;
        this.prePosition = cc.v2();
        this.preStep = cc.v2();
        this.touchingNumber = 0;
        this.drag = 1000;
        this._bDead = false;
        var strMonkey = "";
        switch(this._monkeyType) {
            case 0:
                strMonkey = "wmonkey";
                break;
            case 1:
                strMonkey = "ymonkey";
                break;
            case 2:
                strMonkey = "rmonkey";
                break;
            default: break;
        }
        var self = this;
        cc.loader.loadRes(strMonkey, cc.SpriteFrame, function(err, spriteFrame) { 　
            self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
　　　　 });
    },

    start () { 
        // this.schedule(function(){
        //     this.moveLeft();
        //     if (this._monkeyType == 2) {
        //         this.instanceAndThrowBones();
        //     }
        // }, 1);
    },

    instanceAndThrowBones() {
        var player = this.node.parent.getChildByName("Player");
        let d_x = player.x - this.node.x;
        let d_y = player.y + 250 - this.node.y;
        this.hudu = Math.atan2(d_y, d_x);
        this.lidu = cc.v2(player.x, player.y + 250).sub(cc.v2(this.node.x, this.node.y)).mag();
        var bone = cc.instantiate(this.bone);
        bone.parent = this.node.parent;
        bone.x = this.node.x;
        bone.y = this.node.y;
        let banzhuan = bone.getComponent('Banzhuan');
        banzhuan.v_x = this.lidu * Math.cos(this.hudu);
        banzhuan.v_y = this.lidu * Math.sin(this.hudu);
        banzhuan.fly = true;
    },

    onCollisionEnter: function (other, self) {
        //console.log("other name***************:    " + other.node.name);
        //console.log("other tag***************:    " + other.tag);
        switch (other.tag) {
            case 0:
                this.collisionStoneEnter(other, self);
                break;
            case 5:
                this.collisionPlayerEnter(other, self);
                break;
            default:
                break;
        }
    },

    collisionStoneEnter(other, self) {
        //console.log("猴子碰到石头了!!!!");
        // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        var otherAabb = other.world.aabb;
        // 上一次计算的碰撞组件的 aabb 碰撞框
        var otherPreAabb = other.world.preAabb.clone();
        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;
        if (this._bDead) {
            var player = this.node.parent.getChildByName("Player");
            this.node.zIndex = player.zIndex - 2;
        }
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)) {
                this.node.x += Math.floor(Math.abs(otherAabb.xMax - selfAabb.xMin));
                this.collisionX = -1;
                this.direction = 1;
                this.node.scaleX = 0.35;
            }
            else if (this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {
                this.node.x -= Math.floor(Math.abs(otherAabb.xMin - selfAabb.xMax));
                this.collisionX = 1;
                this.direction = -1;
                this.node.scaleX = -0.35;
            }
            this.speed.x = 0;
            return;
        }
    },

    collisionPlayerEnter(other, self) {
        var selfAabb = self.world.aabb;
        var otherAabb = other.world.aabb;
        if (otherAabb.yMin + 15 >= selfAabb.yMin + selfAabb.height) {
            this.speed.x = this.speed.y = 0;
            this._bDead = true;
            var bezier = [cc.v2(0, 0), cc.v2(100, 180), cc.v2(200, 0)];
            this.node.runAction(
                cc.sequence(
                    cc.blink(0.5, 2),
                    cc.callFunc(function() {
                        this.node.anchorY = 0;
                        this.node.y -= this.node.height * Math.abs(this.node.scaleX) / 2;
                    }, this),
                    cc.scaleTo(0.7, this.node.scaleX / 2, Math.abs(this.node.scaleX / 2)),
                    cc.callFunc(function() {
                        this.node.anchorY = 0.5;
                        this.node.y += this.node.height * Math.abs(this.node.scaleX) / 2;
                    }, this),
                    cc.spawn(
                        cc.bezierBy(1, bezier),
                        cc.rotateBy(1, 720),
                    ),
                    cc.callFunc(function() {
                        if (this.node) {
                            this.node.destroy();
                        }
                    }, this)
                )
            )
        }
    },

    lateUpdate(dt) {
        //var bs = this._monkeyType == 1 ? 2 : 1;
        // cc.tween(this.node).to(1, { position: cc.v2(this.node.x - YouYou.speedFire * 1.5 * bs, this.node.y) }).call(() => {
        //     if (this.node.x < -cc.winSize.width / 2 - this.node.width / 2) {
        //         this.node.destroy();
        //     }
        // }).start();
        if (!this._bDead) {
            this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
            if (Math.abs(this.speed.x) > this.maxSpeed.x) {
                this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x;
            }
            if (this.speed.x * this.collisionX > 0) {
                this.direction = 1;
            }
            this.node.x += this.speed.x * dt * 1;
        }
    }
});
