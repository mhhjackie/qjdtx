cc.Class({
    extends: cc.Component,

    properties: {
        _animCtrl: null,
    },

    onLoad() {
        this._animCtrl = this.node.getComponent(cc.Animation);
    },

    start() {
    },

    onAnimFinished(){
        var player = this.node.parent.getChildByName('Player');
        if (player) {
            player.life = 0; //玩家生命值0
            cc.tween(player)
            .to(0.1, {anchorX: 1, anchorY: 0.5, scaleX: player.scaleX / 2, scaleY:  Math.abs(player.scaleX) / 2, x: this.node.x, y: this.node.y + this.node.height / 4}, { easing: 'SineIn'})
            .to(0.1, {anchorX: 1, anchorY: 0.5, scaleX: player.scaleX / 6, scaleY:  Math.abs(player.scaleX) / 6, x: this.node.x, y: this.node.y}, { easing: 'SineIn'})
            .delay(0.3)
            .call(() => {
                this._animCtrl.play("flowermouth");
                if (player) {
                    var playerScrpt = player.getComponent('Player');
                    var camera = playerScrpt.camera;
                    playerScrpt.playerDead();
                    this.scheduleOnce(function(){
                        camera.getChildByName("touchLyt").getComponent(cc.BlockInputEvents).enabled = true;
                        camera.getChildByName('losepanel').active = true;
                    }, 1.7);
                }
            })
            .start();
        }
    },

    onCollisionEnter: function (other, self) {
        switch(other.tag) {
            case 5:
                var player = this.node.parent.getChildByName('Player');
                if (player.scale != 0.4) return;
                if (player.x > this.node.x) {
                    this.node.scaleX = -0.4;
                }else{
                    this.node.scaleX = 0.4;
                }
                this._animCtrl.play("flowerbite");
                var animState = this._animCtrl.getAnimationState('flowerbite');
                if (animState) {
                    animState.on('finished', (event) => {
                        this.onAnimFinished();
                        this._animCtrl.off('finished', this.onAnimFinished, this);
                    }, this);
                }
                break;
            default:
                break;
        }
    },
});
