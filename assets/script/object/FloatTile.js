cc.Class({
    extends: cc.Component,

    properties: {
        _bCanMove: 0,  //0: 不可移动 1: 可移动
    },

    onLoad: function () {
        // this.bulletPool = new cc.NodePool();
        // var initCount = 5;
        // for (var i = 0; i < initCount; ++i) {
        //     var enemy = cc.instantiate(this.bulletPrefab); 
        //     this.bulletPool.put(enemy); 
        // }
        // var bulletLogic = cc.callFunc(function(target) {
        //     if(this.state <= 0)
        //         return
        //     var bullet
        //     if (this.bulletPool.size() > 0) { 
        //         bullet = this.bulletPool.get()
        //     } else { 
        //         bullet = cc.instantiate(this.bulletPrefab)
        //     }
        //     bullet.parent = this.node.parent
        //     var pos = this.node.getPosition()
        //     bullet.setPosition(cc.v2(pos.x, pos.y + 50));
        //     var finished = cc.callFunc(function(target) {
        //         this.bulletPool.put(bullet);
        //     }, this)
        //     bullet.runAction(cc.sequence(cc.moveTo(1, pos.x, 600),finished))
        //     this.node.runAction(cc.sequence(cc.delayTime(3), bulletLogic))
        // }, this)
        // this.node.runAction(cc.sequence(cc.delayTime(1),bulletLogic))
    },

    start: function () {
        if (this._bCanMove) {
            var seq = cc.repeatForever(
                cc.sequence(
                    cc.moveBy(2, 200, 0),
                    cc.moveBy(2, -200, 0)
                ));//一直重复左右移动
            this.node.runAction(seq);
        }
    },

    onCollisionEnter: function (other, self) {
        // if(this.state == 3){
        //     this.state = 2
        // }else if(this.state == 2){
        //     this.state = 1
        //     this.com3.active = false
        // }else if(this.state == 1){
        //     this.state = 0
        //     this.nodeControl.getComponent("GameControl").setGameOver()
        // }
    }
});
